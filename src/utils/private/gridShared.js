import {
  LocalDataProvider, GridView, LocalTreeDataProvider, TreeView,
} from 'realgrid';
import { cloneDeep } from 'lodash-es';
import { timeout } from './tick';
import consts from '../../consts';
import store from '../../store';

/*
  Common
  */
export function getSessionDatetimeFormat(datetimeFormat) {
  let convertedDatetimeFormat = datetimeFormat;
  const userInfo = store.getters['meta/getUserInfo'];

  switch (datetimeFormat) {
    case 'date':
      convertedDatetimeFormat = userInfo.dateFormat || consts.DEFAULT_DATE_FORMAT;
      break;
    case 'datetime':
      convertedDatetimeFormat = userInfo.datetimeFormat || consts.DEFAULT_DATETIME_FORMAT;
      break;
    case 'time':
      convertedDatetimeFormat = userInfo.timeFormat || consts.DEFAULT_TIME_FORMAT;
      break;
  }
  return convertedDatetimeFormat.replace(/Y/g, 'y').replace(/D/g, 'd');
}

export function getTextDatetimeFormat(datetimeFormat) {
  const string = [];
  const replaceValue = [];

  while (datetimeFormat) {
    if (/^(.)\1{3}/.test(datetimeFormat)) {
      string.push('([0-9]{4})');
      replaceValue.push(`$${string.length}`);
      datetimeFormat = datetimeFormat.substring(4);
    } else if (/^(.)\1{1}/.test(datetimeFormat)) {
      string.push('([0-9]{2})');
      replaceValue.push(`$${string.length}`);
      datetimeFormat = datetimeFormat.substring(2);
    } else {
      return null;
    }

    if (/^[-.:\s]/.test(datetimeFormat)) {
      replaceValue.push(datetimeFormat[0]);
      datetimeFormat = datetimeFormat.substring(1);
    }
  }

  return `${string.join('')};${replaceValue.join('')}`;
}

/*
  Layout
  */
function hasLayoutBounds(view) {
  const { layoutManager } = view._view;

  return !!layoutManager.headerBounds
    && !!layoutManager.footerBounds;
}

export function waitUntilSetLayout(view) {
  return new Promise((resolve) => {
    if (hasLayoutBounds(view)) {
      resolve();
      return;
    }

    setTimeout(async () => {
      await waitUntilSetLayout(view);
      resolve();
    });
  });
}

export function calcViewHeight(view, rows) {
  const { layoutManager } = view._view;
  const { _container } = view._container;
  const { borderTopWidth } = getComputedStyle(_container);

  const newBorderTopWidth = borderTopWidth?.split('px')?.[0];
  return layoutManager.headerBounds.height
        + layoutManager.footerBounds.height
        + (layoutManager.hscrollBar ? layoutManager.scrollBarHeight : 0)
        + layoutManager.minItemHeight * rows
        + Math.ceil(parseFloat(newBorderTopWidth || 0, 10));
}

export async function syncHeadCheckIfAble(view) {
  await waitUntilSetLayout(view);

  const { header, checkBar } = view;
  const isSyncable = header.visible
    && checkBar.visible && checkBar.showAll && !checkBar.exclusive;

  if (isSyncable) {
    view.checkBar.syncHeadCheck = true;
  }

  return isSyncable;
}

export function fixTopIndexIfInvalid(view) {
  const layoutManager = view._view?.layoutManager;

  if (layoutManager) {
    const topIndex = view.getTopItem();
    const shouldFix = layoutManager._topIndex !== topIndex;

    if (shouldFix) {
      layoutManager._topIndex = topIndex;
    }
  }
}

/*
  Cell
  */
export function createCellIndexByDataColumn(view, itemIndex, dataColumn) {
  const { name: column, dataIndex: fieldIndex, fieldName } = dataColumn;
  const dataRow = view.getDataRow(itemIndex);

  return {
    itemIndex, column, dataRow, fieldIndex, fieldName,
  };
}

export function isCellEditable(view, column, index) {
  const { editOptions } = view;
  const { renderer } = column;

  if ((editOptions.columnEditableFirst === false && editOptions.editable === false)
    || column.readOnly === true) {
    return false;
  }

  if (['check', 'radio', 'checkList'].includes(renderer?.type)) {
    return renderer.editable !== false
      && view.onCellEditable(view, index) !== false;
  }

  return column.editable !== false
    && view.onCellEditable(view, index) !== false;
}

export function isCellItem(view, column) {
  const isActionButton = (column.button || column._button) === 'action';
  const isButtonRenderer = (column.renderer || column._renderer)?.type === 'button';
  return isActionButton || isButtonRenderer;
}

export function isCellItemClickable(view, column, index) {
  return isCellItem(view, column) && view.onCellItemClickable(view, index) !== false;
}

export function getCellClickEvent(view, el) {
  switch (el.className) {
    case 'rg-button-renderer-button':
      return view.onCellItemClicked;
    case 'rg-button-action':
      return view.onCellButtonClicked;
  }
}

export async function waitUntilShowEditor(view, dropdown = false) {
  const index = view.getCurrent();

  if (index.itemIndex > -1) {
    const column = view.columnByName(index.column);

    if (isCellEditable(view, column, index)) {
      if (column.button !== 'action') view.showEditor(dropdown);

      await timeout();

      if (view.isEditing()) {
        document.activeElement.select();
      } else {
        await waitUntilShowEditor(view, dropdown);
      }
    }
  }
}

export function getOutsideEditorElements(view) {
  const { delegate } = view._view;
  const cellEditors = delegate._cellEditors;
  return Object.values(cellEditors)
    .map((e) => {
      if (e._line) return e._line._element;
      if (e._list) return e._list._element;
      if (e._number) return e._number._element;
      return e._editor;
    }).filter((e) => !!e);
}

export function objectValueCallback(ds, values) {
  const row = [];
  if (values) {
    for (let i = 0, cnt = ds.getFieldCount(); i < cnt; i++) {
      const fld = ds.getOrgFieldName(i);
      const fName = Object.keys(values).find((key) => key.toLowerCase() === fld.toLowerCase());
      const fieldData = ds.fieldByName(fName);

      if (fieldData?.dataType === 'object' && (typeof values[fName] !== 'object' || (typeof values[fName] === 'object' && !values[fName]))) {
        const objData = {};
        objData[fieldData.objectKey] = null;
        objData.__atthDocumentId = values[fName];
        objData.__isModified = false;
        objData.__numberOfFiles = `${values.numberOfFiles ?? 0}`;
        row[i] = objData;
      } else if (values[fName] || fieldData?.dataType === 'number') {
        row[i] = values[fName];
      }
    }
  }
  return row;
}

/*
  Excel
  */
export async function cloneView(view, options) {
  const isGridView = view instanceof GridView;

  const container = document.createElement('div');
  container.style.display = 'none';
  document.body.appendChild(container);

  const DataClass = isGridView ? LocalDataProvider : LocalTreeDataProvider;
  const copyData = new DataClass(false);
  copyData.setFields(cloneDeep(view.getDataSource().getFields()));

  const ViewClass = isGridView ? GridView : TreeView;
  const copyView = new ViewClass(container);
  copyView.setDataSource(copyData);
  copyView.getDataSource().valuesCallback = objectValueCallback;
  copyData.setRows(options.exportData, isGridView ? undefined : (options.treeKey || view.__treeKey__));
  copyView.setColumns(cloneDeep(view.getColumns()));
  view.__originalColumnInfos__.forEach((e) => {
    copyView.setColumnProperty(e.name, 'visible', e.visible === true);
  });
  copyView.setColumnLayout(options.exportLayout || view.__originalLayouts__ || cloneDeep(view.saveColumnLayout()));
  copyView.setRowIndicator(cloneDeep(view.getRowIndicator()));
  copyView.setCheckBar(cloneDeep(view.getCheckBar()));
  copyView.setHeader(cloneDeep(view.getHeader()));
  copyView.setDisplayOptions(cloneDeep(view.getDisplayOptions()));
  copyView.setFooters(cloneDeep(view.getFooters()));
  copyView.setHeaderSummaries(cloneDeep(view.getHeaderSummaries()));

  await timeout();
  if (isGridView && view.isGrouped()) {
    copyView.setRowGroup(cloneDeep(view.getRowGroup()));
    copyView.groupBy(cloneDeep(view.getGroupFields()));
  }

  return copyView;
}

export function destroyCloneView(view) {
  const container = view.getContainer();
  const data = view.getDataSource();

  data.clearRows();

  view.destroy();
  data.destroy();

  document.body.removeChild(container);
}

/*
  Events
  */
export function registerEvent(view, eventName, eventFn) {
  const container = view.getContainer();
  container.addEventListener(eventName, eventFn);

  view.__registeredEvents__ ||= {};
  view.__registeredEvents__[eventName] = eventFn;
}

export function unregisterEventAll(view) {
  const container = view.getContainer();
  const registeredEvents = view.__registeredEvents__ || {};

  Object.keys(registeredEvents)
    .forEach((v) => {
      container.removeEventListener(v, registerEvent[v]);
    });
}

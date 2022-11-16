import {
  LocalDataProvider, GridView, LocalTreeDataProvider, TreeView,
} from 'realgrid';
import { cloneDeep } from 'lodash-es';
import { timeout } from './tick';
import consts from '../../consts';
import store from '../../store';

const GRID_BORDER_WIDTH = 2;

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

  return layoutManager.headerBounds.height
        + layoutManager.footerBounds.height
        + (layoutManager.hscrollBar ? layoutManager.scrollBarHeight : 0)
        + layoutManager.minItemHeight * rows
        + GRID_BORDER_WIDTH;
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
  const { layoutManager } = view._view;
  const topIndex = view.getTopItem();

  if (layoutManager._topIndex !== topIndex) {
    layoutManager._topIndex = topIndex;
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
  const { columnEditableFirst, editable } = view.editOptions;

  if ((columnEditableFirst === false && editable === false)
    || column.readOnly === true) {
    return false;
  }

  if (column.renderer?.type === 'check') {
    return column.renderer.editable !== false
      && view.onCellEditable(view, index) !== false;
  }

  return column.editable !== false
    && view.onCellEditable(view, index) !== false;
}

export function isCellPastable(view, column, index) {
  if (!isCellEditable(view, column, index)) {
    return false;
  }

  const textReadOnlyTypes = ['btdate', 'number', 'list', 'dropdown'];
  const { editor } = column;

  return !textReadOnlyTypes.includes(editor?.type) || editor?.textReadOnly !== true;
}

export function isCellItemClickable(view, column, index) {
  const isCellItem = column.button === 'action' || column.renderer?.type === 'button';
  return isCellItem && view.onCellItemClickable(view, index) !== false;
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
      view.showEditor(dropdown);
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
    .map((e) => e._list?._element).filter((e) => !!e);
}

/*
  Excel
  */
export async function cloneView(view, options) {
  const isGrid = view instanceof GridView;

  const container = document.createElement('div');
  container.style.display = 'none';
  document.body.appendChild(container);

  const DataClass = isGrid ? LocalDataProvider : LocalTreeDataProvider;
  const copyData = new DataClass(false);
  copyData.setFields(cloneDeep(view.getDataSource().getFields()));
  copyData.setRows(options.exportData, isGrid ? undefined : (options.treeKey || view.__treeKey__));

  const ViewClass = isGrid ? GridView : TreeView;
  const copyView = new ViewClass(container);
  copyView.setDataSource(copyData);
  copyView.setColumns(cloneDeep(view.getColumns()));
  copyView.setColumnLayout(options.exportLayout || cloneDeep(view.saveColumnLayout()));
  copyView.setRowIndicator(cloneDeep(view.getRowIndicator()));
  copyView.setCheckBar(cloneDeep(view.getCheckBar()));
  copyView.setHeader(cloneDeep(view.getHeader()));
  copyView.setDisplayOptions(cloneDeep(view.getDisplayOptions()));
  copyView.setFooters(cloneDeep(view.getFooters()));

  if (view.isGrouped()) {
    await timeout();
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

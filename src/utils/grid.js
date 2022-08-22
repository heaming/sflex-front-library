/* eslint-disable no-await-in-loop */
import {
  omit, keyBy, isEmpty,
  every as _every,
  filter as _filter,
  find as _find,
  forEach as _forEach,
  map as _map,
  reduce as _reduce,
  some as _some,
} from 'lodash-es';
import { date } from 'quasar';
import { RowState, TreeView, ExportTarget, ExportType } from 'realgrid';
import { waitUntilShowEditor, cloneView, destroyCloneView } from './private/gridShared';
import libConfig from '../consts/private/libConfig';
import { alert, confirm } from '../plugins/dialog';
import { loadProgress } from '../plugins/loading';
import { validateValue } from './private/validate';
import i18n from '../i18n';

function datetimeCallback(data, dataRow, fieldName, value) {
  if (!value) return null;

  const datetimeFormat = data.fieldByName(fieldName).datetimeFormat
    ?.replace(/y/g, 'Y')
    .replace(/d/g, 'D')
    .replace(/h/g, 'H');

  return datetimeFormat ? date.formatDate(value, datetimeFormat) : value;
}

function booleanCallback(data, dataRow, fieldName, value) {
  const { booleanFormat } = data.fieldByName(fieldName);
  return booleanFormat?.split(':')[value ? 1 : 0] || value;
}

function getOutputRow(data, dataRow) {
  if (!data.hasData(dataRow)) { return null; }

  const { __rowState: rowState, ...rowData } = data.getOutputRow({
    datetimeCallback, booleanCallback, rowState: true,
  }, dataRow);

  return { ...rowData, dataRow, rowState };
}

/*
  Common
 */
export async function focusCellInput(view, dataRow, fieldName, dropdown = false) {
  view._view._dom.scrollIntoView();
  view.setCurrent({ dataRow, fieldName });
  await waitUntilShowEditor(view, dropdown);
}

/*
  RowData
 */
export function getRowValue(view, dataRow) {
  const data = view.getDataSource();
  return getOutputRow(data, dataRow);
}

export function getRowValues(view, dataRows) {
  const data = view.getDataSource();
  return dataRows.map((dataRow) => getOutputRow(data, dataRow));
}

export function getCurrentRowValue(view) {
  const { dataRow } = view.getCurrent();
  return getRowValue(view, dataRow);
}

export function getCreatedRowValues(view) {
  const createdRows = view.getDataSource().getStateRows(RowState.CREATED);
  return getRowValues(view, createdRows);
}

export function getReadRowValues(view) {
  const readRows = view.getDataSource().getStateRows(RowState.NONE);
  return getRowValues(view, readRows);
}

export function getUpdatedRowValues(view) {
  const updatedRows = view.getDataSource().getStateRows(RowState.UPDATED);
  return getRowValues(view, updatedRows);
}

export function getDeletedRowValues(view) {
  const deletedRows = view.getDataSource().getStateRows(RowState.DELETED);
  return getRowValues(view, deletedRows);
}

export function getChangedRowValues(view, isIncludeDeleted = true) {
  return [
    ...(isIncludeDeleted ? getDeletedRowValues(view) : []),
    ...getUpdatedRowValues(view),
    ...getCreatedRowValues(view),
  ];
}

export function getAllRowValues(view, isIncludeDeleted = true) {
  const length = view.getDataSource().getRowCount();
  const startRow = view instanceof TreeView ? 1 : 0;
  const allRows = Array.from({ length }, (v, i) => i + startRow);

  return getRowValues(view, allRows)
    .filter((e) => isIncludeDeleted || e.rowState !== RowState.DELETED);
}

export function getCheckedRowValues(view, isChangedOnly = false) {
  const checkedRows = view.getCheckedRows().sort((a, b) => a - b);
  return getRowValues(view, checkedRows)
    .filter((e) => !isChangedOnly || e.rowState !== RowState.NONE);
}

export function getSelectedRowValues(view) {
  const selectedRows = view.getSelectedRows().sort((a, b) => a - b);
  return getRowValues(view, selectedRows);
}

export function getOrigRowValue(view, dataRow) {
  const data = view.getDataSource();
  const rowValue = getOutputRow(data, dataRow);

  if (!rowValue) { return null; }

  const updatedCells = keyBy(data.getUpdatedCells([dataRow])[0]?.updatedCells || [], 'fieldName');

  Object.keys(rowValue).forEach((e) => {
    if (updatedCells[e] !== undefined) {
      const { dataType } = data.fieldByName(e);
      let { oldValue } = updatedCells[e];

      if (dataType === 'datetime') {
        oldValue = datetimeCallback(data, dataRow, e, oldValue);
      } else if (dataType === 'boolean') {
        oldValue = booleanCallback(data, dataRow, e, oldValue);
      }

      rowValue[e] = oldValue;
    }
  });

  return omit(rowValue, ['dataRow', 'rowState']);
}

export function getCellValue(view, dataRow, fieldName) {
  return getRowValue(view, dataRow)?.[fieldName] || null;
}

export function getOrigCellValue(view, dataRow, fieldName) {
  return getOrigRowValue(view, dataRow)?.[fieldName] || null;
}

export function getSumValue(view, fieldName) {
  const data = view.getDataSource();

  if (data.fieldByName(fieldName)?.dataType !== 'number') return;

  return getAllRowValues(view, false).reduce((a, e) => a + (e[fieldName] ?? 0), 0);
}

export function every(view, predicate) {
  return _every(getAllRowValues(view, false), predicate);
}

export function filter(view, predicate) {
  return _filter(getAllRowValues(view, false), predicate);
}

export function find(view, predicate, fromDataRow = -1) {
  const allRowValues = getAllRowValues(view, false);
  const fromIndex = allRowValues.findIndex((e) => e.dataRow === fromDataRow);

  if (fromIndex > -1) allRowValues.splice(fromIndex);

  return _find(allRowValues, predicate);
}

export function findAll(view, predicate, fromDataRow = -1) {
  const allRowValues = getAllRowValues(view, false);
  const fromIndex = allRowValues.findIndex((e) => e.dataRow === fromDataRow);

  if (fromIndex > -1) allRowValues.splice(fromIndex);

  return _filter(allRowValues, predicate);
}

export function findDataRow(view, predicate) {
  return _find(getAllRowValues(view, false), predicate)?.dataRow ?? -1;
}

export function findDataRows(view, predicate) {
  return findAll(getAllRowValues(view, false), predicate).map((e) => e.dataRow);
}

export function forEach(view, iteratee) {
  _forEach(getAllRowValues(view, false), iteratee);
}

export function map(view, iteratee) {
  return _map(getAllRowValues(view, false), iteratee);
}

export function reduce(view, iteratee, accumulator) {
  return _reduce(getAllRowValues(view, false), iteratee, accumulator);
}

export function some(view, predicate) {
  return _some(getAllRowValues(view, false), predicate);
}

export function deleteSelectedRows(view, isIncludeCreated = false) {
  const selectedRows = view.getSelectedRows().sort((a, b) => a - b);
  const deletedRowValues = getRowValues(view, selectedRows)
    .filter((v) => isIncludeCreated || v.rowState !== RowState.CREATED);

  view.getDataSource().removeRows(selectedRows);
  return deletedRowValues;
}

export async function confirmDeleteSelectedRows(view, isIncludeCreated = false) {
  if (!view.getSelectedRows().length) {
    await alert(i18n.t('MSG_ALT_NOT_SEL_ITEM'));
    return [];
  }
  if (await confirm(i18n.t('MSG_ALT_WANT_DEL_SEL_ITEM'))) {
    return deleteSelectedRows(view, isIncludeCreated);
  }
  return [];
}

export function deleteCheckedRows(view, isIncludeCreated = false) {
  const checkedRows = view.getCheckedRows();
  const deletedRowValues = getRowValues(view, checkedRows)
    .filter((v) => isIncludeCreated || v.rowState !== RowState.CREATED);

  view.getDataSource().removeRows(checkedRows);
  return deletedRowValues;
}

export async function confirmDeleteCheckedRows(view, isIncludeCreated = false) {
  if (!view.getCheckedRows().length) {
    await alert(i18n.t('MSG_ALT_NOT_SEL_ITEM'));
    return [];
  }
  if (await confirm(i18n.t('MSG_ALT_WANT_DEL_SEL_ITEM'))) {
    return deleteCheckedRows(view, isIncludeCreated);
  }
  return [];
}

/*
  DirtyCheck
 */
export function init(view) {
  const data = view.getDataSource();
  const allRowValues = getAllRowValues(view, false);

  if (view instanceof TreeView) {
    const treeKey = view.__treeKey__;
    data.setRows(allRowValues, treeKey);
  } else {
    data.setRows(allRowValues);
  }

  view.clearCurrent();
}

export function reset(view) {
  const data = view.getDataSource();
  const createdRows = data.getStateRows(RowState.CREATED);
  const deletedRows = data.getStateRows(RowState.DELETED);

  data.removeRows(createdRows);
  data.setRowStates(deletedRows, RowState.UPDATED);
  data.restoreUpdatedRows();

  if (view.checkBar.visible) {
    view.setAllCheck(false, true);
  }

  view.clearCurrent();
}

export async function confirmReset(view) {
  if (await confirm(i18n.t('MSG_ALT_WANT_RESET'))) {
    reset(view);
  }
}

export function isModified(view) {
  const data = view.getDataSource();
  return data.getStateRows(RowState.CREATED).length > 0
      || data.getStateRows(RowState.UPDATED).length > 0
      || data.getStateRows(RowState.DELETED).length > 0;
}

export async function alertIfIsNotModified(view, message) {
  const isNotModified = !isModified(view);

  if (isNotModified) {
    await alert(message || i18n.t('MSG_ALT_NO_CHG_CNTN'));
  }

  return isNotModified;
}

export function confirmIfIsModified(view, message) {
  return !isModified(view) || confirm(message || i18n.t('MSG_ALT_CHG_CNTN'));
}

/*
  Validation
 */
async function validateRow(view, data, dataRow, metas) {
  const values = getOutputRow(data, dataRow);

  for (let i = 0; i < metas.length; i += 1) {
    const { fieldName, rules, customMessages } = metas[i];
    const column = view.columnByName(fieldName);
    const name = column.header.text || column.name;
    const value = Number.isNaN(values[fieldName]) ? null : values[fieldName];

    let errorMessage;
    const result = await validateValue(value, rules, name, values, customMessages);

    if (!result.valid) {
      const [error] = result.errors;
      errorMessage = error;
    } else {
      const itemIndex = view.getItemIndex(dataRow);
      errorMessage = await view.onValidate(view, { itemIndex, column }, value);
    }

    if (errorMessage) {
      return {
        valid: false, dataRow, fieldName, errorMessage,
      };
    }
  }

  return { valid: true };
}

export async function validate(view, isChangedOnly = true, alertMessage = true) {
  const data = view.getDataSource();
  const metas = view.__metas__.filter((e) => !isEmpty(e.rules));

  const rowCount = data.getRowCount();
  const ignoreStates = [
    RowState.DELETED,
    ...(isChangedOnly ? [RowState.NONE] : []),
  ];

  for (let i = 0; i < rowCount; i += 1) {
    const rowState = data.getRowState(i);

    if (!ignoreStates.includes(rowState)) {
      const result = await validateRow(view, data, i, metas);

      if (!result.valid) {
        if (alertMessage) {
          await alert(result.errorMessage);
          await focusCellInput(view, result.dataRow, result.fieldName);
        }

        return false;
      }
    }
  }

  return true;
}

/*
  Excel
  */
const normalizeExportOptions = (options = {}) => ({
  ...options,
  type: options.exportType || ExportType.EXCEL,
  target: ExportTarget.LOCAL,
  indicator: options.indicator || 'hidden',
  checkBar: options.checkBar || 'hidden',
  fileName: options.fileName?.replace(/\.\w+$/, '') || 'export',
  timePostfix: options.timePostfix === true,
  exportLayout: options.exportLayout,
  exportData: options.exportData,
  lookupDisplay: options.lookupDisplay !== false,
  treeKey: options.treeKey,
});

export async function exportView(view, options) {
  options = normalizeExportOptions(options);

  return new Promise((resolve, reject) => {
    const shouldClone = !!options.exportData;

    if (shouldClone) {
      view = cloneView(view, options);
    }
    if (options.timePostfix) {
      options.fileName = `${options.fileName}_${date.formatDate(new Date(), 'YYYYMMHHHHmmss')}`;
    }

    options.progressCallback = (g, work, max, position) => {
      loadProgress(position);
    };
    options.done = () => {
      if (shouldClone) destroyCloneView(view);

      setTimeout(() => {
        loadProgress(-1);
        resolve();
      }, libConfig.LOADING_PROGRESS_ANIMATION_SPEED);
    };

    loadProgress(0);
    setTimeout(() => {
      try {
        view.exportGrid(options);
      } catch (e) {
        loadProgress(-1);
        reject(e);
      }
    });
  });
}

/*
  Tree
  */
export function getParent(view, dataRow) {
  const data = view.getDataSource();
  return data.hasData(dataRow) ? data.getParent(dataRow) : -1;
}

export function getAncestors(view, dataRow, isAscending = false) {
  const data = view.getDataSource();
  const compareFn = isAscending ? (a, b) => a - b : (a, b) => b - a;
  return (data.hasData(dataRow) && data.getAncestors(dataRow)?.sort(compareFn)) || [];
}

export function getChildren(view, dataRow) {
  const data = view.getDataSource();
  return (data.hasData(dataRow) && data.getChildren(dataRow)) || [];
}

export function getDescendants(view, dataRow) {
  const data = view.getDataSource();
  return (data.hasData(dataRow) && data.getDescendants(dataRow)) || [];
}

export function getSiblings(view, dataRow, isIncludeSelf = true) {
  const parentRow = getParent(view, dataRow);
  const predicate = (e) => isIncludeSelf || e !== dataRow;

  return parentRow > -1
    ? getChildren(view, parentRow).filter(predicate) : [];
}

export function collapse(view, dataRow, isCollapseDescendants = false) {
  const itemIndex = view.getItemIndex(dataRow);
  if (itemIndex > -1) view.collapse(itemIndex, isCollapseDescendants);
}

function recursiveExpand(view, ancestorRows, index = ancestorRows.length - 1) {
  if (index > -1) {
    view.expand(view.getItemIndex(ancestorRows[index]));
    recursiveExpand(view, ancestorRows, index - 1);
  }
}

export function expand(view, dataRow, isExpandDescendants = false) {
  if (!view.getDataSource().hasData(dataRow)) return;

  recursiveExpand(view, getAncestors(view, dataRow));

  if (isExpandDescendants) {
    const itemIndex = view.getItemIndex(dataRow);
    view.expand(itemIndex, true, true);
  }

  view.setCurrent({ dataRow });
}

/* eslint-disable no-await-in-loop */
import {
  omit, keyBy,
  every as _every, filter as _filter, find as _find, forEach as _forEach, map as _map, reduce as _reduce, some as _some,
} from 'lodash-es';
import { date } from 'quasar';
import { RowState, TreeView, ExportTarget, ExportType } from 'realgrid';
import { waitUntilShowEditor, createCellIndexByDataColumn, cloneView, destroyCloneView, isCellEditable } from './private/gridShared';
import libConfig from '../consts/private/libConfig';
import { alert, confirm } from '../plugins/dialog';
import { notify } from '../plugins/notify';
import { loadProgress } from '../plugins/loading';
import _validate from '../validate';
import i18n from '../i18n';
import { timeout } from './private/tick';

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
export async function scrollIntoView(view) {
  const el = view._view.container._containerDiv;
  window.scroll({ top: el.offsetTop });
}

export async function focusCellInput(view, dataRow, column, dropdown = false) {
  scrollIntoView(view);
  view.setCurrent({ dataRow, column });
  await waitUntilShowEditor(view, dropdown);
}

/*
  RowData
 */
export function getRowState(view, dataRow) {
  const data = view.getDataSource();
  return data.hasData(dataRow) ? data.getRowState(dataRow) : null;
}

export function isReadRow(view, dataRow) {
  return getRowState(view, dataRow) === RowState.NONE;
}

export function isCreatedRow(view, dataRow) {
  return getRowState(view, dataRow) === RowState.CREATED;
}

export function isUpdatedRow(view, dataRow) {
  return getRowState(view, dataRow) === RowState.UPDATED;
}

export function isDeletedRow(view, dataRow) {
  return getRowState(view, dataRow) === RowState.DELETED;
}

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

export function getAllRowValues(view, isIncludeDeleted = false) {
  const length = view.getDataSource().getRowCount();
  const startRow = view instanceof TreeView ? 1 : 0;
  const allRows = Array.from({ length }, (v, i) => i + startRow);

  return getRowValues(view, allRows)
    .filter((e) => isIncludeDeleted || e.rowState !== RowState.DELETED);
}

export function alertIfIsNotChecked(view, message) {
  const checkedRows = view.getCheckedRows();
  if (!checkedRows.length) {
    notify(message || i18n.t('MSG_ALT_NOT_SEL_ITEM'));
    // await alert(message || i18n.t('MSG_ALT_NOT_SEL_ITEM'));
  }

  return checkedRows.length > 0;
}

export function alertIfIsNotSelected(view, message) {
  const selectedRows = view.getSelectedRows();
  if (!selectedRows.length) {
    notify(message || i18n.t('MSG_ALT_NOT_SEL_ITEM'));
    // await alert(message || i18n.t('MSG_ALT_NOT_SEL_ITEM'));
  }

  return selectedRows.length > 0;
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

export function findDataRow(view, predicate, fromDataRow = -1) {
  return find(view, predicate, fromDataRow)?.dataRow ?? -1;
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
  if (!alertIfIsNotSelected(view)) return;

  const selectedDataRows = view.getSelectedRows();
  const changedDataRows = getChangedRowValues(view).map((row) => row.dataRow);

  if (changedDataRows.length === 0 || changedDataRows.every((row) => selectedDataRows.includes(row))) {
    if (await confirm(i18n.t('MSG_ALT_WANT_DEL_SEL_ITEM'))) {
      return deleteSelectedRows(view, isIncludeCreated);
    }
  } else if (await confirm(i18n.t('MSG_ALT_CHK_CHGD_ROW'))) {
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
  if (!alertIfIsNotChecked(view)) return [];

  const checkedDataRows = view.getCheckedRows();
  const changedDataRows = getChangedRowValues(view).map((row) => row.dataRow);

  if (changedDataRows.length === 0 || changedDataRows.every((row) => checkedDataRows.includes(row))) {
    if (await confirm(i18n.t('MSG_ALT_WANT_DEL_SEL_ITEM'))) {
      return deleteCheckedRows(view, isIncludeCreated);
    }
  } else if (await confirm(i18n.t('MSG_ALT_CHK_CHGD_ROW'))) {
    return deleteCheckedRows(view, isIncludeCreated);
  }

  return [];
}

export async function insertRowAndFocus(view, dataRow, rowValue, column, shouldCheck = false) {
  const data = view.getDataSource();
  const { itemIndex } = view.getCurrent();
  let row;
  if (view.getCurrent().dataRow < 0) row = 0;
  else row = dataRow === 0 && dataRow !== view.getCurrent().dataRow ? view.getDataRow(0) : view.getDataRow(itemIndex);
  const inserted = data.insertRow(row, rowValue);

  if (inserted) {
    const shouldFocus = column !== false;

    if (shouldFocus) {
      await focusCellInput(view, row, column);
    }
    if (shouldCheck) {
      const exclusive = view.checkBar.exclusive === true;
      view.checkRow(row, true, exclusive, true);
    }
  }

  return inserted;
}

/*
  DirtyCheck
 */
export function init(view, shouldClearCurrnet = false) {
  const data = view.getDataSource();
  data.clearRowStates(true, false);

  if (shouldClearCurrnet) {
    view.clearCurrent();
  }
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

export function alertIfIsNotModified(view, message) {
  const isNotModified = !isModified(view);

  if (isNotModified) {
    notify(message || i18n.t('MSG_ALT_NO_CHG_CNTN'));
    // await alert();
  }

  return isNotModified;
}

export function confirmIfIsModified(view, message) {
  return !isModified(view) || confirm(message || i18n.t('MSG_ALT_CHG_CNTN'));
}

/*
  Validation
 */
async function validateRules(view, column, value, values, bails) {
  const {
    rules, customMessages,
  } = _find(view.__columns__, { name: column.name }) || {};

  if (rules) {
    const name = column.header.text || column.name;
    const { errors } = await _validate(value, rules, {
      name, values, customMessages, bails,
    });

    return errors;
  }

  return [];
}

async function validateCallback(view, column, index, value, values) {
  const result = await view.onValidate(view, index, value, values);
  const resultIsError = result === false || typeof result === 'string';

  if (resultIsError) {
    const name = column.header.text || column.name;
    const error = resultIsError === false ? i18n.t('MSG_VAL_INVALID', [name]) : result;

    return [error];
  }

  return [];
}

export async function validateRow(view, dataRow, bails = true, includeUneditable = false) {
  const validationErrors = [];
  const data = view.getDataSource();
  const itemIndex = view.getItemIndex(dataRow);
  const columns = view.getColumns();
  const values = getOutputRow(data, dataRow);

  for (let i = 0; i < columns.length; i += 1) {
    const column = columns[i];
    const index = createCellIndexByDataColumn(view, itemIndex, column);

    if (isCellEditable(view, column, index) || includeUneditable) { // editable false 인 셀들도 모두 validation
      const { name, fieldName } = column;
      const value = Number.isNaN(values[fieldName]) ? null : values[fieldName];

      const errors = await validateRules(view, column, value, values, bails);
      const ignoreCallback = errors.length > 0 && bails === true;

      if (ignoreCallback === false) {
        errors.push(
          ...(await validateCallback(view, column, index, value, values)),
        );
      }

      const invalid = errors.length > 0;

      if (invalid) {
        validationErrors.push({
          dataRow,
          column: name,
          fieldName,
          errors,
        });

        if (bails) break;
      }
    }
  }

  return validationErrors;
}

export async function validate(view, options = {}) {
  const {
    isChangedOnly = true,
    isCheckedOnly = false,
    isAlertMessage = true,
    includeUneditable = false,
    bails = true,
  } = options;

  const validationErrors = [];
  const data = view.getDataSource();
  const rowCount = data.getRowCount();

  for (let i = 0; i < rowCount; i += 1) {
    const rowState = data.getRowState(i);

    const shouldValidate = rowState !== RowState.DELETED
      && (isCheckedOnly || !isChangedOnly || rowState !== RowState.NONE)// isCheckedOnly 가 true면 true
      && (!isCheckedOnly || view.isCheckedRow(i));

    if (shouldValidate) {
      const result = await validateRow(view, i, bails, includeUneditable);
      const invalid = result.length > 0;

      if (invalid) {
        validationErrors.push(...result);

        if (bails) break;
      }
    }
  }

  view.__validationErrors__ = validationErrors;

  const valid = validationErrors.length === 0;
  const shouldAlertMessage = !valid && isAlertMessage;

  if (shouldAlertMessage) {
    const {
      dataRow,
      column,
      errors,
    } = validationErrors[0];

    await alert(errors[0]);
    await focusCellInput(view, dataRow, column);
  }

  return valid;
}

export function editColumnValidateRules(view, { targetColumn = undefined, targetRule = null, newRule = null, action = 'delete' }) {
  if (!targetColumn || !targetRule) return;
  const column = _find(view.__columns__, { name: targetColumn }) || null;
  if (!column) return;

  const rules = column.rules.split('|');
  const targetRuleIndex = rules.findIndex((rule) => rule === targetRule || rule.indexOf(targetRule) >= 0);
  switch (action) {
    case 'edit':
    case 'delete': {
      if (targetRule === 'all') {
        column.rules = null;
        return;
      }
      if (targetRuleIndex >= 0) rules.splice(targetRuleIndex, 1);
      if (action === 'edit' && newRule) rules.push(newRule);
      break;
    }
    case 'add': {
      if (targetRuleIndex >= 0) return; // 같은 룰이 이미 있으면 추가는 안되게끔
      rules.push(targetRule);
    }
  }
  column.rules = rules.join('|');
}

export function getValidationErrors(view) {
  return view.__validationErrors__ || [];
}

export function getPageIndexOffset(pageInfo) {
  return (pageInfo.value.pageIndex - 1) * pageInfo.value.pageSize;
}

/*
  Excel
  */
const normalizeExportOptions = (options = {}) => ({
  ...options,
  type: options.exportType || ExportType.EXCEL,
  target: ExportTarget.LOCAL,
  indicator: options.indicator || 'default',
  checkBar: options.checkBar || 'hidden',
  footer: options.footer || 'default',
  header: options.header || 'default',
  headerSummary: options.headerSummary || 'default',
  fileName: options.fileName?.replace(/\.\w+$/, '') || 'export',
  timePostfix: options.timePostfix === true,
  exportLayout: options.exportLayout,
  exportData: options.exportData,
  lookupDisplay: options.lookupDisplay !== false,
  treeKey: options.treeKey,
  searchCondition: options.searchCondition !== false,
  allColumns: options.allColumns === true,
  hideColumns: options.hideColumns || [],
});

function exportGrid(view, options, onProgress, onComplete) {
  return new Promise((resolve, reject) => {
    view.exportGrid({
      ...options,
      progressCallback(g, work, max, position) {
        onProgress(position);
      },
      done() {
        onComplete()
          .then(resolve)
          .catch(reject);
      },
    });
  });
}

function getLayoutWidthByColumn(layout, columns) {
  let width;
  if (layout.items?.length > 0) {
    layout.items.forEach((item) => { item.width = getLayoutWidthByColumn(item, columns) + 15; });
  } else {
    const column = columns.find((col) => col._name === layout.column);
    width = column._width + 15;
  }
  return width;
}

export async function exportView(view, options) {
  options = normalizeExportOptions(options);
  if (!options.exportLayout) {
    options.exportLayout = view.__originalLayouts__;
    if (options.exportLayout.includes(undefined)) {
      view.__originalLayouts__ = view.saveColumnLayout();
      options.exportLayout = view.__originalLayouts__;
    }
    const columns = view.getColumns();
    options.exportLayout.forEach((layout) => {
      layout.width = getLayoutWidthByColumn(layout, columns);
      if (!options.allColumns) layout.visible = columns.find((col) => col._name === layout.column)?.visible;
      if (options.hideColumns && options.hideColumns.includes(layout.column)) layout.visible = false;
    });
  }
  if (options.searchCondition && !!options.exportData) {
    const message = view.__searchConditionText__;

    if (message !== '') {
      options.documentTitle = {
        message,
        visible: true,
        spaceTop: 0,
        spaceBottom: 0,
        height: 100,
        styleName: 'documentStyle',
      };
    }
  }
  const shouldClone = !!options.exportData;

  if (shouldClone) {
    view = await cloneView(view, options);
  }

  if (options.timePostfix) {
    const postfix = date.formatDate(new Date(), 'YYYYMMDDHHmmss');
    options.fileName = `${options.fileName}_${postfix}`;
  }

  const onProgress = loadProgress;
  const onComplete = async () => {
    await timeout();

    if (shouldClone) {
      destroyCloneView(view);
    }
    await timeout(libConfig.LOADING_PROGRESS_ANIMATION_SPEED);
  };

  try {
    loadProgress(0);
    await exportGrid(view, options, onProgress, onComplete);
  } finally {
    loadProgress(-1);
  }
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

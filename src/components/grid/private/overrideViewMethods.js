import { cloneDeep, defaultsDeep, map, merge, isEmpty } from 'lodash-es';
import dayjs from 'dayjs';
import { ButtonVisibility, ValueType } from 'realgrid';
import { wrapMethod, execOriginal } from './overrideWrap';
import {
  createCellIndexByDataColumn, getSessionDatetimeFormat, getTextDatetimeFormat,
  isCellEditable, isCellItem, isCellItemClickable,
} from '../../../utils/private/gridShared';
import i18n from '../../../i18n';
import { sanitize } from '../../../plugins/sanitize';

const setColumn = 'setColumn';
const setColumns = 'setColumns';
const addColumn = 'addColumn';
const removeColumn = 'removeColumn';
const setCellStyleCallback = 'setCellStyleCallback';
const setColumnLayout = 'setColumnLayout';
const destroy = 'destroy';

const firstOptionLabels = {
  all: ['MSG_TXT_ALL', null, '전체'],
  select: ['MSG_TXT_SEL', null, '선택'],
};

function setColumnDefault(column, field) {
  // filter
  defaultsDeep(column, {
    autoFilter: true,
  });

  if (field?.dataType === 'number') {
    defaultsDeep(column, { numberFormat: '#,##0' });
  }
}

function setColumnHeader(column) {
  column.header ||= {};
  column.header = typeof column.header === 'string' ? { text: column.header } : column.header;
  column.header.tooltip = column.header.tooltip || column.header.text;

  const headerClass = [column.header.styleName];

  // required
  if (column.required === true || column.rules?.includes('required')) {
    headerClass.push('rg-header-cell--required');
  }
  // hint
  if (column.hint) {
    const text = column.header.text || column.name || column.fieldName;
    column.header.template ||= `${text} <i class="rg-header-cell__hint" title="${column.hint}" />`;
  }

  column.header.template = sanitize(column.header.template);
  column.header.styleName = headerClass.join(' ').trim();
}

function setColumnOptions(column) {
  if (Array.isArray(column.options)) {
    const copyOptions = [];
    const optionValue = column.optionValue || 'codeId';
    const optionLabel = column.optionLabel || 'codeName';

    if (column.firstOption) {
      const defaultLabel = firstOptionLabels[column.firstOption]
        && i18n.t(...firstOptionLabels[column.firstOption]);

      copyOptions.push({
        [optionValue]: column.firstOptionValue || '',
        [optionLabel]: column.firstOptionLabel || defaultLabel,
      });
    }

    copyOptions.push(...column.options);

    defaultsDeep(column, {
      lookupDisplay: typeof column.displayCallback !== 'function',
      values: map(copyOptions, optionValue),
      labels: map(copyOptions, optionLabel),
    });
  }
}

function setColumnStyleName(column, { dataType }) {
  defaultsDeep(column, {
    styleName: '',
  });

  const colClass = column.styleName.split(/\s+/).filter((e) => !!e);
  const alignClass = ['text-left', 'text-center', 'text-right'];

  // set align class
  if (!alignClass.some((e) => colClass.includes(e))) {
    if (column.renderer?.type) {
      switch (column.renderer.type) {
        case 'button': {
          if (column.styleName.includes('rg-button-link')) {
            colClass.push(alignClass[0]);
          }
          break;
        }
      }
    } else if (dataType === ValueType.NUMBER) {
      colClass.push(alignClass[2]);
    } else {
      switch (column.editor?.type) {
        case undefined:
        case 'text':
        case 'line':
        case 'multiline':
        case 'list':
        case 'dropdown':
        case 'btdate':
          colClass.push(alignClass[0]);
          break;
        case 'number':
          colClass.push(alignClass[2]);
          break;
        // default:
        //   colClass.push(alignClass[1]);
        //   break;
      }
    }
  }

  // set button class
  if (column.renderer?.type === 'button') {
    const btnClassCount = colClass.reduce((a, v) => (v.includes('rg-button-') ? a + 1 : a), 0);
    const hasDisabledClass = colClass.some((v) => v === 'rg-button-disabled');
    const shouldSetDefaultClass = btnClassCount === 0 || (btnClassCount === 1 && hasDisabledClass);

    if (shouldSetDefaultClass) {
      colClass.push('rg-button-default');
    }
  }

  if (column.editor?.type === 'list' || column.editor?.type === 'dropdown') {
    colClass.push('rg-list-editor');
  }

  column.styleName = colClass.join(' ').trim();
}

function setColumnRenderer(column, { dataType }) {
  if (typeof column.renderer === 'string') {
    column.renderer = {
      type: column.renderer,
    };
  }

  if (column.editor?.type === 'file') {
    const styleNames = column.styleName.split(' ');
    const { editor } = column;
    styleNames.push('rg-file-button');
    styleNames.push('text-center');
    column.styleName = styleNames.join(' ');
    column.renderer = {
      type: 'html',
      hideWhenEmpty: false,
      callback: (grid, cell) => {
        const dp = grid.getDataSource();
        const row = dp.getOutputRow({}, cell.index.dataRow);

        const isDisable = row[editor.disable] ?? editor.disable;

        const value = cell?.value?.__numberOfFiles;
        if (!value || value < 1) { // 없을 때
          if (column.editor.hideWhenEmpty) return '';
          const res = `<div class="rg-button-default ${isDisable ? 'rg-disabled-column' : ''}">`
                    + '<button type="button" tabindex="-1" class="rg-button-renderer-button">'
                    + '파일찾기</button></div>';
          return res;
        }

        let res = `<div class="rg-html-renderer ${isDisable ? 'rg-disabled-column' : ''}">`
          + '<button type="button" tabindex="-1" class="rg-button-renderer-button">';
        if (value && value !== '0') {
          const badge = '<div class="q-badge flex inline items-center no-wrap q-badge--single-line'
          + 'q-badge--floating q-badge--rounded alert-badge grid-badge" role="status" aria-label="2">'
          + `${value > 99 ? '99+' : value}</div>`;
          res += badge;
        }

        res += '</button></div>';

        return res;
      },
    };
  }

  defaultsDeep(column, {
    renderer: {
      showTooltip: true,
    },
  });

  switch (column.renderer?.type) {
    case 'check': {
      defaultsDeep(column, {
        editable: false,
        renderer: {
          ...(dataType === ValueType.TEXT ? {
            trueValues: 'Y',
            falseValues: 'N',
          } : {}),
          useImages: true,
        },
      });

      const { setCheckedCallback } = column.renderer;

      merge(column.renderer, {
        setCheckedCallback(g, itemIndex, dataColumn, oldValue, newValue) {
          const index = createCellIndexByDataColumn(g, itemIndex, dataColumn);
          if (isCellEditable(g, dataColumn, index) === false) {
            return oldValue;
          }

          if (setCheckedCallback) {
            return setCheckedCallback(g, itemIndex, dataColumn, oldValue, newValue);
          }

          if (dataColumn.valueType === ValueType.TEXT) {
            const { trueValues, falseValues } = dataColumn.renderer;
            return (newValue ? trueValues : falseValues)?.split(',')[0] || newValue;
          }

          return newValue;
        },
      });

      break;
    }
    case 'checkList':
    case 'radio': {
      defaultsDeep(column, {
        editable: false,
      });
      break;
    }
    case 'button': {
      const { styleName } = column;

      defaultsDeep(column, {
        editable: false,
        sortable: styleName.includes('rg-button-link'),
        renderer: {
          hideWhenEmpty: !styleName.includes('rg-button-icon') && dataType !== ValueType.NUMBER,
        },
      });
      break;
    }
    case 'image':
    case 'icon':
    case 'bar':
      defaultsDeep(column, {
        editable: false,
        sortable: false,
      });
      break;
    default: {
      if (dataType === ValueType.NUMBER) {
        defaultsDeep(column, {
          numberFormat: '###,###,##0',
        });
      } else if (column.datetimeFormat) {
        column.datetimeFormat = getSessionDatetimeFormat(column.datetimeFormat);
        if (dataType === ValueType.TEXT) {
          defaultsDeep(column, {
            ...(column.datetimeFormat === 'yyyy-MM-dd' ? {
              displayCallback: (g, i, v) => {
                if (v) {
                  if (v?.length >= 9) return dayjs(v, 'YYYYMMDDHH24MISS').format('YYYY-MM-DD');
                  return dayjs(v, 'YYYYMMDD').format('YYYY-MM-DD');
                }
                return v;
              },
            } : { textFormat: getTextDatetimeFormat(column.datetimeFormat) }),
          });
        }
      }

      break;
    }
  }
}

function setColumnEditor(column, { dataType }, provider) {
  const { editor } = column;
  switch (editor?.type) {
    case 'file':
      defaultsDeep(column, {
        editable: false,
        objectCallback: (fieldName, dataRow, value) => {
          const row = provider.getOutputRow({}, dataRow);
          const isDisable = row[editor.disable] ?? editor.disable;

          if (isDisable) {
            return isEmpty(editor.disableMessage?.trim()) ? '사용할 수 없습니다.' : editor.disableMessage?.trim();
          }

          if (editor.hideWhenEmpty) {
            return value.__numberOfFiles && value.__numberOfFiles > 0 ? '첨부파일' : '';
          }
          return value.__numberOfFiles && value.__numberOfFiles > 0 ? '첨부파일' : '파일찾기';
        },
      });
      break;
    case 'number':
      defaultsDeep(column, {
        editButtonVisibility: ButtonVisibility.ALWAYS,
        editor: {
          showStepButton: false,
          maxIntegerLength: 13,
          textReadOnly: false,
          // editFormat: '#,##0.######',
        },
      });
      break;
    case 'list':
    case 'dropdown':
      defaultsDeep(column, {
        lookupDisplay: typeof column.displayCallback !== 'function',
        editButtonVisibility: ButtonVisibility.ALWAYS,
        editor: {
          commitOnSelect: true,
          domainOnly: true,
          dropDownWhenClick: true,
          textReadOnly: true,
        },
      });
      break;
    case 'date':
      column.editor.type = 'btdate';
      setColumnEditor(column, { dataType });
      break;
    case 'btdate': {
      defaultsDeep(column, {
        editButtonVisibility: ButtonVisibility.ALWAYS,
        datetimeFormat: 'date',
        editor: {
          viewGridInside: false,
          commitOnSelect: true,
          dropDownWhenClick: true,
          textReadOnly: false,
          maxDate: new Date('9999-12-31'),
          btOptions: {
            language: i18n.locale.value,
            keyboardNavigation: false,
            todayHighlight: true,
            minViewMode: 0,
            maxViewMode: 2,
            beforeShowDay(value) {
              switch (value.getDay()) {
                case 0: return 'sunday';
                case 6: return 'saturday';
              }
            },
          },
        },
      });

      column.editor.datetimeFormat ||= column.datetimeFormat;
      column.datetimeFormat = getSessionDatetimeFormat(column.datetimeFormat);
      column.editor.datetimeFormat = getSessionDatetimeFormat(column.editor.datetimeFormat).replace(/[^ymdhms]/gi, '');

      defaultsDeep(column, {
        editor: {
          mask: {
            editMask: column.editor.datetimeFormat.replace(/[ymdhms]/gi, '9'),
            includedFormat: true,
            showInvalidFormatMessage: false,
          },
        },
      });

      if (dataType === ValueType.TEXT) {
        defaultsDeep(column, {
          ...(column.datetimeFormat === 'yyyy-MM-dd' ? {
            displayCallback: (g, i, v) => {
              if (v) {
                if (v?.length >= 9) return dayjs(v, 'YYYYMMDDHH24MISS').format('YYYY-MM-DD');
                return dayjs(v, 'YYYYMMDD').format('YYYY-MM-DD');
              }
              return v;
            },
          } : { textFormat: getTextDatetimeFormat(column.datetimeFormat) }),
        });
      }
      break;
    }
  }
}

function setColumnCellButton(column) {
  if (column.button) {
    defaultsDeep(column, {
      buttonVisibility: ButtonVisibility.ALWAYS,
    });
  }
}

function overrideStyleCallback(styleCallback, isGlobal = false) {
  const normalizeOriginalResult = (val) => (typeof val === 'string' ? { styleName: val } : { ...val });

  return (g, model) => {
    const { column, itemIndex } = model.index;
    const shouldIgnore = isGlobal && typeof column.styleCallback === 'function';

    if (shouldIgnore) return;

    const originalResult = normalizeOriginalResult(styleCallback?.(g, model));
    const classes = [(originalResult.styleName || column.styleName).trim()];
    const mergedColumn = { ...column, ...originalResult };

    const { dataColumn } = model;
    const index = createCellIndexByDataColumn(g, itemIndex, dataColumn);

    if (isCellEditable(g, mergedColumn, index)) {
      classes.push('rg-editable');
    }
    if (isCellItem(g, mergedColumn) && isCellItemClickable(g, mergedColumn, index) === false) {
      classes.push('rg-button-disabled');
    }

    originalResult.styleName = classes.join(' ').trim();
    return originalResult;
  };
}

function setColumnStyleCallback(column) {
  if (typeof column.styleCallback === 'function') {
    column.styleCallback = overrideStyleCallback(column.styleCallback);
  }
}

function normalizeColumn(column, view) {
  const normalizedColumn = cloneDeep(column);
  const data = view.getDataSource();
  const field = data.fieldByName(column.fieldName);
  setColumnDefault(normalizedColumn, field);
  setColumnHeader(normalizedColumn, field);
  setColumnOptions(normalizedColumn, field);
  setColumnStyleName(normalizedColumn, field);
  setColumnRenderer(normalizedColumn, field);
  setColumnEditor(normalizedColumn, field, data);
  setColumnCellButton(normalizedColumn, field);
  setColumnStyleCallback(normalizedColumn, field);

  return normalizedColumn;
}

/*
  그리드에 설정된 컬럼의 정보를 변경한다
  */
export function overrideSetColumn(view) {
  wrapMethod(view, setColumn, (column) => {
    const orgColumn = view.columnByName(column.name);

    if (orgColumn) {
      const { fieldName } = orgColumn;
      const normalizedColumn = normalizeColumn({ ...column, fieldName }, view);

      execOriginal(view, setColumn, normalizedColumn);

      const index = view.__columns__.findIndex((e) => e.name === column.name);

      if (index > -1) {
        view.__columns__[index] = {
          name: normalizedColumn.name,
          fieldName: normalizedColumn.fieldName,
          rules: normalizedColumn.rules,
          customMessages: normalizedColumn.customMessages,
          preventCellItemFocus: normalizedColumn.preventCellItemFocus === true,
        };
      }
    }
  });
}

/*
  기존에 설정된 컬럼들을 모두 제거하고 새로운 컬럼들로 그리드를 재구성한다
  */
export function overrideSetColumns(view) {
  wrapMethod(view, setColumns, (columns) => {
    const normalizedColumns = map(columns, (column) => normalizeColumn(column, view));
    execOriginal(view, setColumns, normalizedColumns);

    const columnNames = view.getColumns().map((e) => e.name);
    view.__columns__ = map(normalizedColumns, (normalizedColumn, i) => ({
      name: columnNames[i],
      fieldName: normalizedColumn.fieldName,
      rules: normalizedColumn.rules,
      customMessages: normalizedColumn.customMessages,
      preventCellItemFocus: normalizedColumn.preventCellItemFocus === true,
    }));
  });
}

/*
  설정된 컬럼들 외에 추가로 컬럼을 설정한다
  */
export function overrideAddColumn(view) {
  wrapMethod(view, addColumn, (column, index) => {
    const normalizedColumn = normalizeColumn(column, view);

    execOriginal(view, addColumn, normalizedColumn, index);

    const columns = view.getColumns();
    const columnName = columns[index ?? columns.length - 1].name;

    view.__columns__.push({
      name: columnName,
      fieldName: normalizedColumn.fieldName,
      rules: normalizedColumn.rules,
      customMessages: normalizedColumn.customMessages,
      preventCellItemFocus: normalizedColumn.preventCellItemFocus === true,
    });
  });
}

/*
  해당 컬럼을 제거한다
  */
export function overrideRemoveColumn(view) {
  wrapMethod(view, removeColumn, (column) => {
    execOriginal(view, removeColumn, column);

    const index = view.__columns__.findIndex((e) => e.name === column);

    if (index > -1) {
      view.__columns__.splice(index, 1);
    }
  });
}

/*
  셀 스타일을 변경하는 콜백
  column.styleCallback이 있는 경우, 호출되지 않는다.
  */
export function overrideSetCellStyleCallback(view) {
  wrapMethod(view, setCellStyleCallback, (styleCallback) => {
    execOriginal(view, setCellStyleCallback, overrideStyleCallback(styleCallback, true));
  });

  view.setCellStyleCallback(null);
}

/*
  그리드의 컬럼 레이아웃을 설정한다.
  */
export function overrideSetColumnLayout(view, vm) {
  wrapMethod(view, setColumnLayout, (layout) => {
    execOriginal(view, setColumnLayout, layout);

    setTimeout(() => {
      // 의도적인 setColumnLayout 시에는 original Layouts 을 변경해준다.
      view.__originalLayouts__ = view.saveColumnLayout();
      vm.proxy.onResize?.();
    });
  });
}

/*
  그리드를 해제한다.
  */
export function overrideDestory(view) {
  wrapMethod(view, destroy, () => {
    execOriginal(view, destroy);

    // private attributes
    delete view.__originalFns__;
    delete view.__originalLayouts__;
    delete view.__originalColumnInfos__;
    delete view.__registeredEvents__;
    delete view.__gridName__;
    delete view.__columns__;
    delete view.__validationErrors__;
    delete view.__treeKey__;
    delete view.__searchConditionText__;
  });
}

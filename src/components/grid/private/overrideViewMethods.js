import { defaultsDeep, map, merge } from 'lodash-es';
import { ButtonVisibility, ValueType } from 'realgrid';
import { wrapMethod, execOriginal } from './overrideWrap';
import {
  createCellIndexByDataColumn, getSessionDatetimeFormat, getTextDatetimeFormat, isCellEditable, isCellItemClickable,
} from '../../../utils/private/gridShared';
import i18n from '../../../i18n';

const setColumns = 'setColumns';
const setCellStyleCallback = 'setCellStyleCallback';
const setColumnLayout = 'setColumnLayout';
const destroy = 'destroy';

const firstOptionLabels = {
  all: ['MSG_TXT_ALL', null, '전체'],
  select: ['MSG_TXT_SEL', null, '선택'],
};

function setColumnCustom(column) {
  const { options } = column;

  if (Array.isArray(options)) {
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

    copyOptions.push(...options);

    defaultsDeep(column, {
      lookupDisplay: typeof column.displayCallback !== 'function',
      values: map(copyOptions, optionValue),
      labels: map(copyOptions, optionLabel),
    });
  }
}

function setColumnHeader(column) {
  if (column.header) {
    column.header = typeof column.header === 'string' ? { text: column.header } : column.header;
    column.header.tooltip = column.header.tooltip || column.header.text;
  }
}

function setColumnStyleName(column, { dataType }) {
  defaultsDeep(column, {
    styleName: '',
  });

  const alignClass = ['text-left', 'text-center', 'text-right'];
  const colClass = column.styleName.split(/\s+/).filter((e) => !!e);

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

  column.styleName = colClass.join(' ');
}

function setColumnRenderer(column, { dataType }) {
  defaultsDeep(column, {
    renderer: { showTooltip: true },
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
          if (g.onCellEditable(g, index) === false) {
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
    case 'button': {
      const { styleName } = column;

      defaultsDeep(column, {
        editable: false,
        sortable: styleName.includes('rg-button-link'),
        renderer: {
          hideWhenEmpty: !styleName.includes('rg-button-icon'),
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
          numberFormat: '#,##0.######',
        });
      } else if (column.datetimeFormat) {
        column.datetimeFormat = getSessionDatetimeFormat(column.datetimeFormat);

        if (ValueType.TEXT) {
          defaultsDeep(column, {
            textFormat: getTextDatetimeFormat(column.datetimeFormat),
          });
        }
      }

      break;
    }
  }
}

function setColumnEditor(column, { dataType }) {
  const { editor } = column;

  switch (editor?.type) {
    case 'number':
      defaultsDeep(column, {
        editor: {
          maxIntegerLength: 13,
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
          dropDownWhenClick: false,
          textReadOnly: true,
        },
      });
      break;
    case 'btdate': {
      defaultsDeep(column, {
        editButtonVisibility: ButtonVisibility.ALWAYS,
        datetimeFormat: 'date',
        editor: {
          viewGridInside: false,
          commitOnSelect: true,
          dropDownWhenClick: false,
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
        ...(dataType === ValueType.TEXT ? {
          textFormat: getTextDatetimeFormat(column.datetimeFormat),
        } : {}),
        editor: {
          mask: {
            editMask: column.editor.datetimeFormat.replace(/[ymdhms]/gi, '9'),
            includedFormat: true,
            showInvalidFormatMessage: false,
          },
        },
      });

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
  const normalizeReturnValue = (val) => (typeof val === 'string' ? { styleName: val } : (val || {}));

  return (g, model) => {
    const { column, itemIndex } = model.index;
    const shouldIgnore = isGlobal && typeof column.styleCallback === 'function';

    if (shouldIgnore) return;

    const returnValue = normalizeReturnValue(styleCallback?.(g, model));
    const classes = [(returnValue.styleName || column.styleName).trim()];
    const mergedColumn = { ...column, ...returnValue };

    const { dataColumn } = model;
    const index = createCellIndexByDataColumn(g, itemIndex, dataColumn);

    if (isCellEditable(g, mergedColumn, index)) classes.push('rg-editable');
    if (isCellItemClickable(g, mergedColumn, index)) classes.push('rg-button-enabled');

    returnValue.styleName = classes.join(' ');
    return returnValue;
  };
}

function setColumnStyleCallback(column) {
  if (typeof column.styleCallback === 'function') {
    column.styleCallback = overrideStyleCallback(column.styleCallback);
  }
}

/*
  기존에 설정된 컬럼들을 모두 제거하고 새로운 컬럼들로 그리드를 재구성한다.
  */
export function overrideSetColumns(view) {
  wrapMethod(view, setColumns, (columns) => {
    const data = view.getDataSource();

    columns.forEach((e) => {
      const field = data.fieldByName(e.fieldName);
      setColumnCustom(e, field);
      setColumnHeader(e, field);
      setColumnStyleName(e, field);
      setColumnRenderer(e, field);
      setColumnEditor(e, field);
      setColumnCellButton(e, field);
      setColumnStyleCallback(e);
    });

    view.__metas__ = map(columns, (e) => ({
      fieldName: e.fieldName,
      column: e.column || e.fieldName,
      rules: e.rules,
      customMessages: e.customMessages,
      preventCellItemFocus: e.preventCellItemFocus === true,
    }));

    execOriginal(view, setColumns, columns);
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
    delete view.__registeredEvents__;
    delete view.__metas__;
  });
}

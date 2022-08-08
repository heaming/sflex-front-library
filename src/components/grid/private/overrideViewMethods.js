import { defaultsDeep, map, merge } from 'lodash-es';
import { ButtonVisibility, ValueType } from 'realgrid';
import { wrapMethod, execOriginal } from './overrideWrap';
import { createCellIndexByDataColumn, dateTextFormat, isCellEditable } from '../../../utils/private/gridShared';
import { normalizeRules } from '../../../utils/private/validate';
import i18n from '../../../i18n';

const setColumns = 'setColumns';
const setCellStyleCallback = 'setCellStyleCallback';
const destroy = 'destroy';

const firstOptionLabels = {
  all: ['MSG_TXT_ALL', null, '전체'],
  select: ['MSG_TXT_SEL', null, '선택'],
};

function setColumnCustomDefaults(column) {
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

function setColumnHeaderDefaults(column) {
  if (column.header) {
    column.header = typeof column.header === 'string' ? { text: column.header } : column.header;
    column.header.tooltip = column.header.tooltip || column.header.text;
  }
}

function setColumnStyleNameDefaults(column, { dataType }) {
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

function setColumnRendererDefaults(column, { dataType }) {
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
      if (dataType === ValueType.TEXT && column.datetimeFormat) {
        defaultsDeep(column, {
          textFormat: dateTextFormat(column.datetimeFormat),
        });
      } else if (dataType === ValueType.NUMBER) {
        defaultsDeep(column, {
          numberFormat: '#,##0.######',
        });
      }
      break;
    }
  }
}

function setColumnEditorDefaults(column, { dataType }) {
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
    case 'btdate':
      defaultsDeep(column, {
        editButtonVisibility: ButtonVisibility.ALWAYS,
        datetimeFormat: 'yyyy-MM-dd',
        editor: {
          commitOnSelect: true,
          dropDownWhenClick: false,
          datetimeFormat: 'yyyyMMdd',
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

      defaultsDeep(column, {
        ...(dataType === ValueType.TEXT ? {
          textFormat: dateTextFormat(column.datetimeFormat),
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

function setColumnCellButtonDefaults(column) {
  if (column.button) {
    defaultsDeep(column, {
      buttonVisibility: ButtonVisibility.ALWAYS,
    });
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
      setColumnCustomDefaults(e, field);
      setColumnHeaderDefaults(e, field);
      setColumnStyleNameDefaults(e, field);
      setColumnRendererDefaults(e, field);
      setColumnEditorDefaults(e, field);
      setColumnCellButtonDefaults(e, field);
    });

    view.__metas__ = map(columns, (e) => ({
      fieldName: e.fieldName,
      column: e.column || e.fieldName,
      rules: normalizeRules(e.rules),
      customMessages: e.customMessages,
      preventCellItemFocus: e.preventCellItemFocus === true,
    }));

    execOriginal(view, setColumns, columns);
  });
}

/*
  셀 스타일을 변경하는 콜백
  */
export function overrideSetCellStyleCallback(view) {
  wrapMethod(view, setCellStyleCallback, (styleCallback) => {
    execOriginal(view, setCellStyleCallback, (g, model) => {
      const { column } = model.index;
      const index = createCellIndexByDataColumn(g, model.index.itemIndex, model.dataColumn);

      // TODO: something..
      if (isCellEditable(view, model.index.column, index)) {
        return `${column.styleName} rg-editable`;
      }

      if (typeof styleCallback === 'function') {
        return styleCallback(g, model);
      }
    });
  });

  view.setCellStyleCallback(null);
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
    delete view.__mouseEventTarget__;
  });
}

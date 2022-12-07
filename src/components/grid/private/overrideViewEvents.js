import { ValueType } from 'realgrid';
import { throttle } from 'lodash-es';
import { wrapEvent, hasOriginal, execOriginal } from './overrideWrap';
import { sanitize } from '../../../plugins/sanitize';
import { isOverByte, getMaxByteLength, getMaxByteString } from '../../../utils/string';
import {
  fixTopIndexIfInvalid, registerEvent, createCellIndexByDataColumn, getCellClickEvent, isCellEditable,
} from '../../../utils/private/gridShared';

const onShowTooltip = 'onShowTooltip';
const onMouseUp = 'onMouseUp'; // custom
const onCurrentChanging = 'onCurrentChanging';
const onSortingChanged = 'onSortingChanged';
const onLayoutPropertyChanged = 'onLayoutPropertyChanged';
const onCellItemClickable = 'onCellItemClickable'; // custom
const onCellItemClicked = 'onCellItemClicked';
const onCellButtonClicked = 'onCellButtonClicked';
const onCellEditable = 'onCellEditable'; // custom
const onShowEditor = 'onShowEditor';
const onValidate = 'onValidate'; // custom
const onEditChange = 'onEditChange';
const onGetEditValue = 'onGetEditValue';
const onCellPasting = 'onCellPasting';
const onScrollToBottom = 'onScrollToBottom';
const dataDropOptionsDragCallback = 'dataDropOptions._dragCallback';
const dataDropOptionsLabelCallback = 'dataDropOptions._labelCallback';
const dataDropOptionsDropCallback = 'dataDropOptions._callback';

/*
  데이터 셀의 툴팁이 표시되었음을 알리는 콜백
  */
export function overrideOnShowTooltip(view) {
  wrapEvent(view, onShowTooltip, (g, index, value) => {
    let returnValue;

    if (hasOriginal(g, onShowTooltip)) {
      returnValue = execOriginal(g, onShowTooltip, g, index, value);
    }

    if (!returnValue) {
      const { renderer } = g.columnByName(index.column);

      // checkbox
      if (renderer?.type === 'check') {
        const { dataType, booleanFormat } = g.getDataSource().fieldByName(index.fieldName);

        if (dataType === ValueType.BOOLEAN) {
          returnValue = booleanFormat?.split(':')[value === 'true' ? 1 : 0];
        }
      }
    }

    return sanitize(returnValue || value);
  });
}

/*
  마우스업 이벤트
  */
export function customOnMouseUp(view) {
  wrapEvent(view, onMouseUp, (e) => {
    if (e.target === view.__cellClickTarget__?.el) {
      const { evt, index } = view.__cellClickTarget__;

      evt(view, index);
      view.__cellClickTarget__ = null;
    }

    setTimeout(() => {
      fixTopIndexIfInvalid(view);
    });
  });

  registerEvent(view, 'mouseup', view.onMouseUp);
  registerEvent(view, 'touchend', view.onMouseUp);
}

/*
  그리드의 focus cell 의 위치 변경을 결정하는 콜백
  */
export function overrideOnCurrentChanging(view) {
  wrapEvent(view, onCurrentChanging, (g, oldIndex, newIndex) => {
    const preventCellItemFocus = g.__metas__.find((e) => e.fieldName === newIndex.fieldName)
      ?.preventCellItemFocus === true;

    if (preventCellItemFocus) {
      const el = g._view.activeTool._mouseEventTarget;
      const evt = getCellClickEvent(g, el);

      if (evt) {
        g.__cellClickTarget__ = { el, evt, index: newIndex };

        // set topIndex to old itemIndex
        // although cancel this event, top index are change..
        g._view.layoutManager._topIndex = oldIndex.itemIndex;

        return false;
      }
    }

    if (g.__ignoreOnCurrentChanging__ === true) {
      g.__ignoreOnCurrentChanging__ = false;
      return;
    }

    if (g.__blockOnCurrentChanging__ === true) {
      return false;
    }

    if (hasOriginal(g, onCurrentChanging)) {
      const returnValue = execOriginal(g, onCurrentChanging, g, oldIndex, newIndex);
      const isPromise = returnValue instanceof Promise;

      if (isPromise) {
        g._view.layoutManager._topIndex = oldIndex.itemIndex;

        returnValue.then((value) => {
          if (value !== false) {
            fixTopIndexIfInvalid(g);
            g.__ignoreOnCurrentChanging__ = true;

            if (newIndex.dataRow === -1) {
              g.clearCurrent();
            } else {
              g.setCurrent(newIndex);
            }
          }
        });
      }

      g.__blockOnCurrentChanging__ = true;
      setTimeout(() => { g.__blockOnCurrentChanging__ = false; });

      return isPromise ? false : returnValue;
    }
  });
}

/*
  정렬했음을 알리는 콜백
  */
export function overrideOnSortingChanged(view) {
  wrapEvent(view, onSortingChanged, (g) => {
    if (hasOriginal(g, onSortingChanged)) {
      execOriginal(g, onSortingChanged, g);
    }

    g.__ignoreOnCurrentChanging__ = true;

    setTimeout(() => {
      g.__ignoreOnCurrentChanging__ = false;
    });
  });
}

/*
  Layout의 속성 중 displayWidth, displayIndex, visible 속성값이 변경되었음을 알리는 콜백
  */
export function overrideOnLayoutPropertyChanged(view, vm) {
  wrapEvent(view, onLayoutPropertyChanged, (g, layout, property, newValue, oldValue) => {
    if (hasOriginal(g, onLayoutPropertyChanged)) {
      execOriginal(g, onLayoutPropertyChanged, g, layout, property, newValue, oldValue);
    }

    vm.proxy.onResize?.();
  });
}

/*
  커스텀 이벤트
  셀 아이템 및 셀 버튼 클릭 가능 여부를 결정하는 콜백
  return 값이 false 이면 `클릭 이벤트` 발생을 막는다
  (*클릭 이벤트: onCellItemClicked, onCellButtonClicked)
  */
export function customOnCellItemClickable(view) {
  wrapEvent(view, onCellItemClickable, (g, index) => {
    if (hasOriginal(g, onCellItemClickable)) {
      return execOriginal(g, onCellItemClickable, g, index);
    }
  });
}

/*
  그리드 셀에 포함된 엘리먼트가 클릭되었음을 알리는 콜백
  */
export function overrideOnCellItemClicked(view) {
  wrapEvent(view, onCellItemClicked, (g, index) => {
    // fix to CellIndex
    if (typeof index.column === 'object') {
      index = createCellIndexByDataColumn(g, index.itemIndex, index.column);
    }

    if (g.onCellItemClickable(g, index) === false) {
      return;
    }
    if (hasOriginal(g, onCellItemClicked)) {
      execOriginal(g, onCellItemClicked, g, index);
    }
  });
}

/*
  사용자가 데이터 셀 내부의 action 버튼을 클릭했을 때 호출한다.
  */
export function overrideOnCellButtonClicked(view) {
  wrapEvent(view, onCellButtonClicked, (g, index) => {
    if (g.onCellItemClickable(g, index) === false) {
      return;
    }
    if (hasOriginal(g, onCellButtonClicked)) {
      execOriginal(g, onCellButtonClicked, g, index);
    }
  });
}

/*
  커스텀 이벤트
  셀 편집 가능 여부를 결정하는 콜백
  에디터 뿐 아니라 체크 렌더러 같은 편집 기능이 있는 셀에서 동작
  return 값이 false 이면 편집을 막는다
  (*영향 받는 이벤트: onShowEditor, setCheckedCallback)
  */
export function customOnCellEditable(view) {
  wrapEvent(view, onCellEditable, (g, index) => {
    if (hasOriginal(g, onCellEditable)) {
      return execOriginal(g, onCellEditable, g, index);
    }
  });
}

/*
  Cell 별로 열리는 Editor 의 표시를 결정하는 콜백
  */
export function overrideOnShowEditor(view) {
  wrapEvent(view, onShowEditor, (g, index) => {
    if (g.onCellEditable(g, index) === false) {
      return false;
    }
    return true;
  });
}

/*
  커스텀 이벤트
  그리드 유틸 validate 함수 실행 시 호출되는 콜백
  */
export function customOnValidate(view) {
  wrapEvent(view, onValidate, async (g, index, value, values) => {
    if (hasOriginal(g, onValidate)) {
      return await execOriginal(g, onValidate, g, index, value, values);
    }
  });
}

/**
  아이템이 사용자의 Key 입력 등으로 값이 변경되었음을 알리는 콜백
  */
export function overrideOnEditChange(view) {
  wrapEvent(view, onEditChange, (g, index, value) => {
    const { editor } = g.columnByName(index.column);
    const type = editor?.type;

    // text
    if ([undefined, 'text', 'line', 'multiline'].includes(type)) {
      if (editor?.maxLength) {
        const length = getMaxByteLength(value, editor.maxLength);

        if (length < value.length) {
          g.setEditValue(value.substring(0, length));
          return;
        }
      }
    }

    if (hasOriginal(g, onEditChange)) {
      execOriginal(g, onEditChange, g, index, value);
    }
  });
}

/*
  셀 편집이 완료되었을 때 셀의 위차와 편집결과를 갖고 있는 콜백
  */
export function overrideOnGetEditValue(view) {
  wrapEvent(view, onGetEditValue, (g, index, editResult) => {
    let { value } = editResult;

    const { editor } = g.columnByName(index.column);
    const type = editor?.type;

    // text
    if ([undefined, 'text', 'line', 'multiline'].includes(type)) {
      value = value?.trim();

      if (value && editor?.maxLength) {
        value = getMaxByteString(value, editor.maxLength);
      }
    }

    // number
    if (editor?.type === 'number') {
      if (Number.isNaN(value)) {
        value = null;
      } else {
        if (editor.positiveOnly) value = Math.abs(value);
        if (editor.integerOnly) value = Math.floor(value);
        if (editor.maxIntegerLength) {
          const intValue = Math.floor(value);
          const gap = String(intValue).length - editor.maxIntegerLength;
          if (gap > 0) value /= 10 ** gap;
        }
      }
    }

    editResult.value = value;

    if (hasOriginal(g, onGetEditValue)) {
      execOriginal(g, onGetEditValue, g, index, editResult);
    }
  });
}

/*
  셀에 붙여넣기를 결정하는 콜백
  */
export function overrideOnCellPasting(view) {
  wrapEvent(view, onCellPasting, (g, index, value) => {
    const column = g.columnByName(index.column);

    if (!isCellEditable(g, column, index)) {
      return false;
    }

    const { editor = {} } = column;
    const { type } = editor;

    // text
    if ([undefined, 'text', 'line', 'multiline'].includes(type)) {
      const { maxLength } = editor;
      const isOverMaxByte = !!value && !!maxLength && isOverByte(value, maxLength);
      if (isOverMaxByte) return false;
    }

    // list
    if (['list', 'dropdown'].includes(type)) {
      const { labels, values } = column;
      const isLabelOrValue = labels?.includes(value) || values?.includes(value);
      if (!isLabelOrValue) return false;
    }

    // number
    if (editor?.type === 'number') {
      if (Number.isNaN(value)) return false;
      if (editor.positiveOnly && value < 0) return false;

      const intValue = Math.floor(value);
      if (editor.integerOnly && intValue !== value) return false;

      const { maxIntegerLength } = editor;
      if (maxIntegerLength && String(intValue).length > maxIntegerLength) return false;
    }

    if (hasOriginal(g, onCellPasting)) {
      return execOriginal(g, onCellPasting, g, index, value);
    }
  });
}

/*
  사용자가 키보드나 스크롤 바 등을 조작하여 그리드에 마지막 행이 표시될 때 호출되는 콜백
  */
export function overrideOnScrollToBottom(view) {
  wrapEvent(view, onScrollToBottom, throttle((g) => {
    const { layoutManager } = g._view;
    const hasVerticalScroll = layoutManager.vscrollBar === true;

    if (hasVerticalScroll && hasOriginal(view, onScrollToBottom)) {
      return execOriginal(g, onScrollToBottom, g);
    }
  }, 200));
}

/*
  그리드 간 drag and drop 을 시작할 때 발생하는 콜백
  */
export function overrideDataDropOptionsDragCallback(view) {
  wrapEvent(view, dataDropOptionsDragCallback, (source, sourceItems, target, targetItem) => {
    if (!hasOriginal(view, dataDropOptionsDropCallback)) {
      return false;
    }

    if (hasOriginal(view, dataDropOptionsDragCallback)) {
      return execOriginal(view, dataDropOptionsDragCallback, source, sourceItems, target, targetItem);
    }
  });
}

/*
  drag 중인 item 의 label 텍스트를 결정하기 위한 콜백
  */
export function overrideDataDropOptionsLabelCallback(view) {
  wrapEvent(view, dataDropOptionsLabelCallback, (source, sourceItems, target, targetItem) => {
    if (hasOriginal(view, dataDropOptionsLabelCallback)) {
      return execOriginal(view, dataDropOptionsLabelCallback, source, sourceItems, target, targetItem);
    }

    if (view.dataDropOptions.dragCallback(source, sourceItems, target, targetItem) === false) {
      return '🚫';
    }

    return '✅';
  });
}

/*
  그리드 간 drag and drop 했을 때 발생하는 콜백
  */
export function overrideDataDropOptionsDropCallback(view) {
  wrapEvent(view, dataDropOptionsDropCallback, (source, sourceItems, target, targetItem) => {
    if (view.dataDropOptions.dragCallback(source, sourceItems, target, targetItem) === false) {
      return;
    }

    if (hasOriginal(view, dataDropOptionsDropCallback)) {
      execOriginal(view, dataDropOptionsDropCallback, source, sourceItems, target, targetItem);
    }
  });
}

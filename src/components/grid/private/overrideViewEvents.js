import { ValueType } from 'realgrid';
import { cloneDeep, isEmpty } from 'lodash-es';
import { wrapEvent, hasOriginal, execOriginal } from './overrideWrap';
import { sanitize } from '../../../plugins/sanitize';
import { modal } from '../../../plugins/modal';
import { isOverByte, getMaxByteLength, getMaxByteString } from '../../../utils/string';
import {
  fixTopIndexIfInvalid, registerEvent, createCellIndexByDataColumn, getCellClickEvent, isCellEditable,
} from '../../../utils/private/gridShared';

const onShowTooltip = 'onShowTooltip';
const onShowHeaderTooltip = 'onShowHeaderTooltip';
const onMouseUp = 'onMouseUp'; // custom
const onCurrentChanging = 'onCurrentChanging';
const onSorting = 'onSorting';
const onSortingChanged = 'onSortingChanged';
const onLayoutPropertyChanged = 'onLayoutPropertyChanged';
const onColumnPropertyChanged = 'onColumnPropertyChanged';
const onCellItemClickable = 'onCellItemClickable'; // custom
const onCellItemClicked = 'onCellItemClicked';
const onCellClicked = 'onCellClicked';
const onCellDblClicked = 'onCellDblClicked';
const onCellButtonClicked = 'onCellButtonClicked';
const onCellEditable = 'onCellEditable'; // custom
const onShowEditor = 'onShowEditor';
const onValidate = 'onValidate'; // custom
const onEditChange = 'onEditChange';
const onGetEditValue = 'onGetEditValue';
const onCellPasting = 'onCellPasting';
const onEditRowPasted = 'onEditRowPasted';
const onTopIndexChanged = 'onTopIndexChanged';
const onScrollToBottom = 'onScrollToBottom';
const onContextMenuPopup = 'onContextMenuPopup';
const onItemChecked = 'onItemChecked';
const onKeydown = 'onKeyDown';
const dataDropOptionsDragCallback = 'dataDropOptions._dragCallback';
const dataDropOptionsLabelCallback = 'dataDropOptions._labelCallback';
const dataDropOptionsDropCallback = 'dataDropOptions._callback';

let isChecked = false;

/*
  그리드의 셀 내부 데이터가 < 나 > 가 들어가면, 이 값을 툴팁으로 표현할 때 HTML 태그로 인식해버리는 문제가 있다.
  따라서 <, >를 escape 처리한다.
  escape처리할 문자가 더 있으면 해당 return값에 .replace 방식으로 더 추가해주면 된다.
*/
function escapeString(val) {
  if (!val || val.trim().length <= 0) return '';
  return val.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/*
  데이터 셀의 툴팁이 표시되었음을 알리는 콜백
  */
export function overrideOnShowTooltip(view) {
  wrapEvent(view, onShowTooltip, (g, index, value) => {
    let originalResult;
    if (hasOriginal(g, onShowTooltip)) {
      originalResult = execOriginal(g, onShowTooltip, g, index, value);
    }

    const { renderer, styleName } = g.columnByName(index.column);
    if (!originalResult) {
      // checkbox
      if (renderer?.type === 'check') {
        const { dataType, booleanFormat } = g.getDataSource().fieldByName(index.fieldName);

        if (dataType === ValueType.BOOLEAN) {
          originalResult = booleanFormat?.split(':')[value === 'true' ? 1 : 0];
        }
      }
    }

    if (renderer?.type === 'image' && value.startsWith('data:image')) return;
    let cell;
    try {
      cell = g?.getCellBounds(index.itemIndex, index.column);
    } catch (e) {
      cell = undefined;
    }

    let alignStyle;
    const alignArr = ['text-left', 'text-center', 'text-right'];
    if (styleName) {
      const styleArr = styleName.split(' ');
      let styleIdx;
      const isAlignStyle = styleArr.some((style, i) => {
        if (alignArr.includes(style)) {
          styleIdx = i;
          return true;
        }
        return false;
      });

      if (isAlignStyle) alignStyle = styleArr[styleIdx];
      else alignStyle = 'text-left';
    }

    // document.append();
    const tempSpan = document.createElement('span');
    tempSpan.setAttribute('id', 'tempSpan');
    tempSpan.style.visibility = 'hidden';
    tempSpan.append(`${originalResult || value}`);
    document.body.append(tempSpan);
    const doc = document.getElementById('tempSpan');
    const textWidth = doc?.offsetWidth ?? doc?.clientWidth;
    document.body.removeChild(tempSpan);

    const res = `<div class="${alignStyle} rg-tooltip__custom"`
      + `style="min-width: ${cell?.width >= 100 ? cell?.width : 100}px;`
      + `${cell?.width && textWidth > cell?.width ? 'max-width: 400px; word-wrap: break-word;' : ''}`
      + `padding-right: ${alignStyle === 'text-right' ? 19 : 12}px;">` // DIV 설정
      + `<span class="rg-tooltip__custom__span" ${textWidth > cell?.width ? 'style="display: block; white-space: break-spaces;"' : ''}>${escapeString(originalResult ?? value)}</span>`
      + '</div>';
    return sanitize(res);
  });
}

/*
  데이터 헤더의 툴팁이 표시되었음을 알리는 콜백
  */
export function overrideOnShowHeaderTooltip(view) {
  wrapEvent(view, onShowHeaderTooltip, (g, column, value) => {
    if (hasOriginal(g, onShowHeaderTooltip)) {
      execOriginal(g, onShowHeaderTooltip, g, column, value);
    }

    return '';
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
    const preventCellItemFocus = g.__columns__.find((e) => e.name === newIndex.column)
      ?.preventCellItemFocus === true;

    if (preventCellItemFocus) {
      const el = g._view.activeTool._mouseEventTarget;
      const evt = getCellClickEvent(g, el);

      if (evt) {
        g.__cellClickTarget__ = { el, evt, index: newIndex };

        // set topIndex to old itemIndex
        // although cancel this event, top index are changed..
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
      const originalResult = execOriginal(g, onCurrentChanging, g, oldIndex, newIndex);
      const isPromise = originalResult instanceof Promise;

      if (isPromise) {
        g._view.layoutManager._topIndex = oldIndex.itemIndex;

        originalResult.then((value) => {
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

      return isPromise ? false : originalResult;
    }
  });
}
/*
  정렬시 정렬한 필드로 focus 이동
 */
export function overrideOnSorting(view) {
  // console.log(view, fields, directions);
  wrapEvent(view, onSorting, (g, fields, directions) => {
    // sorting 한 field를 포커싱
    g.setCurrent({ itemIdndex: g.getCurrent().itemIndex, fieldIndex: fields[fields.length - 1] });
    if (hasOriginal(g, onSorting)) {
      execOriginal(g, onSorting, g, fields, directions);
    }
  });
}
/*
  정렬했음을 알리는 콜백
  */
export function overrideOnSortingChanged(view) {
  wrapEvent(view, onSortingChanged, (g) => {
    // 정렬시 list type인 경우 안펼쳐지도록 세팅.
    view.showEditor(false);
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

    // resize
    if (['displayWidth', 'visible'].includes(property)) {
      setTimeout(() => {
        vm.proxy.onResize?.();
      });
    }
  });
}

/*
  Column의 속성 중 displayWidth, displayIndex, visible 속성값이 변경되었음을 알리는 콜백
  */
export function overrideOnColumnPropertyChanged(view, vm) {
  wrapEvent(view, onColumnPropertyChanged, (g, column, property, newValue, oldValue) => {
    if (view.__ignoreOnColumnPropertyChanged__ === true) {
      return;
    }

    if (hasOriginal(g, onColumnPropertyChanged)) {
      execOriginal(g, onColumnPropertyChanged, g, column, property, newValue, oldValue);
    }

    // save personalize
    if (['displayIndex', 'visible'].includes(property)) {
      // 그리드 직접 수정시에는 레이아웃 저장을 막고
      // 컨텍스트 메뉴로 띄워서 저장하도록 설정.
      // vm.proxy.saveLayouts?.();
    }

    // resize
    if (['displayWidth', 'visible'].includes(property)) {
      setTimeout(() => {
        vm.proxy.onResize?.();
      });
    }
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
  wrapEvent(view, onCellItemClicked, async (g, index) => {
    // fix to CellIndex
    if (typeof index.column === 'object') {
      index = createCellIndexByDataColumn(g, index.itemIndex, index.column);
    }

    if (g.onCellItemClickable(g, index) === false) {
      return;
    }

    const editor = g.getColumnProperty(index.column, 'editor');

    if (editor?.type === 'file') {
      const dp = g.getDataSource();
      const dataRow = dp.getOutputRow({}, index.dataRow);

      const isDisable = dataRow?.[editor.disable] ?? editor.disable === true;
      if (!isDisable) {
        let attachDocumentId;
        if (dataRow[editor.attachDocumentId]?.__atthDocumentId) {
          attachDocumentId = dataRow[editor.attachDocumentId]?.__atthDocumentId;
        } else if (typeof dataRow[editor.attachDocumentId] === 'string') attachDocumentId = dataRow[editor.attachDocumentId];
        else attachDocumentId = editor.attachDocumentId;

        let editable;
        if (typeof editor.editable === 'boolean') editable = editor.editable;
        else if (typeof editor.editable === 'string') editable = dataRow[editor.editable];
        else editable = false;
        const componentProps = {
          attachDocumentId,
          attachGroupId: dataRow[editor.attachGroupId] ?? editor.attachGroupId,
          fileUid: dataRow[editor.fileUid] ?? editor.fileUid,
          fileUidMode: dataRow[editor.fileUidMode] ?? editor.fileUidMode,
          multiple: dataRow[editor.multiple] ?? editor.multiple,
          downloadable: dataRow[editor.downloadable] ?? editor.downloadable,
          editable,
          existFiles: dataRow[index.column]?.files,
        };

        const result = await modal({
          component: 'ZwcmzAttachFileMgtP',
          componentProps,
        });

        if (result.result) {
          let fileCount;
          if (componentProps.multiple === false) {
            if (!isEmpty(result.payload?.files)) fileCount = 1;
            else fileCount = 0;
          } else fileCount = result.payload?.files?.length;

          if (result.payload?.isModified) {
            let data = cloneDeep(dp.getValue(index.dataRow, index.fieldName));
            if (data) {
              data.files = result.payload.files;
              data.__isModified = true;
              data.__numberOfFiles = `${fileCount ?? 0}`;
            } else {
              // 신규 추가된 행은 undefined이다
              data = {
                files: result.payload.files,
                __isModified: true,
                __atthDocumentId: componentProps.attachDocumentId,
                __numberOfFiles: `${fileCount ?? 0}`,
              };
            }
            dp.setValue(index.dataRow, index.fieldName, data);
          }

          if (result.payload?.initFiles) {
            let data = cloneDeep(dp.getValue(index.dataRow, index.fieldName));
            if (data) {
              data.files = null;
              data.__isModified = false;
              data.__numberOfFiles = `${fileCount ?? 0}`;
            } else {
              data = {
                files: null,
                __isModified: false,
                __atthDocumentId: componentProps.attachDocumentId,
                __numberOfFiles: `${fileCount ?? 0}`,
              };
            }
            dp.setValue(index.dataRow, index.fieldName, data);
          }
        }
      }
    }

    if (hasOriginal(g, onCellItemClicked)) {
      execOriginal(g, onCellItemClicked, g, index);
    }
  });
}

/*
  그리드 셀이 클릭되었음을 알리는 콜백
  */
export function overrideOnCellClicked(view) {
  wrapEvent(view, onCellClicked, async (g, clickData) => {
    let preventCheck;
    if (hasOriginal(g, onCellClicked)) {
      preventCheck = await execOriginal(g, onCellClicked, g, clickData);
    }

    if (preventCheck !== false && g.checkBar.visible && g.isCheckableOfRow(clickData.dataRow)) {
      const isCheckedRow = g.isCheckedRow(clickData.dataRow);
      if (!isChecked) {
        if (!isCheckedRow) g.checkRow(clickData.dataRow, true, g.checkBar.exclusive, true);
        else if (
          isCheckedRow
          && ((!clickData.editable || clickData.readOnly) || g.onCellEditable(g, clickData) === false)
        ) {
          g.checkRow(clickData.dataRow, !isCheckedRow, g.checkBar.exclusive, true);
        }
      }
      isChecked = false;
      g.setCurrent({ itemIndex: clickData.itemIndex });
    }
  });
}

export function overrideOnCellDblClicked(view) {
  wrapEvent(view, onCellDblClicked, async (g, clickData) => {
    if (clickData.cellType === 'header') return;
    if (hasOriginal(g, onCellDblClicked)) {
      await execOriginal(g, onCellDblClicked, g, clickData);
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
  wrapEvent(view, onShowEditor, (g, index, props, attrs) => {
    const column = g.columnByName(index.column);

    const isEditable = isCellEditable(g, column, index);

    if (isEditable) {
      if (hasOriginal(g, onShowEditor)) {
        execOriginal(g, onShowEditor, g, index, props, attrs);
      }
    }

    return isEditable;
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
    const { editor, values } = g.columnByName(index.column);
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

    // checklist 의 경우 보여지는 value에 따라  해당 적용된 내용으로 세팅해준다.
    if (['checklist'].includes(type)) {
      if (editor?.itemSortStyle) {
        const arr = value.split(',');
        arr.sort();
        if (editor?.itemSortStyle === 'descending') {
          arr.reverse();
        }
        if (value !== arr.join(',')) {
          g.setEditValue(arr.join(','));
        }
        return;
      }
      if (value.includes(',')) {
        const arr = value.split(',');
        if (values.filter((it) => arr.includes(it)).join(',') !== value) {
          g.setEditValue(values.filter((it) => arr.includes(it)).join(','));
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
    value = value && typeof value !== 'number' ? value.trim() : value;
    const { editor } = g.columnByName(index.column);
    const type = editor?.type;

    if (type === 'telephone') {
      const temp = value.split('-');
      value = temp.join('');
      const regex = /^\d{2,4}-\d{3,4}-\d{4}$/;
      const corpNumberRegex = /^\d{4}-\d{4}$/;
      if (value?.startsWith('02')) {
        value = value.replace(/-/gi, '');
        if (value?.length <= 9) value = value.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
        else value = value.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
      } else if (value?.startsWith('0504') || value?.startsWith('0505')) { // WEBFAX
        if (value?.length <= 11) value = value.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
        else value = value.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
      } else if (value?.length === 8) value = value.replace(/(\d{4})(\d{4})/, '$1-$2');
      else if (value?.length <= 10) value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      else value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

      if (!regex.test(value) && !corpNumberRegex.test(value)) value = '';
    }

    // text
    if ([undefined, 'text', 'line', 'multiline'].includes(type)) {
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
  붙여넣을때 콜백 (콤보형인 경우 콤보의 label을 비교해서 같은게 있으면 해당하는 value를 넣어준다.)
  */
export function overrideOnEditRowPasted(view) {
  wrapEvent(view, onEditRowPasted, (g, index, row, fields, oldValues, newValues) => {
    fields.forEach((field) => {
      if (g.columnByField(field).editor?.type === 'list') {
        const idx = g.columnByField(field).labels.findIndex((item) => item === newValues[field]);
        view.setValue(row, field, g.columnByField(field).values[idx]);
      }
    });
    if (hasOriginal(g, onEditRowPasted)) {
      return execOriginal(g, onEditRowPasted, g, index, fields, oldValues, newValues);
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
  수직 스크롤 바의 위치가 변경됨을 알리는 콜백
  (onScrollToBottom 버그 있어서 별도 구현처리)
  */
export function overrideOnTopIndexChanged(view) {
  wrapEvent(view, onTopIndexChanged, (g, itemIndex) => {
    if (hasOriginal(view, onTopIndexChanged)) {
      execOriginal(g, onTopIndexChanged, g, itemIndex);
    }

    const vscrollBar = g._view._vscrollBar;
    const hasVerticalScroll = vscrollBar.visible === true;

    if (hasVerticalScroll && hasOriginal(g, onScrollToBottom)) {
      const thumb = vscrollBar._thumb;
      const threshold = vscrollBar.height - thumb.height - 20;
      const shouldFireOnScrollToBottom = thumb.y >= threshold;

      if (shouldFireOnScrollToBottom) {
        execOriginal(view, onScrollToBottom, view);
      }
    }
  });
}

/*
  그리드 행 체크시 발생하는 콜백
*/
export function overrideOnItemChecked(view) {
  wrapEvent(view, onItemChecked, (g, itemIndex) => {
    if (hasOriginal(view, onItemChecked)) {
      execOriginal(g, onItemChecked, g, itemIndex);
    }

    g.setCurrent({ itemIndex });
    isChecked = true;
  });
}

/*
  사용자가 키보드나 스크롤 바 등을 조작하여 그리드에 마지막 행이 표시될 때 호출되는 콜백
  */
export function overrideOnScrollToBottom(view) {
  wrapEvent(view, onScrollToBottom, () => {
    // ignore
  });
}

/*
  좌표와 함께 ContextMenu 표시를 결정하는 콜백
  */
export function overrideOnContextMenuPopup(view) {
  wrapEvent(view, onContextMenuPopup, (g, x, y, _clickData) => {
    view.__contextMenuClickData__ = { ..._clickData };
  });
}

/*
  그리드 keydown 시 발생
*/
export function overrideOnKeydown(view) {
  wrapEvent(view, onKeydown, (g, keyEvent) => {
    const itemCount = view.getItemCount();
    const col = view.getDisplayColumns();
    // 전체선택 Ctrl+A
    if (keyEvent.ctrlKey === true && keyEvent.code === 'KeyA') {
      view.clearCurrent();
      const sel = {
        style: 'block',
        startItem: 0,
        startColumn: col[0].name,
        endItem: itemCount,
        endColumn: col[col.length - 1].name,
      };
      view.setSelection(sel);
    }
    if (hasOriginal(view, onKeydown)) {
      execOriginal(g, onKeydown, g, keyEvent);
    }
  });
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

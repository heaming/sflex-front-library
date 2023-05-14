import { cloneDeep, defaultsDeep, map } from 'lodash-es';
import { LocalTreeDataProvider, ValueType } from 'realgrid';
import { wrapMethod, execOriginal } from './overrideWrap';

const setFields = 'setFields';
const addField = 'addField';
const setRows = 'setRows';
const removeRow = 'removeRow';
const removeRows = 'removeRows';
const destroy = 'destroy';

function setFieldFormatDefaults(field) {
  switch (field.dataType) {
    case 'file':
      field.dataType = ValueType.OBJECT;
      field.objectKey = 'files';
      break;
    case ValueType.BOOLEAN:
      defaultsDeep(field, { booleanFormat: 'N:Y' });
      break;
    case ValueType.DATE:
    case ValueType.DATETIME:
    case undefined:
      field.dataType = ValueType.TEXT;
      break;
  }
}

function normalizeField(field) {
  const normalizedField = cloneDeep(field);
  setFieldFormatDefaults(normalizedField);

  return normalizedField;
}

/*
  필드를 추가로 생성한다
  */
export function overrideAddField(data) {
  wrapMethod(data, addField, (field) => {
    const normalizedField = normalizeField(field);
    execOriginal(data, addField, normalizedField);
  });
}

/*
  필드셋을 설정한다
  */
export function overrideSetFields(data) {
  wrapMethod(data, setFields, (fields) => {
    const normalizedFields = map(fields, normalizeField);
    execOriginal(data, setFields, normalizedFields);
  });
}

/*
  데이터 셋을 채운다
  */
export function overrideSetRows(data, vm) {
  const isTreeGrid = data instanceof LocalTreeDataProvider;

  wrapMethod(data, setRows, (...args) => {
    data.clearRows();
    execOriginal(data, setRows, ...args);

    const view = vm.proxy.getView();
    const shouldUncheck = view.checkBar.visible && view.checkBar.syncHeadCheck;

    if (shouldUncheck) {
      view.setAllCheck(false, false);
    }

    if (isTreeGrid) {
      const [, treeKey] = args;
      view.__treeKey__ = treeKey;
    }

    // 검색조건 메세지 세팅
    let message = '[검색조건]\n';
    const formItems = document.querySelectorAll('.kw-search .kw-form-item');
    formItems.forEach((formItem) => {
      const label = formItem.querySelector('.kw-label-content__label').innerHTML;

      const values = formItem.querySelectorAll('input');
      let value = '';
      values.forEach((v, i) => {
        if (i === 0) {
          value += v.value;
        } else {
          value += ` | ${v.value}`;
        }
      });
      // radio 인경우
      const radios = formItem.querySelectorAll('div.q-option-group .q-radio');
      radios.forEach((radio) => {
        if (radio.getAttribute('aria-checked') === 'true') {
          value = radio.getAttribute('aria-label');
        }
      });

      // value가 없는경우 disable (혹은 readonly)된 콤보 필드일수도 있다.
      if (value === '') {
        let disableField = formItem.querySelector('.q-field--disabled');
        if (!disableField) disableField = formItem.querySelector('.q-field--readonly');
        if (disableField) {
          const spans = disableField.querySelectorAll('.q-field__native span');
          spans.forEach((v, i) => {
            if (i === 0) {
              value += v.innerText;
            } else {
              value += ` | ${v.innerText}`;
            }
          });
        }
      }
      message += `${label} : ${value}  \n`;
    });

    view.__searchConditionText__ = message;
  });
}

/*
  특정 위치의 데이터 행을 제거한다
  */
export function overrideRemoveRow(data) {
  wrapMethod(data, removeRow, (row) => {
    data.restoreUpdatedRows(row);
    return execOriginal(data, removeRow, row);
  });
}

/*
  특정 위치의 복수의 데이터 행들을 제거한다
  */
export function overrideRemoveRows(data) {
  wrapMethod(data, removeRows, (rows, rowEvents) => {
    data.restoreUpdatedRows(rows);
    return execOriginal(data, removeRows, rows, rowEvents);
  });
}

/*
  데이터 객체를 해제한다
  */
export function overrideDestory(data) {
  wrapMethod(data, destroy, () => {
    execOriginal(data, destroy);

    // private attributes
    delete data.__originalFns__;
  });
}

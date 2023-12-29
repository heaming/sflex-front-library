import { cloneDeep, defaultsDeep, isEmpty, map } from 'lodash-es';
import { LocalTreeDataProvider, ValueType } from 'realgrid';
import { wrapMethod, execOriginal } from './overrideWrap';

const setFields = 'setFields';
const addField = 'addField';
const setRows = 'setRows';
const addRows = 'addRows';
const addRow = 'addRow';
const insertRow = 'insertRow';
const insertRows = 'insertRows';
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

function setSearchConditionMessage(view) {
  // 검색조건 메세지 세팅
  let formItems;
  if (view.__searchBoxClass__) {
    formItems = document.querySelectorAll(`.kw-popup .kw-search.${view.__searchBoxClass__} .kw-form-item`);
  } else {
    formItems = document.querySelectorAll('.kw-popup .kw-search .kw-form-item');
  }
  if (formItems.length === 0) {
    if (view.__searchBoxClass__) {
      formItems = document.querySelectorAll(`.kw-search.${view.__searchBoxClass__} .kw-form-item`);
    } else {
      formItems = document.querySelectorAll('.kw-search .kw-form-item');
    }
  }
  if (formItems.length === 0) {
    view.__searchConditionText__ = '';
    return;
  }

  let message = '[검색조건]\n';
  formItems.forEach((formItem) => {
    let label;
    // label이 있는경우
    if (formItem.querySelector('.kw-label-content__label')) {
      label = formItem.querySelector('.kw-label-content__label').innerHTML;
    }

    const values = formItem.querySelectorAll('input:not(.hidden)');
    let value = '';
    values.forEach((v, i) => {
      if (i === 0) {
        value += v.value;
      } else {
        value += ` | ${v.value}`;
      }
    });
    // radio 인경우
    const radios = formItem.querySelectorAll('.q-radio');
    radios.forEach((radio) => {
      if (radio.getAttribute('aria-checked') === 'true') {
        if (isEmpty(value)) value = radio.getAttribute('aria-label');
        else value += ` | ${radio.getAttribute('aria-label')}`;
      }
    });

    // checkBox 인경우
    const checkboxes = formItem.querySelectorAll('.q-checkbox');
    let oneCheckBoxValue = 'N';
    checkboxes.forEach((checkbox, i) => {
      if (checkbox.getAttribute('aria-checked') === 'true') {
        oneCheckBoxValue = 'Y';
        if (i === 0) {
          let checkboxLabel = checkbox.getAttribute('aria-label');
          if (checkboxLabel === null) {
            checkboxLabel = '';
          }
          if (isEmpty(value)) value = checkboxLabel;
          else value += ` | ${checkboxLabel}`;
        } else {
          value += ` | ${checkbox.getAttribute('aria-label')}`;
        }
      }
    });

    // value가 없는경우 disable (혹은 readonly)된 콤보 필드일수도 있다.
    if (value === '') {
      // 체크박스가 1개만 있고, label 이 없는 경우는 Y/N 으로 표시해준다.
      if (checkboxes.length === 1) {
        value += oneCheckBoxValue;
      }
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
    if (label) {
      message += `${label} : ${value}  \n`;
    } else {
      message += `${value}  \n`;
    }
  });

  view.__searchConditionText__ = message;
}

/*
  데이터 셋을 채운다
  */
export function overrideSetRows(data, vm) {
  const isTreeGrid = data instanceof LocalTreeDataProvider;

  wrapMethod(data, setRows, async (...args) => {
    const arr = [...args];

    const arrData = arr?.[0];
    if (!arrData?.[0]) {
      data.clearRows();
      execOriginal(data, setRows, ...args);
    } else {
      const atthIdx = Object.keys(arrData?.[0]).filter((x) => x.endsWith('atthDocId') || x.endsWith('AtthDocId'));
      if (atthIdx && atthIdx.length > 0) {
        atthIdx.forEach((x) => {
          const newField = `${x}NumberOfFiles`;
          const isExist = data.fieldByName(newField);
          if (!isExist) data.addField({ fieldName: newField, dataType: 'number' });
        });

        data.clearRows();
        execOriginal(data, setRows, ...args);
      } else {
        data.clearRows();
        execOriginal(data, setRows, ...args);
      }
    }
    const view = vm.proxy.getView();
    const shouldUncheck = view.checkBar.visible && view.checkBar.syncHeadCheck;

    if (shouldUncheck) {
      view.setAllCheck(false, false);
    }

    if (isTreeGrid) {
      const [, treeKey] = args;
      view.__treeKey__ = treeKey;
    }

    setSearchConditionMessage(view);
  });
}

/*
  데이터 셋을 추가한다.
  */
export function overrideAddRows(data, vm) {
  wrapMethod(data, addRows, (...args) => {
    const arr = [...args];

    const arrData = arr?.[0];
    if (!arrData?.[0]) {
      execOriginal(data, addRows, ...args);
    } else {
      const atthIdx = Object.keys(arrData?.[0]).filter((x) => x.endsWith('atthDocId') || x.endsWith('AtthDocId'));
      if (atthIdx && atthIdx.length > 0) {
        atthIdx.forEach((x) => {
          const newField = `${x}NumberOfFiles`;
          const isExist = data.fieldByName(newField);
          if (!isExist) data.addField({ fieldName: newField, dataType: 'number' });
        });
        execOriginal(data, addRows, ...args);
      } else {
        execOriginal(data, addRows, ...args);
      }
    }

    const view = vm.proxy.getView();

    setSearchConditionMessage(view);
  });
}

/*
  데이터 셋을 추가한다.
*/
export function overrideAddRow(data) {
  wrapMethod(data, addRow, (...args) => {
    const arr = [...args];
    const arrData = arr?.[0];
    if (!arrData || isEmpty(arrData)) {
      execOriginal(data, addRow, ...args);
    } else {
      const atthIdx = Object.keys(arrData).filter((x) => x.endsWith('atthDocId') || x.endsWith('AtthDocId'));
      if (atthIdx && atthIdx.length > 0) {
        atthIdx.forEach((x) => {
          const newField = `${x}NumberOfFiles`;
          const isExist = data.fieldByName(newField);
          if (!isExist) data.addField({ fieldName: newField, dataType: 'number' });
        });
        execOriginal(data, addRow, ...args);
      } else {
        execOriginal(data, addRow, ...args);
      }
    }
  });
}

/*
  데이터 셋을 추가한다.
*/
export function overrideInsertRow(data) {
  wrapMethod(data, insertRow, (...args) => {
    const arr = [...args];

    const arrData = arr?.[1];
    if (!arrData || isEmpty(arrData)) {
      execOriginal(data, insertRow, ...args);
    } else {
      const atthIdx = Object.keys(arrData).filter((x) => x.endsWith('atthDocId') || x.endsWith('AtthDocId'));
      if (atthIdx && atthIdx.length > 0) {
        atthIdx.forEach((x) => {
          const newField = `${x}NumberOfFiles`;
          const isExist = data.fieldByName(newField);
          if (!isExist) data.addField({ fieldName: newField, dataType: 'number' });
        });
        execOriginal(data, insertRow, ...args);
      } else {
        execOriginal(data, insertRow, ...args);
      }
    }
  });
}

/*
  데이터 셋을 추가한다.
  */
export function overrideInsertRows(data) {
  wrapMethod(data, insertRows, (...args) => {
    const arr = [...args];

    const arrData = arr?.[1];
    if (!arrData?.[0]) {
      execOriginal(data, insertRows, ...args);
    } else {
      const atthIdx = Object.keys(arrData?.[0]).filter((x) => x.endsWith('atthDocId') || x.endsWith('AtthDocId'));
      if (atthIdx && atthIdx.length > 0) {
        atthIdx.forEach((x) => {
          const newField = `${x}NumberOfFiles`;
          const isExist = data.fieldByName(newField);
          if (!isExist) data.addField({ fieldName: newField, dataType: 'number' });
        });
        execOriginal(data, insertRows, ...args);
      } else {
        execOriginal(data, insertRows, ...args);
      }
    }
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

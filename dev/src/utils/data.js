/* eslint-disable no-bitwise */
import { date } from 'quasar';

// eslint-disable-next-line no-unused-vars
function createData(column, fields) {
  switch (column.editor?.type) {
    case 'number': return Math.random() * 100000;
    case 'btdate': return date.formatDate(Date.now(), column.editor.datetimeFormat?.toUpperCase());
    case 'list':
    case 'dropdown': return column.values?.[~~(Math.random() * column.values.length)];
  }

  switch (column.renderer?.type) {
    case 'check': return ['Y', 'N'][~~(Math.random() * 2)];
  }

  return Math.random().toString(36).substring(2, 11);
}

export function createGridData(columns, fields, length) {
  return Array.from({ length }, () => columns.reduce((rowValue, e) => {
    rowValue[e.fieldName] = createData(e, fields);
    return rowValue;
  }, {}));
}

export function createTreeData(columns, fields, length, treeKey, maxDescendants = 3) {
  columns = columns.filter((e) => e.fieldName !== treeKey);

  const gridData = createGridData(columns, fields, length);

  let prefix = null;
  let depth;

  gridData.forEach((e, i) => {
    e[treeKey] = String(i).padStart(4, '0');

    if (!prefix) {
      depth = ~~(Math.random() * maxDescendants) + 1;
    } else {
      e[treeKey] = `${prefix}.${e[treeKey]}`;
    }

    depth -= 1;

    if (depth === 0) {
      prefix = null;
    } else if (~~(Math.random() * 2)) {
      prefix = e[treeKey];
    }
  });

  return gridData;
}

export default {
  createGridData,
  createTreeData,
};

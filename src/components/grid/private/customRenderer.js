/* eslint-disable no-unused-vars */

import { isArray, isEmpty, cloneDeep } from 'lodash-es';
import { createCellIndexByDataColumn, isCellEditable } from '../../../utils/private/gridShared';
import { prevent } from '../../../utils/private/event';

function registerRadioRenderer(view) {
  view.registerCustomRenderer('radio', {
    initContent(el) {
      el.className = 'rg-renderer rg-radio-renderer';

      const { values, labels } = this.index.column;
      const hasOptions = isArray(values) && isArray(labels);

      if (hasOptions) {
        el.innerHTML = values.map((v, i) => `
          <div class="rg-radio-renderer__option">
            <span>${v}</span>
            <label>${labels[i]}</label>
          </div>
        `).join('');

        this.__radioOptions__ = [...el.children];
      }
    },

    clearContent(el) {
      if (this.__radioOptions__) {
        el.innerHTML = '';
        this.__radioOptions__ = null;
        delete this.__radioOptions__;
      }
    },

    render(grid, model) {
      const options = this.__radioOptions__;

      if (options?.length) {
        const { value } = model;
        const { values } = model.index.column;

        for (let i = 0; i < options.length; i += 1) {
          const classes = ['rg-radio-renderer__option'];
          const option = options[i];
          const optionValue = values[i];

          if (optionValue === value) {
            classes.push('rg-radio-renderer__option--selected');
          }

          option.className = classes.join(' ');
        }
      }
    },

    canClick() { return true; },
    click(evt) {
      const options = this.__radioOptions__;
      const i = options?.findIndex((e) => e.contains(evt.target));

      if (i > -1) {
        const { column, itemIndex, dataColumn } = this.index;
        const cellIndex = createCellIndexByDataColumn(view, itemIndex, dataColumn);

        if (isCellEditable(view, column, cellIndex)) {
          prevent(evt);

          const { values, fieldName } = column;
          const value = values[i];

          view.setValue(itemIndex, fieldName, value);
        }
      }
    },
  });
}

function registerCheckListRenderer(view) {
  view.registerCustomRenderer('checkList', {
    initContent(el) {
      el.className = 'rg-renderer rg-check-renderer';

      const { values, labels } = this.index.column;
      const hasOptions = isArray(values) && isArray(labels);

      if (hasOptions) {
        el.innerHTML = values.map((v, i) => `
          <span class="rg-check-renderer__option">
            <span>${v}</span>
            <label>${labels[i]}</label>
          </span>
        `).join('');

        this.__checkOptions__ = [...el.children];
      }
    },

    clearContent(el) {
      if (this.__checkOptions__) {
        el.innerHTML = '';
        this.__checkOptions__ = null;
        delete this.__checkOptions__;
      }
    },

    render(grid, model) {
      const options = this.__checkOptions__;

      if (options?.length) {
        const { value } = model;
        const { values } = model.index.column;

        for (let i = 0; i < options.length; i += 1) {
          const classes = ['rg-check-renderer__option'];
          const option = options[i];
          const optionValue = values[i];
          const newValue = value.split(',');
          if (newValue?.includes(optionValue)) {
            classes.push('rg-check-renderer__option--selected');
          }

          option.className = classes.join(' ');
        }
      }
    },

    canClick() { return true; },
    click(evt) {
      const options = this.__checkOptions__;
      const i = options?.findIndex((e) => e.contains(evt.target));

      if (i > -1) {
        const { column, itemIndex, dataColumn } = this.index;
        const cellIndex = createCellIndexByDataColumn(view, itemIndex, dataColumn);

        if (isCellEditable(view, column, cellIndex)) {
          prevent(evt);

          const { values, fieldName } = column;
          const value = values[i];
          let cellValues = cloneDeep(view.getValue(itemIndex, fieldName) || '');
          cellValues = cellValues.split(',');
          if (!isEmpty(cellValues) && cellValues?.includes(value)) {
            const tempIdx = cellValues.indexOf(value);
            cellValues.splice(tempIdx, 1);
          } else cellValues.splice(i, 0, value);

          cellValues.join(',');
          view.setValue(itemIndex, fieldName, cellValues);
        }
      }
    },
  });
}

export function registerCustomRenderers(view) {
  registerRadioRenderer(view);
  registerCheckListRenderer(view);
}

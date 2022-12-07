/* eslint-disable no-unused-vars */

import { isArray } from 'lodash-es';
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

export function registerCustomRenderers(view) {
  registerRadioRenderer(view);
}

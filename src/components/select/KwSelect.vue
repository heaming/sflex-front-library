<!-- eslint-disable vue/no-v-html -->
<template>
  <q-select
    ref="inputRef"
    v-scroll="onScroll"
    :model-value="computedValue"
    v-bind="{...styleClassAttrs, ...fieldStyleProps}"
    class="kw-select"
    :class="fieldClass"
    :popup-content-class="computedPopupContentClass"
    :label="$g.platform.is.mobile ? label : undefined"
    :error="invalid"
    :options="normalizedOptions"
    :option-value="optionValue"
    :option-label="optionLabel"
    :multiple="multiple"
    :emit-value="emitValue"
    :map-options="emitValue"
    :use-input="computedUseInput"
    :fill-input="fillInput ?? computedUseInput"
    :hide-selected="hideSelected ?? computedUseInput"
    :input-debounce="inputDebounce"
    :disable="disable"
    :readonly="readonly"
    :prefix="prefix"
    :suffix="suffix"
    :color="color"
    :bg-color="bgColor"
    :autofocus="autofocus"
    :placeholder="computedUseInput ? placeholder : undefined"
    :tabindex="tabindex"
    :clearable="false"
    no-error-icon
    :dropdown-icon="dropdownIcon"
    :hide-dropdown-icon="hideDropdownIcon"
    :behavior="computedBehavior"
    :transition-show="$g.platform.is.mobile ? 'jump-up' : undefined"
    :transition-hide="$g.platform.is.mobile ? 'jump-down' : undefined"
    :transition-duration="transitionDuration"
    clear-icon="clear"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @clear="$emit('clear', $event)"
    @keydown="$emit('keydown', $event)"
    @input-value="$emit('inputValue', $event)"
    @filter="onFilter"
    @update:model-value="onUpdateValue"
    @popup-show="onPopup(true)"
    @popup-hide="onPopup(false)"
  >
    <!-- no-option (override slots) -->
    <template
      v-if="useInput || $slots['no-option']"
      #no-option="slotProps"
    >
      <slot
        v-if="$slots['no-option']"
        name="no-option"
        v-bind="slotProps"
      />
      <q-item v-else>
        <q-item-section class="text-italic text-grey">
          {{ $t('MSG_TXT_NO_RESULT', null, '검색된 항목이 없습니다.') }}
        </q-item-section>
      </q-item>
    </template>

    <!-- selected (override slots) -->
    <template
      v-if="selectedText || placeholder"
      #selected
    >
      <span
        key="selectedSlot"
        :class="{'kw-select__placeholder': !selectedText && !!placeholder}"
      >{{ selectedText || placeholder }}
        <kw-tooltip
          anchor="bottom left"
          self="top left"
          :offset="[0, 0]"
          class="ellipsis_tooltip shrinked_tooltip"
        >
          {{ selectedText || placeholder }}
        </kw-tooltip>
      </span>
    </template>

    <!--before-options -->
    <template
      v-if="($g.platform.is.mobile || multiple)"
      #before-options
    >
      <div
        v-if="$g.platform.is.mobile && !behavior"
        class="kw-select-options__header"
      >
        <h1>{{ placeholder }}</h1>
        <q-icon
          name="close_24"
          @click="inputRef.hidePopup()"
        />
      </div>
      <div
        v-if="multiple"
        class="kw-select-options__select-all"
      >
        <q-item
          clickable
          @click="toggleAll"
        >
          <q-item-section class="kw-select-options__side">
            <kw-checkbox
              :model-value="selectedAll"
              :true-value="true"
              :false-value="false"
              dense
              @update:model-value="toggleAll"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ $t('MSG_TXT_ALL', null, '전체') }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </template>

    <!-- options -->
    <template #option="{ itemProps, selected, opt, toggleOption }">
      <q-item
        :active="selected"
        v-bind="{...itemProps, onClick: () => toggleOption(opt, $g.platform.is.mobile && multiple) }"
      >
        <q-item-section
          v-if="multiple"
          class="kw-select-options__side"
        >
          <kw-checkbox
            :model-value="selected"
            dense
            :true-value="true"
            :false-value="false"
            @update:model-value="toggleOption(opt, $g.platform.is.mobile && multiple)"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ opt[optionLabel] }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator v-if="opt[optionSeparator]" />
    </template>
    <!-- after-options -->
    <template
      v-if="$g.platform.is.mobile && multiple"
      #after-options
    >
      <div class="kw-select-options__action">
        <kw-btn
          grow
          primary
          :label="$t('MSG_BTN_CONFIRM', null, '확인')"
          @click="onConfirm"
        />
      </div>
    </template>

    <!-- error -->
    <template
      v-if="invalid"
      #error
    >
      {{ invalidMessage }}
      <kw-tooltip
        anchor="center middle"
        :offset="[0, 3]"
        show-when-ellipsised
      >
        {{ invalidMessage }}
      </kw-tooltip>
    </template>

    <!-- label -->
    <template
      v-if="$g.platform.is.mobile && (label || $slots.label)"
      #label
    >
      <span>{{ label ?? label }}</span>
      <kw-click-outside
        @click-outside="showingHint = false"
      >
        <q-icon
          v-if="hint"
          size="16px"
          name="info"
          class="ml4"
          style="vertical-align: -3px;"
          @click.capture.stop.prevent="toggleHint"
        >
          <kw-tooltip
            :model-value="true"
            :no-parent-event="$g.platform.is.mobile"
            :offset="[0, 3]"
          >
            <!-- eslint-disable vue/no-v-html -->
            <slot
              name="hint"
            >
              <div v-html="sanitize(hint)" />
            </slot>
            <!-- eslint-enable vue/no-v-html -->
          </kw-tooltip>
        </q-icon>
      </kw-click-outside>
    </template>

    <!-- icon slot -->
    <template
      v-if="$slots.append"
      #append
    >
      <slot name="append" />
    </template>
  </q-select>
</template>

<script>
import { cloneDeep } from 'lodash-es';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';
import useFieldStyle, { useFieldStyleProps } from '../../composables/private/useFieldStyle';
import useOptions, { useOptionsProps } from '../../composables/private/useOptions';
import i18n from '../../i18n';
import { sanitize } from '../../plugins/sanitize';
import { platform } from '../../plugins/platform';

export default {
  name: 'KwSelect',
  inheritAttrs: false,

  props: {
    ...useFieldProps,
    ...useFieldStyleProps,
    ...useOptionsProps,

    modelValue: { type: [String, Number, Array, Object], default: undefined },

    // fall through props
    multiple: { type: Boolean, default: false },
    emitValue: { type: Boolean, default: true },
    useInput: { type: Boolean, default: false },
    fillInput: { type: Boolean, default: undefined },
    hideSelected: { type: Boolean, default: undefined },
    inputDebounce: { type: [Number, String], default: 100 },
    dropdownIcon: { type: String, default: 'arrow_down' },
    hideDropdownIcon: { type: Boolean, default: false },
    disable: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    prefix: { type: String, default: undefined },
    suffix: { type: String, default: undefined },
    clearable: { type: Boolean, default: false },
    color: { type: String, default: undefined },
    bgColor: { type: String, default: undefined },
    autofocus: { type: Boolean, default: false },
    placeholder: { type: String, default: i18n.t('MSG_TXT_SEL', null, '선택') },
    tabindex: { type: [Number, String], default: undefined },
    onFilter: { type: Function, default: undefined },
    behavior: { type: String, default: undefined },
    transitionDuration: { type: Number, default: 300 },
  },

  emits: [
    'update:modelValue',
    'focus',
    'blur',
    'clear',
    'keydown',
    'inputValue',
  ],

  setup(props) {
    const fieldCtx = useField();
    const { inputRef, value, showingHint, toggleHint } = fieldCtx;

    const innerValue = ref();
    const computedValue = computed(() => innerValue.value ?? value.value ?? '');

    const qSelectDialog = document.getElementsByClassName('q-select__dialog');
    function onUpdateValue(val) {
      val ??= (props.multiple ? [] : '');

      innerValue.value = val;
      value.value = val;
    }

    const optionsCtx = useOptions({
      valueRef: computedValue,
      onUpdateValue,
      emitValue: props.emitValue,
      value: props.optionValue,
      label: props.optionLabel,
      separator: props.optionSeparator,
    });

    const { normalizedOptions } = optionsCtx;

    function getOptionIndex(val) {
      return normalizedOptions.value.findIndex((v) => v[props.optionValue] === val);
    }

    function getOption(val) {
      const index = getOptionIndex(val);
      if (index > -1) return normalizedOptions.value[index];
    }

    function getOptionLabel(v) {
      return getOption(v)?.[props.optionLabel];
    }

    function isOptionSelected() {
      if (Array.isArray(value.value)) {
        return value.value.length > 0;
      }

      return getOptionIndex(props.emitValue
        ? value.value : value.value?.[props.optionValue]) > -1;
    }

    function updateInputValue(val, noFilter) {
      inputRef.value.updateInputValue(val, noFilter);
    }

    const computedUseInput = computed(() => props.useInput && !props.multiple);

    const computedBehavior = computed(() => {
      if (props.behavior) return props.behavior;
      return platform.is.mobile ? 'dialog' : undefined;
    });

    const computedPopupContentClass = computed(() => {
      if (platform.is.mobile && props.behavior) return 'kw-select-options mobile-behavior';
      return 'kw-select-options';
    });

    const selectedText = computed(() => {
      if (computedUseInput.value) return null;

      if (props.multiple) {
        return value.value
          .map((v) => getOptionLabel(v?.[props.optionValue] || v))
          .join(', ');
      }

      return getOptionLabel((value.value?.[props.optionValue] || value.value) ?? '');
    });

    function onPopup(show) {
      innerValue.value = show
        ? cloneDeep(value.value) : undefined;
      if (!props?.options || props?.options?.length <= 0) {
        inputRef.value.hidePopup();
      }
    }

    function onConfirm() {
      value.value = innerValue.value;
      inputRef.value.hidePopup();
    }

    function handlePan({ evt, ...newInfo }) {
      const info = newInfo;
      const height = `${info.position.top}px`;
      qSelectDialog[0].style.top = height;
      if (info.isFinal) {
        qSelectDialog[0].style.top = null;
      } else if (info.distance.y >= 100) {
        inputRef.value.hidePopup();
      }
    }
    function onScroll() {
      inputRef.value.hidePopup();
    }
    return {
      ...useInheritAttrs(),
      ...useFieldStyle(),
      ...fieldCtx,
      ...optionsCtx,
      computedValue,
      getOptionIndex,
      getOption,
      getOptionLabel,
      isOptionSelected,
      updateInputValue,
      onUpdateValue,
      onPopup,
      onConfirm,
      computedUseInput,
      computedBehavior,
      computedPopupContentClass,
      selectedText,
      showingHint,
      toggleHint,
      handlePan,
      sanitize,
      onScroll,
    };
  },
};
</script>

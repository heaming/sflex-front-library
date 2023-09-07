<template>
  <kw-field-wrap
    class="zwcm-telephone-number"
    control-class="zwcm-telephone-number__control"
    :required="required"
    :label="label"
  >
    <template
      v-if="showLabel"
      #label
    >
      <span>{{ label ?? $t('MSG_TXT_TEL_NO') }}</span>
    </template>
    <!-- <kw-select
      v-if="carrier"
      class="zwcm-telephone-number__carrier"
      :model-value="telNo0"
      :options="telNo0Options"
      :clearable="computedTelNo0Clearable"
      :label="label"
      :rules="{ required }"
      :disable="disable"
      :readonly="readonly"
      @update:model-value="$emit('update:telNo0', $event)"
    /> -->
    <kw-select
      class="zwcm-telephone-number__front-nums"
      :model-value="telNo1"
      :options="telNo1Options"
      :clearable="computedTelNo1Clearable"
      :label="label"
      :rules="{ required }"
      :disable="disable"
      :readonly="readonly"
      @update:model-value="$emit('update:telNo1', $event)"
    />
    <span class="px4">-</span>
    <kw-input
      class="zwcm-telephone-number__back-nums"
      :model-value="inputValue"
      :maxlength="$g.platform.is.mobile ? 9 : undefined"
      :regex="inputRegex"
      :type="$g.platform.is.mobile ? 'tel' : undefined"
      :clearable="clearable"
      :label="label"
      :rules="inputRules"
      :disable="disable"
      :readonly="readonly"
      @update:model-value="onUpdateInputValue"
    />
  </kw-field-wrap>
</template>

<script>
export default {
  props: {
    telNo0: {
      type: String,
      default: undefined,
    },
    telNo1: {
      type: String,
      default: undefined,
    },
    telNo2: {
      type: String,
      default: undefined,
    },
    telNo3: {
      type: String,
      default: undefined,
    },
    carrier: {
      type: Boolean,
      default: false,
    },
    area: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: false,
    },
    telNo0Clearable: {
      type: Boolean,
      default: undefined,
    },
    telNo1Clearable: {
      type: Boolean,
      default: undefined,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    disable: { type: Boolean, default: undefined },
    readonly: { type: Boolean, default: undefined },
    showLabel: { type: Boolean, default: false },
  },
  emits: [
    'update:telNo0',
    'update:telNo1',
    'update:telNo2',
    'update:telNo3',
  ],
  setup(props, { emit }) {
    const computedTelNo0Clearable = computed(() => {
      if (props.telNo0Clearable === undefined) {
        return false;
      }
      return props.telNo0Clearable;
    });

    const computedTelNo1Clearable = computed(() => {
      if (props.telNo1Clearable === undefined) {
        return props.clearable;
      }
      return props.telNo1Clearable;
    });

    const telNo0Options = ['SKT', 'KT', 'U+', '알뜰폰'];
    let telNo1Options = ['010', '011', '017'];
    const telNo1OptionsArea = ['010', '02', '031', '032', '033', '041', '042', '043', '044', '051', '052', '053', '054', '055', '061', '062', '063', '064'];

    const inputValue = ref('');
    const inputRegex = /^(\d{1,2}|\d{5}|\d{3,4}-?|\d{3,4}-\d{1,4}|\d{3}-\d{5})$/;
    const inputRules = computed(() => ({
      required: props.required,
      regex: /^\d{3,4}-\d{4}$/,
    }));

    if (props.area) {
      telNo1Options = telNo1OptionsArea;
    }

    let syncInProgress = false;
    watch(() => [props.telNo2, props.telNo3], ([telNo2, telNo3]) => {
      if (!syncInProgress) {
        const val = `${telNo2 ?? ''}-${telNo3 ?? ''}`;
        inputValue.value = val === '-' ? '' : val;
      }
    }, { immediate: true, deep: true });

    watch(inputValue, (val) => {
      const splited = val.split('-');

      emit('update:telNo2', splited[0] ?? '');
      emit('update:telNo3', splited[1] ?? '');

      syncInProgress = true;
      nextTick(() => { syncInProgress = false; });
    });

    function onUpdateInputValue(val) {
      if (props.area) { // 지역전화번호
        const shouldMasking = inputValue.value.length < val.length;

        if (shouldMasking && val.match(/^\d{4,5}$/)) {
          val = `${val.substring(0, 3)}-${val.substring(3)}`;
        } else if (shouldMasking && val.match(/^\d{3}-\d{5}$/)) {
          val = val.replaceAll(/[^0-9]/g, '');
          val = `${val.substring(0, 4)}-${val.substring(4)}`;
        }
      } else { // 휴대전화번호
        const shouldMasking = inputValue.value.length < val.length && val.match(/^\d{4,5}$/);

        if (shouldMasking) {
          val = `${val.substring(0, 4)}-${val.substring(4)}`;
        }
      }

      inputValue.value = val;
    }

    return {
      computedTelNo0Clearable,
      computedTelNo1Clearable,
      telNo0Options,
      telNo1Options,
      inputRegex,
      inputRules,
      onUpdateInputValue,
      inputValue,
    };
  },
};
</script>

<style lang="scss" scoped>
.zwcm-telephone-number {
  $-root-selector: ".zwcm-telephone-number";

  @at-root .kw-form-item__field &.kw-field-wrap {
    flex: 0 1 456px;
  }

  @at-root .kw-form-item__field &.kw-field-wrap,
  .kw-search.kw-form .kw-form-item__field &.kw-field-wrap {
    #{$-root-selector}__carrier {
      flex: 0 1 120px;
    }

    #{$-root-selector}__front-nums {
      flex: 0 1 80px;
    }
  }

  &__carrier {
    margin-right: 8px;
  }

  &__front-nums {
    &.kw-select.q-select,
    &.kw-select.q-select.q-field--dense {
      .q-field__append {
        padding-left: 8px;
      }
    }
  }

  &__back-nums {
    flex-basis: 240px;
  }

  &--search {
    // fixme -> ???????
    #{$-root-selector}__back-nums {
      flex-basis: auto;
      max-width: unset;
    }
  }
}

body.mobile {
  .zwcm-telephone-number {
    .zwcm-telephone-number__front-nums {
      flex: 0 1 30% !important;
    }

    .zwcm-telephone-number__back-nums {
      flex: 0 1 70% !important;
    }
  }
}

</style>

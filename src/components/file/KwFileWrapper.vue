<template>
  <div
    class="file-wrapper"
  >
    <kw-action-top>
      <template #left>
        <span>{{ $t('MSG_TXT_COM_TOT', null, '총') }}</span>
        <span class="accent pl4">{{ fileRef?.files.length || 0 }}</span>
        <kw-btn
          :label="$t('', null, '파일찾기')"
          class="ml16"
          dense
          @click="fileRef?.pickFiles()"
        />
        <kw-btn
          :label="$t('', null, '삭제')"
          class="ml8"
          dense
          @click="fileRef?.revertSelected()"
        /><!-- todo msg -->
      </template>
      <span>{{ fileRef?.computedCounter }}</span>
      <kw-checkbox
        v-model="isExpended"
        checked-icon="arrow_up"
        unchecked-icon="arrow_down"
        :true-value="true"
        :false-value="false"
        dense
      />
    </kw-action-top>
    <div
      v-show="isExpended"
      class="file-wrapper__container"
    >
      <div
        class="file-wrapper__container-header"
      >
        <kw-checkbox
          :model-value="fileRef?.selectAll"
          class="file-wrapper__checkbox"
          :true-value="true"
          :false-value="false"
          dense
          @update:model-value="(val) => { fileRef.selectAll = val}"
        />
        <div class="file-wrapper__name">
          {{ $t('MSG_TXT_FILE_NM', null, '파일명') }}
        </div>
        <div class="file-wrapper__aside">
          {{ $t('MSG_TXT_FILE_SIZE', null, '파일크기') }}
        </div>
      </div>
      <kw-file
        ref="fileRef"
        :model-value="modelValue"
        class="file-wrapper__file-comp"
        v-bind="{...styleClassAttrs }"
        borderless
        multiple
        append
        :disable="disable"
        :readonly="readonly"
        :accept="accept"
        :max-file-size="maxFileSize"
        :max-files="maxFiles"
        :max-total-size="maxTotalSize"
        :filter="filter"
        :tabindex="tabindex"
        :label="label"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwFileWrapper',
  inheritAttrs: false,

  props: {
    // customize props
    removable: { type: Boolean, default: true },
    downloadable: { type: Boolean, default: true },
    instanceUpdate: { type: Boolean, default: false },
    rejectMessage: { type: [Function, String], default: undefined },

    // fall through props

    prefix: { type: String, default: undefined },
    suffix: { type: String, default: undefined },
    hint: { type: String, default: undefined },
    hideHint: { type: Boolean, default: false },
    color: { type: String, default: undefined },
    bgColor: { type: String, default: undefined },
    loading: { type: Boolean, default: false },
    hideBottomSpace: { type: Boolean, default: false },
    // Whether using default counter of q-file.
    counter: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    clearIcon: { type: String, default: 'delete_16' },
    disable: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    accept: { type: String, default: undefined },
    capture: { type: String, default: undefined },
    maxFileSize: { type: [Number, String], default: undefined },
    maxTotalSize: { type: [Number, String], default: undefined },
    maxFiles: { type: [Number, String], default: undefined },
    filter: { type: Function, default: undefined },
    modelValue: { type: [Object, Array], default: () => [] },
    append: { type: Boolean, default: true },
    displayValue: { type: [Number, String], default: undefined },
    tabindex: { type: [Number, String], default: undefined },
    counterLabel: { type: Function, default: undefined },
    inputClass: { type: [Array, String, Object], default: undefined },
    inputStyle: { type: [Array, String, Object], default: undefined },
  },

  emits: ['update:modelValue', 'rejected'],

  setup() {
    const fileRef = ref();
    const isExpended = ref(true);

    return {
      ...useInheritAttrs(),
      fileRef,
      isExpended,
    };
  },
};
</script>

<style scoped>

</style>

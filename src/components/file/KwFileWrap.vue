<template>
  <div
    class="kw-file-wrap"
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
      class="kw-file-wrap__container"
    >
      <div
        class="kw-file-wrap__container-header"
      >
        <kw-checkbox
          :model-value="fileRef?.selectAll"
          class="kw-file-wrap__checkbox"
          :true-value="true"
          :false-value="false"
          dense
          @update:model-value="(val) => { fileRef.selectAll = val}"
        />
        <div class="kw-file-wrap__name">
          {{ $t('MSG_TXT_FILE_NM', null, '파일명') }}
        </div>
        <div class="kw-file-wrap__aside">
          {{ $t('MSG_TXT_FILE_SIZE', null, '파일크기') }}
        </div>
      </div>
      <kw-file
        ref="fileRef"
        :model-value="modelValue"
        class="kw-file-wrap__file-comp"
        v-bind="{...styleClassAttrs }"
        borderless
        multiple
        :append="append"
        selectable
        pick-file-when-click
        :removable="removable"
        :instance-update="instanceUpdate"
        :disable="disable"
        :readonly="readonly"
        :accept="accept"
        :capture="capture"
        :max-file-size="maxFileSize"
        :max-files="maxFiles"
        :max-total-size="maxTotalSize"
        :filter="filter"
        :tabindex="tabindex"
        :reject-message="rejectMessage"
        @rejected="$emit('rejected', $event)"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwFileWrap',
  inheritAttrs: false,

  props: {
    // customize props
    removable: { type: Boolean, default: true },
    instanceUpdate: { type: Boolean, default: false },
    rejectMessage: { type: [Function, String], default: undefined },
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
    tabindex: { type: [Number, String], default: undefined },
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

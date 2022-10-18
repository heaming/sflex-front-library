<template>
  <q-file
    ref="fileRef"
    v-model="bindValue"
    :counter-label="computedCounterLabel"
    class="kw-field kw-file"
    :class="fileClass"
    v-bind="{...styleClassAttrs, ...fieldStyles}"
    :error="invalid"
    :prefix="prefix"
    :suffix="suffix"
    :hint="hint"
    :hide-hint="hideHint"
    :color="color"
    :bg-color="bgColor"
    :loading="loading"
    bottom-slots
    :hide-bottom-space="hideBottomSpace"
    :counter="counter"
    :clearable="clearable"
    :clear-icon="clearIcon"
    :disable="disable"
    :readonly="readonly"
    :multiple="multiple"
    :accept="accept"
    :max-file-size="maxFileSize"
    :max-files="maxFiles"
    :max-total-size="maxTotalSize"
    :filter="filter"
    :append="append"
    :display-value="displayValue"
    :tabindex="tabindex"
    :input-class="inputClass"
    :input-style="inputStyle"
    no-error-icon
    @rejected="onRejected"
    @click="preventIfClick"
  >
    <!-- default -->
    <template
      v-if="$slots.default"
    >
      <slot />
    </template>

    <div
      v-if="files.length === 0"
      class="kw-file__placeholder"
      :class="placeholderClass"
      :style="placeholderStyle"
    >
      {{ placeholder }}
    </div>

    <!-- prepend -->
    <template
      v-if="$slots.prepend"
      #prepend
    >
      <slot name="prepend" />
    </template>

    <!-- append -->
    <template
      v-if="!multiple || $slots.append"
      #append
    >
      <span v-if="!multiple && !(counter || $slots.counter) && computedCounter">
        {{ computedCounter }}
      </span>
      <slot name="append" />
    </template>

    <!-- before -->
    <template
      v-if="$slots.before"
      #before
    >
      <slot name="before" />
    </template>

    <!-- after -->
    <template
      #after
    >
      <kw-btn
        v-if="!pickFileWhenClick"
        :label="'파일선택'"
        @click="pickFiles"
      />
      <slot name="after" />
    </template>

    <!-- error -->
    <template
      v-if="invalid"
      #error
    >
      <div>
        {{ invalidMessage }}
        <kw-tooltip
          anchor="center middle"
          show-when-ellipsised
        >
          {{ invalidMessage }}
        </kw-tooltip>
      </div>
    </template>

    <!-- hint -->
    <template
      v-if="$slots.hint"
      #hint
    >
      <slot name="hint" />
    </template>

    <!-- counter -->
    <template
      v-if="$slots.counter"
      #counter
    >
      <slot
        name="counter"
        :computed-counter="computedCounter"
      />
    </template>

    <!-- loading -->
    <template
      v-if="$slots.loading"
      #loading
    >
      <slot name="loading" />
    </template>

    <!-- file -->
    <template
      v-if="$slots.file"
      #file="{ file, ref, index }"
    >
      <slot
        :ref="ref"
        name="file"
        :file="file"
        :index="index"
      />
    </template>

    <!-- selected -->
    <template
      v-else
      #selected="{files, ref}"
    >
      <slot
        :ref="ref"
        name="selected"
        :files="files"
      >
        <kw-scroll-area
          class="kw-file__wrapper"
        >
          <div
            v-for="(file, idx) in files"
            :key="`file${idx}`"
            class="kw-file__file kw-file-item"
            :class="fileItemClasses[idx]"
          >
            <kw-checkbox
              v-if="selectable"
              v-model="selectedFileIndexes"
              dense
              class="kw-file-item__checkbox"
              :val="idx"
            />
            <div
              v-if="downloadable && isDownloadable(file)"
              class="kw-file-item__name"
              @click.prevent="downloadFile(file)"
            >
              {{ file.name }}
              <kw-tooltip
                anchor="center middle"
                show-when-ellipsised
              >
                {{ file.name }}
              </kw-tooltip>
            </div>
            <div
              v-else
              class="kw-file-item__name"
            >
              {{ file.name }}
              <kw-tooltip
                anchor="center middle"
                show-when-ellipsised
              >
                {{ file.name }}
              </kw-tooltip>
            </div>
            <div class="kw-file-item__aside">
              <kw-icon
                v-if="isRetryPossible(file)"
                name="warning"
              />
              <div
                v-else-if="multiple"
                class="kw-file-item__size"
              >
                <span> {{ fileSizeToString(file.size) }}</span>
              </div>
              <kw-btn
                v-if="downloadable && isDownloadable(file) && false"
                :icon="'download_off'"
                borderless
                @click.prevent="downloadFile(file)"
              >
                <kw-tooltip
                  anchor="bottom middle"
                >
                  {{ 'download' }}
                </kw-tooltip>
              </kw-btn>
              <kw-btn
                v-if="!instanceUpdate && isUpdatable(file)"
                :icon="'upload_off'"
                borderless
                @click.prevent="updateFile(file)"
              >
                <kw-tooltip
                  anchor="bottom middle"
                >
                  {{ 'update' }}
                </kw-tooltip>
              </kw-btn>
              <kw-btn
                v-if="retryPossible && isRetryPossible(file)"
                :icon="'retry'"
                borderless
                @click.prevent="retryUpdateFile(file)"
              >
                <kw-tooltip
                  anchor="bottom middle"
                >
                  {{ 'retry' }}
                </kw-tooltip>
              </kw-btn>
              <kw-btn
                v-if="removable && isReversible(file)"
                class="kw-file-item__remove"
                icon="clear"
                borderless
                @click.prevent="revertFile(file)"
              >
                <kw-tooltip
                  anchor="bottom middle"
                >
                  {{ 'remove' }}
                </kw-tooltip>
              </kw-btn>
            </div>
          </div>
        </kw-scroll-area>
      </slot>
    </template>
  </q-file>
</template>

<script>
import useField, { useFieldProps } from '../../composables/private/useField';
import { alert } from '../../plugins/dialog';
import useFieldStyle, { useFieldStyleProps } from '../../composables/private/useFieldStyle';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useFileUpload from './private/useFileUpload';
import useFileCounter, { useFileCounterProps } from './private/useFileCounter';
import useFileSelect, { useFileSelectProps } from './private/useFileSelect';
import useFileDownload, {
  useFileDownloadEmits,
  useFileDownloadProps,
} from './private/useFileDownload';

export default {
  name: 'KwFile',
  inheritAttrs: false,

  props: {
    // customize props
    pickFileWhenClick: { type: Boolean, default: false },
    removable: { type: Boolean, default: true },
    retryPossible: { type: Boolean, default: true },
    instanceUpdate: { type: [Boolean, String], default: false },
    rejectMessage: { type: [Function, String], default: undefined },
    placeholder: { type: [Function, String], default: 'select files' },
    placeholderClass: { type: [Array, String, Object], default: undefined },
    placeholderStyle: { type: [Array, String, Object], default: undefined },

    ...useFieldProps,
    ...useFieldStyleProps,
    ...useFileSelectProps,
    ...useFileCounterProps,
    ...useFileDownloadProps,

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
    multiple: { type: Boolean, default: false },
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

  emits: ['update:modelValue', 'rejected', ...useFileDownloadEmits],

  setup(props, { emit }) {
    const fieldStyles = useFieldStyle();

    const fileRef = ref();

    const fieldCtx = useField();
    const { value } = fieldCtx;

    const innerValue = computed({
      get: () => {
        const rawValue = unref(value);
        if (Object(rawValue) === rawValue) {
          return ('length' in rawValue ? Array.from(rawValue) : [rawValue]);
        }
        return [];
      },
      set: (val) => {
        const rawValue = unref(value);
        if (Object(rawValue) === rawValue) {
          value.value = 'length' in rawValue ? val : val[0];
        }
      },
    });

    const uploadCtx = useFileUpload(innerValue, ref({
      instanceUpdate: computed(() => props.instanceUpdate),
    }));

    const { files } = uploadCtx;

    const bindValue = computed({
      get: () => (props.multiple ? files.value : files.value?.[0]),
      set: (val) => {
        files.value = (props.multiple ? val : [val]);
      },
    });

    const uploadings = computed(() => files.value.map(uploadCtx.findUploading));

    // select
    const selectCtx = useFileSelect(uploadCtx);

    // counter
    const counterCtx = useFileCounter(files);

    // download hook
    const downloadCtx = useFileDownload({
      findUploading: uploadCtx.findUploading,
      downloadFile: uploadCtx.downloadFile,
      isDownloadable: uploadCtx.isDownloadable,
    });

    // reject event
    const getRejectMessage = ({ failedPropValidation, file }) => {
      if (typeof props.rejectMessage === 'function') {
        return props.rejectMessage(failedPropValidation, file);
      }
      if (typeof props.rejectMessage === 'string') {
        return props.rejectMessage;
      }
      return `${failedPropValidation} : ${file.name}`;
    };

    const onRejected = (rejectedEntries) => {
      const rejectMessage = rejectedEntries.map(getRejectMessage).join('\n');
      emit('rejected', rejectMessage, rejectedEntries);
      alert(rejectMessage);
    };

    // styling
    const fileClass = computed(() => ({
      'kw-file--multiple': props.multiple,
      'kw-file--blocked': !props.pickFileWhenClick,
      'kw-file--empty': files.value.length === 0,
    }));

    function getFileItemClass(file) {
      let classes = 'kw-file-item ';
      classes += (props.downloadable && uploadCtx.isDownloadable(file)) ? 'kw-file-item--downloadable ' : '';
      const uploadingState = uploadCtx.findUploading(file).state;
      classes += uploadingState ? `kw-file-item--${uploadingState} ` : '';
      return classes;
    }

    const fileItemClasses = computed(() => files.value.map(getFileItemClass));

    // event handler
    function preventIfClick(e) {
      if (e.clientX === 0 && e.clientY === 0) {
        return;
      }
      if (!props.pickFileWhenClick) {
        e.preventDefault();
        e.stopPropagation();
      }
    }

    // reference methods
    const pickFiles = () => {
      fileRef.value?.getNativeElement()?.click();
    };

    // sample codes for attach icon
    // const getIcon = (file) => {
    //   if (file.type.indexOf('video/') === 0) return 'movie';
    //   if (file.type.indexOf('image/') === 0) return 'photo';
    //   if (file.type.indexOf('audio/') === 0) return 'audiotrack';
    //   return 'insert_drive_file';
    // };

    return {
      ...useInheritAttrs(),
      ...fieldCtx,
      fieldStyles,
      ...uploadCtx,
      fileRef,
      bindValue,
      uploadings,
      ...selectCtx.value,
      ...counterCtx,
      ...downloadCtx,
      onRejected,
      preventIfClick,

      // contents

      // ref
      pickFiles,
      fileClass,
      fileItemClasses,
    };
  },
};
</script>

<style scoped>

</style>

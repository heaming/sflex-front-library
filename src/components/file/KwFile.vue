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
      <div
        v-if="emptyAppendCounter"
        class="kw-file-item__size"
      >
        {{ computedCounter }}
      </div>
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
      <kw-scroll-area
        v-if="useHeader"
        :ref="(vm) => { headerScrollAreaRef = vm }"
        class="kw-file__header-container"
        :style="headerScrollAreaStyle"
        :scroll-area-width="scrollHorizontal ? undefined : '100%'"
        :horizontal-thumb-style="{ visibility: 'hidden' }"
        :visible="false"
        @scroll="onScrollHeader"
      >
        <div class="kw-file-item kw-file-item--header">
          <kw-checkbox
            v-if="computedSelectable"
            v-model="selectAll"
            class="kw-file-item__checkbox"
            :true-value="true"
            :false-value="false"
            dense
          />
          <div
            class="kw-file-item__name"
            :style="fileItemNameStyles"
          >
            {{ $t('MSG_TXT_FILE_NM', null, '파일명') }}
          </div>
          <div
            v-if="$slots['append-header']"
            class="kw-file-item__append"
          >
            <slot
              :ref="fileRef"
              name="append-header"
            />
          </div>

          <div
            class="kw-file-item__aside"
            :style="fileItemAsideStyles"
          >
            <div class="kw-file-item__size">
              {{ $t('MSG_TXT_FILE_SIZE', null, '파일크기') }}
            </div>
          </div>
        </div>
      </kw-scroll-area>
      <div
        v-if="showDefaultFilePickBtn || $slots.after"
        class="kw-file__after-slot-container"
      >
        <kw-btn
          v-if="showDefaultFilePickBtn"
          :label="'파일선택'"
          :dense="dense"
          @click="pickFiles"
        />
        <slot name="after" />
      </div>
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
      v-else-if="!$slots.selected"
      #selected="{files, ref}"
    >
      <div
        class="kw-file__selected"
      >
        <kw-scroll-area
          :ref="(vm) => { fileScrollAreaRef = vm}"
          class="kw-file__file-container"
          :scroll-area-style="fileScrollAreaContentsStyle"
          :horizontal-thumb-style="scrollHorizontal ? { borderBottomWidth: '4px', height: '14px' } : undefined"
          @scroll="onScrollFile"
        >
          <div
            v-for="(file, idx) in files"
            :key="`file${idx}`"
            class="kw-file__file kw-file-item"
            :class="fileItemClasses[idx]"
          >
            <kw-checkbox
              v-if="computedSelectable"
              v-model="selectedFileIndexes"
              dense
              class="kw-file-item__checkbox"
              :val="idx"
            />
            <div
              v-if="downloadable && isDownloadable(file)"
              class="kw-file-item__name"
              :style="fileItemNameStyles"
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
              :style="fileItemNameStyles"
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
              v-if="$slots['append-file']"
              class="kw-file-item__append"
            >
              <slot
                :ref="ref"
                name="append-file"
                :file="file"
                :index="idx"
              />
            </div>
            <div
              class="kw-file-item__aside"
              :style="fileItemAsideStyles"
            >
              <div
                class="kw-file-item__size"
              >
                <kw-icon
                  v-if="isRetryPossible(file)"
                  name="warning"
                />
                <span v-else> {{ multiple || !computedCounter ? fileSizeToString(file.size) : computedCounter }}</span>
              </div>
              <kw-btn
                v-if="downloadable && isDownloadable(file) && downloadIcon"
                :icon="downloadIcon"
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
                v-if="!(instanceUpdate === true) && isUpdatable(file)"
                :icon="updateIcon"
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
                :icon="retryIcon"
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
                :icon="removeIcon"
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
      </div>
    </template>
    <template
      v-else
      #selected="{files, ref}"
    >
      <slot
        :ref="ref"
        name="selected"
        :files="files"
      />
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
import useFileHeader, { useFileHeaderProps, useFileHeaderEmits } from './private/useFileHeader';
import useFilePicker, { useFilePickerProps } from './private/useFilePicker';
import useFileDownload, {
  useFileDownloadEmits,
  useFileDownloadProps,
} from './private/useFileDownload';

export default {
  name: 'KwFile',
  inheritAttrs: false,

  props: {
    // customize props
    removable: { type: Boolean, default: true },
    removeIcon: { type: String, default: 'clear' },
    retryPossible: { type: Boolean, default: true },
    retryIcon: { type: String, default: 'retry' },
    instanceUpdate: { type: [Boolean, String], default: false },
    updateIcon: { type: String, default: 'upload_off' },
    rejectMessage: { type: [Function, String], default: undefined },
    placeholder: { type: [Function, String], default: 'select files' },
    placeholderClass: { type: [Array, String, Object], default: undefined },

    ...useFieldProps,
    ...useFieldStyleProps,
    ...useFilePickerProps,
    ...useFileSelectProps,
    ...useFileCounterProps,
    ...useFileDownloadProps,
    ...useFileHeaderProps,

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

  emits: [
    'update:modelValue',
    'rejected',
    ...useFileDownloadEmits,
    ...useFileHeaderEmits,
  ],

  setup(props, { emit, slots }) {
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
        if (Object(val) === val) {
          value.value = 'length' in val ? val : val[0];
        }
      },
    });

    const uploadOptions = computed(() => ({
      instanceUpdate: props.instanceUpdate,
    }));

    const uploadCtx = useFileUpload(innerValue, uploadOptions);

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

    // warp file comp
    const headerCtx = useFileHeader();

    // use action

    // styling
    const fileClass = computed(() => ({
      'kw-file--multiple': props.multiple,
      'kw-file--blocked': !props.pickFileWhenClick,
      'kw-file--empty': files.value.length === 0,
      'kw-file--horizontal-scroll': props.scrollHorizontal,
      ...headerCtx.useHeaderFileClass.value,
    }));

    const emptyAppendCounter = computed(() => !props.multiple
      && !(props.counter || slots.counter)
      && !files.length && !props.useHeader
      && counterCtx.computedCounter.value);

    function getFileItemClass(file) {
      let classes = 'kw-file-item ';
      classes += (props.downloadable && uploadCtx.isDownloadable(file) && !props.downloadIcon) ? 'kw-file-item--downloadable ' : '';
      const uploadingState = uploadCtx.findUploading(file)?.state;
      classes += uploadingState ? `kw-file-item--${uploadingState} ` : '';
      return classes;
    }

    const fileItemClasses = computed(() => files.value.map(getFileItemClass));

    // event handler
    const filePickCtx = useFilePicker(fileRef);

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
      ...selectCtx,
      ...counterCtx,
      ...downloadCtx,
      ...headerCtx,
      ...filePickCtx,
      onRejected,
      fileClass,
      fileItemClasses,
      emptyAppendCounter,
    };
  },
};
</script>

<style scoped>

</style>

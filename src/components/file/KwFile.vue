<template>
  <q-file
    ref="fileRef"
    v-model="bindValue"
    :counter-label="computedCounterLabel"
    :class="fileClass"
    :label="$g.platform.is.mobile ? label : undefined"
    v-bind="{...styleClassAttrs, ...fieldStyleProps}"
    :error="invalid"
    :prefix="prefix"
    :suffix="suffix"
    :hint="hint"
    :hide-hint="hideHint"
    :color="color"
    :bg-color="bgColor"
    :loading="loading"
    :counter="counter || (!computedUseHeader && multiple)"
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
    bottom-slots
    no-error-icon
    @rejected="onRejected"
    @click="onClick"
    @dragleave="onDragLeave"
  >
    <!-- default -->
    <template
      v-if="$slots.default"
    >
      <slot />
    </template>

    <div
      class="kw-file__prepend-native"
      @dragover="onDragOver"
    >
      <kw-scroll-area
        v-if="computedUseHeader"
        :ref="(vm) => { headerScrollAreaRef = vm }"
        class="kw-file__header-container"
        :scroll-width="scrollHorizontal ? '' : '100%'"
        :horizontal-thumb-style="{ visibility: 'hidden' }"
        :visible="false"
        @scroll="onScrollHeader"
      >
        <div class="kw-file-item kw-file__header">
          <kw-checkbox
            v-if="computedSelectable"
            v-model="selectAll"
            class="kw-file-item__checkbox"
            :true-value="true"
            :false-value="false"
            :dense="computedUseHeader"
            :disable="disable || files.length === 0"
          />
          <div
            class="kw-file-item__main"
            :style="fileItemNameStyles"
          >
            <div class="ellipsis shrink">
              <span class="kw-file__header-total">
                {{ `${$t('MSG_TXT_COM_TOT', null, 'Total')} ` }}
                <b>{{ `${files.length}` }}</b>
              </span>
              <span
                v-if="computedCounter"
                class="kw-file__header-counter"
              >
                {{ `(${computedCounter})` }}
              </span>
            </div>
            <div class="kw-file__multiple-action">
              <kw-btn
                v-if="showPickBtn"
                :label="pickBtnLabel"
                no-wrap
                @click="pickFiles"
              />
              <kw-btn
                v-if="showUpdateBtn"
                no-wrap
                dense
                :label="updateBtnLabel"
                @click="updateSelected"
              />
              <kw-btn
                v-if="showUpdateAllBtn"
                no-wrap
                dense
                :label="updateAllBtnLabel"
                @click="updateAll"
              />
              <kw-btn
                v-if="showRevertBtn"
                no-wrap
                dense
                :label="revertBtnLabel"
                @click="revertSelected"
              />
              <kw-btn
                v-if="showRevertAllBtn"
                no-wrap
                dense
                :label="revertAllBtnLabel"
                @click="revertAll"
              />
              <kw-btn
                v-if="showRemoveBtn"
                no-wrap
                dense
                :label="removeBtnLabel"
                @click="removeSelected"
              />
              <kw-btn
                v-if="showRemoveAllBtn"
                no-wrap
                dense
                :label="removeAllBtnLabel"
                @click="removeAll"
              />
              <kw-btn
                v-if="showUndeleteBtn"
                no-wrap
                dense
                :label="undeleteBtnLabel"
                @click="undeleteSelected"
              />
              <kw-btn
                v-if="showUndeleteAllBtn"
                no-wrap
                dense
                :label="undeleteAllBtnLabel"
                @click="undeleteAll"
              />
              <kw-btn
                v-if="showDownloadBtn"
                no-wrap
                dense
                :label="downloadBtnLabel"
                @click="downloadSelected"
              />
              <kw-btn
                v-if="showDownloadAllBtn"
                no-wrap
                dense
                :label="downloadAllBtnLabel"
                @click="() => downloadAll(false)"
              />
              <slot
                :ref="fileRef"
                name="header-action"
              />
            </div>
          </div>

          <div
            v-if="$slots['append-header']"
            class="kw-file-item__append"
            :style="fileItemAppendStyles"
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
            <slot name="header-aside" />
            <kw-checkbox
              v-if="collapsible"
              v-model="collapsed"
              checked-icon="arrow_down"
              indeterminate-icon="arrow_up"
              unchecked-icon="arrow_up"
              :true-value="true"
              :false-value="false"
            />
          </div>
        </div>
      </kw-scroll-area>
    </div>

    <div
      v-if="computedPlaceholder"
      class="kw-file__placeholder"
      :class="placeholderClass"
      :style="placeholderStyle"
    >
      <span>
        {{ computedPlaceholder }}
      </span>
    </div>

    <div
      v-if="computedDndHint"
      class="kw-file__dnd-hint"
    >
      {{ computedDndHint }}
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
      v-if="!computedUseHeader || $slots.append"
      #append
    >
      <div
        v-if="showAppendCounter"
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
      <div
        v-if="(!computedUseHeader && showPickBtn) || $slots.after"
        class="kw-file__after-slot-container"
      >
        <div
          v-if="!computedUseHeader"
          class="kw-file__single-action"
        >
          <kw-btn
            v-if="showPickBtn"
            color="transparent"
            padding="12px"
            :label="pickBtnLabel"
            :dense="dense"
            @click="pickFiles"
          />
        </div>
        <slot name="after" />
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
        show-when-ellipsised
      >
        {{ invalidMessage }}
      </kw-tooltip>
    </template>

    <!-- hint -->
    <template
      v-if="$slots.hint || acceptHint"
      #hint
    >
      <slot name="hint">
        <template v-if="acceptHint">
          {{ acceptHint }}
          <kw-tooltip
            v-if="accept.split(', ').length > 3"
            anchor="bottom start"
            self="top left"
            class="file_tooltip"
          >
            {{ accept }}
          </kw-tooltip>
        </template>
      </slot>
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
          width="100%"
          :min-height="fileContainerMinHeight"
          :max-height="fileContainerMaxHeight"
          :scroll-style="fileScrollAreaContentsStyle"
          :scroll-width="scrollHorizontal ? '' : '100%'"
          @scroll="onScrollFile"
        >
          <div
            v-for="(file, idx) in files"
            :key="`file${idx}`"
            class="kw-file__file kw-file-item"
            :class="fileItemClass[idx]"
          >
            <kw-checkbox
              v-if="computedSelectable"
              v-model="selectedFileKeys"
              class="kw-file-item__checkbox"
              :val="fileKeys[idx]"
              :dense="computedUseHeader"
              :disable="disable"
            />
            <div
              class="kw-file-item__main"
              :style="fileItemNameStyles"
            >
              <kw-icon
                class="kw-file-item__icon"
                :tooltip="file.type"
                :name="getExtensionIcon(file)"
              />
              <p
                class="kw-file-item__name"
                @click="onClickToggleFile(fileKeys[idx])"
              >
                <span class="ellipsis kw-file-item__name-txt">
                  {{ file.name.substring(0, file.name.lastIndexOf('.')) }}
                  <kw-tooltip
                    anchor="center middle"
                    show-when-ellipsised
                  >
                    {{ file.name }}
                  </kw-tooltip>
                </span>
                <span class="kw-file-item__name-ext">
                  {{ `.${file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length).toLowerCase()}` }}
                </span>
              </p>
              <span
                class="kw-file-item__size"
              > {{ `(${multiple || !computedCounter ? fileSizeToString(file.size) : computedCounter})` }}
              </span>
            </div>
            <div
              v-if="$slots['append-file']"
              class="kw-file-item__append"
              :style="fileItemAppendStyles"
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
              <span
                v-if="isRetryPossible(file)"
                class="kw-file-item__error-text"
              >Fail</span>
              <kw-btn
                v-if="updatable && !(instanceUpdate === true) && (isUpdatable(file) || isUpdating(file))"
                :icon="updateIcon"
                :disable="isUpdating(file)"
                :loading="isUpdating(file)"
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
                label="재시도"
                dense
                secondary
                class="kw-file-item__retry-btn"
                @click.prevent="retryUpdateFile(file)"
              >
                <kw-tooltip
                  anchor="bottom middle"
                >
                  {{ 'retry' }}
                </kw-tooltip>
              </kw-btn>
              <kw-btn
                v-if="previewable"
                class="kw-file-item__preview"
                :icon="previewIcon"
                borderless
              >
                <kw-tooltip
                  anchor="bottom middle"
                >
                  {{ 'preview (개발중)' }}
                </kw-tooltip>
              </kw-btn>
              <kw-btn
                v-if="computedIsDownloadable(file) && downloadIcon"
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
                v-if="isReversible(file) && !fileUidMode && !multiple"
                class="kw-file-item__remove"
                :icon="revertIcon"
                borderless
                @click.prevent="revertFile(file)"
              >
                <kw-tooltip
                  anchor="bottom middle"
                >
                  {{ 'clear' }}
                </kw-tooltip>
              </kw-btn>
              <kw-btn
                v-else-if="fileUidMode && !multiple"
                class="kw-file-item__remove"
                :icon="removeIcon"
                borderless
                @click.prevent="revertFileAtFileUidMode(file)"
              >
                <kw-tooltip
                  anchor="bottom middle"
                >
                  {{ 'clear' }}
                </kw-tooltip>
              </kw-btn>
              <kw-btn
                v-else-if="isRemovable(file) && !fileUidMode && !multiple"
                class="kw-file-item__remove"
                :icon="removeIcon"
                borderless
                @click.prevent="removeFile(file)"
              >
                <kw-tooltip
                  anchor="bottom middle"
                >
                  {{ 'clear' }}
                </kw-tooltip>
              </kw-btn>
              <kw-btn
                v-if="!reversible && undeletePossible && isUndeletePossible(file) && !fileUidMode"
                class="kw-file-item__remove"
                :icon="undeleteIcon"
                borderless
                @click.prevent="undeleteFile(file)"
              >
                <kw-tooltip
                  anchor="bottom middle"
                >
                  {{ 'undelete' }}
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

    <!-- label -->
    <template
      v-if="$g.platform.is.mobile && (label || $slots.label)"
      #label
    >
      {{ label ?? label }}
    </template>
  </q-file>
</template>

<script>
import { alert } from '../../plugins/dialog';
import useField, { useFieldProps } from '../../composables/private/useField';
import useFieldStyle, { useFieldStyleProps } from '../../composables/private/useFieldStyle';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useFileUpload from './private/useFileUpload';
import useFileCounter, { useFileCounterProps } from './private/useFileCounter';
import useFileSelect, { useFileSelectProps } from './private/useFileSelect';
import useFileHeader, { useFileHeaderProps, useFileHeaderEmits } from './private/useFileHeader';
import useFilePicker, { useFilePickerProps, useFilePickerEmits } from './private/useFilePicker';
import useFileDownload, {
  useFileDownloadEmits,
  useFileDownloadProps,
} from './private/useFileDownload';
import { stopAndPrevent } from '../../utils/private/event';
import { DenseContextKey } from '../../consts/private/symbols';
import { modal } from '../../plugins/modal';

const UPDATE_AVAILABLE_OPTIONS = [true, false, 'remove', 'upload'];
const IMAGE_EXTENSION = ['jpg', 'gif', 'bmp', 'png', 'jpeg'];

export default {
  name: 'KwFile',
  inheritAttrs: false,

  props: {
    // customize props
    fileUidMode: { type: Boolean, default: false },
    reversible: { type: Boolean, default: true },
    revertIcon: { type: String, default: 'clear' },
    removable: { type: Boolean, default: true },
    removeIcon: { type: String, default: 'clear' },
    undeletePossible: { type: Boolean, default: undefined },
    undeleteIcon: { type: String, default: 'clear' },
    retryPossible: { type: Boolean, default: true },
    retryIcon: { type: String, default: 'redo' },
    instanceUpdate: { type: [Boolean, String],
      default: false,
      validate: (val) => UPDATE_AVAILABLE_OPTIONS.includes(val) },
    updatable: { type: Boolean, default: true },
    updateIcon: { type: String, default: 'upload_off' },
    rejectMessage: { type: [Function, String], default: undefined },
    placeholder: { type: [Function, String], default: undefined },
    placeholderClass: { type: [Array, String, Object], default: undefined },
    dndHint: { type: [Boolean, String], default: false },
    upload: { type: Function, default: undefined },
    download: { type: Function, default: undefined },

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
    // Whether using default counter of q-file.
    counter: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    clearIcon: { type: String, default: 'delete_16' },
    disable: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    accept: { type: String, default: undefined },
    maxFileSize: { type: [Number, String], default: undefined },
    maxTotalSize: { type: [Number, String], default: undefined },
    maxFiles: { type: [Number, String], default: undefined },
    filter: { type: Function, default: undefined },
    modelValue: { type: [Object, Array], default: undefined },
    append: { type: Boolean, default: true },
    displayValue: { type: [Number, String], default: undefined },
    tabindex: { type: [Number, String], default: undefined },
    inputClass: { type: [Array, String, Object], default: undefined },
    inputStyle: { type: [Array, String, Object], default: undefined },
    previewIcon: { type: String, default: 'viewer' },
    previewable: { type: Boolean, default: true },
  },

  emits: [
    'update:modelValue',
    'rejected',
    ...useFileDownloadEmits,
    ...useFileHeaderEmits,
    ...useFilePickerEmits,
  ],

  setup(props, { emit, slots }) {
    const { t } = useI18n();

    const fileRef = ref();

    const fieldCtx = useField();
    const { value, invalid, resetValidation, isModified } = fieldCtx;

    const innerValue = computed({
      get: () => {
        const rawValue = unref(value);
        if (Object(rawValue) === rawValue) {
          return ('length' in rawValue ? Array.from(rawValue) : [rawValue]);
        }
        return [];
      },
      set: (val) => {
        if (Object(value.value) === value.value) {
          value.value = 'length' in value.value ? val : val[0];
        } else {
          value.value = val[0];
        }
      },
    });

    const ables = computed(() => {
      const editable = props.disable !== true && props.readonly !== true;
      return {
        add: editable,
        update: editable && props.updatable,
        manualUpdate: editable && props.updatable && props.instanceUpdate !== true,
        retry: editable && props.updatable && props.retryPossible,
        revert: editable && props.reversible && props.removable,
        remove: editable && (props.reversible && props.removable) && props.modelValue.length > 0,
        undelete: editable && (props.reversible || props.undeletePossible),
        download: props.disable !== true && !!props.downloadable && props.modelValue.length > 0,
      };
    });

    const uploadOptions = computed(() => ({
      instanceUpdate: props.instanceUpdate,
      upload: props.upload,
      download: props.download,
    }));

    const selectCtx = {};

    const uploadCtx = useFileUpload(innerValue, uploadOptions, ables, selectCtx);

    const { files } = uploadCtx;
    const bindValue = computed({
      get: () => files.value,
      set: (val) => {
        files.value = (props.multiple ? val : [val]);
      },
    });

    const uploadings = computed(() => files.value.map(uploadCtx.findUploading));

    // select
    Object.assign(selectCtx, useFileSelect(uploadCtx, ables));

    // counter
    const counterCtx = useFileCounter(files);

    // download hook
    const downloadCtx = useFileDownload({
      findUploading: uploadCtx.findUploading,
      downloadFile: uploadCtx.downloadFile,
      isDownloadable: uploadCtx.isDownloadable,
    }, ables);

    // reject event
    const getRejectMessage = ({ failedPropValidation, file }) => {
      if (typeof props.rejectMessage === 'function') {
        return props.rejectMessage(failedPropValidation, file);
      }
      if (typeof props.rejectMessage === 'string') {
        return props.rejectMessage;
      }
      if (failedPropValidation === 'accept') {
        return t('MSG_ALT_CHK_PRHB_EXTS');
      }
      return `${failedPropValidation} validation error : ${file.name}`;
    };

    const onRejected = (rejectedEntries) => {
      const rejectMessage = rejectedEntries.map(getRejectMessage).join('\n');
      emit('rejected', rejectMessage, rejectedEntries);
      alert(rejectMessage);
    };

    // header
    const headerCtx = useFileHeader(uploadCtx, ables);
    const { useHeaderFileClass, computedUseHeader, collapsed } = headerCtx;

    // placeholder
    const acceptHint = computed(() => {
      if (!props.accept) { return; }
      const acceptFiles = props.accept.split(', ');
      const acceptFilesText = acceptFiles.length > 3 ? `${acceptFiles.slice(0, 3).join(', ')}, ···` : props.accept;
      return `${t('MSG_TXT_ULD_PSB_FILE', '업로드 가능 파일')} : ${acceptFilesText}`;
    });

    const computedPlaceholder = computed(() => {
      if (!ables.value.add || files.value.length > 0) {
        return null;
      }
      if (props.placeholder) {
        return typeof props.placeholder === 'function' ? props.placeholder() : props.placeholder;
      }
      return computedUseHeader.value
        ? t('MSG_TXT_DROP_FILE_TO_ATTH', '첨부할 파일을 여기에 놓아주세요.')
        : '';
    });

    const computedDndHint = computed(() => {
      if (!ables.value.add) {
        return null;
      }
      if (props.dndHint !== undefined) {
        return props.dndHint;
      }
      return computedUseHeader.value ? t('MSG_TXT_DROP_FILE_TO_ATTH', '첨부할 파일을 여기에 놓아주세요.') : null;
    });

    const draggingToHeader = ref(false);

    const onDragOver = (evt) => {
      stopAndPrevent(evt);
      draggingToHeader.value = true;
    };

    const onDragLeave = (evt) => {
      stopAndPrevent(evt);
      draggingToHeader.value = false;
    };

    // styling
    const fieldStyles = useFieldStyle();
    const { fieldStyleProps, fieldClass } = fieldStyles;

    if (computedUseHeader.value) {
      provide(DenseContextKey, {
        dense: computedUseHeader.value,
      });
    } // notify! slots inherited dense when useHeader.

    const fileClass = computed(() => ({
      ...fieldClass.value,
      'kw-file': true,
      'kw-file--multiple': props.multiple,
      'kw-file--blocked': !props.pickFileWhenClick,
      'kw-file--empty': files.value.length === 0,
      'kw-file--horizontal-scroll': props.scrollHorizontal,
      'kw-file--show-dnd-hint': !!computedDndHint.value,
      'kw-file--collapsed': collapsed.value === true,
      'kw-file--dnd-header': draggingToHeader.value === true,
      ...useHeaderFileClass.value,
    }));

    const showAppendCounter = computed(() => (!computedUseHeader.value && !props.multiple)
      && !(props.counter || slots.counter)
      && !files.value.length
      && !!counterCtx.computedCounter.value);

    function getFileItemClass(file) {
      let classes = 'kw-file-item ';
      if (downloadCtx.computedIsDownloadable.value(file) && !props.downloadIcon) {
        classes += 'kw-file-item--downloadable ';
      }
      const uploadingState = uploadCtx.findUploading(file)?.state;
      classes += uploadingState ? `kw-file-item--${uploadingState} ` : '';
      if (selectCtx.selectedFiles?.value.includes(file)) {
        classes += 'kw-file-item--selected ';
      }
      return classes;
    }

    const fileItemClass = computed(() => files.value.map(getFileItemClass));

    // event handler
    const filePickCtx = useFilePicker(fileRef, ables);
    const { preventIfClick } = filePickCtx;

    const onClick = async (evt) => {
      if (invalid.value) {
        evt.preventDefault();
        await resetValidation();
        return;
      }
      preventIfClick(evt);
    };

    const getExtensionIcon = (file) => {
      if (file.type.indexOf('video/') === 0) return 'movie';
      if (file.type.indexOf('image/') === 0) return 'imgpreview';
      if (file.type.indexOf('audio/') === 0) return 'audio';
      if (file.type.indexOf('pdf') > -1) return 'pdf';
      if (file.type.indexOf('xml') > -1) return 'excel';
      return 'file';
    };

    const isFile = (file) => IMAGE_EXTENSION.includes(file.attachFile?.fileExtensionName.toLowerCase());

    async function openImagePreview(file) {
      await modal({
        component: 'ZwcmzImagePreviewP',
        componentProps: { images: [file.attachFile.fileUid] },
      });
    }

    return {
      ...useInheritAttrs(),
      ...fieldCtx,
      fieldStyleProps,
      ...uploadCtx,
      fileRef,
      bindValue,
      uploadings,
      ...selectCtx,
      ...counterCtx,
      ...downloadCtx,
      ...headerCtx,
      ...filePickCtx,
      onClick,
      onRejected,
      fileClass,
      fileItemClass,
      showAppendCounter,
      computedPlaceholder,
      computedDndHint,
      innerValue,
      getExtensionIcon,
      acceptHint,
      onDragOver,
      onDragLeave,
      isFile,
      openImagePreview,
      isModified,
    };
  },
};
</script>

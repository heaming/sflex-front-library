<template>
  <template v-if="multiple">
    <q-file
      ref="fileRef"
      v-model="files"
      counter
      v-bind="$attrs"
      append
      multiple
      :accept="accept"
      :counter-label="counterLabel"
      :error="error"
      :error-message="errorMessage"
      :max-file-size="maxFileSize"
      :max-files="maxFiles"
      :max-total-size="maxTotalSize"
      :clearable="false"
      @rejected="onRejected"
    >
      <template
        #file="{ file }"
      >
        <slot
          name="file"
          :file="file"
        >
          <div
            class="row full-width no-wrap"
            style="align-items: center;"
          >
            <q-checkbox
              v-model="selectedFiles"
              :val="file"
            />
            <div class="ellipsis">
              {{ `${file.name} (${fileSizeToString(file.size)})` }}
            </div>
            <div
              class="flex no-wrap"
              style="margin-left: auto;"
            >
              <q-btn
                v-if="isRemovable(file)"
                icon="download"
                dense
                flat
                @click.prevent="downloadFile(file)"
              />
              <q-btn
                v-if="isRemovable(file)"
                icon="delete"
                dense
                flat
                @click.prevent="removeFile(file)"
              />
            </div>
          </div>
        </slot>
      </template>
    </q-file>
  </template>
  <template v-else>
    <q-input
      v-bind="$attrs"
      readonly
      :model-value="files[0]?.name"
      :error="error"
      :error-message="errorMessage"
      :counter="false"
      :clearable="false"
      @click="pickFiles"
    >
      <template
        v-if="files[0]"
        #append
      >
        <q-btn
          icon="download"
          dense
          flat
          @click="downloadFile(files[0])"
        />
        <q-btn
          icon="delete"
          dense
          flat
          @click="removeFile(files[0])"
        />
      </template>
    </q-input>

    <q-file
      v-show="false"
      ref="fileRef"
      :model-value="null"
      v-bind="$attrs"
      :accept="accept"
      :max-file-size="maxFileSize"
      :max-total-size="maxTotalSize"
      @update:model-value="syncWithUploading"
    />
  </template>
</template>

<script>
import { STATE, useMultiFileUpload } from '../../composables/private/useFileUpload';
import { alert } from '../../plugins/dialog';

export default {
  name: 'FilePicker',

  props: {
    modelValue: { type: Array, default: () => [] },

    error: { type: Boolean, required: false, default: false },
    errorMessage: { type: String, required: false, default: undefined },

    multiple: { type: Boolean, required: false, default: false },
    accept: { type: String, required: false, default: undefined },
    capture: { type: String, required: false, default: undefined },
    maxFileSize: { type: [Number, String], required: false, default: undefined },
    maxTotalSize: { type: [Number, String], required: false, default: undefined },
    maxFiles: { type: [Number, String], required: false, default: undefined },
    filter: { type: Function, required: false, default: undefined },
    instanceUpdate: { type: Boolean, default: false },
    rejectMessage: { type: [Function, String], default: undefined },
  },

  emits: ['update:modelValue', 'rejected'],

  setup(props, { emit }) {
    const fileRef = ref();
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(newFiles) {
        emit('update:modelValue', newFiles);
      },
    });

    const uploadCtx = useMultiFileUpload(value, {
      instanceUpdate: props.instanceUpdate,
    });

    const { files } = uploadCtx;

    function syncWithUploading(file) {
      files.value = [file];
    }

    // if you want use q-file for single FilePicker,
    // ignoring warning which is occurred when bind modelvalue with FileLike.
    // use this files override
    // const files = computed({
    //   get() {
    //     return props.multiple ? files.value : files.value[0];
    //   },
    //   set(fileOrFiles) {
    //     files.value = fileOrFiles.length ? fileOrFiles : [fileOrFiles];
    //   },
    // });

    const pickFiles = () => {
      fileRef.value.pickFiles();
    };

    const selectedFiles = ref([]);

    const isRemovable = (file) => {
      const uploading = uploadCtx.findUploading(file);
      return [STATE.UPLOADED, STATE.UPLOAD].includes(uploading?.state);
    };

    const updateSelected = () => {
      selectedFiles.value.forEach(uploadCtx.updateFile);
    };

    const removeSelected = () => {
      selectedFiles.value.forEach(uploadCtx.removeFile);
    };

    const getSelectedFilesName = () => selectedFiles.value.map((file) => file.name);

    const getIcon = (file) => {
      if (file.type.indexOf('video/') === 0) return 'movie';
      if (file.type.indexOf('image/') === 0) return 'photo';
      if (file.type.indexOf('audio/') === 0) return 'audiotrack';
      return 'insert_drive_file';
    };

    const fileSizeToString = (fileSize, fractionDigits = 1) => {
      const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
      let unitIndex = 0;
      while (fileSize > 1024 && unitIndex < units.length) {
        fileSize /= 1024;
        unitIndex += 1;
      }
      return fileSize.toFixed(fractionDigits) + units[unitIndex];
    };

    const counterLabel = ({ totalSize, filesNumber, maxFiles }) => {
      const counters = [];
      if (props.maxFiles) {
        counters.push(`${filesNumber} files of ${maxFiles}`);
      }
      if (props.maxTotalSize) {
        counters.push(`${totalSize} / ${fileSizeToString(props.maxTotalSize, 0)}`);
      }
      return counters.join(' | ');
    };

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

    return {
      fileRef,
      selectedFiles,
      ...uploadCtx,
      syncWithUploading,
      onRejected,

      // contents
      fileSizeToString,
      counterLabel,

      // style
      isRemovable,
      getIcon,

      // ref
      getSelectedFilesName,
      pickFiles,
      updateSelected,
      removeSelected,
    };
  },
};
</script>

<style scoped>

</style>

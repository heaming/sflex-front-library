<template>
  <div v-bind="styleClassAttrs">
    <div
      v-if="multiple"
      class="button-area"
    >
      <q-btn
        icon="add"
        dense
        @click="pickFiles"
      />
      <q-btn
        icon="remove"
        dense
        @click="removeSelected"
      />
    </div>
    <div class="file-area">
      <file-picker
        ref="inputRef"
        v-model="value"
        instance-update
        v-bind="inheritedAttrs"
        :disable="!accept"
        :accept="accept"
        :counter="!error"
        :error="error"
        :error-message="errorMessage"
        :multiple="multiple"
        :max-total-size="maxTotalSize"
      />
    </div>
  </div>
</template>

<script>
import { warn } from 'vue';
import { http } from '../../plugins/http';
import { getConfig } from '../../plugins/meta';
import useField, { useFieldProps } from '../../composables/private/useField';
import FilePicker from './FilePicker.vue';
import useInheritAttrs from '../../composables/private/useInheritAttrs';

const toFileLike = (attachFile) => ({
  name: attachFile.fileName,
  size: Number.parseInt(attachFile.fileSize, 10) || 0,
  type: undefined,
  targetPath: 'storage',
  serverFileName: attachFile.realityFilePath,
  fileUid: attachFile.fileUid,
  myFileYn: attachFile.myFileYn,
});
const getExtension = (fileName) => {
  const dotIndex = fileName.indexOf('.');
  if (dotIndex > 0 && dotIndex < fileName.length - 1) {
    return fileName.slice(dotIndex + 1);
  }
};
const toAttachFiles = (uploadedFileLike, attachFileGroup, attachDocumentId, arrayalOrder) => ({
  fileUid: uploadedFileLike.fileUid,
  attachDocumentId,
  attachGroupId: attachFileGroup.attachGroupId,
  realityFilePath: uploadedFileLike.serverFileName,
  fileName: uploadedFileLike.name,
  fileExtensionName: getExtension(uploadedFileLike.name),
  fileSize: uploadedFileLike.size,
  arrayalOrder,
  representativeImageYn: undefined, // todo check
});
const mapToAttachFiles = (uploadedFileLikes, attachFileGroup, attachDocumentId) => {
  const attachFiles = [];
  uploadedFileLikes.forEach((uploadedFileLike, index) => {
    attachFiles.push(toAttachFiles(uploadedFileLike, attachFileGroup, attachDocumentId, index + 1));
  });
  return attachFiles;
};
const getFileExtWhiteList = (extCode) => {
  // todo remove fallback value
  const configValue = getConfig(`CFG_CMD_ATTH_PSBL_EXTS_${extCode}`, 'word, ppt, doc, docx, pptx, txt, xlsx, xls, pdf, xlsm, png, eml, dwg, mht, jpg, cts, apk');

  if (!configValue) {
    warn('첨부가능 확장자에 대한 config 를 찾을 수 없습니다.');
    return;
  }
  return configValue
    .split(',')
    .map((ext) => `.${ext.trim()}`)
    .join(', ');
};

export default {
  name: 'KwFile',
  components: { FilePicker },
  inheritAttrs: false,

  props: {
    ...useFieldProps,

    modelValue: { type: Array, default: () => [] },
    attachGroupId: { type: String, default: '' },
    attachDocumentId: { type: String, default: '' },
    showAddDeleteBtn: { type: Boolean, default: false },
    showUpDownArrowBtn: { type: Boolean, default: false },
    myFileYn: { type: String, default: 'N' },

    multiple: { type: Boolean, default: false },
  },

  emits: ['update:modelValue'],

  async setup(props) {
    const attrsCtx = useInheritAttrs();
    const fieldCtx = useField();
    const { value, inputRef, init } = fieldCtx;

    const initFiles = ref([]);
    const attachFileGroup = ref({});
    const maxTotalSize = computed(() => {
      const serverSetting = attachFileGroup?.value?.attachRestrictionSize;
      if (serverSetting) {
        return serverSetting * 1024 * 1024;
      }
    });
    const accept = computed(() => {
      const serverSetting = attachFileGroup?.value?.attachPossibilityExtensionCode || 'ALL'; // todo check white list key
      if (serverSetting) {
        return getFileExtWhiteList(serverSetting);
      }
    });

    async function setInitFiles(attachDocumentId) {
      if (attachDocumentId) {
        const response = await http.get(`/api/v1/common/attach-files/${attachDocumentId}`);
        initFiles.value = response.data;
      }
      value.value = initFiles.value.map(toFileLike);
      await init();
    }

    async function setAttachFileGroup(attachGroupId) {
      if (attachGroupId) {
        const response = await http.get(`/api/v1/common/attach-file-groups/${attachGroupId}`);
        attachFileGroup.value = response.data;
      }
    }

    await setAttachFileGroup(props.attachGroupId);
    await setInitFiles(props.attachDocumentId);
    await init();

    watch(() => props.attachDocumentId, setInitFiles);
    watch(() => props.attachGroupId, setAttachFileGroup);

    const getAttachFiles = () => mapToAttachFiles(
      value.value,
      attachFileGroup.value,
      props.attachDocumentId,
    );

    const pickFiles = () => {
      inputRef.value.pickFiles();
    };

    const removeSelected = () => {
      inputRef.value.removeSelected();
    };

    return {
      ...attrsCtx,
      ...fieldCtx,
      attachFileGroup,
      initFiles,
      accept,
      maxTotalSize,

      // ref
      pickFiles,
      getAttachFiles,
      removeSelected,
    };
  },
};
</script>

<style scoped>

</style>

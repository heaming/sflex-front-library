import { notify } from '../../../plugins/notify';
import { downloadAll } from '../../../utils/file';

export const useFileDownloadProps = {
  downloadable: { type: [Boolean, Function], default: false },
  downloadIcon: { type: String, default: 'file_download' },
  onBeforeDownload: { type: Function, default: undefined },
};

export const useFileDownloadEmits = ['downloaded'];

export default (uploadCtx, ables) => {
  const { t } = useI18n();
  const { props, emit } = getCurrentInstance();

  const computedIsDownloadable = computed(() => (file) => {
    if (ables.value.download === false) {
      return false;
    }
    if (typeof props.downloadable === 'function') {
      return props.downloadable(file) && uploadCtx.isDownloadable(file);
    }
    return uploadCtx.isDownloadable(file);
  });

  const downloadFile = computed(() => async (file) => {
    if (ables.value.download === false) { return; }
    if (!uploadCtx.isDownloadable(file)) { return; }
    const uploading = uploadCtx.findUploading(file);
    const normalizedFile = uploading.file;
    const beforeHookResult = props.onBeforeDownload ? await props.onBeforeDownload(normalizedFile) : undefined;
    if (beforeHookResult || beforeHookResult === undefined) {
      await uploadCtx.downloadFile(file);
      emit('downloaded', file);
    }
  });

  const downloadSelectedAll = async (selectedFiles) => {
    if (selectedFiles.length < 1) {
      notify(t('MSG_ALT_NOT_SELECTED_FILE', '선택된 파일이 없습니다.'));
      return;
    }
    if (!ables.value?.download) { return; }

    const beforeHookResult = props.onBeforeDownload ? await props.onBeforeDownload(selectedFiles) : undefined;
    if (beforeHookResult || beforeHookResult === undefined) {
      if (selectedFiles.length <= 1) {
        await uploadCtx.downloadFile(selectedFiles[0]);
      } else downloadAll(selectedFiles);
    }
  };

  return {
    downloadFile,
    computedIsDownloadable,
    downloadSelectedAll,
  };
};

export const useFileDownloadProps = {
  downloadable: { type: [Boolean, Function], default: false },
  downloadIcon: { type: String, default: 'file_download' },
  onBeforeDownload: { type: Function, default: undefined },
};

export const useFileDownloadEmits = ['downloaded'];

export default (uploadCtx, ables) => {
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

  return {
    downloadFile,
    computedIsDownloadable,
  };
};

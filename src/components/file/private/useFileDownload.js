export const useFileDownloadProps = {
  downloadable: { type: [Boolean, Function], default: false },
  downloadIcon: { type: String, default: undefined }, // download_off
  onBeforeDownload: { type: Function, default: undefined },
};

export const useFileDownloadEmits = ['downloaded'];

export default (uploadCtx) => {
  const { props, emit } = getCurrentInstance();

  const computedIsDownloadable = computed(() => (file) => {
    if (props.downloadable === false) {
      return false;
    }
    if (typeof props.downloadable === 'function') {
      return props.downloadable(file) && uploadCtx.isDownloadable(file);
    }
    return uploadCtx.isDownloadable(file);
  });

  const downloadFile = computed(() => async (file) => {
    if (!props.downloadable) { return; }
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

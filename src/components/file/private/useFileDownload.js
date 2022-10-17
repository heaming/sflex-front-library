export const useFileDownloadProps = {
  downloadable: { type: Boolean, default: false },
  onBeforeDownload: { type: Function, default: undefined },
};

export const useFileDownloadEmits = ['downloaded'];

export default (uploadCtx) => {
  const { props, emit } = getCurrentInstance();

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
  };
};

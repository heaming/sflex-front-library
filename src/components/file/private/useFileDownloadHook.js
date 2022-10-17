export const useFileDownloadHookProps = {
  onBeforeDownload: { type: Function, default: undefined },
};

export const useFileDownloadHookEmits = ['downloaded'];

export default (uploadCtx) => {
  const { props, emit } = getCurrentInstance();

  const downloadFileWithHook = computed(() => (props.onBeforeDownload ? async (file) => {
    const normalizedFile = uploadCtx.findUploading(file).file;
    const beforeHookResult = await props.onBeforeDownload(normalizedFile);
    if (beforeHookResult || beforeHookResult === undefined) {
      await uploadCtx.downloadFile(file);
      emit('downloaded', file);
    }
  } : uploadCtx.downloadFile));

  return {
    downloadFileWithHook,
  };
};

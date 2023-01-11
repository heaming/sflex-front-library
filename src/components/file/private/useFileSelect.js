export const useFileSelectProps = {
  selectable: { type: Boolean, default: false },
};

export default ({ files, updateFile, downloadFile, revertFile, removeFile, undeleteFile }, ables) => {
  const { props } = getCurrentInstance();

  const selectedFileIndexes = ref([]);

  const selectAll = computed({
    get: () => selectedFileIndexes.value.length === files.value?.length && selectedFileIndexes.value.length > 0,
    set(val) {
      if (val) {
        selectedFileIndexes.value = files.value ? files.value.map((f, idx) => idx) : [];
      } else {
        selectedFileIndexes.value = [];
      }
    },
  });

  const selectedFiles = computed(() => selectedFileIndexes.value.map((idx) => files.value?.[idx]));

  const clearSelected = () => {
    selectedFileIndexes.value = [];
  };

  const updateSelected = () => {
    if (!ables.value?.update) { return; }
    selectedFiles.value.forEach(updateFile);
    clearSelected();
  };

  const downloadSelected = () => {
    if (!ables.value?.download) { return; }
    selectedFiles.value.forEach(downloadFile);
    clearSelected();
  };

  const revertSelected = () => {
    if (!ables.value?.revert) { return; }
    selectedFiles.value.forEach(revertFile);
    clearSelected();
  };

  const removeSelected = () => {
    if (!ables.value?.remove) { return; }
    selectedFiles.value.forEach(removeFile);
    clearSelected();
  };

  const undeleteSelected = () => {
    if (!ables.value?.undelete) { return; }
    selectedFiles.value.forEach(undeleteFile);
    clearSelected();
  };

  const computedSelectable = computed(() => (props.multiple && props.selectable));

  return {
    computedSelectable,
    selectedFileIndexes,
    selectedFiles,
    selectAll,
    clearSelected,
    updateSelected,
    downloadSelected,
    revertSelected,
    removeSelected,
    undeleteSelected,
  };
};

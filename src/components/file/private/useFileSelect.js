export const useFileSelectProps = {
  selectable: { type: Boolean, default: false },
};

export default ({ files, updateFile, downloadFile, revertFile }) => {
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
    selectedFiles.value.forEach(updateFile);
  };

  const downloadSelected = () => {
    selectedFiles.value.forEach(downloadFile);
  };

  const revertSelected = () => {
    selectedFiles.value.forEach(revertFile);
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
  };
};

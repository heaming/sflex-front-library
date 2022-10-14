export const useFileSelectProps = {
  selectable: { type: Boolean, default: true },
};

export default ({ files, updateFile, downloadFile, removeFile }) => {
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

  const removeSelected = () => {
    selectedFiles.value.forEach(removeFile);
    clearSelected();
  };

  const computedSelectable = computed(() => props.multiple && props.selectable);

  return computed(() => (computedSelectable.value ? {
    selectable: computedSelectable.value,
    selectedFileIndexes,
    selectedFiles,
    selectAll,
    clearSelected,
    updateSelected,
    downloadSelected,
    removeSelected,
  } : {
    selectable: computedSelectable.value,
  }));
};

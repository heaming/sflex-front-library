import { intersection } from 'lodash-es';
import { generateFileLikeKey } from './useFileUpload';

export const useFileSelectProps = {
  selectable: { type: Boolean, default: true },
};

export default ({ files, updateFile, downloadFile, revertFile, removeFile, undeleteFile }, ables) => {
  const { props } = getCurrentInstance();

  const selectedFileKeys = ref([]);
  const fileKeys = computed(() => (files.value ? files.value.map((f) => generateFileLikeKey(f)) : []));
  watch(fileKeys, (newKeys) => {
    selectedFileKeys.value = intersection(selectedFileKeys.value, newKeys);
  });

  const selectAll = computed({
    get: () => selectedFileKeys.value.length === files.value?.length && selectedFileKeys.value.length > 0,
    set(val) {
      if (val) {
        selectedFileKeys.value = fileKeys.value;
      } else {
        selectedFileKeys.value = [];
      }
    },
  });

  const selectedFiles = computed(() => selectedFileKeys.value.map(
    (k) => files.value.find((f) => generateFileLikeKey(f) === k),
  ));

  const clearSelected = () => {
    selectedFileKeys.value = [];
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
    selectedFileKeys,
    fileKeys,
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

import { intersection } from 'lodash-es';
import { generateFileLikeKey } from './useFileUpload';
import { notify } from '../../../plugins/notify';

export const useFileSelectProps = {
  selectable: { type: Boolean, default: undefined },
};

export default ({ files, updateFile, downloadFile, revertFile, removeFile, undeleteFile }, ables) => {
  const { props } = getCurrentInstance();
  const { t } = useI18n();

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

  const empty = computed(() => !selectedFileKeys.value.length);

  const selectedFiles = computed(() => selectedFileKeys.value.map(
    (k) => files.value.find((f) => generateFileLikeKey(f) === k),
  ));

  const clearSelected = () => {
    selectedFileKeys.value = [];
  };

  const updateSelected = () => {
    if (empty.value) {
      notify(t('TODO', null, '선택된 파일이 없습니다.')); // FIXME: msg
    }
    if (!ables.value?.update) { return; }
    selectedFiles.value.forEach(updateFile);
    clearSelected();
  };

  const downloadSelected = () => {
    if (empty.value) {
      notify(t('TODO', null, '선택된 파일이 없습니다.')); // FIXME: msg
    }
    if (!ables.value?.download) { return; }
    selectedFiles.value.forEach(downloadFile);
    clearSelected();
  };

  const revertSelected = () => {
    if (empty.value) {
      notify(t('TODO', null, '선택된 파일이 없습니다.')); // FIXME: msg
    }
    if (!ables.value?.revert) { return; }
    selectedFiles.value.forEach(revertFile);
    clearSelected();
  };

  const removeSelected = () => {
    if (empty.value) {
      notify(t('TODO', null, '선택된 파일이 없습니다.')); // FIXME: msg
    }
    if (!ables.value?.remove) { return; }
    selectedFiles.value.forEach(removeFile);
    clearSelected();
  };

  const undeleteSelected = () => {
    if (empty.value) {
      notify(t('TODO', null, '선택된 파일이 없습니다.')); // FIXME: msg
    }
    if (!ables.value?.undelete) { return; }
    selectedFiles.value.forEach(undeleteFile);
    clearSelected();
  };

  const computedSelectable = computed(() => props.selectable ?? (props.multiple && ables.value.add));

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

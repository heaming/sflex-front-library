import { differenceBy, intersectionBy, isEqual } from 'lodash-es';
import { download, downloadBlob, upload } from '../../../utils/file';
import { platform } from '../../../plugins/platform';

const INSTANT_UPDATE_ALL = true;
const INSTANT_UPLOAD = 'upload';
const INSTANT_REMOVE = 'remove';
const INSTANT_UPDATE_NOTHING = false;

const UPLOADED = 'uploaded';
const REMOVED = 'removed';
const UPDATING = 'updating';
const UPLOAD = 'upload';
const REMOVE = 'remove';
const FAIL_TO_UPLOAD = 'fail-to-upload';
const FAIL_TO_REMOVE = 'fail-to-remove';
const ERROR = 'error';
const AVAILABLE_STATES = {
  [UPLOADED]: [REMOVE],
  [REMOVED]: [], // end states
  [REMOVE]: [UPDATING, UPLOADED],
  [UPDATING]: [UPLOADED, REMOVED, ERROR, FAIL_TO_UPLOAD, FAIL_TO_REMOVE],
  [UPLOAD]: [UPDATING, REMOVED],
  [FAIL_TO_REMOVE]: [REMOVE, UPLOADED],
  [FAIL_TO_UPLOAD]: [UPLOAD, REMOVED],
  [ERROR]: [REMOVED],
};

const IMAGE_EXTENSION = ['jpg', 'gif', 'bmp', 'png', 'jpeg'];

const privateKeyField = Symbol('FILE_LIKE_KEY');

export const generateFileLikeKey = (fileLike) => {
  if (Object.hasOwn(fileLike, privateKeyField)) { return fileLike[privateKeyField]; }
  const isNative = fileLike instanceof File;
  return (isNative
    ? fileLike.webkitRelativePath + (fileLike.lastModified || new Date().getTime()) + fileLike.name + fileLike.size
    : fileLike.serverFile?.fileUid || fileLike.serverFile?.serverFileName);
};

const removeDuplicate = (fileLikes) => {
  const keys = [];
  return fileLikes.reduce((zipped, fileLike) => {
    const checkKey = generateFileLikeKey(fileLike);
    if (!keys.includes(checkKey)) {
      keys.push(checkKey);
      zipped.push(fileLike);
    }
    return zipped;
  }, []);
};

const normalizeFileLike = (fileLike = {}) => {
  if (Object.hasOwn(fileLike, privateKeyField)) {
    return fileLike;
  }
  if (fileLike instanceof File) {
    return {
      name: fileLike.name,
      size: fileLike.size || 0,
      type: fileLike.type || 'application/octet-stream',
      lastModified: fileLike.lastModified || new Date().getTime(),
      dummy: false,
      nativeFile: fileLike,
      [privateKeyField]: generateFileLikeKey(fileLike),
      getKey() { return this[privateKeyField]; },
    };
  }
  return {
    ...fileLike,
    name: fileLike.name || '',
    size: fileLike.size || 0,
    type: fileLike.type || 'application/octet-stream',
    lastModified: fileLike.lastModified || new Date().getTime(),
    dummy: true,
    nativeFile: null,
    serverFile: fileLike.serverFile,
    targetPath: fileLike.targetPath,
    [privateKeyField]: generateFileLikeKey(fileLike),
    getKey() { return this[privateKeyField]; },
  };
};

const getInitialState = (fileLike) => (fileLike.dummy ? UPLOADED : UPLOAD);

function Uploading(fileLike, options) {
  const file = normalizeFileLike(fileLike);
  const targetPath = file.targetPath
    || options?.targetPath || 'temp'; // server root folder 를 결정한다.
  const targetedUpload = async () => {
    const { nativeFile } = file;
    // head up!!! it is not upload to targetPath! only to temp!
    return await upload(nativeFile, 'temp');
  };
  const targetedDownload = async () => {
    const { serverFile } = file;
    return await download(serverFile, targetPath);
  };
  const uploadFunction = options.upload ?? targetedUpload;
  const downloadFunction = options.download ?? targetedDownload;
  // head up!!! server remove process
  // SFLEX 에서는 그냥 새 목록을 보내면 backoffice 에서 없는 목록을 지워버리기 때문에 불필요.
  const removeFunction = options.remove ?? null;

  let state;

  let instanceUpdate = false;

  function setState(newState) {
    if (state) {
      state = AVAILABLE_STATES[state].includes(newState) ? newState : ERROR;
    } else {
      state = newState;
    }
  }

  async function update(evenFailed) {
    if (evenFailed) {
      if (state === FAIL_TO_REMOVE) {
        setState(REMOVE);
      }
      if (state === FAIL_TO_UPLOAD) {
        setState(UPLOAD);
      }
    }
    if (state === UPLOAD) {
      setState(UPDATING);
      try {
        file.serverFile = await uploadFunction(file);
        setState(UPLOADED);
      } catch (e) {
        setState(FAIL_TO_UPLOAD);
      }
    }

    if (state === REMOVE) {
      setState(UPDATING);

      if (removeFunction && typeof removeFunction === 'function') {
        try {
          await removeFunction(file);
          setState(REMOVED);
        } catch (e) {
          setState(FAIL_TO_UPLOAD);
        }
      }

      setState(REMOVED);
    }
  }

  async function setStateWithUpdate(newState) {
    setState(newState);
    if (state === UPLOAD
      && (instanceUpdate === INSTANT_UPLOAD || instanceUpdate === INSTANT_UPDATE_ALL)) {
      await update();
    }
    if (state === REMOVE
      && (instanceUpdate === INSTANT_REMOVE || instanceUpdate === INSTANT_UPDATE_ALL)) {
      await update();
    }
  }

  async function setInstanceUpdate(newInstanceUpdate) {
    const avaliable = [INSTANT_UPDATE_ALL, INSTANT_UPLOAD, INSTANT_REMOVE, INSTANT_UPDATE_NOTHING];
    if (!avaliable.includes(newInstanceUpdate)) {
      instanceUpdate = INSTANT_UPDATE_NOTHING;
      setState(ERROR);
      return;
    }
    instanceUpdate = newInstanceUpdate;
    if (state === UPLOAD
      && (instanceUpdate === INSTANT_UPLOAD || instanceUpdate === INSTANT_UPDATE_ALL)) {
      await update();
    }
    if (state === REMOVE
      && (instanceUpdate === INSTANT_REMOVE || instanceUpdate === INSTANT_UPDATE_ALL)) {
      await update();
    }
  }

  async function revert() {
    const stateChange = {
      [UPLOAD]: REMOVED,
      [UPLOADED]: REMOVE, // if instantUpdates, will be REMOVED when update success, else, FAIL_TO_REMOVE;
      [FAIL_TO_UPLOAD]: REMOVED,
      [REMOVE]: UPLOADED,
      [FAIL_TO_REMOVE]: UPLOADED,
    };
    if (stateChange[state]) {
      await setStateWithUpdate(stateChange[state]);
    } else {
      console.warn(`${state} file is can not revert.`);
    }
  }

  async function downloadFile() {
    if (state === UPLOADED) {
      try {
        await downloadFunction(file);
      } catch (e) {
        throw new Error('Fail To Download!');
      }
    } else if (state === UPLOAD && file.nativeFile) {
      downloadBlob(file.nativeFile, file.name);
    } else {
      throw new Error(`${state} file is can not download.`);
    }
  }

  setState(getInitialState(file));

  Object.defineProperty(this, 'file', { get: () => file });
  Object.defineProperty(this, 'state', { get: () => state, set: setStateWithUpdate });
  Object.defineProperty(this, 'update', { get: () => update });
  Object.defineProperty(this, 'retry', { get: () => (async () => { await update(true); }) });
  Object.defineProperty(this, 'revert', { get: () => revert });
  Object.defineProperty(this, 'download', { get: () => downloadFile });
  Object.defineProperty(this, 'instanceUpdate', { get: () => instanceUpdate, set: setInstanceUpdate });
  Object.defineProperty(this, 'setInstanceUpdate', { get: () => setInstanceUpdate });
}

async function generateUploading(file, options) {
  const uploading = new Uploading(file, options);
  if (options.instanceUpdate) {
    await uploading.setInstanceUpdate(options.instanceUpdate);
  }
  return uploading;
}

export const STATE = {
  UPLOADED,
  REMOVED,
  UPDATING,
  UPLOAD,
  REMOVE,
  ERROR,
  FAIL_TO_UPLOAD,
  FAIL_TO_REMOVE,
};

export default (values, options, ables, selectCtx) => {
  const { emit } = getCurrentInstance();
  const normalizedOptions = computed(() => ({
    instanceUpdate: unref(options).instanceUpdate,
    download: unref(options).download,
    upload: unref(options).upload,
    remove: unref(options).remove,
    targetPath: unref(options).targetPath,
  }));
  const uploadings = ref([]);

  function findUploading(file) {
    return uploadings
      .value
      .find((uploading) => uploading.file === file
        || uploading.file?.nativeFile === file
        || uploading.file[privateKeyField] === generateFileLikeKey(file));
  }

  async function syncUploadings(newFiles) {
    // console.log('syncUploadings', newFiles);
    let rawUploadings = unref(uploadings);
    newFiles = unref(newFiles).map(normalizeFileLike);
    const oldFiles = rawUploadings
      .map((uploading) => uploading.file);

    const restoreUploadings = rawUploadings
      .filter((uploading) => uploading.state === REMOVED)
      .filter((uploading) => newFiles.map((file) => file[privateKeyField]).includes(uploading.file[privateKeyField]));

    restoreUploadings.forEach((uploading) => {
      uploading.state = UPLOAD;
    });

    const removed = differenceBy(oldFiles, newFiles, privateKeyField);
    rawUploadings = rawUploadings
      .filter((uploading) => !removed.includes(uploading.file));

    const updatePromises = [];
    const updated = intersectionBy(oldFiles, newFiles, privateKeyField);
    rawUploadings
      .filter((uploading) => updated.includes(uploading.file))
      .forEach((uploading) => {
        if (uploading.instanceUpdate !== normalizedOptions.value.instanceUpdate) {
          updatePromises.push(uploading.setInstanceUpdate(normalizedOptions.value.instanceUpdate));
        }
      });

    const added = differenceBy(newFiles, oldFiles, privateKeyField);

    const addedPromises = [];
    added.forEach((file) => {
      addedPromises.push(generateUploading(file, normalizedOptions.value));
    });

    await Promise.all(updatePromises);
    const newUploadings = await Promise.all(addedPromises);
    rawUploadings.push(...newUploadings);

    uploadings.value = rawUploadings;
    values.value = rawUploadings
      .filter((uploading) => {
        if (platform.is.mobile) {
          return uploading.state !== REMOVED && uploading.state !== FAIL_TO_UPLOAD;
        }
        return uploading.state !== REMOVED;
      })
      .map((uploading) => (uploading.file));
  }

  const fileLikes = customRef((track, trigger) => ({
    get() {
      track();
      return uploadings.value
        .filter((uploading) => {
          if (platform.is.mobile) {
            return uploading.state !== REMOVED && uploading.state !== FAIL_TO_UPLOAD;
          }
          return uploading.state !== REMOVED;
        })
        .map((uploading) => (uploading.file.dummy ? uploading.file : uploading.file.nativeFile));
    },
    async set(newFiles) {
      // console.log('fileLikes_set', unref(newFiles));
      if (values.value !== newFiles) {
        await syncUploadings(newFiles);
      }
      trigger();
    },
  }));

  function updateFileExceptInternal(origin, update) {
    const newFileKeys = Reflect.ownKeys(update);
    const ignoreUpdateKeys = [privateKeyField, 'name', 'size', 'type', 'lastModified', 'dummy', 'nativeFile', 'serverFile', 'getKey'];
    newFileKeys
      .filter((k) => !ignoreUpdateKeys.includes(k))
      .forEach((k) => {
        if (!isEqual(origin[k], update[k])) {
          origin[k] = update[k];
        }
      });
  }

  function checkAndUpdateFilesChanged(nfs, ofs) {
    let changed = false;

    if (nfs.length !== ofs.length) {
      changed = true;
    }

    const ofKeys = ofs.map(generateFileLikeKey);

    for (let i = 0; i < nfs.length; i += 1) {
      const newFile = nfs[i];
      const newFileLikeKey = generateFileLikeKey(newFile);
      const existingIdx = ofKeys.indexOf(newFileLikeKey);
      if (existingIdx === -1) {
        changed = true;
      }

      const oldFile = ofs[existingIdx];
      if (oldFile) { updateFileExceptInternal(oldFile, newFile); }
    }

    return changed;
  }

  watch(values, (newFiles) => {
    const oldFiles = unref(uploadings)
      .map((uploading) => uploading.file);

    const normalizedNewFiles = removeDuplicate(newFiles.map(normalizeFileLike));

    if (checkAndUpdateFilesChanged(normalizedNewFiles, oldFiles)) {
      fileLikes.value = normalizedNewFiles;
    }
  }, { deep: true, immediate: true });

  watch(normalizedOptions, async () => {
    await syncUploadings(fileLikes.value);
  });

  function isUpdatable(file) {
    if (!ables.value.update) { return false; }
    const uploading = file instanceof Uploading ? file : findUploading(file);
    return [STATE.UPLOAD, STATE.REMOVE].includes(uploading?.state);
  }

  function isUpdating(file) {
    if (!ables.value.update) { return false; }
    const uploading = file instanceof Uploading ? file : findUploading(file);
    return STATE.UPDATING === uploading?.state;
  }

  async function updateFile(file) {
    if (!ables.value.update) { return; }
    const uploading = file instanceof Uploading ? file : findUploading(file);
    await uploading.update();
    if (uploading.state === REMOVED) {
      fileLikes.value = fileLikes.value.filter((f) => f !== file);
    }
    await syncUploadings(fileLikes.value);
  }

  async function updateAll(evenFailed = false) {
    if (!ables.value.update) { return; }
    const updatings = uploadings.value.map((uploading) => uploading.update(evenFailed));
    await Promise.all(updatings);
    await syncUploadings(fileLikes.value);
    if (selectCtx?.clearSelected) { selectCtx.clearSelected(); }
  }

  function isRetryPossible(file) {
    if (!ables.value.retry) { return false; }
    const uploading = file instanceof Uploading ? file : findUploading(file);
    return [STATE.FAIL_TO_UPLOAD, STATE.FAIL_TO_REMOVE].includes(uploading?.state);
  }

  async function retryUpdateFile(file) {
    if (!ables.value.retry) { return; }
    const uploading = file instanceof Uploading ? file : findUploading(file);
    await uploading.retry();
    if (uploading.state === REMOVED) {
      fileLikes.value = fileLikes.value.filter((f) => f !== file);
    }
  }

  function isReversible(file) {
    if (!ables.value.revert) { return false; }
    const uploading = file instanceof Uploading ? file : findUploading(file);
    return [STATE.UPLOAD, STATE.UPLOADED, STATE.REMOVE, STATE.FAIL_TO_UPLOAD, STATE.FAIL_TO_REMOVE]
      .includes(uploading?.state);
  }

  async function revertFile(file, forced = false) {
    if (!ables.value.revert) { return; }
    const uploading = file instanceof Uploading ? file : findUploading(file);
    await uploading.revert();
    if (!uploading.instanceUpdate && forced) { await uploading.update(); } // Since, revert resolve fail state.
    if (uploading.state === REMOVED) {
      fileLikes.value = fileLikes.value.filter((f) => f !== file);
    }
    await syncUploadings(fileLikes.value);
  }

  async function revertAll(forced = false) {
    if (!ables.value.revert) { return; }
    const removing = uploadings.value.map((uploading) => uploading.revert());
    await Promise.all(removing);
    if (forced) { await updateAll(); }
    await syncUploadings(fileLikes.value);
    if (selectCtx?.clearSelected) { selectCtx.clearSelected(); }
  }

  async function revertFileAtFileUidMode(file) {
    const { attachFile } = file;
    // attachFile 이 있다는것은 실제 서버에 저장된 파일이라는것을 의미한다.
    if (attachFile) {
      emit('update:deleted-file-uid', attachFile.fileUid);
    }
    revertFile(file);
  }

  function isRemovable(file) {
    if (!ables.value.remove) { return false; }
    const uploading = file instanceof Uploading ? file : findUploading(file);
    return [STATE.UPLOAD, STATE.UPLOADED, STATE.FAIL_TO_UPLOAD]
      .includes(uploading?.state);
  }

  async function removeFile(file, forced = false) {
    if (!isRemovable(file)) { return; }
    return await revertFile(file, forced);
  }

  async function removeAll(forced = false) {
    if (!ables.value.remove) { return; }
    const removing = uploadings.value
      .filter(isRemovable)
      .map((uploading) => uploading.revert());
    await Promise.all(removing);
    if (forced) { await updateAll(); }
    await syncUploadings(fileLikes.value);
    if (selectCtx?.clearSelected) { selectCtx.clearSelected(); }
  }

  function isUndeletePossible(file) {
    if (!ables.value.undelete) { return false; }
    const uploading = file instanceof Uploading ? file : findUploading(file);
    return [STATE.REMOVE, STATE.FAIL_TO_REMOVE]
      .includes(uploading?.state);
  }

  async function undeleteFile(file, forced = false) {
    if (!isUndeletePossible(file)) { return; }
    return await revertFile(file, forced);
  }

  async function undeleteAll(forced = false) {
    if (!ables.value.undelete) { return; }
    const removing = uploadings.value
      .filter(isUndeletePossible)
      .map((uploading) => uploading.revert());
    await Promise.all(removing);
    if (forced) { await updateAll(); }
    await syncUploadings(fileLikes.value);
    if (selectCtx?.clearSelected) { selectCtx.clearSelected(); }
  }

  function isDownloadable(file) {
    if (!ables.value.download) { return false; }
    const uploading = file instanceof Uploading ? file : findUploading(file);
    return [STATE.UPLOAD, STATE.UPLOADED].includes(uploading?.state);
  }

  async function downloadFile(file) {
    if (!ables.value.download) { return; }
    const uploading = file instanceof Uploading ? file : findUploading(file);
    await uploading.download();
  }

  async function downloadAll(onlyUploaded) {
    if (!ables.value.download) { return; }
    uploadings.value
      .filter((uploading) => (onlyUploaded === true ? uploading.state === UPLOADED : isDownloadable(uploading)))
      .forEach((uploading) => uploading.download());
  }

  function getUploadedFiles() {
    return uploadings
      .value
      .filter((uploading) => uploading.state === UPLOADED)
      .map((uploading) => uploading.file);
  }

  function isPreviewable(file) {
    if (!ables.value.preview) { return false; }
    const uploading = file instanceof Uploading ? file : findUploading(file);
    return [STATE.UPLOAD, STATE.UPLOADED].includes(uploading?.state)
        && (IMAGE_EXTENSION.includes(file?.attachFile?.fileExtensionName.toLowerCase()) || file?.type?.startsWith('image'));
  }

  return {
    files: fileLikes,
    uploadings,
    findUploading,
    isUpdatable,
    updateFile,
    updateAll,
    revertFileAtFileUidMode,
    isReversible,
    revertFile,
    revertAll,
    isRemovable,
    removeFile,
    removeAll,
    isUndeletePossible,
    undeleteFile,
    undeleteAll,
    isDownloadable,
    downloadFile,
    downloadAll,
    isRetryPossible,
    retryUpdateFile,
    getUploadedFiles,
    isUpdating,
    isPreviewable,
  };
};

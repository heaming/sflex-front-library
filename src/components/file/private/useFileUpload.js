import { differenceBy, isEqual } from 'lodash-es';
import { download, downloadBlob, upload } from '../../../utils/file';

const INSTANT_UPDATE_ALL = true;
const INSTANT_UPLOAD = 'upload';
const INSTANT_REMOVE = 'remove';
const INSTANT_UPDATE_NOTHING = false;

const UPLOADED = 'uploaded';
const REMOVED = 'removed';
const UPDATING = 'updating';
const UPLOAD = 'upload';
const REMOVE = 'remove';
const FAIL_TO_UPLOAD = 'failToUpload';
const FAIL_TO_REMOVE = 'failToRemove';
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

const key = Symbol('key value for uploading.');

const generateFileLikeKey = (fileLike) => {
  // const isNative = isProxy(fileLike) ? fileLike.target instanceof File : fileLike instanceof File;
  if (Object.hasOwn(fileLike, key)) { return fileLike[key]; }
  const isNative = fileLike instanceof File;
  return (isNative
    ? fileLike.webkitRelativePath + (fileLike.lastModified || new Date().getTime()) + fileLike.name + fileLike.size
    : fileLike.fileUid || fileLike.serverFileName);
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
  if (Object.hasOwn(fileLike, key)) {
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
      [key]: generateFileLikeKey(fileLike),
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
    targetPath: fileLike.targetPath,
    serverFileName: fileLike.serverFileName,
    fileUid: fileLike.fileUid,
    myFileYn: fileLike.myFileYn,
    [key]: generateFileLikeKey(fileLike),
  };
};

const getInitialState = (fileLike) => (fileLike.dummy ? UPLOADED : UPLOAD);

function Uploading(fileLike, options) {
  const file = normalizeFileLike(fileLike);

  let state;

  let instanceUpdate;

  function setState(newState) {
    if (state) {
      state = AVAILABLE_STATES[state].includes(newState) ? newState : ERROR;
    } else {
      state = newState;
    }
  }

  function setInstanceUpdate(newInstanceUpdate) {
    const avaliable = [INSTANT_UPDATE_ALL, INSTANT_UPLOAD, INSTANT_REMOVE, INSTANT_UPDATE_NOTHING];
    if (!avaliable.includes(newInstanceUpdate)) {
      instanceUpdate = INSTANT_UPDATE_NOTHING;
      setState(ERROR);
      return;
    }
    instanceUpdate = newInstanceUpdate;
  }

  const targetPath = file.targetPath
    || options?.targetPath || 'temp'; // server root folder 를 결정한다.

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
        // head up!!! it is not upload to targetPath! only to temp!
        const uploadResult = await upload(file.nativeFile, 'temp');
        file.serverFileName = uploadResult.serverFileName;
        // head up!!! originalFileName same with name! FileLike only use name Field
        // file.originalFileName = uploadResult.originalFileName;
        file.fileUid = uploadResult.fileUid;
        file.myFileYn = uploadResult.myFileYn;
        setState(UPLOADED);
      } catch (e) {
        setState(FAIL_TO_UPLOAD);
      }
    }

    if (state === REMOVE) {
      setState(UPDATING);

      // head up!!! server remove process
      // SFLEX 에서는 그냥 새 목록을 보내면 backoffice 에서 없는 목록을 지워버리기 때문에 불필요.

      // if (targetPath === 'storage') {
      //   await sflexDelete(file);
      // }

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
      await download(file, targetPath);
    } else if (state === UPLOAD) {
      downloadBlob(file.nativeFile, file.name);
    } else {
      throw new Error(`${state} file is can not download.`);
    }
  }

  setInstanceUpdate(options.instanceUpdate);

  setStateWithUpdate(getInitialState(file));

  Object.defineProperty(this, 'file', { get: () => file });
  Object.defineProperty(this, 'state', { get: () => state, set: setStateWithUpdate });
  Object.defineProperty(this, 'update', { get: () => update });
  Object.defineProperty(this, 'retry', { get: () => (() => { update(true); }) });
  Object.defineProperty(this, 'revert', { get: () => revert });
  Object.defineProperty(this, 'download', { get: () => downloadFile });
  Object.defineProperty(this, 'instanceUpdate', { get: () => instanceUpdate, set: setInstanceUpdate });
}

async function generateReactiveUploading(file, options) {
  return reactive(new Uploading(file, options));
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

export const useSingleFileUpload = (value, options) => {
  const normalizedOptions = options || {};

  const uploading = ref({});
  watch(value, async (newFile) => {
    uploading.value = await generateReactiveUploading(newFile, normalizedOptions.value);
  }, { immediate: true });

  return uploading;
};

export default (values, options) => {
  const normalizedOptions = ref(options || {});
  const uploadings = ref([]);

  function findUploading(file) {
    return uploadings
      .value
      .find((uploading) => uploading.file[key] === generateFileLikeKey(file));
  }

  async function syncUploadings(newFiles) {
    // console.log('syncUploadings', newFiles);
    let rawUploadings = unref(uploadings);
    newFiles = unref(newFiles).map(normalizeFileLike);
    const oldFiles = rawUploadings
      .map((uploading) => uploading.file);

    const restoreUploadings = rawUploadings
      .filter((uploading) => uploading.state === REMOVED)
      .filter((uploading) => newFiles.map((file) => file[key]).includes(uploading.file[key]));

    restoreUploadings.forEach((uploading) => {
      uploading.state = UPLOAD;
    });

    const removed = differenceBy(oldFiles, newFiles, key);
    rawUploadings = rawUploadings
      .filter((uploading) => !removed.includes(uploading.file));

    const added = differenceBy(newFiles, oldFiles, key);
    const generateUploadings = [];
    added.forEach((file) => {
      generateUploadings.push(generateReactiveUploading(file, normalizedOptions.value));
    });

    const newUploadings = await Promise.all(generateUploadings);
    rawUploadings.push(...newUploadings);

    uploadings.value = rawUploadings;
  }

  const fileLikes = customRef((track, trigger) => ({
    get() {
      track();
      return uploadings.value
        .filter((uploading) => uploading.state !== REMOVED)
        .map((uploading) => (uploading.file.dummy ? uploading.file : uploading.file.nativeFile));
      // return removeDuplicate(unref(values));
    },
    async set(newFiles) {
      // console.log('fileLikes_set', unref(newFiles));
      await syncUploadings(newFiles);
      if (values.value !== newFiles && !isReadonly(values)) {
        values.value = normalizedOptions.value.bindNativeFile ? newFiles
          : newFiles.map((file) => findUploading(file).file);
      }
      trigger();
    },
  }));

  function updateFileExceptInternal(origin, update) {
    const newFileKeys = Reflect.ownKeys(update);
    const ignoreUpdateKeys = [key, 'name', 'size', 'type', 'lastModified', 'dummy', 'nativeFile', 'serverFileName', 'fileUid'];
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
      fileLikes.value = removeDuplicate(newFiles);
    }
  }, { deep: true, immediate: true });

  function isUpdatable(file) {
    const uploading = file instanceof Uploading ? file : findUploading(file);
    return [STATE.UPLOAD, STATE.REMOVE].includes(uploading?.state);
  }

  async function updateFile(file) {
    const uploading = file instanceof Uploading ? file : findUploading(file);
    await uploading.update();
    if (uploading.state === REMOVED) {
      fileLikes.value = fileLikes.value.filter((f) => f !== file);
    }
    await syncUploadings(fileLikes.value);
  }

  async function updateAll(evenFailed = false) {
    const updatings = uploadings.value.map((uploading) => uploading.update(evenFailed));
    await Promise.all(updatings);
    await syncUploadings(fileLikes.value);
  }

  function isRetryPossible(file) {
    const uploading = file instanceof Uploading ? file : findUploading(file);
    return [STATE.FAIL_TO_UPLOAD, STATE.FAIL_TO_REMOVE].includes(uploading?.state);
  }

  async function retryUpdateFile(file) {
    const uploading = file instanceof Uploading ? file : findUploading(file);
    await uploading.retry();
    if (uploading.state === REMOVED) {
      fileLikes.value = fileLikes.value.filter((f) => f !== file);
    }
  }

  function isReversible(file) {
    const uploading = file instanceof Uploading ? file : findUploading(file);
    return [STATE.UPLOAD, STATE.UPLOADED, STATE.REMOVE, STATE.FAIL_TO_UPLOAD, STATE.FAIL_TO_REMOVE]
      .includes(uploading?.state);
  }

  async function revertFile(file, forced = false) {
    const uploading = file instanceof Uploading ? file : findUploading(file);
    await uploading.revert();
    if (!uploading.instanceUpdate && forced) { await uploading.update(); } // Since, revert resolve fail state.
    if (uploading.state === REMOVED) {
      fileLikes.value = fileLikes.value.filter((f) => f !== file);
    }
    await syncUploadings(fileLikes.value);
  }

  async function revertAll(forced = false) {
    const removing = uploadings.value.map((uploading) => uploading.revert());
    await Promise.all(removing);
    if (forced) { await updateAll(); }
    await syncUploadings(fileLikes.value);
  }

  function isDownloadable(file) {
    const uploading = file instanceof Uploading ? file : findUploading(file);
    return [STATE.UPLOAD, STATE.UPLOADED].includes(uploading?.state);
  }

  async function downloadFile(file) {
    const uploading = file instanceof Uploading ? file : findUploading(file);
    await uploading.download();
  }

  async function downloadAll(onlyUploaded) {
    uploadings.value
      .filter((uploading) => (onlyUploaded ? uploading.state === UPLOADED : isDownloadable(uploading)))
      .forEach((uploading) => uploading.download());
  }

  function getUploadedFiles() {
    return uploadings
      .value
      .filter((uploading) => uploading.state === UPLOADED)
      .map((uploading) => uploading.file);
  }

  return {
    files: fileLikes,
    uploadings,
    findUploading,
    isUpdatable,
    updateFile,
    updateAll,
    isReversible,
    revertFile,
    revertAll,
    isDownloadable,
    downloadFile,
    downloadAll,
    isRetryPossible,
    retryUpdateFile,
    getUploadedFiles,
  };
};

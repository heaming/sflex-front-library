import { differenceBy } from 'lodash-es';
import { download, downloadBlob, upload } from '../../utils/file';

const UPLOADED = 'uploaded';
const REMOVED = 'removed';
const UPDATING = 'updating';
const UPLOAD = 'upload';
const REMOVE = 'remove';
const ERROR = 'error';
const AVAILABLE_STATES = {
  [UPLOADED]: [REMOVE],
  [REMOVE]: [UPDATING, UPLOADED],
  [UPDATING]: [UPLOADED, REMOVED, ERROR],
  [UPLOAD]: [UPDATING, REMOVED],
  [REMOVED]: [UPLOAD],
  [ERROR]: [UPLOAD],
};

const generateFileLikeKey = (fileLike) => (fileLike instanceof File
  ? fileLike.name + (fileLike.lastModified || new Date().getTime())
  : fileLike.key || fileLike.fileUid || fileLike.serverFileName);

const removeDuplicate = (fileLikes) => {
  const keys = [];
  return fileLikes.reduce((zipped, fileLike) => {
    const key = generateFileLikeKey(fileLike);
    if (!keys.includes(key)) {
      keys.push(key);
      zipped.push(fileLike);
    }
    return zipped;
  }, []);
};

const normalizeFileLike = (fileLike = {}) => {
  if (typeof fileLike.dummy === 'boolean') {
    return fileLike;
  }
  if (fileLike instanceof File) {
    return {
      name: fileLike.name,
      size: fileLike.size || 0,
      type: fileLike.type || 'application/octet-stream',
      lastModified: fileLike.lastModified || new Date().getTime(),
      dummy: false,
      file: fileLike,
      key: generateFileLikeKey(fileLike),
    };
  }
  return {
    name: fileLike.name,
    size: fileLike.size || 0,
    type: fileLike.type || 'application/octet-stream',
    lastModified: fileLike.lastModified || new Date().getTime(),
    dummy: true,
    file: null,
    targetPath: fileLike.targetPath,
    serverFileName: fileLike.serverFileName,
    fileUid: fileLike.fileUid,
    myFileYn: fileLike.myFileYn,
    key: generateFileLikeKey(fileLike),
    ...fileLike,
  };
};

const getInitialState = (fileLike) => (fileLike.dummy ? UPLOADED : UPLOAD);

function Uploading(fileLike, options) {
  const file = normalizeFileLike(fileLike);

  let state = getInitialState(file);

  function setState(newState) {
    state = AVAILABLE_STATES[state].includes(newState) ? newState : ERROR;
  }

  const targetPath = file.targetPath
    || options?.targetPath || 'temp'; // server root folder 를 결정한다.

  async function update() {
    if (state === UPLOAD) {
      setState(UPDATING);
      // head up!!! it is not upload to targetPath! only to temp!
      const uploadResult = await upload(file.file, 'temp');
      file.serverFileName = uploadResult.serverFileName;
      // head up!!! originalFileName same with name! FileLike only use name Field
      // file.originalFileName = uploadResult.originalFileName;
      file.fileUid = uploadResult.fileUid;
      file.myFileYn = uploadResult.myFileYn;
      setState(UPLOADED);
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

  async function remove() {
    if (state === UPLOAD) {
      setState(REMOVED);
    } else if (state === UPLOADED) {
      setState(REMOVE);
    } else {
      // console.warn(`${state} file is can not removed.`);
    }
    if (options.instanceUpdate) {
      await update();
    }
  }

  async function downloadFile() {
    if (state === UPLOADED) {
      await download(file, targetPath);
    } else if (state === UPLOAD) {
      downloadBlob(file.file, file.name);
    } else {
      // console.warn(`${state} file is can not download.`);
    }
  }

  Object.defineProperty(this, 'file', { get: () => file });
  Object.defineProperty(this, 'state', { get: () => state, set: setState });
  Object.defineProperty(this, 'update', { get: () => update });
  Object.defineProperty(this, 'remove', { get: () => remove });
  Object.defineProperty(this, 'download', { get: () => downloadFile });
}

async function generateUploading(file, options) {
  const newUploading = reactive(new Uploading(file, options));
  if (options.instanceUpdate) {
    await newUploading.update();
  }
  return newUploading;
}

export const STATE = {
  UPLOADED,
  REMOVED,
  UPDATING,
  UPLOAD,
  REMOVE,
  ERROR,
};

export const useFileUpload = (value, options) => {
  const normalizedOptions = options || {};

  const uploading = ref({});
  watch(value, async (newFile) => {
    uploading.value = await generateUploading(newFile, normalizedOptions);
  }, { immediate: true });

  return uploading;
};

export const useMultiFileUpload = (values, options) => {
  const normalizedOptions = options || {};
  const uploadings = ref([]);

  function findUploading(file) {
    return uploadings
      .value
      .find((uploading) => uploading.file.key === generateFileLikeKey(file));
  }

  async function syncUploadings(newFiles) {
    // console.log('syncUploadings', newFiles);
    let rawUploadings = unref(uploadings);
    newFiles = unref(newFiles).map(normalizeFileLike);
    const oldFiles = rawUploadings
      .map((uploading) => uploading.file);

    const restoreUploadings = rawUploadings
      .filter((uploading) => uploading.state === REMOVED)
      .filter((uploading) => newFiles.map((file) => file.key).includes(uploading.file.key));

    restoreUploadings.forEach((uploading) => {
      uploading.state = UPLOAD;
    });

    const removed = differenceBy(oldFiles, newFiles, 'key');
    rawUploadings = rawUploadings
      .filter((uploading) => !removed.includes(uploading.file));

    const added = differenceBy(newFiles, oldFiles, 'key');
    const generateUploadings = [];
    added.forEach((file) => {
      generateUploadings.push(generateUploading(file, normalizedOptions));
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
        .map((uploading) => (uploading.state === UPLOADED
          ? uploading.file
          : uploading.file.file || uploading.file));
      // return removeDuplicate(unref(values));
    },
    async set(newFiles) {
      // console.log('fileLikes_set', newFiles);
      await syncUploadings(newFiles);
      if (values.value !== newFiles && !isReadonly(values)) {
        // console.log(values);
        // console.log(values.value);
        // console.log(isReadonly(values.value));
        // console.log(values.value.value);
        values.value = newFiles;
      }
      trigger();
    },
  }));

  function isFilesChanged(nfs, ofs) {
    if (nfs.length !== ofs.length) {
      return true;
    }
    for (let i = 0; i < nfs.length; i += 1) {
      if (generateFileLikeKey(nfs[i]) !== generateFileLikeKey(ofs[i])) {
        return true;
      }
    }
    return false;
  }

  watch(values, (newFiles) => {
    const oldFiles = unref(uploadings)
      .map((uploading) => uploading.file);
    // console.log('watch_values', newFiles, oldFiles);

    if (isFilesChanged(newFiles, oldFiles)) {
      fileLikes.value = removeDuplicate(newFiles);
    }
  }, { deep: true });

  async function removeFile(file) {
    const uploading = findUploading(file);
    await uploading.remove();
    if (uploading.state === REMOVED) {
      fileLikes.value = fileLikes.value.filter((f) => f !== file);
    }
  }

  async function updateFile(file) {
    const uploading = findUploading(file);
    await uploading.update();
    if (uploading.state === REMOVED) {
      fileLikes.value = fileLikes.value.filter((f) => f !== file);
    }
    await syncUploadings(fileLikes.value);
  }

  async function downloadFile(file) {
    const uploading = findUploading(file);
    uploading.download();
  }

  async function push() {
    const updatings = uploadings.value.map((uploading) => uploading.update());
    await Promise.all(updatings);
    await syncUploadings(fileLikes.value);
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
    push,
    updateFile,
    findUploading,
    removeFile,
    downloadFile,
    getUploadedFiles,
  };
};

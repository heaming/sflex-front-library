import { mapKeys } from 'lodash-es';
import { http } from '../plugins/http';

const targetPaths = ['temp', 'storage', 'export'];

export function downloadBlob(blob, fileName) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName);
  } else {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.target = '_blank';
    if (fileName) link.download = fileName;
    link.click();
  }
}

export async function convertBlobToFile(blob, fileName) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const arrayBuffer = fileReader.result;
      const file = new File([arrayBuffer], fileName, { type: blob.type });
      resolve(file);
    };
    fileReader.onerror = () => {
      reject(new Error('Error occurred while converting Blob to File'));
    };
    fileReader.readAsArrayBuffer(blob);
  });
}

const normalizeUploadResponse = (info) => ({
  ...info,
  serverFileName: info?.serverFileName,
  originalFileName: info?.originalFileName,
  size: info?.size,
  fileType: info?.fileType,
});

const normalizeDownloadRequest = (info) => ({
  ...info,
  fileUid: info?.fileUid,
  originalFileName: info?.originalFileName,
  serverFileName: info?.serverFileName,
  myFileYn: info?.myFileYn,
});

function throwIfIsInvalidTargetPath(targetPath) {
  if (!targetPaths.includes(targetPath)) {
    throw new Error(`invalid targetPath, ${targetPath}`);
  }
}

export async function upload(file, targetPath = targetPaths[0]) {
  throwIfIsInvalidTargetPath(targetPath);

  const formData = new FormData();
  formData.append('file', file);

  const response = await http.post(`/sflex/common/common/file/${targetPath}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return normalizeUploadResponse(response.data);
}

export async function getImageSrcFromFile(fileUid) {
  const params = normalizeDownloadRequest({ fileUid });

  const response = await http.get('/sflex/common/common/file/storage/download', {
    params,
    responseType: 'blob',
  });
  const imageBlob = new Blob([response.data], { type: 'image/png' });
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = (ev) => {
      resolve(ev.target.result);
    };
    reader.readAsDataURL(imageBlob);
  });
}

export async function getImageSrcFromNativeFile(nativeFile) {
  const reader = new FileReader();

  return new Promise((resolve) => {
    reader.onload = (ev) => {
      resolve(ev.target.result);
    };
    reader.readAsDataURL(nativeFile);
  });
}

export async function download(fileInfo, targetPath = targetPaths[0]) {
  throwIfIsInvalidTargetPath(targetPath);
  const params = normalizeDownloadRequest(fileInfo);

  const response = await http.get(`/sflex/common/common/file/${targetPath}/download`, {
    params,
    responseType: 'blob',
  });

  downloadBlob(response.data, params.originalFileName);
}

export async function readExcel(file, columns = [], header = 1) {
  const [, extension] = file.name.match(/\.(\w+)$/) || [];

  if (!extension) {
    throw new Error('invalid file format.');
  }

  const acceptExtensions = ['xlsx', 'xls'];
  const isForbidden = !acceptExtensions.includes(extension);

  if (isForbidden) {
    throw new Error(`${extension} is a forbidden extension.`);
  }

  const response = await http.post('/sflex/common/common/excel-read', { file }, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return (response.data || [])
    .splice(header)
    .map((e) => mapKeys(e, (v, k) => columns[k] || k));
}

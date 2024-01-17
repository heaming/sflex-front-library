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

export async function getImageSrcFromFile(fileUid, silent = false) {
  const params = normalizeDownloadRequest({ fileUid });
  let isError = false;
  const response = await http.get('/sflex/common/common/file/storage/download', {
    params,
    responseType: 'blob',
    silent,
  }).catch(() => {
    isError = true;
  });

  if (isError) return false;

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

/* eslint-disable default-param-last */
export async function download(fileInfo, targetPath = targetPaths[0], file) {
  throwIfIsInvalidTargetPath(targetPath);
  const params = normalizeDownloadRequest(fileInfo);
  if (params.fileUid) {
    const response = await http.get(`/sflex/common/common/file/${targetPath}/download`, {
      params,
      responseType: 'blob',
    });

    downloadBlob(response.data, fileInfo?.fileName ?? params.originalFileName);
  } else if (file?.nativeFile) {
    // fileUid가 없는, 업로드된 파일도 다운로드
    const fileToBlob = new Blob([file?.nativeFile]);
    downloadBlob(fileToBlob, fileInfo?.fileName ?? fileInfo.originalFileName);
  }
}
/* eslint-enable default-param-last */

export async function downloadAll(files, targetPath = targetPaths[0]) {
  throwIfIsInvalidTargetPath(targetPath);

  const attachFiles = files.filter((x) => x.attachFile?.fileUid)
    .map((file) => normalizeDownloadRequest(file.serverFile));

  const uploadedFiles = files.filter((x) => !x.attachFile?.fileUid);

  const response = await http.post(`/sflex/common/common/file/${targetPath}/download-all`, attachFiles, {
    responseType: 'blob',
  });

  if (uploadedFiles.length <= 0) {
    const fileName = `${attachFiles[0].originalFileName}.zip`;
    downloadBlob(response.data, fileName);
    return;
  }

  // 만약 fileUid가 없는, 업로드된 파일이 있다면
  // 이미 다운받은 파일들로 이루어진 압축 파일을 풀어서
  // 거기에 파일을 추가한다.
  const extractZip = new window.JSZip();

  const blobToFile = new File([response.data], 'file.zip');
  await extractZip.loadAsync(blobToFile);

  uploadedFiles.forEach((x) => {
    extractZip.file(x.name, x);
  });

  const fileName = attachFiles[0]?.originalFileName ?? uploadedFiles?.[0].name;
  extractZip.generateAsync({ type: 'blob' }).then((res) => {
    downloadBlob(res, `${fileName}.zip`);
  });
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

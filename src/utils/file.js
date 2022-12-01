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

  return response.data;
}

export async function download(fileInfo, targetPath = targetPaths[0]) {
  throwIfIsInvalidTargetPath(targetPath);

  const response = await http.get(`/sflex/common/common/file/${targetPath}/download`, {
    params: fileInfo,
    responseType: 'blob',
  });

  downloadBlob(response.data, fileInfo.name);
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
    .map((e) => mapKeys(e, (v) => columns[v] || v));
}

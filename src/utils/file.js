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

  const response = await http.post(`/api/v1/common/file/${targetPath}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    responseType: 'blob',
  });

  return response.data;
}

export async function download(fileInfo, targetPath = targetPaths[0]) {
  throwIfIsInvalidTargetPath(targetPath);

  const response = await http.get(`/api/v1/common/file/${targetPath}/download`, {
    params: fileInfo,
    responseType: 'blob',
  });

  downloadBlob(response.data, fileInfo.name);
}

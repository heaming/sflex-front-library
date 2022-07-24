import { http } from '../plugins/http';

const TARGET_PATH_TEMP = 'temp';
const TARGET_PATH_STORAGE = 'storage';
const TARGET_PATH_EXPORT = 'export';

// 임시 에러 처리
const errorHandling = async (response) => {
  let { data } = response;
  if (data instanceof Blob) {
    data = await data.text();
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (e) {
      return;
    }
    if (jsonData.errorMessage) {
      throw new Error(jsonData.errorMessage);
    }
  }
  const errorMessage = data instanceof Blob
    ? JSON.parse(await data.text()).errorMessage
    : data?.errorMessage;
  if (errorMessage) {
    throw new Error(errorMessage);
  }
};

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

function checkTargetPath(targetPath) {
  if (TARGET_PATH_TEMP === targetPath
    || TARGET_PATH_STORAGE === targetPath
    || TARGET_PATH_EXPORT === targetPath
  ) { return; }
  throw new Error('TargetPath');
}

export async function upload(file, targetPath = TARGET_PATH_TEMP) {
  checkTargetPath(targetPath);
  const formData = new FormData();
  formData.append('file', file);
  const response = await http.post(`/api/v1/common/file/${targetPath}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  await errorHandling(response);
  return response.data;
}

export async function download(fileInfo, targetPath = TARGET_PATH_TEMP) {
  checkTargetPath(targetPath);
  const response = await http.get(`/api/v1/common/file/${targetPath}/download`, {
    responseType: 'blob',
    params: fileInfo,
  });

  await errorHandling(response);
  downloadBlob(response.data, fileInfo.name);
}

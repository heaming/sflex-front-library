import consts from '../consts';
import { PageContextKey } from '../consts/private/symbols';
import { http } from '../plugins/http';
import { getComponentName } from '../utils/private/vm';

const cachedDataService = {};
let getters;

async function request(pageId, method, ...args) {
  const isCommonPage = getters && pageId ? getters['meta/getPage'](pageId)?.isCommonPage : null;

  const config = args.pop() || {};
  config.headers ||= {};
  config.headers[consts.HTTP_HEADER_PAGE_ID] = pageId;
  config.headers[consts.HTTP_HEADER_IS_COMMON_PAGE] = isCommonPage;
  const response = method
    ? await http[method](...args, config) : await http(config);

  return response;
}

function createDataService(pageId) {
  const dataService = (config) => request(pageId, null, config);

  Object.defineProperty(dataService, 'request', {
    get: () => (config) => request(pageId, null, config),
  });

  const methodNoData = ['delete', 'get', 'head', 'options'];
  methodNoData.forEach((method) => {
    Object.defineProperty(dataService, method, {
      get: () => (url, config) => request(pageId, method, url, config),
    });
  });

  const methodWithData = ['post', 'put', 'patch'];
  methodWithData.forEach((method) => {
    Object.defineProperty(dataService, method, {
      get: () => (url, data, config) => request(pageId, method, url, data, config),
    });
  });

  return dataService;
}

function getDataService(pageId) {
  return cachedDataService[pageId] || createDataService(pageId);
}

export default (pageId) => {
  pageId ||= inject(PageContextKey, {}).pageId;

  if (!pageId) {
    getters = useStore().getters;
    const vm = getCurrentInstance();
    const vmComponentName = getComponentName(vm);

    pageId = getters['meta/getPage'](vmComponentName)?.pageId;

    if (!pageId) {
      throw new Error('The page context is empty.\nShould pass pageId to parameter or use useDataService in an appropriate context.');
    }
  }

  return getDataService(pageId);
};

import consts from '../consts';
import { PageContextKey } from '../consts/private/symbols';
import { http } from '../plugins/http';
import { getComponentName } from '../utils/private/vm';

const cachedDataService = {};

async function request(pageId, method, ...args) {
  const config = args.pop() || {};
  config.headers ||= {};
  config.headers[consts.HTTP_HEADER_PAGE_ID] = pageId;

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
  pageId ||= inject(PageContextKey, null)?.pageId;

  if (!pageId) {
    const { getters } = useStore();
    const vm = getCurrentInstance();
    const vmComponentName = getComponentName(vm);

    pageId = getters['meta/getPage'](vmComponentName)?.pageId;
  }

  if (!pageId) {
    throw new Error('pageId is required.');
  }

  return getDataService(pageId);
};

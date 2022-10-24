import { cloneDeep, isEmpty } from 'lodash-es';
import { http } from '../plugins/http';

const cachedCodes = {};

async function fetchCodes(codeId, parentCodeValue) {
  const key = parentCodeValue ? `${codeId}/${parentCodeValue}` : codeId;

  if (!cachedCodes[key]) {
    const params = { parentsCodeValidityValue: parentCodeValue };
    const response = await http.get(`/sflex/common/common/codes/${codeId}`, { params });
    const codes = response.data;

    if (codes.length === 0) {
      throw new Error(`No data available in ${key}.`);
    }

    cachedCodes[key] = codes;
  }

  return cloneDeep(cachedCodes[key]);
}

async function fetchMultiCodes(codeIds) {
  const requestCodeIds = codeIds.filter((v) => !cachedCodes[v]);

  if (requestCodeIds.length > 0) {
    const params = { codeIds: requestCodeIds };
    const response = await http.get('/sflex/common/common/codes/code-ids', { params });
    const multiCodes = response.data;

    multiCodes.forEach(({ codeId, codes }) => {
      if (codes.length === 0) {
        throw new Error(`No data available in ${codeId}.`);
      }

      cachedCodes[codeId] = codes;
    });
  }

  return codeIds.reduce((a, v) => { a[v] = cloneDeep(cachedCodes[v]); return a; }, {});
}

export async function getCodes(codeId) {
  if (!codeId) {
    throw new Error('The parameter codeId is required.');
  }

  return fetchCodes(codeId);
}

export async function getMultiCodes(...codeIds) {
  if (codeIds.length === 0) {
    throw new Error('The parameter codeIds is required.');
  }

  return fetchMultiCodes(codeIds);
}

export async function getSubCodes(codeId, parentCodeValue) {
  if (isEmpty(codeId || parentCodeValue)) {
    throw new Error('The parameter codeId and parentCodeValue is required.');
  }

  return fetchCodes(codeId, parentCodeValue);
}

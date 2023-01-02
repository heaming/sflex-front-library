import { camelCase, toUpper } from 'lodash-es';

export default (s) => camelCase(s).replace(/^(.)/, toUpper);

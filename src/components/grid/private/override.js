import { GridBase } from 'realgrid';
import * as dataEvents from './overrideDataEvents';
import * as dataMethods from './overrideDataMethods';
import * as viewEvents from './overrideViewEvents';
import * as viewMethods from './overrideViewMethods';

const dataOverrides = Object.values({ ...dataEvents, ...dataMethods });
const viewOverrides = Object.values({ ...viewEvents, ...viewMethods });

export default (obj, vm) => {
  const overrides = obj instanceof GridBase ? viewOverrides : dataOverrides;
  overrides.forEach((fn) => { fn(obj, vm); });
};

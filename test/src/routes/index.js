import {
  createRoutesByGlobImport, registerPopupsByGlobImport,
} from '~kw-lib';

const routesGlobImport = import.meta.glob('~test/modules/**/pages/*/*M.vue');
const popupsGlobImport = import.meta.glob('~test/modules/**/pages/*/*P.vue');

registerPopupsByGlobImport(popupsGlobImport);

export default [
  { path: '/', component: () => import('~test/pages/IndexPage.vue') },

  ...createRoutesByGlobImport(routesGlobImport),
];

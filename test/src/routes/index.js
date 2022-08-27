import {
  createRoutesByGlobImport, registerPopupsByGlobImport,
} from '~kw-lib';

const routesGlobImport = import.meta.glob('../modules/**/pages/*/*M.vue');
const popupsGlobImport = import.meta.glob('../modules/**/pages/*/*P.vue');

registerPopupsByGlobImport(popupsGlobImport);

export default [
  { path: '/', component: () => import('../pages/IndexPage.vue') },

  ...createRoutesByGlobImport(routesGlobImport),
];

import {
  createRoutesByGlobImport, registerPopupsByGlobImport,
} from '~lib';

const routesGlobImport = import.meta.glob('../pages/*/*M.vue');
const popupsGlobImport = import.meta.glob('../pages/*/*P.vue');

registerPopupsByGlobImport(popupsGlobImport);

export default [
  { path: '/', component: () => import('@/pages/IndexPage.vue') },

  ...createRoutesByGlobImport(routesGlobImport),
];

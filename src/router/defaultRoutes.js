export default [
  {
    name: 'ErrorNotFound',
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue'),
  },
];

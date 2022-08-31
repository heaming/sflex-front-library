import * as autoInstalledComponents from './components';

const normalizeToArray = (components) => (
  Array.isArray(components) ? components : Object.values(components.default || components)
);

export default (app, modulesOrArray) => {
  const components = [
    ...normalizeToArray(autoInstalledComponents),
    ...normalizeToArray(modulesOrArray),
  ];

  components.forEach((moduleOrComponent) => {
    const component = moduleOrComponent.default || moduleOrComponent;
    const name = component.name || component.__name;
    app.component(name, component);
  });
};

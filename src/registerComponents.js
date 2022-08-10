export default (app, components) => {
  components = Array.isArray(components)
    ? components : Object.values(components.default || components);

  components.forEach((component) => {
    component = component.default || component;
    app.component(component.name || component.__name, component);
  });
};

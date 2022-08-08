export default (app, components) => {
  components = Array.isArray(components)
    ? components : Object.values(components);

  components.forEach((component) => {
    app.component(component.name || component.__name, component);
  });
};

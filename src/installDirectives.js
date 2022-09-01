import permission from './directives/permission';

const autoInstalledDirectives = {
  permission,
};

export default (app) => {
  const directives = { ...autoInstalledDirectives };
  const directiveNames = Object.keys(directives);

  directiveNames.forEach((name) => {
    const directive = directives[name];
    app.directive(name, directive);
  });
};

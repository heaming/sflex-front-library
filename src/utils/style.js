const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*.*?\*\//gs;

export function parseStringStyle(cssText) {
  const ret = {};
  cssText
    .replace(styleCommentRE, '')
    .split(listDelimiterRE)
    .forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        // eslint-disable-next-line no-unused-expressions
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
  return ret;
}
export function castStylePropToObject(...props) {
  function castToObj(propValue) {
    if (typeof propValue === 'string') {
      return parseStringStyle(propValue);
    }
    if (Array.isArray(propValue)) {
      const flatten = propValue.flat(Infinity);
      return flatten.reduce((acc, cur) => Object.assign(acc, castToObj(cur)), {});
    }
    return propValue;
  }

  return castToObj(props);
}

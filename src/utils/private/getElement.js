export default (target) => {
  if (target instanceof Element) {
    return target;
  }

  return target.value?.$el || target.value;
};

export default (target) => {
  const el = target.value?.getNativeElement?.()
    || target.value?.$el
    || target.value;

  return el;
};

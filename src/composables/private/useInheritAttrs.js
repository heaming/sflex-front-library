import { pick, omit } from 'lodash-es';

const styleClassKey = ['style', 'class'];

export default () => {
  const attrs = useAttrs();

  const styleClassAttrs = computed(() => pick(attrs, styleClassKey));
  const inheritedAttrs = computed(() => omit(attrs, styleClassKey));

  return {
    styleClassAttrs,
    inheritedAttrs,
  };
};

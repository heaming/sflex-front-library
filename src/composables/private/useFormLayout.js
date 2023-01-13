import { snakeCase, toUpper } from 'lodash-es';
import { FormLayoutContextKey } from '../../consts/private/symbols';
import { platform } from '../../plugins/platform';

export const FIELD_ALIGNS = ['left', 'center', 'right'];

export const useFormLayoutProps = {
  cols: {
    type: Number,
    default: undefined,
  },
  labelSize: {
    type: Number,
    default: undefined,
  },
  alignContent: {
    type: String,
    default: undefined,
    validate: (v) => FIELD_ALIGNS.includes(v),
  },
};

const DEFAULT_COLS = {
  DESKTOP: 3,
  TABLET: 3,
  MOBILE: 0,
};
const DEFAULT_LABEL_SIZE = {
  DESKTOP: 150,
  TABLET: 108,
  MOBILE: 80,
};
const DEFAULT_ALIGN_CONTENT = 'left';

export default (defaults = {}) => {
  let currentPlatform;
  if (platform.is.desktop) { currentPlatform = 'desktop'; }
  if (platform.is.tablet) { currentPlatform = 'tablet'; }
  if (platform.is.mobile) { currentPlatform = 'mobile'; }

  const vm = getCurrentInstance();
  const { props } = vm;

  const injected = inject(FormLayoutContextKey, null);
  const formLayoutCtx = {
    cols: computed(() => props.cols
      ?? injected?.cols.value
      ?? defaults.cols
      ?? DEFAULT_COLS[toUpper(snakeCase(currentPlatform))]),
    labelSize: computed(() => props.labelSize
      ?? injected?.labelSize.value
      ?? defaults.labelSize
      ?? DEFAULT_LABEL_SIZE[toUpper(snakeCase(currentPlatform))]),
    alignContent: computed(() => props.alignContent
      ?? injected?.alignContent.value
      ?? defaults.alignContent
      ?? DEFAULT_ALIGN_CONTENT),
  };

  // form layout injection
  provide(FormLayoutContextKey, formLayoutCtx);

  return formLayoutCtx;
};

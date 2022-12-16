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

const DEFAULT_COLS = 3;
let DEFAULT_LABEL_SIZE;
if (platform.is.desktop) { DEFAULT_LABEL_SIZE = 150; }
if (platform.is.tablet) { DEFAULT_LABEL_SIZE = 108; }
if (platform.is.mobile) { DEFAULT_LABEL_SIZE = 105; }
const DEFAULT_ALIGN_CONTENT = 'left';

export default (defaults = {}) => {
  const vm = getCurrentInstance();
  const { props } = vm;

  const injected = inject(FormLayoutContextKey, null);
  const formLayoutCtx = {
    cols: computed(() => props.cols
      ?? injected?.cols.value
      ?? defaults.cols
      ?? DEFAULT_COLS),
    labelSize: computed(() => props.labelSize
      ?? injected?.labelSize.value
      ?? defaults.labelSize
      ?? DEFAULT_LABEL_SIZE),
    alignContent: computed(() => props.alignContent
      ?? injected?.alignContent.value
      ?? defaults.alignContent
      ?? DEFAULT_ALIGN_CONTENT),
  };

  // form layout injection
  provide(FormLayoutContextKey, formLayoutCtx);

  return formLayoutCtx;
};

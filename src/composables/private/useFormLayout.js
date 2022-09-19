import { FormLayoutContextKey } from '../../consts/private/symbols';

const supportedFieldAlign = ['left', 'right', 'center'];

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
    validate: (val) => !supportedFieldAlign.find(val),
  },
};

export default () => {
  const vm = getCurrentInstance();
  const { props } = vm;

  const injected = inject(FormLayoutContextKey, null);

  const defaultCols = 3;
  const defaultLabelSize = 150;
  const defaultAlignContent = 'left';

  const cols = computed(() => props.cols ?? injected?.cols.value ?? defaultCols);
  const labelSize = computed(() => props.labelSize ?? injected?.labelSize.value ?? defaultLabelSize);
  const alignContent = computed(() => props.alignContent ?? injected?.alignContent.value ?? defaultAlignContent);

  provide(FormLayoutContextKey, {
    cols,
    labelSize,
    alignContent,
  });

  return {
    cols,
    labelSize,
    alignContent,
  };
};

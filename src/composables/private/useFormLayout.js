import { FormLayoutContextKey } from '../../consts/private/symbols';

export const useFormLayoutProps = {
  cols: {
    type: Number,
    default: undefined,
  },
  labelSize: {
    type: Number,
    default: undefined,
  },
};

export default () => {
  const vm = getCurrentInstance();
  const { props } = vm;

  const injected = inject(FormLayoutContextKey, null);

  const defaultCols = 3;
  const defaultLabelSize = 150;

  const cols = computed(() => props.cols ?? injected?.cols.value ?? defaultCols);
  const labelSize = computed(() => props.labelSize ?? injected?.labelSize.value ?? defaultLabelSize);

  provide(FormLayoutContextKey, {
    cols,
    labelSize,
  });

  return {
    cols,
    labelSize,
  };
};

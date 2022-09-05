import useFormLayout, { useFormLayoutProps } from './useFormLayout';

export const useFormRowProps = {
  ...useFormLayoutProps,
};

export default () => {
  const { cols } = useFormLayout();

  const rowClass = computed(() => (cols.value ? `kw-form-row--cols-${cols.value}` : ''));

  return {
    rowClass,
  };
};

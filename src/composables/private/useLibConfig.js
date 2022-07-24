import { GlobalKey } from '../../consts/private/symbols';

export default () => {
  const { libConfig } = inject(GlobalKey);
  return libConfig;
};

import { platform } from '~kw-lib';

export function overridePlatformBySearchParams() {
  const { search } = window.location;
  const searchParams = new URLSearchParams(search);

  const mobile = searchParams.has('mobile');
  const tablet = searchParams.has('tablet');
  const desktop = !mobile && !tablet;

  Object.assign(platform.is, {
    ...platform.is,
    mobile,
    tablet,
    desktop,
  });
}

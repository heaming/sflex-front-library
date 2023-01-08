export function getDevicePlatformBySearchParams() {
  const { search } = window.location;
  const searchParams = new URLSearchParams(search);

  if (searchParams.has('mobile')) {
    return 'mobile';
  }

  if (searchParams.has('tablet')) {
    return 'tablet';
  }

  return 'desktop';
}

const ANIMATE_CANCELED_NAME = 'animate canceled error';

export function createAnimateCanceledError(animationFrameId) {
  const e = new Error(`${animationFrameId} animate canceled`);
  e.name = ANIMATE_CANCELED_NAME;
  return e;
}

export function isAnimateCanceledError(e) {
  return e instanceof Error && e.name === ANIMATE_CANCELED_NAME;
}

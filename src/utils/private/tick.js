export function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function animationFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });
}

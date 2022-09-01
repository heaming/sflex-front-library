export default () => {
  const callCount = ref(0);
  const isDestroyed = computed(() => callCount.value > 0);

  function manualDestroy() {
    callCount.value += 1;
  }

  return {
    isDestroyed,
    manualDestroy,
  };
};

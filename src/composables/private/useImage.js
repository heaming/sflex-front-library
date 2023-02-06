export default () => {
  const imageSources = import.meta.globEager('@assets/images/*');
  const keys = Object.keys(imageSources);

  const getImageSourceUrl = (src) => {
    const imageKey = keys.find((key) => key.indexOf(src) >= 0);
    return imageKey ? imageSources[imageKey].default : null;
  };

  return {
    getImageSourceUrl,
  };
};

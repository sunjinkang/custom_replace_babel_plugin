export default declare((api) => {
  api.assertVersion(7);
  const t = api.types;
  return {
    visitor: {
      Program: {
        enter(path) {},
        exit(path) {},
      },
    },
  };
});

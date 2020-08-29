export const registerComponents = ({
  components,
  defaultComponents,
  exceptions
}: {
  components: any;
  defaultComponents: any;
  exceptions: any;
}) => {
  components.keys().forEach((key: any) => {
    let unregister = false;
    if (Array.isArray(exceptions)) {
      unregister = exceptions.find(item => key.includes(item));
    }
    if (!unregister) {
      const end = key.lastIndexOf("/") + 1;
      const componentName = key.substring(end).split(".")[0];
      defaultComponents[componentName] =
        components(key).default || components(key);
    }
  });
  return defaultComponents;
};

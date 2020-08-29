module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `
        @import "~@/components/global.scss";
        `
      }
    }
  }
};

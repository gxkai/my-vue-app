module.exports = {
  css: {
    extract: false,
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

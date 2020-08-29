import { registerComponents } from "@/utils/register.utils.ts";
import { VueConstructor } from "vue";
import "./global.scss";
const components = registerComponents({
  components: require.context("./", true, /\.vue/),
  defaultComponents: {},
  exceptions: []
});
export default {
  install: (Vue: VueConstructor) => {
    Object.keys(components).forEach(e => {
      Vue.component(e, components[e]);
    });
  }
};

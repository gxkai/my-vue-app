import { Vue, Component } from "vue-property-decorator";

@Component
export default class GlobalMixin extends Vue {
  prefix = "my";
}

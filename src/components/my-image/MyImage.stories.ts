import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/vue";
// https://www.npmjs.com/package/@storybook/addon-knobs
// https://github.com/pocka/storybook-addon-vue-info
storiesOf("MyImage", module)
  .addDecorator(withKnobs)
  .add("BasicUsage", () => ({
    template: `<my-image></my-image>`
  }));

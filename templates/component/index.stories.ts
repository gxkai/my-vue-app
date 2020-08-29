import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/vue";
// https://www.npmjs.com/package/@storybook/addon-knobs
storiesOf("{{properCase fileName}}", module)
  .addDecorator(withKnobs)
  .add("BasicUsage", () => {
    return {
      template: `<{{dashCase fileName}}></{{dashCase fileName}}>`
    };
  });

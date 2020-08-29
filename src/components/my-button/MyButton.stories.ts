import { action } from "@storybook/addon-actions";
import {
  boolean,
  select,
  array,
  text,
  withKnobs
} from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/vue";
storiesOf("MyButton", module)
  .addDecorator(withKnobs)
  .add("BasicUsage", () => {
    return {
      props: {
        text: {
          default: text("text", "Hello Storybook")
        },
        disabled: {
          default: boolean("disabled", false)
        },
        size: {
          default: select("size", ["small", "medium", "large"], "medium")
        }
      },
      template: `<my-button  @click="action" :disabled="disabled" :size="size">{{ text }}</my-button>`,
      methods: {
        action: action("clicked")
      }
    };
  });

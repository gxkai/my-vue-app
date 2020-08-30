<template>
  <button
    @click="onClick"
    :attr="$attrs"
    :class="[clazz, `${prefix}-my-button`]"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component, Mixins } from "vue-property-decorator";
import GlobalMixin from "@/components/mixins/global.mixin";
@Component
export default class MyButton extends Mixins(GlobalMixin) {
  @Prop({
    type: String,
    default: "medium"
  })
  size!: "small" | "medium" | "large";
  onClick() {
    this.$emit("click", "111");
  }
  get clazz() {
    return `${this.prefix}-my-button--${this.size}`;
  }
}
</script>

<style lang="scss">
@import "my-button.scss";
</style>

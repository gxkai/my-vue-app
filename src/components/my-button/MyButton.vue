<template>
  <button @click="onClick" :attr="$attrs" :class="clazz">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
@Component
export default class MyButton extends Vue {
  @Prop() size!: "small" | "medium" | "large";
  onClick() {
    this.$emit("click", "111");
  }
  get clazz() {
    return `button--${this.size}`;
  }
}
</script>

<style lang="scss">
@import "my-button.scss";
</style>

<template>
  <div>
    {{dashCase fileName}}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
@Component({
  name: `{{dashCase fileName}}`
})
export default class MyButton extends Vue {}
</script>

<style lang="scss">
@import "{{camelCase fileName}}.scss";
</style>

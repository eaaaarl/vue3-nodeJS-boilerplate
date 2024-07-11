<script setup lang="ts">
import { HtmlHTMLAttributes } from "vue";
import { cn } from "../libs/utils";
const props = defineProps<{
  class?: HtmlHTMLAttributes["class"];
}>();
</script>
<template>
  <div :class="cn('card', props.class)">
    <slot />
  </div>
</template>

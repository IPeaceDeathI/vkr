<template>{{}}</template>
<script setup lang="ts">
import { Props, Emits } from "./_props&emits";
import { defineProps, defineEmits } from "vue";

//typing
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
<style lang="scss" scoped></style>

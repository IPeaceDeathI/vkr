<template>
    <div class="category-title text-body-2 font-weight-bold"><slot /></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>
<style lang="scss" scoped>
@import "@/shared/constants/index.scss";
.category-title {
    background-color: rgb(238, 238, 238);
    margin: 0px calc(-1 * var(--redactor-line-spacing));
    padding: 6px var(--redactor-line-spacing);
}
</style>

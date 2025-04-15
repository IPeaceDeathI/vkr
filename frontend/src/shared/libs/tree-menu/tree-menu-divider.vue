<template>
    <v-divider :thickness="item.value"></v-divider>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import { Divider } from "./types";

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<Divider>,
            required: true,
        },
    },
});
</script>
<style lang="scss">
@import "./styles.scss";
</style>

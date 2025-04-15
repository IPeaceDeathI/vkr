<template>
    <label v-if="title !== ''" class="form-field-title" :for="fieldId">{{
        _title
    }}</label>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        fieldId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        required: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        _title(): string {
            let tmp = this.title;
            if (this.required) {
                tmp += " *";
            }
            return tmp;
        },
    },
});
</script>

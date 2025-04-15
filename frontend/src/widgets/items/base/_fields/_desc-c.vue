<template>
    <div v-if="desc !== ''" class="form-field-desc">{{ desc }}</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        desc: {
            type: String,
            required: true,
        },
    },
});
</script>

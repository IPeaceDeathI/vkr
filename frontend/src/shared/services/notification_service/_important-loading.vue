<template>
    <v-dialog v-model="isActive" persistent max-width="600px">
        <v-sheet
            color="primary"
            min-height="100px"
            class="d-flex justify-center align-center"
        >
            <v-icon
                icon="mdi-loading"
                color="secondary-lighten-5"
                class="mr-2 spin"
                size="large"
            ></v-icon>
            <span style="font-size: 20px" class="d-flex justify-center">
                {{ message.loadingText }}
            </span>
        </v-sheet>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import { ImportantLoading } from "./types";

export default defineComponent({
    components: {},
    props: {
        message: { type: Object as PropType<ImportantLoading>, required: true },
    },
    emits: {
        afterClose() {
            return true;
        },
    },
    data() {
        return {
            isActive: true,
        };
    },
    mounted() {
        this.message.waitTo.finally(() => this.$emit("afterClose"));
    },
});
</script>
<style scoped lang="scss">
@import "@/shared/constants/index.scss";
.spin {
    animation: spin 1s infinite;
}
@keyframes spin {
    from {
        transform: rotateZ(0deg);
    }
    to {
        transform: rotateZ(360deg);
    }
}
</style>

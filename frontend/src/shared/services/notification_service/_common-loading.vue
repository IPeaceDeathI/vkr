<template>
    <transition name="list">
        <v-sheet
            color="secondary"
            width="350px"
            class="d-flex align-center pa-3 rounded mt-2"
        >
            <v-icon
                icon="mdi-loading"
                color="secondary-lighten-5"
                class="mr-2 spin"
            ></v-icon>
            <span style="font-size: 14px"> Идёт загрузка... </span>
        </v-sheet>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import { CommonLoading } from "./types";

export default defineComponent({
    components: {},
    props: {
        message: { type: Object as PropType<CommonLoading>, required: true },
    },
    emits: {
        afterClose() {
            return true;
        },
    },
    data() {
        return {};
    },
    mounted() {
        this.message.waitTo.finally(() => this.$emit("afterClose"));
    },
});
</script>
<style scoped lang="scss">
@import "@/shared/constants/index.scss";
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
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

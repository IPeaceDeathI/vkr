<template>
    <transition name="list">
        <v-sheet
            color="secondary"
            width="350px"
            class="d-flex align-center justify-space-between pa-2 rounded mt-2"
        >
            <v-icon
                icon="mdi-information-outline"
                color="editor-lighten-1"
                class="mr-2"
            ></v-icon>
            <span style="font-size: 14px">
                {{ message.text }}
            </span>

            <v-spacer></v-spacer>
            <v-btn
                color="secondary-lighten-5"
                variant="text"
                @click="$emit('afterClose')"
            >
                <v-icon icon="mdi-close"></v-icon>
            </v-btn>
        </v-sheet>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import { CommonNotification } from "./types";

export default defineComponent({
    components: {},
    props: {
        message: {
            type: Object as PropType<CommonNotification>,
            required: true,
        },
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
        setTimeout(() => {
            this.$emit("afterClose");
        }, this.message.delay);
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
</style>

<template>
    <v-card
        class="preloader-container"
        :class="{ 'after-load': inUnmountProcess }"
    >
        <div class="content-container">
            <div v-if="isLoading" class="loading-text text-h4">
                {{ text }}...
            </div>
            <div v-else class="text-h4">{{ textAfterLoad }}</div>
            <img class="img" :src="gifSrc" />
        </div>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        text: {
            type: String,
            default: "Загрузка",
        },
        isLoading: {
            type: Boolean,
            default: true,
        },
        textAfterLoad: {
            type: String,
            default: "Готово",
        },
    },
    emits: {
        callUnmount: () => true,
    },
    data() {
        return {
            gifSrc: `${process.env.BASE_URL}images/preloading.gif`,
            inUnmountProcess: false,
        };
    },
    watch: {
        isLoading(value: boolean) {
            if (!value) {
                this.inUnmountProcess = true;
                setTimeout(() => {
                    this.$emit("callUnmount");
                }, 1200);
            }
        },
    },
});
</script>

<style scoped>
.preloader-container {
    position: fixed;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #faf5d3;
    z-index: 2147483647;

    & .content-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .loading-text {
        display: inline-block;
        clip-path: inset(0 1ch 0 0);
        animation: l 1s steps(4) infinite;
    }
    &.after-load {
        animation: fadeO 1200ms ease-out;
    }
    .img {
        max-height: 300px;
        width: 300px;
    }
}
@keyframes l {
    to {
        clip-path: inset(0 -1ch 0 0);
    }
}
@keyframes fadeO {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>

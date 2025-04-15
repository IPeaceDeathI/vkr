<!-- НИКАКИХ ЕБУЧИХ ТОЧЕК В handle, СЕЛЕКТОРЫ ТОЖЕ НЕ ПИСАТЬ НАХУЙ, ТОЛЬКО НАЗВАНИЕ КЛАССА -->
<template>
    <v-dialog :scrim="'#ffffff00'" v-model="show" class="dialog-first-parent">
        <div class="dragDialog" ref="wrapper">
            <slot></slot>
        </div>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import mixin from "./drag-lib";

export default defineComponent({
    name: "draggable-dialog",
    mixins: [mixin],
    mounted() {
        this.activateMultipleDraggableDialogs();
    },
    props: {
        modelValue: {
            type: Boolean,
        },
        parentSelector: {
            type: HTMLElement,
        },
    },
    unmounted() {
        this.removeEvents();
    },
    data() {
        return {
            rect: {
                left: -1,
                top: -1,
                right: -1,
                bottom: -1,
                x: -1,
                y: -1,
                width: -1,
                height: -1,
            },
            top: -1 as number,
            left: -1 as number,
        };
    },
    computed: {
        show: {
            get() {
                return this.modelValue;
            },
            set(value: boolean) {
                this.$emit("update:model-value", value);
            },
        },
    },
    watch: {
        show(value) {
            if (value) {
                if (this.parentSelector) {
                    const tmp = this.parentSelector;
                    setTimeout(() => {
                        if (tmp) {
                            const rectangle = tmp.getBoundingClientRect();
                            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                            this.rect = rectangle;
                            const qwe = this.$refs.wrapper as HTMLElement; //TODO сделать проверку!!! Если правая граница viewport - rect.right < width драггабла, то проверяем если левая граница viewport - rect.left > width драггабла то вставляем слева, иначе (левая граница viewport - rect.left < width драггабла) - вставляем в правый верхний угол
                            if (qwe) {
                                const dialogWidth = qwe.offsetWidth;
                                const dialogHeight = qwe.offsetHeight;
                                const windowWidth = window.innerWidth;
                                const windowheight = window.innerHeight;
                                const qweryParent = qwe.parentElement;
                                if (qweryParent === null) return;
                                qweryParent.style.margin = "0";
                                if (
                                    windowWidth - this.rect.right >=
                                    dialogWidth
                                ) {
                                    const r = this.rect.right + 0;
                                    qweryParent.style.left = r + "px";
                                } else if (this.rect.left >= dialogWidth) {
                                    const l = windowWidth - this.rect.left + 0;
                                    qweryParent.style.right = l + "px";
                                } else if (
                                    windowheight - this.rect.bottom >=
                                    dialogHeight
                                ) {
                                    const b = this.rect.bottom + 0;
                                    qweryParent.style.top = b + "px";
                                } else {
                                    qweryParent.style.right = "0px";
                                    qweryParent.style.top = "30px";
                                }
                            }
                        }
                    }, 0);
                }
                this.activateMultipleDraggableDialogs();
            } else {
                this.removeEvents();
            }
        },
    },
});
</script>
<style scoped lang="scss">
.v-dialog.v-overlay--active::v-deep .v-overlay__content {
    // width: auto;
    max-height: none;
}

// .dragDialog {
//     width: 770px;
//     height: 580px;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translateX(-50%) translateY(-50%);
// }
.dragDialog {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<template>
    <draggable-card
        transition="scale-transition"
        handle="v-toolbar"
        v-model="_dialogOpened"
        :width="wrapperWidth + 'px'"
        height="700px"
    >
        <redactor-toolbar
            title="ДОБАВИТЬ ЭЛЕМЕНТ"
            @close-click="_dialogOpened = false"
        />
        <v-redactor-container style="max-height: 700px">
            <v-row class="pr-3 pl-3 pb-3">
                <v-btn-toggle
                    style="width: 250px !important"
                    density="compact"
                    v-model="tab"
                >
                    <v-btn class="text-body-2" :value="1" style="opacity: 0.57"
                        ><v-icon start>mdi-format-align-justify</v-icon
                        >Статичные</v-btn
                    >
                    <v-btn
                        class="text-body-2"
                        :value="2"
                        style="opacity: 0.57"
                        disabled
                        ><v-icon start>mdi-vector-square</v-icon
                        >Абсолютные</v-btn
                    >
                </v-btn-toggle>
                <v-spacer></v-spacer>
                <v-btn
                    class="text-body-2"
                    text="Вставить из буфера"
                    prepend-icon="mdi-content-paste"
                    size="medium"
                    min-width="170px"
                    variant="tonal"
                    @click="pasteItem"
                ></v-btn>
            </v-row>
            <v-window v-model="tab">
                <v-window-item v-for="n in 2" :key="n" :value="n">
                    <v-container v-if="n == 1" class="pa-3">
                        <v-item-group multiple>
                            <v-row style="gap: 15px" class="pb-10">
                                <template v-for="(item, i) in items" :key="i">
                                    <v-card
                                        v-if="variant === 'image'"
                                        @click="$emit('select', item.id)"
                                        class="card-on-hover"
                                        :min-width="cardWidth"
                                    >
                                        <div
                                            style="
                                                border-bottom: 1px solid
                                                    rgba(48, 52, 59, 0.1);
                                            "
                                        >
                                            <v-img
                                                :src="item.preview"
                                                aspect-ratio="16:9"
                                                :height="imageHeight"
                                                cover
                                                class="bg-grey-lighten-2"
                                            >
                                                <template v-slot:placeholder>
                                                    <v-row
                                                        class="fill-height ma-0"
                                                        align="center"
                                                        justify="center"
                                                    >
                                                        <v-progress-circular
                                                            indeterminate
                                                            color="grey-lighten-5"
                                                        ></v-progress-circular>
                                                    </v-row>
                                                </template>
                                            </v-img>
                                        </div>
                                        <div
                                            class="d-flex justify-center pa-2 text-body-2"
                                        >
                                            {{ item.name }}
                                        </div>
                                    </v-card>
                                    <v-card
                                        rounded="xl"
                                        v-else-if="variant === 'icon'"
                                        @click="$emit('select', item.id)"
                                        height="100"
                                        :width="cardWidth"
                                    >
                                        <div
                                            style="
                                                display: flex;
                                                flex-direction: column;
                                                align-items: center;
                                                height: 100%;
                                                width: 100%;
                                            "
                                        >
                                            <v-icon style="flex-grow: 50">{{
                                                item.preview
                                            }}</v-icon>
                                            <v-card-title
                                                style="flex-grow: 1"
                                                >{{ item.name }}</v-card-title
                                            >
                                        </div>
                                    </v-card>
                                </template>
                                <!-- </v-col> -->
                            </v-row>
                        </v-item-group>
                    </v-container>
                </v-window-item>
            </v-window>
        </v-redactor-container>
    </draggable-card>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";
import { galleryVariant, GalleryItems } from "./types";
import { redactorToolbar } from "@/features/structure/redactors/reusable-components";
import { draggableCard } from "@/features/structure/redactors/reusable-components";
import { CopyPaste } from "@/entities";

export default defineComponent({
    components: {
        redactorToolbar,
        draggableCard,
    },
    props: {
        variant: {
            type: String as PropType<galleryVariant>,
            default: galleryVariant.image,
        },
        items: {
            type: Array as PropType<Array<GalleryItems>>,
            required: true,
        },
        dialogOpened: {
            type: Boolean,
            default: false,
        },
        absolute: {
            type: Boolean,
            default: false,
        },
        index: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            tab: null,
        };
    },
    emits: {
        closeWithoutSelected() {
            return true;
        },
        select(val: string | number) {
            return true;
        },
        pasteItem() {
            return true;
        },
    },
    computed: {
        editable: function () {
            return this.$store.getters["environment/isEditable"];
        },
        _dialogOpened: {
            get() {
                return this.dialogOpened;
            },
            set(value: boolean) {
                if (value === false) this.$emit("closeWithoutSelected");
            },
        },
        cardWidth: function () {
            if (this.variant === "icon") {
                return 100;
            } else if (this.variant === "image") {
                return 220;
            }
            return 100;
        },
        md: function () {
            if (this.variant === "icon") {
                return 4;
            } else if (this.variant === "image") {
                return 6;
            }
            return 4;
        },
        imageHeight: function () {
            return (this.cardWidth * 9) / 16;
        },
        wrapperWidth: function () {
            if (this.variant === "icon") {
                return 420;
            } else if (this.variant === "image") {
                return 740;
            }
            return 420;
        },
    },
    methods: {
        pasteItem() {
            this.$emit("pasteItem");
            this._dialogOpened = false;
        },
    },
});
</script>
<style lang="scss" scoped>
.v-tab--selected {
    opacity: 1 !important;
}
.scrollable::-webkit-scrollbar,
.scrollable ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
.scrollable::-webkit-scrollbar-button,
.scrollable ::-webkit-scrollbar-button {
    display: block;
    background-color: transparent;
    visibility: hidden;
    width: 1px;
    height: 1px;
}

.scrollable::-webkit-scrollbar-thumb,
.scrollable ::-webkit-scrollbar-thumb {
    background-color: rgba(68, 68, 68, 0.3);
    border-radius: 6px;
}

.scrollable::-webkit-scrollbar-track,
.scrollable ::-webkit-scrollbar-track {
    background: transparent;
    opacity: 0;
}
.card-on-hover {
    top: 0px;
    transition: 300ms;
}
.card-on-hover:hover {
    top: -5px;
    box-shadow: 0 9px 13px rgba(48, 52, 59, 0.28);
    // box-shadow: 0px 8px 9px -5px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    //     0px 15px 22px 2px
    //         var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    //     0px 6px 28px 5px
    //         var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)) !important;
    transition: all 300ms;
}
</style>

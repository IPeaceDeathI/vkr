<template>
    <v-dialog
        :absolute="absolute"
        rounded="xl"
        v-model="_dialogOpened"
        location-strategy="connected"
        :width="wrapperWidth"
    >
        <v-sheet
            class="pa-5"
            rounded="xl"
            style="max-height: 800px; overflow-y: auto"
        >
            <v-container class="pa-3 pizda">
                <v-item-group multiple>
                    <v-row>
                        <v-col
                            v-for="(item, i) in items"
                            :key="i"
                            cols="12"
                            :md="md"
                        >
                            <v-card
                                rounded="xl"
                                v-if="variant === 'image'"
                                @click="$emit('select', item.id)"
                                class="mx-auto"
                                :max-width="cardWidth"
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
                                <v-card-title> {{ item.name }}</v-card-title>
                                <v-card-actions>
                                    <v-btn
                                        color="deep-purple-accent-4"
                                        variant="text"
                                    >
                                        Выбрать
                                    </v-btn>
                                </v-card-actions>
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
                                    <v-card-title style="flex-grow: 1">{{
                                        item.name
                                    }}</v-card-title>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-item-group>
            </v-container>
        </v-sheet>
    </v-dialog>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";
import { galleryVariant, GalleryItems } from "./types";
export default defineComponent({
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
    },
    emits: {
        closeWithoutSelected() {
            return true;
        },
        select(val: string | number) {
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
            set() {
                this.$emit("closeWithoutSelected");
            },
        },
        cardWidth: function () {
            if (this.variant === "icon") {
                return 100;
            } else if (this.variant === "image") {
                return 344;
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
                return 800;
            }
            return 420;
        },
    },
});
</script>
<style lang="scss" scoped></style>

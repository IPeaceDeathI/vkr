<template>
    <v-container>
        <v-row>
            <v-col v-for="item in items" :key="item.id" cols="4" class="pa-2">
                <v-card @click="$emit('select', item.id)" class="card-on-hover">
                    <v-img
                        :src="src"
                        cover
                        aspect-ratio="16:9"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        class="bg-grey-lighten-2 select-galery-image align-end"
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
                                />
                            </v-row>
                        </template>
                        <v-card-title
                            class="text-white text-body-1"
                            v-text="item.name"
                        />
                    </v-img>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, toRefs, shallowRef } from "vue";

//typing
export interface GalleryItem {
    id: number;
    name: string;
}

type Props = {
    items: Array<GalleryItem>;
};

type Emits = {
    select: [value: number];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//items params
const { items } = toRefs(props);
const src = shallowRef(`${process.env.BASE_URL}images/items/quiz.jpg`);
</script>
<style lang="scss" scoped>
.card-on-hover {
    top: 0px;
    transition: 300ms;
    .select-galery-image::v-deep(.v-responsive__sizer) {
        padding-bottom: 68%;
    }
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

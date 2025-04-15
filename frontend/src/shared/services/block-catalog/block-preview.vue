<template>
    <v-sheet width="320px" max-width="480px" min-height="250px" class="pa-2">
        <v-card
            width="100%"
            @mouseover="hoverEffectOn"
            @mouseout="hoverEffectOff"
            :class="`elevation-${elevation}`"
            :style="{ top: top }"
            style="transition: top 300ms"
            @click="$emit('blockSelected', id)"
        >
            <v-btn
                v-if="editable"
                :style="{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    zIndex: 1,
                }"
                size="small"
                icon="mdi-pencil"
                @click.stop="openBlockRedactor"
            >
            </v-btn>
            <v-img
                eager
                width="100%"
                :src="
                    src ||
                    'https://noks-d1.ru/files/2311/02/x2dnb_empty_block.png'
                "
            >
                <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular
                            color="grey-lighten-4"
                            indeterminate
                        />
                    </div> </template
            ></v-img>
        </v-card>
    </v-sheet>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BlockRedactorService } from "../block-redactor/block-redactor-service";
import { BlocksModel } from "@/models/Block";

export default defineComponent({
    data() {
        return {
            top: "0px" as string,
            elevation: 0 as number,
        };
    },
    props: {
        src: {
            type: String as PropType<string | null>,
        },
        id: {
            type: Number,
            required: true,
        },
        editable: { type: Boolean },
    },
    emits: {
        blockSelected(value: number) {
            return true;
        },
    },
    methods: {
        hoverEffectOn() {
            this.top = "5px";
            this.elevation = 5;
        },
        hoverEffectOff() {
            this.top = "0px";
            this.elevation = 0;
        },
        openBlockRedactor() {
            BlocksModel.getBlockById(this.id).then((block) => {
                BlockRedactorService.open(block.items);
            });
        },
    },
});
</script>
<style></style>

<template>
    <v-container class="container-grid pa-0" :width="widthContainer">
        <v-row no-gutters class="row-grid" :style="{ gap: `${gapColumns}px` }">
            <v-col v-for="n in Number(numColumns)" :key="n" class="column-wrp">
                <v-sheet
                    class="column"
                    :style="{
                        background: colorColumns,
                        width: `${
                            widthContainer / Number(numColumns) - gapColumns
                        }px`,
                    }"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        numColumns: { type: Number, required: true },
        colorColumns: String,
        gapColumns: { type: Number, required: true },
        widthColumns: { type: Number, required: true },
        widthContainer: { type: Number, required: true },
    },
    data() {
        return {};
    },
    computed: {
        // stWidth() {
        //     return (this.widthColumns =
        //         1100 / this.numColumns - this.gapColumns);
        // },
        // widthCol(): number {
        //     if (this.widthContainer != undefined) {
        //         return this.widthContainer / Number(this.numColumns);
        //     } else {
        //         return this.widthColumns;
        //     }
        // },
    },
});
</script>
<style scoped>
.row-grid {
    height: var(--100vh);
    position: absolute;
    display: grid;

    grid-template-rows: repeat(1, 1fr);
    width: 100%;
    grid-auto-flow: column;
    overflow-x: hidden;
}
.column-wrp {
}
.container-grid {
    position: relative;
}
.column {
    height: 100%;
}
.container-grid ~ .block-area {
    opacity: 0.7;
}
</style>

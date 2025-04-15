<template>
    <v-btn variant="text" density="compact" size="small" disabled>
        <v-icon>mdi-cog</v-icon>
        <v-menu
            activator="parent"
            :close-on-content-click="false"
            transition="scale-transition"
            origin="bottom end"
            width="360px"
        >
            <v-card>
                <v-list>
                    <v-list-item class="d-flex">
                        <div class="text-subtitle-1 text-medium-emphasis">
                            Настройки сетки
                        </div>
                        <v-btn
                            col="2"
                            variant="text"
                            icon="mdi-close"
                            size="small"
                        ></v-btn>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-row no-gutters>
                    <v-col cols="6">
                        <v-sheet class="pa-1 ma-2">
                            <div class="text-subtitle-2 text-medium-emphasis">
                                Количество колонок
                            </div>
                            <v-text-field
                                min="1"
                                max="46"
                                density="compact"
                                v-model="gridColumns"
                                hint=""
                                variant="outlined"
                                type="number"
                                @change="handlerChanged"
                            ></v-text-field>
                        </v-sheet>
                    </v-col>
                    <v-col cols="6">
                        <v-sheet class="pa-1 ma-2 sheet-color">
                            <div class="text-subtitle-2 text-medium-emphasis">
                                Цвет колонок
                            </div>
                            <v-text-field
                                density="compact"
                                variant="outlined"
                                v-model="colorGrids"
                                @change="handlerChangedColor"
                            >
                                <template v-slot:append>
                                    <v-btn
                                        size="x-small"
                                        class="colorpicker-btn"
                                        :style="{
                                            'background-color': colorGrids,
                                        }"
                                    >
                                        <v-menu
                                            activator="parent"
                                            v-model="menuColor"
                                            top
                                            nudge-bottom="105"
                                            nudge-left="16"
                                            :close-on-content-click="false"
                                        >
                                            <v-card>
                                                <v-card-text class="pa-0">
                                                    <v-color-picker
                                                        v-model="colorGrids"
                                                        color="colorGrids"
                                                        flat
                                                        width="250px"
                                                        canvas-height="100px"
                                                    />
                                                </v-card-text>
                                            </v-card>
                                        </v-menu>
                                    </v-btn>
                                </template>
                            </v-text-field>
                        </v-sheet>
                    </v-col>
                    <v-col cols="6">
                        <v-sheet class="pa-1 ma-2">
                            <div class="text-subtitle-2 text-medium-emphasis">
                                Ширина колонок
                            </div>
                            <v-text-field
                                min="0"
                                max="200"
                                density="compact"
                                v-model="widthGrigs"
                                hint=""
                                variant="outlined"
                                type="number"
                                suffix="px"
                                @change="handlerChangedWidth"
                            ></v-text-field>
                        </v-sheet>
                    </v-col>
                    <v-col cols="6">
                        <v-sheet class="pa-1 ma-2">
                            <div class="text-subtitle-2 text-medium-emphasis">
                                Отступы
                            </div>
                            <v-text-field
                                min="0"
                                max="46"
                                density="compact"
                                hint="Между колонками"
                                variant="outlined"
                                type="number"
                                suffix="px"
                                v-model="gapGrids"
                                @change="handlerChangedGap"
                            ></v-text-field>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-card>
        </v-menu>
    </v-btn>
</template>
<script lang="ts">
import { defineComponent } from "vue";
//"#1976D2FF" as string,
export default defineComponent({
    // props:{
    //     colorGrids: {type:String, default:"#1976D2FF"},
    //     gridColumns: {type:String, default: this.$store.getters["environment/numGrids"]},

    // },
    data() {
        return {
            colorGrids: this.$store.getters["environment/colorGrids"],
            gridColumns: this.$store.getters["environment/numGrids"],
            gapGrids: this.$store.getters["environment/gapGrids"],
            widthGrigs: this.$store.getters["environment/widthGrids"],
            mask: "!#XXXXXXXX",
            menuColor: false,
            viewIsDesktop: this.$store.getters["environment/isDesktopViewport"],
        };
    },
    computed: {
        // setWidthGrids() {
        //     const containerGrid =
        //         document.getElementsByClassName("container-grid")[0];
        //     if (containerGrid != null) {
        //         const width =
        //             containerGrid.clientWidth / this.gridColumns -
        //             this.gapGrids;
        //         this.widthGrigs = Math.floor(width * 100) / 100;
        //         console.log(this.widthGrigs);
        //     }
        //     return this.widthGrigs;
        // },
        // swatchStyle() {
        //     const color = this.colorGrids;
        //     return color;
        // },
    },
    methods: {
        defineWidth(isDesktop: boolean) {
            const widthWindow = window.innerWidth;
            let containerWidth = 0;
            let maxWidthColumn = 0;

            console.log(widthWindow);
            // if (widthWindow > 1000) {
            //     containerWidth = 1200;
            //     maxWidthColumn = 1200 / this.gridColumns;
            // }
            if (isDesktop) {
                if (widthWindow > 1000) {
                    containerWidth = 1200;
                    maxWidthColumn = containerWidth / this.gridColumns;
                }
            } else {
                containerWidth = 400;
                maxWidthColumn = containerWidth / this.gridColumns;
            }
            // console.log(this.widthGrigs);
            this.$store.dispatch(
                "environment/CHANGE_WIDTH_GRIDS",
                maxWidthColumn - this.gapGrids
            );
            this.widthGrigs =
                Math.floor((maxWidthColumn - this.gapGrids) * 100) / 100;
        },
        handlerChanged() {
            this.$store.dispatch(
                "environment/CHANGE_NUM_GRIDS",
                this.gridColumns
            );
            this.defineWidth(this.viewIsDesktop);
            this.handlerChangedWidth();
        },
        handlerChangedWidth() {
            // const containerGrid =
            //     document.getElementsByClassName("container-grid")[0];
            // if (containerGrid != null) {
            //     const width =
            //         containerGrid.clientWidth / this.gridColumns -
            //         this.gapGrids;
            //     this.widthGrigs = Math.floor(width * 100) / 100;
            // }
            const containerWidth =
                document.getElementsByClassName("main-block-area")[0];
            console.log("containerWidth", containerWidth.clientWidth);
            const widthWindow = window.innerWidth;
            let maxWidthColumn = 0;
            // if (widthWindow > 1000) {
            //     maxWidthColumn = 1200 / this.gridColumns;
            // }
            // if (containerWidth.clientWidth > 1200) {
            //     maxWidthColumn = 1200 / this.gridColumns;
            // }else if
            console.log(`макс видтх: ${maxWidthColumn} --- ${this.widthGrigs}`);
            if (this.widthGrigs <= maxWidthColumn) {
                this.$store.dispatch(
                    "environment/CHANGE_WIDTH_GRIDS",
                    this.widthGrigs
                );
                this.gapGrids =
                    Math.floor((maxWidthColumn - this.widthGrigs) * 100) / 100;
                this.$store.dispatch(
                    "environment/CHANGE_GAP_GRIDS",
                    this.gapGrids
                );
            } else {
                this.$store.dispatch(
                    "environment/CHANGE_WIDTH_GRIDS",
                    maxWidthColumn
                );
                this.$store.dispatch("environment/CHANGE_GAP_GRIDS", 0);
            }
        },

        handlerChangedGap() {
            // this.$store.dispatch("environment/CHANGE_GAP_GRIDS", this.gapGrids);
            // const widthWindow = window.innerWidth;
            // let maxWidthColumn = 0;
            // if (widthWindow > 1000) {
            //     maxWidthColumn = 1200 / this.gridColumns;
            // }
            // this.widthGrigs =
            //     Math.floor((maxWidthColumn - this.gapGrids) * 100) / 100;

            const widthWindow = window.innerWidth;
            let maxWidthColumn = 0;
            if (widthWindow > 1000) {
                maxWidthColumn = 1200 / this.gridColumns;
            }
            console.log(`макс видтх: ${maxWidthColumn} --- ${this.widthGrigs}`);
            if (this.gridColumns <= maxWidthColumn) {
                this.$store.dispatch(
                    "environment/CHANGE_GAP_GRIDS",
                    this.gapGrids
                );
                this.widthGrigs =
                    Math.floor((maxWidthColumn - this.gapGrids) * 100) / 100;
                this.$store.dispatch(
                    "environment/CHANGE_WIDTH_GRIDS",
                    this.widthGrigs
                );
            } else {
                this.$store.dispatch(
                    "environment/CHANGE_GAP_GRIDS",
                    maxWidthColumn
                );
                this.widthGrigs = 0;
                this.$store.dispatch(
                    "environment/CHANGE_WIDTH_GRIDS",
                    this.widthGrigs
                );
            }
        },
        handlerChangedColor() {
            this.$store.dispatch(
                "environment/CHANGE_COLOR_GRIDS",
                this.colorGrids
            );
        },
    },
    watch: {
        colorGrids() {
            this.$store.dispatch(
                "environment/CHANGE_COLOR_GRIDS",
                this.colorGrids
            );
        },
        gridColumns() {
            this.handlerChangedWidth();
        },
        viewIsDesktop() {
            this.defineWidth(this.viewIsDesktop);
        },
    },
});
</script>
<style scoped>
.colorpicker-btn {
    cursor: pointer;
    height: 30px;
    width: 30px;
    border-radius: 4px;
    transition: border-radius 200ms ease-in-out;
}
.v-color-picker__controls {
    font-size: 0.7rem !important;
}
.sheet-color .v-input__append {
    position: absolute;
    right: 0;
    height: 100%;
}
.sheet-color .v-input__append .v-btn {
    height: 93% !important;
}
.sheet-color .v-input {
    position: relative;
}
.label-input {
    font-size: 0.8rem;
    font-weight: 700;
}
</style>

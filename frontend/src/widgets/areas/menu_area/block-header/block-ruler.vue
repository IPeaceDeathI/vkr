<template>
    <div class="ruler-wrp">
        <v-container class="container-ruler-wrp">
            <div class="ruler-container" />
        </v-container>
        <div class="ruler" v-resize="onResize">
            <div class="ruler-marker" />
            <div class="ruler-scale ruler-scaleW" />
        </div>
        <div class="ruler-vertical" v-resize="onResize">
            <div class="ruler-marker" />
            <div class="ruler-scale ruler-scaleH" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    data() {
        return {
            startPosition: 0,
            windowSize: 0,
        };
    },
    mounted() {
        this.onResize();
        this.buildRuler();
    },

    methods: {
        onResize() {
            this.windowSize = window.innerWidth;

            const containerBlock =
                document.getElementsByClassName("ruler-container")[0]; //для отслеживания позиции контенера
            const bodyRect = containerBlock.getBoundingClientRect();

            this.startPosition = bodyRect.left;
        },
        getWidth() {
            return window.innerWidth;
        },
        buildRuler() {
            const rulerScale =
                document.getElementsByClassName("ruler-scaleW")[0];
            const step = 50; // Шаг
            const labelsCount = this.windowSize / step;

            const labels = [];
            for (let i = 0; i <= labelsCount; i++) {
                const label = document.createElement("div");
                label.className = "ruler-label";
                const itemMarker = document.createElement("div");
                itemMarker.classList.add("ruler-label-marker");
                label.setAttribute("style", "position: relative;");
                itemMarker.setAttribute(
                    "style",
                    "position: absolute;height: 4px;width: 1px;background-color: #757575;left: 0;bottom: -5px;display: block;"
                );

                let labelValue;
                let lb1 = 0 * step - this.startPosition;
                let lb2 =
                    Math.round((0 * step - this.startPosition) / step) * step;
                let lb3 = 0;
                if (lb1 < 0 && lb2 < 0) {
                    lb3 = Math.abs(lb1) - Math.abs(lb2);
                } else {
                    lb3 = 0;
                }
                labelValue =
                    Math.round((i * step - this.startPosition) / step) * step;

                label.style.width = `49px`;
                label.textContent = String(labelValue);
                label.appendChild(itemMarker);
                labels.push(label);
                rulerScale.setAttribute("style", `left:${lb3}px;`);
            }
            rulerScale.append(...labels);

            // vertical
            const rulerScaleH =
                document.getElementsByClassName("ruler-scaleH")[0];
            const labelsCountV = this.windowSize / step;
            const labelsV = [];
            for (let i = 0; i <= labelsCountV; i++) {
                const labelV = document.createElement("div");
                labelV.className = "ruler-labelV";

                let labelValueV;
                labelValueV = Math.round((i * step) / step) * step;
                // labelV.style.height = `49px`;

                const itemMarkerV = document.createElement("div");
                itemMarkerV.classList.add("ruler-label-marker-height");
                labelV.setAttribute(
                    "style",
                    "position: relative;height:49px;width:22px;"
                );
                itemMarkerV.setAttribute(
                    "style",
                    "position: absolute;height: 1px;width: 4px;background-color: #757575;right: 0;"
                );

                const span = document.createElement("span");
                span.textContent = String(labelValueV);
                labelV.appendChild(itemMarkerV);
                labelV.appendChild(span);
                labelsV.push(labelV);
            }
            rulerScaleH.append(...labelsV);
        },
        handleWindowResize() {
            // Rebuild the ruler when the window is resized
            this.buildRuler();
        },
    },
    watch: {
        // windowSize() {
        //     this.buildRuler();
        // },
        // startPosition() {
        //     console.log("watch2");
        //     this.buildRuler();
        // },
    },
});
</script>
<style lang="scss" scoped>
.ruler {
    position: relative;
    height: 20px;
    border-top: 1px solid #757575;
    overflow-x: auto;
    color: #757575;
}

.ruler-marker {
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #757575;
    bottom: 0;
}

.ruler-scale {
    display: flex;
    justify-content: space-between;
    padding: 0;
    font-size: 9px;
    flex-wrap: wrap;
    position: absolute;
}

.ruler-label {
    // flex: 1;
    text-align: left;
    padding-top: 3px;
    position: relative;
    box-sizing: border-box;
}

.container-ruler-wrp {
    padding: 0;
}
.ruler-wrp {
    position: relative;
    z-index: 10;
    width: 100%;
}
.ruler-wrp:before {
    content: "";
    position: absolute;
    top: 1px;
    left: 0;
    width: 25px;
    height: 20px;
    background-color: rgb(255 255 255);
    display: block;
    z-index: 11;
    /* border-radius: 50%; */
    border-bottom-right-radius: 5px;
}
.ruler-vertical {
    position: absolute;
    top: 1px;
    width: 25px;
    height: 100vh;
    border-right: 1px solid #757575;
    background-color: #ffffff;
}
.ruler-scale.ruler-scaleH {
    display: block;
    right: 0;
}
.ruler-labelV:before {
    content: "";
    position: absolute;
    height: 1px;
    width: 3px;
    background-color: #757575;

    right: 0;
}
.ruler-labelV:first-child {
    opacity: 0;
}
</style>

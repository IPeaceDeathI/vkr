<template>
    <div
        :style="{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color,
            borderColor: borderColor,
        }"
        class="direction-circle"
        ref="degreePickerCircle"
        @click="clickHandle"
    >
        <div
            class="direction-arrow"
            @mousedown="handleArrow"
            :style="{ transform: 'rotate(' + degree + 'deg)' }"
        >
            <div
                class="arrow-point"
                :style="{ borderColor: borderColor, backgroundColor: dotColor }"
            ></div>
        </div>
    </div>
</template>
<script lang="ts">
import { cathetsToAngle } from "@/shared/helpers";
import { defineComponent } from "vue";
import { PropType } from "vue";
import { Color } from "vue3-colorpicker/types/utils/color";

interface Center {
    x: number;
    y: number;
}

export default defineComponent({
    props: {
        incomingDegree: {
            type: Number as PropType<string | number>,
        },
        min: {
            type: Number,
            require: true,
            default: 0,
        },
        max: {
            type: Number,
            require: true,
            default: 359,
        },
        step: {
            type: Number,
            require: true,
            default: 15,
        },
        size: {
            type: Number,
            require: true,
            default: 60,
        },
        color: {
            type: String,
            require: true,
            default: "#f2f2f2",
        },
        borderColor: {
            type: String,
            require: true,
            default: "#eaeaea",
        },
        dotColor: {
            type: String,
            require: true,
            default: "#ffffff",
        },
    },
    data() {
        return {
            degree: 0 as number | string,
            center: { x: 0, y: 0 } as Center,
        };
    },
    emits: {
        "on-input": function (value: number) {
            return true;
        },
        "on-change": function (value: number) {
            return true;
        },
    },
    computed: {
        steps() {
            const steps = [];
            for (
                let i = 1;
                i <= Math.floor((this.max - this.min) / this.step);
                i++
            ) {
                steps.push((i - 1) * this.step);
            }
            return steps;
        },
    },
    methods: {
        getCircleCenter() {
            const circle = this.$refs.degreePickerCircle as HTMLDivElement;
            const centerX =
                circle.getBoundingClientRect().left + circle.offsetWidth / 2;
            const centerY =
                circle.getBoundingClientRect().top + circle.offsetHeight / 2;
            this.center = { x: centerX, y: centerY };
        },
        arrowHandler(e: MouseEvent) {
            const x = e.x - this.center.x;
            const y = e.y - this.center.y;

            const degree = cathetsToAngle(x, y);

            this.degree = this.steps.reduce(function (prev, curr) {
                return Math.abs(curr - degree) < Math.abs(prev - degree)
                    ? curr
                    : prev;
            });
            this.$emit("on-input", this.degree);
        },
        handleArrow() {
            this.getCircleCenter();
            document.addEventListener("mousemove", this.arrowHandler);
            document.addEventListener("mouseup", this.moseupHandle);
        },
        clearHandle() {
            document.removeEventListener("mousemove", this.arrowHandler);
            document.removeEventListener("mouseup", this.moseupHandle);
        },
        moseupHandle(e: MouseEvent) {
            this.$emit("on-change", Number(this.degree));
            this.clearHandle();
        },
        clickHandle(e: MouseEvent) {
            this.getCircleCenter();
            this.arrowHandler(e);
            this.$emit("on-change", Number(this.degree));
        },
    },
    watch: {
        incomingDegree() {
            if (this.incomingDegree) {
                this.degree = this.incomingDegree;
            }
        },
    },
    mounted() {
        this.incomingDegree ? (this.degree = this.incomingDegree) : this.degree;
    },
});
</script>
<style lang="scss" scoped>
.direction-circle {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.03);
    user-select: none;
    cursor: pointer !important;
}
.direction-arrow {
    position: absolute;
    height: 100%;
    width: 10px;
    left: 50%;
    top: 0;
    margin-left: -5px;
    pointer-events: none;
    z-index: 2;
    transition: transform 0.1s ease;
    will-change: transform;
}
.arrow-point {
    position: absolute;
    height: 10px;
    width: 10px;
    top: 3px;
    left: 0;
    border-radius: 50%;
    background-color: #fff;
    border: 2px solid rgba(0, 0, 0, 0.1);
    pointer-events: all;
    transition: top 0.2s ease;
    transform: 0.2s ease;
    cursor: pointer;
}
</style>

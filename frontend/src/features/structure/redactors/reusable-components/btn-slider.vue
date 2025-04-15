<template>
    <v-slider v-model="sliderVal" @start="sliderOnStart" @end="sliderOnStop">
        <template v-slot:append>
            <slot name="append"></slot>
        </template>
    </v-slider>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    emits: {
        "update:modelValue": (value: number) => true,
        onChange: (value: number) => true,
    },
    props: {
        modelValue: { type: Number, required: true },
    },
    methods: {
        sliderOnStop(val: number) {
            this.sliderLastVal = val;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        },
        sliderOnStart() {
            const watcherForValue = () => {
                if (this.sliderVal !== this.sliderLastVal) {
                    if (this.sliderVal === this.sliderStopVal) {
                        this.sliderLastVal = this.sliderVal;
                    } else {
                        this.sliderStopVal = this.sliderVal;
                    }
                }
            };
            this.intervalId = setInterval(watcherForValue, 200);
        },
    },
    data() {
        return {
            sliderStopVal: 0 as number,
            lastEmit: 99999999999 as number,
            intervalId: undefined as undefined | number,
        };
    },
    computed: {
        sliderLastVal: {
            get() {
                return this.lastEmit;
            },
            set(value: number) {
                this.lastEmit = value;
                this.$emit("onChange", value);
            },
        },
        sliderVal: {
            get() {
                return this.modelValue;
            },
            set(value: number) {
                this.$emit("update:modelValue", value);
            },
        },
    },
    // watch: {
    //     sliderVal(val) {
    //         const now = Date.now();
    //         if (now - this.time >= 200) {
    //             this.time = now;
    //             this.$emit("update:modelValue", this.sliderVal);
    //             console.log(val);
    //         }
    //     },
    // },
});
</script>
<style lang="scss" scoped></style>

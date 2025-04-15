<template>
    <div class="form-field-range">
        <div
            v-if="showValueType !== 'hidden'"
            class="range-legend"
            :class="showValueType"
            :data-type="showValueType"
            :data-text="showValueType === 'limits' ? 1 : undefined"
            :data-count="showValueType === 'complex' ? stepCounts : undefined"
        >
            <template v-if="showValueType === 'limits'">
                <div class="legend-point from" :data-value="from">
                    {{ extremeDescEnable ? extremeLeft : from }}
                </div>
                <div class="legend-point to" :data-value="to">
                    {{ extremeDescEnable ? extremeRight : to }}
                </div>
            </template>
            <template v-else>
                <div class="range-legend-inner">
                    <div class="legend-point from" :data-value="from">
                        {{ from }}
                    </div>
                    <div
                        v-for="val in stepCounts - 1"
                        :key="val"
                        class="legend-point"
                        :data-value="val * showstep"
                    >
                        {{ val * showstep }}
                    </div>
                    <div class="legend-point to" :data-value="to">
                        {{ to }}
                    </div>
                </div>
            </template>
        </div>
        <div
            class="range-outer animated"
            :data-double="enableRange ? 1 : undefined"
            :data-start="from"
            :data-end="to"
            :data-step="step"
        >
            <div class="range-area">
                <div
                    class="range-value"
                    style="margin-left: 0%"
                    :style="{ width: enableRange ? '100%' : '0%' }"
                >
                    <div
                        v-if="enableRange"
                        class="range-runner range-runner-left"
                        tabindex="0"
                        :data-value="from"
                    >
                        <div
                            class="runner-tip"
                            style="transform: translateX(0px)"
                        >
                            <span v-if="enableUnit" class="prefix">{{
                                unitPrefix
                            }}</span>
                            <span class="value">{{ from }}</span>
                            <span v-if="enableUnit" class="suffix">{{
                                unitSuffix
                            }}</span>
                        </div>
                    </div>
                    <div
                        class="range-runner range-runner-right"
                        tabindex="0"
                        :data-value="to"
                    >
                        <div
                            class="runner-tip"
                            style="transform: translateX(0px)"
                        >
                            <span v-if="enableUnit" class="prefix">{{
                                unitPrefix
                            }}</span>
                            <span class="value">{{
                                enableRange ? to : from
                            }}</span>
                            <span v-if="enableUnit" class="suffix">{{
                                unitSuffix
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <input
                type="text"
                name="slider"
                class="form-field-range__input"
                :data-value="from + ' - ' + to"
            />
        </div>
        <desc-c :desc="commonFieldParams.description" />
        <title-c
            :fieldId="id"
            :title="commonFieldParams.title"
            :required="commonFieldParams.required"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import mixin from "./mixin";
import { SliderFieldParams } from "@/types";
import { FormManager } from "@/shared/services";
export default defineComponent({
    mixins: [mixin],
    computed: {
        sliderParams(): SliderFieldParams {
            return FormManager.getFieldSliderParamsById(
                this.formParams,
                this.id
            );
        },
        from() {
            return this.sliderParams.from;
        },
        to() {
            return this.sliderParams.to;
        },
        step() {
            return this.sliderParams.step;
        },
        showValueType(): "hidden" | "limits" | "complex" {
            return this.sliderParams.showValue.type;
        },
        extremeDescEnable(): boolean {
            return this.sliderParams.showValue.extremeParams
                .enableTextDescription;
        },
        extremeLeft(): string {
            return this.sliderParams.showValue.extremeParams.left;
        },
        extremeRight(): string {
            return this.sliderParams.showValue.extremeParams.right;
        },
        unitPrefix(): string {
            return this.sliderParams.unit.prefix;
        },
        unitSuffix(): string {
            return this.sliderParams.unit.suffix;
        },
        showstep(): number {
            return Math.round((this.to - this.from) / this.stepCounts);
        },
        stepCounts(): number {
            const count = Math.round((this.to - this.from) / this.step);
            return count < 11 ? count : 10;
        },
        enableUnit(): boolean {
            return this.sliderParams.unit.enable;
        },
        enableRange(): boolean {
            return this.sliderParams.enableRange;
        },
    },
});
</script>
<style lang="scss" scoped></style>

<template>
    <div class="button-overlay">
        <button class="buttton-main" v-bind="attributes">
            <a class="button-link" />
            <div class="button-сontent">
                <div class="button-icon">
                    <svg viewBox="0 0 24 24">
                        <use :href="iconPath" />
                    </svg>
                </div>
                <div class="button-text">{{ text }}</div>
            </div>
            <div class="button-loading-container">
                <svg
                    id="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    style="margin: auto; display: block; shape-rendering: auto"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                >
                    <circle
                        cx="50"
                        cy="50"
                        fill="none"
                        stroke="var(--text-color)"
                        stroke-width="10"
                        r="35"
                        stroke-dasharray="164.93361431346415 56.97787143782138"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            repeatCount="indefinite"
                            dur="1s"
                            values="0 50 50;360 50 50"
                            keyTimes="0;1"
                        ></animateTransform>
                    </circle>
                </svg>
            </div>
            <div class="button-border" />
            <div class="button-bg-fill" />
            <div class="button-shadow" />
        </button>
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";
import {
    ActionTypes,
    EventTypes,
    Events,
    GoalsParams,
    ItemButtonStylesParams,
} from "@/types";
import { PublishTargetAttributes } from "@/publish";
import { getDefaultGoalsParams } from "@/shared/services/elements_fabrics";
import { collectMetricsAttr } from "@/shared/services/metric";

export default defineComponent({
    props: {
        buttonStyles: {
            type: Object as PropType<ItemButtonStylesParams>,
            required: true,
        },
        buttonSettings: {
            type: Object as PropType<{
                events: Events<EventTypes.onclick>;
                goals?: GoalsParams;
            }>,
        },
        text: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            loadingPath: `${process.env.BASE_URL}/svg/animated/rolling.svg#icon`,
        };
    },
    computed: {
        iconPath: function (): string {
            return this.buttonStyles.icon.path;
        },
        attributes():
            | {
                  [PublishTargetAttributes.actionType]: ActionTypes;
                  [PublishTargetAttributes.eventType]: string;
                  [PublishTargetAttributes.actionValue]: any;
                  [PublishTargetAttributes.metricsClick]: string;
              }
            | undefined {
            if (this.buttonSettings === undefined) return;
            const event = this.buttonSettings.events[0];

            const actionType = Object.keys(event.onclick)[0] as ActionTypes;

            const goals = this.buttonSettings.goals ?? getDefaultGoalsParams();
            const goalAttr = collectMetricsAttr(
                goals,
                PublishTargetAttributes.metricsClick
            );
            return {
                [PublishTargetAttributes.actionType]: actionType,
                [PublishTargetAttributes.eventType]: Object.keys(event)[0],

                [PublishTargetAttributes.actionValue]:
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    event.onclick[actionType],
                ...goalAttr,
            };
        },
    },
});
</script>

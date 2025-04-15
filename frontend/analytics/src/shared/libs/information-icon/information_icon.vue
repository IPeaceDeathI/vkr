<template>
    <span>
        <v-icon :size="size" style="cursor: pointer" :icon="type" />

        <v-tooltip
            activator="parent"
            :text="information"
            :location="lacation"
            open-delay="300"
            max-width="300"
        />
    </span>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { InformationIconType, InformationIconLocation } from "./types";
export default defineComponent({
    name: "information-icon",
    props: {
        size: {
            type: String,
            default: "medium",
        },
        information: {
            type: String,
            default: "Информация",
        },
        type: {
            type: String as PropType<InformationIconType>,
            default: InformationIconType.info,
        },
        color: {
            type: String,
            default: "",
        },
        lacation: {
            type: String as PropType<InformationIconLocation>,
            default: InformationIconLocation.top,
        },
    },
});
</script>

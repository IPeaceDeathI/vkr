<template>
    <v-tooltip :text="information" :location="lacation" open-delay="300">
        <template v-slot:activator="{ props }">
            <v-icon
                :size="size"
                :color="color"
                style="cursor: pointer"
                v-bind="props"
                >{{ type }}</v-icon
            >
        </template>
    </v-tooltip>
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
            default: "secondary-lighten-2",
        },
        lacation: {
            type: String as PropType<InformationIconLocation>,
            default: InformationIconLocation.top,
        },
    },
});
</script>

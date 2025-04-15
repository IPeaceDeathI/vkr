<template>
    <v-input :class="'pb-2 text-subtitle-2' + classProp" :color="color">
        <slot />
        <div v-if="hint" class="ml-1 d-flex align-center">
            <information-icon
                :type="InformationIconType.question"
                :information="hint"
                :max-width="maxWidth ?? '500px'"
            />
        </div>
    </v-input>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
    informationIcon,
    InformationIconType,
} from "@/shared/libs/information-icon";
export default defineComponent({
    name: "redactor-component-title",
    props: {
        classProp: {
            type: String,
            default: "",
        },
        color: String,
        hint: String,
        maxWidth: String,
    },
    components: {
        informationIcon,
    },
    data() {
        return {
            InformationIconType: InformationIconType,
        };
    },
});
</script>
<style lang="scss"></style>

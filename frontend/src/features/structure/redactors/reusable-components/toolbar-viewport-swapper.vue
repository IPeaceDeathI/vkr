<template>
    <v-btn-toggle :model-value="model" color="editor" mandatory>
        <v-btn
            :value="'desktop'"
            min-width="40px"
            @click="
                $store.dispatch('environment/SET_DESKTOP_VIEWPORT', undefined)
            "
            ><v-icon size="18">mdi-monitor</v-icon></v-btn
        >
        <v-btn
            :value="'mobile'"
            min-width="40px"
            @click="
                $store.dispatch('environment/SET_MOBILE_VIEWPORT', undefined)
            "
            ><v-icon size="18">mdi-cellphone</v-icon></v-btn
        >
    </v-btn-toggle>
</template>
<script lang="ts">
type Viewport = "mobile" | "desktop";
import { PropType, defineComponent } from "vue";
export default defineComponent({
    computed: {
        model() {
            return this.$store.getters["environment/isDesktopViewport"]
                ? "desktop"
                : "mobile";
        },
    },
});
</script>
<style lang="scss" scoped></style>

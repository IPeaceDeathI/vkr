<template>
    <fontsStyle />
    <div class="styles-container" id="styles-container"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { fontsLink } from "@/entities";
import { cssVariable } from "@/shared/constants/default_values";
import fontsStyle from "./fonts-style.vue";
export default defineComponent({
    components: {
        fontsStyle,
    },
    computed: {
        elements: function (): IterableIterator<string> {
            return this.$store.getters["structure/getElementIds"];
        },

        constructorFonts(): string {
            const str = `body{${cssVariable.fontHeader1}:${this.$store.getters["environment/pageFonts"].header1};
            ${cssVariable.fontHeader2}:${this.$store.getters["environment/pageFonts"].header2};
            ${cssVariable.fontQuote}:${this.$store.getters["environment/pageFonts"].quote};${cssVariable.fontText}:${this.$store.getters["environment/pageFonts"].text};}`;
            return str;
        },
        fontsInclude(): string {
            return fontsLink(this.$store);
        },
    },
});
</script>

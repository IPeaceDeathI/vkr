<template>
    <div class="font-style-container">
        <component :is="'style'">
            {{ fontsInclude }}
            {{ constructorFonts }}
        </component>
    </div>
</template>
<script lang="ts">
import { fontsLink } from "@/entities";
import { cssVariable } from "@/shared/constants/default_values";
import { defineComponent } from "vue";
export default defineComponent({
    computed: {
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

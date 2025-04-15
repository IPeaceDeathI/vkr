<template>
    <v-card>
        <v-card-title class="pb-1"> Подделиться ссылкой </v-card-title>
        <v-card-subtitle style="opacity: 1">
            <slot name="subtitle" />
            <div
                class="ya-share2"
                data-size="l"
                :data-title="yaTitle"
                :data-description="yaDesc"
                :data-url="url"
                data-shape="round"
                data-services="vkontakte,odnoklassniki,telegram,viber,whatsapp,skype"
            />
        </v-card-subtitle>
        <v-card-actions>
            <v-text-field
                variant="outlined"
                density="compact"
                readonly
                :model-value="url"
            >
                <template v-if="canCopy" v-slot:append-inner>
                    <v-btn
                        @click="copy"
                        icon="mdi-content-copy"
                        color="editor"
                        variant="flat"
                        size="x-small"
                    />
                </template>
            </v-text-field>
        </v-card-actions>
    </v-card>
    <component
        :is="'script'"
        src="https://yastatic.net/share2/share.js"
    ></component>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        url: {
            type: String,
            required: true,
        },
        yaTitle: {
            type: String,
            default: "Ссылка",
        },
        yaDesc: {
            type: String,
            default: "",
        },
    },
    emits: {
        onCopy: () => true,
    },
    data() {
        return {
            canCopy: !!navigator.clipboard,
        };
    },
    methods: {
        copy() {
            navigator.clipboard.writeText(this.url).then(() => {
                this.$emit("onCopy");
            });
        },
    },
});
</script>
<style lang="scss" scoped></style>

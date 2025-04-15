<template>
    <div>
        <div class="mb-2">
            <v-icon size="small" color="sucsess" class="ml-1 mr-1"
                >{{ icon }} </v-icon
            >{{ name }}
        </div>
        <v-sheet class="d-flex justify-center" style="flex-wrap: wrap">
            <block-preview
                v-for="block in blocks"
                :key="block?.id"
                :src="block?.preview_src"
                :id="block?.id"
                :editable="$store.getters['user/getIsAdmin']"
                @blockSelected="selectBlock"
            >
            </block-preview>
        </v-sheet>
        <v-divider :thickness="60" class="border-opacity-0"></v-divider>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import blockPreview from "./block-preview.vue";
import { ShortBlockData } from "@/shared/api/models";

export default defineComponent({
    components: {
        blockPreview,
    },
    props: {
        icon: String,
        name: String,
        index: {
            type: Number,
            required: true,
        },
        observable: {
            type: Boolean,
        },
        blocks: {
            type: Array as PropType<Array<ShortBlockData>>,
            required: true,
        },
    },
    emits: {
        blockSelected(value: number) {
            return true;
        },
        categoryScrolled(value: number) {
            return true;
        },
        categoryIntoView(value: number) {
            return true;
        },
    },
    methods: {
        selectBlock(value: number) {
            this.$emit("blockSelected", value);
        },
        changeCallBack: function (enteries: any, observer: any) {
            enteries.forEach((entery: any) => {
                if (entery.isIntersecting && this.observable) {
                    this.$emit("categoryScrolled", this.index);
                }
            });
        },
        intoViewCallBack(enteries: any, observer: any) {
            enteries.forEach((entery: any) => {
                if (entery.isIntersecting) {
                    this.$emit("categoryIntoView", this.index);
                }
            });
        },
    },
    mounted() {
        const optionsChange = {
            root: document.querySelector("[data-noks-interSection]"),
            threshold: 0,
            rootMargin: "0px 0px -95% 0px",
        };
        const optionsIntoView = {
            root: document.querySelector("[data-noks-interSection]"),
            threshold: 0,
            rootMargin: "0px 0px 0px 0px",
        };
        const observerChange = new IntersectionObserver(
            this.changeCallBack,
            optionsChange
        );
        const observerIntoView = new IntersectionObserver(
            this.intoViewCallBack,
            optionsIntoView
        );
        this.$nextTick(function () {
            const target = this.$el;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            observerChange.observe(target);
            observerIntoView.observe(target);
        });
    },
});
</script>
<style></style>

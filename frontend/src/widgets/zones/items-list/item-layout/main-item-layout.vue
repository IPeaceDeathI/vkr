<template>
    <div :class="params.type">
        <div
            class="item-layout"
            :class="{
                select: selected,
                'hide-controls': hasOpenedRedactor,
            }"
            :data-el-id="id"
            v-click-outside="{
                handler: onClickOutside,
                closeConditional: onCloseConditional,
            }"
        >
            <slot
                v-if="$store.getters['environment/isEditable']"
                name="controls"
                :selected="selected"
            />
            <div class="item-container">
                <component
                    ref="itemRef"
                    :is="params.type"
                    :id="id"
                    :item-params="params"
                    @add-item="$emit('addItem', $event)"
                />
                <slot name="item-container-append" :selected="selected" />
            </div>
            <template v-if="selected">
                <slot
                    v-if="$store.getters['environment/isEditable']"
                    name="isSelected"
                />
            </template>
            <slot
                v-if="$store.getters['environment/isEditable']"
                name="overlay-editor"
                :selected="selected"
                :setSelected="setSelected"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { SlotsType, defineComponent } from "vue";
import itemButton from "@/widgets/items/base/item-button.vue";
import itemImage from "@/widgets/items/base/item-image.vue";
import itemText from "@/widgets/items/base/item-text.vue";
import itemIcon from "@/widgets/items/base/item-icon.vue";
import itemForm from "@/widgets/items/base/item-form.vue";
import itemIconText from "@/widgets/items/base/item-icon-text.vue";
import itemQuiz from "@/widgets/items/base/item-quiz.vue";
import itemNavmenu from "@/widgets/items/base/item-navmenu.vue";
import itemHeaderDivider from "@/widgets/items/base/item-header-divider.vue";
import { ItemBundle, ItemParams } from "@/types";
import { PropType } from "vue";
export default defineComponent({
    props: {
        id: {
            type: String,
            required: true,
        },
        params: {
            type: Object as PropType<Omit<ItemParams, "parentId">>,
            required: true,
        },
    },
    emits: {
        addItem: (bundle: ItemBundle) => true,
    },
    slots: Object as SlotsType<{
        controls: { selected: boolean };
        "item-container-append": { selected: boolean };
        isSelected: undefined;
        "overlay-editor": {
            selected: boolean;
            setSelected: (value: boolean) => void;
        };
    }>,
    data() {
        return {
            menuIsOpen: false,
            selected: false,
        };
    },
    components: {
        itemButton,
        itemImage,
        itemText,
        itemIcon,
        itemForm,
        itemQuiz,
        itemIconText,
        itemNavmenu,
        itemHeaderDivider,
    },
    computed: {
        hasOpenedRedactor: function (): boolean {
            return this.$store.getters[
                "environment/getOpenedRedators"
            ].includes(this.id);
        },
    },
    methods: {
        onClickOutside(event: MouseEvent) {
            this.selected = false;
        },
        onCloseConditional(): boolean {
            return !this.hasOpenedRedactor;
        },
        changeMenuState(state: boolean) {
            this.menuIsOpen = state;
        },
        setSelected(value: boolean) {
            this.selected = value;
        },
        getMeAsBundle() {
            //OPTIMIZATION сделать подробнеую ошибку через WarningError, если getMeAsBundle не найдено
            const item = this.$refs.itemRef as any;
            return item.getMeAsBundle();
        },
    },
});
</script>

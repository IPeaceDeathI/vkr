<template>
    <draggable-card v-model="show" width="560px" height="255px">
        <redactor-toolbar
            v-model="Tabs"
            :toggle-btns="tabsBtn"
            :view-port-swapper="Tabs === 'styles'"
            @close-click="$emit('update:modelValue', false)"
        />
        <v-redactor-container>
            <items-redactor v-if="Tabs === 'items'" v-model="menuItems" />
            <template v-else-if="Tabs === 'styles'">
                <styles-redactor
                    v-model="menuStyles"
                    @change:model-value="changeMenuStyles"
                />
                <mobile-styles-redactor
                    v-model="mobileMenuStyles"
                    :parent-is-block-header="parentIsBlockHeader"
                    @change:model-value="changeMobileMenuStyles"
                />
            </template>
        </v-redactor-container>
    </draggable-card>
</template>
<script setup lang="ts">
import {
    redactorToolbar,
    draggableCard,
} from "@/features/structure/redactors/reusable-components";
import itemsRedactor from "./_items-redactor.vue";
import stylesRedactor from "./_styles-redactor.vue";
import mobileStylesRedactor from "./_mobile-styles-redactor.vue";
import {
    ItemMenuParams,
    MenuItem,
    MenuStyle,
    MenuMobileStyle,
    ElementTypes,
    ZoneTypes,
} from "@/types";
import { defineProps, defineEmits, toRefs, shallowRef, computed } from "vue";
import { useStore } from "vuex";

//typing
type Props = {
    modelValue: boolean;
    params: ItemMenuParams;
};

type Emits = {
    onChange: [value: ItemMenuParams];
    "update:modelValue": [value: boolean];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const store = useStore();

//item menu params
const { params, modelValue } = toRefs(props);

//OPTIMIZATION Придумать кау это узнамвать (скорее всего provide inject)
const parentIsBlockHeader = computed<boolean>(() => {
    return false;
});

const menuItems = computed<Array<MenuItem>>({
    get() {
        return params.value.items;
    },
    set(value: Array<MenuItem>) {
        emit("onChange", { ...params.value, items: value });
    },
});

const menuStyles = computed<MenuStyle>({
    get() {
        return params.value.style;
    },
    set(value: MenuStyle) {
        emit("onChange", { ...params.value, style: value });
    },
});

const mobileMenuStyles = computed<MenuMobileStyle>({
    get() {
        return params.value.style.mobile;
    },
    set(value: MenuMobileStyle) {
        params.value.style.mobile = value;
        emit("onChange", {
            ...params.value,
            style: { ...params.value.style, mobile: value },
        });
    },
});

const changeMenuStyles = function (value: MenuStyle) {
    menuStyles.value = value;
};

const changeMobileMenuStyles = function (value: MenuMobileStyle) {
    menuStyles.value.mobile = value;
};

//model value
const show = computed<boolean>({
    get() {
        return modelValue.value;
    },
    set(value: boolean): void {
        emit("update:modelValue", value);
    },
});

//переменные для рабоиы с template
const Tabs = shallowRef<string>("items");
const tabsBtn = shallowRef([
    { value: "items", text: "Пункты" },
    { value: "styles", text: "Стиль" },
]);
</script>
<style lang="scss" scoped></style>

<template>
    <v-btn
        v-if="isEmpty"
        class="w-100 empty"
        height="37"
        @click="$emit('add')"
        rounded="xl"
        variant="tonal"
    >
        <v-icon>mdi-plus</v-icon>
        <v-tooltip activator="parent" location="top">Вставить поле</v-tooltip>
    </v-btn>
    <v-toolbar
        v-else
        class="w-100"
        height="37"
        rounded="xl"
        @click="$emit('showRedactor')"
    >
        <div class="ml-3 mr-1">
            <v-icon size="small">{{ icon }} </v-icon>
            <v-tooltip
                v-if="size === 'default'"
                activator="parent"
                location="left"
            >
                {{ name }}
            </v-tooltip>
        </div>
        <input
            v-if="size === 'default'"
            type="text"
            class="text-body-2 feild-ceil-input"
            @click.stop=""
            v-model="title"
        />
        <div v-else class="text-body-2" style="overflow: hidden">
            {{ name }}
        </div>
        <v-spacer />
        <v-btn @click.stop="$emit('showRedactor')" icon size="x-small">
            <v-icon>mdi-cog</v-icon>
            <v-tooltip activator="parent">Настроить</v-tooltip>
        </v-btn>
        <v-btn
            @click.stop="$emit('remove')"
            icon
            size="x-small"
            style="margin-inline-end: 5px"
        >
            <v-icon>mdi-delete</v-icon>
            <v-tooltip activator="parent">Удалить</v-tooltip>
        </v-btn>
    </v-toolbar>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, computed, toRefs, withDefaults } from "vue";

//typing
type Props = {
    isEmpty?: boolean;
    icon?: string;
    name?: string;
    fieldTitle?: string;
    size?: "default" | "compact";
};

const props = withDefaults(defineProps<Props>(), {
    isEmpty: false,
    fieldTitle: "",
    size: "default",
}); // "глобальная" переменная для пропсов потом в блоках ее деструктуризуем

const emit = defineEmits([
    "update:fieldTitle",
    "showRedactor",
    "remove",
    "add",
]); //defineEmits<Emits>(); // "глобальная" переменная для эмитов

//Блок работающий с fieldTitle
const { fieldTitle } = toRefs(props);
const title = computed<string>({
    get() {
        return fieldTitle.value;
    },
    set(value: string) {
        emit("update:fieldTitle", value);
    },
});
</script>
<style lang="scss" scoped>
.empty {
    background-color: rgb(238, 238, 238);
    &::v-deep(.v-btn__underlay, .v-btn__overlay) {
        background-color: rgb(238, 238, 238);
    }
}
.feild-ceil-input {
    width: 100%;
    height: 100%;
    &:focus {
        outline: none !important;
    }
}
</style>

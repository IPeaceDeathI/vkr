<template>
    <div>
        <v-switch :label="label" v-model="model" class="pb-2" />
    </div>
    <div v-if="model">
        <v-text-field type="number" v-model="value" class="text-field">
            <template v-slot:append-inner>
                <v-btn variant="tonal" class="text-subtitle-1"
                    >{{ selectedUnit }}
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item-title
                                class="menu-item"
                                v-for="unitVal in units"
                                :key="unitVal"
                                @click="selectedUnit = unitVal"
                            >
                                {{ unitVal }}
                            </v-list-item-title>
                        </v-list>
                    </v-menu>
                </v-btn>
            </template>
        </v-text-field>
    </div>
</template>
<script lang="ts">
import { PropType } from "vue";
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        modelValue: Boolean,
        numberValue: {
            type: Number,
            required: true,
        },
        units: {
            type: Array as PropType<Array<string>>,
        },
        unit: {
            type: String,
        },
        label: String,
    },
    emits: {
        "update:modelValue": (value: boolean) => true,
        "update:numberValue": (value: number) => true,
        "update:unit": (value: string) => true,
    },
    computed: {
        model: {
            get(): boolean {
                return this.modelValue;
            },
            set(value: boolean) {
                this.$emit("update:modelValue", value);
            },
        },
        value: {
            get(): number {
                return this.numberValue;
            },
            set(value: number) {
                this.$emit("update:numberValue", value);
            },
        },
        selectedUnit: {
            get(): string | undefined {
                return this.unit;
            },
            set(value: string) {
                this.$emit("update:unit", value);
            },
        },
    },
});
</script>
<style lang="scss" scoped>
@import "@/shared/constants/index.scss";
.menu-item {
    text-align: center;
    cursor: pointer;
    &:hover {
        background-color: $theme-primary-darken-1;
    }
}
.text-field::v-deep .v-field.v-field--appended {
    padding-inline-end: 3px;
}
</style>

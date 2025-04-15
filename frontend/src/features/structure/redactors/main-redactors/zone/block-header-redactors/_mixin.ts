import colorEditor from "@/shared/vuetify/components/color-editor.vue";
import { BlockHeaderParams, Color, HeaderRows } from "@/types";
import {
    draggableInnerCard,
    redactorToolbar,
} from "../../../reusable-components";
import { defineComponent, PropType } from "vue";

export default defineComponent({
    components: {
        colorEditor,
        draggableInnerCard,
        redactorToolbar,
    },
    props: {
        id: {
            // eslint-disable-next-line no-undef
            type: String as PropType<id>,
            required: true,
        },
        modelValue: {
            type: Boolean,
        },
    },
    emits: {
        "update:model-value": function (val: boolean) {
            return true;
        },
    },
    data() {
        return {
            customPaddings: false,
            maxBlur: 50,
            maxPadding: 80,
        };
    },
    computed: {
        show: {
            get() {
                return this.modelValue;
            },
            set(value: boolean) {
                this.$emit("update:model-value", value);
            },
        },
        headerParams: function (): BlockHeaderParams {
            return this.$store.getters[
                "structure/zones/getBlockHeaderParamsById"
            ](this.id);
        },
        headerStyles: function () {
            return this.headerParams.headerStyles;
        },
        bgColor: {
            get(): Color {
                return this.headerStyles.isFixed.value.bgColor;
            },
            set(value: Color) {
                this.headerStyles.isFixed.value.bgColor = value;
                this.$store.dispatch(
                    "structure/blocks/ADD_BLOCK_HEADER_TO_BLOCK",
                    {
                        blockId: this.id,
                    }
                );
            },
        },
        textColor: {
            get(): Color {
                return this.headerStyles.isFixed.value.textColor;
            },
            set(value: Color) {
                this.headerStyles.isFixed.value.textColor = value;
                this.$store.dispatch(
                    "structure/blocks/ADD_BLOCK_HEADER_TO_BLOCK",
                    {
                        blockId: this.id,
                    }
                );
            },
        },
        fixedRows: {
            get(): HeaderRows {
                return this.headerStyles.isFixed.value.fixedRows;
            },
            set(value: HeaderRows) {
                this.headerStyles.isFixed.value.fixedRows = value;
                this.$store.dispatch(
                    "structure/blocks/ADD_BLOCK_HEADER_TO_BLOCK",
                    {
                        blockId: this.id,
                    }
                );
            },
        },
        blur: {
            get(): number {
                return this.headerStyles.isFixed.value.blur;
            },
            set(value: number) {
                value = this.validateInput(value, this.maxBlur);
                this.headerStyles.isFixed.value.blur = value;
                this.$store.dispatch(
                    "structure/blocks/ADD_BLOCK_HEADER_TO_BLOCK",
                    {
                        blockId: this.id,
                    }
                );
            },
        },
        paddingTop: {
            get(): string {
                return this.headerStyles.isFixed.value.paddings.top;
            },
            set(value: string) {
                value = String(
                    this.validateInput(Number(value), this.maxPadding)
                );
                this.headerStyles.isFixed.value.paddings.top = value;
                this.$store.dispatch(
                    "structure/blocks/ADD_BLOCK_HEADER_TO_BLOCK",
                    {
                        blockId: this.id,
                    }
                );
            },
        },
        paddingBottom: {
            get(): string {
                return this.headerStyles.isFixed.value.paddings.bottom;
            },
            set(value: string) {
                value = String(
                    this.validateInput(Number(value), this.maxPadding)
                );
                this.headerStyles.isFixed.value.paddings.bottom = value;
                this.$store.dispatch(
                    "structure/blocks/ADD_BLOCK_HEADER_TO_BLOCK",
                    {
                        blockId: this.id,
                    }
                );
            },
        },
        isDivider: {
            get(): boolean {
                return this.headerStyles.divider.isDivider;
            },
            set(value: boolean) {
                this.headerStyles.divider.isDivider = value;
                this.$store.dispatch(
                    "structure/blocks/ADD_BLOCK_HEADER_TO_BLOCK",
                    {
                        blockId: this.id,
                    }
                );
            },
        },
        dividerColor: {
            get(): Color {
                return this.headerStyles.divider.dividerColor;
            },
            set(value: Color) {
                this.headerStyles.divider.dividerColor = value;
                this.$store.dispatch(
                    "structure/blocks/ADD_BLOCK_HEADER_TO_BLOCK",
                    {
                        blockId: this.id,
                    }
                );
            },
        },
    },
    methods: {
        validateInput(value: number, maxValue: number, minValue = 0) {
            return !value
                ? minValue
                : value < minValue
                ? minValue
                : value > maxValue
                ? maxValue
                : value;
        },
    },
    watch: {
        customPaddings(value: boolean) {
            this.headerStyles.isFixed.value.paddings.bottom = "10";
            this.headerStyles.isFixed.value.paddings.top = "10";
            this.$store.dispatch("structure/blocks/ADD_BLOCK_HEADER_TO_BLOCK", {
                blockId: this.id,
            });
        },
    },
});

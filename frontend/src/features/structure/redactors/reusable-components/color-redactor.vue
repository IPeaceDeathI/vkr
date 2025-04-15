<template>
    <div>
        <div>
            <v-switch label="Заливка" v-model="colorEnabled" />
        </div>
        <div v-if="colorEnabled" align="center" class="d-flex pt-2 pl-0">
            <color-editor v-model:model-value="btnColor" :auto-color="false" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Color } from "@/types";
import { PropType } from "vue";
import colorEditor from "@/shared/vuetify/components/color-editor.vue";
export default defineComponent({
    props: {
        isFilled: Boolean,
        color: {
            type: String as PropType<Color>,
            required: true,
        },
    },
    components: {
        colorEditor,
    },
    emits: {
        "update:is-filled": function (value: boolean) {
            return true;
        },
        "update:color": function (value: Color) {
            return true;
        },
    },
    data() {
        return {
            showPicker: false,
        };
    },
    computed: {
        colorEnabled: {
            get() {
                return this.isFilled;
            },
            set(value: boolean) {
                this.$emit("update:is-filled", value);
            },
        },
        btnColor: {
            get() {
                return this.color;
            },
            set(value: Color) {
                this.$emit("update:color", value);
            },
        },
    },
});
</script>
<style lang="scss" scoped></style>

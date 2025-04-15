<template>
    <div
        v-if="$store.getters['environment/isEditable']"
        class="gear-bg settings-is-active item-controls"
        @click="showRedactor = true"
    >
        <v-img class="gear" src="@/assets/images/gear.png">
            <slot :show="showRedactor" :setShow="setShow"></slot>
        </v-img>
    </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "redactor-overlay",
    props: {
        itemId: {
            // eslint-disable-next-line no-undef
            type: String as PropType<id>,
            required: true,
        },
    },
    data: function () {
        return {
            showRedactor: false,
        };
    },
    methods: {
        setShow(value: boolean) {
            this.showRedactor = value;
        },
    },
    watch: {
        showRedactor(value) {
            if (value) {
                this.$store.dispatch(
                    "environment/REDACTOR_IS_OPEN",
                    this.itemId
                );
            } else {
                this.$store.dispatch(
                    "environment/REDACTOR_IS_CLOSE",
                    this.itemId
                );
            }
        },
    },
});
</script>
<style lang="scss" scoped></style>

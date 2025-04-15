<template>
    {{ style }}
</template>

<script lang="ts">
import { PropType } from "vue";
import { defineComponent } from "vue";
import {
    getItemStyles,
    getZoneStyles,
    getBlockBodyStyles,
    getBlockStyles,
} from "@/shared/services";
import { ElementParams, ElementTypes } from "@/types";
export default defineComponent({
    props: {
        id: {
            // eslint-disable-next-line no-undef
            type: String as PropType<id>,
            required: true,
        },
    },
    data() {
        return {
            type: this.$store.getters["structure/getElementParamsById"](this.id)
                ?.type,
            test: "body{color:red;}",
        };
    },
    computed: {
        params: function (): ElementParams {
            try {
                return this.$store.getters["structure/getElementParamsById"](
                    this.id
                );
            } catch (error) {
                throw "fsddfs";
            }
        },
        style: function (): string {
            switch (this.params.type) {
                case ElementTypes.Block:
                    return getBlockStyles({
                        elementId: this.id,
                        BlockParams: this.$store.getters[
                            "structure/blocks/getBlockParamsById"
                        ](this.id),
                    });
                case ElementTypes.BlockBody:
                    return getBlockBodyStyles({
                        elementId: this.id,
                        BlockBodyParams: this.$store.getters[
                            "structure/blockBodies/getBlockBodyParamsById"
                        ](this.id),
                    });
                case ElementTypes.Zone:
                    return getZoneStyles({
                        elementId: this.id,
                        ZoneParams: this.$store.getters[
                            "structure/zones/getZoneParamsById"
                        ](this.id),
                    });
                case ElementTypes.Item:
                    return getItemStyles({
                        elementId: this.id,
                        ItemParams: this.$store.getters[
                            "structure/items/getItemParamsById"
                        ](this.id),
                    });
                default:
                    return "";
            }
        },
    },
});
</script>

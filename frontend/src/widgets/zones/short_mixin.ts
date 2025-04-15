import { defineComponent, PropType } from "vue";
import itemsList from "./items-list/items-list.vue";
import { BlockHeaderParams, CommonZoneParams, ZoneBgTypes } from "@/types";

export default defineComponent({
    components: {
        itemsList,
    },
    props: {
        id: {
            // eslint-disable-next-line no-undef
            type: String as PropType<id>,
            required: true,
        },
    },
    data() {
        return {
            wrp: this.$refs.wrp as HTMLElement,
            ZoneBgTypes: ZoneBgTypes,
        };
    },
    mounted() {
        this.wrp = this.$refs.wrp as HTMLElement;
    },
    provide() {
        return {
            zoneID: this.id,
        };
    },
    computed: {
        children: function () {
            return this.$store.getters["structure/zones/getZoneParamsById"](
                this.id
            ).childrenIds;
        },
        params: function (): CommonZoneParams {
            return this.$store.getters[
                "structure/zones/getCommonZoneParamsById"
            ](this.id);
        },
        headerParams: function (): BlockHeaderParams {
            return this.$store.getters[
                "structure/zones/getBlockHeaderParamsById"
            ](this.id);
        },
    },
});

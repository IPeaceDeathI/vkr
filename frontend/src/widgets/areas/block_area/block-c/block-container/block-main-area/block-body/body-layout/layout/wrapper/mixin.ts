import { defineComponent } from "vue";
import { dragOptions } from "@/shared/config";
interface result {
    id: id;
}
export default defineComponent({
    inject: ["blockBodyID"],
    data() {
        return {
            isMove: false,
        };
    },
    computed: {
        dragOptions() {
            return Object.assign(
                {},
                { handle: "[data-noks-drag-zone]" },
                dragOptions
            );
        },

        children: {
            get() {
                const children = this.$store.getters[
                    "structure/blockBodies/getBlockBodyParamsById"
                ](
                    // eslint-disable-next-line no-undef
                    this.blockBodyID as id
                ).childrenIds;
                const result = [];
                if (children) {
                    for (const child of children) {
                        result.push({ id: child });
                    }
                }
                return result;
            },
            set(value: Array<result>) {
                const result = [];
                for (const obj of value) {
                    result.push(obj.id);
                }
                this.$store.dispatch("structure/blockBodies/UPDATE_CHILDREN", {
                    blockBodyID: this.id,
                    children: result,
                });
            },
        },

        // eslint-disable-next-line no-undef
        id: function (): id {
            // eslint-disable-next-line no-undef
            return (this.blockBodyID as id) ?? "";
        },
    },
});

import { defineComponent } from "vue";
import itemContent from "./_item-content.vue";
export default defineComponent({
    components: {
        itemContent,
    },
    inject: ["itemId"],
    data() {
        return {
            wrp: this.$refs.wrp as HTMLElement,
        };
    },
    mounted() {
        this.wrp = this.$refs.wrp as HTMLElement;
    },
    computed: {
        id() {
            // eslint-disable-next-line no-undef
            return this.itemId as id;
        },
    },
});

import short_mixin from "./short_mixin";
import { defineComponent } from "vue";

export default defineComponent({
    inject: ["blockBodyID"],
    mixins: [short_mixin],
    computed: {
        blockbodyId: function () {
            return this.blockBodyID as id;
        },
    },
});

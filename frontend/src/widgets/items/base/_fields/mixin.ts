import { ItemFormParams } from "@/types";
import { PropType, defineComponent } from "vue";
import titleC from "./_title-c.vue";
import descC from "./_desc-c.vue";
import { FormManager } from "@/shared/services";
export default defineComponent({
    props: {
        id: {
            type: String,
            required: true,
        },
        formParams: {
            type: Object as PropType<ItemFormParams>,
            required: true,
        },
    },
    computed: {
        commonFieldParams() {
            return FormManager.getCommonFieldParamsById(
                this.formParams,
                this.id
            );
        },
    },
    components: {
        titleC,
        descC,
    },
});

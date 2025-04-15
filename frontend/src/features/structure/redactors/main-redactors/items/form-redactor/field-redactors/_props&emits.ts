// import { PropType, defineComponent } from "vue";
// export default defineComponent({
//     props: {
//         id: {
//             type: String,
//             required: true,
//         },
//         formParams: {
//             type: Object as PropType<ItemFormParams>,
//             required: true,
//         },
//     },
//     emits: {
//         onChange: () => true,
//     },
// });

import {
    CheckboxFieldParams,
    ItemFormParams,
    PhoneFieldParams,
    RadioFieldParams,
    SelectFieldParams,
    SliderFieldParams,
    TextFieldParams,
} from "@/types";

export type Props = {
    formParams: ItemFormParams;
    field_id: string;
};

export type Emits = {
    onChange: [
        value:
            | CheckboxFieldParams
            | PhoneFieldParams
            | RadioFieldParams
            | SelectFieldParams
            | SliderFieldParams
            | TextFieldParams
    ];
};

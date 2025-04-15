import { MainToolbarItem } from "./item";
import { ToolbarItemSvg } from "~/import_helper.js";
import { Modules } from "~/import_helper.js";

export var MainToolbar = {
    template: `
        <aside class="main-toolbar">
            <main-toolbar-item v-if="isAdmin"
                title="Админ"
                icon='${ToolbarItemSvg.ADMIN}'
                :attached_module=${Modules.ADMIN}
             ></main-toolbar-item>
            <main-toolbar-item
                title="Дашборд"
                icon='${ToolbarItemSvg.DASHBOARD}'
                :attached_module=${Modules.DASHBOARD}
            ></main-toolbar-item>
            <main-toolbar-item 
                title="Отчеты"
                icon='${ToolbarItemSvg.MULTI_CHANNEL_ANALYTICS}'
                :attached_module=${Modules.MULTI_CHANNEL_ANALYTICS}
            ></main-toolbar-item>
        </aside>        
    `,
    components: {
        "main-toolbar-item": MainToolbarItem,
    },
    data() {
        return {
            icon: 4242,
        };
    },
    computed: {
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        isAdmin() {
            return this.$store.getters.IS_ADMIN;
        },
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
    },
};

<template>
    <!-- TODO разобраться с цветом -->
    <div
        v-bind="attributes"
        class="w_widget widget-mobile_menu"
        data-is="widget"
        data-id="mobile_menu"
        data-w-id="MENU01"
        data-mod-id="0"
        data-contrast="dark"
        style="--background: #ffffff; --opacity: 0"
    >
        <nav
            class="mobile-navigation menu-static mobile-navigation--created header-style-panel"
            data-enabled="true"
            :data-opened="isOpened"
        >
            <div class="nav-header">
                <div class="nav-header-container">
                    <div class="nav-header-content">
                        <header-item-layout
                            v-for="contentItem in contents"
                            :key="contentItem.id"
                            :id="contentItem.id"
                            :item-bundle="contentItem.params"
                        />
                    </div>
                    <ul class="nav-header-controls" @click="clickControls">
                        <li class="nav-header-controls--burger">
                            <i></i><i></i><i></i>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="nav-menu scroller" tabindex="1">
                <div class="nav-menu-container container">
                    <div class="nav-menu-items-wrapper">
                        <div
                            class="nav-menu-item nav-menu-item--menu"
                            data-element="header_menu"
                        >
                            <header-item-layout
                                v-for="menuItem in menu"
                                :key="menuItem.id"
                                :id="menuItem.id"
                                :item-bundle="menuItem.params"
                            />
                        </div>
                        <div
                            class="nav-menu-item nav-menu-item--text"
                            data-element="header_text"
                        >
                            <header-item-layout
                                v-for="textItem in text"
                                :key="textItem.id"
                                :id="textItem.id"
                                :item-bundle="textItem.params"
                            />
                        </div>
                        <div
                            class="nav-menu-item nav-menu-item--contacts"
                            data-element="header_contacts"
                        ></div>
                        <div
                            class="nav-menu-item nav-menu-item--social"
                            data-element="header_social"
                        ></div>
                        <div
                            class="nav-menu-item nav-menu-item--lang-menu"
                            data-element="header_lang_menu"
                        ></div>
                        <div
                            class="nav-menu-item nav-menu-item--button"
                            data-element="header_button"
                        >
                            <header-item-layout
                                v-for="buttonItem in button"
                                :key="buttonItem.id"
                                :id="buttonItem.id"
                                :item-bundle="buttonItem.params"
                            />
                        </div>
                        <div
                            class="nav-menu-item nav-menu-item--html"
                            data-element="header_html"
                        ></div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { ItemBundle, ItemParams, ItemTypes, ZoneBundle } from "@/types";
import { ref, computed } from "vue";
import headerItemLayout from "@/widgets/zones/block-header/_header-item-layout.vue";
import { PublishTargetAttributes } from "@/publish/target-attributes";
import { useStore } from "vuex";

type HeaderItem = {
    id: string;
    params: ItemBundle;
};

const store = useStore();

const sortingRules = ref({
    content: [ItemTypes.image],
    menu: [ItemTypes.menu],
    text: [ItemTypes.text],
    button: [ItemTypes.button],
});

const privateIsOpened = ref(false);

const attributes = computed<{ [PublishTargetAttributes.burgerHeader]: string }>(
    () => {
        return {
            [PublishTargetAttributes.burgerHeader]: "",
        };
    }
);

const isOpened = computed(() => {
    return !store.getters["environment/isEditable"]
        ? false
        : privateIsOpened.value;
});

const clickControls = function () {
    privateIsOpened.value = !privateIsOpened.value;
};

//all header items
const headerChildren = computed<Array<HeaderItem>>(() => {
    return store.getters["structure/zones/getHeaderItems"]();
});

//items by category
const contents = computed<Array<HeaderItem>>(() => {
    if (headerChildren.value.length > 0) {
        return headerChildren.value.filter((params) => {
            return sortingRules.value.content.includes(params.params.type);
        });
    } else return [];
});

const menu = computed<Array<HeaderItem>>(() => {
    if (headerChildren.value.length > 0) {
        return headerChildren.value.filter((params) => {
            return sortingRules.value.menu.includes(params.params.type);
        });
    } else return [];
});

const text = computed<Array<HeaderItem>>(() => {
    if (headerChildren.value.length > 0) {
        return headerChildren.value.filter((params) => {
            return sortingRules.value.text.includes(params.params.type);
        });
    } else return [];
});

const button = computed<Array<HeaderItem>>(() => {
    if (headerChildren.value.length > 0) {
        return headerChildren.value.filter((params) => {
            return sortingRules.value.button.includes(params.params.type);
        });
    } else return [];
});
</script>

<style scoped></style>

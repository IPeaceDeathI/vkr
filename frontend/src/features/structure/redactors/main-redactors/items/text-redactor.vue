<template>
    <ckeditor
        :editor="editor"
        v-model="text"
        @focus="onFocus"
        @blur="onBlur"
        :config="editorConfig"
    />
    <v-row v-show="isShow" class="customToolbar elevation-8">
        <v-btn
            class="text-body-2"
            variant="text"
            rounded="0"
            @mousedown="clickCustom"
        >
            {{ translateTitle[modelValue.textType] }}
            <v-menu activator="parent" :close-on-content-click="false">
                <v-list>
                    <v-list-item
                        v-for="type in textTypeSelectors"
                        :key="type.value"
                        :prepend-icon="type.icon"
                        color="primary"
                        style="font-size: 15px !important"
                        density="compact"
                        :value="type.value"
                        @mousedown="changeType(type.value)"
                    >
                        {{ type.translateTitle }}
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-btn>
        <v-btn
            class="text-body-2"
            variant="text"
            rounded="0"
            @mousedown="clickCustom"
        >
            SEO > {{ modelValue.rootTag }}
            <v-menu activator="parent" :close-on-content-click="false">
                <v-list>
                    <v-list-item
                        v-for="tag in TextTagType"
                        :key="tag"
                        color="primary"
                        style="font-size: 15px !important"
                        density="compact"
                        :value="tag"
                        @mousedown="chageTag(tag)"
                    >
                        {{ tag }}</v-list-item
                    >
                </v-list>
            </v-menu>
        </v-btn>
        <v-btn
            class="text-body-2"
            variant="text"
            rounded="0"
            @mousedown="clickCustom"
        >
            <v-tooltip activator="parent">Параметры текста</v-tooltip>
            <v-icon>mdi-format-text</v-icon>
            <v-menu activator="parent" :close-on-content-click="false">
                <v-container class="bg-primary elevation-10">
                    <v-row>
                        <v-col class="pa-1">
                            <div class="text-caption">Положение текста</div>
                            <v-btn-toggle v-model="textAlign">
                                <v-btn
                                    @mousedown="clickCustom"
                                    :value="TextAlign.inherit"
                                >
                                    <v-tooltip activator="parent">
                                        Наследовать от зоны
                                    </v-tooltip>
                                    <v-icon>mdi-open-in-app</v-icon>
                                </v-btn>
                                <v-btn
                                    @mousedown="clickCustom"
                                    :value="TextAlign.left"
                                >
                                    <v-icon>mdi-format-align-left</v-icon>
                                </v-btn>
                                <v-btn
                                    @mousedown="clickCustom"
                                    :value="TextAlign.center"
                                >
                                    <v-icon>mdi-format-align-center</v-icon>
                                </v-btn>
                                <v-btn
                                    @mousedown="clickCustom"
                                    :value="TextAlign.right"
                                >
                                    <v-icon>mdi-format-align-right</v-icon>
                                </v-btn>
                                <v-btn
                                    @mousedown="clickCustom"
                                    :value="TextAlign.justify"
                                >
                                    <v-icon>mdi-format-align-justify</v-icon>
                                </v-btn>
                            </v-btn-toggle>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="pa-1">
                            <div class="text-caption">Размер шрифта</div>
                            <btn-slider
                                step="1"
                                @mousedown="clickCustom"
                                v-model="fontSize"
                                thumb-thumb-label
                                max="96"
                                min="8"
                            >
                                <template v-slot:append>
                                    <v-text-field
                                        @mousedown="clickCustom"
                                        v-model="fontSize"
                                        hide-details
                                        variant="solo-filled"
                                        density="compact"
                                        type="number"
                                        :style="{
                                            width: '70px',
                                            'pointer-events': 'none',
                                        }"
                                    ></v-text-field>
                                </template>
                            </btn-slider>
                        </v-col>
                    </v-row>
                </v-container>
            </v-menu>
        </v-btn>
    </v-row>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, toRefs, shallowRef, computed } from "vue";
import { InlineEditor } from "@ckeditor/ckeditor5-editor-inline";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
} from "@ckeditor/ckeditor5-basic-styles";
// import { TextType } from "@/plugins/ckeditor";
import { List } from "@ckeditor/ckeditor5-list";
import { Link } from "@ckeditor/ckeditor5-link";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { FontColor } from "@ckeditor/ckeditor5-font";
import { btnSlider } from "../../reusable-components";
import { TextParams, TextType, TextTagType, TextAlign } from "@/types";
import { TextTypeFabric } from "@/shared/services/elements_fabrics/items_fabric/_textFabric";
import { useStore } from "vuex";

//typing
type Props = {
    itemId: string;
    modelValue: TextParams;
};

type Emits = {
    "update:modelValue": [value: TextParams];
};

const translateTitle = shallowRef({
    [TextType.header]: "Заголовок",
    [TextType.subheader]: "Подзаголовок",
    [TextType.text]: "Текст",
    [TextType.quote]: "Цитата",
});

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const store = useStore();

// text params
const { itemId, modelValue } = toRefs(props);

const mouseUp = function () {
    setTimeout(() => {
        clickOnCustomToolbar.value = false;
        document.removeEventListener("mousedown", mouseUp);
    }, 0);
};

const clickCustom = function () {
    clickOnCustomToolbar.value = true;
    document.addEventListener("mouseup", mouseUp);
};

const changeType = function (value: TextType) {
    clickCustom();
    emit(
        "update:modelValue",
        Object.assign(
            { ...modelValue.value, textType: value },
            TextTypeFabric(value)
        )
    );
};

const chageTag = function (value: TextTagType) {
    clickCustom();
    emit("update:modelValue", { ...modelValue.value, rootTag: value });
};

const onFocus = function () {
    store.dispatch("environment/REDACTOR_IS_OPEN", itemId.value);
    isShow.value = true;
};

const onBlur = function (event: any, editor: InlineEditor) {
    setTimeout(() => {
        const toolbarIsVisible =
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            editor.ui.view.toolbar.element?.parentNode?.classList.contains(
                "ck-balloon-panel_visible"
            );
        if (!toolbarIsVisible) {
            store.dispatch("environment/REDACTOR_IS_CLOSE", itemId.value);
        }
        if (clickOnCustomToolbar.value) {
            editor.focus();
        } else {
            isShow.value = false;
        }
    });
};

const text = computed<string>({
    get() {
        return modelValue.value.html;
    },
    set(value: string) {
        emit("update:modelValue", { ...modelValue.value, html: value });
    },
    // watch: {
    //     text: {
    //         handler(value: string) {
    //             if (value == "") this.text = "Введите текст...";
    //         },
    //         immediate: true,
    //     },
    // },
});

const textAlign = computed<TextAlign>({
    get() {
        return modelValue.value.textAlign;
    },
    set(value: TextAlign) {
        emit("update:modelValue", { ...modelValue.value, textAlign: value });
    },
});

const fontSize = computed<number>({
    get() {
        return modelValue.value.fontSize;
    },
    set(value: number) {
        emit("update:modelValue", { ...modelValue.value, fontSize: value });
    },
});

//переменные для template
const clickOnCustomToolbar = shallowRef(false);
const hideControls = shallowRef(false);
const editor = shallowRef(InlineEditor);
const editorConfig = shallowRef({
    fillEmptyBlocks: false,
    plugins: [
        Essentials,
        Bold,
        Italic,
        Link,
        Paragraph,
        Underline,
        Strikethrough,
        List,
        FontColor,
    ],
    toolbar: {
        items: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "link",
            "|",
            "fontColor",
            "bulletedList",
            "numberedList",
        ],
    },
});
const isShow = shallowRef(false);
const customToolbarClicked = shallowRef(false);
const textTypeSelectors = shallowRef([
    {
        translateTitle: translateTitle.value[TextType.header],
        value: TextType.header,
        icon: "mdi-alpha-h",
    },
    {
        translateTitle: translateTitle.value[TextType.subheader],
        value: TextType.subheader,
        icon: "mdi-alpha-s",
    },
    {
        translateTitle: translateTitle.value[TextType.text],
        value: TextType.text,
        icon: "mdi-format-pilcrow",
    },
    {
        translateTitle: translateTitle.value[TextType.quote],
        value: TextType.quote,
        icon: "mdi-format-quote-close",
    },
]);
</script>
<style lang="scss" scoped>
.customToolbar {
    background-color: white;
    position: absolute;
    bottom: 0;
    transform: translateY(70%);
    left: 12px;
    z-index: 10000000000000;
}
</style>

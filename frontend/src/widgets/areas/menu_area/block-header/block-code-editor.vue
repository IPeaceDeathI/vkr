<template>
    <draggable-card
        class="setting-menu"
        v-model="show"
        width="890px"
        height="450px"
    >
        <redactor-toolbar
            v-model="tabCodes"
            :toggle-btns="tabsBtn"
            @close-click="clearEditor"
        />

        <v-redactor-container>
            <v-window v-model="tabCodes">
                <v-window-item value="0">
                    <v-container fluid>
                        <v-ace-editor
                            id="editor"
                            v-model:value="codeObject.html"
                            lang="html"
                            theme="monokai"
                            style="height: 300px"
                            :options="aceEditorOptions"
                            @init="editorInit"
                        />
                    </v-container>
                </v-window-item>
                <v-window-item value="1">
                    <v-container fluid>
                        <v-ace-editor
                            id="editorCss"
                            v-model:value="codeObject.css"
                            lang="css"
                            theme="monokai"
                            style="height: 300px"
                            :options="aceEditorOptions"
                            @init="editorInit"
                        />
                    </v-container>
                </v-window-item>
                <v-window-item value="2">
                    <v-container fluid>
                        <v-ace-editor
                            id="jsEditor"
                            v-model:value="codeObject.js"
                            lang="javascript"
                            theme="monokai"
                            @init="editorInit"
                            style="height: 300px"
                            :options="aceEditorOptions"
                        />
                    </v-container>
                </v-window-item>
                <v-window-item value="3">
                    <v-container fluid>
                        <div
                            class="file-upload wrp-file-upload"
                            v-if="codeObject.file.length == 0"
                        >
                            <p>Нет файлов</p>
                            <p>Загружать можно любые файлы.</p>
                            <v-col cols="12">
                                <input
                                    type="file"
                                    hidden
                                    ref="fileInput"
                                    @change="loadImage($event)"
                                />
                                <v-btn
                                    @click="chooseFile"
                                    class="text"
                                    color="editor"
                                    variant="flat"
                                    prepend-icon="mdi-upload"
                                >
                                    Загрузить

                                    <template
                                        v-if="loadFile == false"
                                        v-slot:placeholder
                                    >
                                        <div
                                            class="d-flex align-center justify-center fill-height"
                                        >
                                            <v-progress-circular
                                                color="grey-lighten-4"
                                                indeterminate
                                            />
                                        </div>
                                    </template>
                                </v-btn>
                            </v-col>
                        </div>

                        <v-row v-if="codeObject.file.length > 0" class="mb-1">
                            <v-col cols="8">
                                <div class="editorBg file-upload">
                                    Картинки, JS, CSS и другие файлы,
                                    необходимые для секции.
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <input
                                    type="file"
                                    hidden
                                    ref="fileInput"
                                    @change="loadImage($event)"
                                />
                                <v-btn
                                    @click="chooseFile"
                                    class="text"
                                    color="editor"
                                    variant="flat"
                                    prepend-icon="mdi-upload"
                                >
                                    Загрузить
                                    <template
                                        v-if="loadFile == false"
                                        v-slot:placeholder
                                    >
                                        <div
                                            class="d-flex align-center justify-center fill-height"
                                        >
                                            <v-progress-circular
                                                color="grey-lighten-4"
                                                indeterminate
                                            />
                                        </div>
                                    </template>
                                </v-btn>
                                <div class="text-center"></div>
                            </v-col>
                        </v-row>
                        <!-- mdi-language-css3 -->
                        <!-- mdi-language-javascript -->

                        <!-- fileList.length > 0 -->
                        <v-list
                            v-if="fileList"
                            lines="one"
                            style="background: transparent"
                        >
                            <v-list-item
                                v-for="(item, index) in fileList"
                                :key="index"
                                class="mb-1 item-file"
                            >
                                <template v-slot:prepend>
                                    <v-icon
                                        icon="mdi-file-image-outline"
                                    ></v-icon>
                                </template>

                                <v-list-item-title class="title-file">
                                    <div v-if="indexClick == index">
                                        {{ fileName }}
                                    </div>

                                    <div v-if="indexClick != index">
                                        {{ item.url }}
                                    </div>
                                </v-list-item-title>
                                <v-row class="btns-file">
                                    <v-col class="pr-0 pl-0 pt-0">
                                        <v-btn
                                            flat
                                            variant="text"
                                            size="small"
                                            class="btn-codes"
                                            @click="toCss(index)"
                                        >
                                            CSS
                                        </v-btn>
                                        <v-btn
                                            flat
                                            variant="text"
                                            size="small"
                                            class="btn-codes"
                                            @click="toHTML(index)"
                                            >HTML
                                        </v-btn>
                                        <v-btn
                                            flat
                                            variant="text"
                                            size="small"
                                            class="btn-codes"
                                            @click="toURL(index)"
                                            >URL
                                        </v-btn></v-col
                                    >
                                    <v-divider
                                        class="ms-1"
                                        inset
                                        vertical
                                    ></v-divider>
                                    <v-col class="pr-0 pl-0 pt-0">
                                        <v-btn
                                            flat
                                            variant="text"
                                            size="small"
                                            class="btn-codes"
                                            @click="copyStr(index)"
                                        >
                                            <v-icon size="x-small"
                                                >mdi-content-copy</v-icon
                                            >
                                        </v-btn>
                                        <v-btn
                                            flat
                                            variant="text"
                                            size="small"
                                            class="btn-codes"
                                            ><v-icon size="x-small"
                                                >mdi-delete</v-icon
                                            >
                                        </v-btn>
                                        <v-btn
                                            flat
                                            variant="text"
                                            size="small"
                                            class="btn-codes"
                                            ><v-icon size="x-small"
                                                >mdi-download</v-icon
                                            >
                                        </v-btn></v-col
                                    >
                                </v-row>
                            </v-list-item>
                        </v-list>

                        <div></div>
                    </v-container>
                </v-window-item>

                <v-container class="pb-1 pt-1">
                    <v-row justify="start">
                        <v-col cols="auto"
                            ><v-btn
                                v-if="tabCodes < 3"
                                class="text"
                                color="editor"
                                variant="flat"
                                @click="saveCodeClick"
                                >Сохранить</v-btn
                            >
                            <v-btn
                                v-if="tabCodes == 3 && fileList != undefined"
                                class="text"
                                color="editor"
                                variant="flat"
                                @click="saveCodeClick"
                                >Сохранить</v-btn
                            >
                        </v-col>
                    </v-row></v-container
                >
            </v-window>
        </v-redactor-container>
    </draggable-card>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { VAceEditor } from "vue3-ace-editor";
import "brace/mode/javascript";
import "brace/theme/monokai";

import { PostPutDataCode } from "@/shared/api/models";
import {
    draggableCard,
    redactorToolbar,
    uploadImageBtn,
} from "@/features/structure";
import { ItemImageParams } from "@/types/structure/items";

import { ImagesModel } from "@/models/Image";
import { fileListToArray } from "@/shared/helpers/helpers";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";
import { CopyPaste } from "@/entities/services";

interface fileUpload {
    name: string;
    extension: string;
    path: string;
}

interface fileStricture {
    url: string;
    css: string;
    html: string;
}

export default defineComponent({
    name: "block-code-editor",
    components: {
        draggableCard,
        redactorToolbar,
        VAceEditor,
    },
    props: {
        codeEdit: { type: Object as PropType<PostPutDataCode>, required: true },
        area: Number,
        modelValue: {
            type: Boolean,
        },
    },
    emits: {
        saveCode: (value: PostPutDataCode) => true,
        addNewCode: (value: PostPutDataCode) => true,
        "update:model-value": (value: boolean) => true,
        start: () => true,
        input: (value: string) => true,
        end: () => true,
    },
    data() {
        return {
            tabCodes: 0,
            tabsBtn: [
                { value: 0, text: "HTML", lang: "html" },
                { value: 1, text: "CSS", lang: "css" },
                { value: 2, text: "JavaScript", lang: "javascript" },
                { value: 3, text: "Файлы", lang: "" },
            ],
            editorCodes: true,
            codeObject: {
                name: "",
                html: "",
                css: "",
                js: "",
                area: 1,
                file: "",
                status: 1 as number,
                position: 1 as number,
            } as PostPutDataCode,
            aceEditorOptions: {
                useWorker: true,
                fontSize: 14,
                tabSize: 2,
            },
            codeEditOptions: {
                lang: "html",
                theme: "github",
                content: "",
            },
            urlInsertImg: require("@/assets/images/insertImage.jpg"),
            imageIsLoading: false as boolean,
            file: [] as Array<fileStricture>,
            setBgImage: "",
            // files: [] as Array<fileUpload>,
            // fileSrcList: [] as Array<string>,
            loadFile: false,
            fileSrc: "" as string,
            totalKey: "URL" as string,
            fileName: "" as string,
            indexClick: -1 as number,
        };
    },
    computed: {
        show: {
            get() {
                return this.modelValue;
            },
            set(value: boolean) {
                this.$emit("update:model-value", value);
            },
        },
        toggleFill: {
            //DEVELOP сделать сжатие и все эффекты при наведении и т.д.
            get() {
                return false;
            },
            set(value: boolean) {
                console.log(value);
            },
        },
        fileList() {
            return this.getFiles();
        },
    },
    methods: {
        copyStr(index: number) {
            console.log("copy index", index);
            console.log("this.totalKey", this.totalKey);
            if (this.fileList !== undefined) {
                if (this.totalKey == "HTML") {
                    console.log("stringCopy", this.fileList[index].html);
                    CopyPaste.copy(this.fileList[index].html);
                }
                if (this.totalKey == "CSS") {
                    console.log("stringCopy", this.fileList[index].css);
                    CopyPaste.copy(this.fileList[index].css);
                }
                if (this.totalKey == "URL") {
                    console.log("stringCopy", this.fileList[index].url);
                    CopyPaste.copy(this.fileList[index].url);
                }
            }
        },
        toCss(index: number) {
            this.indexClick = index;
            this.totalKey = "CSS";
            const arr = this.fileList;
            if (arr !== undefined) {
                return (this.fileName = arr[index].css);
            }
        },
        toURL(index: number) {
            this.indexClick = index;
            this.totalKey = "URL";
            const arr = this.fileList;
            if (arr !== undefined) {
                return (this.fileName = arr[index].url);
            }
        },
        toHTML(index: number) {
            this.indexClick = index;
            this.totalKey = "HTML";
            const arr = this.fileList;
            if (arr !== undefined) {
                return (this.fileName = arr[index].html);
            }
        },
        async uploadFile(files: any) {
            const result = await ImagesModel.getImage(fileListToArray(files));
            return result.result[0];
        },
        async loadImage(event: Event) {
            this.imageIsLoading = true;
            this.$emit("start");
            // try {
            const el = event.target as HTMLInputElement;
            if (el.files) {
                const files = el.files;
                if (files) {
                    const result = await this.uploadFile(files);
                    console.log(result);
                    this.$emit("input", result.src);
                    if (result.status == true) {
                        console.log(result.path_files);
                        this.handleFileChange(result);
                        this.loadFile = true;
                        NotificationService.common().success({
                            text: "Файл загружен",
                        });
                    }
                }
            }

            this.$emit("end");
            this.imageIsLoading = false;
        },

        chooseFile() {
            const tmp = this.$refs.fileInput as HTMLElement;
            tmp.click();
        },

        handleFileChange(itemFile: any) {
            let fileList = [];

            let file_path = itemFile.src;
            console.log("itemFile", file_path);
            const objFile = {
                url: file_path,
                css: `background-image: url("${file_path}");`,
                html: `<img src="${file_path}" alt="">`,
            } as fileStricture;
            // this.codeObject.file.push(file_path);
            // const currentFileList = this.getFiles() || [];

            // // Добавляем новый файл в список
            // currentFileList.push(objFile);

            // Обновляем состояние fileList, если это реактивное свойство

            let arrFile = [] as Array<string>;
            this.fileList?.forEach((item: any) => {
                arrFile.push(item.url);
            });
            arrFile.push(file_path);
            let file = JSON.stringify(arrFile);
            this.codeObject.file = file;
            // this.fileList?.push(objFile);
        },

        generateRandomString(length: number) {
            const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
            let result = "";
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(
                    Math.random() * characters.length
                );
                result += characters.charAt(randomIndex);
            }
            return result;
        },
        generateRandomNumber(length: number) {
            const characters = "0123456789";
            let result = "";
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(
                    Math.random() * characters.length
                );
                result += characters.charAt(randomIndex);
            }
            return +result;
        },
        clearEditor() {
            this.show = false;
        },
        editorInit() {
            require("brace/mode/html");
            require("brace/theme/twilight");
            require("brace/theme/textmate");
        },
        saveCodeClick() {
            if (
                this.codeEdit.name == "" &&
                this.codeEdit.html == "" &&
                this.codeEdit.js == "" &&
                this.codeEdit.css == ""
            ) {
                let nameString = `Code-${this.generateRandomString(13)}`;
                let arrFile = [] as Array<string>;
                this.fileList?.forEach((item: any) => {
                    arrFile.push(item.url);
                });
                let file = JSON.stringify(arrFile);

                const newCode = {
                    name: nameString,
                    html: this.codeObject.html,
                    css: this.codeObject.css,
                    js: this.codeObject.js,
                    area: this.codeObject.area,
                    file: file,
                    status: this.codeObject.status,
                    position: this.codeObject.position,
                };
                Object.assign(this.codeObject, newCode);
                console.log("save", this.codeObject);
                this.$emit("addNewCode", this.codeObject);
            } else {
                let arrFile = [] as Array<string>;
                this.fileList?.forEach((item: any) => {
                    arrFile.push(item.url);
                });
                let file = JSON.stringify(arrFile);
                this.codeObject.file = file;
                console.log("edit save", this.codeObject);
                this.$emit("saveCode", this.codeObject);
            }
        },
        getFiles() {
            if (
                this.codeObject.file.length > 0 &&
                typeof this.codeObject.file === "string"
            ) {
                // console.log("JSON.parse", JSON.parse(this.codeObject.file));
                // this.file = JSON.parse(this.codeObject.file);
                const fileArr = JSON.parse(this.codeObject.file);
                let arr = [] as Array<fileStricture>;
                fileArr.forEach((item: any) => {
                    let objectFile = {
                        url: item,
                        css: `background-image: url("${item}");`,
                        html: `<img src="${item}" alt="">`,
                    } as fileStricture;
                    arr.push(objectFile);
                });
                return arr;
            }
        },
    },
    mounted() {
        // console.log("===", this.codeEdit);
        Object.assign(this.codeObject, this.codeEdit);
    },
});
</script>
<style scoped>
.btn-codes .mdi:before {
    font-size: 14px !important;
}
.title-file {
    width: 67%;
}
.btns-file {
    width: 33%;
}
.file-upload {
    color: #777b83;
    font-size: 13px;
}
.file-upload.wrp-file-upload {
    text-align: center;
}
.item-file {
    background: #d9d9d9;
}
.btn-codes {
    padding: 0 5px;
    font-size: 14px;
}
</style>

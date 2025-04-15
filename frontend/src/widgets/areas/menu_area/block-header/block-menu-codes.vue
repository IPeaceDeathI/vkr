<template>
    <draggable-card
        class="setting-menu"
        v-model="show"
        width="395px"
        height="35 0px"
    >
        <redactor-toolbar :title="'КОД'" @close-click="show = false" />
        <v-redactor-container>
            <div v-if="dataIsEmpty()">
                <v-card-text><p>У вас нет кода на странице</p></v-card-text>

                <v-card-actions
                    ><v-btn
                        class="text-none link-fonts"
                        flat
                        @click="openEmptyCodeEditor(1)"
                        >Добавить код</v-btn
                    ></v-card-actions
                >
            </div>
            <div v-if="!dataIsEmpty()">
                <div class="mb-3 card-fonts-search-style">
                    <div class="card-fonts-toolbar d-flex pt-2 pb-1">
                        <span class="fonts-title"> Перед &lt;/head&gt; </span>
                        <v-spacer />
                        <v-btn
                            class="me-2 text-none link-fonts"
                            flat
                            size="small"
                            @click="openEmptyCodeEditor(0)"
                            >Добавить</v-btn
                        >
                    </div>
                    <div class="card-codes pt-2 pb-2">
                        <draggable
                            class="list1"
                            group="people"
                            v-model="codesDataHeader"
                            @end="onEnd"
                            item-key="id"
                        >
                            <template #item="{ element }">
                                <div
                                    class="item-codes"
                                    v-if="codesDataHeader.length != 0"
                                >
                                    <v-btn
                                        flat
                                        icon="mdi-drag-vertical"
                                        variant="text"
                                        size="xsmall"
                                        class="btn-drag btn-codes"
                                    />
                                    <v-row class="editorBg">
                                        <v-switch
                                            :model-value="
                                                element.status == 1
                                                    ? true
                                                    : false
                                            "
                                            @change="
                                                changeStatus(element.id, 0)
                                            "
                                        ></v-switch>
                                        <div
                                            class="code-name ml-1 mr-1"
                                            @click="
                                                openCodeEditor(element.id, 0)
                                            "
                                        >
                                            <span
                                                :class="
                                                    activeItemId == element.id
                                                        ? 'active'
                                                        : ''
                                                "
                                                class="element_name"
                                            >
                                                {{ element.name }}
                                            </span>

                                            <input
                                                v-if="
                                                    activeItemId == element.id
                                                "
                                                class="input_name"
                                                type="text"
                                                v-model="nameInput"
                                                @keyup.enter="
                                                    saveEditNameCode(0)
                                                "
                                                @blur="saveEditNameCode(0)"
                                            />
                                        </div>
                                    </v-row>
                                    <v-btn
                                        flat
                                        icon="mdi-pencil"
                                        variant="text"
                                        size="xsmall"
                                        class="btn-codes"
                                        @click="editNameCode(element.id, 0)"
                                    >
                                    </v-btn>
                                    <v-btn
                                        flat
                                        icon="mdi-delete"
                                        variant="text"
                                        size="xsmall"
                                        class="btn-codes"
                                        @click="removeCodeItem(element.id)"
                                    >
                                    </v-btn>
                                </div>
                            </template>
                        </draggable>
                        <div
                            v-if="codesDataHeader.length == 0"
                            class="item-codes item-no-codes"
                            @click="openEmptyCodeEditor(0)"
                        >
                            Добавьте код или переместите существующий
                        </div>
                    </div>
                </div>
                <div class="mb-3 card-fonts-search-style">
                    <div class="card-fonts-toolbar d-flex pt-2 pb-1">
                        <span class="fonts-title"> Перед &lt;/body&gt; </span>
                        <v-spacer />
                        <v-btn
                            class="me-2 text-none link-fonts"
                            flat
                            size="small"
                            @click="openEmptyCodeEditor(1)"
                            >Добавить</v-btn
                        >
                    </div>
                    <div class="card-codes pt-2 pb-2">
                        <draggable
                            class="list2"
                            group="people"
                            v-model="codesDataBody"
                            @end="onEnd"
                            item-key="id"
                        >
                            <template #item="{ element }">
                                <div
                                    class="item-codes"
                                    v-if="codesDataBody.length != 0"
                                >
                                    <v-btn
                                        flat
                                        icon="mdi-drag-vertical"
                                        variant="text"
                                        size="xsmall"
                                        class="btn-drag btn-codes"
                                    />
                                    <v-row class="editorBg">
                                        <v-switch
                                            :model-value="
                                                element.status == 1
                                                    ? true
                                                    : false
                                            "
                                            @change="
                                                changeStatus(element.id, 1)
                                            "
                                        ></v-switch>
                                        <div
                                            class="code-name ml-1 mr-1"
                                            @click="
                                                openCodeEditor(element.id, 1)
                                            "
                                        >
                                            <span
                                                :class="
                                                    activeItemId == element.id
                                                        ? 'active'
                                                        : ''
                                                "
                                                class="element_name"
                                            >
                                                {{ element.name }}
                                            </span>

                                            <input
                                                v-if="
                                                    activeItemId == element.id
                                                "
                                                class="input_name"
                                                type="text"
                                                v-model="nameInput"
                                                @keyup.enter="
                                                    saveEditNameCode(1)
                                                "
                                                @blur="saveEditNameCode(1)"
                                            />
                                        </div>
                                    </v-row>
                                    <v-btn
                                        flat
                                        icon="mdi-pencil"
                                        variant="text"
                                        size="xsmall"
                                        class="btn-codes"
                                        @click="editNameCode(element.id, 1)"
                                    >
                                    </v-btn>
                                    <v-btn
                                        flat
                                        icon="mdi-delete"
                                        variant="text"
                                        size="xsmall"
                                        class="btn-codes"
                                        @click="removeCodeItem(element.id)"
                                    >
                                    </v-btn>
                                </div>
                            </template>
                        </draggable>
                        <div
                            v-if="codesDataBody.length == 0"
                            class="item-codes item-no-codes"
                            @click="openEmptyCodeEditor(1)"
                        >
                            Добавьте код или переместите существующий
                        </div>
                    </div>
                </div>
            </div>
        </v-redactor-container>
    </draggable-card>
    <block-code-editor
        v-if="showCodeEditor"
        v-model="showCodeEditor"
        :codeEdit="objectCode"
        :area="currentArea"
        @addNewCode="addNewCode"
        @saveCode="saveCode"
    ></block-code-editor>
    <notification-wrp ref="notifications" :test="2"></notification-wrp>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import draggableDialog from "@/shared/libs/draggable_dialog/draggable-dialog.vue";
import BlockCodeEditor from "@/widgets/areas/menu_area/block-header/block-code-editor.vue";
import { CodeInterface } from "@/types";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";
import draggable from "vuedraggable";

import { dragOptions } from "@/shared/config";
import { ApiCodeWidget, ArrPutPosition } from "@/shared/api/models";
import { CodeWidgetModels } from "@/models/codeWidget";
import { draggableCard, redactorToolbar } from "@/features/structure";

// import axios from "axios";
// let id = 1;
interface SuccessResponsePost {
    data: number;
}

interface ErrorResponsePost {
    errors: {
        code: number;
        message: string;
    }[];
}
export default defineComponent({
    name: "block-menu-codes",
    components: {
        draggableCard,
        redactorToolbar,
        BlockCodeEditor,
        draggable,
    },
    props: {
        modelValue: {
            type: Boolean,
        },
        modelValueFonts: {
            type: Boolean,
        },
        pageId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            codesDataHeader: this.$store.getters["environment/pageCodeHead"],
            codesDataBody: this.$store.getters["environment/pageCodeBody"],
            editorCodes: false,
            tabCodes: 0,
            toggleCodes: true,
            content: "",
            showCodeEditor: false as boolean,
            currentIndex: 0 as number,
            currentArea: 1 as number,
            currentName: "" as string,
            enabled: true,
            dragging: false,
            drag: false,
            // currentCodeObj: {
            //     name: "" as string,
            //     html: "" as string,
            //     css: "" as string,
            //     js: "" as string,
            //     area: 1,
            //     file: [""] as Array<string>,
            //     status: 1 as number,
            //     position: 1 as number,
            // },
            currentCodeObj: {} as CodeInterface,
            // pageId: this.$store.getters[""],
            nameInput: "",
            activeEditCode: false,
            activeItemId: -1 as number,
            dragElement: -1 as number,
            myList1: [] as Array<CodeInterface>,
            myList2: [] as Array<CodeInterface>,
            idDraggable: -1,
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
        objectCode() {
            return this.currentCodeObj;
        },
    },
    methods: {
        onChange(evt: any) {
            // console.log("change", evt);
            // if (evt.added) {
            //     this.idDraggable = evt.added.element.id;
            // }
        },
        onEnd(evt: any) {
            this.codesDataHeader.forEach((element, index) => {
                element.position = index;
            });
            this.codesDataBody.forEach((element, index) => {
                element.position = index;
            });
            console.log("end arr1", this.codesDataHeader);
            console.log("end arr2", this.codesDataBody);
            this.editPositionArea(this.codesDataHeader, this.codesDataBody);
        },
        async editPositionArea(
            arrHead: CodeInterface[],
            arrBody: CodeInterface[]
        ) {
            const res = await CodeWidgetModels.editPositionWidget(
                this.pageId,
                arrHead,
                arrBody
            );
            return res;
        },
        editNameCode(id: number, area: number) {
            this.currentArea = area;
            this.activeEditCode = true;
            this.activeItemId = id;
            if (this.currentArea == 0) {
                const newCode = this.codesDataHeader.find((item) => {
                    return item.id == id;
                });
                if (newCode) {
                    this.nameInput = newCode.name;
                }
            } else {
                const newCode = this.codesDataBody.find((item) => {
                    return item.id == id;
                });
                if (newCode) {
                    this.nameInput = newCode.name;
                }
            }
        },
        async removeCodeItem(id: number) {
            const res = await this.deleteCode(id);
            // в стор записать удаление

            if (res === true) {
                if (this.currentArea == 0) {
                    this.$store.dispatch(
                        "environment/DELETE_CODE_HEAD_PAGE",
                        id
                    );
                } else {
                    this.$store.dispatch(
                        "environment/DELETE_CODE_BODY_PAGE",
                        id
                    );
                }
            }
        },
        async changeStatus(widget_id: number, area: number) {
            this.currentArea = area;

            if (this.currentArea == 0) {
                const newCode = this.codesDataHeader.find((item) => {
                    return item.id == widget_id;
                });
                if (newCode) {
                    newCode.status = newCode.status == 0 ? 1 : 0;
                    const newEditCode = {
                        name: newCode.name,
                        html: newCode.html || "",
                        css: newCode.css || "",
                        js: newCode.js || "",
                        area: newCode.area,
                        status: newCode.status,
                        file: newCode.file,
                        position: newCode.position,
                    };
                    const res = await CodeWidgetModels.edit(
                        this.pageId,
                        newEditCode,
                        widget_id
                    );

                    if (res === true) {
                        NotificationService.common().success({
                            text: "Статус виджета изменен",
                        });
                    } else {
                        NotificationService.common().error({
                            text: "Не удалось изменить статус",
                        });
                    }
                }
            } else {
                const newCode = this.codesDataBody.find((item) => {
                    return item.id == widget_id;
                });
                if (newCode) {
                    newCode.status = newCode.status == 0 ? 1 : 0;
                    const newEditCode = {
                        name: newCode.name,
                        html: newCode.html || "",
                        css: newCode.css || "",
                        js: newCode.js || "",
                        area: newCode.area,
                        status: newCode.status,
                        file: newCode.file,
                        position: newCode.position,
                    };
                    const res = await CodeWidgetModels.edit(
                        this.pageId,
                        newEditCode,
                        widget_id
                    );

                    if (res === true) {
                        NotificationService.common().success({
                            text: "Статус виджета изменен",
                        });
                    } else {
                        NotificationService.common().error({
                            text: "Не удалось изменить статус",
                        });
                    }
                }
            }
        },

        async getWidgetById(id_widget: any) {
            const result = await CodeWidgetModels.loadWidgetById(
                this.pageId,
                id_widget
            );
            return result;
        },
        async addCodeToBase(newCode: any) {
            const res = await CodeWidgetModels.save(this.pageId, newCode);
            console.log(res);
            if (typeof res === "number") {
                NotificationService.common().success({
                    text: "Сохранено",
                });
            } else {
                NotificationService.common().error({
                    text: "Не удалось сохранить",
                });
            }
            return res;
        },
        async addCodeEdit(newCode: any, widget_id: number) {
            console.log("widget_id", widget_id);
            const res = await CodeWidgetModels.edit(
                this.pageId,
                newCode,
                widget_id
            );

            if (res === true) {
                NotificationService.common().success({
                    text: "Сохранено",
                });
            } else {
                NotificationService.common().error({
                    text: "Не удалось сохранить",
                });
            }
            return res;
        },
        async deleteCode(widget_id: number) {
            const res = await CodeWidgetModels.delete(this.pageId, widget_id);

            if (res === true) {
                NotificationService.common().success({
                    text: "Виджет удален",
                });
            } else {
                NotificationService.common().error({
                    text: "Не удалось удалить",
                });
            }
            return res;
        },

        async addNewCode(newCode: CodeInterface) {
            let idWidget = await this.addCodeToBase(newCode);
            const objAdd = await this.getWidgetById(idWidget);

            if (objAdd !== undefined && typeof idWidget == "number") {
                const newCodeObject: CodeInterface = {
                    id: parseInt(idWidget),
                    name: objAdd.name,
                    html: objAdd.html,
                    css: objAdd.css,
                    js: objAdd.js,
                    file: objAdd.file,
                    area: objAdd.area,
                    status: objAdd.status,
                    position: newCode.position,
                };
                if (objAdd.area == 0) {
                    this.$store.dispatch(
                        "environment/ADD_CODE_HEAD_PAGE",
                        newCodeObject
                    );
                } else {
                    this.$store.dispatch(
                        "environment/ADD_CODE_BODY_PAGE",
                        newCodeObject
                    );
                }
            }
        },
        async saveCode(newCode: any) {
            console.log("newCode", newCode);
            const idCurrentEditor = newCode.id;

            const editObj = await this.addCodeEdit(newCode, idCurrentEditor);

            if (this.currentArea == 0) {
                return this.$store.dispatch(
                    "environment/CHANGE_CODE_HEAD_PAGE",
                    {
                        id: this.currentIndex,
                        updatedCode: newCode,
                    }
                );
            } else {
                return this.$store.dispatch(
                    "environment/CHANGE_CODE_BODY_PAGE",
                    {
                        id: this.currentIndex,
                        updatedCode: newCode,
                    }
                );
            }
        },
        openEmptyCodeEditor(area: number) {
            this.showCodeEditor = true;
            this.currentArea = area;
            const empty = {
                name: "",
                html: "",
                css: "",
                js: "",
                area: this.currentArea,
                file: [""] as Array<string>,
            };
            Object.assign(this.currentCodeObj, empty);

            return this.currentCodeObj;
        },
        openCodeEditor(id: number, area: number) {
            console.log("id==", id);
            console.log("area==", area);
            if (this.activeEditCode == false) {
                this.currentIndex = id;
                this.currentArea = area;
                this.showCodeEditor = true;
                console.log("this.currentArea", this.currentArea);
                if (this.currentArea == 0) {
                    const arr1 = this.codesDataHeader.find((item) => {
                        return item.id == id;
                    });
                    Object.assign(this.currentCodeObj, arr1);
                    console.log(
                        "this.currentCodeObj head",
                        this.currentCodeObj
                    );

                    return this.currentCodeObj;
                } else {
                    const arr2 = this.codesDataBody.find((item: any) => {
                        return item.id == id;
                    });
                    Object.assign(this.currentCodeObj, arr2);
                    console.log(
                        "this.currentCodeObj body",
                        this.currentCodeObj
                    );

                    return this.currentCodeObj;
                }
            }
        },
        async saveEditNameCode(area: number) {
            this.currentArea = area;

            if (this.currentArea == 0) {
                const newCode = this.codesDataHeader.find((item) => {
                    return item.id == this.activeItemId;
                });
                if (newCode) {
                    newCode.name = this.nameInput;
                    const newEditCode = {
                        name: newCode.name,
                        html: newCode.html || "",
                        css: newCode.css || "",
                        js: newCode.js || "",
                        area: newCode.area,
                        status: newCode.status,
                        file: newCode.file,
                        position: newCode.position,
                    };
                    const res = await CodeWidgetModels.edit(
                        this.pageId,
                        newEditCode,
                        this.activeItemId
                    );

                    if (res === true) {
                        NotificationService.common().success({
                            text: "Название виджета изменено",
                        });
                    } else {
                        NotificationService.common().error({
                            text: "Не удалось изменить название",
                        });
                    }
                }
            } else {
                const newCode = this.codesDataBody.find((item) => {
                    return item.id == this.activeItemId;
                });
                if (newCode) {
                    newCode.name = this.nameInput;
                    const newEditCode = {
                        name: newCode.name,
                        html: newCode.html || "",
                        css: newCode.css || "",
                        js: newCode.js || "",
                        area: newCode.area,
                        status: newCode.status,
                        file: newCode.file,
                        position: newCode.position,
                    };
                    const res = await CodeWidgetModels.edit(
                        this.pageId,
                        newEditCode,
                        this.activeItemId
                    );

                    if (res === true) {
                        NotificationService.common().success({
                            text: "Название виджета изменено",
                        });
                    } else {
                        NotificationService.common().error({
                            text: "Не удалось изменить название",
                        });
                    }
                }
            }
            this.activeItemId = -1;
            this.activeEditCode = false;
        },
        dataIsEmpty() {
            const isEmpty =
                this.codesDataHeader.length == 0 &&
                this.codesDataBody.length == 0
                    ? true
                    : false;

            return isEmpty;
        },
    },
});
</script>
<style scoped>
.link-fonts {
    color: rgb(71, 115, 255);
}
.card-fonts-search-style .card-fonts-toolbar {
    color: #30343b;
    font-weight: 500;
    font-size: 13px;
    align-items: center;
    margin: 20px 0 4px;
}
.card-fonts-search-style {
    border-bottom: 1px solid #eaebeb;
}
.item-codes {
    height: 50px;
    color: #30343b;
    font-size: 13px;
    display: flex;
    align-items: center;
}
.item-no-codes {
    height: 50px;
    color: rgba(48, 52, 59, 0.4);
    border: 1px dashed rgba(48, 52, 59, 0.1);
    border-radius: 5px;
    justify-content: center;
}
.btn-drag {
    cursor: move;
}
.item-codes:hover {
    cursor: pointer;
    background-color: #f5f5f5;
}
.item-codes:hover .btn-codes {
    color: #c1c2c4;
}
.item-codes:hover .noks-switch-row {
    background-color: #f5f5f5;
}
.btn-codes {
    color: transparent;
}
textarea {
    resize: none;
    width: 100%;
    height: 300px;
    border: 1px solid;
}
.card-codes {
    max-height: 150px;
    overflow-y: auto;
}
.code-name {
    position: relative;
    width: 80%;
    display: flex;
    align-items: center;
}
.code-name input.input_name {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: 1px solid;
    padding: 2px;
}
.element_name {
    opacity: 1;
}
.element_name.active {
    opacity: 0;
}
</style>

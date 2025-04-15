<template>
    <v-row>
        <v-col class="pa-0">
            <v-container class="dragg-fields-container" style="padding: 12px">
                <template v-for="(row, indexRow) in modelValue" :key="row">
                    <v-row>
                        <template v-for="(id, indexC) in row" :key="id">
                            <v-col class="item pa-0">
                                <v-scale-transition>
                                    <field-ceil
                                        v-bind="getFieldCeilProps(id)"
                                        @add="callFieldForAdd(indexRow, indexC)"
                                        @remove="removeField(id)"
                                        @showRedactor="showFieldRedactor(id)"
                                        @update:fieldTitle="
                                            updateFieldTitle($event, id)
                                        "
                                    />
                                </v-scale-transition>
                            </v-col>
                            <v-col
                                v-if="indexC < row.length - 1"
                                class="swappper-container horizontal d-flex align-center"
                            >
                                <v-btn
                                    icon="mdi-swap-horizontal"
                                    density="compact"
                                    color="editor"
                                    size="small"
                                    @click="swapHorizontal(indexC, indexRow)"
                                />
                            </v-col>
                        </template>
                    </v-row>
                    <v-row v-if="indexRow < modelValue.length - 1">
                        <template
                            v-for="indexC in numberOfColumns"
                            :key="indexC"
                        >
                            <v-col
                                class="swappper-container vertical d-flex justify-center"
                            >
                                <v-btn
                                    icon="mdi-swap-vertical"
                                    density="compact"
                                    color="editor"
                                    size="small"
                                    @click="swapVertical(indexC - 1, indexRow)"
                                />
                            </v-col>
                            <div
                                style="width: 26px"
                                v-if="indexC < numberOfColumns"
                            ></div>
                        </template>
                    </v-row>
                </template>
            </v-container>
        </v-col>
        <v-col
            cols="1 "
            style="padding: 12px 0; display: flex; justify-content: end"
        >
            <v-btn
                class="text-body-2 h-100"
                density="comfortable"
                size="x-small"
                rounded="lg"
                @click="addColumnWithField"
                :disabled="numberOfColumns >= MAX_COLUMNS"
            >
                <v-icon size="large">mdi-table-column-plus-before</v-icon>
                <v-tooltip activator="parent">
                    Добавить колонку с полем
                </v-tooltip>
            </v-btn>
        </v-col>
    </v-row>

    <v-row>
        <v-col>
            <v-btn
                class="w-100"
                size="default"
                rounded="lg"
                @click="addRowWithField"
            >
                <template v-slot:prepend>
                    <v-icon size="x-large">mdi-playlist-plus</v-icon>
                </template>
                Добавить строку с полем
            </v-btn>
        </v-col>
        <v-col
            cols="1"
            style="padding: 12px 0 0 0; display: flex; justify-content: end"
        >
            <v-btn
                density="default"
                rounded="lg"
                size="x-small"
                style="width: 5%; height: 100%"
                @click="addRow"
            >
                <v-icon size="large">mdi-plus</v-icon>
                <v-tooltip activator="parent">Добавить пустую строку</v-tooltip>
            </v-btn>
        </v-col>
    </v-row>
    <select-gallery
        :variant="galleryVariant.icon"
        :items="GalleryItems"
        :dialogOpened="galleryIsOpen"
        @closeWithoutSelected="galleryIsOpen = false"
        @select="addSelectedField"
    />
    <draggable-inner-card
        v-model="fieldRedactorIsOpen"
        width="480px"
        heightMin="120px"
    >
        <field-redactor
            :field_id="currentFieldRedactorId"
            :formParams="formParams"
            @onClose="fieldRedactorIsOpen = false"
            @onChange="changeFieldParams"
        />
    </draggable-inner-card>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, computed, toRefs, shallowRef } from "vue";
import fieldCeil from "./field-ceil.vue";
import { FormManager } from "@/shared/services";
import { CommonFieldsParams, FieldTypes, ItemFormParams } from "@/types";
import { FieldsFabric } from "@/shared/services/elements_fabrics/items_fabric/items/FieldsFabric";
import selectGallery from "@/shared/libs/select_gallery/select-gallery.vue";
import { galleryVariant } from "@/shared/libs/select_gallery";
import fieldRedactor from "./field-redactors/field_redactor.vue";
import { draggableInnerCard } from "../../../reusable-components";

//typing
type Props = {
    formParams: ItemFormParams;
    modelValue: Array<Array<false | string>>;
};

type Emits = {
    onChange: [value: ItemFormParams];
    "update:modelValue": [value: Array<Array<false | string>>];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//form params
const { formParams, modelValue } = toRefs(props);

const numberOfColumns = computed<number>(() => {
    return modelValue.value[0].length ?? 0;
});

const changeFieldParams = function ({
    value,
    id,
}: {
    value: CommonFieldsParams;
    id: string;
}) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    formParams.value.fields[id] = { ...value };
    emit("onChange", { ...formParams.value });
};

//modelValue
const swapVertical = function (colInx: number, rowInx: number) {
    const tmp = modelValue.value[rowInx][colInx];
    const tmp_arr = modelValue.value;
    tmp_arr[rowInx][colInx] = modelValue.value[rowInx + 1][colInx];
    tmp_arr[rowInx + 1][colInx] = tmp;
    emit("update:modelValue", tmp_arr);
};

const swapHorizontal = function (colInx: number, rowInx: number) {
    const tmp = modelValue.value[rowInx][colInx];
    const tmp_arr = modelValue.value;
    tmp_arr[rowInx][colInx] = modelValue.value[rowInx][colInx + 1];
    tmp_arr[rowInx][colInx + 1] = tmp;
    emit("update:modelValue", tmp_arr);
};

//Form manager
const getFieldCeilProps = function (id: string | false) {
    if (id === false) {
        return {
            isEmpty: true,
        };
    } else {
        const FieldParams = FormManager.getCommonFieldParamsById(
            formParams.value,
            id
        );
        const size = numberOfColumns.value < 3 ? "default" : "compact";
        return {
            icon: FieldsFabric[FieldParams.type].icon,
            name: FieldsFabric[FieldParams.type].name,
            fieldTitle: FieldParams.title,
            size: size as "default" | "compact",
        };
    }
};

const callFieldForAdd = function (inxR: number, inxC: number) {
    callbackAfterSelect.value = (type: string | number) => {
        FormManager.addField(formParams.value, type as FieldTypes, {
            row: inxR,
            column: inxC,
        });
        emit("onChange", { ...formParams.value });
    };
    galleryIsOpen.value = true;
};

const removeField = function (id: string | false) {
    if (id) FormManager.removeField(formParams.value, id);
    emit("onChange", { ...formParams.value });
};

const showFieldRedactor = function (id: string | false) {
    if (id) {
        currentFieldRedactorId.value = id;
        fieldRedactorIsOpen.value = true;
    }
};

const updateFieldTitle = function (title: string, id: string | false) {
    if (id) {
        const red = FormManager.getCommonFieldParamsById(formParams.value, id);
        red.title = title;
        emit("onChange", { ...formParams.value });
    }
};

const addSelectedField = function (type: string | number) {
    galleryIsOpen.value = false;
    callbackAfterSelect.value(type);
};

const addRow = function () {
    FormManager.pushRow(formParams.value);
    emit("onChange", { ...formParams.value });
};

const addRowWithField = function () {
    callbackAfterSelect.value = (type: string | number) => {
        const row = FormManager.pushRow(formParams.value);
        FormManager.addField(formParams.value, type as FieldTypes, {
            row: row,
            column: 0,
        });
        emit("onChange", { ...formParams.value });
    };
    galleryIsOpen.value = true;
};

const addColumnWithField = function () {
    callbackAfterSelect.value = (type: string | number) => {
        const col = FormManager.pushColumn(formParams.value);
        if (col !== -1) {
            FormManager.addField(formParams.value, type as FieldTypes, {
                row: 0,
                column: col,
            });
        }
        emit("onChange", { ...formParams.value });
    };
    galleryIsOpen.value = true;
};

//переменные для работы с версткой
const callbackAfterSelect = shallowRef((type: string | number): void => {
    console.log(type);
});
const GalleryItems = shallowRef(
    (Object.keys(FieldsFabric) as Array<keyof typeof FieldsFabric>).map(
        (key) => {
            return {
                id: key,
                name: FieldsFabric[key].name,
                preview: FieldsFabric[key].icon,
            };
        }
    )
);
const galleryIsOpen = shallowRef(false);
const MAX_COLUMNS = shallowRef(FormManager.MAX_COLUMNS);
const fieldRedactorIsOpen = shallowRef(false);
const currentFieldRedactorId = shallowRef("");
</script>
<style lang="scss" scoped>
.dragg-fields-container {
    & .item {
        cursor: pointer;
    }
}
.swappper-container {
    &.horizontal {
        flex: 0 0 0;
        padding: 0 3px !important;
    }
    &.vertical {
        padding: 3px 0 !important;
    }
}
</style>

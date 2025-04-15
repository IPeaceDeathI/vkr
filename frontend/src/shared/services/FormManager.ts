import {
    CommonFieldsParams,
    FieldTypes,
    ItemFormParams,
    SliderFieldParams,
    CheckboxFieldParams,
    PhoneFieldParams,
    RadioFieldParams,
    SelectFieldParams,
} from "@/types";
import { getUUID } from "../helpers";
import { FieldsFabric } from "./elements_fabrics/items_fabric/items/FieldsFabric";
import { CriticalError } from "./error_service";

export class FormManager {
    public static MAX_COLUMNS = 3;
    public static getCommonFieldParamsById(
        form: ItemFormParams,
        id: id
    ): CommonFieldsParams {
        const field = form.fields[id];
        if (field === undefined) {
            throw new CriticalError({
                bundle: JSON.stringify(form),
                message: "поля Form - undefined",
                targetId: id,
                isNotification: false,
            });
        }
        return field;
    }

    public static addField(
        form: ItemFormParams,
        type: FieldTypes,
        ceil: { row: number; column: number }
    ) {
        const oldCeil = form.fieldsGrid[ceil.row][ceil.column];
        if (oldCeil !== false) {
            FormManager.removeField(form, oldCeil);
        }
        const id = getUUID();
        form.fields[id] = structuredClone(FieldsFabric[type].params);
        form.fieldsGrid[ceil.row][ceil.column] = id;
    }
    public static removeField(form: ItemFormParams, id: string) {
        form.fieldsGrid.forEach((arr, indexR) => {
            arr.forEach((inputID, indexC) => {
                if (inputID === id) {
                    form.fieldsGrid[indexR][indexC] = false;
                    if (FormManager.rowIsEmpty(form, indexR)) {
                        FormManager.removeRow(form, indexR);
                    }
                    if (FormManager.columnIsEmpty(form, indexC)) {
                        FormManager.removeColumn(form, indexC);
                    }
                }
            });
        });
        delete form.fields[id];
    }
    public static pushRow(form: ItemFormParams): number {
        const numberOfColumns = form.fieldsGrid[0].length;
        form.fieldsGrid.push(Array(numberOfColumns).fill(false));
        return form.fieldsGrid.length - 1;
    }
    //возвращает -1 если добавить колонку нельзя
    public static pushColumn(form: ItemFormParams): number {
        const numberOfColumns = form.fieldsGrid[0].length;
        if (numberOfColumns < FormManager.MAX_COLUMNS) {
            form.fieldsGrid.forEach((row) => {
                row.push(false);
            });
            return numberOfColumns;
        }
        return -1;
    }

    private static rowIsEmpty(form: ItemFormParams, index: number): boolean {
        return form.fieldsGrid[index].every((elem) => {
            return elem === false;
        });
    }
    public static removeRow(form: ItemFormParams, index: number) {
        form.fieldsGrid[index].forEach((element) => {
            if (element !== false) FormManager.removeField(form, element);
        });
        if (form.fieldsGrid.length > 1) form.fieldsGrid.splice(index, 1);
    }
    private static columnIsEmpty(form: ItemFormParams, index: number): boolean {
        return form.fieldsGrid.every((row) => {
            return row[index] === false;
        });
    }
    public static removeColumn(form: ItemFormParams, index: number) {
        form.fieldsGrid.forEach((row) => {
            const element = row[index];
            if (element !== false) FormManager.removeField(form, element);
        });
        if (form.fieldsGrid[0].length > 1) {
            form.fieldsGrid.forEach((row) => {
                row.splice(index, 1);
            });
        }
    }

    public static getFieldTextParamsById(form: ItemFormParams, id: id) {
        const field = form.fields[id];
        if (field === undefined || field.type !== FieldTypes.text) {
            throw new CriticalError({
                bundle: JSON.stringify(form),
                message: "Текстовые поля Form - undefined (или не текст)",
                targetId: id,
                isNotification: false,
            });
        }
        return field;
    }

    public static getFieldPhoneParamsById(
        form: ItemFormParams,
        id: id
    ): PhoneFieldParams {
        const field = form.fields[id];
        if (field === undefined || field.type !== FieldTypes.phone) {
            throw new CriticalError({
                bundle: JSON.stringify(form),
                message: `fields with id ${id} is undefined or not phone`,
                targetId: id,
            });
        }
        return field;
    }
    public static getFieldCheckboxParamsById(
        form: ItemFormParams,
        id: id
    ): CheckboxFieldParams {
        const field = form.fields[id];
        if (field === undefined || field.type !== FieldTypes.checkbox) {
            throw new CriticalError({
                bundle: JSON.stringify(form),
                message: `fields with id ${id} is undefined or not checkbox`,
                targetId: id,
            });
        }
        return field;
    }
    public static getFieldRadioParamsById(
        form: ItemFormParams,
        id: id
    ): RadioFieldParams {
        const field = form.fields[id];
        if (field === undefined || field.type !== FieldTypes.radio) {
            throw new CriticalError({
                bundle: JSON.stringify(form),
                message: `fields with id ${id} is undefined or not radio`,
                targetId: id,
            });
        }
        return field;
    }
    public static getFieldSelectParamsById(
        form: ItemFormParams,
        id: id
    ): SelectFieldParams {
        const field = form.fields[id];
        if (field === undefined || field.type !== FieldTypes.select) {
            throw new CriticalError({
                bundle: JSON.stringify(form),
                message: `fields with id ${id} is undefined or not select`,
                targetId: id,
            });
        }
        return field;
    }
    public static getFieldSliderParamsById(
        form: ItemFormParams,
        id: id
    ): SliderFieldParams {
        const field = form.fields[id];
        if (field === undefined || field.type !== FieldTypes.slider) {
            throw `fields with id ${id} is undefined or not slider`;
        }
        return field;
    }
}

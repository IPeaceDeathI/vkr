import { ItemTypes } from "@/types";
import * as Items from "./items";
export const ItemTypesWithPercPaddingB = [ItemTypes.image, ItemTypes.quiz];
interface itemsList {
    type: ItemTypes;
    name: string;
    preview: string;
}
export class ItemsFabric {
    private static instance: ItemsFabric;
    private static itemsList: Array<itemsList> = [];
    private constructor() {
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!ItemsFabric.instance) {
            ItemsFabric.instance = new ItemsFabric();
            // ... здесь единожды выполняется инициализация ...
        }
        return ItemsFabric.instance;
    }
    getItem(itemType: ItemTypes.button): Items.Button;
    getItem(itemType: ItemTypes.image): Items.Image;
    getItem(itemType: ItemTypes.icon): Items.Icon;
    getItem(itemType: ItemTypes.text): Items.Text;
    getItem(itemType: ItemTypes.form): Items.Form;
    getItem(itemType: ItemTypes.quiz): Items.Quiz;
    getItem(itemType: ItemTypes.menu): Items.Menu;
    getItem(itemType: ItemTypes.iconText): Items.IconText;
    getItem(itemType: ItemTypes.headerDivider): Items.HeaderDivider;
    getItem(
        itemType: ItemTypes | string
    ):
        | Items.Button
        | Items.Icon
        | Items.Image
        | Items.Text
        | Items.Form
        | Items.Quiz
        | Items.HeaderDivider
        | Items.IconText
        | Items.Menu;

    getItem(itemType: ItemTypes | string) {
        switch (itemType) {
            case ItemTypes.button:
                return Items.Button.getInstance();
            case ItemTypes.image:
                return Items.Image.getInstance();
            case ItemTypes.text:
                return Items.Text.getInstance();
            case ItemTypes.icon:
                return Items.Icon.getInstance();
            case ItemTypes.form:
                return Items.Form.getInstance();
            case ItemTypes.quiz:
                return Items.Quiz.getInstance();
            case ItemTypes.menu:
                return Items.Menu.getInstance();
            case ItemTypes.iconText:
                return Items.IconText.getInstance();
            case ItemTypes.headerDivider:
                return Items.HeaderDivider.getInstance();
            default:
                return Items.Button.getInstance();
        }
    }
    getItemsShort() {
        if (ItemsFabric.itemsList.length < 1) {
            Object.values(ItemTypes).forEach((value) => {
                if (value === ItemTypes.headerDivider) return;
                ItemsFabric.itemsList.push({
                    type: this.getItem(value).getType(),
                    name: this.getItem(value).getName(),
                    preview: this.getItem(value).getPreview(),
                });
            });
            return ItemsFabric.itemsList;
        } else return ItemsFabric.itemsList;
    }
}

import TextTypeEditing from "./TextTypeEditing";
import TextTypeUI from "./TextTypeUI";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class TextType extends Plugin {
    static get requires() {
        return [TextTypeEditing, TextTypeUI];
    }
}

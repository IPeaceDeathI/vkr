import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import Locale from "@ckeditor/ckeditor5-utils/src/locale";
import {
    createDropdown,
    addListToDropdown,
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";
import Collection from "@ckeditor/ckeditor5-utils/src/collection";
import Model from "@ckeditor/ckeditor5-ui/src/model";
export default class TextTypeUI extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add("abbreviation", () => {
            const locale = new Locale();
            const dropdown = createDropdown(locale);

            const items = new Collection();

            items.add({
                type: "button",
                model: new Model({
                    withText: true,
                    label: "First item",
                    labelStyle: "color: red",
                }),
            });

            items.add({
                type: "button",
                model: new Model({
                    withText: true,
                    label: "Second item",
                    labelStyle: "color: green",
                    class: "foo",
                }),
            });

            dropdown.on("execute", (event) => {
                console.log("execute", event.source, dropdown);
            });
            dropdown.render();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            addListToDropdown(dropdown, items);
            // Will render a dropdown labeled "A dropdown" with an empty panel.
            return dropdown;
        });
    }
}

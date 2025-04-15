import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class TextTypeEditing extends Plugin {
    init() {
        this._defineSchema(); // ADDED
        this._defineConverters();
    }

    _defineSchema() {
        // ADDED
        const schema = this.editor.model.schema;
        console.log(schema);
        // Extend the text node's schema to accept the abbreviation attribute.
        schema.extend("$text", {
            allowAttributes: ["textType"],
        });
    }

    _defineConverters() {
        // ADDED
        const conversion = this.editor.conversion;

        // Conversion from a model attribute to a view element.
        // conversion.for("downcast").attributeToElement({
        //     model: "textType",
        //     // Callback function provides access to the model attribute value
        //     // and the DowncastWriter.
        //     view: (modelAttributeValue, conversionApi) => {
        //         const { writer } = conversionApi;

        //         return writer.createAttributeElement("textType", {
        //             title: modelAttributeValue,
        //         });
        //     },
        // });
    }
}

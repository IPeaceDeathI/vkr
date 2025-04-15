import EventHanger from "@/services/EventHanger";

export class CommandInteface {
    /**
     *
     * @param {string} description в винителдьном падеже. Вставляется в title кнопки ('Отменить ...')
     * Примеры: действие, удаление блока и т.д.
     */
    constructor() {
        if (!window.main.has_change) {
            EventHanger.beforeunload();
            window.main.has_change = true;
            this.description = "действие";
        }
    }
    execute() {
        if (!window.main.has_change) {
            EventHanger.beforeunload();
            window.main.has_change = true;
        }
        this.execute_template();
    }

    execute_template() {
        console.log("must be redefinied");
    }
}

export class DeleteBlocksCommand extends CommandInteface {
    /**
     *
     * @param {Array(int)} approach_ids - Массив id блоков из модели
     */
    constructor(approach_ids) {
        super();
        this.approach_ids = approach_ids;
        this.description = "добавление блока";
    }
    execute_template() {
        this.approach_ids.forEach((approach_id) => {
            window.main.blocks_model.delete_block_not_undo(approach_id);
        });
    }
}

export class AddBlocksCommand extends CommandInteface {
    /**
     *
     * @param {Array({approach_id, json, jq_position, jq_landmark})} structures - Массив
     * структуры, позиции, и "столба"(к которому нужно добавить блок после удаления)
     */
    constructor(structures) {
        super();
        this.structures = structures;
        this.description = "удаление блока";
    }
    execute_template() {
        this.structures.forEach((structure) => {
            var approach_id = parseInt(structure.jq_landmark);
            if (!isNaN(approach_id)) {
                structure.jq_landmark = window.main.blocks_model.blocks
                    .get(approach_id)
                    .get_jq();
            }

            window.main.blocks_model.add_block_from_json_not_undo(
                structure.json,
                structure.jq_position,
                structure.jq_landmark,
                structure.approach_id
            );
        });
    }
}

export class MoveBlocksCommand extends CommandInteface {
    constructor(before, after) {
        super();
        this.before = before;
        this.after = after;
        this.description = "перемещение блока";
    }
    execute_template() {
        if (this.before == 0)
            window.main
                .blocks_view_space()
                .wrapper.prepend(
                    window.main
                        .blocks_view_space()
                        .wrapper.children()
                        .get(this.after)
                );
        else {
            if (this.before > this.after)
                var el_to = window.main
                    .blocks_view_space()
                    .wrapper.children()
                    .get(this.before);
            else
                var el_to = window.main
                    .blocks_view_space()
                    .wrapper.children()
                    .get(this.before - 1);
            el_to.after(
                window.main
                    .blocks_view_space()
                    .wrapper.children()
                    .get(this.after)
            );
        }
    }
}

export class ChangeTextTagCommand extends CommandInteface {
    constructor(block_id, tag_id, text) {
        super();
        this.block_id = block_id;
        this.tag_id = tag_id;
        this.text = text;
        this.description = "изменение текста";
    }
    execute_template() {
        let block = window.main.blocks_model.get_block_by_id(this.block_id);
        let tag = block.get_tag_by_id(this.tag_id);
        tag.set_text(this.text, false);
    }
}

class ChangeTagOptCommand extends CommandInteface {
    constructor(block_id, tag_id, option_id, device_type, val) {
        super();
        this.block_id = block_id;
        this.tag_id = tag_id;
        this.option_id = option_id;
        this.device_type = device_type;
        this.val = val;
        this.description = `изменение значения ${this.#get_device_type_title()}`;
    }
    #get_device_type_title() {
        switch (this.device_type) {
            case TagOptionsType.DESKTOP:
                return "(Монитор)";
            case TagOptionsType.TABLET:
                return "(Планшет)";
            case TagOptionsType.MOBILE:
                return "(Смартфон)";
            case TagOptionsType.COMMON:
                return "(Общие)";
        }
        return "";
    }
    execute_template() {
        console.log(
            this.block_id,
            this.tag_id,
            this.option_id,
            this.device_type,
            this.val
        );
        switch (this.device_type) {
            case TagOptionsType.DESKTOP:
            case TagOptionsType.TABLET:
            case TagOptionsType.MOBILE:
                let block = window.main.blocks_model.get_block_by_id(
                    this.block_id
                );
                let tag = block.get_tag_by_id(this.tag_id);
                let tag_option = tag.get_option_by_id(
                    this.option_id,
                    this.device_type
                );
                this.set_value(tag_option);
                break;
            case TagOptionsType.COMMON:
                window.main.page_model.tag
                    .get_option_by_id(this.option_id)
                    .set_value(this.val, false);
                break;
            default:
                console.log(this.device_type);
                console.log("Указан неверный тип опций");
        }
    }
}

export class ChangeValueTagOptCommand extends ChangeTagOptCommand {
    constructor(block_id, tag_id, option_id, device_type, val) {
        super(block_id, tag_id, option_id, device_type, val);
    }
    set_value(tag_option) {
        tag_option.set_value(this.val, false);
    }
}

export class ChangeUnitTagOptCommand extends ChangeTagOptCommand {
    constructor(block_id, tag_id, option_id, device_type, val) {
        super(block_id, tag_id, option_id, device_type, val);
    }
    set_value(tag_option) {
        tag_option.set_unit(this.val, false);
    }
}
export class TagLiPopCommand extends CommandInteface {
    constructor(block_id, tag_id) {
        super();
        this.block_id = block_id;
        this.tag_id = tag_id;
        this.description = "добавление элемента";
    }
    execute_template() {
        let block = window.main.blocks_model.get_block_by_id(this.block_id);
        let tag = block.get_tag_by_id(this.tag_id);
        tag.pop_li(false);
    }
}
export class TagLiPushCommand extends CommandInteface {
    constructor(block_id, tag_id, item_struct) {
        super();
        this.block_id = block_id;
        this.tag_id = tag_id;
        this.item_struct = item_struct;
        this.description = "удаление элемента";
    }
    execute_template() {
        let block = window.main.blocks_model.get_block_by_id(this.block_id);
        let tag = block.get_tag_by_id(this.tag_id);
        tag.push_li(false, this.item_struct);
    }
}
export class TagLiDeleteCommand extends CommandInteface {
    constructor(block_id, tag_id, index) {
        super();
        this.block_id = block_id;
        this.tag_id = tag_id;
        this.index = index;
        this.description = "удаление элемента";
    }
    execute_template() {
        let block = window.main.blocks_model.get_block_by_id(this.block_id);
        let tag = block.get_tag_by_id(this.tag_id);
        tag.delete_element_from_li_array(this.index, false);
    }
}
export class TagLiAddCommand extends CommandInteface {
    constructor(block_id, tag_id, index, item_struct) {
        super();
        this.block_id = block_id;
        this.tag_id = tag_id;
        this.index = index;
        this.item_struct = item_struct;

        this.description = "удаление элемента";
    }
    execute_template() {
        let block = window.main.blocks_model.get_block_by_id(this.block_id);
        let tag = block.get_tag_by_id(this.tag_id);
        tag.add_element_to_li_array(this.index, this.item_struct, false);
    }
}
export class TagUpdateTagOption extends CommandInteface {
    constructor(block_id, tag_id, key, value) {
        super();
        this.block_id = block_id;
        this.tag_id = tag_id;
        this.key = key;
        this.value = value;
        this.description = "удаление/изменение опции";
    }
    execute_template() {
        let block = window.main.blocks_model.get_block_by_id(this.block_id);
        let tag = block.get_tag_by_id(this.tag_id);
        tag.update_tag_option_not_undo(this.key, this.value);
    }
}
export class TagChangeTagOption extends CommandInteface {
    constructor(block_id, tag_id, key, value, delete_key) {
        super();
        this.block_id = block_id;
        this.tag_id = tag_id;
        this.key = key;
        this.value = value;
        this.delete_key = delete_key;
        this.description = "смену опции";
    }
    execute_template() {
        let block = window.main.blocks_model.get_block_by_id(this.block_id);
        let tag = block.get_tag_by_id(this.tag_id);
        let object = new Object(this.key, this.value);
        tag.change_tag_options_not_undo(this.delete_key, object);
    }
}
export class TagRemoveTagOption extends CommandInteface {
    constructor(block_id, tag_id, key) {
        super();
        this.block_id = block_id;
        this.tag_id = tag_id;
        this.key = key;
        this.description = "удаление/изменение опции";
    }
    execute_template() {
        let block = window.main.blocks_model.get_block_by_id(this.block_id);
        let tag = block.get_tag_by_id(this.tag_id);
        tag.remove_tag_option_not_undo(this.key);
    }
}
export class TagUpdateAttribute extends CommandInteface {
    constructor(block_id, tag_id, key, value) {
        super();
        this.block_id = block_id;
        this.tag_id = tag_id;
        this.key = key;
        this.value = value;
        this.description = "удаление/изменение опции";
    }
    execute_template() {
        let block = window.main.blocks_model.get_block_by_id(this.block_id);
        let tag = block.get_tag_by_id(this.tag_id);
        tag.update_attribute_not_undo(this.key, this.value);
    }
}
export class TagRemoveAttribute extends CommandInteface {
    constructor(block_id, tag_id, key) {
        super();
        this.block_id = block_id;
        this.tag_id = tag_id;
        this.key = key;
        this.description = "удаление/изменение опции";
    }
    execute_template() {
        let block = window.main.blocks_model.get_block_by_id(this.block_id);
        let tag = block.get_tag_by_id(this.tag_id);
        tag.remove_attribute_not_undo(this.key);
    }
}

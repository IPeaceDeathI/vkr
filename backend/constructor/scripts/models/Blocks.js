import Api from "@/classes/Api";
import BlocksFactory from "@/classes/BlocksFactory";
import UndoManager from "@/classes/UndoManager";
import Block from "@/classes/Block";
import { getUUID } from "@/helpers/helpers";
import { DeleteBlocksCommand, AddBlocksCommand } from "@/classes/Command";

//Основная модель для работы с блоками
export default class BlocksModel {
    last_approach_id = EnumInitialId.BLOCKS;

    constructor() {
        this.blocks = new Map();
    }
    /**
     *   Принимает экземпляр блока или название блока
     *   Добавляет его в модель
     *   Возвращает присвоенный блоку id
     *   Если создать блок не удалось, то возвращается false
     */
    add_block(id, _approach_id = false) {
        const approach_id = this.add_block_not_undo(id, _approach_id);
        new UndoManager().push(new DeleteBlocksCommand([approach_id]));
        return approach_id;
    }
    add_block_not_undo(id, _approach_id = false) {
        const approach_id = _approach_id
            ? _approach_id
            : this.last_approach_id++;

        var block = BlocksFactory.get_by_id(id, approach_id);
        if (!block) return false;

        //Добавляем блок в базу модели
        this.blocks.set(approach_id, block);
        return approach_id;
    }
    /**
     *  Добавление блока по json
     */
    add_block_from_json(
        json,
        position = "appendTo",
        jq_landmark = null,
        _approach_id = false
    ) {
        this.#add_block_from_json(
            this.add_block(json["id"], _approach_id),
            json,
            position,
            jq_landmark
        );
    }
    add_block_from_json_not_undo(
        json,
        position = "appendTo",
        jq_landmark = null,
        _approach_id = false
    ) {
        this.#add_block_from_json(
            this.add_block_not_undo(json["id"], _approach_id),
            json,
            position,
            jq_landmark
        );
    }
    #add_block_from_json(approach_id, json, position, jq_landmark) {
        if (!approach_id) return;
        this.set_block_structure_from_json(approach_id, json);
        this.show_block(
            approach_id,
            jq_landmark ?? window.main.blocks_view_space().wrapper,
            position
        );
    }
    get_block_by_id(approach_id) {
        return this.blocks.get(approach_id);
    }
    set_block_structure_from_json(approach_id, json) {
        var block = this.blocks.get(approach_id);
        block.set_structure_from_json(json);
    }
    get_model_as_json() {
        var model = [];
        var sortedIDs = window.main
            .blocks_view_space()
            .wrapper.sortable("toArray");
        sortedIDs.forEach((approach_id) => {
            approach_id = Number(approach_id);
            const block = this.blocks.get(approach_id);
            model.push(block.get_stuctrure_as_json());
        });
        return model;
    }
    set_model_from_json(json) {
        json.forEach((block_json) => {
            try {
                this.add_block_from_json_not_undo(block_json, "appendTo", null);
            } catch (error) {
                Api.send_to_tg(
                    `Метод set_model_from_json;\n block_json : ${block_json};\n ошибка${error}`
                );
            }
        });
    }
    /**
     *
     * @param {*} approach_id id блока
     * @param {*} jq_landmark jq объект
     * @param {*} jq_position посиция, которую должен принять блок
     *                        относительно jq_landmark (after/appendTo)
     *
     */
    show_block(approach_id, jq_landmark, jq_position) {
        var block = this.blocks.get(approach_id);
        window.main
            .blocks_view_space()
            .add_block(block, jq_landmark, jq_position);
    }
    re_render_block(approach_id) {
        var block = this.blocks.get(approach_id);
        if (approach_id == this.focused_block) {
            this.remove_focus_from_block();
            block.re_render();
            this.set_focus_on_block(approach_id);
        } else block.re_render();
    }
    re_render_all_block() {
        this.blocks.forEach((block, key) => {
            block.re_render();
        });
    }
    //удаление из модели
    delete_block(approach_id) {
        const block = this.blocks.get(approach_id);
        const _json = block.get_stuctrure_as_json();
        const [landmark, position] =
            this.#get_landmark_and_position_for_delete(approach_id);

        new UndoManager().push(
            new AddBlocksCommand([
                {
                    json: _json,
                    jq_position: position,
                    jq_landmark: landmark,
                    approach_id: approach_id,
                },
            ])
        );
        this.delete_block_not_undo(approach_id);
    }
    delete_block_not_undo(approach_id) {
        if (approach_id == this.focused_block) {
            this.remove_focus_from_block();
        }
        //Add to undo_manager
        const block = this.blocks.get(approach_id);

        //удаление из модели
        block.delete();
        delete this.blocks.get(approach_id);
        this.blocks.delete(approach_id);

        //Удаление блока из view
        window.main.blocks_view_space().remove_block(block);
    }
    /**
     *
     * @param {Block || int} object add similat block after reprted
     */
    clone_block(object) {
        let block;
        if (Number.isInteger(object)) {
            block = this.blocks.get(object);
        } else if (object instanceof Block) {
            block = object;
        } else {
            console.log("Невозможно склонировать переданный объект");
            return;
        }
        //WARNING DO NOT FORGET CHANGE CLIENT_ID
        const structure = block.get_stuctrure_as_json();
        structure.client_id = getUUID();
        this.add_block_from_json(structure, "after", block.wrapper);
    }
    #get_landmark_and_position_for_delete(approach_id) {
        var sortedIDs = window.main
            .blocks_view_space()
            .wrapper.sortable("toArray");
        const index = sortedIDs.indexOf(`${approach_id}`);
        if (index == 0) {
            return [window.main.blocks_view_space().wrapper, "prependTo"];
        }
        return [sortedIDs[index - 1], "after"];
    }
    set_attr_to_block(approach_id, attr, val) {
        this.blocks.get(approach_id).set_attr(attr, val);
    }
    add_class_to_block(approach_id, _class) {
        this.blocks.get(approach_id).add_class(_class);
    }
    remove_class_from_block(approach_id, _class) {
        this.blocks.get(approach_id).remove_class(_class);
    }
    set_focus_on_block(approach_id) {
        if (this.focused_block == null) {
            this.focused_block = approach_id;
            $(".constructor-overlay").css("display", "block");
            this.add_class_to_block(approach_id, "element-focus");
            window.main.create_block_menu(this.blocks.get(approach_id));
            this.blocks.get(approach_id).set_focus();
        } else if (this.focused_block == approach_id) {
            return;
        } else {
            this.remove_focus_from_block();
        }
    }
    remove_focus_from_block() {
        $(".constructor-overlay").css("display", "none");
        this.remove_class_from_block(this.focused_block, "element-focus");
        this.blocks.get(this.focused_block).remove_focus();
        this.focused_block = null;

        window.main.delete_block_menu();
    }
    get_number_of_block() {
        return this.blocks.size;
    }
    get_focused_block() {
        return this.focused_block;
    }
    focused_block = null;
    // approach id это уникальный идентификатор блока внутри модели. Он создается и хранится в модели на протяжении
    // всей сессии редактирования
}

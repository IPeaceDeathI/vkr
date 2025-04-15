import Api from "@/classes/Api";
import PopUpItems from "@/classes/PopUpItems";

export default class Buffer {
    constructor() {
        this.block_jsons = new Map();
        this.categories_blocks_comparison = new Map();
        this.categories_my_blocks_comparison = new Map();
        this.categories_templates_comparison = new Map();
        this.categories = [];
        this.template_categories = [];
    }
    set_favorite_status_to_block(block_id, status) {
        this.categories_blocks_comparison.forEach((blocks, id_category) => {
            blocks.forEach((block) => {
                if (block[1] == block_id) {
                    block[3] = status;
                    PopUpItems.set_favorite_status_to_block(block_id, status);
                }
            });
        });
    }
    async get_all_categories() {
        if (this.categories.length == 0) {
            this.categories = await Api.getAllCategories();
        }
        return this.categories;
    }

    async get_all_template_categories() {
        if (this.template_categories.length == 0) {
            this.template_categories = await Api.getAllTemplateCategories();
        }
        return this.template_categories;
    }

    get_template_by_id(id) {
        let json;
        $.ajax({
            url: `/api/templates/method?method=getTemplateById&id_tpl=${id}`,
            method: "GET",
            dataType: "json",
            //TODO убрать синхронннсть
            async: false,
            success: (response) => {
                if (response.status) json = response.data.tpl_blocks_structure;
                else throw `Ошибка загрузки шаблона по id ${id}`;
            },
            error: () => {
                throw `Ошибка загрузки шаблона по id ${id}`;
            },
        });

        return json;
    }

    async get_templates_from_category(category_id) {
        var tpls = this.categories_templates_comparison.get(category_id);
        if (tpls == null) {
            tpls = await Api.getTplsByCategory(category_id);
            this.categories_templates_comparison.set(category_id, tpls);
        }
        return tpls;
    }
    get_my_blocks_from_category(category_id) {
        var blocks = this.categories_my_blocks_comparison.get(category_id);
        if (blocks == null) {
            blocks = [];
            $.ajax({
                url: `/api/blocks/method/get_blocks_by_category?values[]=${category_id}&data=my`, //TODO ДОЛБАЕБ, У ТЕБЯ ДУБЛИРУЕТСЯ КОД ИЗ_ЗА ОДНОГО ПРАМЕТРА ПЕРЕПИСЫВАЙ
                method: "GET",
                //TODO убрать синхронннсть
                async: false,
                success: (response) => {
                    response["data"].forEach((block) => {
                        const preview = block["block_priority_preview_src"] ? block["block_priority_preview_src"] :  block["block_preview_src"];
                        blocks.push([
                            block["block_name"],
                            block["block_id"],
                            preview,
                            block["creator_id"],
                        ]);
                    });
                },
                error: function () {
                    throw "Ошибка загрузки блоков по текущей категории";
                },
            });
            this.categories_my_blocks_comparison.set(category_id, blocks);
        }
        return blocks;
    }
    async get_blocks_from_category(category_id) {
        var blocks = this.categories_blocks_comparison.get(category_id);
        if (blocks == null) {
            const _blocks = await Api.getBlocksByCategory(category_id);
            this.categories_blocks_comparison.set(category_id, _blocks);
            blocks = _blocks;
        }
        return blocks;
    }

    get_json_block(id) {
        var json_block = this.block_jsons.get(id);
        if (json_block == null) {
            $.ajax({
                url: `/api/blocks/method/get_block?values[]=${id}&data=full`,
                method: "GET",
                dataType: "json",
                //TODO убрать синхронннсть
                async: false,
                success: (response) => {
                    if (response["status"] == false) {
                        Api.send_to_tg(`Method: get_json_block()\nid=${id}\n`);
                        return;
                    }
                    json_block = response.data;
                    json_block = JSON.parse(json_block[0]["block_structure"]);
                    json_block.id = response.data[0]["block_id"];
                    json_block.name = response.data[0]["block_name"];
                    json_block.status =
                        response.data[0]["block_status"]==1 ? 1 : false;
                },
                error: function () {
                    Api.send_to_tg(`Method: get_json_block()\nid=${id}\n`);
                },
            });
            this.block_jsons.set(id, json_block);
        }
        return structuredClone(json_block);
    }

    set_json_block(id, json) {
        this.block_jsons.set(id, json);
    }
}

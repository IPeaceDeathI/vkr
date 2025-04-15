import Block from "@/classes/Block";
export default class BlocksFactory {
    static get_by_id(id, approach_id) {
        var json = window.main.buffer.get_json_block(id);
        if (json == null) return false;
        return new Block(json, approach_id);
    }
}

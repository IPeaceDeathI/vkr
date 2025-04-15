import { CommandInteface } from "@/classes/Command";

export default class UndoManager {
    constructor() {
        if (UndoManager._instance) {
            return UndoManager._instance;
        }
        this.command_stack = [];
        UndoManager._instance = this;
    }
    /**\
     * @param {CommandInteface} command
     */
    push(command) {
        this.command_stack.push(command);
        window.main.menu_top.set_title_btn_undo_manager(command.description);
    }
    execute() {
        let activeObj = document.activeElement;
        if (
            this.command_stack.length > 0 &&
            !window.main.has_text_editor() &&
            !(activeObj.tagName == "INPUT") &&
            !(activeObj.tagName == "TEXTAREA") &&
            !activeObj.isContentEditable
        ) {
            try {
                const command = this.command_stack.pop();
                if (this.top()) {
                    window.main.menu_top.set_title_btn_undo_manager(
                        this.top().description
                    );
                } else {
                    window.main.menu_top.disable_btn_undo_manager();
                }
                command.execute();
            } catch (error) {
                console.log(error);
            }
        }
    }
    top() {
        if (this.command_stack.length > 0) {
            return this.command_stack[this.command_stack.length - 1];
        } else return false;
    }
}

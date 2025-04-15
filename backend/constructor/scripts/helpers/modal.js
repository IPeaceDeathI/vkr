export class ModalHelper {
    static image = null;
    static show_loading() {
        this.show_image_modal("/images/loading.gif", true);
    }
    static close_loading() {
        this.close_image_modal();
    }
    static show_image_modal(href = "1", is_locked = false) {
        const modal = $(` <a href="${href}" style="display:none;"></a>`);
        modal.modaal({
            type: "image",
            is_locked: is_locked,
        });
        modal.modaal("open");
        $(".modaal-container").css("background-color", "transparent");

        this.image = modal;
    }
    static close_image_modal() {
        if (this.image) {
            this.image.modaal("close");
            this.image.remove();
            this.image = null;
        }
    }
    static show_inline_modal(text) {
        $("#noks-modal-inline").html(text);
        const modal = $(
            ' <a href="#noks-modal-inline" style="display:none;"></a>'
        );
        modal.modaal({
            type: "inline",
        });
        modal.modaal("open");
        modal.remove();
    }
    static show_confirm_modal(text) {
        const modal = $(
            ' <a href="javascript:void(0)" style="display:none;"></a>'
        );
        modal.modaal({
            type: "confirm",
            confirm_button_text: "Confirm",
            confirm_cancel_button_text: "Cancel",
            confirm_title: "Confirm Action XYZ",
            confirm_content: text,
            confirm_callback: function () {
                alert("you have confirmed this action");
            },
            confirm_cancel_callback: function () {
                alert("you have cancelled this action");
            },
        });
        modal.modaal("open");
        modal.remove();
    }
}

export default class LeftMenu {
    wrapper = $('<div class="menu-triple-one-wrapper"></div>');
    settings = $('<div class="settings-wrapper"></div>');
    toolbar = $('<div class="toolbar-wrapper"></div>');
    zero_editor_button_is_active = false;
    constructor() {
        this.wrapper.appendTo($(".menu-triple-one"));
        this.#render();
    }

    #render() {
        this.toolbar.prependTo(this.wrapper);
        this.settings.appendTo(this.wrapper);

        this.#add_save_button();
        this.#add_on_main_button();
        this.#add_user_id();
    }
    hide() {
        $(".menu-triple-one").css("display", "none");
        // this.wrapper.css('display', 'none')
    }
    show() {
        $(".menu-triple-one").css("display", "block");
        // this.wrapper.css('display', 'block')
    }
    add_device(_class, description) {
        this.device = $(`<div class="settings-device">
						<div class="${_class}" data-tooltip="${description}"></div></div>`);
        this.device.appendTo(this.toolbar);
    }
    delete_device() {
        this.device.remove();
    }
    add_zero_editor_button() : void {
        // this.zero_editor_button = $(`<a class="add_zero_editor_button"></a>`)
        // .appendTo(this.toolbar).on('click', function(){
        //     (window as unknown as MyWindow).main.loading_zero_editor()
        // })
    }
    delete_zero_editor_button() : void {
        // this.zero_editor_button.remove();
    }
    #add_save_button() {
        const svg =
            $(`<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_769_141)">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M10.9999 7.33333H16.7036V3.25927H10.9999V7.33333ZM5.29618 22H16.7036V12.2223H5.29618V22ZM21.5924 6.72194V0V3.66671L18.0616 0H2.7612V0.00209412C2.57619 0.000819438 2.38116 9.10487e-05 2.17266 9.10487e-05C1.19771 9.10487e-05 0.407227 0.820895 0.407227 1.83345V20.1667C0.407227 21.1792 1.19771 22 2.17266 22C2.40101 22 2.59549 21.9974 2.7612 21.9902V21.9999H3.66659V21.5633C3.71539 21.3205 3.66659 20.9474 3.66659 20.3703V12.2222C3.66659 10.9615 4.11145 10.5926 5.29618 10.5926H16.7036C17.9138 10.5926 18.3332 11.0125 18.3332 12.2222V21.9999H19.2386V21.9891C19.4059 22.0003 19.6002 21.9999 19.8269 21.9999C20.802 21.9999 21.5924 21.179 21.5924 20.1666V6.72221V6.72194ZM18.3333 6.51854C18.3333 7.75371 17.9139 8.14813 16.7037 8.14813H6.11097C4.90084 8.14813 4.48147 7.70281 4.48147 6.51854V4.07416C4.48147 2.8389 4.90075 2.44457 6.11097 2.44457H16.7036C17.9393 2.44457 18.3332 2.83899 18.3332 4.07416V6.51854H18.3333Z" fill="white"/>
		</g>
		<defs>
		<clipPath id="clip0_769_141">
		<rect width="22" height="22" fill="white"/>
		</clipPath>
		</defs>
		</svg>`);
        $(`<div class="btn-save"></div>`)
            .appendTo(this.settings)
            .append(svg)
            .click(function () {
                window.main.save_page();
            });
    }
    #add_on_main_button() {
        $(`<a class="btn-on-main" href="/"></a>`)
            .appendTo(this.toolbar)
    }
    #add_user_id() {
        if (window.main.env_params["user_id"]) {
            $(
                `<div style="text-align:center; padding:0.3em; text-overflow: ellipsis; overflow:hidden; font-size: 9px;">id ${window.main.env_params["user_id"]}</div>`
            ).appendTo(this.toolbar);
        }
    }
}

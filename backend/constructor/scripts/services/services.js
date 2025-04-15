import Api from "@/classes/Api";

export function set_targeting_event(za_kem_smotryat, observer) {
    za_kem_smotryat.on("mouseover", () => {
        observer.addClass("tag-in-focus");
    });
    za_kem_smotryat.on("mouseout", () => {
        observer.removeClass("tag-in-focus");
    });
}

export function position_remake_string_to_percent_X(string) {
    switch (string) {
        case "center":
            return 50;
        case "right":
            return 100;    
        case "left":
            return 0;
        case "bottom":
            return 50;
        case "top":
            return 50;
        // case "unset":
        //     return 50;
        case null:
            return 50;
        default:
            console.log(string);
            let int = parseInt(string);
            if (!Number.isNaN(int)) return int;
            console.log(
                `%c Указано название ${string}, которое не обрабатывается! `,
                "color: #ff0000"
            );
    }
}

export function position_remake_string_to_percent_Y(string) {
    switch (string) {
        case "center":
            return 50;
        case "right":
            return 50;    
        case "left":
            return 50;
        case "bottom":
            return 100;
        case "top":
            return 0;
        // case "unset":
        //     return 50;
        case null:
            return 50;
        default:
            console.log(string);
            let int = parseInt(string);
            if (!Number.isNaN(int)) return int;
            console.log(
                `%c Указано название ${string}, которое не обрабатывается! `,
                "color: #ff0000"
            );
    }
}

export async function get_site_preview() {
    try {
        let result = false;
        const BLOCK_PREVIEW_WIDTH = 350;
        const width_scale =
            BLOCK_PREVIEW_WIDTH /
            window.main.blocks_view_space().wrapper.width();
        await html2canvas(
            document.querySelector(".constructor-page .element-box"),
            {
                letterRendering: 1,
                allowTaint: true,
                useCORS: true,
                scale: width_scale,
            }
        )
            .then((canvas) => {
                return Api.save_images_from_base64(canvas);
            })
            .then((image_src) => {
                result = image_src;
            })
            .catch((error) => {
                console.error(error);
            });
        return result;
    } catch (error) {
        Api.send_to_tg(`Method: get_site_preview;\nError: ${error}`);
    }
}

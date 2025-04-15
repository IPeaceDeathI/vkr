// 1) СИНТЕГРИРОВАТЬСЯ С ГРАДИЕНТ ПИКЕРОМ
// 2) ДОБАВИТЬ ВОПРОСИК, ПРИ НАЖАТИИ КОТОРОГО БУДЕТ ПОПАП С ГИФКОЙ ДЛЯ ПОЯСНЕНИЯ РАБОТЫ
// 3) РЕАЛИЗОВАТЬ ПОПАП, ПРИ НАЖАТИИ ВНЕ КОТОРОГО ОН БУДЕТ ЗАКРЫВАТЬСЯ через namespace

import { TagOptionMap } from "@/constant";

// const EnumBackgroundStyles = {
//     BACKGROUND_COLOR: 0,
//     BACKGROUND_IMAGE: 1,
//     BACKGROUND_GRADIENT: 2,
// };

export default class TagBackgroundManager {
    #parent_has_fill = false;
    constructor(parent) {
        this.parent = parent;
        if (!parent) {
            console.error("Родительский элемент не найден");
            return;
        }
        this.#validator_1();
        this.#validator_2();
        this.parent_has_fill();
    }

    parent_has_fill() {
        if (
            this.parent
                .get_tags_options()
                .has(EnumOption.BACKGROUND_GRADIENT) ||
            this.parent.get_tags_options().has(EnumOption.BACKGROUND_IMAGE) ||
            this.parent.get_tags_options().has(EnumOption.BACKGROUND_COLOR)
        ) {
            this.#parent_has_fill = true;
        }
    }

    get_fill() {
        return this.#parent_has_fill;
    }

    #validator_1() {
        if (this.parent.get_jq()) {
            if (this.parent.get_jq().css("background")) {
                if (
                    !this.parent
                        .get_tags_options()
                        .has(EnumOption.BACKGROUND_GRADIENT)
                ) {
                    this.parent
                        .get_tags_options()
                        .set(
                            EnumOption.BACKGROUND_GRADIENT,
                            TagOptionMap(EnumOption.BACKGROUND_GRADIENT)(
                                this.parent.get_jq().css("background")
                            )
                        );
                }
                // if (this.parent.get_jq().css('bacground-color')) {
                //     this.parent.get_jq().css('bacground-color', '')
                // }
                // if (this.parent.get_jq().css('bacground-image')) {
                //     this.parent.get_jq().css('bacground-image', '')
                // }
            }
            if (this.parent.get_jq().css("background-color")) {
                if (
                    !this.parent
                        .get_tags_options()
                        .has(EnumOption.BACKGROUND_COLOR)
                ) {
                    this.parent
                        .get_tags_options()
                        .set(
                            EnumOption.BACKGROUND_COLOR,
                            TagOptionMap(EnumOption.BACKGROUND_COLOR)(
                                this.parent.get_jq().css("background-color")
                            )
                        );
                }
            }
            if (this.parent.get_jq().css("background-image")) {
                if (
                    !this.parent
                        .get_tags_options()
                        .has(EnumOption.BACKGROUND_IMAGE)
                ) {
                    this.parent
                        .get_tags_options()
                        .set(
                            EnumOption.BACKGROUND_IMAGE,
                            TagOptionMap(EnumOption.BACKGROUND_IMAGE)(
                                this.parent.get_jq().css("background-image")
                            )
                        );
                }
            }
        }
    }

    #validator_2() {
        if (this.parent.get_tags_options()) {
            if (
                this.parent
                    .get_tags_options()
                    .has(EnumOption.BACKGROUND_GRADIENT) ||
                this.parent
                    .get_tags_options()
                    .has(EnumOption.BACKGROUND_IMAGE) ||
                this.parent.get_tags_options().has(EnumOption.BACKGROUND_COLOR)
            ) {
                if (
                    this.parent
                        .get_tags_options()
                        .has(EnumOption.BACKGROUND_COLOR) &&
                    (this.parent
                        .get_tags_options()
                        .has(EnumOption.BACKGROUND_GRADIENT) ||
                        this.parent
                            .get_tags_options()
                            .has(EnumOption.BACKGROUND_IMAGE))
                ) {
                    this.parent
                        .get_tags_options()
                        .delete(EnumOption.BACKGROUND_COLOR);
                }
                if (
                    this.parent
                        .get_tags_options()
                        .has(EnumOption.BACKGROUND_IMAGE) &&
                    this.parent
                        .get_tags_options()
                        .has(EnumOption.BACKGROUND_GRADIENT)
                ) {
                    this.parent
                        .get_tags_options()
                        .delete(EnumOption.BACKGROUND_IMAGE);
                }
            }
        }
    }

    set_color(value = undefined) {
        if (this.parent.get_tags_options().has(EnumOption.BACKGROUND_COLOR)) {
            return;
        }
        const params = {};
        params.parent = this.parent;
        if (value) {
            params.val = value;
        }
        const ColorTagOption = TagOptionMap(EnumOption.BACKGROUND_COLOR)(
            params
        );
        // console.log(TagOptionMap(EnumOption.BACKGROUND_COLOR)(params))
        this.parent.get_tags_options().delete(EnumOption.BACKGROUND_IMAGE);
        this.parent.get_tags_options().delete(EnumOption.BACKGROUND_GRADIENT);
        this.parent
            .get_tags_options()
            .set(EnumOption.BACKGROUND_COLOR, ColorTagOption);
        this.parent.update_all_options(); //TODO РАСКОММЕНТИТЬ
        return ColorTagOption;
    }
    set_img(value = undefined) {
        if (this.parent.get_tags_options().has(EnumOption.BACKGROUND_IMAGE)) {
            return;
        }
        const params = {};
        params.parent = this.parent;
        if (value) {
            params.val = value;
        }
        const ImageTagOption = TagOptionMap(EnumOption.BACKGROUND_IMAGE)(
            params
        );
        // console.log(TagOptionMap(EnumOption.BACKGROUND_COLOR)(params))
        this.parent.get_tags_options().delete(EnumOption.BACKGROUND_COLOR);
        this.parent.get_tags_options().delete(EnumOption.BACKGROUND_GRADIENT);
        this.parent
            .get_tags_options()
            .set(EnumOption.BACKGROUND_IMAGE, ImageTagOption);
        this.parent.update_all_options(); //TODO РАСКОММЕНТИТЬ
        return ImageTagOption;
    }
    set_gradient(value = undefined) {
        if (
            this.parent.get_tags_options().has(EnumOption.BACKGROUND_GRADIENT)
        ) {
            return;
        }
        const params = {};
        params.parent = this.parent;
        if (value) {
            params.val = value;
        }
        const GradientTagOption = TagOptionMap(EnumOption.BACKGROUND_GRADIENT)(
            params
        );
        this.parent.get_tags_options().delete(EnumOption.BACKGROUND_IMAGE);
        this.parent.get_tags_options().delete(EnumOption.BACKGROUND_COLOR);
        this.parent
            .get_tags_options()
            .set(EnumOption.BACKGROUND_GRADIENT, GradientTagOption);
        this.parent.update_all_options(); //TODO РАСКОММЕНТИТЬ
        return GradientTagOption;
    }
}

//1 новый TAG унаследовать от Observable
//2 создать новый класс editorsTag на основе Editors
//3
//4

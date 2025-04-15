<script>
import Icon from "@/components/ui/AdminIcon.vue";

export default {
    components: { Icon },
};
</script>

<template>
    <div
        class="list-top-nav__icon-button list-top-nav__icon-button_dark list-top-nav__icon-button_context list-top-nav__button-more"
    >
        <div
            :class="
                'button-input-wrapper button-input-more ' +
                (pressed ? 'button-input-wrapper-pressed' : '')
            "
        >
            <button
                type="button"
                tabindex=""
                title="Еще"
                :class="
                    'button-input  button-input-with-menu ' +
                    (pressed ? 'button-input-pressed' : '')
                "
                @click="pressed = !pressed"
            >
                <span class="button-input-inner button-input-more-inner">
                    <!-- <svg class="svg-icon svg-controls--button-more-dims">
                    <use xlink:href="#controls--button-more"></use>
                </svg> -->
                    <Icon
                        path="settings"
                        name="dots"
                        size="14"
                        class="svg-icon svg-controls--button-more-dims"
                    />
                </span>
            </button>
            <ul class="button-input__context-menu context-menu-pipeline">
                <li
                    class="button-input__context-menu__item element__ list-top-nav__button-setup_context"
                    id=""
                >
                    <a
                        href="/settings/pipeline/leads/6917214"
                        class="js-navigate-link button-input__context-menu__item__link button-input__context-menu__item__inner"
                    >
                        <span
                            class="button-input__context-menu__item__icon-container"
                        >
                            <!-- <svg class="button-input__context-menu__item__icon svg-icon svg-common--settings-dims ">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#common--settings"></use>
                        </svg> -->
                            <!-- <Icon path="core" name="move-up" size="18"
                            class="button-input__context-menu__item__icon svg-icon svg-common--settings-dims "
                        /> -->
                        </span>
                        <span class="button-input__context-menu__item__text"
                            >Настроить воронку</span
                        ></a
                    >
                </li>
                <li
                    class="button-input__context-menu__item element__ js-list-export"
                    id=""
                >
                    <div class="button-input__context-menu__item__inner">
                        <span
                            class="button-input__context-menu__item__icon-container"
                        >
                            <svg
                                class="button-input__context-menu__item__icon svg-icon svg-common--download-dims"
                            >
                                <use
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    xlink:href="#common--download"
                                ></use>
                            </svg>
                            <Icon
                                path="addons"
                                name="download"
                                size="12"
                                class="button-input__context-menu__item__icon svg-icon svg-common--settings-dims"
                            />
                        </span>
                        <span class="button-input__context-menu__item__text"
                            >Экспорт</span
                        >
                    </div>
                </li>
                <li
                    class="button-input__context-menu__item element__ js-list-print"
                    id=""
                >
                    <div class="button-input__context-menu__item__inner">
                        <span
                            class="button-input__context-menu__item__icon-container"
                        >
                            <Icon
                                path="lead"
                                name="range"
                                size="12"
                                class="button-input__context-menu__item__icon svg-icon svg-common--settings-dims"
                            />
                        </span>
                        <span class="button-input__context-menu__item__text"
                            >Печать</span
                        >
                    </div>
                </li>
                <li
                    class="button-input__context-menu__item element__ js-list-settings"
                    id=""
                >
                    <div class="button-input__context-menu__item__inner">
                        <span
                            class="button-input__context-menu__item__icon-container"
                        >
                            <Icon
                                path="core"
                                name="layers"
                                size="12"
                                class="button-input__context-menu__item__icon svg-icon svg-common--settings-dims"
                            />
                        </span>
                        <span class="button-input__context-menu__item__text"
                            >Настройки таблицы</span
                        >
                    </div>
                </li>
                <li
                    class="button-input__context-menu__item element__ js-duplicate-search"
                    id=""
                >
                    <div class="button-input__context-menu__item__inner">
                        <span
                            class="button-input__context-menu__item__icon-container"
                        >
                            <Icon
                                path="core"
                                name="preset"
                                size="12"
                                class="button-input__context-menu__item__icon svg-icon svg-common--settings-dims"
                            />
                        </span>
                        <span class="button-input__context-menu__item__text"
                            >Поиск дублей</span
                        >
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

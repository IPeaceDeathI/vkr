<script>
import Icon from "@/components/ui/AdminIcon.vue";
import { NOKS_HOST } from "@/shared/config";

export default {
    components: { Icon },
};
</script>

<template>
    <div class="feed-search-wrapper js-feed-search-wrapper">
        <div class="feed-search js-feed-search">
            <div
                class="list-top-search list-top-search-responsive"
                id="search_input_wrapper"
            >
                <div class="search-options" id="search-options">
                    <div
                        class="list-top-search__preset"
                        id="search_filter_preset"
                    ></div>
                    <div class="search-options-wrapper"></div>
                </div>
                <div class="list-top-search__input-wrapper">
                    <div class="list-top-search__apply-block h-hidden">
                        <button
                            class="list-top-search__apply-button js-filter-apply"
                        >
                            <span>Искать</span>
                        </button>
                    </div>
                    <div class="list-top-search__input-block">
                        <span
                            class="list-top-search__input list-top-search__input-placeholder"
                            >Поиск и фильтр</span
                        >
                        <div
                            class="feed-search__controls js-feed-search-nav hidden"
                        >
                            <span
                                class="feed-search__controls-total js-feed-search-total"
                            ></span
                            ><span
                                class="feed-search__controls-button feed-search__controls-button_down js-feed-search-prev"
                                ><svg
                                    width="9"
                                    height="10"
                                    viewBox="0 0 9 10"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4.5 9V1M4.5 1L1 4.5M4.5 1L8 4.5"
                                        stroke="white"
                                        stroke-linecap="round"
                                    ></path></svg></span
                            ><span
                                class="feed-search__controls-button feed-search__controls-button_up js-feed-search-next"
                                ><svg
                                    width="9"
                                    height="10"
                                    viewBox="0 0 9 10"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4.5 9V1M4.5 1L1 4.5M4.5 1L8 4.5"
                                        stroke="white"
                                        stroke-linecap="round"
                                    ></path></svg
                            ></span>
                        </div>
                        <div
                            class="list-top-search__info h-hidden"
                            id="search_clear_button"
                        >
                            <span
                                class="list-top-search__actions-icon list-top-search__actions-icon_cancel js-search-cancel"
                                ><svg
                                    class="svg-icon svg-common--cross-close-dims"
                                >
                                    <use
                                        xlink:href="#common--cross-close"
                                    ></use></svg></span
                            ><span
                                class="list-top-search__actions-icon list-top-search__actions-icon_hide js-search-hide"
                                ><svg
                                    class="svg-icon svg-common--cross-close-dims"
                                >
                                    <use
                                        xlink:href="#common--cross-close"
                                    ></use></svg
                            ></span>
                        </div>
                        <div
                            class="list-top-search__info h-hidden"
                            id="search_loader"
                        >
                            <span class="spinner-icon"></span>
                        </div>
                    </div>
                    <div class="hidden"></div>
                </div>
                <label for="">
                    <Icon
                        path="core"
                        name="search"
                        size="18"
                        class="list-top-search__icon svg-icon svg-common--filter-search-dims"
                    />
                </label>
            </div>
            <div class="list__top__actions js-feed-search-context-menu">
                <div class="button-input-wrapper button-input-more">
                    <button
                        type="button"
                        class="button-input button-input-with-menu"
                        tabindex=""
                        title="Еще"
                    >
                        <span
                            class="button-input-inner button-input-more-inner"
                        >
                            <Icon
                                path="projects"
                                name="more"
                                size="14"
                                class="svg-icon svg-controls--button-more-dims"
                            />
                        </span>
                    </button>
                    <ul
                        class="button-input__context-menu context-menu-pipeline context-menu__correct-position"
                    >
                        <li
                            class="button-input__context-menu__item button-input__context-menu__item-checkable element__ context-menu__item js-feed-search-need-msec"
                            id=""
                        >
                            <div
                                class="button-input__context-menu__item__inner"
                            >
                                <span
                                    class="button-input__context-menu__item__icon-container"
                                    ><svg
                                        class="button-input__context-menu__item__icon svg-icon svg-cards--millisecond-dims"
                                    >
                                        <use
                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                            xlink:href="#cards--millisecond"
                                        ></use></svg></span
                                ><span
                                    class="button-input__context-menu__item__text"
                                    >Показывать миллисекунды</span
                                >
                                <svg
                                    class="button-input__context-menu__item__icon svg-icon svg-controls--select-checked-dims"
                                >
                                    <use
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        xlink:href="#controls--select-checked"
                                    ></use>
                                </svg>
                            </div>
                        </li>
                        <li
                            class="button-input__context-menu__item button-input__context-menu__item-checkable element__ context-menu__item js-feed-search-need-open-talks-preview"
                            id=""
                            data-checkable-checked=""
                        >
                            <div
                                class="button-input__context-menu__item__inner"
                            >
                                <span
                                    class="button-input__context-menu__item__icon-container"
                                    ><svg
                                        class="button-input__context-menu__item__icon svg-icon svg-cards--talks-labels-dims"
                                    >
                                        <use
                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                            xlink:href="#cards--talks-labels"
                                        ></use></svg></span
                                ><span
                                    class="button-input__context-menu__item__text"
                                    >Показывать плашки бесед</span
                                >
                                <svg
                                    class="button-input__context-menu__item__icon svg-icon svg-controls--select-checked-dims"
                                >
                                    <use
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        xlink:href="#controls--select-checked"
                                    ></use>
                                </svg>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

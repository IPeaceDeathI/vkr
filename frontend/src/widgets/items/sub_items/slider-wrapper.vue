<template>
    <section
        class="splide pa-0"
        :class="{ 'splide_card-variant': variant === 'card' }"
        v-bind="attributes"
        ref="splide"
        :key="sliderKey"
        aria-label="Basic Structure Example"
    >
        <div class="splide__arrows">
            <button
                class="splide__arrow splide__arrow--prev"
                v-html="ArrowFabric[arrowType]"
            ></button>
            <button
                class="splide__arrow splide__arrow--next"
                v-html="ArrowFabric[arrowType]"
            ></button>
        </div>
        <div class="splide__track">
            <ul v-if="variant === 'media'" class="splide__list">
                <slot></slot>
            </ul>
            <slot v-else-if="variant === 'card'"></slot>
        </div>
    </section>
    <!-- DEVELOP -->
    <!-- <template v-if="params.indicatorsType == IndicatorsType.lines">
        <section id="main" aria-label="Beautiful Images">
            <div class="splide__arrows">
                <button
                    class="splide__arrow splide__arrow--prev"
                    v-html="ArrowFabric[arrowType]"
                ></button>
                <button
                    class="splide__arrow splide__arrow--next"
                    v-html="ArrowFabric[arrowType]"
                ></button>
            </div>
            <div class="splide__track">
                <ul class="splide__list">
                    <slot name="main"></slot>
                </ul>
            </div>
        </section>
    </template> -->
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";
import {
    ArrowType,
    CommonSliderParams,
    ElementVisibility,
    IndicatorsPosition,
    IndicatorsType,
    SliderEffect,
} from "@/types";
import Splide from "@splidejs/splide";
import { ArrowFabric } from "@/shared/services/elements_fabrics/commonParams";
// Default theme
import "@splidejs/splide/css";
import { PublishTargetAttributes } from "@/publish/target-attributes";
// core styles
// import "@splidejs/splide/css/core";
// or other themes
// import "@splidejs/splide/css/skyblue";
// import "@splidejs/splide/css/sea-green";
export default defineComponent({
    props: {
        params: {
            type: Object as PropType<CommonSliderParams>,
            required: true,
        },
        sliderEffect: {
            type: String as PropType<SliderEffect>,
            required: true,
        },
        sideSlides: {
            type: Boolean,
            default: false,
        },
        variant: {
            //TODO Добавить поддержку на PUBLISH
            type: String as PropType<"media" | "card">,
            default: "media",
        },
    },
    data() {
        return {
            slidesInRow: 1,
            sliderKey: 0,
            ArrowFabric: ArrowFabric,
            IndicatorsType: IndicatorsType,
            sliderParams: this.params,
            sliderHolder: {} as Splide,
        };
    },
    mounted() {
        this.renderSlider();
    },
    methods: {
        renderSlider() {
            try {
                if (this.sliderHolder.destroy) {
                    this.sliderHolder.destroy();
                }

                const splideDOM = this.$refs.splide as HTMLElement;
                //FOR_PUBLISH
                this.slidesInRow = this.$store.getters[
                    "environment/isDesktopViewport"
                ]
                    ? parseInt(
                          splideDOM
                              .querySelector(".splide__list")
                              ?.getAttribute("data-noks-cards") ?? "1"
                      )
                    : 1;
                const splide = new Splide(this.$refs.splide as HTMLElement, {
                    type:
                        this.sliderEffectComputed === "loop"
                            ? "slider"
                            : this.sliderEffectComputed, //only constructor
                    width: "100%",
                    drag: false, //only constructor
                    rewindByDrag: false, //only constructor
                    rewind: false, //only constructor
                    perPage: this.slidesInRow,
                    padding: this.paddings,
                    perMove: 1,
                    pagination: this.sliderPagination,
                    autoplay: this.params.autoPlaySlider.enabled,
                }); //rerender -> посмотреть через console log с помощью action "save"(внутри экшена консольложить)
                if (this.params.autoPlaySlider.enabled) {
                    splide.on("mounted", () => {
                        splide.Components.Elements.slides.forEach((item) => {
                            item.setAttribute(
                                "data-splide-interval",
                                (
                                    this.params.autoPlaySlider.value * 1000
                                ).toString()
                            );
                        });
                    });
                }
                splide.on("mounted", () => {
                    if (
                        this.params.indicatorsPosition ==
                            IndicatorsPosition.outside &&
                        splide.root.children[2]
                    ) {
                        splide.root.children[2].classList.add(
                            "position_outside"
                        ); // так нада, но черт знает, мб сломаться может эта залупка
                        splide.Components.Elements.pagination?.classList.add(
                            "position_outside"
                        );
                    }
                    if (
                        this.indicatorType == IndicatorsType.dots &&
                        splide.root.children[2]
                    ) {
                        splide.root.children[2].classList.add(
                            "slider__pagination_dots"
                        );
                    }
                    if (this.variant === "card") {
                        const list = splide.Components.Elements.list;
                        const listWidth = list.clientWidth;
                        const slidesInRow = parseInt(
                            list.getAttribute("data-noks-cards") ?? "1"
                        );
                        splide.Components.Elements.slides.forEach((item) => {
                            item.style.width = `${
                                listWidth /
                                (Number.isNaN(slidesInRow) ? 0 : slidesInRow)
                            }px`;
                        });
                    }
                });
                if (this.indicatorType == IndicatorsType.numbers) {
                    splide.on("pagination:mounted", (data) => {
                        // You can add your class to the UL element
                        data.list.classList.add("splide__pagination--custom");

                        // `items` contains all dot items
                        data.items.forEach((item) => {
                            item.button.textContent = String(item.page + 1);
                            item.li.classList.add("slider__pagination_numbers");
                        });
                        // data.items.forEach(function (item) {
                        //     item.button.textContent = String(item.page + 1);
                        //     item.li.classList.add("slider__pagination_numbers");
                        // });
                        // data.items[data.items.length - 1].li.classList.add(
                        //     "slider__pagination_number_last"
                        // );
                    });
                }
                // if (this.indicatorType == IndicatorsType.none) {
                //     const splide = new Splide(".splide", {
                //         type: this.sliderEffectComputed,
                //         width: "100%",
                //         wheel: true,
                //         pagination: false,
                //     });
                //     splide.mount();
                // } else if (this.indicatorType == IndicatorsType.dots) {
                //     const splide = new Splide(".splide", {
                //         type: this.sliderEffectComputed,
                //         width: "100%",
                //         wheel: true,
                //     });
                //     splide.mount();
                // } else if (this.indicatorType == IndicatorsType.numbers) {
                //     const splide = new Splide(".splide", {
                //         type: this.sliderEffectComputed,
                //         width: "100%",
                //         wheel: true,
                //     });
                //     splide.on("pagination:mounted", (data) => {
                //         // You can add your class to the UL element
                //         data.list.classList.add("splide__pagination--custom");

                //         // `items` contains all dot items
                //         data.items.forEach(function (item) {
                //             item.button.textContent = String(item.page + 1);
                //             item.li.classList.add("slider__pagination_numbers");
                //         });
                //         // data.items.forEach(function (item) {
                //         //     item.button.textContent = String(item.page + 1);
                //         //     item.li.classList.add("slider__pagination_numbers");
                //         // });
                //         // data.items[data.items.length - 1].li.classList.add(
                //         //     "slider__pagination_number_last"
                //         // );
                //     });
                //     splide.mount();
                // } else if (this.indicatorType == IndicatorsType.lines) {
                //     const main = new Splide("#main", {
                //         type: "fade",
                //         rewind: true,
                //         pagination: false,
                //     });
                //     const thumbnails = new Splide(".splide", {
                //         rewind: true,
                //         fixedWidth: 104,
                //         fixedHeight: 58,
                //         isNavigation: true,
                //         gap: 10,
                //         focus: "center",
                //         pagination: false,
                //         cover: true,
                //         dragMinThreshold: {
                //             mouse: 4,
                //             touch: 10,
                //         },
                //         breakpoints: {
                //             640: {
                //                 fixedWidth: 66,
                //                 fixedHeight: 38,
                //             },
                //         },
                //     });

                //     main.sync(thumbnails);
                //     main.mount();q
                //     thumbnails.mount();
                // }
                splide.mount();
                this.sliderHolder = splide;
            } catch (error) {
                // DEVELOP
            }
        },
    },
    computed: {
        sliderEffectComputed(): string {
            if (this.sliderEffect == SliderEffect.dissolution) return "fade";
            else if (this.cycleSlides) return "loop";
            else return "slider";
        },
        paddings(): string {
            return this.sideSlides ? "5rem" : "0";
        },
        rewind() {
            return (
                this.sliderEffect === SliderEffect.dissolution &&
                this.cycleSlides
            );
        },
        sliderPagination(): boolean {
            if (this.indicatorType == IndicatorsType.none) return false;
            else return true;
        },
        indicatorType(): IndicatorsType {
            return this.params.indicatorsType;
        },
        cycleSlides(): boolean {
            return this.params.cycleSlides;
        },
        arrowType(): ArrowType {
            return this.params.arrow;
        },
        attributes(): {
            [PublishTargetAttributes.mediaSlider]: string;
            "data-gallery-slider-indicator-type": IndicatorsType;
            "data-gallery-slider-indicator-pos": IndicatorsPosition;
            "data-gallery-slider-effect": string;
            "data-gallery-slider-autoplay": boolean;
            "data-gallery-slider-autoplay-value": number;
            "data-gallery-slider-rewind": boolean;
            "data-gallery-slider-padding": string;
            "data-gallery-slider-variant": "media" | "card";
        } {
            return {
                [PublishTargetAttributes.mediaSlider]: "",
                "data-gallery-slider-indicator-type": this.indicatorType,
                "data-gallery-slider-indicator-pos":
                    this.params.indicatorsPosition,
                "data-gallery-slider-effect": this.sliderEffectComputed,
                "data-gallery-slider-autoplay":
                    this.params.autoPlaySlider.enabled,
                "data-gallery-slider-autoplay-value":
                    this.params.autoPlaySlider.value,
                "data-gallery-slider-rewind": this.rewind,
                "data-gallery-slider-padding": this.paddings,
                "data-gallery-slider-variant": this.variant,
            };
        },
        viewPort() {
            return this.$store.getters["environment/isDesktopViewport"];
        },
        previewPublish() {
            return this.$store.getters["environment/isEditable"];
        },
    },
    watch: {
        params: {
            handler() {
                this.renderSlider();
            },
        },
        viewPort: {
            handler() {
                this.renderSlider();
            },
        },
        previewPublish: {
            handler(val) {
                if (val) {
                    this.renderSlider();
                } else {
                    // this.$forceUpdate;
                    this.sliderKey += 1;
                }
            },
            flush: "post",
        },
    },
});
</script>
<style lang="scss"></style>

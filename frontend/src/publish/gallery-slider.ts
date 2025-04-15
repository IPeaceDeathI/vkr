import { IndicatorsPosition, IndicatorsType } from "@/types";
import { PublishTargetAttributes } from "./target-attributes";
import Splide from "@splidejs/splide";
try {
    const mediaSliders = document.querySelectorAll(
        `[${PublishTargetAttributes.mediaSlider}]`
    ) as NodeListOf<HTMLFormElement>;

    mediaSliders.forEach((slider) => {
        const indicatorType: IndicatorsType =
            (slider.getAttribute(
                "data-gallery-slider-indicator-type"
            ) as IndicatorsType) ?? IndicatorsType.none;

        let sliderEffect: string =
            slider.getAttribute("data-gallery-slider-effect") ?? "loop";

        const autoplay: boolean =
            slider.getAttribute("data-gallery-slider-autoplay") == "true"
                ? true
                : false;

        const autoplayValue =
            slider.getAttribute("data-gallery-slider-autoplay-value") ?? "1";

        const indicatorsPosition: IndicatorsPosition =
            (slider.getAttribute(
                "data-gallery-slider-indicator-pos"
            ) as IndicatorsPosition) ?? IndicatorsPosition.inside;
        const rewind: boolean =
            slider.getAttribute("data-gallery-slider-rewind") == "true"
                ? true
                : false;
        const padding: string =
            slider.getAttribute("data-gallery-slider-padding") ?? "0";
        const variant: "media" | "card" =
            slider.getAttribute("data-gallery-slider-variant") == "card"
                ? "card"
                : "media";
        const slidesInRow: number = !noks_cli.isMobile
            ? parseInt(
                  slider
                      .querySelector(".splide__list")
                      ?.getAttribute("data-noks-cards") ?? "1"
              )
            : 1;
        if (
            variant === "card" &&
            !noks_cli.isMobile &&
            slidesInRow > slider.querySelectorAll(".splide__slide").length
        ) {
            console.log(1221, slidesInRow, slider);
            sliderEffect = "slider";
        }
        //DEVELOP
        // console.log(slider.querySelector(".splide__pagination"), slider);
        // slider.querySelector(".splide__pagination")?.remove();
        const splide = new Splide(slider as HTMLElement, {
            type: sliderEffect,
            width: "100%",
            wheel: false,
            perPage: slidesInRow,
            perMove: 1,
            rewind: rewind,
            padding: padding,
            pagination: indicatorType == IndicatorsType.none ? false : true,
            autoplay: autoplay,
        });
        if (autoplay) {
            splide.on("mounted", () => {
                splide.Components.Elements.slides.forEach((item) => {
                    item.setAttribute(
                        "data-splide-interval",
                        (+autoplayValue * 1000).toString()
                    );
                });
            });
        }
        if (variant === "card") {
            const parent = slider.parentElement;
            if (parent === null) return;
            const notSliderNode = parent.querySelector(
                ".not-slider"
            ) as HTMLElement;

            if (notSliderNode === null) return;
        }
        splide.on("mounted", () => {
            if (
                indicatorsPosition == IndicatorsPosition.outside &&
                splide.root.children[2]
            ) {
                splide.root.children[2].classList.add("position_outside"); // так нада, но черт знает, мб сломаться может эта залупка
                splide.Components.Elements.pagination?.classList.add(
                    "position_outside"
                );
            }
            if (
                indicatorType == IndicatorsType.dots &&
                splide.root.children[2]
            ) {
                splide.root.children[2].classList.add(
                    "slider__pagination_dots"
                );
            }
            if (variant === "card") {
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
        if (indicatorType == IndicatorsType.numbers) {
            splide.on("pagination:mounted", (data) => {
                data.list.classList.add("splide__pagination--custom");

                data.items.forEach((item) => {
                    item.button.textContent = String(item.page + 1);
                    item.li.classList.add("slider__pagination_numbers");
                });
            });
        }
        splide.mount();
    });
} catch (error) {
    console.error(error);
}

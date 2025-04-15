import { PublishTargetAttributes } from "./target-attributes";

try {
    const burger = document.querySelector(
        `[${PublishTargetAttributes.burgerHeader}]`
    ) as HTMLElement;

    if (burger) {
        const burgerControls = burger.querySelector(".nav-header-controls");

        if (burgerControls !== null) {
            burgerControls.addEventListener("click", () => {
                const burgerNav = burger.querySelector("nav");
                if (burgerNav === null) return;
                const currentState: boolean =
                    burgerNav.getAttribute("data-opened") == "true";
                burgerNav.setAttribute("data-opened", `${!currentState}`);
            });
        }
    }
} catch (error) {
    console.error(error);
}

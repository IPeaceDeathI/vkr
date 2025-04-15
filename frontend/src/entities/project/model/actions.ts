import { Mutations } from "./mutations";
import { ActionTree, ActionContext } from "vuex";
import { State } from "./state";
import { ActionTypes } from "../types/actions";
import { RootState, Store } from "@/entities/store";
import { nextTick } from "vue";
import { MutationTypes } from "../types/mutations";
import { BundleCollector, BundleUncollector } from "@/entities/services";
import { ProjectModel } from "@/models";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";
import { SiteModel } from "@/models/SIte";
import { PageModel } from "@/models/Page";
import { CriticalError } from "@/shared/services/error_service";
import html2canvas from "html2canvas";
import { save_images_from_base64 } from "@/shared/helpers";

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
    [ActionTypes.PUBLISH]({ commit }: AugmentedActionContext): Promise<boolean>;
    [ActionTypes.LOAD]({ commit }: AugmentedActionContext): Promise<boolean>;
    [ActionTypes.UPDATE_ID](
        { commit }: AugmentedActionContext,
        id: number
    ): Promise<void>;
    [ActionTypes.LOAD_SITE_DATA]({
        commit,
    }: AugmentedActionContext): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
    async [ActionTypes.PUBLISH]({ commit }) {
        const context = this as unknown as Store;
        context.dispatch("environment/MAKE_UNEDITABLE", undefined);
        await nextTick();
        const blockArea = document.querySelector(".block-area");
        const stylesContainer = document.querySelector(".styles-container");
        const fontStylesContainer = document.querySelector(
            "   .font-style-container"
        );
        // MAKING SCREENSHOT
        const el = blockArea as HTMLElement;
        const width_scale = 350 / el.getBoundingClientRect().width;
        const result = await html2canvas(el, {
            allowTaint: true,
            useCORS: true,
            scale: width_scale,
            ignoreElements: (element) => {
                if (element.nodeName == "IMG") {
                    return true;
                } else {
                    return false;
                }
            },
        })
            .then((canvas) => {
                return save_images_from_base64(canvas);
            })
            .then((image_src) => {
                return image_src.result[0].src;
            })
            .catch((error) => {
                console.error(error);
                return undefined;
            });
        // END MAKING SCREENSHOT
        if (
            blockArea === null ||
            stylesContainer === null ||
            fontStylesContainer === null
        ) {
            throw new CriticalError({
                bundle: BundleCollector.collectProject(context),
                message: "cannot find block-area or styles-container",
            });
        }
        const savePromise = ProjectModel.save(
            context.getters["project/getId"],
            {
                structure: BundleCollector.collectProject(context),
                html: blockArea.outerHTML,
                style:
                    fontStylesContainer.innerHTML + stylesContainer.innerHTML,
                preview_src: result,
            }
        );
        NotificationService.common().loading(savePromise);
        // // MAKING SCREENSHOT
        // const el = blockArea as HTMLElement;
        // const width_scale = 640 / el.getBoundingClientRect().width;
        // setTimeout(() => {
        //     html2canvas(el, {
        //         allowTaint: true,
        //         useCORS: true,
        //         scale: width_scale,
        //         imageTimeout: 0,
        //         ignoreElements: (element) => {
        //             if (
        //                 element.nodeName == "IMG" ||
        //                 element.nodeName == "FONT"
        //             ) {
        //                 return true;
        //             } else {
        //                 return false;
        //             }
        //         },
        //     })
        //         .then((canvas) => {
        //             return save_images_from_base64(canvas);
        //         })
        //         .then((image_src) => {
        //             ProjectModel.saveImg(context.getters["project/getId"], {
        //                 preview_src: image_src.result[0].src,
        //             });
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //             return undefined;
        //         });
        // }, 10);
        // // END MAKING SCREENSHOT
        try {
            await savePromise;
            context.dispatch("environment/MAKE_EDITABLE", undefined);
            await nextTick();
            NotificationService.common().success({
                text: "Страница сохранена",
            });
            return true;
        } catch (error) {
            NotificationService.common().error({
                text: "Не удалось сохранить страницу",
            });
            return false;
        }
    },
    async [ActionTypes.LOAD]({ commit }) {
        const context = this as unknown as Store;
        const bundle = await ProjectModel.load(
            context.getters["project/getId"]
        );
        if (bundle.structure) {
            bundle.structure.structure.blocks =
                bundle.structure.structure.blocks.filter(
                    (block) => block != null
                );
            context.state.project.loadProject(bundle.structure);
            // BundleUncollector.uncollectProject(context, bundle.structure);
            return true;
        } else {
            context.commit("project/SET_EMPTY", true);
            return false;
        }
    },
    async [ActionTypes.UPDATE_ID]({ commit }, id) {
        commit(MutationTypes.SET_ID, id);
    },
    async [ActionTypes.LOAD_SITE_DATA]({ commit, state }) {
        const siteId =
            process.env.NODE_ENV === "production"
                ? parseInt(
                      document
                          .querySelector('meta[name="id-site"]')
                          ?.getAttribute("content") ?? ""
                  )
                : process.env.VUE_APP_SERVE_SITE_ID;
        if (Number.isNaN(siteId)) throw "site id is not define";
        commit(MutationTypes.SET_SITE_ID, siteId);
        const siteData = await SiteModel.getSetting(siteId);
        commit(MutationTypes.SET_SUB_DOMAIN, siteData.subDomain);
        commit(MutationTypes.SET_ACCESS_CODE, siteData.accessCode);
        const pageData = await PageModel.getSetting(state.id);
        commit(MutationTypes.SET_PAGE_URI, pageData.uri);
    },
};

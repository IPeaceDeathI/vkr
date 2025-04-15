import { Store } from "@/entities/store";
import { BlockCatalogService } from "../block-catalog/blockCatalogService";
import { BlockRedactorService } from "../block-redactor/block-redactor-service";
import { NotificationService } from "../notification_service/NotificationService";
import { CodeWidgetModels } from "@/models/codeWidget";
import { CodeInterface } from "@/types";
import { CriticalError } from "../error_service";
import { ErrorReportService } from "@/shared/services/error_report_form/error-report-service";
import { UserModel } from "@/models";

export class ServiceLauncher {
    store: Store;
    private static instance: ServiceLauncher;
    private constructor(store: Store) {
        this.store = store;
    }
    static getInstance(store: Store) {
        if (!ServiceLauncher.instance) {
            ServiceLauncher.instance = new ServiceLauncher(store);
            // ... здесь единожды выполняется инициализация ...
        }
        return ServiceLauncher.instance;
    }
    public async launch() {
        if (process.env.NODE_ENV === "production") {
            window.addEventListener("beforeunload", (event) => {
                event.preventDefault();
                event.returnValue = "";
            });
        }
        await this.nominationProjectId();
        await Promise.all([
            this.loadStructure(),
            this.loadProjectEnvironment(),
            this.lounchServices(),
            this.loadWidjets(),
            this.loadUserInfo(),
        ]);
    }
    private async nominationProjectId() {
        const urlParams = new URLSearchParams(window.location.search);
        let id: number | string | null = urlParams.get("site_page_id");
        if (id === null && process.env.VUE_APP_NOKS_BUILD == true) {
            throw new CriticalError({
                bundle: "not structure error",
                message: `У страницы отсутсвует id`,
            });
        } else if (id === null) {
            id = process.env.VUE_APP_SERVE_PAGE_ID as number;
        } else {
            id = Number.parseInt(id);
            if (Number.isNaN(id)) {
                throw new CriticalError({
                    bundle: "not structure error",
                    message: `id страницы не является чиcлом`,
                });
            }
        }
        await this.store.dispatch("project/UPDATE_ID", id);
    }
    private async loadProjectEnvironment() {
        this.store.dispatch("project/LOAD_SITE_DATA", undefined);
    }

    private async loadWidjets() {
        const { HeadWidgets, BodyWidgets } = await CodeWidgetModels.load(
            this.store.getters["project/getId"]
        );

        HeadWidgets.forEach(async (item: CodeInterface) => {
            await this.store.dispatch("environment/ADD_CODE_HEAD_PAGE", item);
        });

        BodyWidgets.forEach(async (item: CodeInterface) => {
            await this.store.dispatch("environment/ADD_CODE_BODY_PAGE", item);
        });
    }
    private async loadStructure() {
        try {
            await this.store.dispatch("project/LOAD", undefined);
        } catch (error) {
            NotificationService.important().error({
                mainText: "Загрузка страницы не удалась",
                agreeBtn: {
                    fn: () => {
                        history.back();
                    },
                    text: "Вернуться",
                },
                disagreeBtn: {
                    fn: () => {
                        return;
                    },
                    text: "Продолжить использование",
                },
            });
        }
    }
    private async loadUserInfo() {
        const user = await UserModel.get();
        const userRights = user.rights;
        // await Promise.all([
        //     this.store.dispatch("user/UPDATE_ADMIN", false),
        //     this.store.dispatch("user/UPDATE_TESTER", false),
        //     this.store.dispatch("user/UPDATE_BLOCK_CREATOR", true),
        // ]);
        await Promise.all([
            this.store.dispatch("user/UPDATE_ADMIN", userRights.admin),
            this.store.dispatch("user/UPDATE_TESTER", userRights.tester),
            this.store.dispatch(
                "user/UPDATE_BLOCK_CREATOR",
                userRights.block_creator
            ),
        ]);
    }
    private async lounchServices() {
        BlockCatalogService.getInstance();
        BlockRedactorService.getInstance();
        ErrorReportService.getInstance();
    }
}

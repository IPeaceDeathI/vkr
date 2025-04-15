import { ErrorModel } from "@/models";
import { ProjectBundle } from "@/types";
import { NotificationService } from "../notification_service/NotificationService";

export class ErrorService {
    private static instance: ErrorService;
    private errorStack: Array<CommonError | CriticalError> = [];
    private timer = 0;

    static getInstance() {
        if (!ErrorService.instance) {
            ErrorService.instance = new ErrorService();
            ErrorService.getInstance().init();
            // ... здесь единожды выполняется инициализация ...
        }
        return ErrorService.instance;
    }
    setError(error: CommonError | CriticalError) {
        if (error.importance === ErrorsTypes.crititcal) {
            this.sendError(error);
            return;
        }
        if (JSON.stringify(this.errorStack).length > 10000000000) {
            this.sendErrorStack();
            this.errorStack = [error];
            this.startTimer();
            return;
        }
        this.errorStack.push(error);
    }
    private sendErrorStack() {
        if (process.env.NODE_ENV === "production") {
            ErrorModel.log(JSON.stringify(this.errorStack));
        }
        // ErrorModel.log(JSON.stringify(this.errorStack));
    }
    private sendError(error: CommonError | CriticalError) {
        if (process.env.NODE_ENV === "production") {
            ErrorModel.log(JSON.stringify(error));
        }
        // ErrorModel.log(JSON.stringify(error));
    }
    private startTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            if (this.errorStack.length > 0) {
                this.sendErrorStack();
            }
        }, 300000);
    }
    private init() {
        const callback = this.sendErrorStack;
        this.startTimer();
        window.addEventListener("unload", function () {
            callback();
        });
    }
}

export interface CommonErrorParams {
    message: string;
    bundle?: ProjectBundle | string;
    targetId?: string | undefined;
    importance?: ErrorsTypes;
}
export interface CriticalErrorParams extends CommonErrorParams {
    notificationText?: string;
    notificationTitle?: string;
    isNotification?: boolean;
}
export interface WarningErrorParams extends CommonErrorParams {
    notificationText?: string;
    notificationTitle?: string;
    isNotification?: boolean;
}

export class CommonError extends Error {
    bundle?: ProjectBundle | string;
    targetId: string | undefined;
    importance: ErrorsTypes;
    constructor(
        commonErrorParams: CommonErrorParams
        // bundle: ProjectBundle | string,
        // message: string,
        // targetId?: string | undefined,
        // importance = ErrorsTypes.common
    ) {
        super(commonErrorParams.message);

        this.bundle = commonErrorParams.bundle;
        this.importance = commonErrorParams.importance || ErrorsTypes.common;
        this.targetId = commonErrorParams.targetId;

        ErrorService.getInstance().setError(this);
    }
}
export class CriticalError extends CommonError {
    notificationText: string | undefined;
    notificationTitle: string | undefined;
    isNotification: boolean | undefined;
    constructor(
        criticalErrorParams: CriticalErrorParams
        // bundle: ProjectBundle | string,
        // message: string,
        // notification?: string,
        // targetId?: string | undefined,
        // isNotification = true,
        // importance = ErrorsTypes.crititcal
    ) {
        super({
            bundle: criticalErrorParams.bundle,
            message: criticalErrorParams.message,
            targetId: criticalErrorParams.targetId,
            importance: ErrorsTypes.crititcal,
        });
        ym(94237288, "reachGoal", "errorPopup"); // Yandex Metrica
        this.notificationText =
            criticalErrorParams.notificationText ||
            `Не волнуйтесь, такое случается.\nВсе изменения сохранены.\n\nПожалуйста, оставьте отзыв о текущей ошибке, это поможет нам сделать конструктор ещё лучше!`;
        this.isNotification = criticalErrorParams.isNotification;
        this.notificationTitle = criticalErrorParams.notificationTitle;
        if (this.isNotification !== false) {
            NotificationService.important().error({
                mainText: this.notificationText,
                titleText: this.notificationTitle || "Возникла ошибка :(",
                agreeBtn: {
                    text: "Продолжить",
                    fn: () => {
                        return true;
                    },
                },
                disagreeBtn: {
                    text: "Выйти",
                    fn: () => (window.location.href = "/"),
                },
            });
        }
    }
}
export class WarningError extends CommonError {
    notificationText: string | undefined;
    notificationTitle: string | undefined;
    isNotification: boolean | undefined;
    constructor(warningErrorParams: WarningErrorParams) {
        super({
            bundle: warningErrorParams.bundle,
            message: warningErrorParams.message,
            targetId: warningErrorParams.targetId,
            importance: ErrorsTypes.crititcal,
        });
        this.notificationText =
            warningErrorParams.notificationText ||
            `Конкструктор находится в тестовом режиме.\nCтруктура Вашего сайта сохранена.\n\nПожалуйста оставьте отзыв о текущей ошибке это поможет нам сделать конструктор ещё лучше!`;
        this.isNotification = warningErrorParams.isNotification;
        this.notificationTitle = warningErrorParams.notificationTitle;
        if (this.isNotification) {
            NotificationService.important().error({
                mainText: this.notificationText,
                titleText: this.notificationTitle || "Возникла ошибка!",
                agreeBtn: {
                    text: "Продолжить",
                    fn: () => {
                        return true;
                    },
                },
                disagreeBtn: {
                    text: "Выйти",
                    fn: () => (window.location.href = "/"),
                },
            });
        }
    }
}
export enum ErrorsTypes {
    common = "common",
    warning = "warning",
    crititcal = "critical",
}

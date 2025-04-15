export interface CommonNotification {
    text: string;
    delay?: number;
}
export interface CommonLoading {
    waitTo: Promise<any>;
}
export interface ImportantNotification {
    mainText: string;
    agreeBtn: NotificationBtn;
    disagreeBtn: NotificationBtn;
    persistanse?: boolean;
    checkboxes?: Checkbox[];
    titleText?: string;
}
export type CheckboxIded = Checkbox & { id: string };
export interface NotificationBtn {
    text: string;
    fn: () => void;
}
export interface Checkbox {
    label: string;
    state: boolean;
    onFn: () => void;
    offFn: () => void;
}
export interface ImportantLoading {
    waitTo: Promise<any>;
    loadingText?: string;
}
export type ImportantNotificationIded = Omit<
    ImportantNotification,
    "checkboxes"
> & { id: string } & { checkboxes: CheckboxIded[] };
export type ImportantLoadingIded = ImportantLoading & { id: string };
export type CommonNotificationIded = CommonNotification & { id: string };
export type CommonLoadingIded = CommonLoading & { id: string };

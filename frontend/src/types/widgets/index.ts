export interface CodeInterface {
    id: number;
    name: string;
    html: string | null;
    css: string | null;
    js: string | null;
    area: WidgetArea;
    status: WidgetStatus;
    file: string;
    position: number;
}
export enum WidgetStatus {
    active = 1,
    inactive = 0,
}
export enum WidgetArea {
    head = 0,
    body = 1,
}

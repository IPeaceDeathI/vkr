export interface Icon {
    name: string;
    tags: string[];
}
export interface IconData {
    path: string;
    name: string;
}
export interface Variant {
    title: string;
    value: string;
}
export interface Icons {
    // [action in Category]: Icon[];
    action: Icon[];
    maps: Icon[];
    search: Icon[];
    editor: Icon[];
    files: Icon[];
    social: Icon[];
    home: Icon[];
    notifications: Icon[];
    devices: Icon[];
    communication: Icon[];
    content: Icon[];
    places: Icon[];
    av: Icon[];
    photography: Icon[];
    hardware: Icon[];
    alert: Icon[];
    toggle: Icon[];
    all: Icon[];
}
export type Category =
    | "action"
    | "maps"
    | "search"
    | "editor"
    | "files"
    | "files"
    | "social"
    | "home"
    | "notifications"
    | "devices"
    | "communication"
    | "content"
    | "places"
    | "av"
    | "photography"
    | "hardware"
    | "alert"
    | "toggle"
    | "all";

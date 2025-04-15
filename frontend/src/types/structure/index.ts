declare global {
    type id = string;
}
declare global {
    interface Window {
        site_domain: string;
    }
}

export * from "./elements";
export * from "./block";
export * from "./zones";
export * from "./items";
export * from "./blockBodies";
export * from "./bundles";
export * from "./styles";
export * from "./events";

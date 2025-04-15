import "vue-router";

// Для того чтобы он рассматривался как модуль,
// добавьте хотя бы один оператор `export`
export {};

declare module "vue-router" {
    interface RouteMeta {
        name: string;
        routeName: string;
    }
}
declare module "*.png" {
    const value: any;
    export = value;
}

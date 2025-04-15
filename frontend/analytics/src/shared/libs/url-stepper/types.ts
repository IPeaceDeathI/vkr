import { Component } from "vue";
import { RouteLocationRaw } from "vue-router";

export type StepperItem = {
    id: number;
    route: RouteLocationRaw;
    name: string;
    isLoading?: boolean;
    isComplite: boolean;
    isError?: boolean;
    component: Component;
};

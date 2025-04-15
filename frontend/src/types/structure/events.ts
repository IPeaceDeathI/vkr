export type Events<T extends EventTypes> = Array<{
    [key in T]: EventActions;
}>;
export enum EventTypes {
    onclick = "onclick",
    afterFormSend = "afterFormSend", //DEVELOP
}
// export type Effects = Array<{
//     [key in EffectsType]?: Effects;
// }>;
export enum ActionTypes {
    link = "link",
    none = "none",
    openWindow = "openWindow",
    showSnackbar = "showSnackbar",
}
export type EventActions =
    | { [ActionTypes.link]: string } //link
    | { [ActionTypes.none]: true }
    | { [ActionTypes.showSnackbar]: string } // text
    | { [ActionTypes.openWindow]: number | "" }; //publishedID

export enum MainGoals {
    modal = "modal_open",
    quiz = "quiz_start",
    link = "link_open",
    empty = "empty",
    order = "order_done",
}
export type GoalsParams = {
    goalName: string;
    // DEVELOP
    mainGoal: MainGoals;
    goalCode: string;
    // END DEVELOP
};

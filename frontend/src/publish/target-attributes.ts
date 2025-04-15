//metric
export const enum PublishTargetAttributes {
    maskType = "data-noks-mask-type",
    mask = "data-noks-mask",
    form = "data-noks-form",
    window = "data-noks-window",
    windowClose = "data-noks-window-close",
    windowOpen = "data-noks-window-close", //Должен иметь id окна
    actionType = "data-noks-action-type", //Должен иметь значение типа ActionTypes
    actionValue = "data-noks-event-value", //Должен иметь значение типа ActionTypes
    eventType = "data-noks-event-type", //Должен иметь значение типа ActionTypes
    slider = "data-noks-slider", //Должен иметь значение типа ActionTypes
    mediaSlider = "data-noks-media-slider",
    burgerHeader = "data-noks-burger-header",
    mediaVideo = "data-noks-media-video",

    //metric Должна содержать значение типа Array стоит использовать функцию collectMetricsAttr
    metricsClick = "data-noks-met-click",
    metricsSend = "data-noks-met-on-send",
}
export const enum MaskType {
    phone = "phone",
    regex = "regex",
}

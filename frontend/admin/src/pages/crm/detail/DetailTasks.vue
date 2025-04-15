<template>

<div class="notes-wrapper__tasks" style="height: 64px;">
    <div class="js-future-tasks-fixable notes-wrapper__tasks-inner-wrapper notes-wrapper__tasks-inner custom-scroll js-tasks outside-bottom outside" style="width: 637px; bottom: -2px;">
        <div class="feed-note-wrapper feed-note-wrapper-task " data-id="12395697">
            <div class="js-note  card-task-wrapper">
                <div class="card-task card-task card-task-future ">
                    <div class="card-task__icon">
                        <svg class="svg-icon svg-tasks--clock-dims">
                            <use xlink:href="#tasks--clock"></use>
                        </svg>
                    </div>
                    <div class="card-task__inner">
                        <div class="card-task__inner-header">
                            <div class="card-task__inner-header-left"><span class="card-task__date">06.03.2024</span>&nbsp;для&nbsp;Никита</div>
                        </div>
                        <div class="card-task__inner-content">
                            <p><span class="task-type-name-with-icon"><span class="task-type-name-with-icon__padding"></span><span class="task-type-name-with-icon__icon card-task__type-icon card-task__type-icon-absolute"><span class="icon icon-follow-up"></span></span><span class="task-type-name-with-icon__text " title="Связаться">Связаться</span></span> — задача</p>
                        </div>
                    </div>
                    <div class="card-task__result-wrapper">
                        <div class="card-task__result-wrapper__inner">
                            <textarea name="result" placeholder="Добавить результат" class="card-task__result-wrapper__inner__textarea js-task-result-textarea"></textarea>
                            <button class="button-input    button-input-disabled button-input_blue js-task-result-button card-task__button" tabindex="-1" id="12395697"><span class="button-input-inner "><span class="button-input-inner__text">Выполнить</span></span>
                            </button>
                        </div>
                        <div class="card-task__clone">
                            <div class="card-task__clone__task-type">
                                <label class="control-checkbox card-task__clone__checkbox control-checkbox_small ">
                                    <div class="control-checkbox__body">
                                        <input type="checkbox" class="" name="clone_task" id="12395697" value="" data-value=""><span class="control-checkbox__helper "></span></div>
                                </label>
                                <div class="card-task__type-wrapper card-task__type_small">
                                    <div class="card-task__type" data-class-name-text=""><span class="task-type-name-with-icon"><span class="task-type-name-with-icon__padding"></span><span class="task-type-name-with-icon__icon card-task__type-icon"><span class="icon icon-follow-up"></span></span><span class="task-type-name-with-icon__text " title="Связаться">Связаться</span></span>
                                    </div>
                                    <div class="card-task__type-opened card-task__type-opened_small" style="display: none">
                                        <ul class="card-task__types custom-scroll">
                                            <li class="card-task__types-item">
                                                <input type="radio" class="hidden" id="task_type_381_1" value="1" name="type">
                                                <label class="card-task__types-item-label " for="task_type_381_1"><span class="task_type_select__icon icon icon-inline icon-follow-up"></span>Связаться</label>
                                            </li>
                                            <li class="card-task__types-item">
                                                <input type="radio" class="hidden" id="task_type_381_2" value="2" name="type">
                                                <label class="card-task__types-item-label " for="task_type_381_2"><span class="task_type_select__icon icon icon-inline icon-case-red"></span>Встреча</label>
                                            </li>
                                            <li class="card-task__types-item">
                                                <input type="radio" class="hidden" id="task_type_381_custom" value="custom" name="type">
                                                <label class="card-task__types-item-label card-task__types-item-label_custom" for="task_type_381_custom"><span class="task_type_select__icon"><svg class="svg-icon svg-tasks--types-icons--0-dims"><use xlink:href="#tasks--types-icons--0"></use></svg></span>Другой
                                                    <input type="text" name="task_type_name" class="card-task__types-item-custom-input" maxlength="16">
                                                    <input type="hidden" name="icon_id">
                                                    <input type="hidden" name="icon_color">
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <span class="card-task__clone__dates">
                                <span class="card-task__clone__dates__preset card-task__clone__dates__preset_selected js-clone-task-preset" data-preset="tomorrow">завтра</span>
                                <span class="card-task__clone__dates__preset  js-clone-task-preset" data-preset="next_week">через неделю</span>
                                <span class="card-task__clone__dates__preset  js-clone-task-preset" data-preset="next_month">через месяц</span>
                            </span>
                            <div class="card-task__buttons_remove">
                                <button type="button" class="button-input button-cancel js-note-delete-btn feed-note__button_cancel feed-note__button_remove" tabindex="-1" id="12395697" style="">
                                    <span>Удалить</span>
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>
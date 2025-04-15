<script>
export default {
    data(){
        return {
            text: 'test',
        }
    },
    props: {
        setFocus: {
            type: Function,
            required: true,
        },
        setSwitch: {
            type: Function,
            required: true,
        },
    },
    methods: {
        setText(selector){
            this.text = this.$el.querySelector('.control-contenteditable__area').value
            this.$el.querySelector(selector).value = this.text
            console.log(this.text);
        }
    }
}
</script>

<template>
    <div class="js-note feed-compose_task expanded"
        @focusout="setSwitch(false)"
    >
        <div class="js-control-contenteditable control-contenteditable card-task__actions">
            <div class="js-control-contenteditable-clearer control-contenteditable__clearer">
                <div class="feed-compose-switcher"
                    @click="setSwitch(true)"
                >
                    <span class="feed-compose-switcher__text">Задача</span>
                </div>
                <span class="feed-compose__due">на</span>
                <div class="card-task__actions__date-user">
                    <span class="card-task__actions__date-user__dates">
                        <div class="tasks-date " data-responsible="8447065" data-id="" data-type="1" data-title="">
                            <input type="hidden" name="duration" value="0">
                            <input type="hidden" name="time" value="23:59">
                            <div class="tasks-date__caption ">
                                <span class="tasks-date__caption-date">Завтра</span>
                                <span class="tasks-date__caption-time" data-hide-time="1"></span>
                            </div>
                            <div class="tasks-date__wrapper ">
                                <div class="tasks-date__controls">
                                    <div class="tasks-date__controls-date js-control-date-tasks-date js-tasks-date-input-bg" data-calendar-id="4364">
                                        <input class="tasks-date__controls-date-input" name="date" value="12.03.2024">
                                    </div>
                                    <div class="tasks-date__controls-time js-tasks-date-input-bg">
                                        <input class="tasks-date__controls-time-input js-tasks-date-time-input js-control-format-time control-price_autosized" value="" placeholder="Весь день" style="width: 64px;">
                                    </div>
                                </div>
                                <div class="tasks-date__wrapper-inner">
                                    <div class="tasks-date__list custom-scroll">
                                        <div class="tasks-date__list__item js-tasks-date-preset" data-period="after_15_minutes">Через 15 минут</div>
                                        <div class="tasks-date__list__item js-tasks-date-preset" data-period="after_30_minutes">Через 30 минут</div>
                                        <div class="tasks-date__list__item js-tasks-date-preset" data-period="in_an_hour">Через час</div>
                                        <div class="tasks-date__list__item js-tasks-date-preset" data-period="today">Сегодня</div>
                                        <div class="tasks-date__list__item js-tasks-date-preset" data-period="tomorrow">Завтра</div>
                                        <div class="tasks-date__list__item js-tasks-date-preset" data-period="before_end_of_week">До конца недели</div>
                                        <div class="tasks-date__list__item js-tasks-date-preset" data-period="next_week">Через неделю</div>
                                        <div class="tasks-date__list__item js-tasks-date-preset" data-period="next_month">Через месяц</div>
                                        <div class="tasks-date__list__item js-tasks-date-preset" data-period="next_year">Через год</div>
                                    </div>
                                    <div class="tasks-date__datetime">
                                        <div class="tasks-date__calendar custom-scroll" id="tasks_date_calendar_4364">
                                            <div class="kalendae">
                                                <div class="k-calendar" data-cal-index="0" data-datestart="2024-03-01">
                                                    <div class="k-title">
                                                        <a class="k-btn-previous-year"></a>
                                                        <a class="k-btn-previous-month"></a>
                                                        <a class="k-btn-next-year"></a>
                                                        <a class="k-btn-next-month"></a><span class="k-caption">Март 2024</span></div>
                                                    <div class="k-header "><span data-day="0" class="">Пн</span><span data-day="1" class="">Вт</span><span data-day="2" class="">Ср</span><span data-day="3" class="">Чт</span><span data-day="4" class="">Пт</span><span data-day="5" class="">Сб</span><span data-day="6" class="">Вс</span></div>
                                                    <div class="k-days"><span class="k-out-of-month k-active k-before-today" data-date="2024-02-26">26</span><span class="k-out-of-month k-active k-before-today" data-date="2024-02-27">27</span><span class="k-out-of-month k-active k-before-today" data-date="2024-02-28">28</span><span class="k-out-of-month k-active k-before-today" data-date="2024-02-29">29</span><span class="k-in-month k-active k-before-today" data-date="2024-03-01">1</span><span class="k-in-month k-active k-before-today" data-date="2024-03-02">2</span><span class="k-in-month k-active k-before-today" data-date="2024-03-03">3</span><span class="k-in-month k-active k-before-today" data-date="2024-03-04">4</span><span class="k-in-month k-active k-before-today" data-date="2024-03-05">5</span><span class="k-in-month k-active k-before-today" data-date="2024-03-06">6</span><span class="k-in-month k-active k-before-today" data-date="2024-03-07">7</span><span class="k-in-month k-active k-before-today" data-date="2024-03-08">8</span><span class="k-in-month k-active k-before-today" data-date="2024-03-09">9</span><span class="k-in-month k-active k-before-today" data-date="2024-03-10">10</span><span class="k-in-month k-active k-today" data-date="2024-03-11">11</span><span class="k-selected k-in-month k-active" data-date="2024-03-12">12</span><span class="k-in-month k-active" data-date="2024-03-13">13</span><span class="k-in-month k-active" data-date="2024-03-14">14</span><span class="k-in-month k-active" data-date="2024-03-15">15</span><span class="k-in-month k-active" data-date="2024-03-16">16</span><span class="k-in-month k-active" data-date="2024-03-17">17</span><span class="k-in-month k-active" data-date="2024-03-18">18</span><span class="k-in-month k-active" data-date="2024-03-19">19</span><span class="k-in-month k-active" data-date="2024-03-20">20</span><span class="k-in-month k-active" data-date="2024-03-21">21</span><span class="k-in-month k-active" data-date="2024-03-22">22</span><span class="k-in-month k-active" data-date="2024-03-23">23</span><span class="k-in-month k-active" data-date="2024-03-24">24</span><span class="k-in-month k-active" data-date="2024-03-25">25</span><span class="k-in-month k-active" data-date="2024-03-26">26</span><span class="k-in-month k-active" data-date="2024-03-27">27</span><span class="k-in-month k-active" data-date="2024-03-28">28</span><span class="k-in-month k-active" data-date="2024-03-29">29</span><span class="k-in-month k-active" data-date="2024-03-30">30</span><span class="k-in-month k-active" data-date="2024-03-31">31</span><span class="k-out-of-month k-active" data-date="2024-04-01">1</span><span class="k-out-of-month k-active" data-date="2024-04-02">2</span><span class="k-out-of-month k-active" data-date="2024-04-03">3</span><span class="k-out-of-month k-active" data-date="2024-04-04">4</span><span class="k-out-of-month k-active" data-date="2024-04-05">5</span><span class="k-out-of-month k-active" data-date="2024-04-06">6</span><span class="k-out-of-month k-active" data-date="2024-04-07">7</span><span class="k-out-of-month k-active k-fake-date" data-date="2024-04-08">8</span><span class="k-out-of-month k-active k-fake-date" data-date="2024-04-09">9</span><span class="k-out-of-month k-active k-fake-date" data-date="2024-04-10">10</span><span class="k-out-of-month k-active k-fake-date" data-date="2024-04-11">11</span><span class="k-out-of-month k-active k-fake-date" data-date="2024-04-12">12</span><span class="k-out-of-month k-active k-fake-date" data-date="2024-04-13">13</span><span class="k-out-of-month k-active k-fake-date" data-date="2024-04-14">14</span><span class="k-out-of-month k-active k-fake-date" data-date="2024-04-15">15</span><span class="k-out-of-month k-active k-fake-date" data-date="2024-04-16">16</span><span class="k-out-of-month k-active k-fake-date" data-date="2024-04-17">17</span><span class="k-out-of-month k-active k-fake-date" data-date="2024-04-18">18</span><span class="k-out-of-month k-active k-fake-date" data-date="2024-04-19">19</span><span class="k-out-of-month k-active k-fake-date" data-date="2024-04-20">20</span><span class="k-out-of-month k-active k-fake-date" data-date="2024-04-21">21</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tasks-date__time-planner js-tasks-date-timeplanner"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                    <span class="feed-compose__due">для</span><span id="feed_compose_user" class="card-task__actions__date-user__user feed-compose-user">
                        <div class="feed-compose-user js-feed-users">
                            <div class="js-multisuggest-list">
                                <div class="feed-compose-user__name js-multisuggest-item" 
                                    data-title="Никита" data-group="" data-id="8447065" title="Никита"
                                >
                                    Никита
                                </div>
                            </div>
                            <span class="js-antispam-timer"></span>
                        </div>
                    </span>
                    <input type="hidden" class="js-task-main_user" name="main_user" value="8447065">
                    :&nbsp;
                    <div class="card-task__type-wrapper ">
                        <div class="card-task__type" data-class-name-text="">
                            <span class="task-type-name-with-icon">
                                <span class="task-type-name-with-icon__padding"></span>
                                <span class="task-type-name-with-icon__icon card-task__type-icon">
                                    <span class="icon icon-follow-up"></span>
                                </span>
                                <span class="task-type-name-with-icon__text " title="Связаться">Связаться</span>
                            </span>
                        </div>
                        <div class="card-task__type-opened " style="display: none">
                            <ul class="card-task__types custom-scroll">
                                <li class="card-task__types-item">
                                    <input type="radio" class="hidden" id="task_type_481_1" value="1" name="type">
                                    <label class="card-task__types-item-label " for="task_type_481_1">
                                        <span class="task_type_select__icon icon icon-inline icon-follow-up"></span>
                                        Связаться
                                    </label>
                                </li>
                                <li class="card-task__types-item">
                                    <input type="radio" class="hidden" id="task_type_481_2" value="2" name="type">
                                    <label class="card-task__types-item-label " for="task_type_481_2">
                                        <span class="task_type_select__icon icon icon-inline icon-case-red"></span>
                                        Встреча
                                    </label>
                                </li>
                                <li class="card-task__types-item">
                                    <input type="radio" class="hidden" id="task_type_481_custom" value="custom" name="type">
                                    <label class="card-task__types-item-label card-task__types-item-label_custom" for="task_type_481_custom">
                                        <span class="task_type_select__icon">
                                            <svg class="svg-icon svg-tasks--types-icons--0-dims"><use xlink:href="#tasks--types-icons--0"></use></svg>
                                        </span>
                                        Другой
                                        <input type="text" name="task_type_name" class="card-task__types-item-custom-input" maxlength="16">
                                        <input type="hidden" name="icon_id">
                                        <input type="hidden" name="icon_color">
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div class="feed-control__voice-container">
                <div class="feed-control__voice-wave"></div>
                <canvas class="feed-control__voice-wave-canvas hidden" width="0" height="0"></canvas><span class="feed-control__voice-timer"></span>
            </div>
            <input type="hidden" class="js-control-contenteditable-input " name="body" 
                v-model="text"
            >
            <div class="control-contenteditable__area js-task-text-textarea" 
                contenteditable="true" data-hint="" style="padding-left: 340px;"
                @input="setText('.js-control-contenteditable-input')"
            ></div>
        </div>

        <div class="feed-compose__actions">
            <button class="button-input js-task-submit feed-note__button" tabindex="-1">
                <span class="button-input-inner ">
                    <span class="button-input-inner__text">
                        Поставить
                    </span>
                </span>
            </button>
            <button type="button" 
                class="button-input button-cancel js-task-edit-cancel feed-note__button_cancel" 
                tabindex="-1" style=""
                @click="setFocus(false)"
            >
                <span>Отменить</span>
            </button>
            <!-- <div class="feed-compose__shortcuts-helper-wrapper">
                <div class="feed-compose__shortcuts-helper-container">
                    <svg class="svg-icon svg-common--keyboard-dims ">
                        <use xlink:href="#common--keyboard"></use>
                    </svg>
                    <div class="feed-compose__shortcuts-helper">
                        <h3 class="feed-compose__shortcuts-helper-title">Комбинации клавиш</h3>
                        <div class="feed-compose__shortcuts-helper-list">
                            <div class="feed-compose__shortcuts-helper-item">
                                <div class="feed-compose__shortcuts-helper-item-svg-wrapper">
                                    <svg class="svg-icon svg-common--shortcuts-arrow-up-dims feed-compose__shortcuts-helper-item-svg">
                                        <use xlink:href="#common--shortcuts-arrow-up"></use>
                                    </svg>
                                </div><span class="feed-compose__shortcuts-helper-item-text">– выбор действия</span></div>
                            <div class="feed-compose__shortcuts-helper-item">
                                <div class="feed-compose__shortcuts-helper-item-svg-wrapper">
                                    <svg class="svg-icon svg-common--shortcuts-bracket-dims feed-compose__shortcuts-helper-item-svg">
                                        <use xlink:href="#common--shortcuts-bracket"></use>
                                    </svg>
                                </div><span class="feed-compose__shortcuts-helper-item-text">– выбрать значение поля</span></div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>

    </div>
</template>
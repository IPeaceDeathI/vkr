!(function (e, t) {
    e.Polyglot = (function (e) {
        "use strict";
        class t {
            constructor(e = {}) {
                (this.phrases = {}),
                    (this.currentLocale = e.locale || "en"),
                    (this.allowMissing = !!e.allowMissing),
                    (this.warn = e.warn || p),
                    this.extend(e.phrases || {});
            }
            locale(e) {
                return e && (this.currentLocale = e), this.currentLocale;
            }
            extend(e, t) {
                let _;
                for (let i in e)
                    e.hasOwnProperty(i) &&
                        ((_ = e[i]),
                        t && (i = t + "::" + i),
                        "object" == typeof _
                            ? this.extend(_, i)
                            : (this.phrases[i] = _));
            }
            clear() {
                this.phrases = {};
            }
            replace(e) {
                this.clear(), this.extend(e);
            }
            t(e, t = {}) {
                let _,
                    i = t._;
                if (
                    ("number" == typeof t && (t = { count: t }),
                    "string" == typeof this.phrases[e])
                )
                    i = this.phrases[e];
                else if (
                    (null != t.count &&
                        "string" == typeof this.phrases[e + "::one"]) ||
                    "string" == typeof this.phrases[e + "::other"]
                ) {
                    i = ["one", "few", "many", "other"]
                        .map((t) => this.phrases[e + "::" + t])
                        .filter((e) => "string" == typeof e)
                        .join("||||");
                }
                return (
                    "string" == typeof i
                        ? ((_ = r(i, this.currentLocale, t.count)),
                          (_ = d(_, t)))
                        : (this.allowMissing ||
                              this.warn(
                                  'Missing translation for key: "' + e + '"',
                              ),
                          (_ = e)),
                    _
                );
            }
            has(e) {
                return e in this.phrases;
            }
        }
        const _ = "||||",
            i = (e) => {
                const t = e % 100,
                    _ = t % 10;
                return 11 !== t && 1 === _
                    ? 0
                    : 2 <= _ && _ <= 4 && !(t >= 12 && t <= 14)
                      ? 1
                      : 2;
            },
            l = {
                arabic: function (e) {
                    if (e < 3) return e;
                    var t = e % 100;
                    return t >= 3 && t <= 10 ? 3 : t >= 11 ? 4 : 5;
                },
                bosnian_serbian: i,
                chinese: function () {
                    return 0;
                },
                croatian: i,
                french: function (e) {
                    return e > 1 ? 1 : 0;
                },
                german: function (e) {
                    return 1 !== e ? 1 : 0;
                },
                russian: i,
                lithuanian: function (e) {
                    return e % 10 == 1 && e % 100 != 11
                        ? 0
                        : e % 10 >= 2 &&
                            e % 10 <= 9 &&
                            (e % 100 < 11 || e % 100 > 19)
                          ? 1
                          : 2;
                },
                czech: function (e) {
                    return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2;
                },
                polish: function (e) {
                    if (1 === e) return 0;
                    var t = e % 10;
                    return 2 <= t && t <= 4 && (e % 100 < 10 || e % 100 >= 20)
                        ? 1
                        : 2;
                },
                icelandic: function (e) {
                    return e % 10 != 1 || e % 100 == 11 ? 1 : 0;
                },
                slovenian: function (e) {
                    var t = e % 100;
                    return 1 === t
                        ? 0
                        : 2 === t
                          ? 1
                          : 3 === t || 4 === t
                            ? 2
                            : 3;
                },
            },
            o = {
                chinese: ["fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh"],
                german: [
                    "da",
                    "de",
                    "en",
                    "es",
                    "fi",
                    "el",
                    "he",
                    "hu",
                    "it",
                    "nl",
                    "no",
                    "pt",
                    "sv",
                ],
                french: ["fr", "tl", "pt-br"],
                russian: ["hr", "ru"],
                czech: ["cs"],
                polish: ["pl"],
                icelandic: ["is"],
            };
        function a(e) {
            const t = {};
            let _, i;
            for (_ in e)
                if (e.hasOwnProperty(_)) {
                    i = e[_];
                    for (const e in i) t[i[e]] = _;
                }
            return t;
        }
        function n(e) {
            const t = /^\s+|\s+$/g;
            return e.replace(t, "");
        }
        function r(e, t, i) {
            let l, o, a;
            return (
                null != i && e
                    ? ((o = e.split(_)), (a = o[c(t, i)] || o[0]), (l = n(a)))
                    : (l = e),
                l
            );
        }
        function s(e) {
            const t = a(o);
            return t[e] || t.en;
        }
        function c(e, t) {
            return l[s(e)](t);
        }
        function d(e, t) {
            for (const _ in t)
                "_" !== _ &&
                    t.hasOwnProperty(_) &&
                    (e = e.replace(new RegExp("%" + _ + "%", "g"), t[_]));
            return e;
        }
        function p(t) {
            e.console && e.console.warn && e.console.warn("WARNING: " + t);
        }
        return t;
    })(e);
})(window),
    (window.polyglot = new Polyglot({
        locale: "ru",
        warn: (e) => {
            "undefined" != typeof flexbe &&
                flexbe.lib &&
                flexbe.lib.messageToSlack &&
                flexbe.lib.messageToSlack({ msg: e });
        },
        phrases: {
            editor: {
                abtest: {
                    control: {
                        label: "А/Б тестирование",
                        stat_tip: "Статистика А/Б тестирования",
                        var_a_tip: "Вариант А",
                        var_b_tip: "Вариант Б",
                    },
                    start: {
                        choose_option: "Создать новую секцию",
                        copy_option: "Скопировать текущую",
                        hidden_option: "Скрыть секцию",
                        modal_title: "Запуск А/Б тестирования",
                        section_label: "Создание секции для варианта Б",
                    },
                    stat: {
                        base_option: "Базовый",
                        conversion_label: "Конверсия",
                        empty_error: "Для данного теста нет статистики",
                        hidden_section_text:
                            "Проводится А/Б тестирование варианта со скрытой секцией",
                        modal_title: "Статистика А/Б тестирования",
                        order_label: "Заявки",
                        pause_button: "Приостановить",
                        play_button: "Запустить",
                        profit_label: "Процент улучшения",
                        stop_button: "Завершить",
                        suspended_button: "Приостановлено",
                        visits_label: "Посетители",
                    },
                    stop: {
                        a_option: "Вариант A",
                        b_option: "Вариант Б",
                        base_optioin: "Базовый",
                        best_option: "Лучший",
                        choose_label: "Какой вариант секции оставить?",
                        modal_title: "Завершение А/Б теста",
                        select_button: "Выбрать",
                    },
                },
                actions: {
                    anchor_error: "Неправильно указан якорь",
                    anchor_placeholder: "Введите якорь секции",
                    button_option: "Использовать настройку кнопки",
                    cart_option: "Добавить в корзину",
                    close_option: "Закрыть всплывающее окно",
                    code_option: "Выполнить код",
                    code_title: "JavaScript код",
                    edit_modal_button: "Редактировать",
                    email_body_label: "Текст",
                    email_error: "Некорректный e-mail адрес",
                    email_label: "E-mail",
                    email_letter_tip:
                        "Для удобства клиента тема будет добавлена в письмо автоматически",
                    email_letter_toggle: "Добавить тему письма по умолчанию",
                    email_placeholder: "Введите e-mail адрес",
                    email_subject_label: "Тема",
                    email_subject_placeholder: "Введите тему письма",
                    email_tip:
                        "E-mail будет автоматически указан в качестве адресата письма",
                    file_option: "Скачать файл",
                    lightbox_option: "Увеличить картинку",
                    link_error: "Некорректный адрес ссылки",
                    link_label: "Адрес страницы",
                    link_option: "Перейти по ссылке",
                    link_tip:
                        "Введите адрес внешней страницы или выберите страницу текущего сайта",
                    mail_option: "Отправить e-mail",
                    modal_from_nested: "из глобальной секции",
                    modal_not_selected: "Окно не выбрано",
                    modal_option: "Показать всплывающее окно",
                    none_option: "Ничего не делать",
                    open_cart_button: "Открыть",
                    page_option: "Перейти к странице",
                    pay_option: "Перейти к оплате",
                    phone_error: "Некорректный номер телефона",
                    phone_label: "Номер телефона",
                    phone_option: "Позвонить",
                    phone_placeholder: "Введите номер",
                    phone_tip:
                        "При клике на элемент будет предложено осуществить звонок на указанный номер. Рекомендуем настроить видимость элемента только на мобильных устройствах.",
                    price_placeholder: "Цена",
                    product_placeholder: "Название товара",
                    quiz_option: "Начать квиз",
                    redirect_option: "Перейти по ссылке",
                    section_option: "Скролл к секции",
                    select_modal_button: "Выбрать окно",
                },
                adaptive: {
                    enable_override_label:
                        "Переопределить настройки для мобильных",
                    setup_adaptive_view:
                        "Настройте отображение на мобильных устройствах",
                },
                ai: {
                    builder: {
                        change_instruction: "Изменить запрос",
                        repeat: "Повторить",
                        status: {
                            canceled: "Генерация остановлена",
                            done: "Ваш сайт собран!",
                            error: "Произошла ошибка при генерации. Попробуйте снова.",
                        },
                        stop: "Остановить генерацию",
                        to_editor_button: "Перейти в редактор",
                    },
                    copywriter: {
                        applied_tip: "Вставлено в сайт",
                        apply_tip: "Использовать текст на сайте",
                        beta_tip:
                            "Функция доступна на всех тарифах в рамках бета-тестирования. Действует ограничение %count% запросов в сутки. В будущем доступ и лимиты могут измениться для некоторых тарифов",
                        clean_history: "Сбросить",
                        empty_context_warning:
                            "Чтобы AI-Копирайтер работал эффективно, расскажите ему о своем бизнесе",
                        greeting_text:
                            "Превращаю идеи в текст. Что напишем сегодня?",
                        instruction_example_prefix: "Например",
                        instruction_help:
                            "<strong>Как писать запросы:</strong><br>\n<ul>\n<li>– Не используйте слишком общие запросы, четко опишите что вы хотите получить в результате</li>\n<li>– Дайте достаточно информации и контекста, заполните информацию о компании в Настройках AI.</li>\n<li>– Укажите тон и стиль письма</li>\n</ul>\n<br>\n<strong>Например:</strong><br>\n<i>Перепиши этот технический абзац, чтобы он стал понятен для людей без специальных знаний в IT. Используй информационный стиль.</i>",
                        instruction_label: "Ваш запрос",
                        new_text: "Новый текст",
                        quick: {
                            fix_label: "Исправь ошибки",
                            fix_value:
                                "Исправь грамматику и орфографию, не меняя текст",
                            improve_label: "Улучшить",
                            improve_value:
                                "Перепиши с использованием принципов краткости и четкости изложения информации",
                            longer_label: "Подлиннее",
                            longer_value: "Напиши подлиннее",
                            new_company_story_value:
                                "Напиши историю нашей компании",
                            new_lorem_value: "Напиши текст на любую тему",
                            new_opinion_value: "Напиши отзыв о наших продуктах",
                            new_story_value:
                                "Придумай и расскажи историю, следуя стилю сторителлинга",
                            new_title_value:
                                "Предложи несколько вариантов заголовков",
                            rephrase_label: "Предложи варианты",
                            rephrase_value: "Предложи несколько вариантов",
                            shorten_label: "Покороче",
                            shorten_value: "Напиши покороче",
                            simplify_label: "Понятнее",
                            simplify_value: "Перепиши более понятным языком",
                        },
                        response_error_message: "Запрос не выполнен",
                        response_regenerate: "Повторить",
                        source_text_caption: "Текст на странице",
                        tariff_warning:
                            "AI-копирайтер недоступен на вашем тарифном плане",
                        title: "AI-Копирайтер",
                        too_many_requests_message:
                            "Превышено количество запросов в сутки (%count%)",
                    },
                },
                animation: {
                    actions: {
                        animation_buffer_is_empty_toast:
                            "Нет скопированных анимаций",
                        animation_copied_toast: "Анимация скопирована",
                        animation_pasted_toast: "Анимация вставлена",
                        copy_button: "Копировать анимацию",
                        copy_settings_button: "Копировать настройки",
                        edit: "Редактировать анимацию",
                        from_scratch_button: "Начать с нуля",
                        paste_button: "Вставить анимацию",
                        paste_settings_button: "Вставить настройки",
                        remove_button: "Удалить анимацию",
                        select_preset_button: "Выбрать из пресетов",
                        settings_buffer_is_empty_toast:
                            "Нет скопированных настроек шага",
                        settings_copied_toast: "Настройки шага скопированы",
                        settings_pasted: "Настройки шага вставлены",
                    },
                    adaptive: {
                        disable_option: "Отключить на мобильных",
                        infehrit_desktop_option: "Наследовать с ПК",
                        redefine_option: "Переопределить для мобильных",
                        title: "Режим адаптива",
                    },
                    animation_settings: {
                        animation_trigger: {
                            add_class_button: "Свой класс",
                            choose_block_button: "Выбрать секцию",
                            choose_element_button: "Выбрать элемент",
                            choose_text:
                                "Выберите элемент, с которым будет происходить событие-триггер, чтобы перейти к настройке",
                            choose_zone_button: "Выбрать контент-зону",
                            current_element: "Текущий элемент",
                            many_title: "Элементы для триггера",
                            not_selected: "Не выбрано",
                            tip: "Элемент, для которого отслеживается событие-триггер, запускающее анимацию. По умолчанию это элемент, для которого применяется анимация.",
                            title: "Элемент для триггера",
                            trigger_event: {
                                end_title: "Завершения",
                                iteraction_end_tip:
                                    "Срабатывает при завершении каждой итерации для зацикленной анимации",
                                iteraction_end_title: "Завершения итерации",
                                iteraction_start_tip:
                                    "Срабатывает при начале каждой итерации для зацикленной анимации",
                                iteraction_start_title: "Начала итерации",
                                pause_tip:
                                    "Срабатывает для анимации с действием «Ставить на паузу»",
                                pause_title: "Паузы",
                                start_title: "Начала",
                                step_iteraction_end_tip:
                                    "Срабатывает при завершении каждой итерации для зацикленного шага",
                                step_iteraction_start_tip:
                                    "Срабатывает при начале каждой итерации для зацикленного шага",
                                title: "Начать анимацию после",
                                unpause_title: "Снятия паузы",
                            },
                            trigger_item: {
                                animation_option: "Всей анимации",
                                step_option: "%index% шага",
                                title: "Триггер для",
                            },
                            without_animation_text:
                                "На выбранном элементе не добавлена анимация. Добавьте ее или выберите другой элемент",
                        },
                        interaction_type: {
                            click_title: "При клике",
                            cursor_title: "При перемещении курсора",
                            custom_title: "Не запускать",
                            hold_title: "При зажатии",
                            hover_title: "При наведении",
                            page_load_title: "При загрузке страницы",
                            screen_title: "При появлении на экране",
                            scroll_title: "При скролле",
                            trigger_title: "По триггеру анимации",
                        },
                        interaction_type_title: "Запуск анимации",
                        intersection_line: {
                            tip: "Анимация начнется, как только верхняя граница элемента окажется выше линии пересечения",
                            title: "Линия пересечения",
                            window_bottom_title: "Низ экрана",
                            window_center_title: "Центр экрана",
                            window_top_title: "Верх экрана",
                        },
                        intersection_line_offset: {
                            percent_tip: "Относительно высоты экрана",
                            title: "Отступ от линии пересечения",
                        },
                        progress: {
                            duration_text: "Длительность (%duration% с)",
                            play_all_button: "Все",
                            play_step_button: "Шаг",
                            preview_button: "Предпросмотр анимации",
                            stop_button: "Стоп",
                            title: "Проигрывание",
                        },
                        retrigger_behavior: {
                            click_title: "При повторном клике",
                            hold_title: "После отжатия",
                            hover_title: "После отведения курсора",
                            none_option: "Ничего не делать",
                            pause_option: "Ставить на паузу",
                            reset_option: "Сбрасывать в начало",
                            restart_option: "Проигрывать заново",
                            reverse_option: "Проигрывать обратно",
                            screen_title: "При пропадании c экрана",
                            trigger_title: "При повторном триггере",
                        },
                        scroll_fix: {
                            label: "Фиксировать при прокрутке",
                            static_not_allow_tip:
                                "Фиксация недоступна для статичных элементов",
                        },
                        seek_axis: { title: "Ось синхронизации" },
                        seek_mode: {
                            cursor_seek_title: "Синхронизация с курсором",
                            error_tip:
                                "3D-поворот может некорректно работать для анимации «При скролле» с типом воспроизведения «Пошаговое проигрывание»",
                            play_title: "Пошаговое проигрывание",
                            scroll_seek_title: "Синхронизация с прокруткой",
                            title: "Тип воспроизведения",
                        },
                        seek_smoothing: {
                            cursor_title: "Сглаживание перемещения курсора",
                            scroll_title: "Cглаживание при скролле",
                        },
                        stop_seek: { label: "Остановка при скролле вверх" },
                        title: "Настройки",
                        trigger_element: {
                            pick_on_page_text: "Выберите элемент на странице",
                        },
                    },
                    class_settings: {
                        element_search_all: "Все",
                        element_search_closest: "Родительский",
                        element_search_title: "Поиск элементов",
                        title: "Настройки класса",
                    },
                    direction: {
                        bounce_option: "Туда-обратно",
                        normal_option: "Туда",
                        title: "Направление проигрывания",
                    },
                    empty_placeholder: {
                        not_found_text:
                            "Элемент не выбран. Выберите для какого элемента вы хотите настроить анимацию",
                        select_one_text:
                            "Выберите один элемент для настройки анимации",
                        without_animation_text:
                            "Элемент без анимации. Добавьте анимацию, чтобы перейти к настройкам",
                    },
                    presets: {
                        complex_title: "Пошаговые",
                        css: {
                            complex: {
                                fade_in: "Fade in",
                                fade_out: "Fade out",
                                fix_on_scroll: "Фиксация при скролле",
                                flash: "Вспышка",
                                hello: "Всем привет",
                                jello: "Желе",
                                mask_bottom: "Mask slide up",
                                mask_center: "Mask center",
                                mask_resize: "Mask resize",
                                parallax_on_scroll: "Параллакс",
                                pulse: "Пульсация",
                                right_rolling: "Перекатывание вправо",
                                scale_fade_in: "Появление с увеличением",
                                scale_jump: "Подпрыгивание с увеличением",
                                scale_rotate: "Поворот с увеличением",
                                shaking: "Потряхивание",
                                skew_on_click: "Искажение при клике",
                                skew_on_scroll: "Искажение при скролле",
                                vibration: "Вибрация",
                            },
                            simple: {
                                fade_in: "Появление",
                                fade_out: "Исчезновение",
                                left_fade_in: "Появление слева",
                                rotate: "Поворот",
                                scale: "Увеличение",
                                shift: "Сдвиг",
                                skew: "Искажение",
                            },
                        },
                        simple_title: "Простые",
                    },
                    repeat_count: {
                        loop_step_label: "Зациклить шаг",
                        loop_steps_label: "Зациклить шаги",
                        title: "Число повторений",
                    },
                    reverse_seek_behavior: {
                        seek_option: "Вниз-вверх",
                        stop_option: "Вниз",
                        title: "Анимировать при скролле",
                    },
                    step_settings: {
                        css: {
                            mask: {
                                circle: {
                                    center_title: "Центр круга",
                                    radius_title: "Радиус",
                                },
                                circle_title: "Круг",
                                inset_title: "Квадрат",
                                rounding: { title: "Скругление" },
                                title: "Маска",
                            },
                            opacity: { title: "Прозрачность" },
                            perspective: { title: "Перспектива" },
                            rotate: {
                                auto_tip:
                                    "Значение поворота наследуется от элемента",
                                title: "Поворот",
                            },
                            scale: {
                                title: "Масштаб",
                                too_large_tip:
                                    "Большое значение масштаба может отразится на качестве отображения элемента",
                            },
                            shift: {
                                move_button_tip: "Перемещение на странице",
                                title: "Сдвиг",
                                x_percent_tip: "Относительно ширины элемента",
                                y_percent_tip: "Относительно высоты элемента",
                            },
                            skew: { title: "Искажение" },
                        },
                        delay: { title: "Задержка перед началом" },
                        distance: {
                            percent_tip: "Относительно высоты экрана",
                            title: "Дистанция",
                        },
                        duration: { title: "Продолжительность" },
                        easing: {
                            bezier_type: "Кривая",
                            fast_spring: { title: "Быстрая пружина" },
                            medium_spring: { title: "Средняя пружина" },
                            more_presets_title: "Больше пресетов",
                            presets_title: "Пресеты",
                            settings_title: "Настройки плавности",
                            slow_spring: { title: "Медленная пружина" },
                            spring_type: "Пружина",
                            title: "Плавность",
                        },
                        initial_state_name: "Начальное состояние",
                        pointer_events: {
                            tip: "В момент воспроизведения шага элемент станет не кликабельным и его нельзя будет выделить",
                            title: "Сквозной курсор",
                        },
                        step_name: "Шаг %index%",
                        title: "Шаги",
                        transform_origin: {
                            bottom_left_option: "Низ-лево",
                            bottom_option: "Низ",
                            bottom_right_option: "Низ-право",
                            center_option: "Центр",
                            left_option: "Лево",
                            right_option: "Право",
                            tip: "Точка, которая будет служить центром трансформации (Масштаб, Поворот, Искажение)",
                            title: "Точка трансформации",
                            top_left_option: "Верх-лево",
                            top_option: "Верх",
                            top_right_option: "Верх-право",
                        },
                    },
                    steps_list: { title: "Список шагов" },
                    title: "Анимация",
                },
                apps_buttons: {
                    button_indent_title: "Отступ между кнопками",
                    button_size_title: "Размер кнопок",
                    button_tab: "Кнопки",
                    color: {
                        black_tip: "Темный",
                        light_tip: "Светлый",
                        title: "Цвет кнопок",
                    },
                    effect: {
                        fill_button: "Заливка",
                        opacity_button: "Прозрачность",
                        title: "Эффект при наведении",
                        zoom_button: "Увеличение",
                    },
                    field_placeholder: "Ссылка",
                    goals_tab: "Цели",
                    layout: {
                        horizontal_button: "Горизонтально",
                        title: "Расположение кнопок",
                        vertical_button: "Вертикально",
                    },
                    style: {
                        background_button: "Фон",
                        border_button: "Обводка",
                        title: "Стиль",
                    },
                },
                background: {
                    color: {
                        background_label: "Цвет фона",
                        color_text_tip: "Применяется к элементам с цветом Авто",
                        contrast_tip: "Авто цвет текста",
                        dark_tip: "Тёмный текст",
                        fogging_label: "Затемнение",
                        fogging_toggle: "Затемнение",
                        light_tip: "Светлый текст",
                        opacity_toggle: "Прозрачность",
                        radius_toggle: "Скругление углов",
                        setting_tip: "Настроить",
                        shadow_toggle: "Тень",
                        text_label: "Цвет текста",
                        toggle: "Настроить фон",
                    },
                    color_tab: "Цвет",
                    effect: {
                        fixed: "Фиксированный фон",
                        no_effect: "Без эффекта",
                        parallax: "Параллакс",
                        parallax_fade: "Параллакс с затемнением",
                        zoom: "Отдаление",
                        zoom_return: "Отдаление и приближение",
                    },
                    effects_label: "Эффекты фона",
                    gallery: {
                        category: { title: "Категории" },
                        category_animal: "Животные",
                        category_autumn: "Осень",
                        category_bike: "Велосипеды",
                        category_business: "Бизнес",
                        category_car: "Автомобили",
                        category_city: "Города",
                        category_clock: "Часы",
                        category_coffee: "Кофе",
                        category_computer: "Компьютеры",
                        category_construction: "Строительство",
                        category_desk: "Рабочий стол",
                        category_family: "Семья",
                        category_flower: "Цветы",
                        category_food: "Еда",
                        category_friends: "Друзья",
                        category_girl: "Девушки",
                        category_happy: "Счастье",
                        category_home: "Дом",
                        category_landscape: "Пейзаж",
                        category_latest: "Свежее",
                        category_love: "Любовь",
                        category_man: "Мужчины",
                        category_motorcycle: "Мотоциклы",
                        category_mountains: "Горы",
                        category_music: "Музыка",
                        category_nature: "Природа",
                        category_office: "Офис",
                        category_people: "Люди",
                        category_popular: "Популярное",
                        category_rain: "Дождь",
                        category_restaurant: "Ресторан",
                        category_road: "Дороги",
                        category_search: "Поиск",
                        category_sky: "Небо",
                        category_sport: "Спорт",
                        category_spring: "Весна",
                        category_summer: "Лето",
                        category_wedding: "Свадьба",
                        category_winter: "Зима",
                        category_woman: "Женщины",
                        category_work: "Работа",
                        modal_title: "Галерея",
                        search: {
                            empty_page:
                                'Изображения по запросу "%search%" <br> не найдены',
                            placeholder: "Поиск изображений",
                        },
                        search_desc:
                            "%title% — бесплатный фотосток снимков<br>высокого разрешения",
                        search_title: "Поиск изображений %title%",
                        unsplash_search_desc:
                            "Unsplash — бесплатный фотосток снимков<br>высокого разрешения",
                        unsplash_search_title: "Поиск изображений Unsplash",
                    },
                    gallery_button: "Галерея",
                    gradient: "Градиент",
                    gradient_down: "Снизу",
                    gradient_up: "Сверху",
                    icorrect_video_link_tip: "Некорректная ссылка",
                    image_placeholder: "Нет изображения",
                    image_position_title: "Изменить положение",
                    image_tab: "Изображение",
                    no_bg_tab: "Без фона",
                    overlay_color_label: "Цвет затемнения",
                    pick_a_visible_area_info: "Укажите видимую область",
                    point_to_center_of_photo: "Выберите центр фотографии",
                    ssl_conflict_error:
                        "Если ваш сайт работает по HTTPS протоколу, следует избегать размещения материалов со сторонних ресурсов, не использующих HTTPS. Иначе посетители могут увидеть предупреждение браузера о незащищенном содержании страницы, и это снизит доверие к вашему сайту.",
                    supported_video_note:
                        'Поддерживается <a href="%youtube%" target="_blank">YouTube</a>, <a href="%vimeo%" target="_blank">Vimeo</a> и видео формата MP4',
                    ubload_video_button: "Загрузить видео",
                    upload_button: "Загрузить превью",
                    video: {
                        link: "Ссылка на видео в",
                        link_desc: "Например, youtube.com/watch?v=DSLgAsrcpGQ",
                        link_placeholder: "Адрес не указан",
                    },
                    video_basebg_tip:
                        "Для мобильных устройств мы рекомендуем использовать базовый фон вместо видео, чтобы страница загружалась быстрее",
                    video_basebg_toggle: "Не проигрывать видео на мобильных",
                    video_basebg_warning:
                        "Использование видео в качестве фона на мобильных значительно замедляет загрузку страницы",
                    video_link_label: "Ссылка на видео",
                    video_parallax_toggle: "Параллакс-эффект",
                    video_preview_color_tab: "Цвет",
                    video_preview_image_tab: "Изображение",
                    video_preview_tip:
                        "Базовый фон видно в процессе загрузки — до начала воспроизведения видео, а также вместо видеофона на мобильных устройствах.",
                    video_preview_title: "Базовый фон",
                    video_tab: "Видео",
                    video_upload_tip:
                        "Формат MP4<br>\nВидеокодек H264 (битрейт от 1 до 5 Мбит/с)<br>\nАудиокодек AAC (битрейт 128 Кбит/с)<br>\nМаксимальный размер файла — 50 Мб",
                },
                block_add: {
                    badges: {
                        cards: "Карточки",
                        columns: "Колонки",
                        ecommerce: "Товары",
                        free: "Свободная секция",
                        new: "Новая",
                        quiz: "Квиз",
                    },
                    button: "Добавить секцию",
                    categories: {
                        advantages: "Преимущества",
                        catalog_section: "Каталог секций",
                        contacts: "Контакты",
                        content: "Контент",
                        cover: "Обложка",
                        empty: "Пустые секции",
                        favorites: "Избранное",
                        footer: "Подвал",
                        form: "Заявки",
                        free: "Свободная секция",
                        free_section: "Свободные секции",
                        global_section: "Глобальные секции",
                        goods: "Товары",
                        header: "Шапка",
                        maps: "Карта",
                        media: "Медиа",
                        navigation: "Навигация",
                        opinion: "Отзывы",
                        other: "Прочее",
                        prices: "Прайсы",
                        quiz: "Квизы",
                        tables: "Таблицы",
                        team: "Команда",
                        unknown: "Без категории",
                    },
                    help_block: {
                        button: "Как это работает",
                        fav: {
                            title: "Вы не добавили ни одной избранной секции",
                        },
                        favorite: {
                            button: "Что такое «Избранное»",
                            title: "В избранном нет секций",
                        },
                        global: {
                            button: "Как работают глобальные секции",
                            title: "Вы не добавили ни одной глобальной секции",
                        },
                    },
                    help_button: { global_header: "Как создать общую шапку" },
                    remove_favorites_text: "Удалить секцию из избранного?",
                    remove_favorites_tip: "Удалить секцию из избранного",
                    remove_globals_text:
                        "Секция будет удалена со всех страниц, на которых она используется",
                    title: "Добавление секции",
                },
                block_settings: {
                    background: { tip: "Настройки фона", title: "Фон" },
                    layout: {
                        card_title: "Карточка",
                        section_title: "Секция",
                        tip: "Настройки структуры",
                        title: "Структура",
                    },
                    settings: {
                        header_title: "Настройки шапки",
                        title: "Настройки",
                    },
                },
                blocks: {
                    block_copied_notify: "Секция скопирована",
                    block_paste_error: "Не удалось вставить секцию",
                    block_pasted_notify: "Секция вставлена",
                    block_removed_notify: "Секция удалена",
                    block_restored_notify: "Секция восстановлена",
                    buffer_is_empty: "Нет скопированных секций",
                },
                bullets: {
                    modal_title: "Буллеты",
                    no_anchor_placeholder: "Без якоря",
                    no_section_title: "Секция",
                    preview: { title: "Название" },
                    sections_list_title: "Выберите секции",
                    show_title_toggle: "Показывать названия",
                    style_section_title: "Стиль",
                    title_label: "Название",
                },
                button: {
                    border_label: "Обводка",
                    button_tab: "Кнопка",
                    click_action_label: "Действие при клике",
                    extend_size: {
                        font_size_label: "Размер шрифта",
                        gap: {
                            horizontal_label: "Отступы по гориз.",
                            vertical_label: "Отступы по вертик.",
                        },
                        height_label: "Высота",
                        line_height_label: "Высота строки",
                        modal_title: "Размер",
                        size_type: { auto: "Авто", manual: "Ручная" },
                        width_label: "Ширина",
                    },
                    file_force_download_toggle: "Скачивание вместо просмотра",
                    file_note:
                        "Современные браузеры открывают PDF или другие документы без сохранения на диск, опция указывает браузеру на необходимость загрузки файла",
                    file_placeholder: "Файл не загружен",
                    fill_label: "Заливка",
                    gap: {
                        horizontal_tip: "Отступы по горизонтали",
                        vertical_tip: "Отступы по вертикали",
                    },
                    goals_tab: "Цели",
                    icon_label: "Иконка",
                    length_note:
                        'Мы <a href="https://academy.flexbe.ru/articles/mistakes/" target="_blank">рекомендуем</a> использовать не более 25 символов',
                    link_blank: "В новом окне",
                    link_modal_title: "Ссылка",
                    link_placeholder: "Введите адрес страницы",
                    modal_title: "Кнопка",
                    no_icon_option: "Без иконки",
                    presets: { modal_title: "Пресеты" },
                    presets_button: "Выбрать пресет",
                    presets_text: "Каталог пресетов кнопок",
                    product_title: "Передавать информацию о товаре",
                    rounding_label: "Скругление",
                    shadow_label: "Тень",
                    size_label: "Размер",
                    style: {
                        color_label: "Цвет кнопки",
                        color_text: {
                            auto: "Авто",
                            dark: "Темный",
                            light: "Светлый",
                        },
                        color_text_label: "Цвет текста",
                        effects: {
                            fill: "Заливка",
                            opacity: "Прозрачность",
                            zoom: "Увеличение",
                        },
                        has_icon_label: "Иконка в кнопке",
                        hover_effect_label: "Эффект при наведении",
                        icon_placement_label: "Расположение иконки",
                        icon_placement_left_btn: "Слева",
                        icon_placement_right_btn: "Справа",
                        icon_size_label: "Размер иконки",
                        line_sizes_label: "Толщина линии",
                        modal_title: "Стиль кнопки",
                        preview_button: "Кнопка",
                        replace_price_label: "Отображать цену товара в кнопке",
                        replace_price_tip:
                            "Для отображения в кнопке цены добавьте в текст кнопки {{ price }}",
                        select_icon_btn: "Выбрать иконку",
                        select_icon_label: "Выберите иконку",
                        size_label: "Размер",
                        stretch_toggle: "Растянуть по ширине",
                        style_label: "Стиль кнопки",
                        weight_label: "Толщина шрифта",
                    },
                    style_label: "Стиль кнопки",
                    style_settings_button: "Настроить стиль",
                    tabs: {
                        goals_title: "Цели",
                        settings_title: "Кнопка",
                        style_title: "Стиль",
                    },
                    text_icon_label: "Текст кнопки и иконка",
                    text_label: "Текст",
                },
                button_line: { settings_tip: "Настроить" },
                cart: {
                    action_warning:
                        "Выберите в настройках кнопки действие при клике «Добавить в корзину»",
                    element: {
                        option: {
                            show_products:
                                "Показывать список товаров при наведении",
                            show_sum: "Показывать итоговую сумму",
                            title: "Настройка выпадающего списка товаров",
                        },
                        style: {
                            cart_color: "Цвет корзины",
                            disabled_tip:
                                "Не поддерживает выбранный стиль корзины",
                            font_size: "Размер шрифта",
                            font_weight: "Толщина шрифта",
                            indicator_color: "Цвет индикатора",
                            preview_title: "Корзина",
                            text_color: "Цвет",
                        },
                        style_title: "Стиль",
                        text_title: "Текст",
                    },
                    modal_button: "Редактировать",
                    modal_info:
                        "Настройте форму заказа: список полей, стиль кнопки, цвет и прозрачность фона и другие параметры",
                    modal_title: "Окно корзины",
                    title: "Корзина",
                    widget: {
                        color_title: "Цвет фона",
                        icon_title: "Иконка",
                        indicator_title: "Цвет индикатора",
                        title: "Настройка иконки",
                    },
                },
                cart_settings: {
                    hide_ui_pay_button_tip:
                        "Переход к оплате недоступен в режиме Скрытия редактора",
                    settings_title: "Настройки корзины",
                },
                clipboarder: {
                    not_allowed_error: "Нет доступа к буферу обмена",
                    permission_modal: {
                        denied_text:
                            "Возможно, ранее вы отклонили запрос разрешения на вставку или политика безопасности вашего браузера запрещает использование буфера обмена. Также причиной может быть отсутствие SSL-сертификата.",
                        hide_forever_link: "Больше не показывать",
                        modal_title: "Разрешите доступ",
                        prompt_text:
                            "Скорее всего, ваш браузер запрашивает разрешение на вставку. Нажмите «Разрешить» на запросе уведомления сверху",
                        settings_link: "Ссылка на настройки в браузере",
                        title: "Упс, кажется возникли проблемы при вставке",
                    },
                },
                color_input: {
                    auto_color_tip: "Автоматически подобранный цвет",
                },
                colorpicker: {
                    add_color: "Добавить цвет",
                    add_gradient: "Добавить градиент",
                    color_max_tip:
                        "Вы добавили максимально доступное количество цветов",
                    color_tab: "Цвет",
                    done: "Готово",
                    favorite: {
                        color_title: "Мои цвета",
                        gradient_title: "Мои цвета",
                    },
                    gradient_max_tip:
                        "Вы добавили максимально доступное количество градиентов",
                    gradient_tab: "Градиент",
                    palette: {
                        color_title: "Палитра",
                        gradient_title: "Градиенты",
                    },
                    palette_title: "Палитра",
                    title: "Цвет",
                },
                columns: {
                    add: {
                        add_comment_button: "Добавить отзыв",
                        add_group_button: "Добавить группу",
                        add_row_button: "Добавить строку",
                        card_button: "Добавить карточку",
                        card_copy_button: "Дублировать карточку",
                        card_copy_tip: "Дублировать карточку",
                        column_button: "Добавить колонку",
                        image_button: "Добавить изображение",
                        image_copy_button: "Дублировать изображение",
                        limit_notity:
                            "В секции не может быть больше %max% элементов",
                        logo_button: "Добавить логотип",
                        remove_comment_button: "Удалить",
                        subitem_button: "Добавить подпункт",
                        tabs_button: "Добавить вкладку",
                        tabs_copy_button: "Дублировать",
                        uploading_in_progress: "Загрузка...",
                    },
                    move: {
                        card_button: "Переместить карточку",
                        column_button: "Переместить колонку",
                        default_button: "Переместить",
                        group_button: "Переместить",
                        image_button: "Переместить картинку",
                        logo_button: "Переместить логотип",
                        row_button: "Переместить",
                        tabs_button: "Переместить вкладку",
                    },
                    move_icon_tip: "Переместить",
                    move_tip: "Перетащите сюда",
                    remove: {
                        card_button: "Удалить карточку",
                        column_button: "Удалить колонку",
                        comment_button: "Удалить",
                        default_button: "Удалить",
                        footer_button: "Удалить колонку",
                        group_button: "Удалить",
                        image_button: "Удалить картинку",
                        logo_button: "Удалить логотип",
                        row_button: "Удалить",
                        subitem_button: "Удалить",
                        tabs_button: "Удалить вкладку",
                    },
                    remove_icon_tip: "Удалить",
                    settings: {
                        card_button: "Настроить карточку",
                        column_button: "Настроить колонку",
                    },
                    settings_icon_tip: "Настроить",
                },
                common: {
                    border_radius_label: "Скругление углов",
                    border_radius_toggle: "Скругление углов",
                    device_category: {
                        desktop: "Десктопные устройства",
                        mobile: "Мобильные устройства",
                        tablet: "Планшеты",
                    },
                    disable_multiple_border_radius_tip:
                        "Настройка закругления углов по отдельности недоступна, когда в качестве цвета обводки выбран Градиент",
                },
                conjunction: { or: "или" },
                control: {
                    copy_section_tip: "Дублировать",
                    delete_section_tip: "Удалить",
                    favorites: {
                        add_tip: "Добавить в избранное",
                        update_tip: "Обновить в избранном",
                    },
                    global: { add_tip: "Сделать глобальной" },
                    globals: { edit: "Редактировать" },
                    hide_section_tip: "Скрыть",
                    move_tip: "Переместить",
                    options_tip: "Больше опций",
                    replace_section_tip: "Заменить секцию",
                    responsive: {
                        hidden_all_tip: "Скрытый",
                        hidden_desktop_tip: "Только мобильные",
                        hidden_false_tip: "Видимый",
                        hidden_mobile_tip: "Только ПК",
                        hide_all_tip: "Скрыт",
                        only_desktop_tip: "Только ПК",
                        only_mobile_tip: "Только мобильные",
                        show_all_tip: "Все устройства",
                        show_hidden_off_toast:
                            "Чтобы увидеть скрытые элементы, включите «Показать скрытые объекты» %key%",
                        show_hidden_on_toast:
                            "Чтобы скрыть элементы в редакторе, отключите «Показать скрытые объекты» %key%",
                        visibility_label: "Видимость на устройствах",
                    },
                    site: {
                        footer_title: "Подвал для всех страниц",
                        header_title: "Шапка для всех страниц",
                        hide: "Скрыть",
                        replace: "Заменить",
                        settings: "Настроить",
                        show: "Показать",
                    },
                },
                controls: { globals: { un_global: "Сделать не глобальной" } },
                copyright: { hide_tip: "Скрыть", show_tip: "Показать" },
                custom_code: {
                    add_code: "Добавить",
                    body_list: "Перед </body>",
                    code_add_error: "Ошибка при добавлении",
                    code_add_success: "Код добавлен",
                    code_remove_error: "Ошибка при удалении",
                    code_remove_success: "Код удален",
                    confirm_text:
                        "После удаления восстановить код будет невозможно",
                    confirm_title: "Вы уверены, что хотите удалить код?",
                    empty_text: "У вас нет кода на странице",
                    head_list: "Перед </head>",
                    html_code_title: "Элементы с пользовательским кодом",
                    load_code_error: "Ошибка при загрузке",
                    modal_title: "Код",
                    sort_empty_text:
                        "Добавьте код или переместите существующий",
                    sorting_error: "Ошибка сортировки",
                },
                drop_zone: {
                    placeholder_title: "Опустите, чтобы начать загрузку",
                },
                ecommerce: {
                    article: {
                        show_value_only: "Отображать только значение",
                        title: "Настройка артикула",
                    },
                    available: {
                        modal_title: "Наличие",
                        show: "Отображать наличие",
                        use_colored_statuses: "Использовать цветные статусы",
                        use_colored_statuses_tip:
                            "Будут использованы разные цвета для статусов <br>«В наличии», «Нет в наличии» и «Под заказ».",
                    },
                    button: {
                        change_product: "Сменить товар",
                        connect_product: "Выбрать товар",
                        disconnect_product: "Отвязать товар",
                    },
                    button_with_available: { title: "Кнопка с наличием" },
                    button_with_price: { title: "Кнопка рядом с ценой" },
                    button_with_price_and_available: {
                        title: "Кнопка рядом с ценой и наличием",
                    },
                    media: {
                        type: { image: "Изображение", slider: "Слайдер" },
                    },
                    old_price: {
                        show: "Отобразить цену",
                        title: "Старая цена",
                    },
                    options: {
                        active_color: "Цвет активной опции",
                        align: "Выравнивание",
                        show_available: "Индикация наличия товара",
                        show_in_stock_statuses: "Отображать статус «В наличии»",
                        show_in_stock_statuses_tip:
                            "Если товар в наличии, будет отображаться статус «В наличии». Статусы «Нет в наличии» и «Под заказ» будут отображаться независимо от этой опции",
                        show_title: "Отображать названия опций",
                        size: "Размер",
                        style: "Стиль",
                    },
                    price: { modal_title: "Цена" },
                    tariff_warning: {
                        button_text: "Функционал ограничен",
                        tip_text:
                            "Пользователи не увидят товары в этой секции, поскольку данный функционал недоступен на вашем тарифе.",
                    },
                    tips: {
                        lock_product:
                            'Выбранный вариант товара будет зафиксирован и не будет меняться при выборе другого варианта в элементе "Опции".',
                        unlock_product:
                            'Выбранный вариант товара будет отображаться при загрузке страницы, но будет меняться при выборе другого варианта в элементе "Опции".',
                    },
                    title: { not_connect_product: "Товар не выбран" },
                },
                ecommerce_button: {
                    align: {
                        left: "Разместить слева",
                        right: "Разместить справа",
                        title: "Выравнивание",
                    },
                    position: "Расположение кнопки",
                    text_info:
                        "Вы можете использовать переменную { price } для отображения цены",
                },
                effects: {
                    duration_label: "Время анимации",
                    duration_suffix: "с",
                    error: {
                        zone_with_animation:
                            "Эффект не применяется, когда в контент-зоне настроена анимация",
                    },
                    fill: {
                        effect_style_label: "Стиль заливки",
                        style_bl_tip: "Заливка из нижнего левого угла",
                        style_br_tip: "Заливка из нижнего правого угла",
                        style_bс_tip: "Заливка снизу",
                        style_cl_tip: "Заливка слева",
                        style_cr_tip: "Заливка справа",
                        style_fade_tip: "Плавная смена фона",
                        style_tl_tip: "Заливка из верхнего левого угла",
                        style_tr_tip: "Заливка из верхнего правого угла",
                        style_tс_tip: "Заливка сверху",
                    },
                    glare: {
                        blur_label: "Размытие",
                        color_label: "Цвет",
                        radius_label: "Размер",
                    },
                    mobile_disable_toggle: "Отключить эффекты на мобильных",
                    opacity: { opacity_label: "Итоговая прозрачность" },
                    params_title: "Параметры",
                    play_presets: "Демо",
                    presets: {
                        border_option: "Обводка",
                        fadein_option: "Появление контента",
                        fill_option: "Заливка",
                        opacity: "Прозрачность",
                        pull_option: "Сдвиг + Тень",
                        scale_option: "Увеличение",
                        shadow_option: "Тень",
                    },
                    presets_button: "Выбрать эффект",
                    presets_text: "Каталог эффектов",
                    presets_title: "Выберите эффект",
                    settings_title: "Настройки эффекта",
                    shift: { bottom_tip: "Вниз", top_tip: "Вверх" },
                    show_content: {
                        from_opacity_label: "Стартовая видимость",
                        preview_warning_text:
                            "Эффект не применяется в режиме редактирования",
                    },
                    underline: {
                        border_label: "Толщина",
                        color_label: "Цвет линии",
                        type: {
                            animated: "Анимация",
                            change: "Изменение",
                            hide: "Исчезновение",
                            show: "Появление",
                        },
                    },
                },
                elements: {
                    add_element: {
                        base: "Базовые",
                        copy: {
                            buffer_is_empty: "Нет скопированных элементов",
                            clear_clipboard_elements: "Очистить",
                            copied_toast: "Элемент скопирован",
                            copy_denied: "Нельзя скопировать выбранный элемент",
                            cut_toast: "Элемент вырезан",
                            duplicated_toast: {
                                one: "Элемент дублирован",
                                few: "Элементы дублированы",
                                many: "Элементы дублированы",
                                other: "Элемент дублирован",
                            },
                            multiple_elements: {
                                one: "%count% элемент",
                                few: "%count% элемента",
                                many: "%count% элементов",
                                other: "%count% элемента",
                            },
                            panel_tip:
                                "Здесь хранятся скопированные элементы. Последний добавленный элемент вставляется сочетанием клавиш «%os_hotkey% + V». Также элемент можно вырезать сочетанием клавиш «%os_hotkey% + X».",
                            panel_title: "Вставить из буфера",
                            paste_denied: {
                                no_hover:
                                    "Наведите мышкой на область, в которую вы хотите вставить элемент",
                                no_space:
                                    "Элемент слишком большой для вставки в эту область",
                                wrong_zone:
                                    "Элемент нельзя вставить в эту область",
                            },
                            paste_with_modals: {
                                add: {
                                    one: "Добавить окно",
                                    few: "Добавить окна",
                                    many: "Добавить окна",
                                    other: "Добавить окна",
                                },
                                cancel: "Пропустить",
                                confirm: {
                                    text: {
                                        one: "В данном элементе есть ссылка на всплывающее окно,<br>которого нет на данной странице",
                                        few: "В данном элементе есть ссылки на всплывающие окна,<br>которых нет на данной странице",
                                        many: "В данном элементе есть ссылки на всплывающие окна,<br>которых нет на данной странице",
                                        other: "В данном элементе есть ссылки на всплывающие окна,<br>которых нет на данной странице",
                                    },
                                    title: {
                                        one: "Добавить привязанное окно на страницу?",
                                        few: "Добавить привязанные окна на страницу?",
                                        many: "Добавить привязанные окна на страницу?",
                                        other: "Добавить привязанные окна на страницу?",
                                    },
                                },
                                title: {
                                    one: "Добавить привязанное к элементу окно",
                                    few: "Добавить привязанные к элементу окна",
                                    many: "Добавить привязанные к элементу окна",
                                    other: "Добавить привязанные к элементу окна",
                                },
                            },
                            pasted_toast: {
                                one: "Элемент вставлен",
                                few: "%count% элемента вставлено",
                                many: "%count% элементов вставлено",
                                other: "%count% элемента вставлено",
                            },
                            time: { hours: "ч", minutes: "м", seconds: "с" },
                        },
                        ecommerce: "Товарные",
                        ecommerce_info:
                            "Товарный элемент позволяет собрать карточку товара вне товарной секции и настроить внешний вид ее компонентов",
                        elements: "Элементы",
                        title: "Добавить элемент",
                        type_free: "Абсолютные",
                        type_static: "Статичные",
                    },
                    add_guide_label: "Добавить направляющую",
                    add_tip: "Добавить элемент",
                    align_content_title: "Выравнивание контента",
                    alignment_center_tip: "По центру",
                    alignment_left_tip: "Слева",
                    alignment_right_tip: "Справа",
                    alignment_title_tip: "Выравнивание",
                    auto_width_label: "Заполнить",
                    auto_width_tip:
                        "Элемент заполнит всё свободное пространство",
                    autoposition_off_value: "Ручная",
                    autoposition_on_value: "Авто",
                    autowidth_label: "Автоширина",
                    block_zone_empty_column:
                        "<p>Нет элементов</p>\n<p>Кликните, чтобы добавить</p>",
                    block_zone_empty_row:
                        "<p>Кликните, чтобы добавить элемент</p>",
                    change_color_tip: "Цвет элемента",
                    change_state_tip: "Изменить состояние",
                    class_name: {
                        add_class: "Добавить",
                        copy: "Класс элемента скопирован",
                        name_placeholder: "Название класса",
                        title: "Класс элемента",
                    },
                    clip_content_label: "Обрезать по контейнеру",
                    contain_card_text: {
                        one: "Карточка 1",
                        few: "Карточка %count%",
                        many: "Карточка %count%",
                        other: "Карточка %count%",
                    },
                    contain_column_text: {
                        one: "Колонка 1",
                        few: "Колонка %count%",
                        many: "Колонка %count%",
                        other: "Колонка",
                    },
                    contain_fixed_text: "Экран",
                    contain_fixed_tip:
                        "Элемент будет оставаться в одном и том же месте на экране при прокрутке страницы",
                    contain_footer_text: {
                        one: "Колонка 1",
                        few: "Колонка %count%",
                        many: "Колонка %count%",
                        other: "Колонка",
                    },
                    contain_label: "Контейнер",
                    contain_layout_text: "Сетка",
                    contain_modal_text: "Окно",
                    contain_screen_text: "Секция",
                    contain_sectionFooter_text: "Подвал секции",
                    contain_title_text: "Заголовок секции",
                    copy_label: "Копировать в буфер",
                    create_element_label: "Добавить элемент",
                    divider: {
                        info: "Изменения настроек разделителя применяются ко всем разделителям секции",
                        stretch_label: "Растянуть по ширине карточки",
                    },
                    duplicate_label: "Дублировать",
                    ecommerce: {
                        available: "Настройка наличия",
                        description: "Настройка описания",
                        info: "Товарный элемент",
                        media: "Настройка медиа",
                        options: "Настройка опций",
                        price: "Настройка цены",
                        title: "Настройка названия",
                    },
                    edit_tip: "Редактировать элемент",
                    fill_inline_label: "Заполнить",
                    fill_inline_tip:
                        "Элемент заполнит всё доступное пространство. Не применяется в редакторе.",
                    fill_label: "Заполнить",
                    fill_tip:
                        "Элемент целиком заполнит контейнер, в котором находится",
                    free: {
                        align: {
                            align_center: "По центру вертикально",
                            align_end: "По нижнему краю",
                            align_start: "По верхнему краю",
                            justify_center: "По центру горизонтально",
                            justify_end: "По правому краю",
                            justify_start: "По левому краю",
                        },
                        binding: {
                            align_center: "Центр",
                            align_end: "Снизу",
                            align_start: "Сверху",
                            justify_center: "Центр",
                            justify_end: "Справа",
                            justify_start: "Слева",
                        },
                        element_contain_screen: "По экрану",
                        element_locked: "Заблокирован",
                        unlock_element_tip: "Разблокировать",
                    },
                    height_label: "Высота",
                    horizontal_guide_label: "Горизональную",
                    indent: {
                        cover_mode_message:
                            "Для изменения размера секции отключите опцию «Полноэкранный режим»",
                        display_unit_default: "%value%%unit%",
                        display_unit_disabled: "Изменение размера недоступно",
                        display_unit_fill_disabled:
                            "Для изменения высоты отключите опцию «Заполнить»",
                        display_unit_fill_minheight:
                            "Мин. высота %value%%unit%",
                        display_unit_fillbottom_disabled:
                            "Для настройки отступа отключите опцию «Прижать к низу»",
                        display_unit_min_proportion:
                            "Мин. высота %value%% от ширины",
                        display_unit_minpadding: "Мин. отступ %value%%unit%",
                        display_unit_nogutter_disabled:
                            "Для настройки отступа отключите опцию «Без отступов»",
                        display_unit_proportion: "%value%% от ширины",
                        fullscreen_mode_tip:
                            "Минимальный отступ применяется, когда содержимое секции не вмещается в экран посетителя",
                        fullscreen_mode_tip_title:
                            "Включен полноэкранный режим",
                        min_indent_bottom: "Мин. отступ снизу",
                        min_indent_top: "Мин. отступ сверху",
                        no_frame_tip: "Без отступов",
                        recommend_info: "Рекомендуется: %padding%px",
                        suggested_label: "Рекомендуемый отступ %value%%unit%",
                    },
                    intersecting_elements_empty: "Нет элементов",
                    intersecting_elements_label: "Пересекающиеся элементы",
                    justify_element_title: "Выравнивание",
                    justify_free_element_title: "Выравнивание",
                    layout_title: "Структура элемента",
                    lock_position_label: "Заблокировать",
                    max_height_label: "Макс. высота",
                    max_width_label: "Макс. ширина",
                    min_height_label: "Мин. высота",
                    min_width_label: "Мин. ширина",
                    more_tip: "Больше опций",
                    move_tip: "Переместить",
                    no_place_for_add_overlay:
                        "Недостаточно места для вставки элемента",
                    paste_error: "Не удалось вставить элемент",
                    paste_label: "Вставить элемент",
                    pointerevents_label: "Сквозной курсор",
                    pointerevents_tip:
                        "Посетители сайта не смогут кликать или выделять элемент",
                    position_axisx_label: "Ось X",
                    position_axisy_label: "Ось Y",
                    position_binding_label: "Привязка",
                    position_binding_tip:
                        "Начало координат для позиционирования элемента. Используйте %key% при перемещении элемента для автоматического выбора ближайшей точки привязки",
                    position_label: "Прилипание и размер",
                    press_bottom_label: "Прижать к низу",
                    remove_label: "Удалить",
                    remove_zone_label: "Удалить",
                    remove_zone_section_footer_label: "Отключить подвал секции",
                    remove_zone_title_label: "Отключить заголовок секции",
                    seo_caption_note:
                        "Опция для SEO (продвижение в поисковых системах), не влияет на размер шрифта",
                    seo_label: "HTML тег",
                    settings_tip: "Структура элемента",
                    settings_zone_tip: "Настроить область",
                    stretch_label: "Без отступов",
                    stretch_tip:
                        "Элемент будет игнорировать отступы контейнера, в котором находится",
                    styles_tip: "Стиль",
                    type: {
                        deny_change_tip:
                            "Элемент не поддерживает смену позиционирования",
                        free: "Абсолютное",
                        static: "Статичное",
                        title: "Позиционирование",
                    },
                    vertical_guide_label: "Вертикальную",
                    width_label: "Ширина",
                    "zindex:backward_deny_tip": "Ниже слоёв нет",
                    "zindex:bring_forward_tip": "На слой выше",
                    "zindex:current_value_tip": "Текущее значение z-index",
                    "zindex:forward_deny_tip": "Выше слоёв нет",
                    "zindex:label": "Переместить слой",
                    "zindex:send_backward_tip": "На слой ниже",
                    "zindex:to_back_tip": "Ниже всех слоёв",
                    "zindex:to_front_tip": "Выше всех слоёв",
                },
                errors: {
                    copy: {
                        saved_colors:
                            "Не удалось сохранить список «Сохраненные цвета»",
                    },
                    duplicated_anchor: "Якорь уже используется",
                    invalid_anchor: "Неправильно указан якорь",
                    invalid_link: "Неправильно указана ссылка",
                    item_is_not_filled: "Пустое название пункта меню",
                    no_modal_selected: "Не выбрано всплывающее окно",
                    no_product_data: "Не заполнены данные о товаре",
                    wrong_action_title: "Неправильно настроено действие",
                },
                favorites: {
                    add_error_notity: "Ошибка, попробуйте еще раз",
                    added_notity: "Добавлено в избранное",
                    delete_error_notity: "Ошибка, попробуйте еще раз",
                    updated_notity: "Секция в избранном обновлена",
                },
                figure: {
                    background_blur: {
                        tip: "Не поддерживается Firefox",
                        title_toggle: "Размытие фона",
                    },
                    background_fixed: { title_toggle: "Фиксированный фон" },
                    blur: { title_toggle: "Размытие" },
                    border: {
                        color: "Цвет обводки",
                        radius: "Скругление углов",
                        title: "Обводка",
                        width: "Толщина обводки",
                    },
                    catalog: { title: "Выберите фигуру" },
                    catalog_button: "Каталог фигур",
                    click_action_label: "Действие при клике",
                    click_action_label_inactive:
                        "Для корректной работы цели настройте действие при клике на вкладке «Фигура»",
                    conversion: {
                        cancel_button: "Отмена",
                        conversion_button: "Конвертировать",
                        conversion_image: "После конвертации",
                        desc: 'После конвертации фигуры будет доступно изменение заливки. Если результат конвертации вам не подходит, подготовьте SVG, следуя <a href="%link%" target="_blank">инструкции</a>.',
                        original_image: "Оригинал",
                        title: "Конвертация",
                    },
                    conversion_desc:
                        "Вы можете сконвертировать SVG\nдля изменения заливки",
                    effects: { title: "Эффекты" },
                    figure_tab: "Фигура",
                    fill: {
                        color_button: "Цвет",
                        color_title: "Цвет заливки",
                        image_button: "Изображение",
                        title: "Заливка",
                        transparent_button: "Без цвета",
                    },
                    goals_tab: "Цели",
                    instruction_info:
                        '<a href="%link%" target="_blank">Инструкция</a> по подготовке фигуры в SVG',
                    line: {
                        arrow_title: "Вид стрелки",
                        color_title: "Цвет",
                        style_title: "Тип линии",
                        width_title: "Толщина линии",
                    },
                    opacity_toggle: "Прозрачность",
                    reflection: "Ориентация",
                    reflection_horizontal: "Отразить по горизонтали",
                    reflection_left: "Повернуть на 90˚ влево",
                    reflection_right: "Повернуть на 90˚ вправо",
                    reflection_vertical: "Отразить по вертикали",
                    save_proportion_toggle: "Оригинальные пропорции",
                    shadow: {
                        blur_input: "Размытие",
                        color_input: "Цвет",
                        spread_input: "Размах",
                        title_toggle: "Тень",
                    },
                    title: "Настройка фигуры",
                    upload_button: "Загрузить",
                },
                fonts: {
                    desc_content:
                        "Текст — зафиксированная на каком-либо материальном носителе человеческая мысль",
                    desc_quote:
                        "Цитата — дословная выдержка (отрывок) из какого-либо текста",
                    desc_subtitle: "Подзаголовок секции",
                    desc_title: "Заголовок секции",
                    modal: {
                        apply_to_project_tip:
                            "Применить шрифты для всех страниц сайта",
                        catalogue_fonts_title: "Каталог шрифтов",
                        empty_fonts_list: "Ничего не найдено",
                        empty_myfonts_link: "Управление шрифтами",
                        empty_myfonts_list: "Нет загруженных шрифтов",
                        font_removed_tip:
                            "Указанный шрифт был удален из раздела Мои шрифты. Выберите другой шрифт",
                        font_search_placeholder: "Поиск по названию шрифта",
                        fonts_control_link: "Управление шрифтами",
                        global_section_fonts_info:
                            "Глобальные секции используют шрифты страницы, на которую они добавлены. При редактировании глобальной секции используются шрифты сайта",
                        google_fonts_heading: "Google Fonts",
                        local_fonts_heading: "Системные шрифты",
                        local_fonts_tip:
                            "Предустановленные в операционную систему шрифты. Использование этих шрифтов не влияет на скорость загрузки страницы",
                        my_fonts_heading: "Мои шрифты",
                        my_fonts_title: "Мои шрифты",
                        options_text: "Вариант %current% из %total%",
                        project_fonts_info:
                            "На странице используются общие шрифты сайта",
                        project_fonts_list_title: "Шрифты сайта:",
                        save_to_project_sets_confirm_desc:
                            "Выбранные стили будут применены к шрифтам сайта",
                        save_to_project_sets_confirm_done:
                            "Настройки шрифтов сохранены",
                        save_to_project_sets_confirm_title:
                            "Применить для всех страниц",
                        title: "Шрифты",
                        use_page_fonts_label:
                            "Переопределить шрифты для страницы",
                        use_page_fonts_tip:
                            "Вы можете использовать шрифты общие для всех страниц или задать шрифты индивидуально для текущей страницы",
                    },
                    name_content: "Текст",
                    name_quote: "Цитата",
                    name_subtitle: "Подзаголовок",
                    name_title: "Заголовок",
                    name_title_main: "Основной заголовок",
                },
                form: {
                    add_field_button: "Добавить поле",
                    button_style_subtitle: "Настройка кнопки",
                    date: {
                        diapason_any_button: "Любые",
                        diapason_future_button: "Будущие",
                        diapason_label: "Доступные для выбора даты",
                        diapason_past_button: "Прошлые",
                        end_work_time_label: "Конец рабочего дня",
                        end_work_time_tip:
                            "Укажите окончание рабочего дня. Не отображается в списке доступного времени для выбора.",
                        interval_work_time_item: "%count% мин",
                        interval_work_time_label: "Интервал времени для выбора",
                        start_work_time_label: "Начало рабочего дня",
                        start_work_time_tip:
                            "Укажите начало рабочего дня. Отображается в списке как первое доступное время для выбора.",
                        work_days_label: "Рабочие дни",
                        work_days_tip:
                            "Дни недели, доступные для выбора в календаре",
                    },
                    default_text: "Заявка",
                    field_add_title: "Добавление поля",
                    field_default_toggle: "Выбрано по умолчанию",
                    field_delete_button: "Удалить",
                    field_desc_label: "Описание поля",
                    field_desc_tip: "Будет отображаться под заголовком поля",
                    field_done_button: "Готово",
                    field_lines_label: "Высота поля (строк)",
                    field_mask_custom_toggle: "Указать свою маску",
                    field_mask_error_tip: "Введите хотя бы один спецсимвол",
                    field_mask_format_label: "Формат маски",
                    field_mask_format_note_button: "Подробнее",
                    field_mask_format_note_text:
                        "<span>#</span> — любая цифра<br/>\n<span>@</span> — любая буква<br/>\n <span>*</span> — любой символ",
                    field_mask_format_note_title: "Формат маски (спецсимволы):",
                    field_mask_format_tip:
                        'Формат маски зависит от <a href="/admin/settings/general/" target="_blank">выбранной страны</a> сайта',
                    field_mask_placeholder_toggle: "Отображать формат маски",
                    field_mask_toggle: "Использовать маску",
                    field_name_label: "Название поля",
                    field_name_tip: "Отображается в заявке как заголовок поля",
                    field_option_placeholder: "Название варианта",
                    field_options_label: "Варианты",
                    field_phone_format_note_text:
                        "<span>#</span> — вместо этого спецсимвола пользователь сможет ввести любую цифру",
                    field_required_toggle: "Обязательное поле",
                    field_settings_button: "Настроить",
                    field_style_label: "Стиль поля",
                    field_text_mask_format_tip:
                        "Используйте маску ввода для поля, имеющего строго определенный формат значений, например, серия и номер паспорта",
                    field_value_label: "Значение поля",
                    fields_additional_empty: "Без дополнительных полей",
                    fields_empty: "Список полей пуст",
                    fields_limit_info:
                        "В форме может быть от %min% до %max% полей",
                    fields_need_delivery_info:
                        "Добавьте поле «Доставка» для отображения способов доставки",
                    fields_setup_delivery_info:
                        "Способы доставки настраиваются в разделе Настройки — Магазин",
                    fields_subtitle: "Настройка полей",
                    form_name_label: "Название формы",
                    form_name_tip:
                        "Чтобы понимать из какой формы отправлена заявка",
                    form_tab: "Форма",
                    goals_tab: "Цели",
                    integration_link: "добавить интеграцию",
                    list_element1_placeholder: "Вариант 1",
                    list_element2_placeholder: "Вариант 2",
                    modal_title: "Форма",
                    pay_warn_integration: "Для приёма оплаты вам нужно",
                    pay_warn_price:
                        "При вызове формы из кнопки, информация о товаре и стоимости будет браться из кнопки (при включенной опции «Передавать информацию о товаре»)",
                    radio: {
                        set_as_default_tip: "Сделать вариантом по умолчанию",
                    },
                    range: {
                        double_label: "Диапазон",
                        end_label: "До",
                        legend_end_label: "Текст справа",
                        legend_end_placeholder: "До",
                        legend_label: "Значения",
                        legend_start_label: "Текст слева",
                        legend_start_placeholder: "От",
                        options: {
                            limits: "Крайние",
                            none: "Скрыть",
                            show: "Заполнить",
                            text: "Задать текстовые описания",
                        },
                        prefix_label: "Префикс",
                        prefix_placeholder: "$",
                        start_label: "От",
                        step_label: "Шаг",
                        suffix_label: "Суффикс",
                        suffix_placeholder: "м²",
                        units_label: "Отображать единицу измерения",
                    },
                    redirect_placeholder: "Адрес страницы",
                    send_action_label: "Действие после отправки",
                    type_checkbox_option: "Галочка",
                    type_contacts_option: "Контакты",
                    type_date_option: "Дата",
                    type_datetime_option: "Дата и время",
                    type_delivery_desc:
                        'Способы доставки настраиваются в разделе <a class="text-nowrap" target="_blank" href="%href%">Настройки — Доставка</a>',
                    type_delivery_option: "Доставка",
                    type_email_option: "Email",
                    type_file_option: "Файл",
                    type_hidden_desc:
                        "Используется для передачи скрытой информации в форме заявки (например, название услуги)",
                    type_hidden_option: "Скрытое поле",
                    type_image_option: "Картинка",
                    type_name_option: "Имя",
                    type_phone_option: "Телефон",
                    type_radio_option: "Выбор",
                    type_range_option: "Ползунок",
                    type_select_option: "Список",
                    type_text_option: "Текст",
                    type_textarea_option: "Многострочный",
                    variant_name_placeholder: "Название варианта",
                    variants_add_button: "Добавить вариант",
                    variants_remove_button: "Удалить",
                },
                geolanding: {
                    cities_label: "Города",
                    cities_tip:
                        "Добавьте города для которых хотите<br>создать отдельный вариант секции",
                    control_label: "Геосекция",
                    no_city_tip: "Такой город не найден",
                    title: "Геосекция",
                },
                globals: { delete_error_notity: "Ошибка, попробуйте еще раз" },
                goals: {
                    desc_metric: "Яндекс Метрика и Google Analytics",
                    desc_metric_link:
                        'Готовые интеграции с <a href="%href%" target="_blank">Аналитикой</a>',
                    goals_empty: "Цели не заданы",
                    html_code_item: "HTML-код",
                    html_code_tip:
                        "Вы можете указать любой JavaScript или HTML код, код будет вставлен на страницу по окончанию выбранного действия. Оборачивать код в тег <script> ... </script> не обязательно.",
                    html_desc: "Другие сервисы",
                    label: {
                        goal: "Название цели",
                        html: "Произвольный код цели",
                        main: "Основная цель",
                    },
                    main_help_tip:
                        "Зависит от выбранного действия и не может быть изменена. Фиксируется если вы используете готовые интеграции с аналитикой.",
                    modal_title: "Настройка цели",
                    user_goal_tip:
                        "Укажите собственный идентификатор цели. Фиксируется если вы используете готовые интеграции с аналитикой.",
                },
                hotkeys: {
                    arrows: "Стрелки",
                    common: {
                        editor: {
                            cancel_action: "Отменить действие",
                            hide_editor: "Скрытие редактора",
                            preservation: "Сохранить",
                            preview: "Режим предпросмотра",
                            repeat_action: "Повторить действие",
                            show_grid: "Показать сетку",
                            show_guides: "Показывать направляющие",
                            show_hidden_items: "Показать скрытые объекты",
                            show_layers: "Показать панель слоёв",
                            title: "Редактор",
                            window_for_adding_elements: "Добавить элемент",
                            zoom_decrease: "Уменьшить масштаб",
                            zoom_increase: "Увеличить масштаб",
                            zoom_reset: "Сбросить масштаб",
                        },
                        element: {
                            copy: "Копировать",
                            copy_element: "Копировать элемент",
                            copy_section: "Копировать секцию",
                            copy_style: "Копировать стиль",
                            cut_out: "Вырезать элемент",
                            duplicate_element: "Дублировать элемент",
                            paste: "Вставить",
                            paste_element: "Вставить элемент",
                            paste_style: "Вставить стиль",
                            remove: "Удалить элемент/окно",
                            remove_element: "Удалить",
                            title: "Элемент / секция / окно",
                        },
                        title: "Основные",
                    },
                    free: {
                        alignment: {
                            bottom: "По нижнему краю",
                            center_horizontal: "По центру горизонтально",
                            center_vertical: "По центру вертикально",
                            left: "По левому краю",
                            right: "По правому краю",
                            title: "Выравнивание",
                            top: "По верхнему краю",
                        },
                        dragndrop: {
                            inverts_snap_grid:
                                "Инвертировать прилипание к сетке",
                            title: "Перетаскивание",
                            translation_along_one_axis:
                                "Перенести по одной оси",
                        },
                        element: {
                            blocking: "Заблокировать",
                            edit_animation: "Редактировать анимацию",
                            edit_element: "Редактировать",
                            layer_above_below: "Слой выше/ниже",
                            layer_top_bottom: "Слой в самый верх/низ",
                            move: "Переместить",
                            move_10px: "Переместить на 10px",
                            resize: "Изменить размер",
                            resize_10px: "Изменить на 10px",
                            select_all_elements: "Выделить все элементы",
                            show_distance: "Показать расстояние",
                            title: "Элемент",
                        },
                        resize: {
                            keep_proportions: "Сохранять пропорции",
                            resize_center: "Изменить размер из центра",
                            title: "Изменение размера",
                        },
                        title: "Свободный элемент",
                        turn: { rotate: "Повернуть на 15°", title: "Поворот" },
                    },
                    title: "Горячие клавиши",
                },
                html: {
                    css_description:
                        'Используется библиотека <a href="%link%" target="_blank">LESS</a>. Используйте селектор <code>:scope { ... }</code> для ограничения видимости только данной секцией.',
                    enable_image_optimizations:
                        "Включить оптимизацию изображений",
                    file_delete_title: "Точно удалить файл из списка?",
                    file_desc:
                        "Картинки, JS, CSS и другие файлы, необходимые для секции.",
                    file_upload_desc: "Загружать можно любые файлы.",
                    file_upload_empty: "Нет файлов",
                    html_description:
                        'jQuery уже загружена. Код счетчиков, онлайн консультантов и т.д. вставляйте в раздел Настройки — <a href="%link%" target="_blank">Аналитика</a>.',
                    html_documentation_link: "Документация",
                    html_error:
                        "Ошибка: HTML-код некорректный, пожалуйста исправьте ошибки",
                    jquery_error:
                        "Библиотека jQuery уже загружена. Удалите скрипт.",
                    js_only_preview_label: "Не выполнять JavaScript",
                    js_tag_error: "Ошибка: JS не может содержать HTML-теги",
                    less_error: "Ошибка компиляции LESS",
                    run_code: "Выполнить",
                    save: "Сохранить",
                    scope_css_label: "Изолировать стили",
                    scope_css_tip:
                        "Стили применяются только к этому элементу. Отключите опцию, чтобы стили применялись ко всем элементам на странице. Для обращения к текущему элементу используйте селектор <code>:scope</code>",
                    tab_file: "Файлы",
                },
                ico: {
                    apache_license_text:
                        '<a href="%icon_link%" target="_blank">%icon_name%</a> от %icon_author% лицензированы <a href="%icon_license_link%" target="_blank">Apache 2.0</a>',
                    border_width_label: "Толщина границы",
                    budicon_set_tab: "Budicon",
                    category: {
                        accessibility: "Доступность",
                        account: "Аккаунт",
                        act: "Активности",
                        action: "Действие",
                        alert: "Оповещение",
                        all: "Все категории",
                        animals: "Животные",
                        arrows: "Стрелка",
                        av: "Аудио и видео",
                        body: "Люди и тело",
                        brands: "Бренды",
                        building: "Здания",
                        business: "Бизнес",
                        charts: "График",
                        communication: "Общение",
                        component: "Компоненты",
                        connectivity: "Соединение",
                        contact: "Контакт",
                        content: "Контент",
                        currency: "Валюта",
                        cursors: "Курсор",
                        database: "База данных",
                        design: "Дизайн",
                        development: "Разработка",
                        devices: "Устройства",
                        document: "Документ",
                        "e-commerce": "E-commerce",
                        editor: "Редактор",
                        education: "Образование",
                        electrical: "Электричество",
                        emoji: "Эмодзи",
                        extensions: "Расширения",
                        files: "Файл",
                        filled: "Залитые",
                        flags: "Флаги",
                        food: "Еда",
                        "food-beverage": "Еда и напитки",
                        furniture: "Мебель",
                        gaming: "Игры",
                        gender: "Гендер",
                        gestures: "Жесты",
                        hardware: "Техника",
                        health: "Здоровье",
                        home: "Дом",
                        laundry: "Химчистка",
                        letters: "Буквы",
                        logic: "Логика",
                        mail: "Почта",
                        maps: "Карта",
                        maths: "Математика",
                        medical: "Медицина",
                        mood: "Настроение",
                        multimedia: "Мультимедиа",
                        nature: "Природа",
                        navigation: "Навигация",
                        notifications: "Уведомление",
                        numbers: "Числа",
                        obj: "Объекты",
                        others: "Другие",
                        part: "Части тела",
                        photography: "Фотография",
                        places: "Места",
                        science: "Наука",
                        search: "Поиск",
                        security: "Безопасность",
                        shapes: "Фигуры",
                        shopping: "Шоппинг",
                        smile: "Эмоции и улыбки",
                        social: "Социальное",
                        sports: "Спорт",
                        sustainability: "Устойчивость",
                        symbols: "Символы",
                        system: "Система",
                        text: "Текст",
                        time: "Время",
                        toggle: "Переключение",
                        tools: "Инструменты",
                        transport: "Транспорт",
                        travel: "Путешествие",
                        "version control": "Контроль версий",
                        weather: "Погода",
                        wild: "Животные и природа",
                        zodiac: "Знаки зодиака",
                    },
                    check_set_tab: "Галочки",
                    checks_set_tab: "Галочки",
                    click_action_label: "Действие при клике",
                    click_action_label_inactive:
                        "Для корректной работы цели настройте действие при клике на вкладке «Стиль»",
                    color_label: "Цвет",
                    dividers_set_tab: "Разделители",
                    emoji_set_tab: "Emoji",
                    empty_response_text: "Ничего не найдено",
                    goals_tab: "Цели",
                    icon_author_info:
                        'Автор иконки <a href="%link%" target="_blank">%name%</a> в <a href="https://thenounproject.com/" target="_blank">The Noun Project</a>',
                    icon_author_info_tip:
                        "Автор иконки %name% в The Noun Project",
                    icons_tab: "Каталог иконок",
                    line_set_tab: "Контурные",
                    lists_menu_title: "Наборы иконок",
                    lucide_set_tab: "Lucide",
                    material_set_tab: "Google Material",
                    mingcute_set_tab: "MingСute",
                    modal_title: "Иконка",
                    no_ico_option: "Без иконки",
                    noun: {
                        desc: "The Noun Project содержит более 5 миллионов уникальных иконок, созданных мировым сообществом",
                        empty_response_desc: "Мы не нашли иконок по запросу",
                        search_placeholder: "Поиск иконок",
                        title: "Поиск иконок в The Noun Project",
                    },
                    noun_icons_tab: "Noun Project",
                    numbers_set_tab: "Цифры",
                    recent_icons_option_latest: "Последние",
                    recent_icons_option_page: "Используются на странице",
                    recent_icons_tab: "Недавние",
                    remix_set_tab: "Remix Icon",
                    scaling_label: "Размер иконки",
                    search_icons_tab: "Поиск иконок",
                    set_as_cover: "Растянуть изображение",
                    shape_label: "Форма",
                    size_label: "Размер",
                    solid_set_tab: "Залитые",
                    style_label: "Стиль",
                    styles_tab: "Стиль",
                    tabler_set_tab: "Tabler Icons",
                    thick_set_tab: "Тонкие",
                    times_set_tab: "Крестики",
                    upload_button: "Загрузить",
                    variant: {
                        filled: "Заполненные",
                        noto: "Google Emoji",
                        outlined: "Контурные",
                        round: "Закругленные края",
                        sharp: "Острые края",
                        twemoji: "Twitter Emoji",
                        "two-tone": "Двухцветные",
                    },
                },
                icon: {
                    choice_button: "Выбрать",
                    hover_color: "Цвет",
                    hover_label: "Эффект при наведении",
                    hover_opacity: "Прозрачность",
                    hover_zoom: "Увеличение",
                },
                image: {
                    alt_label: "Альтернативный текст",
                    alt_label_tip:
                        "Этот текст будет показан вместо изображения, если оно не будет загружено",
                    click_action_label: "Действие при клике",
                    controls: {
                        gallery_tip: "Галерея",
                        image_position_button: "Изменить положение",
                        photo_editor_tip: "Редактор изображения",
                        settings_tip: "Настройки",
                    },
                    desc_label: "Описание изображения",
                    effect_zoom_radio: "Эффект увеличения при наведении",
                    fill_space_radio: "Заполнить контейнер",
                    fill_space_tip:
                        "Изображение целиком заполнит контейнер, в котором находится",
                    name_label: "Название изображения",
                    no_gutter_radio: "Без отступов",
                    no_gutter_tip:
                        "Изображение будет игнорировать отступы контейнера, в котором находится",
                    on_mouseover_note: "Выводится при наведении на фотографию",
                    original_resolution_tip:
                        "Отключает встроенные во Flexbe оптимизации, будет показано исходное изображение. Загрузка неоптимизированных изображений может значительно увеличить время загрузки страницы.",
                    original_resolution_toggle: "Отключить сжатие",
                    overlay_color_label: "Цвет затемнения",
                    overlay_label: "Заголовок изображения",
                    overlay_opacity_label: "Затемнение",
                    photo_editor: { title: "Редактор изображения" },
                    position_text_label: "Положение текста",
                    position_text_tab: { center: "По центру", left: "Слева" },
                    round_image_radio: "Закруглить",
                    set_as_cover_radio: "Масштабировать",
                    set_as_cover_tip:
                        "Изображение будет масштабировано, чтобы полностью заполнить пространство элемента. Часть изображения может быть скрыта.",
                    show_context_label: "Показывать описание",
                    show_context_tab: {
                        always: "Всегда",
                        hover: "При наведении",
                        none: "Не показывать",
                    },
                    size_label: "Размер",
                    tab_title: "Изображение",
                },
                input_link: {
                    modal_select: "Выбрать окно",
                    project_select: "Выбрать сайт",
                    section_select: "Выбрать секцию",
                    site_select: "Выбрать страницу",
                },
                lang_menu: {
                    add: {
                        docs_text:
                            'Подробнее о формате ссылок читайте в <a href="%href%" target="_blank">Документации</a>',
                        flag: "Флаг",
                        follow: "Переход по ссылке",
                        follow_domain_tip:
                            "Браузер попытается найти страницу с таким же адресом на другом домене и перейти на неё. Если страница не будет найдена, то браузер перейдет по указанной ссылке",
                        follow_target_toggle: "Открывать в новом окне",
                        lang_title: "Название",
                        modal_title: "Добавление языка",
                        no_domain_tip: "Не указан домен",
                        smart_follow_toggle: "Умный переход",
                    },
                    docs_action: "Документация",
                    edit: { modal_title: "Редактирование языка" },
                    styles: {
                        dropdown_icon_toggle:
                            "Отображать иконку выпадающего меню",
                        dropdown_open: "Открытие выпадающего меню",
                        dropdown_open_click: "При клике",
                        dropdown_open_hover: "При наведении",
                        icon_size: "Размер иконки",
                        icon_type: "Форма иконки флага",
                        margin: "Отступ",
                        margin_dropdown: "Внутренний отступ",
                        position: "Ориентация",
                        position_horizontal: "По горизонтали",
                        position_vertical: "По вертикали",
                        style: "Стиль",
                        style_icon: "Иконка",
                        style_text: "Текст",
                        style_text_icon: "Иконка и текст",
                        text_styles: "Текст",
                        type: "Вид меню",
                        type_dropdown: "Выпадающее меню",
                        type_row: "В ряд",
                    },
                    tabs: { list: "Языки", styles: "Стиль" },
                },
                layers: {
                    blocks: "Секции",
                    button_hide: "Скрыть слои",
                    button_show: "Показать слои",
                    empty_blocks:
                        "На странице нет секций.<br>\nДобавьте первую секцию, чтобы появились слои.",
                    empty_modals:
                        "На странице нет окон.<br>\nДобавьте первое окно, чтобы появились слои.",
                    hide_layer: "Скрыть слой в редакторе",
                    loading: "Подождите совсем немного<br>Слои загружаются",
                    modals: "Окна",
                    show_layer: "Показать слой в редакторе",
                    title: "Слои",
                },
                layout: {
                    actions: { toggle_title: "Действие при клике" },
                    align_content_center_tip: "Расположить контент по центру",
                    align_content_end_tip: "Прижать контент к нижнему краю",
                    align_content_label: "Выравнивание по высоте",
                    align_content_start_tip: "Прижать контент к верхнему краю",
                    align_content_stretch_tip: "Растянуть контент по высоте",
                    apply_to_all_msg: "Настройки применены",
                    apply_to_all_tip: "Применить стиль ко всем карточкам",
                    background: {
                        border: { toggle: "Обводка" },
                        shading: { toggle: "Затемнение" },
                    },
                    card_title: "Карточка",
                    cards_adaptive_column_reverse: "Поменять колонки местами",
                    cards_adaptive_modal_title: "Настройка карточек",
                    cards_adaptive_text:
                        "Настройте отображение карточек<br>на мобильных устройствах",
                    cards_in_row_label: "Количество карточек в ряд",
                    cards_proportion_label: "Пропорция карточек",
                    cards_swap_button: "Изменить порядок",
                    cards_type_horizontal: "Горизонтальная",
                    cards_type_label: "Ориентация карточек",
                    cards_type_vertical: "Вертикальная",
                    clasp_columns: "Объединить колонки",
                    clasp_columns_tip:
                        "Применяется, если у колонок одновременно включены фон и закругление углов. Опция визуально объединяет колонки в единый блок, отключая закругление примыкающих сторон",
                    cols_count_label: {
                        one: "%count% колонка",
                        few: "%count% колонки",
                        many: "%count% колонок",
                        other: "",
                    },
                    columns_setting_label: "Настройка колонок",
                    contacts_radio: "Блок контактов",
                    container_cols_label: "Ширина контента",
                    container_cols_tip:
                        "На сайте используется 24-колоночная сетка, вы можете ограничить ширину контента меньшим количеством колонок.",
                    container_self_justify: "Положение контейнера",
                    container_width_grid: "По сетке",
                    container_width_label: "Растянуть контент",
                    container_width_screen: "По экрану",
                    content_width_label: "Ширина контента",
                    cover_mode: {
                        height_tip: "100% означает, что секция заполнит экран",
                        height_title: "Высота",
                        max_height_tip:
                            "Данный параметр ограничивает высоту секции на экране пользователя до указанного вами размера",
                        max_height_title: "Макс. высота",
                        min_height_tip:
                            "Данный параметр применяется, когда высота экрана пользователя меньше высоты контента в секции. Для наилучшего отображения на маленьких экранах указывайте такую минимальную высоту, чтобы контент помещался впритык",
                        min_height_title: "Мин. высота",
                    },
                    cover_mode_radio: "Полноэкранный режим",
                    effects: {
                        enable_effects_label: "Эффект при наведении",
                        enable_effects_tip:
                            "При наведении курсора на карточку будет проигрываться анимация. На мобильных устройствах анимация сработает при нажатии на карточку.",
                        placeholder: "Не выбран",
                    },
                    fixed_on_scroll_radio: "Фиксировать при прокрутке страницы",
                    horizontal_align_card_label: "Горизонтальное выравнивание",
                    horizontal_align_card_tip:
                        "Горизонтальное выравнивание последних карточек применяется, когда количество карточек в секции не кратно выбранному количеству карточек в ряд",
                    horizontal_align_contact_label: "Положение блока контактов",
                    hover_effects: {
                        border_label: "Обводка",
                        border_short_label: "Обводка",
                        button_bg_title: "Цвет заливки",
                        button_fill_label: "Заливка",
                        fadein_label: "Появление контента",
                        fill_label: "Фон карточки",
                        fill_short_label: "Фон",
                        glare_label: "Блик под курсором",
                        glare_short_label: "Блик",
                        opacity_label: "Прозрачность",
                        opacity_short_label: "Прозрачность",
                        scale_label: "Увеличение",
                        scale_short_label: "Увеличение",
                        shadow_label: "Тень",
                        shadow_short_label: "Тень",
                        shift_label: "Сдвиг",
                        shift_short_label: "Сдвиг",
                        show_content_short_label: "Появление",
                        text_label: "Цвет текста",
                        text_short_label: "Цвет текста",
                        underline_label: "Подчеркивание",
                    },
                    images_in_row_label: "Количество изображений в ряд",
                    justify_content_label: "Выравнивание по ширине",
                    modal: {
                        animation: {
                            fade_effect: "Появление",
                            show_title: "Эффект появления",
                            slide_effect: "Сдвиг",
                        },
                        close: {
                            position_inside: "Внутри",
                            position_label: "Показывать крестик",
                            position_near: "Рядом",
                            position_none: "Нет",
                            position_outside: "Снаружи",
                            size_label: "Размер крестика",
                        },
                        columns_count_label: "Количество колонок",
                        content_gap_inherit_tip:
                            "Автоматически (наследовать от ПК)",
                        content_gap_label: "Отступ до контента",
                        editor_stretch_restrictions_tip:
                            "В редакторе окно отображается с минимальной высотой",
                        modal_height_label: "Высота окна",
                        modal_minheight_label: "Минимальная высота окна",
                        modal_position_title: "Позиционирование окна",
                        modal_width_label: "Ширина окна",
                        overlay_close_label:
                            "Закрывать при клике на внешнюю область",
                        screen_gap_label: "Отступ от краёв экрана",
                        stretch_height_label: "Растянуть по высоте",
                        stretch_width_label: "Растянуть по ширине",
                    },
                    padding_cards_label: "Отступ между карточками",
                    padding_columns_label: "Отступ между колонками",
                    padding_images_label: "Отступ между изображениями",
                    products: {
                        adaptive:
                            "Настройте отображение на мобильных устройствах",
                        adaptive_modal: {
                            count: {
                                horizontal1: "1 товар",
                                horizontal2: "2 товара",
                                title: "Количество товаров в ряд",
                            },
                            enable_price_in_button: "Отображать цену в кнопке",
                            enable_slider: "Слайдер карточек",
                            horizontal_padding: "Настройка боковых отступов",
                            orientation: {
                                horizontal: "Горизонтальная",
                                title: "Ориентация карточки",
                                vertical: "Вертикальная",
                            },
                            padding: "Отступ между товарами",
                            set_button_100_width: "Растянуть кнопку по ширине",
                            swap_columns: "Поменять колонки местами",
                            title: "Отображение на мобильных",
                        },
                        background: { title: "Базовый фон" },
                        card: {
                            available: {
                                info: 'В настройках <a href="/admin/settings/ecommerce/common/" target="_blank">Магазина</a> отключена индикация наличия товара. Данный элемент будет скрыт.',
                            },
                            divider: {
                                color_title: "Цвет разделителя",
                                height_title: "Толщина разделителя",
                                set_padding_toggle: "Настроить отступы",
                                title: "Настройка разделителя",
                            },
                            justify_title: "Горизонтальное выравнивание",
                            media: {
                                action: "Действие при клике",
                                horizontal_proportion:
                                    "Минимальная высота изображения",
                                no_gutter: "Без отступов",
                                proportion: "Высота изображения",
                                scale: "Масштабировать",
                                title: "Настройка медиа",
                                type: {
                                    image: "Изображение",
                                    slider: "Слайдер",
                                },
                            },
                            options: {
                                article_above_title: "Отображать выше названия",
                                hide_old_price: "Скрыть старую цену",
                                old_price_color: "Цвет старой цены",
                                show_button_in_line_with_price:
                                    "Отображать в одну строку с ценой",
                                uppercase: "Прописные буквы",
                            },
                            options_settings: {
                                color: "Цвет активной опции",
                                label_color: "Цвет заголовка опций",
                                show_available: "Индикация наличия товара",
                                show_in_stock_statuses:
                                    "Отображать статус «В наличии»",
                                show_in_stock_statuses_tip:
                                    "Если товар в наличии, будет отображаться статус «В наличии». Статусы «Нет в наличии» и «Под заказ» будут отображаться вне зависимости от этой опции",
                                show_title: "Отображать названия опций",
                                size: "Размер",
                                style: "Стиль",
                                title: "Настройка опций",
                            },
                            padding: {
                                bottom_title: "Нижний отступ",
                                top_title: "Верхний отступ",
                            },
                            padding_title: "Внутренний отступ",
                        },
                        card_adaptive: {
                            border_disabled: "Отключить Обводку",
                            disabled_fill: "Отключить Фон",
                            mobile_disabled:
                                "Отключить Эффект при наведении на мобильных",
                            radius_disabled: "Отключить Закругление углов",
                            shadow_disabled: "Отключить Тень",
                        },
                        card_builder: {
                            add_button: "Добавить элемент",
                            editor: {
                                article: { title: "Настройка артикула" },
                                available: { title: "Настройка наличия" },
                                button: {
                                    default_text: "В корзину",
                                    replace_confirm: {
                                        confirm: "Заменить",
                                        text: "В карточку товара можно добавить только один элемент с кнопкой",
                                        title: "Заменить кнопку?",
                                        toggle: "Использовать текущий стиль кнопки",
                                    },
                                    title: "Настройка кнопки",
                                },
                                button_with_available: {
                                    title: "Настройки кнопки с наличием",
                                },
                                button_with_price: {
                                    title: "Настройки кнопки с ценой",
                                },
                                button_with_text: {
                                    available_title: "Наличие",
                                    button_title: "Кнопка",
                                    common_title: "Общие",
                                    price_title: "Цена",
                                    product_price_text: "Цена товара",
                                },
                                delete_disabled_tip: "Элемент нельзя удалить",
                                delete_media_disabled_tip:
                                    "Элемент нельзя удалить",
                                delete_options_disabled_tip:
                                    "Элемент нельзя удалить",
                                description: { title: "Настройка описания" },
                                hide_old_price: "Старая цена",
                                justify: "Горизонтальное выравнивание",
                                locked_list: { title: "Обложка карточки" },
                                media: { title: "Настройка медиа" },
                                name: { title: "Настройка названия" },
                                options: { title: "Настройка опций" },
                                price: { title: "Настройка цены" },
                                price_in_button: {
                                    title: "Настройки цены в кнопке",
                                },
                                show_article_value_only:
                                    "Отображать только значение",
                                use_colored_statuses:
                                    "Использовать цветные статусы",
                                use_colored_statuses_tip:
                                    "Будут использованы разные цвета для статусов <br>В наличии, Нет в наличии и Под заказ.",
                            },
                            elements: {
                                article: "Артикул",
                                available: "Наличие",
                                button: "Кнопка",
                                button_default_text: "В корзину",
                                button_with_available: "Кнопка с наличием",
                                button_with_price: "Кнопка рядом с ценой",
                                description: "Описание",
                                divider: "Разделитель",
                                icon_with_price: "Иконка и цена",
                                media: "Изображения",
                                name: "Название",
                                options: "Опции",
                                price: "Цена товара",
                                price_in_button: "Цена в кнопке",
                            },
                            fields_empty: "Список элементов пуст",
                            option_info:
                                "Для товаров с опциями будет отображаться окно выбора опций",
                            reverse: "Поменять порядок элементов",
                            select: { title: "Выберите элемент" },
                            title: "Элементы карточки",
                        },
                        card_color: "Цвет текста",
                        card_tab_title: "Карточка",
                        categories: {
                            hide_single: {
                                tip: "Cкрывает заголовок категории, если в секции только одна категория",
                                title: "Не отображать вкладку для единственной категории",
                            },
                            list: {
                                color: "Цвет текста",
                                divider: "Разделитель",
                                divider_color: "Цвет линии",
                                font_size: "Размер шрифта",
                                height: "Толщина линии",
                                justify: "Горизонтальное выравнивание",
                                line_height: "Межстрочный интервал",
                                lowercase: "Строчные буквы",
                                title: "Заголовок",
                                weight: "Толщина шрифта",
                                width: "Длина линии",
                            },
                            style: {
                                list: "Списком",
                                tabs: "Вкладки",
                                title: "Стиль категорий",
                            },
                            title: "Настройка категории",
                        },
                        categories_bool: "Категории",
                        count: {
                            horizontal1: "1 товар",
                            horizontal2: "2 товара",
                            horizontal3: "3 товара",
                            title: "Количество товаров в ряд",
                            vertical1: "1 товар",
                            vertical2: "2 товара",
                            vertical3: "3 товара",
                            vertical4: "4 товара",
                            vertical5: "5 товаров",
                        },
                        navigation: {
                            more_button: "Кнопкой «Ещё»",
                            pagination: "Постраничная",
                            slider: "Слайдер",
                            style_title: {
                                button: "Стиль кнопки",
                                style: "Стиль",
                            },
                            title: "Навигация",
                        },
                        orientation: {
                            horizontal: "Горизонтальная",
                            title: "Ориентация карточки",
                            vertical: "Вертикальная",
                        },
                        products_max_count: "Количество товаров на странице",
                        proportions: "Пропорции карточек",
                        proportions_tip: "Процент от ширины",
                        section_tab_title: "Секция",
                    },
                    section_footer_toggle: "Подвал секции",
                    section_title: "Секция",
                    set_min_height_label: "Задать минимальную высоту",
                    settings_button: "Настроить",
                    settings_label: "Настройки",
                    slider_mode_radio: "Режим слайдера",
                    stretch_mode_radio: "Растянуть на всю ширину экрана",
                    swap_grid: "Поменять порядок колонок на мобильных",
                    swap_grid_tip:
                        "На мобильных устройствах колонки будут отображаться в обратном порядке",
                    tabs_layout_warning_link: "Настроить активную вкладку",
                    tabs_layout_warning_text:
                        "Структура данных настраивается на каждой вкладке индивидуально",
                    tabs_section_radio: "Вкладки",
                    tabs_style_button: "Стиль вкладок",
                    title: "Структура",
                    title_header_radio: "Шапка секции",
                    title_section_radio: "Заголовок секции",
                    toggle_adaptive_view: {
                        all: "Все устройства",
                        desktop: "Только ПК",
                        mobile: "Только мобильные",
                    },
                    vertical_align_card_label: "Вертикальное выравнивание",
                    vertical_align_card_tip:
                        "Выравнивание карточек разной высоты",
                    vertical_align_column_label: "Вертикальное выравнивание",
                    vertical_align_column_tip:
                        "Выравнивание колонок разной высоты",
                    vertical_align_contact_label: "Вертикальное выравнивание",
                    wide_padding_columns_label: "Отступ по бокам",
                    zone_settings_title: "Контент-зона",
                },
                load_editor_error:
                    "При загрузке редактора произошла ошибка. Проверьте интернет-соединение и перезагрузите страницу.",
                load_editor_toast: "Загружаем редактор...",
                logo: {
                    any_link: "Ссылка",
                    builder_button: "Конструктор лого",
                    color_label: "Цвет",
                    image_tab: "Изображение",
                    link_blank_radio: "Открывать в новом окне",
                    link_label: "Ссылка",
                    make_link_toggle: "Сделать ссылкой",
                    maker: {
                        apply_button: "Применить",
                        download_button: "Скачать",
                        error_save: "Ошибка при сохранении логотипа",
                        error_try_again:
                            "Не удалось сохранить логотип. Попробуйте еще раз",
                        failed_search_text:
                            "Мы не нашли иконок по вашему запросу",
                        ico_search_label: "Поиск иконки",
                        ico_search_placeholder: "кофе",
                        icon_author_info:
                            'Автор иконки <a href="%link%" target="_blank">%name%</a> в <a href="https://thenounproject.com/" target="_blank">The Noun Project</a>',
                        layout_to_bottom_tip: "Лого снизу",
                        layout_to_left_tip: "Лого слева",
                        layout_to_right_tip: "Лого справа",
                        layout_to_top_tip: "Лого сверху",
                        modal_tool_title: "Конструктор логотипов",
                        name_label: "Название",
                        no_ico_option: "Без иконки",
                        slogan_label: "Слоган",
                        text_bold_tip: "Жирный",
                        text_italic_tip: "Курсив",
                    },
                    modal_title: "Логотип",
                    size_label: "Размер логотипа",
                    text_font_label: "Шрифт",
                    text_label: "Текст",
                    text_placeholder: "Название компании",
                    text_tab: "Текст",
                    to_main: "Главная страница",
                },
                map: {
                    add_address_button: "Добавить адрес",
                    address_changed_info:
                        "<strong>Адрес изменен:</strong> %address%",
                    address_placeholder:
                        "г. Калининград, ул. Театральная, д. 30",
                    api_key: "<strong>API ключ:</strong> %key%",
                    default_address: "г.Москва, ул.Тверская, д.6",
                    default_name_label: "Адрес",
                    google_api_info:
                        'Укажите API-ключ для использования сервиса Google Карты (<a href="%link%" target="_blank">инструкция</a>)',
                    google_api_info_no_link:
                        "Укажите API-ключ для использования сервиса Google Карты",
                    google_tab: "Google Карты",
                    invalid_api_key_error: "Неправильный API-ключ",
                    map_type_hybrid: "Гибрид",
                    map_type_label: "Тип карты",
                    map_type_roadmap: "Карта",
                    map_type_satellite: "Спутник",
                    show_on_map_tip: "Показать на карте",
                    title: "Карта",
                    yandex: {
                        invalid_api_key_error:
                            "Неправильный API-ключ (если вы создали ключ только что, попробуйте добавить его позже)",
                    },
                    yandex_api_info:
                        'Укажите API-ключ для использования сервиса Яндекс Карты (<a href="%link%" target="_blank">инструкция</a>)',
                    yandex_api_info_no_link:
                        "Укажите API-ключ для использования сервиса Яндекс Карты",
                    yandex_tab: "Яндекс Карты",
                },
                media: {
                    drop_files: "Отпустите, чтобы начать загрузку",
                    media_title: "Медиа",
                },
                menu: {
                    active_link_color_label: "Цвет активной ссылки",
                    add: {
                        options: {
                            dropdown_menu: "Выпадающее меню",
                            link: "Ссылка",
                        },
                        title: "Выберите тип",
                    },
                    add_submenu_button: "Добавить подпункт",
                    breadcrumbs_schema_description:
                        "Микроразметка – специальный код, который помогает поисковым системам понимать содержимое сайта и отображать его в результатах поиска",
                    breadcrumbs_schema_toggle: "Включить микроразметку",
                    confirm: {
                        text: {
                            one: "Удалить %count% вложенный пункт",
                            few: "Удалить %count% вложенных пункта",
                            many: "Удалить %count% вложенных пунктов",
                            other: "Удалить %count% вложенных пункта",
                        },
                        title: "Удалить выпадающее меню «%title%»?",
                    },
                    empty_dropdown_placeholder:
                        "Добавьте новый или переместите существующий",
                    item: {
                        link_blank_radio: "Открывать в новом окне",
                        link_or_act_label: "Ссылка или действие",
                        name_label: "Название",
                        title: "Настройки",
                    },
                    item_add: { title: "Добавление пункта меню" },
                    item_dropdown: { title: "Добавление выпадающего меню" },
                    list_label: "Пункты меню",
                    name_placeholder: "Название",
                    style: {
                        active_item_enabled_label:
                            "Задать цвет для активного пункта",
                        color_label: "Цвет текста при наведении",
                        color_underline_hover_label: "Цвет линии",
                        direction_column: "Вертикально",
                        direction_label: "Ориентация меню",
                        direction_row: "Горизонтально",
                        divider_color: "Цвет разделителей",
                        divider_size: "Размер разделителей",
                        divider_stroke: "Толщина",
                        divider_toggle: "Разделители",
                        dropdown_group_title: "Выпадающее меню",
                        hover: {
                            color: "Цвет",
                            opacity: "Осветление",
                            progress: "Анимация",
                            underline: "Подчеркнуть",
                        },
                        hover_group_title: "Состояние при наведении курсора",
                        hover_label: "Эффект при наведении",
                        menu_items_gap: "Отступ между пунктами",
                        open_dropdown: {
                            click: "При клике",
                            hover: "При наведении",
                        },
                        open_dropdown_label: "Открытие выпадающего меню",
                        reverse_opacity_label: "Непрозрачность пунктов меню",
                        size_label: "Размер",
                        size_underline_label: "Толщина линии",
                        title: "Стиль",
                        type_fold_menu_radio:
                            "Сворачивать непомещающиеся пункты в выпадающее меню",
                        weight_label: "Толщина шрифта",
                    },
                    style_button: "Стиль",
                    title: "Пункты",
                },
                modal: {
                    leave_editor: {
                        button: {
                            close: "Закрыть окно и остаться в редакторе",
                            not_save: "Не сохранять",
                        },
                        text: "Последние изменения будут потеряны",
                        title: "Закрыть без сохранения?",
                        title_new:
                            "Сохранить изменения перед тем, как покинуть страницу?",
                    },
                    leave_preview: {
                        button: {
                            close: "Остаться в редакторе",
                            confirm: "Открыть в новом окне",
                        },
                        text: 'Ссылка, на которую вы нажали, ведет на страницу "<a href="%href%" target="_blank">%formattedHref%</a>". Перейти по ссылке?',
                        title: "Уйти со страницы?",
                    },
                },
                modal_settings: {
                    layout: { button: "Настройки окна", title: "Окно" },
                    style: { button: "Настройки фона" },
                },
                modals: {
                    add: {
                        add_button: "Добавить окно",
                        catalog_title: "Каталог окон",
                        copy_anchor_button: "Копировать якорь",
                        copy_button: "Дублировать",
                        create_button: "Создать",
                        delete_button: "Удалить",
                        delete_modal: {
                            text: "Данное окно используется на странице. Действие невозможно отменить.",
                            title: "Удалить окно?",
                        },
                        edit_button: "Редактировать",
                        edit_nested_button: "Редактировать глобальную секцию",
                        modal_title: "Всплывающие окна",
                        not_in_use_text: "Не используется",
                        not_in_use_warning_text:
                            "Неиспользуемые окна замедляют работу страницы",
                        not_in_use_warning_tip:
                            "Неиспользуемые окна увеличивают размер сайта. Рекомендуем удалить их для ускорения работы сайта.",
                        select_button: "Выбрать",
                        selected_button: "Выбрано",
                    },
                    buffer_is_empty: "Нет скопированных окон",
                    categories: {
                        done: "Окно «Спасибо»",
                        empty: "Пустые окна",
                        form: "Заявки",
                        free: "Свободные окна",
                        from_nested: "Глобальные секции",
                        other: "Прочее",
                        product: "Товары",
                    },
                    empty: {
                        global_modals: {
                            text: "В этом разделе отобразятся окна всех глобальных\nсекций, добавленных на страницу сайта",
                            title: "Нет окон глобальных секций",
                        },
                        my_modals: {
                            title: "Вы еще не добавили\nокна на страницу",
                        },
                    },
                    list: {
                        button_done_title: "Окно благодарности c кнопкой",
                        cover_done_title: "Окно благодарности",
                        cover_form_title: "Стандартная форма",
                        done_title: "Окно благодарности",
                        form_title: "Стандартная форма",
                        free_empty: "Свободное окно",
                        free_form_title: "Окно заявки",
                        free_fullscreen_menu_title: "Полноэкранное меню",
                        free_sidebar_title: "Боковое меню",
                        html_title: "HTML-код",
                        img_form_title: "Форма с изображением",
                        map_title: "Карта",
                        one_column_empty: "Окно в одну колонку",
                        product_desc_title: "Подробное описание товара",
                        product_one_column_title:
                            "Описание товара в одну колонку",
                        product_two_column_title:
                            "Описание товара в две колонки",
                        quiz_clear_title: "Квиз с нуля",
                        quiz_with_branching_title: "Квиз с ветвлением",
                        quiz_without_branching_title: "Квиз без ветвления",
                        text_title: "Tекстовое описание",
                        two_column_empty: "Окно в две колонки",
                    },
                    modal_copied_notify: "Окно скопировано",
                    modal_paste_error: "Не удалось вставить окно",
                    modal_paste_tip: "Вставить окно из буфера",
                    modal_pasted_notify: "Окно вставлено",
                    modal_removed_notify: "Окно удалено",
                    modal_restored_notify: "Окно восстановлено",
                    tabs: {
                        global_modals: "Окна глобальных секций",
                        my_modals: "Мои окна",
                    },
                },
                multilanding: {
                    add_city_tip: "Добавить город",
                    add_var_tip: "Добавить значение",
                    control_label: "Мультисекция",
                    default: "По умолчанию",
                    title: "Мультисекция",
                    url_param_help_tip:
                        "Название параметра в URL страницы,<br>например %url%?%utm%=<strong>%var%</strong>",
                    url_param_label: "Параметр URL",
                    value_label: "Значение",
                    value_tip:
                        "Значение параметра в URL страницы,<br>например %url%?%utm%=<strong>%var%</strong>",
                },
                multitext: {
                    control_label: "Мультитекст",
                    copy_message_label: "Вставьте в свой текст",
                    default_help_info:
                        "Отображается если параметр ?%var% не указан",
                    default_text_label: "Текст по умолчанию",
                    title: "Мультитекст",
                    url_param_label: "Параметр URL",
                    url_param_tip:
                        "Название параметра в URL страницы,<br>например %url%?<strong>%utm%</strong>=iPhone 7 Black",
                },
                notification: {
                    updates: {
                        more_button: "Все обновления",
                        title: "Последнее обновление",
                    },
                },
                onboarding: {
                    button: { edit: "Редактировать", skip: "Пропустить" },
                    final_step: { title: "Начните с заголовка" },
                    step_1: {
                        text: "Сначала вы собираете сайт из готовых секций. Каждая секция решает свои задачи. Это могут быть карточки товаров, контакты, галерея, отзывы и другие.",
                        title: "Сайт состоит из секций",
                    },
                    step_2: {
                        text: "Внутри секции находятся элементы, например, заголовок, изображение, кнопка, форма заявки и другие. С их помощью вы можете менять секции под свои задачи",
                        title: "Секция состоит из элементов",
                    },
                    step_3: {
                        text: "Мы добавили несколько секций, чтобы помочь вам на старте. Попробуйте изменить элементы, экспериментируйте!",
                        title: "Попробуйте сами — это просто!",
                    },
                    title: "Как работает Flexbe",
                },
                override_mobile_settings: {
                    changed_tip: "Настройка переопределена для мобильных",
                    inherited_tip: "Используется значение с ПК",
                    reset_tip: "Сбросить настройку для мобильных",
                },
                page_saved_notify: "Страница сохранена",
                paginaton: {
                    active_style: {
                        bordered: "Обводка",
                        filled: "Заливка",
                        none: "Без выделения",
                        title: "Стиль выделения активной страницы",
                    },
                    color: "Основной цвет",
                    show_arrows: "Показать кнопки Назад/Дальше",
                    style: {
                        fraction: "Стиль 3",
                        from_max: "Стиль 2",
                        of: "из",
                        sequence: "Стиль 1",
                        title: "Стиль",
                    },
                    title: "Настройка навигации",
                },
                presets: {
                    default: {
                        huge: "Огромный",
                        large: "Большой",
                        medium: "Средний",
                        small: "Маленький",
                    },
                    label: "Пресеты",
                    presets_button: "Выбрать пресет",
                    presets_text: "Каталог пресетов",
                },
                preview: {
                    back_editor_button: "Вернуться в редактор",
                    hide_editor_label: "Скрыть редактор",
                    hide_editor_tip:
                        "Скрыть интерфейс редактора и отобразить страницу, как ее увидят посетители. Пользовательский код не выполняется в этом режиме",
                    saved_to_website_label: "Откроется в отдельной вкладке",
                    to_editor_label: "Вернуться в редактор",
                    unsaved_to_website_label:
                        "Откроется последняя сохраненная версия страницы в отдельной вкладке",
                },
                products: {
                    settings: {
                        all_category: "Все категории",
                        all_products: "Все товары",
                        categories: {
                            add: {
                                button: "Раздел «Товары»",
                                tip: "Для управления товарами и категориями перейдите в раздел",
                            },
                            add_button: "Добавить категорию",
                            empty: "Категории не выбраны",
                            list: { title: "Категории" },
                            remove_tip: "Убрать из секции",
                        },
                        products: {
                            add: {
                                button: "Раздел «Товары»",
                                tip: "Для управления товарами и категориями перейдите в раздел «Товары»",
                            },
                            add_button: "Добавить товар",
                            empty: "Товары не выбраны",
                            list: { title: "Товары" },
                            remove_tip: "Удалить товар",
                        },
                        select_categories: {
                            apply: "Готово",
                            cancel: "Отмена",
                            clear: "Сбросить",
                            empty: "Категорий нет",
                            not_found: "Категории не найдены",
                            placeholder: "Поиск категорий",
                            select_all: "Выделить все",
                            title: "Выбор категорий",
                        },
                        select_category: "Выбранные категории",
                        select_product: "Выбранные товары",
                        select_products: {
                            apply: "Готово",
                            cancel: "Отмена",
                            clear: "Сбросить",
                            empty: "Товаров нет",
                            not_found: "Товары не найдены",
                            placeholder: "Поиск товаров",
                            select_all: "Выделить все",
                        },
                    },
                    title: "Каталог товаров",
                },
                quiz: {
                    button_style: {
                        color_text: {
                            auto: "Авто",
                            dark: "Темный",
                            light: "Светлый",
                        },
                        effects: {
                            fill: "Заливка",
                            opacity: "Прозрачность",
                            zoom: "Увеличение",
                        },
                    },
                    conditions: {
                        add_condition_button: "Добавить условие",
                        condition_create_modal_title: "Добавление условия",
                        condition_edit_modal_title: "Настройка условия",
                        condition_error: "Условие не настроено",
                        create_condition_button: "Создать условие",
                        empty_variant_label: "Без ответа",
                        empty_variant_tip:
                            "Условие выполнится, если ответ не выбран",
                        field_label: "Поле",
                        field_placeholder: "Выберите поле",
                        file_empty_label: "Файл не загружен",
                        file_empty_radio: "Файл не загружен",
                        file_filled_label: "Файл загружен",
                        file_filled_radio: "Файл загружен",
                        fill_contain_label: "Содержит: %items%",
                        fill_contain_placeholder:
                            "Введите слово и нажмите ENTER",
                        fill_contain_radio: "Поле содержит слова",
                        fill_empty_label: "Поле не заполнено",
                        fill_empty_radio: "Поле не заполнено",
                        fill_filled_label: "Поле заполнено",
                        fill_filled_radio: "Поле заполнено",
                        fill_label: "Условие",
                        fill_notcontain_label: "Не содержит: %items%",
                        fill_notcontain_radio: "Поле не содержит слова",
                        list_empty: "Нет условий",
                        list_label: "Список условий",
                        list_union_and_radio: "Выполнены все условия",
                        list_union_label: "Показывать результат, если:",
                        list_union_or_radio: "Выполнено одно из условий",
                        operator_equal_label: "Значение",
                        operator_equal_radio: "Значение",
                        operator_from_label: "От",
                        operator_from_placeholder: "Не указано",
                        operator_label: "Условие",
                        operator_range_radio: "Диапазон",
                        operator_to_label: "До",
                        operator_to_placeholder: "Не указано",
                        question_empty: "Вопрос не указан",
                        question_label: "Вопрос",
                        question_placeholder: "Выберите вопрос",
                        remove_tip: "Удалить",
                        settings_tip: "Настроить условие",
                        union_extra_label: "Дополнительные варианты",
                        union_extra_tip:
                            "Условие выполнится при выборе дополнительных вариантов, кроме заданных",
                        variants_label: "Варианты ответа",
                        vars_union_and_radio: "Выбраны все варианты",
                        vars_union_label: "Выполнится, если:",
                        vars_union_or_radio: "Выбран один вариант",
                    },
                    control_start_button: "Обложка",
                    default_name: "Заявка",
                    edit: {
                        field: {
                            goals_label: "Отправлять цели в системы аналитики",
                            goals_tip:
                                "Цель передается после перехода на следующий вопрос. Ответ содержится в дополнительных параметрах кода цели. При выборе нескольких вариантов ответа цель будет передана несколько раз.",
                            html_goal_tip:
                                'Для получения ответа на вопрос используйте <span class="text-nowrap">"{{goalValue}}"</span> в HTML-коде',
                            image1_placeholder: "Ожидание чуда",
                            image2_placeholder: "Здоровый завтрак",
                            image3_placeholder: "Street-фото",
                            image4_placeholder: "Семейная фотография",
                            image_format_label: "Формат изображения",
                            image_text_label: "Подписи к изображениям",
                            multifields_label:
                                "Несколько полей в одном вопросе",
                            multiselect_checkbox: "Несколько",
                            multiselect_label: "Вариант ответа",
                            multiselect_radio: "Один",
                            name_label: "Название поля",
                            name_tip:
                                "Будет отображаться как заголовок поля в приходящих заявках",
                            required_label: "Обязательный ответ",
                            settings_button: "Настроить",
                            value_label: "Значение поля",
                            variants_label: "Варианты",
                        },
                        field_replace_button: "Изменить тип вопроса",
                        fields: {
                            add_button: "Добавить поле",
                            label: "Список полей",
                            remove_button: "Удалить",
                        },
                        modal_title: "Редактировать вопрос",
                        multi_field_settings_title: "Настройка полей",
                        other_settings_title: "Доп. настройки",
                        single_field_settings_title: "Настройка поля",
                        step_title_label: "Вопрос",
                        style_settings_title: "Настройка стиля",
                        variant: {
                            checked_tip: "Выбрать по умолчанию",
                            name_placeholder: "Название варианта",
                        },
                        variants: {
                            add_button: "Добавить вариант",
                            remove_button: "Удалить",
                        },
                    },
                    field_form_title: "Название поля",
                    header: {
                        question_select_help:
                            "Выберите вопрос, с которым необходимо создать связь",
                        tabs: {
                            editor_title: "Редактор",
                            preview_title: "Предпросмотр",
                            style_title: "Стиль",
                        },
                    },
                    questions: {
                        actions: {
                            attach_link: "Прикрепить вопрос",
                            break_link: "Открепить вопрос",
                            create_question: "Создать вопрос",
                            duplicate_question: "Дублировать вопрос",
                            edit_question: "Редактировать вопрос",
                            finish_branch: "Завершить ветвление",
                            preview_question: "Предпросмотр вопроса",
                            remove_question: "Удалить вопрос",
                            return_link: "Прикрепить обратно",
                            select_question: "Переход на другой вопрос",
                            select_unlinked: "Открепленные вопросы",
                        },
                        add_field_modal_title: "Выберите тип вопроса",
                        add_question_modal_title: "Выберите тип вопроса",
                        add_question_tip: "Добавить вопрос",
                        add_relation_tip: "Создать связь",
                        default_question_title: "Новый вопрос",
                        edit: { modal_title: "Редактировать поле" },
                        edit_relation_tip: "Редактировать связь",
                        empty_title_label: "Вопрос не указан",
                        move_confirm_desc:
                            "На этот вопрос ссылаются другие вопросы. При перемещении ссылки будут разорваны.",
                        move_confirm_title: "Переместить вопрос?",
                        not_selected_variant_label: "Без ответа",
                        quiz_result_label: "Результаты",
                        quiz_start_label: "Начало квиза",
                        unlinked_question_tip:
                            "Вопрос откреплен и не будет показан посетителям",
                    },
                    results: {
                        action_settings_label: "Результат",
                        actions_label: "Выберите действие",
                        add_result_button: "Добавить результат",
                        conditions_settings_label: "Условия",
                        default_result: "По умолчанию",
                        default_result_name: "Новый результат",
                        duplicate_tip: "Дублировать",
                        form_name_label: "Название формы",
                        form_name_tip:
                            "Отражается в разделе  «Заявки» как название формы, из которой отправлена заявка",
                        goals_list_label: "Список целей",
                        goals_settings_label: "Цели",
                        modal_title: "Результаты",
                        remove_tip: "Удалить",
                        result_name_label: "Название результата",
                        results_list_tip:
                            "Результаты квиза проверяются в порядке, в котором они добавлены, до первого совпавшего результата. Вы можете изменить порядок результатов в списке, потянув за иконку.",
                        results_list_title: "Список результатов",
                        use_result_name: "Использовать как название формы",
                    },
                    stat: {
                        bounce_button: "Отказы",
                        bounce_label: "Отказы",
                        bounce_tip:
                            "Процент посетителей, которые ушли с квиза на этом вопросе",
                        clear_stat_button: "Сбросить",
                        clear_stat_confirm_text:
                            "Отменить действие будет невозможно",
                        clear_stat_confirm_title: "Очистить статистику?",
                        conversion_button: "Конверсия",
                        conversion_label: "Конверсия",
                        conversion_tip:
                            "Процент посетителей, ответивших на этот вопрос",
                        details_title: "Статистика",
                        empty_stat_desc:
                            "Статистика будет доступна после того, как появятся данные",
                        empty_stat_title: "Нет данных",
                        loading_label: "Загрузка ...",
                        toggle_stat_button: "Статистика",
                        variants_stat_label: "Статистика ответов",
                        variants_stat_tip:
                            "Показывает распределение ответов по вариантам",
                        views_label: "Просмотры",
                    },
                    step_add_title: "Выберите тип вопроса",
                    style: {
                        align_label: "Вертикальное выравнивание",
                        autonext_label:
                            "Автоматический переход на следующий вопрос",
                        autonext_tip:
                            "Посетитель перейдет на следующий вопрос автоматически после выбора варианта. Применяется для вопросов с типами  «Выбор» и «Картинка» с одним вариантом ответа.",
                        button_color_text_label: "Цвет текста",
                        button_effect_label: "Эффект при наведении",
                        button_line_sizes_label: "Толщина линии",
                        button_setting_label: "Кнопки",
                        button_style_label: "Стиль кнопок",
                        button_weight_label: "Толщина шрифта",
                        color_label: "Цвет элементов",
                        common_setting_label: "Общие настройки",
                        field_style_label: "Поля",
                        justify_label: "Горизонтальное выравнивание",
                        modal_title: "Стиль",
                        progress_step: "ШАГ 1/4",
                        progress_style_label: "Индикатор прогресса",
                    },
                    upload_error: "Ошибка при загрузке. Код ошибки",
                },
                rotator: {
                    add_button: "Добавить",
                    add_icon_button: "Добавить иконку",
                    click_action_label: "Действие при клике",
                    hover: {
                        color: "Цвет",
                        opacity: "Прозрачность",
                        scale: "Увеличение",
                    },
                    hover_label: "Эффект при наведении",
                    item_settings: { title: "Настройки пункта" },
                    items_tab: "Пункты",
                    list: {
                        accordion: "Гармошка",
                        counter: "Увеличение",
                        domino: "Домино",
                        ladder: "Выпадание",
                        manifestation: "Проявление",
                        marquee: "Бегущая строка",
                        typing: "Набор",
                    },
                    list_placeholder: "Текст",
                    list_title: "Варианты",
                    settings_button: "Настроить",
                    style_tab: "Стиль",
                    title: "Анимированный текст",
                },
                rotator_settings: {
                    align_title: "Выравнивание",
                    animation_title: "Вид анимации",
                    color_title: "Цвет текста",
                    delay_tip:
                        "Это время, в течение которого показанный текст остается на экране",
                    delay_title: "Длительность задержки",
                    direction: "Направление",
                    divider: "Разделитель",
                    fade_mask_label: "Прозрачность по краям",
                    gap: {
                        percent_tip:
                            "Проценты рассчитываются от размера шрифта",
                    },
                    gap_label: "Отступы между элементами",
                    inner_gap_label: "Расстояние до иконки",
                    italic_tip: "Курсив",
                    line_height_title: "Межстрочный интервал",
                    loop: "Проигрывать по кругу",
                    pause: {
                        disabled_tip:
                            "Пауза недоступна при синхронизации со скроллом",
                    },
                    pause_label: "Пауза при наведении",
                    size_title: "Размер шрифта",
                    speed_letter_tip: "Скорость появления каждой буквы",
                    speed_tip: "Скорость появления каждой буквы",
                    speed_title: "Скорость анимации",
                    style_title: "Стиль текста",
                    sync_with_scroll_label: "Синхронизировать со скроллом",
                    tag_title: "Тег элемента",
                    text: "Текст",
                    title: "Настройка анимированного текста",
                    underline_tip: "Подчёркнутый",
                    weight_title: "Толщина шрифта",
                },
                section: { added_notity: "Секция добавлена" },
                section_settings: {
                    align_content_label: "Выравнивание по высоте",
                    anchor_toggle: "Якорь",
                    fixed: { floating_select: "Фиксировать" },
                    fixed_cover: {
                        desc: "В редакторе секции отображаются с минимальной высотой. Чтобы увидеть полноэкранный вариант секции, сохранитесь и перейдите в режим Предпросмотра",
                    },
                    header: {
                        adaptive_mode_title: "Способ адаптации шапки",
                        adaptive_modes: {
                            auto_tip:
                                "Копии элементов будут добавлены в автоматически созданное мобильное меню, без возможности их настройки.",
                            auto_title: "Автоадаптация",
                            column_tip:
                                "Элементы будут расположены друг под другом. Нельзя изменять порядок элементов и их размеры.",
                            column_title: "В колонку",
                            dedicated_tip:
                                "Будет создан отдельный настраиваемый набор элементов, видимый только на мобильных. Элементы, настроенные для ПК, останутся видимыми только на ПК.",
                            dedicated_title: "Гибкий режим",
                        },
                        fill_space_tip:
                            "Добавьте «Спейсер» между элементами, чтобы растянуть шапку на всю ширину экрана. Не применяется в редакторе",
                        float_color_label: "Цвет шапки",
                        floating_both_value: "Оба ряда",
                        floating_bottom_value: "Второй ряд",
                        floating_select: "Настройка фиксации",
                        floating_toggle: "Фиксировать при прокрутке страницы",
                        floating_top_value: "Первый ряд",
                        mobile_menu_autogenerated_warning:
                            "Мобильное меню создаётся автоматически из элементов шапки на десктопе",
                        second_row_toggle: "Включить второй ряд в шапке",
                        separator_enable: "Включить разделитель",
                    },
                    justify_content_label: "Выравнивание по ширине",
                    overlayed_desc:
                        "Секция располагается поверх секции под ней. Не применяется в редакторе",
                    overlayed_title: "Наложение на нижнюю секцию",
                    padding: {
                        bottom_label: "Снизу",
                        custom_tip: "Настроить",
                        horizontal_label: "По горизонтали",
                        left_label: "Слева",
                        middle_label: "Между колонок",
                        right_label: "Справа",
                        title: "Отступ",
                        top_label: "Сверху",
                        vertical_label: "По вертикали",
                    },
                    pointer_title: "Сквозной курсор",
                    products: { title: "Товары" },
                },
                settings_fixed: {
                    background_toggle: "Изменить фон",
                    blur_background_toggle: "Размытие фона",
                    enable_fixed_adaptive: "Фиксация на мобильных",
                    indent_bottom_toggle: "Отступ снизу",
                    indent_top_toggle: "Отступ сверху",
                    prohibit_replacement_tip:
                        "Если ниже на странице будет другая секция (шапка) с включенной фиксацией, то при скролле обе секции окажутся зафиксированы друг под другом",
                    prohibit_replacement_toggle: "Запретить замену",
                    reassign_indent_toggle: "Переопределить отступы",
                },
                shadow: {
                    blur_label: "Размытие",
                    color_label: "Цвет тени",
                    opacity_label: "Непрозрачность",
                    settings_t: "Настройка тени",
                    shift_label: "Сдвиг",
                    shift_tip: "Смещение тени по заданному углу",
                },
                slider: {
                    add_img_button: "Добавить изображение",
                    autoplay_loop_radio: "Зациклить слайды по кругу",
                    autoplay_loop_tip:
                        "Опция не применяется в режиме редактирования страницы",
                    autoplay_radio: "Автопрокрутка слайдов",
                    autoplay_time_suffix: "c",
                    autoplay_time_tip:
                        "Слайдер будет прокручиваться с заданной скоростью",
                    bullets_color_label: "Цвет переключателей",
                    bullets_label: "Вид индикаторов",
                    buttons_placement_label: "Расположение кнопок",
                    buttons_size_label: "Размер индикаторов",
                    click_action_label: "Действие при клике",
                    effect_fade_tab: "Растворение",
                    effect_slide_tab: "Сдвиг",
                    elements_color_label: "Цвет индикаторов",
                    elements_effect_label: "Слайдер эффект",
                    gallery_tip: "Галерея",
                    help: {
                        slider_control_next:
                            "Для перехода на следующий слайд вставьте ссылку:",
                        slider_control_prev:
                            "Для перехода на предыдущий слайд вставьте ссылку:",
                        slider_control_slide:
                            "Для перехода по номеру слайда (N):",
                        slider_control_title:
                            "Вы можете переключать слайды с помощью любого элемента с настроенным действием «Перейти по ссылке».",
                    },
                    image_settings_title: "Изображение",
                    overflow_mode_radio: "Отображать боковые слайды",
                    overflow_mode_radio_tip:
                        "По бокам слайдера будут отображаться следующая и предыдущие карточки. Доступно в режиме предпросмотра",
                    overflow_opacity_radio:
                        "Добавить прозрачность на боковые слайды",
                    pagination_placement_label: "Расположение",
                    placement_inside_tab: "Внутри",
                    placement_outside_tab: "Снаружи",
                    placement_overlap_tab: "На границе",
                    placement_under_tab: "Снизу",
                    responsive_mode_label: "Включить на устройствах",
                    responsive_mode_tip:
                        "Выберите устройства, на которых будет включен режим «слайдер»",
                    settings_button: "Настроить слайдер",
                    settings_title: "Настроить слайдер",
                    show_controls_on_hover: "Показывать при наведении",
                    style_arrow_label: "Вид стрелочек",
                    tab_title: "Слайдер",
                },
                socials: {
                    add_field_button: "Добавить",
                    add_name_toggle: "Показывать название соцсети",
                    add_social_title: "Добавить ссылку",
                    color_color: "Цветной",
                    color_custom_color: "Свой цвет",
                    color_inversion: "Инверсия",
                    color_label: "Цвет иконки",
                    color_origin: "Оригинал",
                    custom_color_title: "Цвет иконок",
                    discord_url_placeholder: "discord.gg/ID_ГРУППЫ",
                    field_delete_tip: "Удалить",
                    field_placeholder: "Ссылка",
                    fields_empty: "Список соцсетей пуст",
                    hover_color_option: "Окрашивание",
                    hover_custom_color_option: "Свой цвет",
                    hover_effect_label: "Эффект при наведении",
                    hover_opacity_option: "Прозрачность",
                    hover_zoom_option: "Увеличение",
                    links_subtitle: "Ссылки",
                    list: {
                        cian: "Циан",
                        email: "Почта",
                        ok: "Одноклассники",
                        phone: "Телефон",
                        vk: "ВКонтакте",
                        website: "Сайт",
                        yandex_music: "Яндекс Музыка",
                        yandex_zen: "Яндекс Дзен",
                    },
                    margin_label: "Отступ между иконками",
                    messenger_url_placeholder: "m.me/ИМЯ_ПОЛЬЗОВАТЕЛЯ",
                    modal_title: "Социальные профили",
                    open_new_window_toggle: "Открывать в новом окне",
                    position_horizontal: "По горизонтали",
                    position_label: "Расположение иконок",
                    position_vertical: "По вертикали",
                    size_label: "Размер",
                    skype_url_placeholder: "skype:ВАШЕ_ИМЯ?chat",
                    style_label: "Стиль",
                    style_settings_subtitle: "Внешний вид",
                    tabs: {
                        socials_style_title: "Стиль",
                        socials_title: "Соцсети",
                    },
                    tg_url_placeholder: "t.me/ВАШЕ_ИМЯ",
                    threads_url_placeholder: "threads.net/@ИМЯ_ПОЛЬЗОВАТЕЛЯ",
                    tiktok_url_placeholder: "tiktok.com/@ИМЯ_ПОЛЬЗОВАТЕЛЯ",
                    viber_url_placeholder:
                        "viber://contact?number=НОМЕР_ТЕЛЕФОНА",
                    whatsapp_url_placeholder: "wa.me/НОМЕР_ТЕЛЕФОНА",
                },
                styles: {
                    copy_background_button: "Копировать фон",
                    copy_style_button: "Копировать стиль",
                    empty_styles_list: "Нет стилей для копирования",
                    error_multiple_styles:
                        "Невозможно скопировать стиль у нескольких элементов",
                    invalid_style_notify: "Нет подходящих стилей для вставки",
                    paste_background_button: "Вставить фон",
                    paste_style_button: "Вставить стиль",
                    style_applied_notity: "Стиль применен",
                    style_copied_notify: "Стиль скопирован",
                },
                system_modal: {
                    bad_browser_warn: {
                        download_link: "Скачать",
                        modal_title: "Браузер не поддерживается",
                        text: 'Для стабильной работы редактора рекомендуем использовать последние версии следующих браузеров. <a href="https://help.flexbe.ru/browser-support/" target="_blank">Подробнее</a>.',
                        title: "Рекомендуем обновить браузер",
                    },
                    legacy_browsers: {
                        description:
                            "Чтобы пользоваться всеми возможностями и преимуществами конструктора сайтов Flexbe, обновите свой браузер до последней версии или установите другой браузер.",
                        more_button: "Подробнее",
                        not_show: "Больше не показывать",
                        title: "Упс... Кажется, ваш браузер устарел",
                    },
                    mobile_warn: {
                        continue_button: "Всё равно продолжить",
                        leads_link: "Просмотр заявок",
                        text: "Редактирование с мобильных устройств не поддерживается. Воспользуйтесь компьютером или ноутбуком.",
                        title: "Устройство не поддерживается",
                    },
                },
                table: {
                    inner: {
                        add_column_button: "Добавить столбец",
                        add_row_button: "Добавить строку",
                        align_col_tip: "Горизонтальное выравнивание",
                        autowidth_col_label: "Автоматическая ширина",
                        autowidth_col_tip:
                            "Ширина столбца будет рассчитана автоматически в зависимости от размера контента в ячейках",
                        autowidth_col_value: "Автоматически",
                        cell_copy_button: "Копировать в буфер",
                        cell_fill_button: "Заполнить ячейку",
                        cell_justify_title: "Выравнивание ячейки",
                        cell_paste_button: "Вставить из буфера",
                        cell_remove_button: "Удалить ячейку",
                        cell_type_button: "Кнопка",
                        cell_type_change_button: "Изменить тип",
                        cell_type_empty: "Пустая ячейка",
                        cell_type_html: "HTML",
                        cell_type_icon: "Иконка",
                        cell_type_icon_text: "Иконка с текстом",
                        cell_type_image: "Картинка",
                        cell_type_image_text: "Картинка с текстом",
                        cell_type_logo: "Логотип",
                        cell_type_modal_title: "Выберите тип ячейки",
                        cell_type_social: "Соц. профили",
                        cell_type_text: "Текст",
                        cell_type_tip: "Тип ячейки",
                        duplicate_col_button: "Дублировать столбец",
                        duplicate_row_tip: "Дублировать строку",
                        minwidth_col_label: "Минимальная ширина",
                        minwidth_col_tip:
                            "Фактическая ширина столбца зависит от размера элементов и может быть больше минимальной",
                        more_button_tip: "Больше опций",
                        move_col_placeholder: "ПЕРЕМЕСТИТЬ СЮДА",
                        move_col_tip: "Переместить столбец",
                        move_row_placeholder: "ПЕРЕМЕСТИТЬ СЮДА",
                        move_row_tip: "Переместить строку",
                        remove_col_button: "Удалить столбец",
                        remove_row_tip: "Удалить строку",
                        settings_button: "Стиль таблицы",
                        text: {
                            apply_style_desc:
                                "Параметры текста ячейки настраиваются в настройках стиля таблицы",
                            apply_style_label: "Изменить параметры текста",
                        },
                    },
                    style: {
                        adaptive: {
                            cards_cols: "По столбцам",
                            cards_cols_tip:
                                "Каждый столбец таблицы будет трансформирован в отдельную карточку",
                            cards_rows: "По строкам",
                            cards_rows_tip:
                                "Каждая строка таблицы будет трансформирована в отдельную карточку",
                            mode_cards: "Карточки без параметров",
                            mode_cards_attrs: "Карточки с параметрами",
                            mode_scroll: "Без адаптации (скролл)",
                        },
                        adaptive_align_attrs_label: "Выравнивание 1-й колонки",
                        adaptive_align_content_label:
                            "Выравнивание 2-й колонки",
                        adaptive_align_footer_label: "Выравнивание подвала",
                        adaptive_align_header_label: "Выравнивание заголовка",
                        adaptive_align_label: "Выравнивание",
                        adaptive_cards_title: "Группировать карточки",
                        adaptive_footer_label: "Включить подвал карточки",
                        adaptive_footer_tip:
                            "Помечает последнюю ячейку карточки как подвал и объединяет ячейки. Вы можете настроить выравнивание для этой ячейки отдельно.",
                        adaptive_header_label: "Включить заголовок карточки",
                        adaptive_header_text_size: "Размер шрифта заголовка",
                        adaptive_header_text_weight: "Толщина шрифта заголовка",
                        adaptive_header_tip:
                            "Помечает первую ячейку карточки как заголовок и объединяет ячейки. Вы можете настроить параметры шрифта и выравнивание для этой ячейки отдельно.",
                        adaptive_min_col_width_tip:
                            "Если таблица не помещается в экран, то столбцы с автоматической шириной будут сжаты до минимального размера контента. Вы можете задать минимальную ширину для таких столбцов. Столбцы с минимальной шириной, заданной в режиме ПК, продолжат использовать собственные значения.",
                        adaptive_min_col_width_title:
                            "Минимальная ширина ячеек, px",
                        adaptive_mode_title: "Способ адаптации",
                        adaptive_section_desc:
                            "Настройте таблицу на мобильных устройствах",
                        adaptive_section_title: "Отображение на мобильных",
                        bg_section_title: "Фон таблицы",
                        borders_around_label: "Рамка вокруг таблицы",
                        borders_color_title: "Цвет разделителей",
                        borders_section_title: "Разделители",
                        borders_size_title: "Толщина разделителей",
                        cell_padding_horizontal_title: "По горизонтали",
                        cell_padding_title: "Отступ внутри ячейки",
                        cell_padding_vertical_title: "По вертикали",
                        content_block_title: "Контент",
                        content_section_title: "Контент",
                        even_cols_bg: "Чётные столбцы",
                        even_rows_bg: "Чётные строки",
                        fill_title: "Цвет заливки",
                        footer_block_title: "Подвал",
                        header: {
                            bg_label: "Цвет шапки",
                            even_odd_toggle: "Чередование цвета",
                            side_section_title: "Боковая шапка",
                            top_section_title: "Верхняя шапка",
                        },
                        header_block_title: "Заголовок",
                        header_section_title: "Шапка",
                        odd_cols_bg: "Нечётные столбцы",
                        odd_rows_bg: "Нечётные строки",
                        table_bg: "Фон таблицы",
                        table_header_style_title: "Шапка",
                        table_style_title: "Таблица",
                        text_color_title: "Цвет текста",
                        valign_title: "Вертикальное выравнивание",
                    },
                },
                tabs_settings: {
                    create: {
                        active_tab_tip: "Активная вкладка",
                        from_exist_title: "Дублировать вкладку",
                        from_template_title: "Создать вкладку",
                        item_cards_label: "Карточки",
                        item_gallery_label: "Галерея",
                        item_grid_label: "Колонки",
                    },
                    create_button: "Добавить вкладку",
                    styles: {
                        color_label: "Цвет элементов",
                        justify_label: "Выравнивание",
                        line_size_label: "Толщина линии",
                        modal_title: "Стиль вкладок",
                        shape_label: "Форма",
                        size_label: "Размер",
                        weight_label: "Толщина шрифта",
                    },
                },
                tag: {
                    border: "Обводка",
                    helper: {
                        color: "Цвет фона",
                        content: "Контент",
                        helper_show_onclick: "При клике",
                        helper_show_onhover: "При наведении",
                        indent_text: {
                            horizontal: "По горизонтали",
                            label: "Отступ до текста",
                            vertical: "По вертикали",
                        },
                        mode_width: { auto: "Авто", manual: "Ручная" },
                        rounding: "Скругление углов",
                        show_helper: "Показывать подсказку",
                        show_tongue: "Язычок",
                        subtitle: "Текст",
                        title: "Заголовок",
                        title_active: "Заголовок",
                        tongue_tip: "При включенном язычке обводка недоступна",
                        width: "Ширина",
                    },
                    helper_tab: "Подсказка",
                    icon_choice: "Выбрать",
                    shadow: "Тень",
                    tag: {
                        circle: "Круг",
                        circle_icon: "Иконка в круге",
                        circle_settings: "Круг",
                        color_tag: "Цвет",
                        effects: "Эффекты",
                        hover_effect: "Эффект при наведении",
                        icon: "Иконка",
                        icon_settings: "Иконка",
                        increase: "Увеличение",
                        opacity: "Прозрачность",
                        pulse: "Эффект пульсации",
                        pulse_area: "Область",
                        pulse_color: "Цвет",
                        pulse_radius: "Радиус",
                        pulse_speed: "Длительность",
                        pulse_stroke: "Обводка",
                        pulse_stroke_width: "Толщина",
                        pulse_type: "Стиль",
                        size: "Размер",
                        style_tag: "Стиль",
                    },
                    tag_tab: "Метка",
                },
                text: {
                    empty_placeholder: "Введите текст...",
                    reset_color: "Сбросить цвет",
                    style: {
                        color_title: "Цвет текста",
                        font_align_title: "Выравнивание",
                        font_decoration_title: "Оформление",
                        font_registry_title: "Регистр букв",
                        font_size_title: "Размер",
                        font_weight_title: "Толщина шрифта",
                        letter_spacing_title: "Межбукв. инт.",
                        line_height_title: "Высота строки",
                        mobile: {
                            apply_style_desc:
                                "Параметры текста на мобильных определяются автоматически",
                            apply_style_label: "Изменить для мобильных",
                        },
                        modal_title: "Текст",
                        opacity_title: "Прозрачность",
                        seo_title: "Настройка SEO",
                        style_title: "Настройка стиля",
                        text_settings_title: "Стиль текста",
                    },
                },
                timer: {
                    action_on_end_label: "Действие после окончания таймера",
                    daily_option: "Ежедневно",
                    date_label: "Дата",
                    day_label: "День недели",
                    day_of_month_label: "Число",
                    do_nothing_option: "Ничего не делать",
                    end_time_label: "Время окончания",
                    exact_date_option: "Точная дата",
                    expired_error: "Указанная дата истекла",
                    hide_block_option: "Скрыть секцию",
                    hide_element_option: "Скрыть элемент",
                    incorrect_date_error: "Некорректная дата",
                    irregular_day_info:
                        "В месяцах, в которых нет указанного дня, будет выбран последний день месяца",
                    modal_title: "Таймер",
                    monthly_option: "Ежемесячно",
                    show_null_days: "Показывать «0 дней»",
                    show_seconds: "Показывать секунды",
                    use_timezone_label: "Использовать часовой пояс сайта",
                    weekly_option: "Еженедельно",
                },
                units: {
                    vh_tip: "VH – это процентная величина от высоты окна браузера",
                    vw_tip: "VW – это процентная величина от ширины окна браузера",
                },
                video: {
                    autocycle_tip:
                        "Опция зацикливает воспроизведение видео и скрывает панель управления просмотром",
                    autocycle_toggle: "Зациклить и скрыть интерфейс",
                    autoplay_tip:
                        "Опция может не работать при включённом режиме энергосбережения в браузере Safari на macOS",
                    custom_cover_tip:
                        "Для оптимизации страницы включите опцию, видео будет загружено после клика по обложке. Для воспроизведения видео необходим второй клик.",
                    custom_poster_tip:
                        "Изображение будет отображаться до воспроизведения видео",
                    icorrect_video_link_tip: "Некорректная ссылка",
                    label: {
                        autoplay: "Автовоспроизведение (без звука)",
                        cover: "Обложка видео",
                        custom_cover: "Включить обложку с кнопкой «play»",
                        link: "Ссылка на видео",
                        link_or_code: "Ссылка на видео или код",
                        size: "Размер",
                    },
                    link_or_code_note:
                        "Например, youtube.com/watch?v=cIyHm6hSMrc",
                    paste_link_from_note:
                        'Поддерживается <a href="%youtube%" target="_blank">YouTube</a>, <a href="%vimeo%" target="_blank">Vimeo</a> и видео формата MP4',
                    set_as_cover_toggle: "Масштабировать",
                    ssl_conflict_error:
                        "Если ваш сайт работает по HTTPS протоколу, следует избегать размещения материалов со сторонних ресурсов, не использующих HTTPS. Иначе посетители могут увидеть предупреждение браузера о незащищенном содержании страницы, и это снизит доверие к вашему сайту.",
                    tab_title: "Видео",
                    ubload_video_button: "Загрузить видео",
                    upload_cover_button: "Загрузить обложку",
                    upload_tip:
                        "Формат MP4<br>\nВидеокодек H264 (битрейт от 1 до 5 Мбит/с)<br>\nАудиокодек AAC (битрейт 128 Кбит/с)<br>\nМаксимальный размер файла — 50 Мб",
                },
            },
            admin: {
                add_product: {
                    title: {
                        one: "Добавление товара",
                        few: "Добавление товаров",
                        many: "Добавление товаров",
                        other: "Добавление товаров",
                    },
                },
                apps: {
                    common: {
                        tab_desc: "Описание",
                        tab_instruction: "Инструкция",
                        tab_settings: "Настройки",
                    },
                    google_suite: {
                        desc: '<div class="text">\n    <a href="https://gsuite.google.ru/products/gmail/" target="_blank">Google Workspace</a> позволит вам использовать почту вида имя@вашдомен.ru через интерфейс почты gmail.\n</div>\n\n<div class="text">\n    Данная интеграция установит DNS-записи (MX и SPF) вашего домена для работы почты Google Workspace.\n</div>\n\n<div class="note">\n    Данный сервис является платным (от 6$/мес. за пользователя).\n</div>',
                        instruction:
                            '<div class="text">\n    Мы настроили DNS-записи (MX и SPF) вашего домена для работы с Google Workspace\n</div>\n\n<div class="text">\nДальнейшие шаги:\n</div>\n\n<ol>\n    <li>\n        Добавьте свой домен в <a href="https://gsuite.google.ru/products/gmail/" target="_blank">Google Workspace</a>\n    </li>\n    \n    <li>\n        Выберите способ подтверждения домена через «мета-тег»\n    </li>\n    \n    <li>\n        Скопируйте мета-тег на странице настройки Google Workspace (пример: <span class="tag">&lt;meta name="google-site-verification" content="QEc1CoW2Yiac-oW8cB" /&gt;</span>)\n    </li>\n    \n    <li>\n        Вставьте его в разделе «<a href="/admin/settings/verify/" target="_blank">Подтверждение прав</a>»\n    </li>\n    \n    <li>\n        Вернитесь в Google Workspace и нажмите «Проверить домен и настройки почты» или «Подтвердить»\n    </li>\n    \n    <li>\n        Настройка завершена. По окончанию проверки вы сможете создавать почтовые ящики в Google Workspace\n    </li>\n</ol>\n\n<div class="note">\n    Подтверждение прав может занять до двух суток. По окончанию проверки вы можете удалить мета-тег из раздела «Подтверждение прав»\n</div>',
                        short_desc: "Почта Gmail с адресом вашего домена",
                        title: "Google Workspace",
                    },
                    mailru_biz: {
                        desc: '<div class="text">\nИнтеграция с <a href="https://biz.mail.ru/mail/" target="_blank">Mail.ru почтой</a> позволит вам использовать почту вида имя@вашдомен.ru через интерфейс почты Mail.ru\n</div>\n\n<div class="text">\n    Данная интеграция установит DNS-записи (MX и SPF) вашего домена для работы почты Mail.ru\n</div>\n\n<div class="note">\n    Данный сервис является бесплатным\n</div>',
                        instruction:
                            '<div class="text">\nМы настроили DNS-записи (MX и SPF) вашего домена для работы с Mail.Ru для бизнеса\n</div>\n\n<div class="text">\nДальнейшие шаги:\n</div>\n\n<ol>\n    <li>\n        Добавьте свой домен на <a href="https://biz.mail.ru/mail/" target="_blank">biz.mail.ru</a>\n    </li>\n    \n    <li>\n        Выберите способ подтверждения домена через «мета-тег»\n    </li>\n    \n    <li>\n        Скопируйте мета-тег на странице Mail.ru (пример: <span class="tag">&lt;meta name="mailru-domain" content="f7c5yNFUZJ7zmVfc"/&gt;</span>)\n    </li>\n    \n    <li>\n        Вставьте его в разделе «<a href="/admin/settings/verify/" target="_blank">Подтверждение прав</a>»\n    </li>\n    \n    <li>\n        Вернитесь в Mail.ru и выберите пункт «Подтвердить»\n    </li>\n    \n    <li>\n        Настройка завершена. По окончанию подтверждения прав вы сможете создавать почтовые ящики для домена на Mail.ru\n    </li>\n</ol>\n\n<div class="note">\n    Подтверждение прав может занять до двух суток. По окончанию проверки вы можете удалить мета-тег из раздела «Подтверждение прав»\n</div>',
                        short_desc: "Почта Mail.Ru с адресом вашего домена",
                        title: "Mail.Ru для бизнеса",
                    },
                    yandex_connect: {
                        desc: '<div class="text">\n<a href="https://connect.yandex.ru/pdd/" target="_blank">Яндекс.Коннект</a> позволит вам использовать почту вида имя@вашдомен.ru через интерфейс Яндекс.Почты\n</div>\n\n<div class="text">\n    Данная интеграция установит DNS-записи (MX и SPF) вашего домена для работы Яндекс.Почты\n</div>\n\n<div class="note">\n    Данный сервис является бесплатным\n</div>',
                        instruction:
                            '<div class="text">\n    Мы настроили DNS-записи (MX и SPF) вашего домена для работы с Яндекс.Коннект\n</div>\n\n<div class="text">\nДальнейшие шаги:\n</div>\n\n<ol>\n    <li>\n        Добавьте свой домен на <a href="https://connect.yandex.ru/pdd/" target="_blank">Яндекс.Коннект</a>\n    </li>\n    \n    <li>\n        Выберите способ подтверждения домена через <b>мета-тег</b>\n    </li>\n    \n    <li>\n        Скопируйте мета-тег на странице Яндекс.Коннект (пример: <span class="tag">&lt;meta name="yandex-verification" content="b2378cc1a46b07c0" /&gt;</span>)\n    </li>\n    \n    <li>\n        Вставьте его в разделе <a href="/admin/settings/verify/" target="_blank">Подтверждение прав</a>\n    </li>\n    \n    <li>\n        Вернитесь в Яндекс и нажмите <b>Запустить проверку</b>\n    </li>\n    \n    <li>\n        Настройка завершена. По окончанию проверки вы сможете создавать почтовые ящики в Яндекс.Коннект\n    </li>\n</ol>\n\n<div class="note">\n    Подтверждение прав может занять до двух суток. По окончанию проверки вы можете удалить мета-тег из раздела <b>Подтверждение прав</b>\n</div>',
                        short_desc: "Яндекс.Почта с адресом вашего домена",
                        title: "Яндекс.Коннект",
                    },
                },
                auth: {
                    email: {
                        limit_reached:
                            "Достигнут лимит количества изменений почты. Повторите попытку позже",
                    },
                    email_label: "Адрес электронной почты",
                    enter_email_label: "Введите адрес электронной почты",
                    error_already_registered:
                        'Вы уже зарегистрированы,<br> выполните <a href="https://app.flexbe.com/login/?lang=ru">вход</a>',
                    error_email_long: {
                        one: "Длина адреса не должна превышать %MAX_LENGTH% символ",
                        few: "Длина адреса не должна превышать %MAX_LENGTH% символа",
                        many: "Длина адреса не должна превышать %MAX_LENGTH% символов",
                        other: "Длина адреса не должна превышать %MAX_LENGTH% символа",
                    },
                    error_email_not_found: "Почтовый адрес не найден",
                    error_email_short: {
                        one: "Электронный адрес должен содержать минимум %MIN_LENGTH% символ",
                        few: "Электронный адрес должен содержать минимум  %MIN_LENGTH% символа",
                        many: "Электронный адрес должен содержать минимум %MIN_LENGTH% символов",
                        other: "Электронный адрес должен содержать минимум  %MIN_LENGTH% символа",
                    },
                    error_incorrect_email:
                        "Некорректный адрес<br>электронной почты",
                    error_not_registered: "Такой аккаунт не зарегистрирован",
                    error_not_same: "Пароли не совпадают",
                    error_pass_wrong: "Неправильный пароль",
                    login: { forgot_password: "Забыли?", title: "Вход" },
                    login_process: "Авторизация",
                    logout_process: "Выход",
                    new_password_confirm_label: "Подтвердить пароль",
                    new_password_label: "Новый пароль",
                    password: {
                        changed_notify: "Пароль изменен",
                        error_same:
                            "Новый пароль не должен совпадать с текущим",
                        label: "Ваш пароль",
                        text: "Ваш аккаунт создан.<br> Пароль отправлен на ваш email.",
                        title: "Добро пожаловать!",
                    },
                    password_label: "Пароль",
                    recovery: {
                        error_link_invalid: "Ссылка восстановления неверна",
                        error_pass_long: {
                            one: "Длина пароля не должна превышать %MAX_LENGTH% символ",
                            few: "Длина пароля не должна превышать %MAX_LENGTH% символа",
                            many: "Длина пароля не должна превышать %MAX_LENGTH% символов",
                            other: "Длина пароля не должна превышать %MAX_LENGTH% символа",
                        },
                        invalid_link_modal: {
                            desc: "Пароль уже сброшен или срок для сброса пароля истек. Используйте новый пароль или воспользуйтесь функцией восстановления пароля снова.",
                            title: "Не удалось сбросить пароль",
                        },
                        letter_content:
                            '<span>Вы не смогли войти на <a href="https://flexbe.ru/" style="color: #119A22; text-decoration: none; ">Flexbe</a> и запросили восстановление пароля. Нажмите на кнопку «Сбросить пароль» или <a href="%LINK%" style="color:#119A22;text-decoration: underline">перейдите по этой ссылке</a> и придумайте новый пароль.</span>',
                        link_sent:
                            "На почту отправлено письмо со ссылкой для восстановления пароля",
                        password: "Восстановление пароля",
                        password_sended:
                            "Письмо с новым паролем отправлено на почту",
                        password_success: "Пароль успешно изменен",
                        reset_button: "Сбросить пароль",
                        title: "Сброс пароля",
                    },
                    reg: {
                        agreement:
                            'Регистрация означает согласие <br> с <a href="https://flexbe.ru/files/policy.pdf" target="_blank">политикой обработки персональных данных</a>, <br> <a href="https://flexbe.ru/#terms" target="_blank">условиями использования</a> и <a href="https://flexbe.ru/_s/files/license.pdf" target="_blank">лицензионным договором</a>.',
                        login_link:
                            'Уже есть аккаунт? <a href="https://app.flexbe.com/login/?lang=ru">Войти</a>.',
                        title: "Регистрация",
                    },
                    registration_link:
                        'Еще нет аккаунта? <a href="https://flexbe.ru/admin/reg/">Регистрация</a>.',
                    segmentation: {
                        delivery_tip:
                            "Это сайт для оформления доставки еды из ресторанов и продуктов на дом. Есть возможность сделать меню, удобную корзину, выбор способа доставки и оплату прямо на сайте.",
                        empty_tip:
                            "Вариант для тех, любит создавать с нуля. Выбирайте секции, которые подходят под ваши задачи и меняйте их под себя.",
                        landing_tip:
                            "Одностраничный сайт, который ведет клиента к целевому действию: заполнить заявку, оставить контакты, забронировать место. Лендинги предназначены для направления посетителей с рекламы и имеют высокую конверсию.",
                        quiz_tip:
                            "Сайт, состоящий только из квиза, на который можно направлять рекламу. Квиз — это многошаговая интерактивная форма, которую легко заполнять. Квизы нравятся посетителям и поэтому имеют высокую конверсию. Также квиз можно добавить отдельной секцией или всплывающей формой в любой тип сайта.",
                        text: "Выбрав один из вариантов, вы получите набор базовых секций, которые подходят вашим задачам.",
                        title: "Что вы хотите создать?",
                        type_delivery: "Доставка еды",
                        type_empty: "Пустой шаблон",
                        type_landing: "Лендинг",
                        type_quiz: "Квиз",
                        type_store: "Интернет-магазин",
                        type_website: "Сайт",
                    },
                },
                bill: {
                    draft_limit: { toast: "Достигнут лимит черновиков" },
                    projects_limit: {
                        confirm_button: "Создать как черновик",
                        desc: {
                            one: "Ваш тариф позволяет опубликовать %count% сайт. Чтобы не превышать лимит, сайты можно переносить в черновики.",
                            few: "Ваш тариф позволяет опубликовать %count% сайта. Чтобы не превышать лимит, сайты можно переносить в черновики.",
                            many: "Ваш тариф позволяет опубликовать %count% сайтов. Чтобы не превышать лимит, сайты можно переносить в черновики.",
                            other: "Ваш тариф позволяет опубликовать %count% сайта. Чтобы не превышать лимит, сайты можно переносить в черновики.",
                        },
                        tariff_button: "Выбрать другой тариф",
                        title: "Создание черновика",
                        toast: "Достигнут лимит сайтов для публикации",
                    },
                    select_published_projects: {
                        desc: "Выберите сайты, которые вы хотите опубликовать. Остальные сайты будут доступны в Черновиках. Вы сможете опубликовать их в любое время",
                        title: {
                            one: 'Тариф "%tariff%" позволяет опубликовать %count% сайт',
                            few: 'Тариф "%tariff%" позволяет опубликовать %count% сайта',
                            many: 'Тариф "%tariff%" позволяет опубликовать %count% сайтов',
                            other: 'Тариф "%tariff%" позволяет опубликовать %count% сайта',
                        },
                    },
                },
                domains: {
                    add: {
                        add_button: "Добавить",
                        check_button: "Проверить",
                        domain_exist_text: "Домен уже добавлен",
                        domain_flexbe_another_account_label:
                            "Используется на другом аккаунте",
                        domain_flexbe_another_project_label:
                            "Используется на другом сайте",
                        domain_reserved_help: "Домен принадлежит вам?",
                        domain_reserved_label: "Домен занят",
                        domain_reserved_tip:
                            "Для подключения домена необходимо настроить DNS в панели управления доменом",
                        empty_domain_error: "Укажите домен",
                        flexbe_external_transfer_modal_text:
                            "Для добавления домена открепите его от другого аккаунта",
                        flexbe_external_transfer_modal_title:
                            "Домен используется на другом аккаунте",
                        flexbe_internal_transfer_modal_text:
                            "Подтвердите перенос домена на текущий сайт",
                        flexbe_internal_transfer_modal_title:
                            "Домен используется на другом сайте",
                        is_requested: "Заявка на регистрацию уже создана",
                        other_zones_title: "Другие доменные зоны",
                        pay_plan_modal_title:
                            "Регистрация домена доступна только после оплаты основного тарифного плана",
                        register_button: "Зарегистрировать",
                        reserved_domain_error: "Домен недоступен",
                        search_field_desc:
                            "Вы можете использовать существующий домен или зарегистрировать новый",
                        subdomain_exist_error: "Поддомен уже добавлен",
                        title: "Добавить домен",
                        transfer_add_subdomain_help_text:
                            "Как добавить этот поддомен?",
                        transfer_button: "Перенести",
                        transfer_error_common_error:
                            "Ошибка при подключении домена",
                        transfer_register_external_tip:
                            "Мы не регистрируем домены в данной зоне. Добавьте домен на Flexbe, что бы получить список DNS-записей, после чего зарегистрируйте домен в другом месте.",
                        transfer_register_help:
                            "Как зарегистрировать этот домен?",
                        transfer_subdomain_domain_not_register_modal_text:
                            "Вы пытаетесь добавить поддомен для еще не зарегистрированного домена",
                        transfer_subdomain_domain_not_register_modal_title:
                            "Домен не зарегистрирован",
                        transfer_subdomain_domain_not_register_tip:
                            "Основной домен еще не зарегистрирован. Вы можете добавить данный поддомен на платформу, он заработает после регистрации основного домена.",
                        transfer_success_notify_text: "Домен добавлен",
                    },
                    back_to_domains_button: "Перейти в раздел домены",
                    change_contacts: {
                        title: "Изменение контактов для %domain%",
                    },
                    change_nameservers: {
                        custom_ns_label: "Использовать собственные DNS-серверы",
                        host_opt_placeholder: "DNS-сервер (необязательно)",
                        host_placeholder: "DNS-сервер",
                        ip_placeholder: "IP адрес",
                        ns_limit_error: "Необходимо указать 2 DNS-сервера",
                        title: "Управление DNS-серверами для %domain%",
                        wrong_settings_warning:
                            "При неправильной конфигурации DNS-серверов сайт на Flexbe перестанет работать",
                    },
                    domain_action: {
                        belgie: "Регистрация в БелГИЭ",
                        credentials: "Изменить контакты",
                        edit_mail_text: "Настроить почту",
                        make_main_text: "Сделать основным",
                        redirect_text: "Редирект на осн. домен",
                        remove_text: "Удалить домен",
                        renew: "Продлить домен",
                        setup_dns_text: "Управление DNS-серверами",
                        ssl_text: "Сертификат для https://",
                        unlink_text: "Открепить домен",
                    },
                    mail: { domain_action_connect_mail: "Подключить почту" },
                    main: {
                        add_alias_button: "Добавить домен",
                        add_domain_button: "Добавить домен",
                        cancel_registration_confirm_title:
                            "Удалить заявку на регистрацию домена %domain%?",
                        contacts_update_error:
                            "Не удалось изменить контактную информацию",
                        domain_aliases_text: "Дополнительные домены",
                        domain_dns_wait_tip_text:
                            "DNS-серверы меняются у регистратора домена.<br>Смена DNS-серверов может занимать до 2-х суток.<br>\nДля подключения домена необходимо указать наши DNS-серверы:<br>%list%",
                        domain_dns_wait_tip_title: "Ожидается настройка DNS",
                        domain_doesnt_work_text: "Домен не работает",
                        domain_expire_label: "Истекает",
                        domain_expired_tip_text:
                            "Для продолжения работы необходимо его продлить.<br>Если не продлить в течение месяца — домен станет свободным для регистрации другими лицами.",
                        domain_expired_tip_title:
                            "Истек срок регистрации домена",
                        domain_expired_transfer_tip_text:
                            "Для продолжения работы необходимо его продлить.<br>Для продления домена обратитесь в компанию, в которой регистрировался данный домен.<br>Если не продлить в течение месяца — домен станет свободным для регистрации другими лицами.",
                        domain_in_register_label: "В процессе регистрации",
                        domain_in_register_tip:
                            "Заявка находится в очереди на обработку.<br>Регистрация домена обычно занимает от 1 до 8 часов.",
                        domain_name_label: "Домен",
                        domain_not_registered_tip_text:
                            "Для регистрации домена:<br>1. Удалите данный домен<br>2. Нажмите кнопку «Добавить домен»<br><br>При регистрации домена в другом месте просто укажите наши DNS:<br>%list%",
                        domain_not_registered_tip_title:
                            "Домен не зарегистрирован",
                        domain_orders_title: "Заявки на регистрацию",
                        domain_price_label: "Цена",
                        domain_reg_canceled_notify: "Заявка удалена",
                        domain_registered_label: "Зарегистрирован",
                        domain_registered_tip_text:
                            "Активация домена может занимать до 2-х суток",
                        domain_removed_notify: "Домен удален",
                        domain_transfered_label: "Перенесен",
                        domain_wait_payment_text: "Ожидает оплату",
                        domain_wait_transfered_tip_text:
                            "Домен настроен на нашу платформу, но фактическая активация домена по всему миру может занимать до 2-х суток.",
                        domain_will_be_available_text:
                            "Активация домена может занимать до 2-х суток",
                        domains_empty_desc:
                            "Вы можете использовать существующий домен или зарегистрировать новый",
                        error: {
                            domain_already_registered:
                                "Домен уже зарегистрирован",
                        },
                        expire_domain_tip:
                            "Срок, до которого оплачен домен. Может не совпадать со сроком оплаты наших услуг. Домены продляются раз в год.",
                        expire_transfer_tip:
                            "<p>Срок, до которого оплачен домен. Может не совпадать со сроком оплаты наших услуг. Домены продляются раз в год.</p><p>Для продления домена обратитесь в компанию, в которой регистрировался данный домен.</p>",
                        free_text: "Бесплатно",
                        make_main_confirm_title:
                            "%domain% станет основным доменом",
                        make_main_success_notify: "Основной домен изменен",
                        nss_incorrect_error: "Некорректные DNS-серверы",
                        pay_button: "Оплатить",
                        payed_until_text: "Оплачен до: %date%",
                        price_free_tip:
                            "Домен продляется бесплатно при условии оплаты основного тарифа",
                        price_label: "Цена",
                        price_year_text: "%price% / год",
                        primary_domain_text: "Основной домен",
                        redirect_disabled_notify: "Редирект отключен",
                        redirect_enabled_notify: "Редирект включен",
                        redirect_text: "Редирект",
                        remove_domain_confirm_title: "Удалить домен %domain%?",
                        renew_button: "Продлить",
                        ru_price_info_text:
                            "Первый .ru или .рф домен регистрируется и продлевается бесплатно",
                        ssl_disabled_notify: "Сертификат для https:// отключен",
                        ssl_enabled_notify: "Сертификат для https:// включен",
                        ssl_status_error:
                            "Ошибка получения сертификата для https://",
                        ssl_status_off_text: "Сертификат для https:// отключен",
                        ssl_status_on_text: "Сертификат для https:// включен",
                        ssl_status_wait_text:
                            "Получение сертификата для https://",
                        subdomain_dns_wait_tip_text:
                            "Для подключения поддомена необходимо настроить CNAME-запись для него в DNS.<br>Поддомен %domain%. (с точкой на конце)<br>Тип записи: CNAME<br>Значение записи: %cname%. (с точкой на конце)<br>DNS-записи меняются в том месте, где размещен ваш основной сайт.<br>Изменение настроек в DNS может занимать до 2-х суток.",
                        tech_domain_title: "Технический адрес сайта",
                        title: "Домены",
                        transfered_domain_expire_tip:
                            "Вы регистрировали домен в другом месте.<br>Для продления домена обратитесь в компанию, в которой регистрировался данный домен.",
                    },
                    reg: {
                        base_internal_error:
                            "Не удалось зарегистрировать домен (внутренняя ошибка)",
                        done_title: "Регистрация домена %domain%",
                        error_code_text: "Код ошибки: %code%",
                        error_label: "Ошибка регистрации",
                        error_list: {
                            one: "При регистрации домена произошла ошибка: %list%",
                            few: "При регистрации домена возникло %count% ошибки: %list%",
                            many: "При регистрации домена возникло %count% ошибок: %list%",
                            other: "При регистрации домена возникло %count% ошибки: %list%",
                        },
                        error_tip: "Произошла ошибка при регистрации домена",
                        field_too_long_error:
                            "Значение поля не должно быть длиннее %length% знаков",
                        field_too_short_error:
                            "Значение поля не должно быть короче %length% знаков",
                        form: {
                            adress_title: "Почтовый адрес",
                            company_data_title: "Информация о компании",
                            contacts_title: "Контактные данные",
                            field_birthday_label: "Дата рождения",
                            field_city_label: "Город / Населенный пункт",
                            field_city_placeholder: "Санкт-Петербург",
                            field_company_inn_label: "ИНН",
                            field_company_kpp_label: "КПП",
                            field_company_label: "Название организации",
                            field_company_placeholder: "Graf LTD",
                            field_company_ru_label: "Название организации",
                            field_company_ru_placeholder: "ООО  «Граф»",
                            field_country_label: "Страна",
                            field_country_placeholder: "Россия",
                            field_email_placeholder: "example@site.com",
                            field_en_desc: "На английском",
                            field_firstname_en_placeholder: "Ivan",
                            field_firstname_label: "Имя",
                            field_firstname_placeholder: "Иван",
                            field_kz_id_label: "ИИН / Паспорт",
                            field_lastname_en_placeholder: "Petrov",
                            field_lastname_label: "Фамилия",
                            field_lastname_placeholder: "Петров",
                            field_middlename_en_placeholder: "V",
                            field_middlename_label: "Отчество",
                            field_middlename_placeholder: "Васильевич",
                            field_passport_date_label: "Дата выдачи паспорта",
                            field_passport_issue_label: "Кем выдан",
                            field_passport_issue_placeholder:
                                "УФМС по г.Москве в ЦАО",
                            field_passport_number_label:
                                "Серия и номер паспорта",
                            field_street_label: "Улица, дом, квартира",
                            field_street_placeholder:
                                "Невский проспект, 88, 12",
                            field_zip_label: "Индекс",
                            field_zip_placeholder: "603000",
                            payer_company_label: "Юридическое лицо",
                            payer_person_label: "Физическое лицо или ИП",
                            payer_type_title: "Выберите владельца домена",
                            personal_data_title: "Персональные данные",
                            phone_placeholder: "+7 999 111-22-22",
                            price_year_label: "Стоимость регистрации домена:",
                            price_year_text: "%price% / год",
                            register_button: "Зарегистрировать",
                            saved_notify: "Сохранено",
                            title: "Регистрация домена %d_name%",
                        },
                        form_field_middlename_desc: "Только первую букву",
                        incorrect_address_error: "Проверьте адрес",
                        out_of_chars_range_error: "Недопустимые символы",
                        wrong_contact_data_error: "Некорректный формат",
                        wrong_data_label: "Некорректные данные",
                        wrong_data_tip:
                            "Регистратор отклонил заявку на регистрацию домена. Некоторые поля заполнены некорректно. Измените заявку и попробуйте еще раз.",
                        wrong_field_value_format_error:
                            "Некорректно заполнено поле",
                    },
                    reg_done: { box_title: "Заявка отправлена" },
                    transfer_done: {
                        change_cname_note:
                            "DNS-запись создается в панели управления хостинг-провайдера, где размещается основной домен.\n<br>Войдите в панель управления и найдите настройки DNS-записей (не путайте со сменой DNS-серверов). \n<br>После добавления записи поддомен должен заработать в течение 2-х суток.",
                        change_cname_title:
                            "Для подключения поддомена %domain% необходимо создать DNS-запись:",
                        change_dns_note:
                            "DNS-серверы меняются в панели управления, где вы регистрировали свой домен. <br>После указания наших DNS-серверов, активация домена может занять до 2-х суток.",
                        change_dns_title:
                            "Для подключения домена %domain% нужно изменить DNS-серверы на наши:",
                        cname_value_tip: "(точка на конце обязательна)",
                        domain_setup_help_text:
                            'Мы можем настроить домен за вас (бесплатно). Для этого пришлите нам в <a data-command="support">тех. поддержку</a> адрес панели управления, логин и пароль.',
                        entry_name_tip:
                            "Имя поддомена, обычно достаточно указать просто <strong>%sub%</strong><br>В редких случаях нужно указать <strong>%domain%.</strong> (с точкой на конце)",
                        entry_name_title: "Имя записи",
                        entry_type_title: "Тип записи",
                        entry_value_tip:
                            "В большинстве случаев точка на конце обязательна.<br>Если точку ввести нельзя — указывайте без точки.",
                        entry_value_title: "Значение записи",
                        success_title: "Домен подключен",
                        title: "Перенос домена %domain%",
                    },
                },
                ecommerce: {
                    actions: { title: "Выберите действие" },
                    cart: {
                        promotion: {
                            discount_amount_percent:
                                "Скидка не может превышать",
                        },
                    },
                    category: {
                        add: "Добавить категорию",
                        add_title: "Добавление категории",
                        all_products: "Все товары",
                        create_toast: "Категория добавлена",
                        delete_title: "Удалить категорию «<b>%name%</b>»?",
                        delete_toast: "Категория «%name%» удалена",
                        delete_toggle: {
                            one: "Удалить %count% товар, содержащийся в категории?",
                            few: "Удалить %count% товара, содержащиеся в категории?",
                            many: "Удалить %count% товаров, содержащиеся в категории?",
                            other: "Удалить %count% товаров, содержащиеся в категории?",
                        },
                        edit_title: "Редактирование категории",
                        edited_toast: "Категория отредактирована",
                        hide_toast: "Категория «%name%» скрыта",
                        name: "Название",
                        select_title: "Выберите категории",
                        show_toast: "Категория «%name%» показана",
                        title: "Категории",
                        visible_tip:
                            "Категория будет доступна на сайте при выборе отображения «Все категории»",
                        visible_toggle: "Отображать категорию на сайте",
                    },
                    category_select: {
                        clean: "Сбросить",
                        not_category: "Категорий нет",
                        not_search: "Категории не найдены",
                        search: "Поиск категорий",
                        select_all: "Выделить все",
                    },
                    header: {
                        article: "Артикул",
                        name: "Название",
                        price: "Цена",
                        quantity: "Кол-во",
                    },
                    option: {
                        add: "Добавить опцию",
                        add_title: "Добавление опции",
                        add_variant: "Добавить вариант",
                        color_tip: "Изменить цвет",
                        delete_confirm_title:
                            "Вы уверены, что хотите удалить опцию «<b>%name%</b>»?",
                        display: "Стиль отображения на сайте",
                        edit_title: "Редактирование опции",
                        max_combination:
                            "Добавлено максимальное кол-во вариантов опций",
                        max_combination_tip:
                            "У товара может быть не более 100 вариантов, комбинация опций не должна превышать этого значения",
                        name: "Название",
                        name_placeholder: "Размер, цвет или материал",
                        not_variants: "Нет вариантов опции",
                        tab_color: "Цвет",
                        tab_list: "Список",
                        title: "Опции",
                        type: "Тип опции",
                        variant_color_placeholder: "Цвет",
                        variant_example: "Вариант %count%",
                        variant_list_placeholder: "Вариант",
                        variants: "Варианты",
                    },
                    order: {
                        error: {
                            modification_not_allowed: "Изменение недоступно",
                        },
                    },
                    product: {
                        action_add_from_category: "Добавить в категорию",
                        action_all_hide: "Скрыть с сайта",
                        action_all_show: "Показать на сайте",
                        action_double: "Дублировать",
                        action_remove_from_category: "Удалить из категории",
                        action_show: "Показать на сайте",
                        add: "Добавить товар",
                        category_edit: "Редактировать",
                        category_setting: "Настроить",
                        category_show: "Показать на сайте",
                        create_toast: "Товар создан",
                        delete: "Удалить товар",
                        delete_confirm_text:
                            "Товар пропадет с сайта, пометится недоступным в корзинах и останется в заявках",
                        delete_confirm_title: "Удалить товар «<b>%name%</b>»?",
                        delete_toast: "Товар удален",
                        free: "бесплатно",
                        hide_tip: "Не отображается на сайте",
                        hide_toast: "Товар скрыт с сайта",
                        infinity_tip: "Неограниченное число товаров",
                        mass: {
                            remove_from_category_confirm_title: {
                                one: "Удалить <b>%count%</b> товар из категории «<b>%category%</b>»?",
                                few: "Удалить <b>%count%</b> товара из категории «<b>%category%</b>»?",
                                many: "Удалить <b>%count%</b> товаров из категории «<b>%category%</b>»?",
                                other: "Удалить <b>%count%</b> товаров из категории «<b>%category%</b>»?",
                            },
                        },
                        menu_common: "Общее",
                        menu_price_variants: "Цены и варианты",
                        modal_add_title: "Новый товар",
                        modal_edit_title: "Редактировать товар",
                        price_null: "не указана",
                        same_infinity_tip:
                            "Есть товары с неограниченным количеством",
                        search: "Найдено:",
                        search_placeholder: "Поиск по названию",
                        show_toast_copy: "Товар показан на сайте",
                        simple: {
                            remove_from_category_confirm_title:
                                "Удалить «<b>%product%</b>» из категории «<b>%category%</b>»?",
                        },
                        table_name_title: "Название товара",
                        title: "Товары",
                        update_toast: "Товар обновлен",
                        variant_article: "Артикул: %article%",
                        variant_count: {
                            one: "%count% шт.",
                            few: "%count% шт.",
                            many: "%count% шт.",
                            other: "%count% шт.",
                        },
                        variant_infinity: "Неограниченно",
                        variant_quantity: {
                            one: "Вариант: %count%",
                            few: "Варианта: %count%",
                            many: "Вариантов: %count%",
                            other: "Варианта: %count%",
                        },
                    },
                    product_from_category: {
                        add_toast: {
                            one: "Товар добавлен в категорию",
                            few: "Товары добавлены в категорию",
                            many: "Товары добавлены в категорию",
                            other: "Товары добавлены в категорию",
                        },
                        delete_toast: {
                            one: "Товар удален из категории",
                            few: "Товары удалены из категории",
                            many: "Товары удалены из категории",
                            other: "Товары удалены из категории",
                        },
                    },
                    products: {
                        delete_confirm_title: {
                            one: "Вы уверены, что хотите удалить %count% товар?",
                            few: "Вы уверены, что хотите удалить %count% товара?",
                            many: "Вы уверены, что хотите удалить %count% товаров?",
                            other: "Вы уверены, что хотите удалить %count% товара?",
                        },
                        delete_toast: "Товары удалены",
                        empty: "У вас еще нет товаров",
                        hide_toast: "Товары скрыты",
                        pagination: "%page% из %pages%",
                        search_empty: "Ничего не найдено",
                        show_toast_copy: "Товары показаны",
                    },
                    reservation: {
                        error: { reservation_disabled: "Резерв отключён" },
                    },
                    variant: {
                        toggle_allow_negative_order:
                            "Разрешить заказывать, если нет в наличии",
                        toggle_common: "Вариант по умолчанию",
                        toggle_common_tip:
                            "В карточке товара при загрузке страницы этот вариант будет выбран по умолчанию",
                        toggle_visible: "Отключить вариант",
                        toggle_visible_tip:
                            "Если опция включена, то вариант будет считаться несуществующим и будет недоступен для заказа",
                    },
                    variants: {
                        add_category_button: "Добавить категорию <b>%name%</b>",
                        add_category_placeholder: "Добавить...",
                        add_old_price: "Добавить старую цену",
                        add_option: "Добавить опцию",
                        article: "Артикул",
                        article_placeholder: "Артикул",
                        category: "Категория",
                        common_tip: "Вариант по умолчанию",
                        description: "Краткое описание",
                        hide: "Не показывать на сайте",
                        image_info:
                            "Для загрузки изображений перейдите в настройки варианта товара",
                        images_tip:
                            "<b>Фото</b><br />\nМаксимальный размер файла — 15 Мб<br />",
                        images_title: "Изображения",
                        infinity: "Неограниченно",
                        infinity_tip: "Сделать неограниченным",
                        is_default: "Сделать основным",
                        mass_actions: "Массовое редактирование",
                        name: "Название",
                        name_placeholder: "Например: Футболка",
                        not_order: "Вариант отключен",
                        old_price: "Старая цена",
                        old_price_error: "Старая цена должна быть больше",
                        options_note:
                            "Добавьте опции для товара, который имеет более одного варианта, например, размер или цвет",
                        options_title: "Опции",
                        price: "Цена",
                        quantity: "Количество",
                        quantity_reduction: "Кол-во",
                        quantity_tip: "Указать количество",
                        setting_title: "Настройка варианта",
                        show: "Показывать на сайте",
                        title: "Варианты",
                        toggle_visible: "Доступен на сайте",
                        unique_image_toggle:
                            "Уникальные изображения для каждого варианта",
                        visible: "Видимость",
                    },
                    variants_edit: {
                        image_edit: "Редактировать",
                        images_product_tip:
                            "При выборе данного варианта товара слайдер переключится на основное изображение варианта",
                        images_product_title: "Основное изображение варианта",
                        images_variant_tip:
                            "Изображения, которые будут отображаться в карточке товара при выборе данного варианта",
                        images_variant_title: "Изображения варианта",
                        not_upload_images: "Нет загруженных изображений",
                        option_title: "Опции",
                    },
                },
                expired_modal: {
                    pay_button: "Оплатить",
                    pay_end_text:
                        "Сайт заблокирован и будет удален <b>%data%</b>. Вы можете восстановить его в течение этого периода, оплатив тариф.",
                    pay_end_title: "Оплаченный период окончен",
                },
                filters: { found_count: "Найдено:" },
                forms: { validation_failed: "Ошибка валидации" },
                integrations: {
                    button: { pause: "Приостановить", resume: "Запустить" },
                    common: {
                        add_new: "Создать новый",
                        additional_label: "Дополнительно",
                        connect_success_message: "Интеграция добавлена",
                        connect_tab: "Подключение",
                        description_tab: "Описание",
                        example_button: "Пример",
                        integration_service_link: "Перейти на сайт",
                        paused_badge: "Приостановлен",
                        reconnect_success_message: "Интеграция подключена",
                        remove_counter_confirm_title: "Удалить интеграцию?",
                        remove_crm_confirm_title: "Удалить интеграцию?",
                        "remove_domain-mailing_confirm_title":
                            "Удалить настройки почты для %domain%?",
                        remove_mailing_confirm_title: "Удалить интеграцию?",
                        remove_success_message: "Интеграция удалена",
                        remove_widget_confirm_title: "Удалить интеграцию?",
                        update_success_message: "Интеграция обновлена",
                    },
                    counters: {
                        add_button: "Добавить интеграцию",
                        after_sending_the_lead_lead_is_sent:
                            "После отправки заявки отправляется событие:\n<div>%event%</div>",
                        another_counter: {
                            code_label: "Код счетчика",
                            subtitle:
                                "Установка своего счетчика через HTML-код",
                            title: "Другой счетчик",
                            title_label: "Название счетчика",
                            title_placeholder: "Мой счетчик",
                        },
                        connect_service_title: "Добавление интеграции",
                        counter_number_label: "Номер счетчика",
                        google_analytic: {
                            error: "С 1 июля 2023 года ресурсы Universal Analytics перестанут обрабатывать данные. Пользователям необходимо перейти на Google Аналитику 4.",
                            error_counter: "Неверный номер счетчика",
                        },
                        google_analytics: {
                            description:
                                "Google Analytics — бесплатный сервис, предоставляемый Google для создания детальной статистики посетителей веб-сайтов. Статистика собирается на сервере Google, пользователь только размещает JS-код на страницах своего сайта. Код отслеживания срабатывает, когда пользователь открывает страницу в своем веб-браузере.",
                            enter_counter_number_label: "Номер счетчика",
                            instruction:
                                "<ol>\n    <li>В разделе Администратор нажмите <b>Цели</b>.</li>\n    <li>Нажмите кнопку <b>+ЦЕЛЬ</b>.</li>\n    <li>В шаге 1. <b>Описание цели</b> придумайте Название цели (например <b>Заявка</b>) и выберите опцию <b>Событие</b>, затем нажмите далее.</li>\n    <li>В шаге 2. Подробные сведения о цели в поле Категория введите order_done, остальные поля оставьте пустыми.</li>\n    <li>Нажмите кнопку <b>Сохранить</b>.</li>\n</ol>",
                            subtitle: "Бесплатный сервис аналитики от Google",
                            title: "Google Аналитика",
                            url: "https://analytics.google.com/analytics/web/",
                        },
                        gtm: {
                            description:
                                "Google Tag Manager — бесплатный инструмент для управления тегами, разработанный Google",
                            enter_counter_number_label: "Номер счетчика",
                            subtitle: "Система для управления тегами от Google",
                            title: "Google Tag Manager",
                            url: "https://marketingplatform.google.com/about/tag-manager/",
                        },
                        title: "Аналитика",
                        yandex_metrika: {
                            additional_way_access_info:
                                "При альтернативном способе подключения Flexbe не сможет автоматически создавать цели и выполнять другие операции со счетчиком Яндекс.Метрики.<br>",
                            additional_way_suggestion:
                                'Рекомендуем использовать — <span class="style-link">основной способ подключения</span>.',
                            auto_goals_tip:
                                "Flexbe автоматически создаст цели для стандартных действий, таких как отправка формы, нажатие на кнопку и т.д",
                            auto_goals_toggle: "Автоматическое создание целей",
                            counter_name_already_in_use:
                                "Счетчик с таким названием уже существует",
                            description:
                                "<p>Яндекс.Метрика — бесплатный инструмент для оценки посещаемости\nсайтов и анализа поведения пользователей</p>",
                            empty_select_label: "Счетчик не выбран",
                            enter_counter_name_label:
                                "Введите название нового счетчика",
                            enter_counter_number_label: "Номер счетчика",
                            go_to_counter: "Перейти к счетчику",
                            main_way_access_info:
                                "Для подключения счетчика необходимо разрешить доступ Flexbe к данным Яндекс.Метрики.<br>",
                            main_way_suggestion:
                                'Альтернативный вариант — <span class="style-link">подключение по номеру счетчика</span>.',
                            select_counter_label: "Выберите счетчик",
                            subtitle: "Бесплатный сервис аналитики от Яндекса",
                            title: "Яндекс.Метрика",
                            url: "https://metrika.yandex.ru",
                            webvisor_disabled: "Отключен",
                            webvisor_tip:
                                "Подробные записи действий посетителей на сайте: движения мышью, прокручивание страницы и клики",
                            webvisor_toggle: "Вебвизор",
                            webvisor_version_1: "Версия 1.0",
                            webvisor_version_2: "Версия 2.0",
                        },
                    },
                    crm: {
                        add_button: "Добавить интеграцию",
                        amocrm: {
                            assignment_tip:
                                "Из списка сотрудников amoCRM выберите ответственного, который будет принимать заявки. Сотрудник должен иметь доступ к CRM и все необходимые права для работы со сделками и контактами",
                            contact: "Контакте",
                            description:
                                "amoCRM автоматически фиксирует все заявки и запросы клиентов по всем каналам, предоставляет интеграцию с email и предлагает полную интеграцию с провайдерами телефонии для офиса.",
                            domain_label: "Адрес аккаунта",
                            domain_placeholder: "domain.amocrm.ru",
                            errors: {
                                access_denied: {
                                    description:
                                        "%account%. %domain%. Нет доступа к amoCRM. Проверьте права доступа в amoCRM",
                                    message: "Нет доступа к amoCRM",
                                },
                                assignee_unavailable: {
                                    description:
                                        "%domain%. Ответственный не доступен. Установлено значение по умолчанию",
                                    message:
                                        "Ответственный не доступен. Установлено значение по умолчанию",
                                },
                                auth_fail: {
                                    description:
                                        "Ошибка авторизации. Повторно подключите интеграцию",
                                    message:
                                        "Ошибка авторизации. Повторно подключите интеграцию",
                                },
                                auth_fail_due_to_limit_exceeded:
                                    "Портал amoCRM заблокирован за неоднократное превышение лимита обращений к серверу",
                                contact_create_update_failed:
                                    "Не удалось создать или обновить контакт",
                                contact_search_error:
                                    "Сервис поиска контактов недоступен",
                                data_transfer:
                                    "Во время передачи данных заявки произошла ошибка. Обратитесь в службу поддержки Flexbe",
                                duplicate_unsorted_lead:
                                    "Попытка создать дубликат неразобранного лида. Обратитесь в службу поддержки Flexbe",
                                entity_limit_exceeded: {
                                    description:
                                        "%account%. %domain%. Превышено ограничение по количеству сущностей в amoCRM. Свяжитесь с поддержкой amoCRM",
                                    message:
                                        "Превышено ограничение по количеству сущностей в amoCRM",
                                },
                                fail_create_fields:
                                    "Нет прав на создание полей в %type%. Заявка № %leadNum% <br>\nПодключите интеграцию через аккаунт с правами администратора или попросите администратора портала amoCRM добавите поля вручную<br><br> \nСписок полей: %fields%",
                                field_limit_exceeded:
                                    "Превышено ограничение по количеству полей в amoCRM. Свяжитесь с поддержкой amoCRM",
                                forbidden: {
                                    message: "Не хватает прав доступа",
                                },
                                ip_not_white_listed:
                                    "Доступ к порталу amoCRM запрещён с IP адреса Flexbe. Обратитесь в службу поддержки Flexbe",
                                need_pay: {
                                    description:
                                        "%account%. %domain%. amoCRM не оплачен. Интеграция продолжит работу после оплаты amoCRM",
                                    message: "amoCRM не оплачен",
                                },
                                pipeline_unavailable: {
                                    description:
                                        "%domain%. Воронка продаж не доступна. Установлено значение по умолчанию",
                                    message:
                                        "Воронка продаж не доступна. Установлено значение по умолчанию",
                                },
                                query_limit_exceeded:
                                    "Превышен лимит обращений к сервису amoCRM. Возможна задержка в доставке данных",
                                service_unavailable:
                                    "Сервис amoCRM недоступен. Возможна задержка в доставке данных",
                                token_expired:
                                    "Истёк срок действия ключа доступа. Повторно подключите интеграцию",
                                unexpected:
                                    "Непредвиденная ошибка. Пожалуйста, свяжитесь с нашей поддержкой",
                                unknown: "Неизвестная ошибка amoCRM",
                                wrong_response:
                                    "Не удалось обработать ответ сервера",
                                сontact_not_created: "Контакт не создан",
                            },
                            fields: {
                                form_name: "Форма",
                                page_address: "Адрес страницы",
                                page_name: "Страница",
                            },
                            instruction:
                                '<ol>\n    <li>Зарегистрируйтесь в <a href="%href%" target="_blank">amoCRM</a>.</li>\n    <li data-screenshot="step_2">В окне подключения amoCRM нажмите <b>Далее</b>. <span class="style-link">Пример</span></li>\n    <li data-screenshot="step_3">В открывшемся окне выберите аккаунт и нажмите <b>Разрешить</b>. <span class="style-link">Пример</span></li>\n    <li data-screenshot="step_4">В окне подключения amoCRM выберите ответственного, воронку, куда передавать UTM-метки, и нажмите кнопку <b>Подключить</b>. <span class="style-link">Пример</span></li>\n</ol>',
                            key_label: "Ключ доступа API",
                            lead: "Лиде",
                            login_label: "Логин (e-mail)",
                            new_client_name: "Клиент",
                            new_lead_name: "Новая заявка № %num% %form_name%",
                            sales_funnel_empty_label: "Воронка не выбрана",
                            sales_funnel_label: "Воронка",
                            subtitle: "Инструмент для контроля ваших продаж",
                            title: "amoCRM",
                            unsorted_send_label:
                                "Отправлять лиды в неразобранное",
                            url: "https://www.amocrm.ru/",
                        },
                        annotation_next:
                            "Для подключения необходимо разрешить доступ к вашему аккаунту amoCRM. Для этого нажмите кнопку  «Далее» и выберите аккаунт, в который необходимо передавать заявки. Для корректной работы интеграции аккаунт должен обладать правами администратора",
                        assign_automatically: "Назначить автоматически",
                        assignment_empty_label: "Сотрудник не выбран",
                        assignment_label: "Ответственный",
                        bitrix24: {
                            assignment_tip:
                                "Из списка сотрудников Битрикс24 выберите ответственного, который будет принимать заявки. Сотрудник должен иметь доступ к CRM",
                            connect_info:
                                'Для работы интеграции потребуется <a href="%url%" target="_blank">установить</a> приложение Flexbe на вашем портале Битрикс24',
                            description:
                                "Битрикс24 — это набор инструментов для организации работы компании: CRM (система управления продажами и коммуникациями с клиентами), Задачи и проекты, Контакт-центр, Офис.",
                            errors: {
                                access_denied: { message: "Доступ запрещён" },
                                app_not_found: {
                                    message: "Не установлено приложение Flexbe",
                                },
                                assignee_unavailable: {
                                    message:
                                        "Ответственный не доступен. Установлено значение по умолчанию",
                                },
                                authorization_error: {
                                    message:
                                        "Не удалось пройти авторизацию. Проверьте права доступа",
                                },
                                data_transfer: {
                                    message:
                                        "Во время передачи данных заявки произошла ошибка. Пожалуйста, обратитесь в службу поддержки Flexbe",
                                },
                                deal_category_unavailable: {
                                    message:
                                        "Воронка продаж недоступна. Установлено значение по умолчанию",
                                },
                                fail_create_field: {
                                    message:
                                        "Поле с уникальным именем уже существует в CRM",
                                },
                                fail_create_lead: {
                                    message:
                                        "Лид с указанным номером телефона уже существует",
                                },
                                forbidden: {
                                    message: "Не хватает прав доступа",
                                },
                                invalid_token: {
                                    message: "Неверные данные авторизации",
                                },
                                no_disk_space: {
                                    message:
                                        "Исчерпан выделенный дисковый ресурс на портале Битрикс24",
                                },
                                payment_required: {
                                    message: "Bitrix24 не оплачен",
                                },
                                query_limit_exceeded:
                                    "Превышен лимит обращений к сервису Bitrix24. Возможна задержка в доставке данных",
                                refresh_token_expired: {
                                    message:
                                        "Не удалось обновить ключ доступа. Повторно подключите интеграцию",
                                },
                                service_unavailable:
                                    "Сервис Битрикс24 недоступен. Возможна задержка в доставке данных",
                                token_expired: "Ключ доступа истек",
                                unauthorized: {
                                    message: "Неверные данные авторизации",
                                },
                                unknown: "Неизвестная ошибка Bitrix24",
                                verification_needed: {
                                    message: "Лицензия закончилась",
                                },
                                wrong_account_url: {
                                    message: "Адрес недоступен",
                                },
                            },
                            funnel_general: "Общее (по умолчанию)",
                            install_label:
                                "Я установил приложение Flexbe в Битрикс24",
                            instruction:
                                '<ol>\n        <li data-screenshot="1">В окне подключения Битрикс24 введите адрес портала и нажмите <b>Далее</b>. <span class="style-link">Пример</span></li>\n        <li data-screenshot="2">Перейдите по ссылке <b>Установить</b> и добавьте приложение <b>Флексби интеграция</b> на ваш портал Битрикс24. <span class="style-link">Пример</span></li>\n        <li data-screenshot="3">В Битрикс24 перейдите в <b>Приложения</b> → <b>Установленные</b>. <span class="style-link">Пример</span></li>\n        <li data-screenshot="4">В приложении <b>Флексби интеграция</b> нажмите на <b>Права доступа</b>. <span class="style-link">Пример</span></li>\n        <li data-screenshot="5">В открывшемся окне, в строке поиска введите имя или email пользователя, который подключает интеграцию. <span class="style-link">Пример</span></li>\n        <li data-screenshot="6">Выберите пользователя. <span class="style-link">Пример</span></li>\n        <li data-screenshot="7">Вернитесь в Flexbe. В окне подключения Битрикс24 включите тогл <b>Я установил приложение Flexbe в Битрикс24</b> и нажмите <b>Далее</b>. <span class="style-link">Пример</span></li>\n        <li data-screenshot="8">Выберите ответственного, воронку продаж и нажмите <b>Подключить</b>. <span class="style-link">Пример</span></li>\n</ol>',
                            subtitle:
                                "Комплект инструментов для ведения бизнеса",
                            title: "Битрикс24",
                            url: "https://www.bitrix24.ru/",
                            url_label: "Адрес портала Битрикс24",
                            url_placeholder: "name.bitrix24.ru",
                            url_wrong_error: "Портал не найден",
                        },
                        chat: { portal: "Адрес портала:", site: "Сайт:" },
                        connect_service_title: "Добавление интеграции",
                        deal_category_label: "Воронка продаж",
                        google: {
                            errors: {
                                file_not_found: "Отсутствует файл на диске",
                                invalid_grant:
                                    "Ошибка доступа. Повторно подключите интеграцию",
                                project_rate_limit:
                                    "Был превышен лимит обращений к Google API для проекта",
                                root_limit:
                                    "Превышено количество элементов в папке",
                                service_overloaded:
                                    "Сервис Google перегружен. Возможна задержка в доставке данных",
                                service_temporary:
                                    "Сервис Google недоступен. Возможна задержка в доставке данных",
                                service_unavailable:
                                    "Произошла непредвиденная ошибка. Повторно подключите интеграцию",
                                storage_quota_exceeded:
                                    "Недостаточно места на диске",
                                unknown: "Неизвестная ошибка Google Sheets",
                            },
                        },
                        google_sheets: {
                            connect:
                                "Для подключения сервиса необходимо дать доступ<br>Flexbe к данным Google Таблицы",
                            description:
                                "Облачный сервис для работы с электронными таблицами",
                            folder: "Папка",
                            main_folder: "Без папки",
                            row: {
                                all_price: "Итого",
                                delivery: "Стоимость доставки",
                                email: "Email",
                                lead: {
                                    created: { at: "Время создания" },
                                    number: "Номер",
                                    resource: "Источник",
                                    see: "Просмотр заявки",
                                },
                                name: "Имя",
                                phone: "Телефон",
                                price: "Сумма за товары",
                                title: "Товар",
                            },
                            site_url:
                                "https://www.google.com.eg/intl/ru/sheets/about/",
                            steps_connect: {
                                one_table:
                                    "Отправлять все заявки в одну таблицу",
                                request: "Распределение заявок",
                                select_folder:
                                    "Выберите папку для таблиц с заявками",
                                separate_tables:
                                    "Отправлять заявки в отдельные таблицы по названию форм",
                                tip: "Все заявки с форм сайта могут передаваться в одну таблицу \nлибо распределяться по названию формы в разные таблицы",
                            },
                            subtitle:
                                "Облачный сервис для работы с электронными таблицами",
                            title: "Google Таблицы",
                            toast_error: "Не удалось получить доступ",
                        },
                        install_button: "Подключить",
                        pipedrive: {
                            auth_error:
                                "Не получилось авторизоваться. Обратитесь в службу поддержки Flexbe",
                            auth_error_code_expired:
                                "Время авторизации истекло. Повторите попытку ещё раз",
                            auth_error_company:
                                "Приложение не может быть установлено для запрашиваемой компании",
                            auth_error_repeat:
                                "Произошла ошибка авторизации. Повторно подключите интеграцию с Pipedrive",
                            connect_text:
                                "Для подключения необходимо разрешить доступ к вашему аккаунту Pipedrive. Для этого нажмите кнопку «Далее» и выберите аккаунт, в который необходимо передавать заявки. Для корректной работы интеграции аккаунт должен обладать правами администратора.",
                            deal: "Сделки",
                            desc: "Pipedrive – простая в использовании и сравнительно недорогая облачная CRM система с фокусом на продажах.",
                            error: {
                                over_limit: "Слишком много запросов",
                                person_not_found:
                                    "Не удалось получить ID контакта",
                                pipeline_not_found:
                                    "Выбранная воронка не найдена. Заявки будут перенаправлены в существующую воронку",
                            },
                            errors: { unknown: "Неизвестная ошибка Pipedrive" },
                            instruction:
                                '<ol>\n    <li>Зарегистрируйтесь в <a href="%href%" target="_blank">Pipedrive</a>.</li>\n    <li data-screenshot="step_2">В окне подключения интеграции нажмите <b>Далее</b>. <span class="style-link">Пример</span></li>\n    <li data-screenshot="step_3">Войдите в свой аккаунт Pipedrive. <span class="style-link">Пример</span></li>\n    <li data-screenshot="step_4">Нажмите <b>Разрешить</b>. Если вы уже авторизованы, нажмите <b>Продолжить в приложении</b>. <span class="style-link">Пример</span></li>\n    <li data-screenshot="step_5">В окне интеграции укажите, во что конвертировать заявки. Если в сделки, тогда выберите воронку продаж. <span class="style-link">Пример</span></li>\n        <li data-screenshot="step_6">Укажите, нужно ли передавать UTM-метки, и нажмите <b>Подключить</b>. <span class="style-link">Пример</span></li>\n</ol>',
                            lead: "Лиды",
                            sales_funnel: "Воронка продаж",
                            script_label: "Конвертировать заявки в",
                            subtitle: "Инструмент управления процессом продаж",
                            title: "Pipedrive",
                            url: "https://www.pipedrive.com/",
                        },
                        sendpulse: {
                            error: {
                                already_in_use: "Имя книги уже занято",
                                no_such_email: "Email адрес не найден",
                                no_such_sender:
                                    "Интеграция отключена. Указанный отправитель недоступен",
                            },
                            errors: {
                                authentication_failed:
                                    "Неверные данные авторизации. Интеграция отключена",
                                badly_formed_data:
                                    "Интеграция отключена. Укажите актуальные данные при новом подключении. \nЕсли вы указывали API-ключ письма подтверждения, то проверьте его актуальность",
                                book_not_found:
                                    "Адресная книга не найдена. Интеграция SendPulse отключена",
                                query_limit_exceeded:
                                    "Превышен лимит обращений к сервису SendPulse. Возможна задержка в доставке данных",
                                service_unavailable:
                                    "Сервис SendPulse недоступен. Возможна задержка в доставке данных",
                                token_expired: "Ключ доступа истек",
                                unknown: "Неизвестная ошибка SendPulse",
                            },
                        },
                        title: "CRM системы",
                        utm: {
                            contacts_option: "В контакты",
                            deals_option: "В сделки",
                            no_option: "Не передавать",
                        },
                        utm_label: "Передавать UTM-метки",
                    },
                    domain_mailing: {
                        add_button: "Добавить %field%-запись",
                        connect_button: "Подключить почту",
                        connect_service_title: "Выберите почтовый сервис",
                        custom: {
                            connect:
                                "Для использования другого почтового сервиса необходимо указать его MX-записи",
                        },
                        custom_mail: {
                            subtitle:
                                "Вы можете использовать любой почтовый сервис",
                            title: "Другой сервис",
                        },
                        default: {
                            connect:
                                "При подключении сервиса для вашего домена будут настроены MX-серверы и SPF-запись для корректной работы.",
                            settings: {
                                address_server: { title: "Адрес сервера" },
                                dkim: { title: "DKIM-записи" },
                                mx: { title: "MX-записи" },
                                priority: { title: "Приоритет" },
                                spf: { title: "SPF-запись" },
                                subdomain: { title: "Поддомен" },
                                value: { title: "Значение" },
                            },
                        },
                        domain_inactive_desc:
                            "Почту можно создать после подключения домена",
                        domain_inactive_title: "Домен не работает",
                        domain_title: "Почта для %domain%",
                        google_suite: {
                            description:
                                '<div class="text">\n    <a href="https://gsuite.google.ru/products/gmail/" target="_blank">Google Workspace</a> позволит вам использовать почту вида имя@вашдомен.ru через интерфейс почты Gmail.\n</div>\n\n<div class="text">\n    Данная интеграция установит DNS-записи (MX и SPF) вашего домена для работы почты Google Workspace.\n</div>\n\n<div class="note">\n    Данный сервис является платным (от 6$/мес. за пользователя).\n</div>',
                            instruction:
                                '<div class="text">\n    Мы настроили DNS-записи (MX и SPF) вашего домена для работы с Google Workspace.\n</div>\n\n<div class="text">\nДальнейшие шаги:\n</div>\n\n<ol>\n    <li>\n        Добавьте свой домен в <a href="https://gsuite.google.ru/products/gmail/" target="_blank">Google Workspace</a>.\n    </li>\n    \n    <li>\n        Выберите способ подтверждения домена через <b>мета-тег</b>.\n    </li>\n    \n    <li>\n        Скопируйте мета-тег на странице настройки Google Workspace (пример: <span class="flexbe-text text-danger">&lt;meta name="google-site-verification" content="QEc1CoW2Yiac-oW8cB" /&gt;</span>).\n    </li>\n    \n    <li>\n        Вставьте его в разделе <a href="/admin/settings/verify/" target="_blank">Подтверждение прав</a>.\n    </li>\n    \n    <li>\n        Вернитесь в Google Workspace и нажмите <b>Проверить домен и настройки почты</b> или <b>Подтвердить</b>.\n    </li>\n    \n    <li>\n        Настройка завершена. По окончанию проверки вы сможете создавать почтовые ящики в Google Workspace.\n    </li>\n</ol>\n\n<div class="note">\n    Подтверждение прав может занять до двух суток. По окончанию проверки вы можете удалить мета-тег из раздела <b>Подтверждение прав</b>.\n</div>',
                            subtitle: "Почта Gmail с адресом вашего домена",
                            title: "Google Workspace",
                        },
                        goto_domains_button: "Подключить домен",
                        mailru: {
                            description:
                                '<div class="text">\nИнтеграция с <a href="https://biz.mail.ru/mail/" target="_blank">Mail.ru для бизнеса</a> позволит вам использовать почту вида имя@вашдомен.ru через интерфейс почты Mail.ru.\n</div>\n\n<div class="text">\n    Данная интеграция установит DNS-записи (MX и SPF) вашего домена для работы Mail.ru для бизнеса.\n</div>\n\n<div class="note">\n    Данный сервис является бесплатным.\n</div>',
                            instruction:
                                '<div class="text">\nМы настроили DNS-записи (MX и SPF) вашего домена для работы с Mail.ru для бизнеса.\n</div>\n\n<div class="text">\nДальнейшие шаги:\n</div>\n\n<ol>\n    <li>\n        Добавьте свой домен на <a href="https://biz.mail.ru/mail/" target="_blank">biz.mail.ru</a>.\n    </li>\n    \n    <li>\n        Выберите способ подтверждения домена через <b>мета-тег</b>.\n    </li>\n    \n    <li>\n        Скопируйте мета-тег на странице Mail.ru (пример: <span class="flexbe-text text-danger">&lt;meta name="mailru-domain" content="f7c5yNFUZJ7zmVfc"/&gt;</span>).\n    </li>\n    \n    <li>\n        Вставьте его в разделе <a href="/admin/settings/verify/" target="_blank">Подтверждение прав</a>.\n    </li>\n    \n    <li>\n        Вернитесь в Mail.ru и выберите пункт <b>Подтвердить</b>.\n    </li>\n    \n    <li>\n        Настройка завершена. По окончанию подтверждения прав вы сможете создавать почтовые ящики для домена на Mail.ru.\n    </li>\n</ol>\n\n<div class="note">\n    Подтверждение прав может занять до двух суток. По окончанию проверки вы можете удалить мета-тег из раздела <b>Подтверждение прав</b>.\n</div>',
                            subtitle: "Почта Mail.ru с адресом вашего домена",
                            title: "Mail.ru для бизнеса",
                        },
                        no_domains_desc:
                            "Для создания почтовых ящиков необходимо подключить домен",
                        no_domains_title: "У вас нет подключенных доменов",
                        service_disabled_info: "Почта не подключена",
                        title: "Почта для домена",
                        yandex_connect: {
                            description:
                                '<div class="text">\n<a href="https://360.yandex.ru/business/" target="_blank">Яндекс 360</a> позволит вам использовать почту вида имя@вашдомен.ru через интерфейс Яндекс.Почты.\n</div>\n\n<div class="text">\n    Эта интеграция установит DNS-записи (MX и SPF) вашего домена для работы Яндекс 360.\n</div>\n\n<div class="note">\n    Сервис платный.\n</div>',
                            instruction:
                                '<div class="text">\n    Мы настроили DNS-записи (MX и SPF) вашего домена для работы с Яндекс 360.\n</div>\n\n<div class="text">\nДальнейшие шаги:\n</div>\n\n<ol>\n    <li>\n        Добавьте свой домен на <a href="https://360.yandex.ru/business/" target="_blank">Яндекс 360</a>.\n    </li>\n    \n    <li>\n        Выберите способ подтверждения домена через <b>мета-тег</b>.\n    </li>\n    \n    <li>\n        Скопируйте мета-тег на странице Яндекс 360 (пример: <span class="flexbe-text text-danger">&lt;meta name="yandex-verification" content="b2378cc1a46b07c0" /&gt;</span>).\n    </li>\n    \n    <li>\n        Вставьте его в разделе <a href="/admin/settings/verify/" target="_blank">Подтверждение прав</a>.\n    </li>\n    \n    <li>\n        Вернитесь в Яндекс и нажмите <b>Проверить</b>.\n    </li>\n    \n    <li>\n        Настройка завершена. По окончанию проверки вы сможете создавать почтовые ящики в Яндекс 360.\n    </li>\n</ol>\n\n<div class="note">\n    Подтверждение прав может занять до двух суток. По окончанию проверки вы можете удалить мета-тег из раздела <b>Подтверждение прав</b>.\n</div>',
                            subtitle: "Яндекс Почта с адресом вашего домена",
                            title: "Яндекс 360",
                        },
                    },
                    errors: {
                        domain_not_found: "Домен не найден",
                        invalid_credentials: "Некорректные данные авторизации",
                        invalid_url: "Некорректный URL",
                    },
                    errors_resolved: {
                        client: "Работа интеграции возобновлена",
                        default: "Заявки были успешно отправлены",
                        service: "Сервис снова доступен",
                    },
                    export_applications: { title: "Экспорт заявок" },
                    instance_error: "Ошибка",
                    mailing: {
                        add_button: "Добавить интеграцию",
                        connect_service_title: "Добавить интеграцию",
                        empty_select_label: "Не выбран",
                        errors: {
                            list_name_already_taken:
                                "Данное название списка уже занято",
                        },
                        getresponse: {
                            "360_toggle": "Я использую GetResponse360",
                            description:
                                "GetResponse — это платформа для email-маркетинга. В ней можно создавать базы потенциальных клиентов, существующих клиентов и партнеров, чтобы в дальнейшем развивать с ними отношения и увеличивать базу лояльных и прибыльных клиентов.",
                            enter_list_name_label:
                                "Введите идентификатор нового списка контактов",
                            instruction:
                                '<ol>\n<li>Зарегистрируйтесь в <a href="%href%" target="_blank">GetResponse</a>.</li>\n<li data-screenshot="step_2">Откройте меню и перейдите в раздел <b>Интеграции & API</b>. <span class="style-link">Пример</span></li>\n<li data-screenshot="step_3">Перейдите в <b>API</b> и нажмите на кнопку <b>Создать ключ API</b>. <span class="style-link">Пример</span></li>\n<li data-screenshot="step_4">В открывшемся окне нажмите на кнопку <b>Создать</b>. <span class="style-link">Пример</span></li>\n<li>Скопируйте API-ключ.</li>\n<li>Вернитесь в ваш аккаунт на Flexbe и вставьте скопированный ключ в поле <b>Ключ доступа к API</b> для GetResponse.</li>\n</ol>',
                            subtitle:
                                "Комплексная платформа интернет-маркетинга",
                            title: "GetResponse",
                            url: "https://www.getresponse.ru",
                        },
                        key_label: "Ключ доступа API",
                        list_label: "Список контактов",
                        select_list_label: "Выберите список контактов",
                        sendpulse: {
                            add_new: "Создать новую",
                            book_list_label: "Выберете адресную книгу",
                            client_id: "ID",
                            client_secret: "Secret",
                            description:
                                "Платформа автоматизации многоканального маркетинга c email, web push, SMS и чат-ботами для Facebook, Telegram, WhatsApp и Instagram — все объединено в бесплатную CRM",
                            double_opt_in: "С подтверждением от посетителя",
                            enter_list_name_label:
                                "Введите название новой адресной книги",
                            instruction:
                                '<ol>\n    <li>Зарегистрируйтесь в <a href="%href%" target="_blank">SendPulse</a>.</li>\n    <li data-screenshot="step_2">Перейдите в свой профиль — Настройки аккаунта — вкладка <b>API</b>. <span class="style-link">Пример</span></li>\n    <li data-screenshot="step_3">Скопируйте значения полей ID и Secret, вставьте их в соответствующие поля в форме настройки интеграции Flexbe и нажмите <b>Далее</b>. <span class="style-link">Пример</span></li>\n    <li data-screenshot="step_4">В открывшемся окне выберите список контактов и способ добавления контактов в книгу:</li>\n<ol type="a">\n    <li data-screenshot="step_4">При выборе «Без подтверждения от посетителя» нажмите на кнопку <b>Подключить</b>. <span class="style-link">Пример</span></li>\n    <li data-screenshot="step_5"> При выборе «С подтверждением от посетителя» укажите также отправителя и письмо подтверждения. Если письмо по умолчанию вам не подходит, отключите данную настройку и укажите ID шаблона подходящего письма. Затем нажмите <b>Подключить</b>. <span class="style-link">Пример</span></li>\n</ol>\n</ol>',
                            method_label: "Способ добавления контакта в книгу",
                            method_tips:
                                "Условие, при котором контакт добавляется в адресную книгу.\nПри выборе «Без подтверждения от посетителя» контакт добавляется автоматически.\nПри выборе «С подтверждением от посетителя» контакт добавляется только после того, как пользователь подтвердит свое согласие на получение рассылки",
                            sender_list_label: "Выберете отправителя",
                            single_opt_in: "Без подтверждения от посетителя",
                            subtitle:
                                "Единая платформа для маркетинга и продаж",
                            template_id_label: "ID шаблона письма",
                            template_id_tips:
                                "Для получения ID шаблона письма перейдите в свой личный кабинет SendPulse — Настройки сервиса — Инструменты подписки — Письма подтверждения. ID шаблона указан под названием каждого из шаблонов",
                            template_label: "Письмо подтверждения",
                            template_title:
                                "Использовать письмо «По умолчанию»",
                            title: "SendPulse",
                            url: "https://sendpulse.com/",
                        },
                        title: "Сервисы рассылок",
                        unisender: {
                            confirmation_tip:
                                "При включении пользователям будет приходить письмо-подтверждение со ссылкой — пользователь должен нажать на ссылку, чтобы получать письма.",
                            description:
                                "Unisender &mdash; это сервис email и СМС-маркетинга. С помощью данного сервиса можно создать автоматические цепочки писем и настроить транзакционные письма. Сервис содержит базу знаний и больше 100 бесплатных шаблонов писем.",
                            enter_list_name_label:
                                "Введите название нового списка контактов",
                            error: {
                                api_disabled: "API Unisender отключён",
                                forbidden: "Доступ в API Unisender запрещён",
                                list_confirmation_not_configured:
                                    "В выбранном списке контактов не настроено письмо-подтверждение подписки",
                                wrong_contacts: "Список контактов не найден",
                            },
                            instruction:
                                '<ol>\n<li>Зарегистрируйтесь в <a href="%href%" target="_blank">Unisender</a>.</li>\n<li data-screenshot="step_2">Раскройте список, нажав на стрелку, справа от вашего email и выберите <b>Настройка аккаунта</b>. <span class="style-link">Пример</span></li>\n<li data-screenshot="step_3">В настройках аккаунта откройте <b>Интеграция и API</b>. <span class="style-link">Пример</span></li>\n<li data-screenshot="step_4">Нажмите на <b>Показать полностью</b>. <span class="style-link">Пример</span></li>\n<li>В открывшемся окне введите пароль от вашего аккаунта в Unisender и нажмите на кнопку <b>Отправить</b>.</li>\n<li>Скопируйте API-ключ.</li>\n<li>Вернитесь в ваш аккаунт на Flexbe и вставьте скопированный ключ в поле <b>Ключ доступа к API</b> для Unisender.</li>\n</ol>',
                            send_confirmation:
                                "Отправлять письмо-подтверждение подписки",
                            subtitle: "Сервис массовых email и СМС рассылок",
                            title: "Unisender",
                            url: "https://www.unisender.com/ru/?a=flexbe",
                        },
                    },
                    unisender: {
                        errors: {
                            bad_api_enabled:
                                "Недостаточно прав или выключен доступ к API",
                            bad_api_key:
                                "Указан неправильный ключ доступа к API",
                            bad_argument:
                                "Значение одного из аргументов метода указано неправильное",
                            bad_method_name: "Имя метода указано неправильно",
                            no_cash: "Не хватает денег на счете Unisender",
                            service_temporary:
                                "Сервис Unisender недоступен. Возможна задержка в доставке данных",
                        },
                    },
                    validation: {
                        field_is_missing: "Обязательное поле",
                        invalid_api_key: "Неверный ключ API",
                        invalid_dkim: "Некорректная DKIM-запись",
                        invalid_mx: "Некорректная MX-запись",
                        invalid_spf: "Некорректная SPF-запись",
                        invalid_url: "Некорректный URL",
                        latin_allowed_characters:
                            "Допустимы буквы латинского алфавита, цифры, дефис и нижнее подчеркивание",
                        max_length: {
                            one: "Максимум %count% символ",
                            few: "Максимум %count% символа",
                            many: "Максимум %count% символов",
                            other: "Максимум %count% символа",
                        },
                        max_number: "Максимальное значение: %count%",
                        min_length: {
                            one: "Минимум %count% символ",
                            few: "Минимум %count% символа",
                            many: "Минимум %count% символов",
                            other: "Минимум %count% символа",
                        },
                        min_number: "Минимальное значение: %count%",
                        not_allowed_characters: "Недопустимые символы",
                        not_blank: "Поле не должно быть пустым",
                        range_number: "Значение должно быть от %min% до %max%",
                    },
                    widgets: {
                        add_button: "Добавить интеграцию",
                        callback_hunter: {
                            subtitle:
                                "Онлайн-сервис обратного звонка для сайта",
                            title: "CallbackHunter",
                            url: "https://callbackhunter.com/",
                        },
                        code_label: "Код виджета",
                        connect_service_title: "Добавить интеграцию",
                        custom_widget: {
                            subtitle: "Вставка своего виджета через HTML-код",
                            title: "Другой виджет",
                        },
                        jivo_site: {
                            subtitle: "Онлайн-чат с посетителями вашего сайта",
                            title: "JivoSite",
                            url: "https://www.jivo.ru/?partner_id=3718&pricelist_id=1105&lang=ru",
                        },
                        position: {
                            body_option: "Перед </body>",
                            head_option: "Перед </head>",
                        },
                        position_label: "Место для вставки",
                        talk_me: {
                            subtitle: "Онлайн-чат с посетителями вашего сайта",
                            title: "Talk-Me",
                            url: "https://talk-me.ru/",
                        },
                        title: "Виджеты",
                        title_label: "Название виджета",
                        title_placeholder: "Мой виджет",
                    },
                },
                lead: {
                    actions: {
                        confirm_cancel: {
                            cancel: "Пропустить",
                            confirm: "Вернуть на склад",
                            error_text:
                                "Количество товаров в заказе: %count% шт.",
                            title: "Возврат товаров",
                        },
                        delete: "Удалить",
                        mark_read: "Отметить просмотренной",
                        mark_unread: "Отметить непросмотренной",
                        title: "Выберите действие",
                    },
                    column: {
                        contact: "Контакт",
                        customer: "Имя клиента",
                        date: "Дата",
                        form: "Форма",
                        items_total_price: "Сумма товаров",
                        name: "Имя",
                        notes: "Заметки",
                        page: "Страница",
                        pay_method: "Способ оплаты",
                        pay_status: "Статус оплаты",
                        pay_sum: "Сумма оплаты",
                        pay_time: "Время оплаты",
                        payment: "Оплата",
                        phone: "Телефон",
                        products: "Товары",
                        promotion_code: "Промокод",
                        promotion_discount_amount: "Сумма скидки",
                        promotion_promo_code_amount:
                            "Сумма скидки по промокоду",
                        status: "Статус",
                        time: "Время",
                        url: "Адрес страницы",
                    },
                    default_form_name: "Заявка",
                    delivery: {
                        price: "Стоимость доставки",
                        title: "Доставка",
                    },
                    export: {
                        desc: "Экспорт заявок с активным фильтром по статусу",
                        desc_filter: "Экспорт заявок с выбранными фильтрами",
                        download: "Скачать",
                        file_done: "Файл %fileName% готов к выгрузке",
                        file_error: "Ошибка загрузки",
                        file_progress: "В процессе",
                        file_success: "Файл готов к скачиванию",
                        last_export: "Экспорт за последние 24 часа",
                        lead_count: {
                            one: "%count% заявка",
                            few: "%count% заявки",
                            many: "%count% заявок",
                            other: "%count% заявки",
                        },
                        tip: "Экспорт заявок",
                        title: "Экспорт",
                        to_csv: "Текстовый формат (CSV)",
                        to_xls: "Microsoft Excel (XLSX)",
                    },
                    list: {
                        changes_saved: "Изменения применены",
                        empty: "У вас еще нет заявок",
                        filter: {
                            amount: "Сумма",
                            apply: "Применить",
                            client_email: "Email",
                            client_email_placeholder: "example@site.com",
                            client_name: "Имя клиента",
                            client_name_placeholder: "Иван Иванов",
                            client_phone: "Телефон",
                            client_phone_placeholder: "+7 (999) 111-22-22",
                            date: "Дата",
                            dropping: "Сброс",
                            lead_status: { name: "Статус" },
                            name: "Фильтр",
                            number: "№ заявки",
                            number_amount: { from: "От", to: "До" },
                            payment_status: {
                                error: "Ошибка оплаты",
                                name: "Оплата",
                                not_need: "Не требуется",
                                paid: "Оплачена",
                                wait: "Ожидает оплаты",
                            },
                            read: {
                                name: "Просмотр",
                                not_viewed: "Не просмотрена",
                                viewed: "Просмотрена",
                            },
                            reset: "Сбросить фильтр",
                            sorting: {
                                name: "Сортировка",
                                not_chosen: "Не выбрано",
                            },
                            tip: {
                                contains: "Содержит",
                                empty: "Не указан",
                                equal: "Равно",
                                not_contains: "Не содержит",
                                range: "В диапазоне",
                            },
                            title: "Фильтр заявок",
                        },
                        loading: "Загрузка заявок",
                        not_found: "Заявки не найдены",
                        title: "Заявки",
                    },
                    pay: {
                        status: { done: "Оплачен", wait: "Ожидает оплаты" },
                    },
                    products: {
                        add_button: "Выбрать из каталога",
                        add_hand_button: "Добавить произвольный товар",
                        add_product_button: "Добавить товар",
                        add_reserve: "Зарезервировать товары",
                        article: "Артикул",
                        available: "Доступно",
                        available_error_tip: "В наличии: %count% шт.",
                        checkbox_value_no: "Нет",
                        checkbox_value_yes: "Да",
                        count_error_tip:
                            "Зарезервировано %count% шт. <br>До полного резерва не хватает %needed% шт.",
                        detele_product_tip: "Товар удален",
                        email_placeholder: "example@site.com",
                        fail_not_upload_value: "Не загружен",
                        image_label: "Фото",
                        in_total_label: "Итого",
                        item_name: "Наименование",
                        name_placeholder: "Иван Иванов",
                        pagination: "%page% из %pages%",
                        pcs: "шт.",
                        phone_placeholder: "+7 (999) 111-22-22",
                        price_error: "Цена изменилась",
                        price_error_tip:
                            "Цена товара в заявке отличается от текущей цены на сайте (%value%)",
                        price_label: "Цена",
                        qty_label: "Кол-во",
                        remove_reserve: "Снять резерв",
                        reserve: "Резерв",
                        reserve_icon: {
                            in_reserve_items_tip:
                                "Зарезервировано: %count% шт.",
                            in_reserve_tip: "Зарезервировано: %count% шт.",
                            not_reserved_tip: "Не зарезервирован",
                            unknown_tip:
                                "Резерв доступен только для товаров, добавленных в разделе Товары",
                            unlimited_tip:
                                "Без резерва — неограниченное количество товара на складе",
                            written_off_tip: "Товар списан",
                        },
                        reserve_zero_error_tip:
                            "Резерв не создан — товара нет в наличии",
                        title: "Товары",
                        title_placehodler: "Название товара",
                        update_reserve: "Обновить",
                        update_reserve_tip: {
                            one: "Зарезервировать еще %count% шт. со склада",
                            few: "Зарезервировать еще %count% шт. со склада",
                            many: "Зарезервировать еще %count% шт. со склада",
                            other: "Зарезервировать еще %count% шт. со склада",
                        },
                    },
                    promotion: {
                        add_discount: { title: "Добавление скидки" },
                        add_discount_link: "Добавить скидку",
                        add_promocode: { title: "Добавление промокода" },
                        amount_error: "Промокод применяется от %amount%",
                        amount_more_sum_error:
                            "Сумма скидки не может превышать сумму заказа",
                        default_error: "Не удалось применить промокод",
                        discount: {
                            amount_title: "Размер скидки",
                            title: "Скидка",
                        },
                        edit_discount: { title: "Редактирование скидки" },
                        edit_promocode: { title: "Редактирование промокода" },
                        notfound_error: "Данного промокода не существует",
                        promocode: { title: "Промокод" },
                        promocode_link: "Раздел промокоды",
                        remove_discount: "Удалить скидку",
                        remove_promocode: "Удалить промокод",
                    },
                    sms_notification: {
                        file: "(файл)",
                        light_text: "Новая заявка № %lead_num%",
                    },
                    status: {
                        canceled: "Отменена",
                        completed: "Выполнена",
                        in_progress: "В работе",
                        new: "Новая",
                        removed: "Удалена",
                    },
                    view: {
                        contact_call: "Позвонить",
                        contact_mail: "Написать",
                        contacts_edit_button: "Изменить контакты",
                        device: {
                            android: "Android",
                            desktop: "ПК",
                            iphone: "iPhone",
                            mobile: "Смартфон",
                        },
                        download_file_button: "Скачать файл",
                        notes: {
                            placeholder: "Начните печатать",
                            title: "Заметки",
                        },
                        pagination: {
                            next_lead: "Следующая заявка",
                            prev_lead: "Предыдущая заявка",
                        },
                        pay: {
                            copy_button: "Скопировать",
                            copy_link: "Скопировать ссылку на оплату",
                            copy_title: "Ссылка на оплату",
                            method: "Способ оплаты",
                            not_selected_info: "не выбран",
                            set_status_title: "Задать статус",
                            title: "Оплата",
                            total_title: "К оплате",
                        },
                        source_title: "Источник",
                        total: {
                            delivery: { title: "Доставка" },
                            free_title: "Бесплатно",
                            product: { title: "Товары" },
                            summary: { title: "Итого к оплате" },
                            title: "Итого",
                        },
                        utm: { title: "UTM-метки" },
                    },
                },
                members: {
                    add_user_button: "Добавить пользователя",
                    create: {
                        cant_add_yourself: "Вы уже владелец аккаунта",
                        modal_title: "Новый пользователь",
                    },
                    edit: {
                        created_notify: "Пользователь добавлен",
                        edited_notify: "Настройки изменены",
                        modal_title: "Настройки доступа",
                        projects_fill_error: "Выберите хотя бы один сайт",
                        projects_label: "Доступ к сайтам",
                        projects_select_all: "Выбрать все",
                        user_exist_error:
                            "Пользователь с таким email уже существует",
                    },
                    email_placeholder: "name@company.com",
                    empty_desc:
                        "Приглашайте людей к себе в команду и работайте над вашим сайтом вместе",
                    limit_desc:
                        "Достигнут лимит пользователей для текущего тарифа",
                    list: {
                        project_title: "Сайты",
                        projects_all: "Все сайты",
                        projects_count: {
                            one: "%count% сайт",
                            few: "%count% сайта",
                            many: "%count% сайтов",
                            other: "%count% сайта",
                        },
                        projects_dropdown_title: "Доступ к сайтам",
                        revoke_confirm_title:
                            "Отозвать доступ для пользователя %email%?",
                        role_title: "Роль",
                        user_removed_notify: "Пользователь удален",
                        user_title: "Пользователь",
                    },
                    notallowed_title: "Опция недоступна на вашем тарифе",
                    roles: {
                        admin_desc:
                            "Имеет полный доступ ко всем разделам и сайтам основного аккаунта, может создавать новые сайты",
                        admin_title: "Администратор",
                        editor_desc:
                            "Имеет полный доступ только к конкретным сайтам",
                        editor_title: "Редактор",
                        manager_desc:
                            "Имеет доступ только к заявкам, не может редактировать страницы и настройки сайта",
                        manager_title: "Менеджер",
                        owner_desc:
                            "Имеет полный доступ ко всем разделам и сайтам, может создавать новые сайты, управлять доп. пользователями и оплачивать тариф",
                        owner_title: "Владелец",
                    },
                    title: "Пользователи",
                },
                nps: {
                    done: { title: "Благодарим за оценку!" },
                    mention: {
                        close_button: "Закрыть",
                        comment_placeholder: "Ваш комментарий",
                        submit_button: "Отправить",
                        title: "Можете объяснить свою оценку?",
                    },
                    score: {
                        legend_above_label: "Наверняка да",
                        legend_below_label: "Скорее всего нет",
                        title: "С какой вероятностью вы порекомендуете Flexbe своим друзьям?",
                    },
                },
                pages: {
                    add: {
                        accounting_services: { title: "Бухгалтерское бюро" },
                        barbershop: { title: "Барбершоп" },
                        blank_button: "Пустая страница",
                        candle_shop: { title: "Магазин аромасвечей" },
                        common_blocks_label: "Включить общую шапку и подвал",
                        common_blocks_note:
                            "На созданной странице появятся общая шапка и подвал, одинаковые для всех страниц многостраничного сайта. В уже созданных страницах общие шапку и подвал можно включить в Настройках страницы.",
                        construction: { title: "Ремонт" },
                        delivery: {
                            tip: "Это сайт для оформления доставки еды из ресторанов и продуктов на дом. Есть возможность сделать меню, удобную корзину, выбор способа доставки и оплату прямо на сайте.",
                            title: "Доставка еды",
                        },
                        dental_care: { title: "Стоматологическая клиника" },
                        design_showroom: {
                            title: "Шоурум дизайнерской мебели",
                        },
                        detailing: "Детейлинг",
                        digital_design_studio: {
                            title: "Студия дизайна цифровых продуктов",
                        },
                        empty_page: {
                            tip: "Вариант для тех, любит создавать с нуля. Выбирайте секции, которые подходят под ваши задачи и меняйте их под себя.",
                            title: "Пустой шаблон",
                        },
                        english_school: "Школа английского языка",
                        flower_delivery: { title: "Цветочная студия" },
                        gallery: { title: "Галерея современного искусства" },
                        home_cleaning: { title: "Клининговая компания" },
                        homepage: "Главная страница",
                        interior_design_studio: "Студия дизайна интерьера",
                        kart_racing: { title: "Картинг клуб" },
                        kitchen_designs: {
                            title: "Дизайнерские кухни на заказ",
                        },
                        landing: {
                            tip: "Страница, которая ведет клиента к целевому действию: заполнить заявку, оставить контакты, забронировать место. Лендинги предназначены для направления посетителей с рекламы и имеют высокую конверсию.",
                            title: "Лендинг",
                        },
                        law_office: { title: "Услуги адвоката" },
                        logistics_company: { title: "Логистическая компания" },
                        one_screen_label: "Один экран",
                        park_hotel: { title: "Парк-отель «Лахта»" },
                        pottery_studio: { title: "Студия керамики" },
                        preview_back_button: "Назад",
                        preview_select_button: "Выбрать шаблон",
                        psychologist: "Портфолио психолога",
                        quiz: {
                            tip: "Страница, состоящая только из квиза, на которую можно направлять рекламу. Квиз — это многошаговая интерактивная форма, которую легко заполнять. Квизы нравятся посетителям и поэтому имеют высокую конверсию. Также квиз можно добавить отдельной секцией или всплывающей формой в любой тип сайта",
                            title: "Квиз",
                        },
                        restaurant: { title: "Ресторан" },
                        select_button: "Выбрать",
                        show_button: "Смотреть",
                        store: { title: "Интернет-магазин: Каталог" },
                        store_homepage: { title: "Интернет-магазин: Главная" },
                        surf_school: { title: "Школа сёрфинга" },
                        template_name_title: "Шаблон",
                        templates_title: "Выберите шаблон",
                        tennis_school: "Школа большого тенниса",
                        theme_old_title: "Шаблоны предыдущих версий",
                        theme_title: "Выберите шаблон",
                        title_new: "Создать страницу",
                        type_landing: "Лендинг",
                        type_website: "Страница сайта",
                        village: { title: "Коттеджный поселок" },
                        walking_tours: { title: "Экскурсионное агентство" },
                        website: { title: "Сайт" },
                        yoga_studio: { title: "Студия йоги" },
                    },
                    add_folder_button: "Создать папку",
                    add_page_button: "Создать страницу",
                    analytics: { tip: "Посетители" },
                    common: {
                        lang_label: "Язык страницы",
                        main_lang: "Основной язык сайта",
                        title_label: "Заголовок страницы",
                        uri_label: "Адрес страницы",
                    },
                    copy: {
                        create_project_button: "Создать новый сайт",
                        current_project: "Текущий сайт",
                        other_project_button: "Выбрать сайт",
                        project_label: "Сайт",
                        select_project_title: "Выберите сайт",
                        selected_button: "Выбрано",
                        title: "Дублировать страницу",
                    },
                    count: {
                        one: "%count% страница",
                        few: "%count% страницы",
                        many: "%count% страниц",
                        other: "%count% страницы",
                    },
                    delete: {
                        success_notify: "Страница удалена",
                        text: "Действие невозможно отменить",
                        text_content:
                            "Посетители больше не смогут переходить на эту страницу.",
                        title: "Удалить страницу?",
                        toggle_text: "Создать редирект на главную страницу",
                    },
                    dropdown: {
                        add_folder: "Создать папку",
                        copy_link: {
                            link: "Копировать ссылку",
                            success: "Ссылка скопирована",
                        },
                        delete_page: "Удалить",
                        make_homepage: "Сделать главной",
                        move_to_folder: "Переместить в папку",
                        remove_from_folder: "Убрать из папки",
                        settings: "Настроить",
                    },
                    "empty-history": {
                        desc: "Здесь отображается история сохранений страницы за последние 30 дней",
                        title: "Нет сохранений",
                    },
                    empty_title: "Заголовок не указан",
                    error: {
                        main_uri_change_error:
                            "Нельзя менять URL главной страницы",
                        uri_exist: "Адрес занят",
                    },
                    folder: {
                        add: {
                            default_name: "Новая папка",
                            name_label: "Название папки",
                            success_notify: "Папка создана",
                            title: "Создать папку",
                        },
                        delete: {
                            success_notify: "Папка удалена",
                            text: {
                                one: 'Удалить <span class="flexbe-text text-s text-medium">%count% страницу</span>, содержащуюся в папке',
                                few: 'Удалить <span class="flexbe-text text-s text-medium">%count% страницы</span>, содержащиеся в папке',
                                many: 'Удалить <span class="flexbe-text text-s text-medium"> %count% страниц</span>, содержащихся в папке',
                                other: 'Удалить <span class="flexbe-text text-s text-medium"> %count% страницы</span>, содержащиеся в папке',
                            },
                            title: "Удалить папку %name%?",
                        },
                        empty: "В этой папке нет страниц",
                        error_folder_exist:
                            "Папка с таким названием уже существует",
                        error_name_required: "Введите название папки",
                        success_move_notify: "Страница перемещена",
                    },
                    homepage: {
                        changed_notify: "Главная страница изменена",
                        confirm: {
                            text: "Прежняя главная страница будет перемещена на адрес",
                            title: "Выбранная страница станет главной",
                        },
                    },
                    leads: { tip: "Заявки" },
                    restore: {
                        history_empty: "Нет сохранений",
                        text: "Вы можете восстановить состояние страницы за последние 30 дней",
                        title: "История сохранений",
                        version_text: "Восстановить версию страницы от %date%",
                    },
                    settings: {
                        additional: { title: "Дополнительно" },
                        background: {
                            color_fields_title: "Базовый фон страницы",
                            position_field_title: "Прижать к точке",
                            repeat_field_title: "Замостить",
                            repeat_none: "Отключено",
                            repeat_x: "По горизонтали",
                            repeat_xy: "По вертикали и горизонтали",
                            repeat_y: "По вертикали",
                            settings_modal_title: "Настройки фона",
                            size_auto: "Оригинальный",
                            size_contain: "Вписать",
                            size_cover: "Растянуть",
                            size_field_title: "Размер изображения",
                            toggle_fixed_title: "Зафикcировать при скролле",
                            toggle_title: "Настроить базовый фон страницы",
                            toggle_title_tip:
                                "Базовый фон страницы отображается под фоном секции",
                        },
                        base: {
                            common_blocks_label:
                                "Использовать общую шапку и подвал",
                            common_blocks_note:
                                "Позволяет объединить несколько страниц общими шапкой и подвалом. Это позволит создать полноценный сайт",
                            lang_note:
                                'Изменить основной язык сайта можно в разделе <a href="%href%" target="_blank">Настройки</a>',
                            make_homepage: "Сделать главной",
                            title: "Основные",
                            title_error: "Укажите заголовок страницы",
                            title_note:
                                "Отображается в названии вкладки браузера и в результатах поисковых систем",
                            uri_changed:
                                'Адрес страницы изменился. <a href="%href%" target="_blank" class="flexbe-button borderless style-text opaque is-primary">Создайте правило</a> редиректа, чтобы перенаправлять посетителей.',
                            uri_have_redirect:
                                "С этой страницы настроен редирект",
                            uri_homepage_warn:
                                "Текущая главная страница будет перемещена на адрес: %domain%/%page%",
                            uri_note: "URI адрес страницы, например /about/",
                            uri_redirect_link: "Перейти в раздел",
                            uri_reserved_error: "Адрес страницы зарезервирован",
                        },
                        code: { title: "Вставка кода" },
                        seo: {
                            error_meta_tag: "Нельзя использовать HTML теги",
                            meta_desc_label: "SEO описание (meta-description)",
                            meta_desc_note:
                                "Отображается в результатах поисковых систем под ссылкой (не всегда)",
                            meta_keywords_label:
                                "SEO ключевые слова (meta-keywords)",
                            meta_keywords_note:
                                "Через запятую, на данный момент все поисковики игнорируют этот мета-тег",
                            meta_keywords_toggle: "Добавить meta-keywords",
                            meta_keywords_toggle_tip:
                                "Мета-тег, который на данный момент игнорируют все поисковики",
                            noindex_toggle:
                                "Запретить индексацию страницы поисковыми системами",
                        },
                        social: {
                            desc_label: "Описание",
                            desc_note:
                                "Пара предложений о вашей компании или продукте, о том что вы предлагаете",
                            info_title:
                                "Так будет выглядеть ссылка на вашу страницу, когда кто-то поделится ей в социальных сетях",
                            title: "Социальные сети",
                            title_label: "Заголовок",
                            title_note:
                                "Краткий заголовок страницы, будет использован при вставке ссылки в соцсетях",
                            upload_button: "Загрузить",
                            upload_default_image_tip:
                                "В качестве изображения используется скриншот первого экрана",
                            upload_image_size: "1200 x 630 px",
                            upload_note:
                                'Если Facebook показывает неверное изображение или описание,\nоткройте <a href="%uri%" target="_blank">Facebook Debugger</a> и нажмите «Повторить скраппинг»',
                            upload_title:
                                "Отображение в соц сетях и мессенджерах",
                        },
                        title: "Настройки страницы",
                        widgets: {
                            code_body_help_text:
                                'Для вставки кода на все страницы сайта перейдите в раздел <a target="_blank" href="/admin/settings/code/">Настройки — Вставка кода</a>',
                            code_body_title: "Вставка кода перед </body>",
                            code_head_title: "Вставка кода перед </head>",
                            disable_responsive_label:
                                "Отключить адаптивный дизайн",
                            enable_bullets: "Включить буллеты",
                            enable_bullets_tip:
                                "Буллеты отображаются в правой части экрана и могут использоваться для быстрой навигации по разделам сайта.",
                            show_code: "Вставка кода на страницу",
                            show_code_tip:
                                "Для вставки кода на сайт перейдите в общие настройки сайта",
                            temporary_code:
                                "Функционал добавления кода на страницу теперь находится на панели редактора в новом разделе <b>Код</b>",
                        },
                    },
                    title: "Страницы",
                },
                plans: { price_per_site: "сайт" },
                projects: {
                    add: {
                        draft_label: "Создать как черновик",
                        name_title: "Название сайта",
                        title: "Создать сайт",
                    },
                    add_button: "Создать сайт",
                    bill: {
                        draft: {
                            desc: "Переносимый сайт добавится на аккаунт как черновик и не будет учитываться в тарифах",
                            title: "Перенести в черновики",
                        },
                        replace: {
                            desc: "Перенести в черновики текущий сайт и добавить %domain%  на ваш аккаунт",
                            title: "Вместо существующего",
                        },
                        upgrade: {
                            desc: "Вы сможете публиковать больше сайтов",
                            title: "Повысить тариф",
                        },
                    },
                    delete: {
                        confirmation_text:
                            "Введите код %group_id% для подтверждения",
                        error_confirmation: "Неверный код",
                        success_notify: "Сайт удален",
                        title: "Удалить сайт %domain%",
                    },
                    domain_not_connected_state: "Домен не подключен",
                    draft: {
                        desc: "Черновики — сайты, которые скрыты от посетителей и не учитываются в лимите сайтов",
                    },
                    dropdown: {
                        analytics: "Аналитика",
                        connect_domain: "Подключить домен",
                        ecommerce: "Товары",
                        leads: "Заявки",
                        make_draft: "Перенести в черновики",
                        pages: "Страницы",
                        payment: "Оплата",
                        refuse_access_menu: "Отказаться от доступа",
                        remove_from_draft: "Опубликовать сайт",
                        remove_project_menu: "Удалить",
                        settings: "Настройки",
                        transfer: "Передать сайт",
                    },
                    empty: {
                        info_text:
                            "Новые сайты можно создавать только в последней версии конструктора",
                        sub_text_trial:
                            "и начать 14 дней нового пробного периода",
                        text: "Мы хранили ваш сайт 12 месяцев после блокировки. Теперь он удален.<br>\nВы можете создать новый сайт и продолжить работу.",
                        text_trial:
                            "Мы хранили ваш сайт 2 месяца после блокировки. Теперь он удален.<br>\nВы можете создать новый сайт и продолжить работу.",
                        title: "Ваш сайт уже удален",
                    },
                    epmty: {
                        draft: { title: "У вас еще нет черновиков" },
                        publised: {
                            desc: "Опубликованные сайты доступны для посетителей и учитываются в лимите сайтов",
                            title: "У вас еще нет опубликованных сайтов",
                        },
                    },
                    filters: {
                        sort: {
                            create: { title: "По дате создания" },
                            domain: { title: "По домену" },
                            name: { title: "По названию" },
                            update: { title: "По дате обновления" },
                        },
                        type: {
                            all: { title: "Все" },
                            drafts: { title: "Черновики" },
                            published: { title: "Опубликованные" },
                        },
                        view: {
                            grid: { tip: "Сетка" },
                            table: { tip: "Таблица" },
                        },
                    },
                    leads_legend: {
                        one: "%count% заявка",
                        few: "%count% заявки",
                        many: "%count% заявок",
                        other: "%count% заявки",
                    },
                    list: {
                        column: {
                            domain: "Домен",
                            last_save: "Последнее сохранение",
                            name: "Название",
                        },
                    },
                    make_draft: {
                        confirm_button: "Перенести в черновики",
                        desc: "Доступ на сайт будет ограничен паролем. Черновики не учитываются в лимите сайтов",
                        short_title: "Перенести сайт в черновики?",
                        success_toast: "Сайт перенесен в черновики",
                        title: "Перенести %domain% в черновики?",
                    },
                    name: { placeholder: "Укажите название сайта" },
                    old_versions_title: "Предыдущие версии конструктора",
                    refuse_access: {
                        button: "Отказаться",
                        success_notify: "Доступ к сайту отменен",
                        title: "Отказаться от доступа?",
                    },
                    remove_from_draft: {
                        confirm_button: "Опубликовать",
                        desc: "Сайт станет доступен для посетителей и будет учитываться в лимите сайтов",
                        short_title: "Опубликовать сайт?",
                        success_toast: "Сайт опубликован",
                        title: "Опубликовать сайт %domain%?",
                    },
                    search: {
                        not_found: {
                            desc: 'По запросу "%search%" нет совпадений',
                            title: "Ничего не найдено",
                        },
                        placeholer: "Поиск по адресу или названию",
                    },
                    shared: { role_tip: "Ваша роль: %role%" },
                    shared_title: "Совместный доступ",
                    tag: {
                        draft: "Черновик",
                        drafts: "Черновики",
                        published: "Опубликован",
                        sites: "Сайты",
                    },
                    title: "Сайты",
                    transfer: {
                        acceptance: {
                            desc: "Чтобы завершить перенос сайта на ваш аккаунт, подтвердите свое согласие",
                            title: "Передача сайта %domain%",
                        },
                        cancel: "Заявка на перенос отменена",
                        cancel_confirm: {
                            tip: "Передача сайта отменена",
                            title: "Вы уверены, что хотите отменить перенос сайта %domain%?",
                        },
                        confirm_button: "Подтвердить перенос",
                        email_desc: "Ожидает подтверждения от %email%",
                        email_error: "Некорректный адрес электронной почты",
                        email_label:
                            "Email аккаунта, на который хотите передать сайт",
                        email_placeholder: "example@site.com",
                        error: {
                            limit: "Не удалось перенести сайт. Достигнут лимит сайтов",
                        },
                        in_progress_text: "В процессе переноса",
                        incoming_title:
                            "Сайт в процессе переноса на ваш аккаунт",
                        info: "Перенос сайта на неоплаченный аккаунт временно не поддерживается",
                        method: {
                            desc: "Выберите способ переноса сайта на ваш аккаунт",
                            title: {
                                one: 'Тариф "%tariff%" позволяет опубликовать %count% сайт',
                                few: 'Тариф "%tariff%" позволяет опубликовать %count% сайта',
                                many: 'Тариф "%tariff%" позволяет опубликовать %count% сайтов',
                                other: 'Тариф "%tariff%" позволяет опубликовать %count% сайта',
                            },
                        },
                        submitted_title:
                            "Сайт в процессе переноса на другой аккаунт",
                        text: "Ожидает подтверждения от <br> %email%",
                        title: "Передача сайта на другой аккаунт",
                    },
                },
                save_text: {
                    saved_notify: "Сохранено",
                    saving_notify: "Сохранение",
                },
                select_product: {
                    add_button_tip: "Добавить товар",
                    category: { all_products: "Все товары" },
                    connect: "Связать товар",
                    delete_all: "Удалить всё",
                    link_in_product: "Перейти к карточке товара",
                    not_available: "Нет в наличии",
                    not_limited: "Неограниченно",
                    not_products: "Нет товаров",
                    not_search: "Товары не найдены",
                    not_selected: "Нет выбранных товаров",
                    quantity: "%count% шт.",
                    quantity_variants: {
                        one: "%count% вариант",
                        few: "%count% варианта",
                        many: "%count% вариантов",
                        other: "%count% варианта",
                    },
                    recently_chosen_tip: "Недавно выбирали",
                    search_count: "Найдено: %count%",
                    search_products: "Поиск товаров",
                    selected: "Выбрано",
                    title: "Добавление товаров",
                },
                service: {
                    not_found_desc:
                        'Возникла проблема? <a data-command="support">Напишите нам в чат</a>',
                    not_found_title: "Страница не найдена",
                    something_wrong_desc:
                        'Попробуйте обновить страницу через несколько минут. Если ничего не помогает — <a data-command="support">напишите нам</a>',
                    something_wrong_title: "Уппс! Что-то пошло не так",
                },
                settings: {
                    access: {
                        access_grant_notify: "Доступ предоставлен",
                        access_revoke_notify: "Доступ отозван",
                        admin_access_warning:
                            "Администратор имеет доступ ко всем сайтам аккаунта",
                        desc: "Черновики и сайты с техническими адресами закрыты для публичного просмотра",
                        title: "Доступ к сайту",
                        user_control_button: "Управление пользователями",
                    },
                    access_code: { title: "Код доступа" },
                    ai: {
                        context: {
                            audience_placeholder:
                                "Состоятельные любители изысканных блюд, туристы и местные жители, стремящиеся к качественному обслуживанию и уникальному гастрономическому опыту. Пары, ищущие романтическую атмосферу",
                            audience_title: "Целевая аудитория",
                            goal_placeholder:
                                "Показать наше меню и привлечь гостей в заведение",
                            goal_title: "Задача вашего сайта",
                            product_placeholder:
                                "Ресторан высокой кухни на берегу Балтийского моря, который предлагает изысканные блюда и премиальный сервис",
                            product_title: "Расскажите о вашем бизнесе",
                        },
                        title: "Настройки AI",
                    },
                    animate: { title: "Анимация страницы" },
                    animate_block: {
                        descr: {
                            style_fade_in: "Прозрачность",
                            style_off: "Без эффекта",
                            style_slide_up: "Сдвиг вверх",
                        },
                        note: "Плавная анимация появления секций при прокрутке страницы. Применяется ко всем страницам сайта.",
                        title: "Анимация появления секций",
                    },
                    antispam: { title: "Защита от спама" },
                    api: {
                        desc: "Программный интерфейс для работы с платформой",
                        desc_documentation_link:
                            '<a href="https://help.flexbe.ru/api-documentation/" target="_blank">Документация</a>',
                        key: {
                            key_label: "API ключ",
                            reset_button: "Сгенерировать новый",
                            title: "Ключ доступа API",
                            url_label: "URL адрес для запросов",
                        },
                        reset: {
                            success_notify: "Ключ изменён",
                            text: "Все приложения и скрипты, использующие API, потеряют к нему доступ",
                            title: "Сбросить ключ API?",
                        },
                        webhook: {
                            add_button: "Добавить webhook",
                            empty_desc:
                                "Добавьте webhook для отправки уведомлений о новых событиях",
                            title: "Webhook для уведомлений о новых событиях",
                        },
                    },
                    apps: {
                        amocrm: {
                            account_address: "Адрес аккаунта",
                            accounting_system_of_customers_and_deals:
                                "<h2>Система учета клиентов и сделок для отдела продаж.</h2>\n<h4>Преимущества:</h4>\n<ul class='features'>\n<li>Понятный интерфейс</li>\n    <li>Не требует установки и настройки</li>\n    <li>Есть приложения для iOS и Android</li>\n    <li>14-дневный пробный период</li>\n</ul>\n<h4>Основные модули:</h4>\n<ul>\n    <li>Сделки и контакты</li>\n    <li>Задачи и напоминания</li>\n    <li>Воронка продаж</li>\n    <li>Анализ продаж и отчеты</li>\n    <li>KPI и план продаж</li>\n    <li>Бизнес-процессы</li>\n    <li>Скоринг</li>\n</ul>\n<a target='_blank' href='http://www.amocrm.ru/main/flexbe/'>amocrm.ru</a>",
                            amocrm: "amoCRM",
                            amocrm_data_for_connection:
                                "Данные для подключения amoCRM:",
                            api_key_is_too_old:
                                '<a target="_blank" href="https://%domain%.amocrm.ru/settings/dev/">API-ключ</a> устарел',
                            api_key_label: "API-ключ",
                            app_was_turned_off:
                                '<a href="http://%domain%/admin/apps/amocrm/">Приложение amoCRM</a> отключено, <a href="http://%domain%/admin/apps/amocrm/?install=1">проверьте настройки</a>',
                            crm: "CRM система",
                            in_deals: "В сделки",
                            insufficient_rights_to_create_transaction:
                                "Недостаточно прав для создания сделки",
                            it_was_not_possible_to_send_an_application_to_amocrm:
                                "Не получилось отправить заявку в amoCRM",
                            login: "Логин",
                            no_account_yet: "Нет аккаунта?",
                            not_for_transfer: "Не передавать",
                            perhaps_you_have_not_paid_your_amo_crm_account:
                                'Возможно, <a target="_blank" href="https://%domain%.amocrm.ru">вы не оплатили аккаунт amoCRM</a>',
                            please_provide_a_valid_api_key_for_amo_crm:
                                "Укажите корректный API-ключ для amoCRM",
                            register_button: "Зарегистрировать",
                            security_settings_of_the_amocrm_account_enabled_filtering_access_to_api:
                                'В <a target="_blank" href="https://%domain%.amocrm.ru/settings/security/">настройках безопасности</a> аккаунта amocrm включена фильтрация доступа к API по "белому списку IP адресов"',
                            specify_the_api_key_for_amocrm:
                                "Укажите API-ключ для amoCRM",
                            specify_the_correct_login_email_in_amocrm:
                                "Укажите корректный логин (email) в amoCRM",
                            specify_the_domain_for_amocrm:
                                "Укажите домен в amoCRM",
                            specify_the_login_email_in_amo_crm:
                                "Укажите логин (email) в amoCRM",
                            to_contacts: "В контакты",
                            transfer_utm_tags: "Передавать UTM-метки",
                            user: "У пользователя",
                            wrong_account_adress: "- неверный адрес аккаунта.",
                            wrong_login_or_api_key:
                                'Неверный логин или <a target="_blank" href="https://%domain%.amocrm.ru/settings/dev/">API-ключ</a>',
                        },
                        apps: "Приложения",
                        auth: {
                            no_email: "Отсутствует email",
                            no_password: "Отсутствует пароль",
                            no_user_is_registered_with_this_email_address:
                                "Пользователь с таким email адресом не зарегистрирован",
                            wrong_password: "Неверный пароль",
                        },
                        bitrix24: {
                            attachment: "приложение",
                            be_sure_you_have_admin_access:
                                '<a target="_blank" class="user-profile-link disabled" href="https://%{domain}/company/personal/user/">Убедитесь</a> что у вас <a href="%{app_url}assets/help_admin.jpg" class="modal-img-link">статус администратора</a> на портале, необходимый для установки приложений.',
                            bitrix24: "Битрикс24",
                            bitrix24_link: "Адрес портала Битрикс24",
                            blank_address: "Пустой адрес",
                            checkapi_has_not_passed: "checkApi - не прошёл",
                            complete_set_of_tools_for_organizing_the_work_of_the_company:
                                "<h2>Полный комплект инструментов для организации работы компании:<br>\nCRM, управление задачами, бизнес-процессы, чат, почта, телефония и т.д.</h2>\n\n<h4>Преимущества:</h4>\n<ul class='features'>\n    <li>Все инструменты в одном месте</li>\n    <li>Есть приложения для iOS/Android, а так же Windows, Mac и Linux</li>\n    <li>Можно использовать в облаке или установить на свой сервер коробочную версию</li>\n    <li>Есть бесплатный тариф (до 12 пользователей)</li>\n</ul>\n\n<p>\n    <i>\n        * Наше приложение взаимодействует с системой Битрикс24 только в рамках модуля CRM\n    </i>\n</p>\n\n<a target='_blank' href='https://www.bitrix24.ru/?p=1419136'>bitrix24.ru</a>",
                            crm: "CRM система",
                            enter_address_and_click_install_button:
                                "Введите адрес и нажмите кнопку Установить",
                            error_connecting_to_the_portal_try_to_repeat_step_1_to_3:
                                "Ошибка соединения с порталом. Попробуйте повторить шаги 1–3",
                            error_invalid_token_or_address_of_portal:
                                "Ошибка: неверный токен или адрес портала",
                            i_could_not_add_a_lead:
                                "Не получилось добавить лид",
                            install_app: "Установить приложение",
                            it_did_not_send_the_request_to_bitrix24:
                                "Не получилось отправить заявку в Битрикс24",
                            please: "Пожалуйста",
                            portal_not_found_perhaps_you_were_sealed_in_the_address:
                                "Портал не найден. Возможно вы опечатались в адресе",
                            reconnect: "подключите повторно",
                            send_utm_tags: "Отправлять UTM-метки",
                            update_access_token: "Обновляем access_token",
                        },
                        callbackhunter: {
                            and_paste_it_to_the_field_below:
                                "и вставьте в поле ниже.",
                            callback_service:
                                "<h2>Сервис обратного звонка</h2>\n<p>Виджет предлагает посетителю автоматический звонок менеджера за 8 секунд.</p>",
                            callback_widget: "Виджет обратного звонка",
                            callbackhunter: "CallbackHunter",
                            callbackhunter_html_code:
                                "Код виджета CallbackHunter:",
                            copy_received_code: "Скопируйте полученный код",
                            register_and_follow_instructions:
                                '<a href="http://callbackhunter.com/free/flexbe" target="_blank">Зарегистрируйтесь</a> и следуйте инструкции.',
                        },
                        canceled: "Отменена",
                        categories: {
                            crm: "CRM системы",
                            installed_apps: "Установленные приложения",
                            mailing_services: "Сервисы рассылок",
                            notifications: "Уведомления",
                            other: "Прочее",
                            widgets: "Виджеты",
                        },
                        completed: "Выполнена",
                        example_button: "Пример",
                        failed_to_load_data: "Не удалось загрузить данные",
                        freshoffice: {
                            api_key_setup: "Настройка ключа API:",
                            copy_id_and_paste_here:
                                'Перейдите в <a href="https://go.myfreshcloud.com/" target="_blank">FreshOffice</a> кликните по иконке Cервис -> Подключение к API.<br> Скопируйте &laquo;ID&raquo; и вставьте сюда.',
                            copy_password_and_paste_here:
                                'Перейдите в <a href="https://go.myfreshcloud.com/" target="_blank">FreshOffice</a> кликните по иконке Cервис -> Подключение к API.<br> Скопируйте &laquo;Пароль&raquo; и вставьте сюда.',
                            crm: "Экспорт заявок",
                            freshoffice: "FreshOffice",
                            lead_num: "Заявка № %num%",
                            project_management_and_customer_relationship_management_system:
                                "<h2>Система управление проектами и взаимоотношениями с клиентами.</h2>\n\n<p>FreshOffice это комплекс сервисов для улучшения эффективности бизнеса, включая СRM, управление проектами и документами, механизмы сделок, финансовый архив, IP-телефонию, отчёты, KPI для сотрудников, хранилище, чат и кабинеты для клиентов.</p>\n\n<h4>Преимущества:</h4>\n<ul class='features'>\n    <li>Встроенные Email-рассылки</li>\n    <li>Можно пользоваться с мобильного телефона или планшета (есть приложения под iOS и android)</li>\n    <li>Имеется 15-дневная пробная версия</li>\n</ul>\n\n<h4>Основные модули:</h4>\n<ul>\n    <li>\n        <b>CRM</b>&nbsp;— база клиентов, включающая историю взаимодействия с&nbsp;ними, личные кабинеты для них с&nbsp;разными уровнями доступа.\n    </li>\n    <li>\n        <b>Задачи</b>&nbsp;— механизм для планирования действий с&nbsp;напоминаниями, циклами задач и&nbsp;шаблонами.\n    </li>\n    <li>\n        <b>Сделки</b>&nbsp;— открытые сделки, ожидаемая выручка и&nbsp;сумма закрытых сделок.\n    </li>\n    <li>\n        <b>Воронка продаж</b>&nbsp;— конструктор для контроля за&nbsp;процессом продажи и&nbsp;корректировки курса.\n    </li>\n    <li>\n        <b>Показатели</b>&nbsp;— выполненные задачи, баланс приходов и&nbsp;расходов и&nbsp;развёрнутая аналитика.\n    </li>\n    <li>\n        <b>Документы</b>&nbsp;— инструмент документооборота с&nbsp;договорами, накладными, счетами позволяет управлять шаблонами и&nbsp;отслеживать статусы бумаг.\n    </li>\n    <li>\n        <b>Финансы</b>&nbsp;— управление потоками денег с&nbsp;балансом счетов и&nbsp;бюджетированием.\n    </li>\n    <li>\n        <b>Телефония</b>&nbsp;— подключен VoIP-телефон с&nbsp;функциями обычного телефона без нужды в&nbsp;интеграции, работает с&nbsp;любыми АТС и&nbsp;имеется управление колл-центром.\n    </li>\n    <li>\n        <b>Аналитика</b>&nbsp;— позволяет вести подробную статистику по&nbsp;различным действиям, контролируя эффективность и&nbsp;отслеживая процесс в&nbsp;реальном времени.\n    </li>\n    <li>\n        <b>Рассылка</b>&nbsp;— работа с&nbsp;Email-рассылками с&nbsp;фильтрами и&nbsp;настройками, в&nbsp;том числе персональных обращений.\n    </li>\n    <li>\n        <b>Процессы</b>&nbsp;— контроль за&nbsp;циклами задач для построения и&nbsp;автоматизации бизнес-процессов: поставки, логистика, подготовка заказов.\n    </li>\n    <li>\n        <b>Сообщения</b>&nbsp;— обмен мгновенными сообщениями внутри компании, уведомления о&nbsp;важных событиях.\n    </li>\n    <li>\n        <b>Интеграция с&nbsp;Email</b>&nbsp;— работа с&nbsp;Gmail, Yahoo, iCloud, Outlook и&nbsp;др.\n    </li>\n</ul>\n\n<a target='_blank' href='www.freshoffice.ru'>freshoffice.ru</a>",
                        },
                        from_the_site_domain: "с сайта %domain%",
                        get_response: {
                            could_not_determine_campaign_id:
                                "Не удалось определить id кампании",
                            length_of_the_api_key_must_be_32_characters:
                                "Длина API-ключа должна быть 32 символа",
                            no_customer_email_address:
                                "Нет email-адреса клиента",
                        },
                        in_progress: "В работе",
                        incorrect_response_from_unsplash_api:
                            "Некорректный ответ Unsplash API",
                        invalid_token: "Неверный токен",
                        jivosite: {
                            jivosite: "JivoSite",
                            jivosite_html_code: "Код виджета JivoSite:",
                            live_chat: "Онлайн-чат с посетителями",
                            live_chat_with_visitor:
                                "<h2>Онлайн-чат с посетителем</h2>\n<p>\n    JivoSite позволяет вам общаться в чате с посетителями вашего сайта.<br>\n    Приложения для операторов под Windows, Mac, iOS, Android.<br>\n    Есть бесплатный тариф.\n</p>",
                            sign_up_and_follow_instructions:
                                '<a href="https://www.jivo.ru/?partner_id=3718&pricelist_id=1105&lang=ru" target="_blank">Зарегистрируйтесь</a> и следуйте инструкции.',
                        },
                        lead: {
                            lead_not_found: "Заявка не найдена",
                            mandatory_parameter_id_is_not_specified_for_method_lead:
                                "Не указан обязательный параметр id для метода lead/get",
                        },
                        method_not_found: "Метод не найден",
                        new: "Новая",
                        no_login_and_password_token:
                            "Отсутствует токен логин и пароль",
                        off: "Отключить",
                        off_process: "Отключение...",
                        product: "Продукт № %i%",
                        removed: "Удалена",
                        rub: "р.",
                        settings_tab: "Настройки",
                        slack: {
                            channel_for_notifications: "Канал для уведомлений",
                            comment: "Комментарий",
                            created_by: "Создан",
                            data_for_slack_connection:
                                "Данные для подключения Slack:",
                            edit: "Редактировать",
                            i_could_not_send_notification_to_slack:
                                "Не получилось отправить уведомление в Slack",
                            invoice_for_payment: "счёт на оплату",
                            lead_from_page: "Заявка со страницы",
                            new_lead: "Новая заявка № %lead_num%",
                            notification_of_applications_and_fees:
                                "Уведомления о заявках и оплатах",
                            notifications_in_slack:
                                "<h2>Уведомления в Slack</h2>\n<p>\nПриложение отправляет уведомления о новых заявках и оплатах в корпоративный мессенджер <a target='_blank' href='http://www.slack.com'>slack</a>.\n<br>\nМожно настроить отправку уведомлений как в общий канал, так и персонально участнику.\n</p>",
                            payment_for_lead: "Оплата заявки № %lead_num%",
                            problems_with_payment_of_lead_account:
                                "Проблемы с оплатой счёта заявки № %lead_num%",
                            slack: "Slack",
                            slack_was_disabled:
                                '<a href="/admin/apps/slack/">Приложение Slack</a> отключено',
                            status: "Статус",
                            sum: "Сумма",
                            test_payment_by_lead:
                                "Тестовый платёж по заявке № %lead_num%",
                            time_of_creation: "Время создания",
                            token: "Токен",
                            token_in_settings_is_not_valid:
                                '<a target="_blank" href="/admin/apps/slack/?install=1"> В настройках</a> указан неверный токен',
                        },
                        token: {
                            mandatory_parameter_push_token_is_not_specified:
                                "Не указан обязательный параметр push_token",
                        },
                        view: {
                            connect_button: "Подключить",
                            connection_tab: "Подключение",
                            description_label: "Описание",
                            developed_by: "Разработано",
                            screenshots: "Скриншоты",
                        },
                    },
                    captcha_helper:
                        "reCAPTCHA — сервис, направленный на выявление ботов среди посетителей сайта. \nЕсли сервис считает посетителя ботом, то посетителю предлагается пройти короткий тест (выбрать картинки, изображающие определённый объект)",
                    captcha_policy: {
                        enable_label:
                            "Показывать предупреждение об использовании reCAPTCHA под формами",
                        ru_note:
                            'Если вы используете reCAPTCHA на вашем сайте, то вы должны разместить предупреждение об использовании и разместить ссылки на <a href="https://policies.google.com/privacy" target="_blank">Политику конфиденциальности</a> и <a href="https://policies.google.com/terms" target="_blank">Условия использования</a> Google.',
                    },
                    captcha_toggle:
                        "Включить проверку reCAPTCHA в формах заявок и квизах",
                    captcha_ttl_interval_label:
                        "Время, за которое поступает повторная заявка",
                    captcha_ttl_label: "Выберите, когда включить reCAPTCHA:",
                    captcha_ttl_off_option: "Для всех заявок",
                    captcha_ttl_off_option_tip:
                        "Сервис распознавания ботов работает при заполнении каждой заявки",
                    captcha_ttl_on_option:
                        "Только для повторных заявок с одного IP-адреса",
                    captcha_ttl_on_option_tip:
                        "Сервис распознавания ботов запускается при поступлении повторной заявки с одного IP-адреса в течение выбранного времени",
                    captcha_visibility: {
                        invisible_option: "Невидимая reCAPTCHA",
                        invisible_option_tip:
                            "Посетитель видит reCAPTCHA только при подозрении, что он бот. В этом случае reCAPTCHA предлагает найти определенный объект на картинках.",
                        visible_option: "Видимая reCAPTCHA",
                        visible_option_tip:
                            "Каждому посетителю сайта будет предложено поставить галочку «Я не робот».\nВ горизонтальных формах заявок или с включенной опцией «Только для повторных заявок с одного IP-адреса» поле «Я не робот» отображается в отдельном окне после отправки формы.",
                    },
                    captcha_visibility_label: "Выберите вид reCAPTCHA:",
                    code: {
                        desc: "В целях безопасности данный код не загружается в режиме редактирования и доступен только в режиме предпросмотра",
                        footer_label: "Перед закрывающим тегом </body>",
                        header_label: "Перед закрывающим тегом </head>",
                        title: "Вставка кода",
                        wrong_code_error: "Исправьте ошибки перед сохранением",
                    },
                    cookies: {
                        base_text_button: "Принять",
                        base_text_link: "Подробнее",
                        descr: {
                            "style_centre-compact": "По центру (компактный)",
                            "style_centre-long": "На всю ширину",
                            style_right: "Правый нижний угол",
                            title: "Стиль уведомления",
                        },
                        enable_label:
                            "Показывать уведомление об использовании cookie",
                        intercept_cookies: {
                            label: "Не устанавливать cookies до получения согласия",
                            tip: "При входе на сайт будут установлены только обязательные cookies для работы сайта. Дополнительные cookies (аналитика, реклама и другие) будут установлены только после получения согласия. Согласие считается \nполученным при продолжении использования сайта (скролл страницы, клик по кнопке, переход на другую страницу и другое взаимодействие с сайтом), закрытии окна уведомления или нажатии кнопки согласия.",
                        },
                        long_text_notification:
                            "Мы используем файлы cookie, чтобы улучшить работу сайта. Продолжая использовать этот сайт, вы соглашаетесь с использованием cookie-файлов.",
                        note: "Cookie (куки) — это небольшие текстовые файлы, в которые браузер записывает данные с посещенных вами сайтов. Файлы cookie позволяют сайтам «запоминать» своих посетителей, например, чтобы каждый раз не переспрашивать их логин и пароль.",
                        notify_text_label: "Изменить текст уведомления",
                        notify_text_title: "Текст уведомления",
                        page_policy_title: "Страница Cookies policy",
                        policy_label:
                            "Показывать ссылку на страницу Cookie Policy",
                        short_text_notification:
                            "Мы используем файлы cookie, чтобы улучшить работу сайта.",
                        text_button_title: "Текст кнопки",
                        text_link_title: "Текст ссылки",
                        title: "Уведомление об использовании cookie",
                    },
                    delivery: { title: "Доставка" },
                    ecommerce: {
                        auto_reserve: {
                            actions: {
                                never: "Отключить автоматическое резервирование",
                                on_create: "При поступлении заказа",
                                on_create_tip:
                                    "Товары в заявке резервируются сразу после оформления заказа (и становятся недоступными для заказа другими клиентами). В заявке доступно ручное снятие резерва с товаров",
                                on_done: "При выполнении заказа",
                                on_done_tip:
                                    "Товары в заявке резервируются при изменении статуса заявки на Выполнена. Для статусов Новая и В работе доступно ручное резервирование товаров",
                            },
                            subtitle: "Автоматически резервировать товары",
                        },
                        cart: {
                            auto_open_label:
                                "Автоматически открывать корзину при добавлении первого товара",
                            min_total_input_label: "Минимальная сумма заказа",
                            min_total_label:
                                "Включить минимальную сумму заказа",
                            min_total_tip:
                                "Минимальная сумма заказа, до которой оформление заказа в корзине будет недоступно",
                            promocode: {
                                error_start_date_less:
                                    "Дата начала должна быть раньше даты окончания",
                            },
                            promotion: {
                                error_length:
                                    "Длина поля превышает %s. Нынешняя длинна %s",
                            },
                            subtitle: "Корзина и заказ",
                            title: "Общие настройки",
                        },
                        discounts: {
                            empty_list_text:
                                "Добавьте в корзину скидку от определенной суммы заказа",
                            title: "Скидки",
                        },
                        enable_reserve: {
                            tip: "Резерв – это списание заказанных товаров со склада. В заявке будет доступно ручное резервирование товара. Также можно настроить автоматический резерв при поступлении или выполнении заказа",
                            title: "Использовать резерв товаров при работе с заявками",
                        },
                        failed_save_toast: "Не удалось сохранить изменения",
                        out_of_stock: {
                            actions: {
                                allow_preorder:
                                    "Отображать на сайте и разрешить заказывать",
                                forbid_preorder:
                                    "Отображать на сайте, но запретить заказывать",
                                hide: "Скрыть с сайта",
                            },
                            subtitle: "При отсутствии товара",
                        },
                        promo: {
                            add_discount_button: "Добавить скидку",
                            add_promocode_button: "Добавить промокод",
                            discount: {
                                created_notice: "Скидка создана",
                                remove_confirm_title:
                                    "Удалить скидку %amount%?",
                                remove_notice: "Скидка удалена",
                            },
                            edit: {
                                active: {
                                    discount_label: "Отключить скидку",
                                    promocode_label: "Отключить промокод",
                                },
                                active_from: {
                                    label: "Применять для заказов от",
                                    title: "Сумма заказа",
                                },
                                active_from_error_tip:
                                    "Минимальная сумма заказа не должна быть меньше размера скидки",
                                amount: {
                                    label: "Размер скидки",
                                    title: "Размер скидки",
                                },
                                comment: {
                                    discount_placeholder: "Скидка на заказ",
                                    discount_tip:
                                        "Данный комментарий отображается после применения скидки в корзине",
                                    label: "Комментарий для клиентов",
                                    promocode_placeholder:
                                        "Скидка по промокоду",
                                    promocode_tip:
                                        "Данный комментарий отображается после применения промокода в корзине",
                                },
                                date: { placeholder: "ДД.ММ.ГГГГ" },
                                date_error_tip: "Некорректный диапазон дат",
                                date_from: { label: "Дата начала действия" },
                                date_to: { label: "Дата окончания действия" },
                                date_to_error_tip: "Выбрана старая дата",
                                delivery_free: {
                                    label: "Добавить бесплатную доставку",
                                },
                                discount_title: "Добавить скидку",
                                limit: {
                                    label: "Ограничить количество использований",
                                    placeholder: "шт",
                                },
                                promocode: {
                                    label: "Промокод",
                                    placeholder: "UP200",
                                    tip: "Можно использовать буквы русского или английского алфавитов, цифры, а также точки (.), дефисы (-) и нижние подчеркивания (_). Регистр не учитывается",
                                },
                                promocode_generate: "Сгенерировать",
                                promocode_title: "Добавить промокод",
                                time_error_tip: "Некорректный диапазон времени",
                                type: {
                                    discount_label: "Тип скидки",
                                    promocode_label: "Тип промокода",
                                },
                                type_delivery: { title: "Бесплатная доставка" },
                                type_money: { title: "Скидка в %currency%" },
                                type_percent: { title: "Скидка в %" },
                                usage_with_discount: {
                                    label: "Разрешить применять промокод с другими скидками",
                                },
                            },
                            edit_button: "Редактировать",
                            limit_exceeded_messege:
                                "Достигнут лимит скидок и промокодов (%count% шт.)",
                            promocode: {
                                created_notice: "Промокод создан",
                                remove_confirm_title:
                                    "Удалить промокод «%name%»?",
                                remove_notice: "Промокод удален",
                            },
                            promocode_lang_error:
                                "Лучше использовать буквы только одного алфавита",
                            promocode_unique_error:
                                "Данный промокод уже существует",
                            remove_button: "Удалить",
                            status: {
                                active: {
                                    discount_date: "Активна до %date%",
                                    discount_text: "Активна",
                                    number: "Активен  (%number% шт.)",
                                    promocode_date: "Активен до %date%",
                                    promocode_number_date:
                                        "Активен  (%number% шт.) до %date%",
                                    promocode_text: "Активен",
                                },
                                discount_disabled: "Отключена",
                                expired: {
                                    number: "Осталось 0 шт.",
                                    text: "Истек срок",
                                },
                                planed: "Планируется с %date%",
                                promocode_disabled: "Отключен",
                                title: "Статус",
                            },
                            usage_with_disocunts_tip:
                                "Промокод может использоваться с другими скидками",
                        },
                        promocode: {
                            add_method_button: "Добавить промокод",
                            empty_list_text:
                                "Добавьте в корзину промокод на скидку",
                            title: "Промокоды",
                        },
                        reserve: { subtitle: "Резерв товаров" },
                        save_button: "Сохранить изменения",
                        saved_notice: "Изменения применены",
                        shipping: {
                            add_method_button: "Добавить способ",
                            add_modal_title: "Добавить способ доставки",
                            courier_address_field: "Адрес доставки",
                            courier_comment_field: "Комментарий курьеру",
                            courier_time_field: "Время доставки",
                            courier_type_title: "Курьером",
                            created_notice: "Способ доставки создан",
                            desc: "Для отображения способов доставки добавьте поле «Доставка» в форму заказа в корзине",
                            disabled_label: "Отключен",
                            disabled_tip:
                                "Способ доставки отключен и не будет отображаться для посетителей",
                            edit: {
                                add_button: "Добавить способ",
                                desc_label: "Описание",
                                desc_placeholder:
                                    "Доставка работает с 10:00 до 21:00",
                                enabled_label: "Включить способ доставки",
                                fields_tip:
                                    "Поля будут отображаться в корзине при выборе этого способа доставки",
                                fields_title: "Данные для доставки",
                                free_price_label: "Бесплатно от",
                                free_price_tip:
                                    "Минимальная сумма заказа для бесплатной доставки. Необязательное поле",
                                min_total_error:
                                    "Минимальная сумма для данного способа доставки должна превышать минимальную сумму заказа в корзине. Данная настройка будет проигнорирована.",
                                min_total_label: "Минимальная сумма заказа",
                                min_total_tip:
                                    "Данный способ доставки будет доступен для заказов от указанной суммы",
                                not_fix_price_label:
                                    "Стоимость доставки не фиксирована",
                                not_fix_price_placeholder: "Не фиксирована",
                                not_fix_price_tip:
                                    "Опция нужна, если стоимость доставки рассчитывается индивидуально, и вы не можете сразу сказать клиенту точную сумму",
                                price_label: "Стоимость доставки",
                                price_optional: "Опционально",
                                save_button: "Сохранить изменения",
                                title_label: "Название",
                                title_placeholder: "Доставка на дом",
                            },
                            edit_method_button: "Редактировать",
                            edit_modal_title: "Способ доставки",
                            empty_list_text:
                                "Вы ещё не добавили ни один способ доставки",
                            free_from_price: "бесплатно от %price%",
                            free_price_label: "Бесплатно",
                            header_price: "Стоимость",
                            header_title: "Название",
                            min_total_error_tip:
                                "Минимальная сумма для данного способа доставки должна превышать минимальную сумму заказа в корзине. Данная настройка будет проигнорирована.",
                            min_total_label: "От %min_total%",
                            not_fix_price_label: "Не фиксирована",
                            other_type_title: "Другой вариант",
                            pickup_type_title: "Самовывоз",
                            remove_confirm_title:
                                "Удалить способ доставки «%name%»?",
                            remove_method_button: "Удалить",
                            remove_notice: "Способ доставки удален",
                            saved_notice: "Изменения применены",
                            select_type_label: "Выберите способ доставки",
                            title: "Способы доставки",
                            warn_advance: "Предупредить о приезде заранее",
                        },
                        statuses: {
                            in_stock: {
                                in_stock: "В наличии",
                                items_in_stock: "В наличии: 5 шт.",
                                none: "Не отображать статус",
                                title: "При наличии товара",
                            },
                            out_of_stock: {
                                in_stock: "В наличии",
                                none: "Не отображать статус",
                                out_of_stock: "Нет в наличии",
                                preorder: "Под заказ",
                                title: "При отсутствии товара",
                            },
                            subtitle: "Индикация товара на сайте",
                            zero_price: {
                                free: "Отображать «Бесплатно»",
                                title: "При нулевой цене товара",
                                zero: "Отображать «0»",
                            },
                        },
                        title: "Магазин",
                    },
                    favicon: {
                        format_note:
                            "Размер иконки: 192×192 px | Формат: PNG, SVG",
                        title: "Иконка favicon",
                    },
                    fonts: {
                        add_font_button: "Загрузить шрифт",
                        edit: {
                            add_modal_title: "Загрузить шрифт",
                            copy_css_tip: "Копировать для использования в CSS",
                            edit_modal_title: "Изменение шрифта",
                            font_name_empty_error: "Укажите название шрифта",
                            font_name_exist_error:
                                "Шрифт с таким именем уже существует",
                            font_name_label: "Название шрифта",
                            font_name_placeholder: "Например: Afjat Trends",
                            font_name_tip:
                                "Только латинские буквы, цифры, пробелы и символы «-» или «_». \nНазвание используется в качестве CSS свойства font-family: 'Font Name'.",
                            upload: "Загрузить",
                            upload_error_toast: "Ошибка при загрузке шрифта",
                            upload_font_disclaimer:
                                "Рекомендуем использовать формат WOFF2. Также поддерживаются форматы WOFF, TTF и OTF.",
                            upload_more: "Загрузить ещё",
                        },
                        edit_font_button: "Настроить",
                        empty_list_text: "У вас еще нет загруженных шрифтов",
                        fonts_set_description: "Body, Mind, and Soul",
                        fonts_sets_title: "Стили",
                        fonts_use_warning_text:
                            "Использование большого количества шрифтов может замедлить загрузку сайта",
                        my_fonts_title: "Мои шрифты",
                        remove_font_title: "Удалить шрифт %name%?",
                        title: "Шрифты",
                    },
                    general: { title: "Общие" },
                    image: {
                        conversion: {
                            avif_tip:
                                "Самый современный формат сжатия изображений.\nВ среднем изображение в AVIF меньше на 45% при том же уровне качества.\nВерсия изображения в AVIF отдается в случае если браузер поддерживает данную технологию.\nПримерно 65% браузеров поддерживают AVIF, в остальных случаях будет отдаваться WEBP, JPEG или PNG.",
                            extension_speed_desc: "Меньше на %percent%%",
                            extension_tip:
                                "Размер изображения 1920 x 1280<br>Сжатие с качеством %value%%",
                            extension_toggle:
                                "Конвертация изображений в %extension%",
                            low_speed_tip:
                                "Отключение опций «Конвертация изображений в WEBP» \nи «Конвертация изображений в AVIF» снижает скорость загрузки сайта",
                            title: "Современные форматы сжатия",
                            webp_tip:
                                "Современный формат сжатия изображений.\nВ среднем изображение в WEBP меньше на 30% при том же уровне качества.\nВерсия изображения в WEBP отдается в случае, если браузер поддерживает данную технологию.\n95% браузеров поддерживают WEBP, в остальных случаях будет загружен JPEG или PNG.",
                        },
                        desc: "Flexbe выполняет все современные оптимизации автоматически.<br>Рекомендуем загружать изображения в оригинальном качестве (предварительно не сжимая).",
                        loading: {
                            lazy_desc:
                                "При отложенной загрузке сайт отображается быстрее. До загрузки изображения отображается превью. Первыми загружаются видимые на экране изображения, остальные изображения загружаются при скролле страницы.",
                            lazy_low_speed_tip:
                                "Отключение опции «Отложенная загрузка изображений \n(Lazy Loading)» существенно снижает скорость загрузки сайта",
                            lazy_priority_desc:
                                "Загружать изображения при свободных ресурсах браузера, не дожидаясь скролла страницы. Это ускоряет отображение страницы при скролле, но потребляет больше трафика.",
                            lazy_priority_toggle: "Загрузка в фоновом режиме",
                            lazy_toggle:
                                "Отложенная загрузка изображений (Lazy Loading)",
                        },
                        placeholder: {
                            effect_blur_label: "Размытое изображение",
                            effect_blur_tip:
                                "Размытое изображение повторяет контуры и цвета настоящего изображения. Плейсхолдер грузится моментально, его размер в сотни (иногда в тысячи) раз меньше оригинала.",
                            effect_color_label: "Средний цвет",
                            effect_color_tip:
                                "Специальный алгоритм проанализирует изображение и подберет наиболее удачный цвет для заглушки",
                            effect_none_label: "Отключено",
                            title: "Плейсхолдер до загрузки изображения",
                        },
                        quality: {
                            desc: "Размер файлов изображений напрямую влияет на скорость загрузки сайта",
                            high_button: "Высокое",
                            highest_button: "Очень высокое",
                            low_button: "Ниже среднего",
                            low_speed_tip:
                                "Максимальное качество изображений \nснижает скорость загрузки сайта",
                            medium_button: "Среднее",
                            network_desc:
                                "Если у посетителя сайта медленный интернет, то будет загружена облегченная версия изображения, чтобы не снижать скорость загрузки сайта.",
                            network_toggle:
                                "Оптимизация изображений для медленного интернета",
                            title: "Качество изображений",
                            ultra_button: "Максимальное",
                        },
                        title: "Изображения",
                    },
                    integrations: {
                        wrong_html_error: "Исправьте ошибки перед сохранением",
                    },
                    legal: { title: "Персональные данные" },
                    localization: {
                        country_tip:
                            "Определяет расположение серверов, формат дат, телефонов и т.д.",
                        currency_symbol_label: "Символ валюты",
                        currency_tip:
                            "Используется в списке заявок, корзине и приеме платежей",
                        error: {
                            change_currency:
                                "Для смены валюты необходимо отключить интеграции с платежными системами",
                        },
                        language_tip:
                            "Перевод сайта (кнопок, подписи, ошибки) на язык аудитории",
                        timezone_tip: "Часовой пояс основной аудитории сайта",
                        title: "Язык и страна сайта",
                    },
                    mail: {
                        connect_button: "Подключить почту",
                        connect_service_title: "Выберите почтовый сервис",
                        domain_inactive_desc:
                            "Почту можно будет создать после подключения домена",
                        domain_inactive_title: "Домен не работает",
                        domain_title: "Почта для %domain%",
                        goto_domains_button: "Подключить домен",
                        mail_antispam: {
                            delivery_problems_tip:
                                "Проблемы с доставкой писем на указанный адрес",
                            rejects_incoming_tip:
                                "Почтовый сервер отклоняет входящие письма",
                            spam_tip: "Наши письма были отмечены как спам",
                            wrong_dns_mx_tip:
                                "На указанном домене не настроен почтовый сервер (отсутствуют MX-записи)",
                        },
                        no_domains_desc:
                            "Для создания почтовых ящиков необходимо подключить домен",
                        service_disabled_info: "Почта не подключена",
                        service_instruction_tab: "Как подключить",
                        title: "Почта для домена",
                        yapdd: {
                            connecting_text:
                                "Подключение Яндекс.Почты для домена",
                        },
                    },
                    "mail:service_desc_tab": "Описание",
                    menu: {
                        access: "Доступ к сайту",
                        api: "API",
                        apps: "Приложения",
                        code: "Вставка кода",
                        counters: "Аналитика",
                        crm: "CRM системы",
                        delivery: "Доставка",
                        domain: "Домены",
                        ecommerce: "Магазин",
                        email: "Почта для домена",
                        export_applications: "Экспорт заявок",
                        fonts: "Шрифты",
                        fonts_copy: "Шрифты",
                        general: "Общие",
                        group_basic_title: "Основные",
                        group_ecommerce_title: "Магазин",
                        group_integration_title: "Интеграции",
                        legal: "Персональные данные",
                        mailing: "Сервисы рассылок",
                        notification_visitor: "Письма клиентам",
                        notify: "Уведомления",
                        optimization: "Оптимизация скорости",
                        payments: "Прием платежей",
                        promocode: "Скидки и промокоды",
                        redirects: "Редиректы",
                        robots_txt: "Файл robots.txt",
                        title: "Настройки",
                        verify: "Подтверждение прав",
                        widgets: "Виджеты",
                    },
                    notification_visitor: {
                        desc: "Уведомления нужны для того, чтобы клиент имел возможность вспомнить все детали заказа, например, состав заказа и сроки доставки. Для получения уведомлений клиент должен указать свой email в окне оформления заказа",
                        fake_data: {
                            product_first: { title: "Товар 1" },
                            product_second: { title: "Товар 2" },
                        },
                        letter: {
                            lead: "При оформлении заявки",
                            order: "При оформлении заказа",
                            payment: "После оплаты заказа",
                            preview: "Предпросмотр письма",
                            test_letter: {
                                done: "Тестовое письмо отправлено",
                                send: "Отправить тестовое письмо",
                            },
                            title: "Письма",
                        },
                        modal_edit: {
                            alignment: "Выравнивание текста",
                            alignment_logo: "Выравнивание логотипа",
                            cancel_button: "Отмена",
                            choice_status: "Выбор статуса",
                            create_date: "– дата создания %leadOrder%",
                            create_date_time:
                                "– дата и время создания %leadOrder%",
                            default_lead_subject:
                                "Заявка № {order_id} на сайте {domain} успешно оформлена",
                            default_lead_title:
                                "Заявка № {order_id} от {create_date} успешно оформлена",
                            default_order_subject:
                                "Заказ № {order_id} на сайте {domain} успешно оформлен",
                            default_order_title:
                                "Заказ № {order_id} от {create_date} успешно оформлен",
                            default_payment_subject:
                                "Оплата заказа № {order_id} прошла успешно",
                            default_payment_title:
                                "Заказ № {order_id} от {create_date} успешно оплачен",
                            domain: "– доменное имя сайта",
                            dropdown_title:
                                "Вы можете использовать динамические переменные:",
                            extra_text_end:
                                "Вставить дополнительный текст в конце письма",
                            extra_text_start:
                                "Вставить дополнительный текст в начале письма",
                            extra_text_title: "Дополнительный текст",
                            lead: "заявки",
                            oder_id: "– номер %leadOrder%",
                            optional: "Опционально",
                            order: "заказа",
                            payment_date: "– дата оплаты %leadOrder%",
                            payment_date_time:
                                "– дата и время оплаты %leadOrder%",
                            payment_method: "– способ оплаты",
                            required_validate:
                                "Поле «Тема письма» не может быть пустым",
                            reset: "Сбросить",
                            save_button: "Сохранить",
                            settings_save: "Настройки сохранены",
                            size_logo: "Размер логотипа",
                            subject_letter: "Тема письма",
                            text_at_beginning: "Текст в начале письма",
                            text_at_end: "Текст в конце письма",
                            theme_letter_placeholder:
                                "Вы оформили и оплатили заказ № {order_id}",
                            theme_tips:
                                "Будет отображаться в письме в качестве Отправителя",
                            tip_extra_text_start:
                                "Укажите информацию, которая может быть важна для клиентов — номер телефона для связи, ссылки соц. сетей, сроки обработки заказа, доставки, информацию о возврате.",
                            title_letter: "Заголовок письма",
                            title_letter_helper:
                                "{{order_id}} – номер заявки<br>\n{{domain}} – доменное имя сайта<br>\n{{order_created}}<br>\n{{order_completed}}<br>\n{{order_paid}} – дата оплаты заказа<br>",
                            title_letter_placeholder:
                                "Вы оформили заказ № {order_id} на сайте {domain}",
                        },
                        modal_test: {
                            email: "Email",
                            email_tip:
                                "Тестовые заявки можно отправлять только после оплаты тарифа",
                            required: "Заполните поле Email",
                            send: "Отправить",
                        },
                        not_paid_message:
                            'Рассылка писем клиентам доступна после оплаты тарифа. <a href="/admin/user/pay/">Оплатить тариф</a>',
                        settings: {
                            confirm_modal: {
                                delete_text:
                                    "После удаления восстановить файл будет невозможно",
                                delete_title: "Удалить логотип?",
                            },
                            email_answer: "E-mail для ответа",
                            email_answer_tip:
                                "Если получатель ответит на письмо, то ответ будет направлен на указанную почту",
                            logo: "Логотип",
                            logo_tip:
                                "Поддерживаемые форматы файлов для изображения логотипа: JPEG, PNG",
                            sender_name: "Имя отправителя",
                            sender_name_tip:
                                "Будет отображаться в почтовом клиенте у получателя",
                            shop_name: "Название магазина",
                            title: "Настройки",
                        },
                        test_modal: { title: "Отправить тестовое письмо" },
                        title: "Письма клиентам",
                    },
                    notify: {
                        add_email_button: "Добавить email",
                        add_email_desc:
                            "Для получения уведомлений добавьте email",
                        add_phone_desc:
                            "Для получения уведомлений добавьте телефон",
                        add_phone_number_button: "Добавить телефон",
                        desc: "Отсканируйте этот QR-код для быстрого перехода к боту",
                        email_add_utm_toggle:
                            "Добавить UTM-метки в email уведомления",
                        email_exists_error: "Адрес уже добавлен",
                        email_placeholder: "example@site.com",
                        email_subtitle: "Электронная почта",
                        go_to_payment_button: "Перейти к оплате",
                        invalid_phone_error: "Некорректный номер",
                        mobile_app_desc:
                            "Приложение для iOS и Android позволяет получать быстрые push-уведомления о новых заявках, одним кликом перезванивать клиентам, менять статусы и оставлять заметки.",
                        mobile_app_subtitle: "Мобильное приложение",
                        page_title: "Уведомления о заявках",
                        pay_for_plan_message:
                            "Купить СМС пакет можно только после оплаты основного тарифа",
                        phone_exists_error: "Номер уже добавлен",
                        phone_number_label: "Телефон",
                        qr_code_button: "Установить через QR-код",
                        simplified_messages_tip:
                            "Рекомендуем использовать этот режим в случае проблем с доставкой СМС. Операторы иногда блокируют полную версию уведомлений как спам.",
                        simplified_messages_toggle:
                            "Упрощённые данные о заявке",
                        sms_free_available:
                            "%sms_available% из %sms_limit% CMC",
                        sms_pay_button: "Купить СМС пакет",
                        sms_remained_label: "Осталось",
                        sms_subtitle: "Уведомления через СМС",
                        sms_unit: "СМС",
                        telegram: {
                            message: {
                                checkbox_value_no: "Нет",
                                checkbox_value_yes: "Да",
                                connect_text:
                                    "Для получения уведомлений о новых заявках, подключите приложение Telegram в разделе Настройки — Уведомления",
                                form_data_text: "Данные формы",
                                invalid_code_text: "Вы ввели неверный код",
                                new_order_text:
                                    "Новая заявка № %lead_num% со страницы %page_url%",
                                notifications_disabled_text:
                                    "Уведомления с сайта %domain% отключены",
                                notifications_enabled_text:
                                    "Уведомления настроены",
                                view_lead_text: "Просмотр заявки",
                            },
                        },
                        telegram_add_utm_toggle:
                            "Добавить UTM-метки в Telegram уведомления",
                        telegram_bot_desc:
                            'Найдите бота <a href="%link%" target="_blank">@%name%</a> в Telegram и напишите команду:',
                        telegram_bot_link: "Имя бота",
                        telegram_connected_info: "Telegram бот подключён",
                        telegram_desc:
                            "Найдите бота в Telegram и напишите команду:",
                        telegram_disconnected_status:
                            "Telegram бот не подключен",
                        telegram_method_label: "Способ",
                        telegram_qr_desc:
                            "Отсканируйте этот QR-код для быстрого перехода к боту",
                        telegram_qr_point_camera: "Наведите камеру",
                    },
                    optimization: {
                        other: {
                            critical_css: {
                                label: "Ускоренная загрузка первого экрана",
                                label_desc:
                                    "CSS стили для первого экрана будут вставлены прямо на страницу, анимации для первого экрана будут отключены.",
                            },
                            desc: "Отложенная загрузка позволяет значительно уменьшить время загрузки страницы и повысить индекс PageSpeed Insights",
                            lazy_counters: {
                                label: "Счетчики",
                                title: "Отложенная загрузка",
                            },
                            lazy_delayed: {
                                none: "Не применять",
                                second: "%second% с",
                            },
                            lazy_widgets: { label: "Виджеты" },
                            select: { recommend: "Рекомендуем" },
                            title: "Другие оптимизации",
                        },
                        title: "Оптимизация скорости загрузки",
                    },
                    page_lock: {
                        access_code: "Код доступа",
                        hide_toggle: "Закрыть сайт паролем",
                        hide_toggle_tip:
                            "Режим удобен на время разработки, чтобы поисковики и клиенты не попадали на недоработанный сайт",
                        tech_desc:
                            'Технические адреса предназначены для тестирования сайта на момент разработки и не подходят для рекламы и продвижения. Чтобы полноценно использовать сайт - добавьте домен в разделе <a href="/admin/settings/domains/">Домены</a>.',
                        tech_info:
                            "Сайты с техническими адресами закрыты для публичного просмотра",
                        tech_title: "Код доступа к сайту",
                        title: "Сайт в разработке",
                    },
                    pay: {
                        add_method_button: "Добавить интеграцию",
                        connect_service_title: "Добавить интеграцию",
                        no_methods_available_text:
                            "Вы уже подключили все доступные способы оплаты",
                        ofd: {
                            enable_label: "Отправлять данные для онлайн кассы",
                            mode: {
                                advance_text: "Аванс",
                                credit_payment_text: "Выплата по кредиту",
                                credit_text: "Кредит",
                                full_payment_text: "Полный расчет",
                                full_prepayment_text: "Полная предоплата",
                                partial_payment_text:
                                    "Частичный расчет и кредит",
                                partial_prepayment_text: "Частичная предоплата",
                            },
                            mode_label: "Способ расчета",
                            select_placeholder: "Не выбрано",
                            sno_label: "Система налогообложения",
                            subject: {
                                agent_commission_text:
                                    "Агентское вознаграждение",
                                another_text: "Другое",
                                commodity_text: "Товар",
                                composite_text: "Несколько вариантов",
                                excise_text: "Подакцизный товар",
                                gambling_bet_text: "Ставка в азартной игре",
                                gambling_prize_text: "Выигрыш в азартной игре",
                                intellectual_activity_text:
                                    "Результаты интеллектуальной деятельности",
                                job_text: "Работа",
                                lottery_prize_text: "Выигрыш в лотерею",
                                lottery_text: "Лотерейный билет",
                                payment_text: "Платеж",
                                service_text: "Услуга",
                            },
                            subject_label: "Предмет расчета",
                            tax: {
                                envd_text:
                                    "ЕНВД - Единый налог на вмененный доход",
                                esn_text:
                                    "ЕСН - Единый сельскохозяйственный налог",
                                osn_text: "ОСН - Общая система налогообложения",
                                psn_text:
                                    "ПСН - Патентная система налогообложения",
                                usn_15_text:
                                    "УСН 15% - Упрощенная система налогообложения (доходы минус расходы)",
                                usn_6_text:
                                    "УСН 6% - Упрощенная система налогообложения (доходы)",
                            },
                            tax_label: "Ставка НДС",
                            title: "Онлайн касса (54-ФЗ)",
                            vat: {
                                none_text: "Без НДС",
                                vat_0_text: "НДС по ставке 0%",
                                vat_10_of_110_text:
                                    "НДС по расчетной ставке 10/110",
                                vat_10_text: "НДС по ставке 10%",
                                vat_20_of_120_text:
                                    "НДС по расчетной ставке 20/120",
                                vat_20_text: "НДС по ставке 20%",
                            },
                        },
                        pay_methods_title: "Способы оплаты",
                        remove_method_confirm_title: "Отключить способ оплаты?",
                        service: {
                            custom_url: {
                                pay_error: "URL страницы при неуспешной оплате",
                                pay_success: "URL страницы при успешной оплате",
                                title: "Статус оплаты",
                                user_page: "Пользовательские страницы",
                                user_page_tips:
                                    "Когда опция включена, посетитель сайта будет перенаправлен на заданный URL-адрес в зависимости от статуса оплаты (успешный или неуспешный)",
                            },
                        },
                        services: {
                            bepaid: {
                                desc: '<p class="title">\n    Описание\n</p>\n\n<p class="text">\n    bePaid - сервис для приема онлайн-оплаты от клиентов.<br />\n    Подключив bePaid, вы сможете принимать оплату следующими способами:\n</p>\n\n<ul class="dashed">\n    <li>Банковские карты Visa (включая Electron), MasterCard, Maestro, Мир.</li></ul>',
                                instruction: {
                                    step_1_title:
                                        'Зарегистрируйтесь на сервисе <a href="%href%" target="_blank">bePaid</a>.',
                                    step_2_title:
                                        "Заполните пустые поля и отправьте форму.",
                                    step_3_title:
                                        "После успешной регистрации аккаунта зайдите в свой кабинет во вкладку «Магазины». Нажмите «Подробнее».",
                                    step_4_title:
                                        "Скопируйте ID магазина. Нажмите «Показать секретный ключ».",
                                    step_5_title: "Скопируйте секретный ключ.",
                                    step_6_title:
                                        "Перейдите в настройки сайта Flexbe  → Прием платежей → bePaid. Вставьте ID магазина и секретный ключ в полях при подключении платежной системы.",
                                    step_7_title:
                                        'В тестовом режиме проверьте интеграцию сайта <a href="%href%" target="_blank">по инструкции bePaid</a>. Вводите данные только тестовых банковских карт. После проверки отключите тестовый режим.',
                                },
                                settings: {
                                    api_settings_title:
                                        "Укажите идентификатор и секретный ключ магазина",
                                    demo_id_label: "Тестовый ID магазина",
                                    demo_secret_label:
                                        "Тестовый секретный ключ магазина",
                                    demo_terminal_label: "Тестовый ID магазина",
                                    host: "Хост",
                                    host_by: "bepaid.by (Белоруссия)",
                                    host_ru: "bepaid.tech (Россия)",
                                    id_label: "ID магазина",
                                    secret_label: "Секретный ключ магазина",
                                    terminal_label: "ID магазина",
                                    work_mode_label: "Выберите режим",
                                },
                                short_desc:
                                    "Онлайн-оплата с помощью сервиса bePaid",
                                title: "bePaid",
                            },
                            cash: {
                                default_instruction:
                                    "Вы можете оплатить товар наличными нашему курьеру. Курьер примет от вас оплату, передаст вам товар и необходимый набор документов (кассовый чек, гарантийный талон).",
                                desc: "Вы можете принимать оплату от клиентов наличными.<br>\nЭто может быть оплата в руки курьеру или перевод на банковскую карту/расчетный счёт.<br>\nПосле отправки заявки клиенты смогут выбрать способ оплаты &laquo;Наличные&raquo; и увидят инструкцию к оплате. <br>\nДля подключения способа нажмите &laquo;Подключить&raquo; и заполните текст с инструкцией к оплате.",
                                settings: {
                                    instruction_text_label:
                                        "Инструкция по оплате",
                                },
                                short_desc: "Произвольная инструкция по оплате",
                                title: "Оплата наличными",
                            },
                            custom: {
                                add: "Добавить способ оплаты",
                                delete: "Удалить",
                                desc: "Другой способ оплаты",
                                settings: {
                                    icon_label: "Иконка",
                                    instruction_label: "Описание",
                                    instruction_show_label: "Включить описание",
                                    name_label: "Название способа",
                                    title_label: "Добавление способа оплаты",
                                },
                                short_desc: "Другой способ оплаты",
                                title: "Добавление способа оплаты",
                            },
                            modes: {
                                debug: "Тестовый режим",
                                debug_bar:
                                    "Не вводите реальные данные банковских карт в тестовом режиме!\nВместо этого используйте данные тестовой карты, указанные в инструкции.",
                                debug_tip:
                                    "Тестовый режим предназначен для проверки работоспособности системы оплаты. В тестовом режиме используйте данные только тестовых карт во избежание нежелательных списаний с реальных счетов.",
                                work: "Рабочий режим",
                                work_tip:
                                    "В рабочем режиме вы можете принимать платежи от ваших клиентов",
                            },
                            paypal: {
                                api_auth_error:
                                    "Авторизационные данные не валидны",
                                api_restricted_error:
                                    "Ваш аккаунт в PayPal не активирован, активируйте его.",
                                currency_not_correct_full:
                                    "Валюта сайта отличается от основной валюты PayPal",
                                desc: "PayPal — крупнейшая платёжная система в мире. Вы сможете принимать оплату в любой валюте на счет PayPal следующими способами: <br>\n<ol>\n<li>— Платежи с банковских карт</li>\n<li>— Платежи со счетов PayPal</li>\n</ol>\nВалюта вашего сайта должна совпадать с валютой счета PayPal.",
                                desc_ofd:
                                    "<br>\nОбратите внимание, что PayPal <b>не передает</b> сведения о платежах в онлайн-кассу. Если вы ведете коммерческую деятельность на территории РФ, использование PayPal в качестве системы приема платежей ведет к нарушению 54-ФЗ РФ.",
                                disabled_currency:
                                    "PayPal не поддерживает валюту сайта: %currency%",
                                instruction: {
                                    desc: '1. Выберите режим работы с PayPal — тестовый или рабочий.<br>\n2. Зарегистрируйте корпоративный счет PayPal для <a href="%href1%" target="_blank">тестового</a> или <a href="%href2%" target="_blank">рабочего</a> режима.<br>\n3. Чтобы получить данные для вкладки «Настройки» перейдите по ссылке:<br>\n<ol>\n<li> — для <a href="%href3%" target="_blank">тестового</a> режима </li>\n<li> — для <a href="%href4%" target="_blank">рабочего</a> режима </li>\n</ol>\n4. Во вкладке «Настройки» введите полученные данные: Имя пользователя API, Пароль API, Подпись.<br>\n5. Нажмите кнопку «Сохранить».',
                                },
                                ofd: "PayPal не поддерживает онлайн кассу (54-ФЗ)",
                                pay_fail: "PayPal: ошибка оплаты счета номер:",
                                settings: {
                                    api_name_label: "Имя пользователя API",
                                    api_name_sandbox_label:
                                        "Имя пользователя API от песочницы",
                                    api_pass_label: "Пароль API",
                                    api_pass_sandbox_label:
                                        "Пароль API от песочницы",
                                    api_settings_title: "Настройки PayPal",
                                    api_sig_label: "Подпись",
                                    api_sig_sandbox_label:
                                        "Подпись от песочницы",
                                    currency:
                                        "Счет PayPal должен быть в валюте",
                                    work_mode_label: "Выберите режим",
                                },
                                short_desc:
                                    "Онлайн-оплата с помощью сервиса PayPal",
                                testing: { title: "PayPal тест" },
                                title: "PayPal",
                            },
                            robokassa: {
                                desc: '<p class="title">\nОписание\n</p>\n\n<p class="text">\nRobokassa &mdash; это сервис, позволяющий владельцам сайтов (интернет-магазинов, поставщиков услуг) принимать платежи от клиентов с сайта.<br />\n</p>\n\n<p class="text">\nПодключив Robokassa, вы сможете принимать оплату следующими способами:\n</p>\n\n<ul class="dashed">\n<li>Банковские карты: Visa (включая Electron), MasterCard, Maestro, Мир.</li>\n<li>Электронные деньги: ЮMoney, QIWI Wallet, Webmoney и другие.</li>\n<li>Платежи со счета мобильного от абонентов Билайн, МегаФон, МТС, Tele2.</li>\n<li>Наличные через терминалы QIWI, Элекснет, банкоматы и салоны связи.</li>\n<li>Платежи через интернет-банки: &laquo;Альфа-клик&raquo;, Банк ВТБ, Сбербанк Онлайн.</li>\n</ul>',
                                error: {
                                    invalid_login:
                                        "Неверный идентификатор магазина",
                                    not_active_login:
                                        "Идентификатор магазина не активен",
                                },
                                instruction: {
                                    fail_url_label:
                                        "URL страницы неуспешного платежа (Fail URL)",
                                    result_url_label:
                                        "URL для нотификации (Result URL)",
                                    step_1_title:
                                        '<a href="%href%" target="_blank">Зарегистрируйтесь</a> и заключите договор с Robokassa',
                                    step_2_title:
                                        "Укажите целевые URL в личном кабинете Robokassa.",
                                    step_3_title:
                                        "Введите логин и пароль на вкладке «Настройки».",
                                    step_4_help: "Инструкция",
                                    step_4_title: "Совершите тестовый платёж.",
                                    success_url_label:
                                        "URL страницы для успешного платежа (Success URL)",
                                },
                                settings: {
                                    api_settings_title:
                                        "Введите данные магазина из настроек Robokassa",
                                    login_label: "Идентификатор магазина",
                                    pass1_label: "Пароль 1",
                                    pass2_label: "Пароль 2",
                                    work_mode_title: "Выберите режим работы",
                                },
                                short_desc:
                                    "Онлайн-оплата с помощью сервиса Robokassa",
                                testing: {
                                    step_1: "Настройте форму на любой странице. Форма обязательно должна содержать email.<br>\nВыберите действие после отправки «Перейти к оплате».<br>\nВключите опцию «Передавать информацию о товаре», укажите название и стоимость товара.<br>\nОтправьте форму в режиме просмотра.<br>\nВ диалоге оплаты выберите способ оплаты банковской картой.",
                                    step_2: 'Следуйте <a href="https://docs.robokassa.ru/testing-mode/" target="_blank">инструкции</a> на сайте Robokassa.',
                                    step_3: "После проведения тестового платежа перейдите в рабочий режим.",
                                    title: "Как совершить тестовый платеж",
                                },
                                title: "Robokassa",
                            },
                            stripe: {
                                desc: '<p class="title">\n    Описание\n</p>\n\n<p class="text">\n    <b>Stripe</b> — платежная онлайн-система для физических лиц и бизнеса,<br>\n    доступная для 46 стран. Stripe принимает платежи из любой точки мира,<br>\n    но работа сервиса ограничена для интернет-магазинов России и стран СНГ.\n</p>',
                                instruction: {
                                    step_1_title:
                                        'Зарегистрируйтесь в <a href="%href%" target="_blank">Stripe</a>.',
                                    step_2_title:
                                        "Для интеграции c Flexbe вам понадобятся три ключа. Зайдите во вкладку <b>Developers</b> → <b>API keys</b>. Скопируйте <b>Publishable key</b>, затем <b>Secret key</b> (нажмите Reveal test key).",
                                    step_3_title:
                                        "Чтобы получить третий ключ, нажмите <b>Add an endpoint</b> в разделе <b>Webhooks</b>.",
                                    step_4_title:
                                        "В поле Endpoint URL вставьте <b>https://myflexbe.com/mod/pay/stripe/result/</b> <br> Теперь добавьте два события: charge.failed и charge.succeeded.",
                                    step_5_title:
                                        "Наконец нажмите <b>Reveal</b> и скопируйте открывшийся ключ <b>Signing secret</b>.",
                                },
                                settings: {
                                    api_settings_title: "Ключи",
                                    public_key_label: "Publishable key",
                                    secret_key_label: "Secret key",
                                    webhook_secret_label:
                                        "Webhook signing secret",
                                },
                                short_desc:
                                    "Онлайн оплата с помощью сервиса Stripe",
                                title: "Stripe",
                            },
                            tinkoff: {
                                desc: '<p class="title">\n    Описание\n</p>\n\n<p class="text">\n    Тинькофф Оплата - сервис для приема онлайн-оплаты от клиентов.<br />\n    Подключив Тинькофф, вы сможете принимать оплату следующими способами:\n</p>\n\n<ul class="dashed">\n    <li>Банковские карты Visa (включая Electron), MasterCard, Maestro, Мир.</li>\n    <li>Платежи через интернет-банк «Тинькофф».</li>\n</ul>\n\n<p class="text">\n    Тинькофф для бизнеса доступен для подключения юридическим лицам и индивидуальным предпринимателям.\n</p>',
                                error_the_checksum_does_not_match:
                                    "Контрольная сумма не соответствует",
                                instruction: {
                                    fail_url_label:
                                        "URL страницы для неуспешного платежа",
                                    method_label: "Способ подключения",
                                    notification_url_label:
                                        "URL для нотификации",
                                    step_1_title:
                                        '<a href="%href%" target="_blank">Зарегистрируйтесь</a> и заключите договор с Тинькофф',
                                    step_2_title:
                                        "Укажите способ подключения и URL в личном кабинете Тинькофф.",
                                    step_3_help: "Где взять ключи?",
                                    step_3_title:
                                        "Укажите ключи терминалов на вкладке «Настройки».",
                                    step_4_help: "Инструкция",
                                    step_4_title:
                                        "Совершите тестовый платёж. Вводите данные только тестовых банковских карт.",
                                    success_url_label:
                                        "URL страницы для успешного платежа",
                                },
                                settings: {
                                    api_settings_title:
                                        "Укажите ключи терминалов из настроек Тинькофф",
                                    demo_secret_label:
                                        "Пароль от тестового терминала",
                                    demo_terminal_label: "Тестовый терминал",
                                    secret_label: "Секретный ключ",
                                    terminal_label: "Рабочий терминал",
                                    work_mode_label: "Выберите режим",
                                },
                                short_desc:
                                    "Онлайн-оплата с помощью сервиса Тинькофф",
                                testing: {
                                    step_1: "Настройте форму на любой странице. Форма обязательно должна содержать email.<br>\nВыберите действие после отправки «Перейти к оплате».<br>\nВключите опцию «Передавать информацию о товаре», укажите название и стоимость товара.<br>\nОтправьте форму в режиме просмотра.<br>\nВ диалоге оплаты выберите способ оплаты банковской картой.",
                                    step_2: 'Следуйте <a href="https://www.tinkoff.ru/business/help/business-payments/internet-acquiring/how-involve/integrate/?card=q16" target="_blank">инструкции</a> на сайте Тинькофф.',
                                    step_3: "После проведения тестового платежа перейдите в рабочий режим.",
                                    title: "Как совершить тестовый платеж",
                                },
                                title: "Тинькофф",
                            },
                            yandex: {
                                desc: '<p class="title">\nОписание\n</p>\n\n<p class="text">\nЮKassa&nbsp;&mdash; сервис для приема онлайн-оплаты различными способами.<br />\nПодключив ЮKassa, вы&nbsp;сможете принимать оплату следующими способами:\n</p>\n\n<ul class="dashed">\n<li>Банковские карты Visa (включая Electron), MasterCard, Maestro, Мир.</li>\n<li>ЮMoney&nbsp;&mdash; от&nbsp;20&nbsp;миллионов пользователей, имеющих электронные кошельки.</li>\n<li>WebMoney&nbsp;&mdash; платежи из&nbsp;рублевых WM-кошельков.</li>\n<li>Наличные через терминалы, банкоматы и&nbsp;салоны связи&nbsp;&mdash; это больше 170 тысяч пунктов по&nbsp;России.</li>\n<li>Платежи через интернет-банк: через &laquo;Альфа-клик&raquo;, Промсвязьбанк, Сбербанк Онлайн&nbsp;&mdash; всего 22&nbsp;миллиона пользователей.</li>\n<li>Платежи со&nbsp;счета мобильного от&nbsp;абонентов Билайн, МегаФон, МТС, Tele2.</li>\n</ul>\n\n<p class="text">\nСписок фиксируется в&nbsp;договоре с&nbsp;ЮKassa, который вы&nbsp;можете посмотреть в&nbsp;вашем личном кабинете на&nbsp;стороне платежной системы.\n</p>\n\n<p class="text">\nЮKassa доступна для подключения юридическим лицам, индивидуальным предпринимателям и&nbsp;самозанятым.\n</p>',
                                instruction: {
                                    api_url_title: "Подключение по API",
                                    http_step2_help:
                                        "Выберите «Использовать страницы успеха и ошибки с динамическими адресами»",
                                    http_step4_title:
                                        "Введите полученные Shop ID, id витрины и пароль к магазину.",
                                    http_url_title: "Подключение по HTTP",
                                    step_1_title:
                                        'Зарегистрируйтесь в <a href="%href%" target="_blank">ЮKassa</a> и выберите в настройках %type% протокол.',
                                    step_2_title:
                                        "Укажите целевые URL в ЮKassa.",
                                    step_3_title: "Выпустите секретный ключ.",
                                    step_4_title:
                                        "Введите полученные Shop ID и секретный ключ на вкладке «Настройки».",
                                    step_5_title:
                                        "Выберите доступные варианты оплаты.",
                                    step_6_help: "Инструкция",
                                    step_6_title: "Совершите тестовый платёж.",
                                },
                                settings: {
                                    api_settings_title:
                                        "Введите Shop ID и Секретный ключ",
                                    conn_method_title:
                                        "Выберите вариант подключения",
                                    http_settings_title:
                                        "Введите Shop ID, Идентификатор витрины и Пароль к магазину",
                                    sc_id_label: "Идентификатор витрины",
                                    secret_key_label: "Секретный ключ",
                                    shop_id_label:
                                        "Идентификатор магазина (Shop ID)",
                                    shop_pass_label:
                                        "Пароль магазина (Shop Password)",
                                    work_mode_title: "Выберите режим работы",
                                },
                                short_desc: "Ранее сервис Яндекс.Касса",
                                testing: {
                                    card_cvv_title: "Код CVV",
                                    card_ex_title: "Срок действия",
                                    card_ex_value:
                                        "любой год и месяц в будущем",
                                    card_number_title: "Номер карты",
                                    card_type_title: "Тип карты",
                                    step_1: "Настройте форму на любой странице. Форма обязательно должна содержать email.<br>\nВыберите действие после отправки «Перейти к оплате».<br>\nВключите опцию «Передавать информацию о товаре», укажите название и стоимость товара.<br>\nОтправьте форму в режиме просмотра.<br>\nВ диалоге оплаты выберите способ оплаты банковской картой.",
                                    step_2: "Укажите специальные тестовые данные:",
                                    step_3: "После проведения тестового платежа, сообщите менеджеру ЮKassa об успешном окончании тестирования и отключите тестовый режим в настройках.",
                                    title: "Как совершить тестовый платеж",
                                },
                                title: "ЮKassa",
                            },
                            yookassa: {
                                instruction: {
                                    step_1_title:
                                        'Зарегистрируйтесь в <a href="%href%" target="_blank">ЮKassa</a>.',
                                    step_2_title:
                                        "Создайте тестовый магазин в разделе <b>Все магазины</b>.",
                                    step_3_title:
                                        "Выберите вкладку <b>На сайте</b> и введите адрес сайта, где будете принимать платежи.",
                                    step_4_title:
                                        "Укажите целевые URL в ЮKassa.",
                                    step_5_title:
                                        "Зайдите в раздел <b>Интеграция → Ключи API</b>. Скопируйте секретный ключ в ЮKassa.",
                                    step_6_title:
                                        "Затем перейдите в раздел <b>Настройки → Магазин</b> и скопируйте <b>shopId</b>.",
                                    step_7_title:
                                        "Введите <b>секретный ключ</b> и <b>shopId</b> в соответствующие поля вкладки <b>Настройки</b> на Flexbe.",
                                    step_8_title:
                                        "Совершите тестовый платёж. Вводите данные только тестовых банковских карт.",
                                },
                                testing: {
                                    step_1: "Зайдите на свой сайт на Flexbe и настройте форму на любой странице. Форма обязательно должна содержать e-mail, потому что по закону нужно прислать пользователю чек об оплате.",
                                    step_2: "Выберите действие после отправки <b>Перейти к оплате</b>.",
                                    step_3: "В кнопке, вызывающей форму, выберите действие <b>Показать всплывающее окно</b>, затем включите опцию <b>Передавать информацию о товаре</b> и заполните пустые поля.",
                                    step_4: "Перейдите в режим предпросмотра страницы и отправьте форму.",
                                    step_5: "В диалоге оплаты выберите способ оплаты банковской картой.",
                                    step_6: "Укажите специальные тестовые данные.",
                                    step_7: "После проведения тестового платежа, сообщите менеджеру <b>ЮKassa</b> об успешном окончании тестирования и отключите тестовый режим в настройках.",
                                    step_8: "После подписания договора с <b>ЮKassa</b> можно настроить рабочий режим.",
                                },
                            },
                        },
                        statuses: {
                            error: "Ошибка оплаты",
                            in_process: "В процессе оплаты",
                            paid: "Оплачен",
                            pending: "Ожидает оплаты",
                        },
                        support_types: {
                            bank_cards_toggle_text: "Банковская карта",
                            qiwi_toggle_text: "Qiwi",
                            sberbank_toggle_text: "Сбербанк",
                            title: "Выберите доступные варианты оплаты",
                            web_money_toggle_text: "WebMoney",
                            yandex_toggle_text: "ЮMoney",
                        },
                        title: "Приём платежей",
                    },
                    policy: {
                        enable_label:
                            "Показывать предупреждение о сборе персональных данных под формами",
                        file_empty: "Документ не загружен",
                        ru_note:
                            'Если ваш сайт работает в России, то вам необходимо соблюдать Федеральный закон № 152-ФЗ «О&nbsp;персональных&nbsp;данных». Необходимо разместить на сайте документ «Политика по обработке персональных данных» и разместить информацию о сборе персональных данных рядом с формами. Так же необходимо <a href="http://pd.rkn.gov.ru/operators-registry/notification/form/" target="_blank">зарегистрироваться в Роскомнадзоре</a> как оператор персональных данных.',
                        type_checkbox: "Галочка с подтверждением",
                        type_label: "Выберите вид предупреждения:",
                        type_text: "Только текст",
                        upload_file: "Загрузить PDF",
                    },
                    promocode: {
                        timezone_bar:
                            "Период действия скидок и промокодов будет расcчитан с учетом часового пояса, заданного в разделе Настройки — Общие",
                        title: "Скидки и промокоды",
                    },
                    redirects: {
                        standard: {
                            add: "Добавить редирект",
                            desc: 'Используйте символ * в качестве переменной, чтобы правило работало для всех вложенных страниц, или задайте переменной имя в формате {name}. <br>Более подробную информацию вы можете получить в нашей <a href="%href%" target="_blank" class="flexbe-button is-primary style-text redirects-info-link">документации</a>.',
                            disabled: "Приостановить правило",
                            disabled_text: "Отключен",
                            empty: "Отправляйте посетителей и поисковые системы со старого URL на новый",
                            error_empty: "Заполните поля",
                            error_equal:
                                "Страница не может перенаправляться на себя",
                            error_transparent:
                                "Прозрачный редирект не может содержать другой домен",
                            from_page: "Страница",
                            remove: "Удалить",
                            save_query: "Сохранять URL-параметры",
                            to_page: "Редирект на",
                            type: {
                                permanent: "301 – постоянный",
                                temporary: "302 – временный",
                                title: "Тип",
                                transparent: "200 – прозрачный",
                                transparent_tip:
                                    "Перенаправление с одной веб-страницы на другую без изменения URL в адресной строке браузера",
                            },
                        },
                        title: "Редиректы",
                    },
                    responsive: {
                        desc: "Адаптивный дизайн обеспечивает подходящее отображение вашего сайта на мобильных телефонах и планшетах",
                        enable_label: "Включить для всех страниц",
                        title: "Адаптивный дизайн",
                    },
                    robots: {
                        canonical_desc:
                            'Для избежания дублей на всех страницах будет указан тег вида <strong class="text-nowrap">%tag%</strong>',
                        canonical_title: "Настройки SEO",
                        canonical_toggle_label:
                            "Включить канонические адреса страниц",
                        check_button: "Проверить ошибки",
                        content_label: "Содержимое файла",
                        desc: 'Файл специального формата для поисковых роботов (<a href="https://yandex.ru/support/webmaster/controlling-robot/robots-txt.html" target="_blank">документация</a>).<br>\nОбычно используется для закрытия страниц от поисковых систем.',
                        open_button: "Открыть robots.txt",
                        title: "Файл robots.txt",
                        warn_save_notify:
                            "Для проверки robots.txt сохраните изменения",
                    },
                    site_status: {
                        draft: {
                            desc: "Закрыт паролем, не учитывается в лимите сайтов",
                            title: "Сайт-черновик",
                        },
                        publised: {
                            desc: "Доступен для посетителей, учитывается в лимите сайтов",
                            title: "Сайт опубликован",
                        },
                        title: "Статус сайта",
                        unavailable_tip:
                            "Пользователь с ролью %role% не может менять Статус сайта.",
                    },
                    smoothing_scroll: {
                        tip: "Изменяет физику скролла, добавляя инерции при прокручивании и делая его более плавным. Функция не работает в редакторе и на мобильных устройствах.",
                        title: "Плавный скролл страницы",
                    },
                    verify: {
                        file: {
                            delete_confirm_text:
                                "После удаления, восстановление файла будет невозможно",
                            delete_confirm_title: "Удалить файл?",
                            title: "Подтверждение прав через загрузку файла",
                            upload_first_note: "Нет загруженных файлов",
                        },
                        meta: { title: "Подтверждение прав через мета-тег" },
                        title: "Подтверждение прав",
                    },
                },
                side_menu: {
                    additional_title: "Дополнительно",
                    pay_invoices_text: "История платежей",
                    pay_plan_text: "Тарифный план",
                    pay_text: "Оплата",
                    profile_text: "Профиль",
                    title: "Аккаунт",
                    users_text: "Пользователи",
                },
                stat: {
                    export: {
                        desc_day:
                            "Экспорт данных аналитики по дням за последние 4 месяца",
                        desc_month:
                            "Экспорт данных аналитики за весь период по месяцам",
                        title: "Экспорт",
                        to_csv: "Текстовый формат (CSV)",
                        to_xls: "Microsoft Excel (XLSX)",
                    },
                    list: {
                        chart: {
                            conversion_legend: "%count%% конверсия",
                            leads_label: "Заявки",
                            leads_legend: {
                                one: "%count% заявка",
                                few: "%count% заявки",
                                many: "%count% заявок",
                                other: "%count% заявки",
                            },
                            tab_table: "График",
                            visitors_legend: {
                                one: "%count% посетитель",
                                few: "%count% посетителя",
                                many: "%count% посетителей",
                                other: "%count% посетителя",
                            },
                            visits_label: "Посетители",
                        },
                        days_title: "По дням",
                        months_title: "По месяцам",
                        table: {
                            conversion_header: "Конверсия",
                            day_header: "День",
                            leads_header: "Заявок",
                            month_header: "Месяц",
                            new_visitors_header: "Новых",
                            tab_name: "Таблица",
                            visitors_header: "Посетителей",
                        },
                        title: "Статистика",
                    },
                    menu: {
                        stat: "Статистика",
                        title: "Аналитика",
                        utm: "Генератор UTM-меток",
                    },
                    utm: {
                        info: 'UTM-метки — стандарт для отслеживания эффективности рекламы. Позволяют определить из каких рекламных источников поступают реальные заявки. Подробнее о UTM-метках <a href="https://academy.flexbe.ru/articles/utm/" target="_blank">в статье</a>.',
                        link_desc:
                            "Системы статистики будут отслеживать посетителей, переходящих по этой ссылке. Если посетитель отправит заявку — информация об этих параметрах появится на карточке заявки.",
                        link_title:
                            "Скопируйте ссылку и направляйте на нее посетителей",
                        not_selected: "Не выбран",
                        page_label: "Страница",
                        params_title: "Введите параметры",
                        sources: {
                            odnoklassniki: "Одноклассники",
                            other: "Другой источник",
                            vk: "ВКонтакте (прочее)",
                            vk_post: "ВКонтакте (посты в группах)",
                            vk_target: "ВКонтакте (таргетинг)",
                            yandex: "Яндекс.Директ",
                        },
                        title: "UTM-метки для отслеживания рекламы",
                        "title:utm": "UTM-метки",
                        types: {
                            affiliate: "Партнерская программа",
                            banner: "Баннеры",
                            cpc: "Оплата за клик",
                            cpm: "Оплата за показы",
                            email: "Email рассылка",
                            other: "Другой тип",
                            price: "Прайс площадки",
                            retargeting: "Ретаргетинг",
                        },
                        utm_campaign_label: "Рекламная кампания",
                        utm_campaign_placeholder: "black_friday",
                        utm_content_label: "Дополнительный параметр",
                        utm_content_placeholder: "post_black_friday",
                        utm_medium_custom_label: "Другой тип трафика",
                        utm_medium_label: "Тип трафика",
                        utm_source_custom_label: "Название источника",
                        utm_source_label: "Источник трафика",
                        utm_term_label: "Ключевая фраза",
                        utm_term_placeholder: "Купить слона",
                    },
                },
                status: {
                    flexbe_icon_title: "Конструктор сайтов Flexbe",
                    main_page_not_found: {
                        add_button: "Создать страницу",
                        create_text:
                            "Перейдите в панель управления для создания первой страницы",
                        subtitle: "Страница еще не создана",
                        title: "Страница еще не создана",
                    },
                    site_banned: {
                        text: 'Сайт заблокирован за нарушение <a href="https://flexbe.ru/#terms">правил</a>',
                        title: "Сайт заблокирован",
                    },
                    site_expired: {
                        pay_text:
                            "Если вы владелец сайта, просто оплатите аккаунт",
                        site_blocked_text:
                            "Сайт заблокирован из-за окончания<br> оплаченного периода",
                        title: "Сайт заблокирован",
                    },
                    site_not_found: {
                        block_button: "Войти в панель управления",
                        block_desc:
                            "Войдите в панель управления и добавьте этот домен<br>в разделе Настройки — Домены",
                        block_title:
                            'Данный домен не привязан ни к одному <br>аккаунту на платформе <a href="https://flexbe.ru/?utm_source=clients&utm_campaign=domain_not_found">Flexbe</a>',
                        title: "Домен не настроен",
                    },
                    site_trial_end: {
                        pay_text:
                            "Если вы владелец сайта, просто оплатите аккаунт.<br>В противном случае сайт будет удален через 2 недели.",
                        title: "Пробный период окончен",
                        trial_period_is_over_text:
                            "Прошли 14 дней пробного периода",
                        trial_period_prolong_text:
                            'Если вам не хватило времени познакомиться с функционалом платформы, <br><a href="/admin/user/trial/up/">можете продлить</a> пробный период еще на 14 дней.',
                    },
                    site_trial_up: {
                        max_trial_perid_error_text:
                            "Максимальный пробный период составляет<br> 8 недель после регистрации",
                    },
                },
                support: {
                    answer_delay: "Мы ответим вам при первой возможности",
                    emoji: {
                        activity_title: "Активность",
                        animals_title: "Животные и природа",
                        food_drinks_title: "Еда и напитки",
                        smiles_people_title: "Смайлы и люди",
                        things_title: "Предметы",
                        travel_title: "Путешествия и места",
                    },
                    greetings_text:
                        "Напишите свой первый вопрос и команда поддержки оперативно поможет вам.",
                    out_of_service_text:
                        "Мы будем онлайн с 10 утра (MSK). Напишите нам, мы ответим при первой возможности",
                    placeholder: "Ваше сообщение",
                    subtitle: "Работаем с 10 до 21 ежедневно (МСК)",
                    title: "Служба поддержки",
                    today: "Сегодня",
                    yesterday: "Вчера",
                },
                transfer_project: {
                    change_tariff_button: "Изменить тариф",
                    confirmation_title: "Подтверждение",
                    conflict_files: {
                        desc: "При переносе сайта возникли конфликты имен файлов, имена новых файлов изменены, необходимо исправить ссылки на файлы.",
                        new_files_text: "Новые файлы",
                        title: "Найдены конфликтующие файлы",
                        your_files_text: "Ваши файлы",
                    },
                    delete_current_site_text:
                        'Удалить текущий сайт <a href="http://%current_domain%/">%current_domain%</a> и перенести <a href="http://%transfered_domain%/">%transfered_domain%</a> на ваш аккаунт',
                    duration_text: "*Операция занимает ~5 минут",
                    error_account_not_found: "Аккаунт не найден",
                    error_canceled:
                        'Владелец <a href="http://%transfered_domain%/">%transfered_domain%</a> отменил перенос сайта',
                    error_request_exist:
                        "Заявка на перенос сайта уже существует",
                    error_request_not_found: "Заявка не найдена",
                    error_same_account:
                        "Невозможно перенести сайт на собственный аккаунт",
                    must_be_paid_text:
                        "Ваш аккаунт должен быть оплачен для<br>переноса сайта",
                    remove_project_button: "Удалить сайт",
                    remove_project_text: "Удалите один из сайтов",
                    replace_site_button: "Заменить сайт",
                    request_added_notify: "Заявка на перенос создана",
                    request_canceled_notify: "Перенос отменен",
                    site_limit_text: {
                        one: "На вашем тарифе действует<br>ограничение в %count% сайт",
                        few: "На вашем тарифе действует<br>ограничение в %count% сайта",
                        many: "На вашем тарифе действует<br>ограничение в %count% сайтов",
                        other: "На вашем тарифе действует<br>ограничение в %count% сайта",
                    },
                    success_transfer_text:
                        'Сайт <a href="http://%transfered_domain%/admin/auth/">%transfered_domain%</a> передан на<br>ваш аккаунт %email_to%',
                    title: "Передача сайта",
                    to_account_button: "Перейти в аккаунт",
                    to_higher_tariff_text: "Перейти на более высокий тариф",
                    transfer_site_desc:
                        "Владелец %transfered_domain% передает сайт на ваш аккаунт.<br>\nДля завершения передачи сайта необходимо ваше подтверждение.",
                    transfer_site_text:
                        'Передача сайта <a href="http://%transfered_domain%">%transfered_domain%</a>',
                },
                upgrade_tariff_warning: {
                    button_text: "Изменить тариф",
                    content_text:
                        "Функционал недоступен на вашем тарифе.<br> Для использования функционала перейдите на другой тариф.",
                },
                user: {
                    bill: { limitation: { title: "Ограничение тарифа" } },
                    pay: {
                        belgie: {
                            form: {
                                document: {
                                    document_number: {
                                        placeholder: "Номер",
                                        title: "Номер",
                                    },
                                    identifier: {
                                        placeholder: "Идентификационный номер",
                                        title: "Идентификационный номер",
                                    },
                                    issued_at: {
                                        placeholder: "Дата выдачи",
                                        title: "Дата выдачи",
                                    },
                                    issued_by: {
                                        placeholder: "Кем выдан",
                                        title: "Кем выдан",
                                    },
                                    serial_number: {
                                        placeholder: "Серия",
                                        title: "Серия",
                                    },
                                    title: "Данные документа:",
                                    type: {
                                        placeholder: "Вид документа",
                                        title: "Вид документа",
                                    },
                                },
                                domain: {
                                    description: {
                                        placeholder: "Описание ресурса",
                                        title: "Описание ресурса",
                                    },
                                    name: {
                                        placeholder: "Доменное имя",
                                        title: "Доменное имя",
                                    },
                                    title: "Сведения о ресурсе:",
                                },
                                owner: {
                                    address: {
                                        placeholder: "Адрес",
                                        title: "Адрес",
                                    },
                                    full_name: {
                                        placeholder: "ФИО (полностью)",
                                        title: "ФИО",
                                    },
                                    name_company: {
                                        placeholder:
                                            "Наименование юридического лица",
                                        title: "Наименование юридического лица",
                                    },
                                    phone: {
                                        placeholder: "Контактный телефон",
                                        title: "Контактный телефон",
                                    },
                                    title: "Сведения о собственнике ресурса:",
                                },
                                registration: {
                                    title: "Сведения о государственной регистрации:",
                                },
                                state_registration: {
                                    account_number: {
                                        placeholder:
                                            "Учетный номер плательщика",
                                        title: "Учетный номер плательщика",
                                    },
                                    registered_at: {
                                        placeholder: "Дата регистрации",
                                        title: "Дата регистрации",
                                    },
                                    registered_by: {
                                        placeholder:
                                            "Наименование гос. органа, осуществившего регистрацию",
                                        title: "Наименование гос. органа, осуществившего регистрацию",
                                    },
                                    solution_number: {
                                        placeholder:
                                            "Номер решения (при наличии)",
                                        title: "Номер решения",
                                    },
                                    type: {
                                        placeholder: "Вид документа",
                                        title: "Вид документа",
                                    },
                                },
                            },
                            pay_for_plan_message:
                                "Оплатить услугу БелГИЭ можно только после оплаты основного тарифа",
                            select_fiz: "Физическое лицо",
                            select_ip: "Индивидуальный предприниматель",
                            select_title: "Плательщик",
                            select_ur: "Юридическое лицо",
                            title: "БелГИЭ — Оплата",
                        },
                        checkout: {
                            autorenew_desc:
                                "Для обеспечения бесперебойной работы вашего сайта мы будем автоматически продлевать подписку по цене %price% %period%. Вы всегда можете отключить автопродление, отменив подписку в вашем аккаунте",
                            create_invoice_button: "Выставить счет",
                            enable_autorenew_label:
                                "Включить автопродление после оплаты",
                            invoice_destination_label: "Назначение",
                            invoice_download_pdf_button: "Скачать PDF",
                            invoice_modal_title: "Счет № %count%",
                            invoice_open_pdf_button: "Открыть счёт",
                            invoice_recipient_label: "Получатель",
                            invoice_sum_label: "Сумма",
                            pay_button: "Оплатить",
                            save_card_label: "Запомнить карту",
                            subscribe_button: "Оформить подписку",
                        },
                        default_desc: "Оплата счета № %pay_id%",
                        details: {
                            form: {
                                by_unp_error: "УНП должен состоять из 9 цифр",
                                by_unp_label: "УНП",
                                fullname_error: "Введите полное имя",
                                kz_bin_error: "БИН должен состоять из 12 цифр",
                                kz_bin_label: "БИН",
                                kz_id_error:
                                    "Некорректный номер ИИН или паспорта",
                                ru_inn_error: "Некорректный ИНН",
                                ru_inn_label: "ИНН",
                                ru_inn_length_error:
                                    "ИНН должен состоять из 10 или 12 цифр",
                                ru_kpp_error: "КПП должен состоять из 9 цифр",
                                tax_id: "TAX ID",
                                title: "Заполните данные владельца сайта",
                            },
                            title: "Плательщик",
                            type: {
                                company_label: "Юридическое лицо или ИП",
                                personal_label: "Физическое лицо",
                                title: "Выберите владельца аккаунта/плательщика",
                            },
                        },
                        disable_autorenew: {
                            text: "Если вы пропустите оплату — ваш сайт будет заблокирован.",
                            title: "Отключить автопродление?",
                        },
                        domain: { title: "Домены — Оплата" },
                        info: {
                            autorenew_label: "Автопродление",
                            autorenew_tip:
                                "Мы будем автоматически списывать %price% %period%",
                            cancel_subscription_button: "Отменить подписку",
                            change_card_button: "Изменить карту",
                            disable_autorenew_button: "Отключить автопродление",
                            enable_autorenew_button: "Включить автопродление",
                            enable_subscription_button: "Восстановить подписку",
                            expire_label: "Оплачено до",
                            mycard_label: "Привязанная карта",
                            payer_change_button: "Изменить реквизиты",
                            payer_label: "Плательщик",
                            period_change_button: "Изменить период",
                            plan_change_button: "Изменить тариф",
                            plan_label: "Тарифный план",
                            remove_card_button: "Удалить карту",
                            trial_label: "Пробный период до",
                        },
                        invoices: {
                            amount_head: "Сумма",
                            date_created_head: "Дата создания",
                            download_invoice_btn: "Скачать PDF",
                            empty: "Вы пока ничего не оплачивали",
                            open_invoice_btn: "Открыть счёт",
                            paid_date_head: "Дата зачисления",
                            status: {
                                canceled: "Отменен",
                                paid: "Оплачен",
                                pending: "Ожидает оплаты",
                                refund: "Возвращен",
                            },
                            status_head: "Статус",
                            title: "История платежей",
                        },
                        methods: {
                            bank_company: "Банк. перевод для юридических лиц",
                            bonus: "Бонус",
                            card: "Карта",
                            grant: "Грант",
                            mycard: "Моя карта",
                            promo: "Промокод",
                            qiwi: "QIWI Кошелек",
                            title: "Способ оплаты",
                            yandex_money: "ЮMoney",
                        },
                        mycard_select: {
                            select_button: "Включить автопродление",
                            title: "Выберите карту для автопродления",
                        },
                        no_access_error:
                            "У вас нет доступа к странице: «Оплата»",
                        period: {
                            choose_title: "Выберите период оплаты",
                            discount_badge: "Скидка %discount%%",
                            each_month: "1 месяц",
                            each_month3: "3 месяца",
                            each_year: "1 год",
                            every_month: "каждый месяц",
                            every_month3: "каждые 3 месяца",
                            every_year: "каждый год",
                            for_month: "1 месяц",
                            for_month3: "3 месяца",
                            for_year: "1 год",
                            label: "Периодичность оплаты",
                            month: "Месяц",
                            title: "Периодичность оплаты",
                            year: "Год",
                        },
                        plan: {
                            archive_note:
                                "После смены тарифа у вас будет возможность вернуться на старый тариф в течение суток.",
                            archive_title: "Архивный тариф",
                            change_note:
                                "При смене тарифа произойдет перерасчет оплаченного срока",
                            changed_notify: "Тарифный план изменен",
                            current_badge: "Текущий",
                            errors: {
                                currency_changed: "Валюта тарифа уже изменена",
                                gifted_downgrade:
                                    "Нельзя изменить тариф до истечения подарочного периода %date%",
                                not_allowed_notify:
                                    "На данный тариф перейти нельзя",
                                pages_exceed_notify:
                                    "Превышен лимит страниц для данного тарифа",
                                projects_exceed_notify:
                                    "Превышен лимит сайтов для данного тарифа",
                                sms_exceed_notify:
                                    "Превышен лимит СМС для данного тарифа",
                                users_exceed_notify:
                                    "Превышен лимит пользователей для данного тарифа",
                            },
                            features: {
                                abtest: "А/Б тестирование",
                                ai_copywriter: "AI-копирайтер",
                                api: "API",
                                can_hide_copyright: "Скрытие лейбла Flexbe",
                                cart: "Корзина",
                                client_letters: "Письма покупателям",
                                crm: "Интеграция с CRM",
                                custom_html: "Кастомный HTML-код",
                                domain_email: "Почта для домена",
                                draft: "Черновики",
                                dynamic_replacement: "Мультисекция",
                                editor: "Профессиональный редактор",
                                free_domain: "Домен .RU или .РФ в подарок",
                                free_sections: "Свободная секция",
                                geo_replacement: "Геосекция",
                                geosection: "Геосекция",
                                globals: "Глобальные секции",
                                img_optimization: "Оптимизация изображений",
                                multisection: "Мультисекция",
                                multitext: "Мультитекст",
                                page_count_limit: "1000 страниц на сайте",
                                payment: "Прием платежей",
                                product_elements: "Товарные элементы",
                                products: "Товары",
                                projects_plural: {
                                    one: "%count% сайт",
                                    few: "%count% сайта",
                                    many: "%count% сайтов",
                                    other: "%count% сайта",
                                },
                                projects_unlimited: "Неограниченно сайтов",
                                promocode: "Промокоды",
                                quiz: "Квизы",
                                redirects: "Редиректы",
                                site_memory_limit: "10 ГБ места на каждый сайт",
                                ssl: "TLS сертификат (https://)",
                                users_plural: {
                                    one: "%count% доп. пользователь",
                                    few: "%count% доп. пользователя",
                                    many: "%count% доп. пользователей",
                                    other: "%count% доп. пользователя",
                                },
                                users_unlimited: "Доп. пользователи",
                            },
                            "features:animations": "Анимации",
                            for_year: "за год",
                            info_tip: {
                                abtest_desc:
                                    "Позволяет создать второй вариант секции на сайте, показывать посетителям разные версии и понять какой из вариантов работает лучше.",
                                abtest_title: "А/Б тестирование",
                                ai_copywriter_desc:
                                    "Ваш персональный цифровой ассистент, который помогает писать заголовки и тексты для сайта.",
                                ai_copywriter_title: "AI-копирайтер",
                                animations_desc:
                                    "Пошаговые анимации, готовые пресеты и большое количество настроек шага позволяют создать анимацию любого уровня. Настраивайте как простые, так и сложные многошаговые анимации с выбором из 7 триггеров для старта.",
                                animations_title: "Анимации",
                                api_desc:
                                    "Получайте и изменяйте информацию о заявках, клиентах, оплатах, а также отправляйте информацию о событиях вашим скриптам.",
                                api_title: "API",
                                cart_desc: "Описание корзины",
                                cart_title: "Корзина",
                                client_letters_desc:
                                    "Автоматическая отправка писем покупателю на каждом этапе заказа.",
                                client_letters_title: "Письма покупателям",
                                copyright_desc:
                                    "Возможность отключить надпись «Создано на Flexbe»",
                                copyright_title: "Скрытие лейбла Flexbe",
                                crm_desc:
                                    "Передача данных по заявке и клиенту в подходящую вам CRM систему, например, Битрикс24 или amoCRM",
                                crm_title: "Интеграция с CRM",
                                custom_html_desc:
                                    "Удобный HTML-редактор позволяет добавить кастомный код как в виде элемента или секции, так и на целую страницу или сайт.",
                                custom_html_title: "Кастомный HTML-код",
                                domain_email_desc:
                                    "Подключите корпоративную почту для своего домена: Mail.ru для бизнеса, Yandex 360, Google Workspace или любую другую",
                                domain_email_title: "Почта для домена",
                                draft_desc:
                                    "Черновики — неопубликованные сайты, которые не нужно оплачивать.",
                                draft_title: "Черновики",
                                dynamic_replacement_desc:
                                    "Позволяет персонализировать контент в зависимости от URL параметров. Обычно используется в связке с рекламой, чтобы показывать наиболее подходящий вариант в зависимости от объявления.",
                                dynamic_replacement_title: "Мультисекция",
                                editor_desc:
                                    "Редактор предлагает как простые инструменты для новичков, так и профессиональные возможности для опытных пользователей: сетку, направляющие, прилипание к сетке, индикацию расстояний до элементов и горячие клавиши.",
                                editor_title: "Профессиональный редактор",
                                free_domain_desc:
                                    "Регистрация 1 домена в зоне .RU или .РФ в подарок",
                                free_domain_title:
                                    "Домен .RU или .РФ в подарок",
                                free_sections_desc:
                                    "Секции со свободным позиционированием элементов. Все элементы секции можно свободно перемещать и поворачивать, а также управлять порядком слоев.",
                                free_sections_title: "Свободная секция",
                                geo_replacement_desc:
                                    "Подстраивает содержимое сайта под город, в котором находится посетитель. Например, чтобы показать ближайший офис.",
                                geo_replacement_title: "Геосекция",
                                geosection_desc:
                                    "Меняет контент секции в зависимости от города, в котором находится посетитель. Такая персонализация сайта благоприятно влияет на лояльность аудитории.",
                                geosection_title: "Геосекция",
                                globals_desc:
                                    "Секции, которые можно использовать на нескольких страницах сайта: изменения глобальной секции на одной странице автоматически применяются к ее дубликатам на других страницах. Это позволяет массово править страницы сайта.",
                                globals_title: "Глобальные секции",
                                hosting_desc:
                                    "Сеть дата-центров по всему миру и вся необходимая инфраструктура для размещения сайта в интернете, обеспечения отказоустойчивости, быстрой загрузки сайта и защиты от DDoS атак.",
                                hosting_title: "Хостинг",
                                img_optimization_desc:
                                    "Автоматическая конвертация загружаемых изображений в современные форматы AVIF и WEBP позволяет ускорить загрузку изображений до 50%",
                                img_optimization_title:
                                    "Оптимизация изображений",
                                multisection_desc:
                                    "Позволяет создавать несколько вариантов секции и настраивать условия показа необходимой версии. Обычно используется в связке с рекламой, чтобы показывать наиболее подходящий вариант в зависимости от текста объявления.",
                                multisection_title: "Мультисекция",
                                multitext_desc:
                                    "Мультитекст позволяет изменять текст секции через URL параметры; он используется для продвижения лендингов.",
                                multitext_title: "Мультитекст",
                                page_count_desc:
                                    "Возможность создать до 1000 страниц на сайте",
                                page_count_title: "1000 страниц на сайте",
                                payment_desc:
                                    "Интеграции с сервисами приема платежей онлайн: ЮKassa, Тинькофф, Robokassa, bePaid, PayPal, Stripe.",
                                payment_title: "Прием платежей",
                                product_elements_desc:
                                    "Удобный каталог с красивыми карточками товаров с опциями позволяет легко создать интернет-магазин для локальных, монобрендовых или небольших бутиков.",
                                product_elements_title: "Товарные элементы",
                                products_desc:
                                    "Удобный каталог с красивыми карточками товаров с опциями позволяет легко создать интернет-магазин для локальных, монобрендовых или небольших бутиков.",
                                products_title: "Товары",
                                projects_desc:
                                    "Сайт — набор страниц, объединенных доменным именем.",
                                projects_title: "Сайты",
                                promocode_desc:
                                    "Мотивируйте покупать больше прогрессивной шкалой скидок или предоставляйте бонусы при использовании промокодов.",
                                promocode_title: "Промокоды",
                                quiz_desc:
                                    "Многошаговые интерактивные формы, которые помогают собирать заявки и контактные данные посетителей сайта.",
                                quiz_title: "Квизы",
                                redirects_desc:
                                    "Автоматическое перенаправление посетителей с одной страницы сайта на другую, например, если у вас изменился адрес страницы или страница была удалена.",
                                redirects_title: "Редиректы",
                                site_memory_desc:
                                    "Для каждого сайта предоставляется 10 ГБ места",
                                site_memory_title: "10 ГБ места на каждый сайт",
                                ssl_desc:
                                    "Сертификат безопасности для вашего домена подключается автоматически. Когда ваш сайт защищен с помощью TLS-сертификата, он работает по https://, и ваши посетители увидят значок «Соединение защищено» в адресной строке браузера, а рейтинг вашего сайта в Google и Яндекс повысится.",
                                ssl_title: "TLS сертификат (https://)",
                                users_desc:
                                    "Количество дополнительных пользователей, которое вы можете подключить для совместной работы над сайтом.",
                                users_title: "Дополнительные пользователи",
                            },
                            modal: { title: "Смена тарифного плана" },
                            module: { functionality: "Функционал" },
                            month_desc: "%count% / Месяц",
                            name: "Тариф «%name%»",
                            one_month: "за месяц",
                            recalc: {
                                current_date: "Текущий срок",
                                new_date: "Новый срок",
                                title: "Пересчет оплаченного срока",
                            },
                            rub_warning:
                                "Оплатить тарифный план в рублях (RUB) можно только с банковской карты российского банка.<br>\nДля оплаты картой другой страны, перейдите на тариф в долларах США (USD) или Евро (EUR).",
                            select_title: "Выберите тариф",
                            show_more_button: "Показать ещё",
                            sites: { show_more: "Больше" },
                            three_month: "за 3 месяца",
                            title: "Тарифный план",
                            year_desc: "%count% / год",
                        },
                        "plan:features": { hosting: "Хостинг" },
                        promocode: {
                            activated_promocode_title: "Активирован промокод",
                            error: { not_found: "Промокод не найден" },
                            label: "Введите ваш промокод",
                            title: "Промокод",
                        },
                        remove_card_confirm: {
                            text: "После удаления карты вам придется вводить данные заново, а также будет отключено автопродление.",
                            title: "Вы точно хотите удалить карту?",
                        },
                        result: {
                            error_note:
                                "Попробуйте позже или выберите другой способ оплаты",
                            error_title: "Ошибка при оплате",
                            success_note:
                                "Фактическое зачисление платежа может занять несколько минут",
                            success_title: "Оплата получена",
                            title: "Результат операции",
                            try_again_button: "Попробовать еще раз",
                        },
                        services: {
                            domain_reg_desc: "Регистрация домена %domain%",
                            domain_renew_desc: "Продление домена %domain%",
                            sms_desc: "Пакет %sms_count% СМС-уведомлений",
                            subscription_desc: "Лицензия на ПО Flexbe №%s_id%",
                        },
                        sms: {
                            note: "Поддерживаются только российские номера. Пакет не имеет ограничений по сроку использования.",
                            select_title: "Выберите пакет СМС",
                            title: "СМС — Оплата",
                        },
                        sms_desc: "%count% СМС",
                        stripe: {
                            card_change_error: "Не удалось изменить карту",
                            card_changed_notify: "Карта изменена",
                            card_expiry: "Дата окончания",
                            card_number: "Номер карты",
                            payment_error:
                                "Не удается совершить платеж. Повторите попытку позже",
                            title: "Банковская карта",
                        },
                        summary: {
                            autopay_title: "Следующее списание",
                            enter_promocode_button: "Ввести промокод",
                            manual_payment_button: "Сделать разовый платеж",
                            pay_belgie_reg: "Услуга регистрации БелГИЭ",
                            pay_purpose:
                                "Лицензия на ПО Flexbe по тарифу «%plan%» на %period%",
                            pay_purpose_domain_reg:
                                "Регистрация домена %domain% на 1 год",
                            pay_purpose_domain_renew:
                                "Продление домена %domain% на 1 год",
                            pay_purpose_sms: "Пакет %count% СМС-уведомлений",
                            title: "Итого к оплате",
                        },
                        tip: {
                            pay_belgie_reg: "*включая государственную пошлину",
                        },
                        title: "Оплата",
                        upgrade: {
                            abtest: {
                                text: "Позволяет определить, какой вариант секции лучше конвертирует посетителей в потенциальных клиентов",
                                title: "A/Б тестирование",
                            },
                            copyright: {
                                text: "Нельзя отключить надпись «Создано на Flexbe» на текущем тарифе",
                                title: "Скрытие лейбла Flexbe",
                            },
                            dynamic_replacement: {
                                text: "Позволяет через специальные метки в рекламных ссылках показывать посетителям разные варианты секций",
                                title: "Мультисекция",
                            },
                            geo_replacement: {
                                text: "Позволяет определить город посетителя и показывать ему специальный вариант секции для его города",
                                title: "Геосекция",
                            },
                            multitext: {
                                text: "Позволяет подменять текст на странице напрямую через специальную метку в рекламных ссылках",
                                title: "Мультитекст",
                            },
                            projects: {
                                definition:
                                    "Сайт — набор страниц объединенных доменным именем",
                                not_owner_warning:
                                    "Для смены тарифа обратитесь к владельцу аккаунта",
                                note: "Максимальное число сайтов на вашем тарифном плане",
                                title: "Лимит исчерпан",
                            },
                            title: "Опция недоступна на вашем тарифе",
                        },
                    },
                    profile: {
                        credentials: {
                            change_password_button: "Изменить пароль",
                            email_taken_error:
                                "Email уже используется другим аккаунтом",
                            new_pass_empty: "Укажите новый пароль",
                            pass_short: "Минимальная длина пароля 5 символов",
                            password_new_label: "Новый пароль",
                            password_old_error: "Старый пароль не совпадает",
                            password_old_label: "Старый пароль",
                            title: "Данные аккаунта",
                        },
                        interface: {
                            language_label: "Язык интерфейса",
                            timezone_label: "Часовой пояс",
                            title: "Язык и страна",
                        },
                        subscriptions: { title: "Уведомления" },
                        title: "Профиль",
                    },
                    tariff: {
                        business_100_title: "Бизнес 100",
                        business_100_title_new: "Бизнес 100",
                        business_10_title: "Бизнес 10",
                        business_10_title_new: "Бизнес 10",
                        business_12_title_new: "Бизнес 12",
                        business_15_title_new: "Бизнес 15",
                        business_20_title: "Бизнес 20",
                        business_20_title_new: "Бизнес 20",
                        business_25_title_new: "Бизнес 25",
                        business_2_title_new: "Бизнес 2",
                        business_30_title: "Бизнес 30",
                        business_30_title_new: "Бизнес 30",
                        business_35_title_new: "Бизнес 35",
                        business_3_title_new: "Бизнес 3",
                        business_4_title_new: "Бизнес 4",
                        business_50_title: "Бизнес 50",
                        business_50_title_new: "Бизнес 50",
                        business_5_title_new: "Бизнес 5",
                        business_60_title_new: "Бизнес 60",
                        business_6_title_new: "Бизнес 6",
                        business_70_title_new: "Бизнес 70",
                        business_7_title_new: "Бизнес 7",
                        business_85_title_new: "Бизнес 85",
                        business_8_title_new: "Бизнес 8",
                        business_title: "Бизнес",
                        business_title_new: "Бизнес",
                        small_business_title: "Малый бизнес",
                        small_business_title_new: "Малый бизнес",
                        start_title: "Стартовый",
                        start_title_new: "Стартовый",
                    },
                    trial: {
                        paid_user_error:
                            "Продление бесплатного периода недоступно. Для продолжения работы <a href='/admin/user/pay/'>оплатите тариф</a>.",
                    },
                    unsubscribe: {
                        pay_label: "Напоминания об оплате",
                        pay_label_desc:
                            "Уведомления о предстоящих и совершенных платежах",
                        pay_note:
                            "Уведомления о предстоящих и совершенных платежах",
                        promo_label: "Обновления продукта",
                        promo_label_desc:
                            "Промоакции, новости и обновления редактора Flexbe",
                        promo_note:
                            "Промоакции, новости и обновления редактора Flexbe",
                        save_button: "Сохранить настройки",
                        settings_saved_text: "Настройки подписки изменены",
                        subtitle:
                            "К вам будут приходить следующие типы рассылок:",
                        successful_unsubscribe_from_pay_text:
                            "Больше к вам не будут приходить <br/>напоминания об оплате",
                        successful_unsubscribe_from_promo_text:
                            "Больше к вам не будут приходить <br/>информационные рассылки",
                        successful_unsubscribe_from_tips_text:
                            "Больше к вам не будут приходить <br/>обучающие материалы",
                        tips_label: "Обучающие материалы",
                        tips_label_desc:
                            "Помощь в создании, редактировании и продвижении вашего сайта",
                        tips_note:
                            "Помощь в создании, редактировании и продвижении вашего сайта",
                        title: "Настройка рассылок",
                    },
                },
            },
            main: {
                button: {
                    add: "Добавить",
                    apply: "Применить",
                    back: "Назад",
                    cancel: "Отмена",
                    cancel_changes: "Отменить изменения",
                    cancellation: "Отменить",
                    change: "Изменить",
                    change_plan: "Сменить тариф",
                    close: "Закрыть",
                    confirm: "Подтвердить",
                    continue: "Продолжить",
                    copy: "Копировать",
                    copy_done_state: "Скопировано",
                    copy_to_buffer: "Копировать в буфер",
                    create: "Создать",
                    deactivate: "Отключить",
                    delete: "Удалить",
                    disable: "Отключить",
                    done: "Готово",
                    download: "Скачать",
                    duplicate: "Дублировать",
                    edit: "Изменить",
                    enable: "Подключить",
                    go_to_payment: "Перейти к оплате",
                    login: "Войти",
                    modify: "Редактировать",
                    more_settings: "Больше настроек",
                    next: "Далее",
                    paste: "Вставить",
                    paste_from_buffer: "Вставить из буфера",
                    reconnect: "Переподключить",
                    rename: "Переименовать",
                    replace: "Заменить",
                    reset: "Сбросить",
                    restore: "Восстановить",
                    save: "Сохранить",
                    saved: "Сохранено",
                    search: "Поиск",
                    select: "Выбрать",
                    settings: "Настроить",
                    thanks: "Спасибо",
                    understand: "Понятно",
                    upload: "Загрузить",
                },
                change_password_tip: "Изменить пароль",
                copy_suffix: "копия",
                error: {
                    default: "Ошибка",
                    enable_field: "Обязательное поле",
                    extra_spaces: "Удалите лишние пробелы",
                    fill_field: "Заполните поле",
                    forbidden: "Доступ запрещен",
                    incorrect_answer:
                        "Некорректный ответ сервера. Попробуйте еще раз.",
                    invalid_domain: "Некорректный домен",
                    invalid_email: "Некорректный email",
                    invalid_url: "Некорректный URL",
                    network: "Ошибка сети. Попробуйте еще раз.",
                    no_results: "Ничего не найдено",
                    not_authorized: "Требуется авторизация",
                    page_not_found: "Страница не найдена",
                    password_5chars_minimum:
                        "Минимальная длина пароля 5 символов",
                    payment_required: "Основной тариф не оплачен",
                    sql: "Ошибка базы данных",
                    unknown: "Неизвестная ошибка",
                    upload_file: "Ошибка загрузки файла",
                    upload_format_file: "Некорректный тип файла",
                    upload_image: "Не удалось загрузить изображение",
                },
                "error:check_fields": "Исправьте ошибки в полях",
                flexbe_domain: "flexbe.ru",
                invalid_file_extension:
                    "Неверное расширение файла: %file_name%",
                invalid_file_size:
                    "Размер файла превышает максимально допустимый размер (%size% Мб)",
                label: {
                    company_name: "Название компании",
                    company_name_placeholder:
                        "ООО «Граф» или ИП Шишкин Михаил Иванович",
                    country: "Страна",
                    currency: "Валюта",
                    email: "Электронная почта",
                    fullname: "ФИО",
                    fullname_placeholder: "Иванов Алексей Иванович",
                    language: "Язык",
                    password: "Пароль",
                    phone_number: "Номер телефона",
                    post_address: "Почтовый адрес",
                    post_address_placeholder:
                        "ул. Профессора Баранова, д. 34, офис 309, г. Калининград",
                    timezone: "Часовой пояс",
                },
                language: {
                    by: "Белорусский",
                    cs: "Чешский",
                    de: "Немецкий",
                    en: "Английский",
                    es: "Испанский",
                    fr: "Французский",
                    ge: "Грузинский",
                    he: "Иврит",
                    hu: "Венгерский",
                    it: "Итальянский",
                    kz: "Казахский",
                    lv: "Латышский",
                    pl: "Польский",
                    pt: "Португальский",
                    ro: "Румынский",
                    ru: "Русский",
                    th: "Тайский",
                    tr: "Турецкий",
                    ua: "Украинский",
                },
                modal: {
                    confirm: {
                        unsaved_changes: {
                            text: "Изменения не были применены",
                            title: "Вы уверены, что хотите закрыть окно?",
                        },
                    },
                },
                month_genetive: {
                    april: "апреля",
                    august: "августа",
                    december: "декабря",
                    february: "февраля",
                    january: "января",
                    july: "июля",
                    june: "июня",
                    march: "марта",
                    may: "мая",
                    november: "ноября",
                    october: "октября",
                    september: "сентября",
                },
                months: {
                    april: "Апрель",
                    august: "Август",
                    december: "Декабрь",
                    february: "Февраль",
                    january: "Январь",
                    july: "Июль",
                    june: "Июнь",
                    march: "Март",
                    may: "Май",
                    november: "Ноябрь",
                    october: "Октябрь",
                    september: "Сентябрь",
                },
                placeholder: {
                    "100vh": "По экрану",
                    inherit: "Наследуется",
                    none: "Не задано",
                },
                required_field_missing_error: "Заполните поле",
                save_text: {
                    saving: "Сохранение",
                    success: "Сохранено",
                    try_again: "Повторить",
                },
                time: {
                    hours: {
                        one: "%count% час",
                        few: "%count% часа",
                        many: "%count% часов",
                        other: "%count% часа",
                    },
                    minutes: {
                        one: "%count% минута",
                        few: "%count% минуты",
                        many: "%count% минут",
                        other: "%count% минуты",
                    },
                },
                toast: {
                    copied: "Скопировано в буфер обмена",
                    duplicated: "Сдублировано",
                    inserted: "Вставлено",
                    loading_files_title: "Загрузка файлов",
                    loading_title: "Загрузка",
                    nothing_to_paste: "Нет содержимого для вставки",
                    removed: "Удалено",
                    sliced: "Вырезано",
                    success_upload: {
                        one: "Загружен %uploadedCount% файл",
                        few: "Загружено %uploadedCount% файла",
                        many: "Загружено %uploadedCount% файлов",
                        other: "Загружено %uploadedCount% файла",
                    },
                    upload_default_error: "Не удалось загрузить файлы",
                    upload_invalid_error:
                        "Невозможно загрузить файлы этого типа",
                    upload_missed_warning:
                        "Недопустимые файлы не были загружены",
                    upload_multiple_error:
                        "Невозможно загрузить несколько файлов",
                    upload_size_error: "Слишком большой размер файла",
                    uploading_count: "%uploadedCount% из %uploadingCount%",
                },
                week: {
                    friday: "Пятница",
                    monday: "Понедельник",
                    saturday: "Суббота",
                    sunday: "Воскресенье",
                    thursday: "Четверг",
                    tuesday: "Вторник",
                    wednesday: "Среда",
                },
                week_days: {
                    friday_short: "Пт",
                    monday_short: "Пн",
                    saturday_short: "Сб",
                    sunday_short: "Вс",
                    thursday_short: "Чт",
                    tuesday_short: "Вт",
                    wednesday_short: "Ср",
                },
            },
            menu: {
                account_members: "Пользователи",
                analytics: "Аналитика",
                avatar_note: "Ваш профиль",
                ecommerce: "Товары",
                editor: {
                    code: "Код",
                    desktop_mode_tip: "ПК и планшеты",
                    device_emulation_disabled: "Отключено",
                    device_emulation_scale_tip:
                        "Минимальная ширина %width% px. На устройствах шириной менее %width% px отображается масштабированная версия сайта.",
                    device_emulation_tip:
                        "Отобразить сайт в редакторе с шириной выбранного устройства",
                    device_emulation_title: "Эмуляция устройства",
                    fonts: "Шрифты",
                    globals: "Глобальная секция",
                    grid_options: {
                        color_title: "Цвет колонок",
                        column_width_title: "Ширина колонки",
                        columns_title: "Колонки",
                        gap_title: "Ширина отступа",
                        modal_title: "Настройка сетки",
                        on_save_tip: "Настройки сетки сохранены",
                        presets_list: {
                            one: "%count% колонка",
                            few: "%count% колонки",
                            many: "%count% колонок",
                            other: "%count% колонки",
                        },
                        recents_applied_tip: "Применены последние параметры",
                        recents_btn: "Последние параметры",
                        recents_tip: "Применяет ранее установленные параметры",
                        reset_applied_tip: "Применены настройки по умолчанию",
                    },
                    hide_tip: "Показать/скрыть меню",
                    "legacy-mark":
                        "Страница на устаревшем шаблоне. Доступны не все возможности платформы",
                    mobile_mode_tip: "Мобильные",
                    page_config: {
                        auto_reposition_label: "Автовыбор контейнера",
                        auto_reposition_tip:
                            "Автоматически менять контейнер при перемещении элемента. Используйте %key%, если настройка отключена",
                        distance_between_elements_tip:
                            "Всегда отображать расстояния между элементами и до точек привязки. Используйте %key%, если настройка отключена",
                        elements_errors_label: "Ошибки в элементах",
                        fixed_rulers_tip: "Фиксированные линейки",
                        floating_rulers_tip: "Плавающие линейки",
                        hidden_elements_label: "Показать скрытые объекты",
                        hidden_elements_tip:
                            "Показывать в редакторе элементы и секции, скрытые для выбранного режима просмотра",
                        show_distance_label: "Показывать расстояния",
                        show_grid_label: "Показывать сетку",
                        show_guides_label: "Направляющие",
                        show_layers_label: "Показать панель слоёв",
                        snapping_to_object: "Прилипание к объектам",
                    },
                    page_config_tip: "Опции редактора",
                    page_settings: "Настройки страницы",
                    popups: "Окна",
                    preview_tip: "Предпросмотр",
                    redo_step: "Вернуть",
                    restore_tip: "История сохранений",
                    show_editor_tip: "Показать редактор",
                    undo_step: "Отменить",
                    zoom_reset: "Сбросить",
                    zoom_title: "Масштаб",
                },
                help: "Помощь",
                help_chat: "Чат с поддержкой",
                leads: "Заявки",
                logout: "Выйти из аккаунта",
                pages: "Страницы",
                pay: "Оплата",
                pay_plan: "Тарифный план",
                profile: "Профиль",
                projects: "Сайты",
                settings: "Настройки",
                user_is_locked: "Заблокирован",
                user_left_n_days: {
                    one: "Остался %count% день",
                    few: "Осталось %count% дня",
                    many: "Осталось %count% дней",
                    other: "Осталось %count% дня",
                },
                user_pay_till: "Оплачено до",
                user_trial_till: "Пробный период до",
            },
            theme: {
                atom: {
                    block: {
                        bundle: "Секция с вкладками",
                        cards: "Секция с карточками",
                        default: "Секция",
                        empty: "Пустая секция",
                        footer: "Секция подвал",
                        free: "Свободная секция",
                        gallery: "Секция с галереей",
                        global: "Глобальная секция",
                        grid: "Секция с колонками",
                        header: "Секция шапка",
                        html: "HTML Секция",
                        logo: "Секция с лого",
                        map: "Секция с картой",
                        partner: {
                            filter_gray: "Черно-белые логотипы",
                            show_borders: "Показывать рамки",
                        },
                        products: "Секция с товарами",
                        tabs: { default_tab: "Вкладка %count%" },
                    },
                    cart: {
                        bg_color: "Цвет затемнения",
                        discount_block_label: "Блок «До скидки осталось»",
                        discount_block_tip:
                            "Отображается, если в разделе Настройки — Скидки и промокоды есть скидка, которая может быть применена при увеличении общей суммы товаров в корзине",
                        fg_color: "Цвет корзины",
                        free_delivery_label:
                            "Блок «Осталось до бесплатной доставки»",
                        free_delivery_tip:
                            "Отображается, если у выбранного способа доставки установлено значение «Бесплатно от»",
                        icon_color: "Цвет иконки",
                        promocode_link_label:
                            "Ссылка «Добавить промокод» вместо формы",
                        promocode_link_tip:
                            "Форма ввода промокода отображается только в случае добавленных промокодов в разделе Настройки — Скидки и промокоды",
                        round_images: "Круглые изображения",
                        show_changed_prices_label:
                            "Уведомление при изменении цены товара",
                        show_changed_prices_tip:
                            "Отображается, если цена товара, добавленного в корзину, меняется в разделе Товары",
                        show_items_in_stock_label: "Индикация наличия товара",
                        show_items_in_stock_tip:
                            "Если товар в наличии, будет отображаться статус «В наличии». Статусы «Нет в наличии» и «Под заказ» будут отображаться вне зависимости от этой опции",
                        show_vendor_code: "Артикул товара",
                        show_vendor_code_tip:
                            "Артикул будет отображаться, если он указан в карточке товара",
                    },
                    element: {
                        apps_buttons: { desc: "Кнопки приложений" },
                        "avatar01-1": { desc: "Иконка с описанием" },
                        avatar01: {
                            desc: "Автор",
                            show_socials: "Социальные профили",
                            socials_alignment: "Выравнивание",
                            socials_position_icons: "Положение",
                            theme: {
                                atom: {
                                    element: {
                                        avatar01: {
                                            tip_end: "Сбоку от текста",
                                        },
                                    },
                                },
                            },
                            tip_bottom: "Под текстом",
                        },
                        avatar: {
                            icon_align: "Выравнивание иконки",
                            show_icon: "Показывать иконку",
                            show_subtitle: "Показывать описание",
                            show_title: "Показывать заголовок",
                            type_icon: "Иконка",
                            type_image: "Картинка",
                            type_title: "Тип",
                        },
                        before_later: {
                            desc: "До / После",
                            direction: "Направление разделителя",
                            initial: "Начальная позиция",
                            overlay_position: "Положение текста",
                            overlay_position_auto: "По краям",
                            overlay_position_center: "По центру",
                        },
                        "button01-1": { desc: "Две кнопки" },
                        "button01-2": { desc: "Кнопка с описанием" },
                        button01: { desc: "Кнопка" },
                        button: {
                            gap_title: "Отступ между элементами",
                            position_left: "Слева",
                            position_right: "Справа",
                            position_title: "Показывать текстовое описание",
                            second_title: "Показывать вторую кнопку",
                        },
                        figure: { desc: "Фигура" },
                        form01: { desc: "Вертикальная форма" },
                        form02: { desc: "Горизонтальная форма" },
                        header_button: { desc: "Кнопка" },
                        header_cart: { desc: "Корзина" },
                        "header_contacts-1": { desc: "Иконка + контакты" },
                        header_contacts: {
                            desc: "Иконка + контакты + подпись",
                        },
                        header_divider: { desc: "Пустая область" },
                        header_icon: { desc: "Иконка" },
                        header_logo: { desc: "Логотип" },
                        header_spacer: { desc: "Спейсер" },
                        header_text: { desc: "Текст" },
                        hr01: { desc: "Разделитель" },
                        hr: {
                            color: "Цвет разделителя",
                            height: "Толщина разделителя",
                            width: "Длина разделителя",
                        },
                        html: "HTML Элемент",
                        icon01: { desc: "Иконка" },
                        icon_cross: { desc: "Закрыть окно" },
                        image01: { desc: "Круглое изображение" },
                        lang_menu: { desc: "Языковое меню" },
                        line: { desc: "Линия" },
                        logo01: { desc: "Логотип" },
                        map01: { desc: "Карта" },
                        "media01-1": { desc: "Видео" },
                        "media01-2": { desc: "Слайдер" },
                        media01: { desc: "Изображение" },
                        "menu01-1": { desc: "Вертикальное меню" },
                        "menu01-2": { desc: "Хлебные крошки" },
                        menu01: { desc: "Горизонтальное меню" },
                        rotator01: { desc: "Анимированный текст" },
                        rotator02: { desc: "Бегущая строка" },
                        social01: { desc: "Социальные профили" },
                        spacer: { desc: "Спейсер" },
                        "spoiler01-1": { desc: "Описание с ценой" },
                        spoiler01: { desc: "Спойлер" },
                        spoiler: {
                            enable_accordion:
                                "Сворачивать пункт при открытии другого",
                            enable_accordion_tip:
                                "Автоматическое сворачивание пункта спойлера при открытии другого",
                            enable_desc: "Показывать описание",
                            enable_image: "Показывать изображение",
                            enable_price: "Показывать цену",
                            enable_separator: "Показывать разделители",
                            enable_spoiler: "Сворачивать описание",
                            icon_spoiler_title: "Стиль индикатора",
                            separator_hide_outermost:
                                "Скрыть крайние разделители",
                            separator_outer: "Разделитель по всей ширине",
                        },
                        table01: { desc: "Таблица" },
                        table_cell: { html: "HTML Таблица" },
                        tag: { desc: "Метка" },
                        "text01-1": { desc: "Заголовок" },
                        "text01-2": { desc: "Подзаголовок" },
                        "text01-3": { desc: "Цитата" },
                        text01: { desc: "Текст" },
                        timer01: { desc: "Таймер" },
                    },
                    modal: {
                        default: "Окно",
                        free: "Свободное окно",
                        html: "HTML Окно",
                        quiz: "QUIZ окно",
                    },
                    widget: {
                        cart: "Корзина",
                        fixed_area: "Фиксированные элементы",
                    },
                    zone: {
                        card: "Карточка",
                        column: "Колонка",
                        column1: "Левая колонка",
                        column2: "Правая колонка",
                        default: "Контент-зона",
                        header: "Шапка",
                        modal: "Контент окна",
                        sectionFooter: "Подвал секции",
                        sectionTitle: "Заголовок секции",
                        tabs: "Вкладки",
                        zone_cards: "Список карточек",
                        zone_gallery: "Список изображений",
                        zone_grid: "Колонки",
                        zone_header: "Ряд шапки",
                        zone_logo: "Список логотипов",
                        zone_products: "Список товаров",
                    },
                },
            },
        },
    })),
    (window.tr = function (e, t) {
        return /::/.test(e) ? polyglot.t(e, t) : e;
    });

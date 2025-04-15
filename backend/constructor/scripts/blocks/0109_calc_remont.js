BLOCKS[109] = {
    name: 'Калькулятор ремонта',
    id_categories: [
        EnumCategories.CALCULATE,
        EnumCategories.FORMS,
    ],
    settings:[
        ['html_variant', 'Калькулятор ремонта'],
    ],
    html_variants:[
        [
            'Калькулятор ремонта',
            `
                <div class="wrp">
                    <div class="wrp-shadow">
                        <div class="container">
                            <h2 contenteditable></h2>
                            <h3 contenteditable></h3>
                            <div class="calc-box">
                                <h4 contenteditable></h4>
                                <ul class="list"></ul>
                                <div contenteditable class="btn-wrp">
                                    <div contenteditable class="btn"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        ],
    ],
    tags:[
        {
            class: '.wrp',
            title: 'Главный блок',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#eeeeee'}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/0109/1683044950_64513a564b05b.jpg'}],
                [EnumOption.BACKGROUND_REPEAT,{edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_SIZE, {val:'cover', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_POSITION, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.COLOR, {val:'#ffffff'}],
            ],
            tags_options_mobile: [
                [EnumOption.BACKGROUND_POSITION, {val:'unset', edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: '.wrp-shadow',
            title: 'Затемнение блока с картинкой',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.POSITION, {val:'relative', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_COLOR, {val:'#00000095'}],
            ],
        },
        {
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_DIRECTION, {val:'column', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:1000}],
                [EnumOption.Z_INDEX, {val:100, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
                [EnumOption.PADDING, {val:[48,0,48,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.PADDING, {val:[32,16,32,16]}],
            ]
        },
        {
            class: 'h2',
            title: 'Заголовок',
            text: 'Ремонт квартир в Москве от компании «Мастера ремонта»',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:46}],
                [EnumOption.MARGIN, {val:[0,0,0,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:35}],
            ]
        },
        {
            class: 'h3',
            title: 'Описание',
            text: 'Сделаем качественный ремонт квартиры под ключ. Расширенная гарантия до 3х лет. Подбор, закупка и доставка материала.',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:28}],
                [EnumOption.FONT_WEIGHT, {val:400}],
                [EnumOption.MARGIN, {val:[16,0,24,0]}],
            ],
        },
        {
            class: 'h4',
            title: 'Заголовок калькулятора',
            text: 'Узнайте стоимость ремонта',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:24}],
                [EnumOption.FONT_WEIGHT, {val:700}],
                [EnumOption.FONT_WEIGHT, {val:600}],
                [EnumOption.MARGIN, {val:[0,0,0,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.MARGIN, {val:[0,0,12,0]}],
            ],
        },
        {
            class: '.calc-box',
            title: 'Форма',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_DIRECTION, {val:'column', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_COLOR, {val:'#ffffff'}],
                [EnumOption.PADDING, {val:[30,25,30,25]}],
                [EnumOption.BORDER_RADIUS, {val:[10,10,10,10]}],
                [EnumOption.WIDTH_PERCENT, {val:80}],
                [EnumOption.WIDTH_MAX, {val:668}],
                [EnumOption.COLOR, {val:'#000000'}],
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH_PERCENT, {val:90}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ],
        },
        {
            tag: 'ul',
            class: 'ul.list',
            title: 'Список инпутов',
            li_html: `<div class="li-box">
                        <div class="li-title ${EnumLiTargeting.STRING}"></div>
                        <span class="li-html ${EnumLiTargeting.HTML}"></span>
                    </label>`,
            li_array :  [
                {strings: ['Количество комнат'], htmls: [`
                    <label class="el" html-id="count-room-radio"><input type="radio" name="room_count">1</label>
                    <label class="el on" html-id="count-room-radio"><input type="radio" name="room_count">2</label>
                    <label class="el" html-id="count-room-radio"><input type="radio" name="room_count">3</label>
                    <label class="el" html-id="count-room-radio"><input type="radio" name="room_count">4+</label>
                    <script>
                        $('[html-id="count-room-radio"] input').unbind('change');
                        $('[html-id="count-room-radio"] input').change(function(){
                            var elem = $(this).closest('[html-id]');
                            var all = $('[html-id="count-room-radio"]');
                            all.removeClass('on');
                            elem.addClass('on');
                        });
                    </script>
                    <style>
                        /* Базовый цвет input */
                        [html-id="count-room-radio"] {
                            background-color: #f0f5f8;
                            cursor: pointer;
                        }
                        /* Подсветка при нажатии на input */
                        [html-id="count-room-radio"].on {
                            background-color: #36c;
                            color: #fff;
                        }
                    </style>
                `] },
                {strings: ['Метраж помещения'], htmls: [`
                    <div class="metr-box">
                        <input type="number" value="70" html-id="mert-room-val">
                        <input type="range" min="15" max="300" value="70" html-id="mert-room-range">
                    </div>
                    <script>
                        $('[html-id="mert-room-range"]').unbind('input');
                        $('[html-id="mert-room-range"]').on('input',function(){
                            console.log($(this).val());
                            var elem = $(this).closest('[html-id]');
                            var inp = $('[html-id="mert-room-val"]');
                            inp.val(elem.val());
                        });
                        $('[html-id="mert-room-val"]').unbind('input');
                        $('[html-id="mert-room-val"]').on('input',function(){
                            console.log($(this).val());
                            var elem = $(this).closest('[html-id]');
                            var inp = $('[html-id="mert-room-range"]');
                            inp.val(elem.val());
                        });
                    </script>
                    <style>
                        /* Блок с инпутами */
                        .metr-box {
                            display: flex;
                            align-items: center;
                        }
                        /* Интуп c числом */
                        [html-id="mert-room-val"] {
                            width: 3.4em;
                            margin-right: 10px;
                            font-size: 18px;
                            padding: 6px 0px 6px 12px;
                            border: 2px solid #36c;
                            border-radius: 3px;
                        }
                    </style>
                `] },
                {strings: ['Укажите тип дома'], htmls: [`
                    <select html-id="type-house">
                        <option>Новостройка</option>
                        <option>Вторичка</option>
                    </select>
                    <style>
                        [html-id="type-house"]{
                            border: 2px solid #36c;
                            width: 100%;
                        }
                    </style>
                `] },
                {strings: ['Дополнительно нужно'], htmls: [`
                    <label><input type="checkbox">Разработать дизайн-проект</label>
                    <label><input type="checkbox">Подобрать чистовой материал бесплатно</label>
                    <label><input type="checkbox">Получить дизайн кухни бесплатно</label>
                `] },
                {strings: ['Укажите тип ремонта'], htmls: [`
                    <label><input type="radio" name="type_remont">Евроремонт</label>
                    <label><input type="radio" name="type_remont">Дизайнерский</label>
                    <label><input type="radio" name="type_remont">Черновой</label>
                `] },
            ],
            tags_options: [
                [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:0, edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.TEXT_ALIGN, {val:'left', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
            ]
        },
        {
            class: 'ul.list li',
            title: 'Элемент списка',
            tags_options: [
                [EnumOption.WIDTH_PERCENT, {val:50}],
                [EnumOption.PADDING, {val:[0,10,0,10]}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.PADDING, {val:[0,0,0,0]}],
            ],
        },
        {
            class: 'label',
            title: 'Элемент списка',
            tags_options: [
                [EnumOption.DISPLAY, {val:'block', edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.li-box',
            title: 'Блок в калькуляторе',
            tags_options: [
                [EnumOption.PADDING, {val:[8,0,8,0]}],
                [EnumOption.FONT_SIZE, {val:15}],
                [EnumOption.CURSOR, {val:'pointer', edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.li-box .li-title',
            title: 'Заголовок элемента калькулятора',
            tags_options: [
                [EnumOption.MARGIN_BOTTOM, {val:10}],
                [EnumOption.FONT_SIZE, {val:18}],
            ],
        },
        {
            class: '.li-box .el',
            title: 'Элементы количества комнат',
            tags_options: [
                [EnumOption.DISPLAY, {val:'inline-block'}],
                [EnumOption.BORDER_RADIUS, {val:[5,5,5,5]}],
                [EnumOption.WIDTH_MIN, {val:30}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
                [EnumOption.PADDING, {val:[7,12,7,12]}],
            ],
        },
        {
            class: '.li-box input[type="checkbox"], .li-box input[type="radio"]',
            title: 'Отступы инпутов',
            tags_options: [
                [EnumOption.MARGIN, {val:[0,7,0,0], edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.li-box select',
            title: 'Селекторы',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.PADDING, {val:[10,16,10,16]}],
                [EnumOption.BORDER_RADIUS, {val:3}],
            ],
        },
        {
            class: '.li-box .el input[type="radio"]',
            title: 'Галочка элемента списка',
            tags_options: [
                [EnumOption.DISPLAY, {val:'none', edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.btn',
            title: 'Кнопка',
            text: 'Узнать стоимость',
            tags_options: [
                [EnumOption.HREF, {val:'#popup:noksform_1'}],
                [EnumOption.DISPLAY, {val:'inline-block', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER_RADIUS, {val:5}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.BACKGROUND_COLOR, {val:'#3366cc'}],
                [EnumOption.PADDING, {val:[16,80,16,80]}],
                [EnumOption.CURSOR, {val:'pointer', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_TOP, {val:24}],
            ],
        },
    ],
};
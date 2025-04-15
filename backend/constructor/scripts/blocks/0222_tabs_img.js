BLOCKS[222] = {
    name: 'Табы с картинками',
    id_categories:[
        EnumCategories.TEXT_BLOCK,
        EnumCategories.OTHER
    ],
    settings: [
        ['html_variant', 'Табы с картинками'],
    ],
    tags:[
        {
            tag: '',
            class: '.steps',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#ffffff'}],
                [EnumOption.PADDING, {val:[45, 0, 45, 0]}],
            ],
        },
        {
            tag: '',
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.PADDING, {val:[0, 15, 0, 15]}],
                [EnumOption.WIDTH_MAX, {val:1170}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto'}],
            ],
        }, 
        {
            tag: '',
            class: '.section-h2',
            text: 'О нашей компании',
            title: 'Заголовок',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:42}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:30}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:24}],
                [EnumOption.MARGIN, {val:[0,0,20,0]}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ]
        },
        {
            tag: '',
            class: '.sub_title',
            title: 'Подзаголовок',
            text: 'О нашей компании мы расскажем здесь',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.MARGIN, {val:[0,0,20,0]}],
            ]
        },
        {
            tag: 'ul',
            class: '.tab-nav',
            title: 'Навигация',
            li_html: `
                        <input type="radio" name="tabset" aria-controls="marzen">
                        <span class="${EnumLiTargeting.STRING}" ></span>`,
            li_array :  [ 
                {strings: ['Заголовок 1']},
                {strings: ['Заголовок 2']},
                {strings: ['Заголовок 3']},
            ],
            tags_options: [
                [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:0, edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.TEXT_ALIGN, {val:'left', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER_BOTTOM, {val:[1,'solid','#cccccc']}],
            ]
        },
        {
            tag: '',
            class: '.tab-nav li',
            title: 'Навигация item',
            tags_options: [
                [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[0,10,0,10], edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.TEXT_ALIGN, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:45}],

            ]
        },
        {
            tag: 'ul',
            class: '.tab-panels',
            title: 'Контент таба',
            li_html: `
            <div class="column1">
                <div class="img-wrp"><img class="${EnumLiTargeting.IMAGE}" /></div>
            </div>
            <div class="column2">
                <div class="ttl ${EnumLiTargeting.STRING}"></div>
                <div class="content ${EnumLiTargeting.STRING}"></div>
                <a href="" class="btn ${EnumLiTargeting.STRING}"></a>
            </div>
            
            `,
            li_array :  [
                {strings: ['Заголовок 1','Для современного мира новая модель организационной деятельности способствует подготовке и реализации направлений прогрессивного развития. Вот вам яркий пример современных тенденций — консультация с широким активом однозначно определяет каждого участника как способного принимать собственные решения касаемо стандартных подходов. ','Заказать'], images : ['/resource/img/constructor_default/portfolio/img1.jpg']},
                {strings: ['Заголовок 2','Для современного мира новая модель организационной деятельности способствует подготовке и реализации направлений прогрессивного развития. Вот вам яркий пример современных тенденций — консультация с широким активом однозначно определяет каждого участника как способного принимать собственные решения касаемо стандартных подходов. ','Заказать'], images : ['/resource/img/constructor_default/portfolio/img1.jpg']},
                {strings: ['Заголовок 3','Для современного мира новая модель организационной деятельности способствует подготовке и реализации направлений прогрессивного развития. Вот вам яркий пример современных тенденций — консультация с широким активом однозначно определяет каждого участника как способного принимать собственные решения касаемо стандартных подходов. ','Заказать'], images : ['/resource/img/constructor_default/portfolio/img1.jpg']},
            ],
            tags_options: [
                [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[30,0,30,0], edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.TEXT_ALIGN, {val:'left', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER_BOTTOM, {val:[1,'solid','#cccccc']}],
            ]
        },
        {
            tag: '',
            class: '.tab-panels li',
            title: 'Контент таба стили',
            tags_options: [
                [EnumOption.TEXT_ALIGN, {val:'left', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.FONT_SIZE, {val:16}],
            ]
        },
        {
            tag: '',
            class: '.ttl',
            title: 'Заголовок контента',
            tags_options: [
                [EnumOption.MARGIN, {val:[0,0,15,0]}],
                [EnumOption.TEXT_ALIGN, {val:'left', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.FONT_WEIGHT, {val:700}],
            ]
        },
        {
            tag: '',
            class: '.column1',
            title: 'Колонка',
            tags_options: [
                [EnumOption.MARGIN, {val:[0,0,15,0]}],
                [EnumOption.PADDING, {val:[0,15,0,0]}],
                [EnumOption.TEXT_ALIGN, {val:'left', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:30,unit: '%'}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%'}],
                [EnumOption.PADDING, {val:[0,0,0,0]}],
            ],
        },
        {
            tag: '',
            class: '.column1 .img-wrp',
            title: 'Контейнер фото',
            tags_options: [
                [EnumOption.WIDTH, {val:100,unit: '%'}],
            ],
            tags_options_mobile: [
                [EnumOption.HEIGHT, {val:260}],
                [EnumOption.PADDING, {val:[0,0,0,0]}],
                [EnumOption.OVERFLOW, {val:'hidden'}],
            ],
        },
        {
            tag: '',
            class: '.column2',
            title: 'Колонка',
            tags_options: [
                [EnumOption.MARGIN, {val:[0,0,15,0]}],
                [EnumOption.PADDING, {val:[0,15,0,15]}],
                [EnumOption.TEXT_ALIGN, {val:'left', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:70,unit: '%'}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%'}],
            ],
        },
        {
            tag: '',
            class: '.column1 img',
            title: 'Фото',
            tags_options: [
                [EnumOption.MARGIN, {val:[0,0,15,0], edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH_MAX, {val:100,unit: '%', edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            tag: '',
            class: '.btn',
            title: 'Кнопка',
            text: 'Отправить',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER, {val:[1, 'none', '#FFFFFF']}],
                [EnumOption.BORDER_RADIUS, {val:70}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.HEIGHT, {val:45, edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:200}],
                [EnumOption.BACKGROUND_COLOR, {val:'#E20C07', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN, {val:[20,0,20,0]}],
                [EnumOption.CURSOR, {val:'pointer', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.TEXT_DECORATION, {val:'none', edit_option : EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
            ]
        },
        

   
    ],
    html_variants: [
        [
            'Табы с картинками',
            `
            <div class="steps">
                <div class="container">
                    <h2 class="section-h2" contenteditable></h2>
                    <div class="sub_title" contenteditable></div>
                    <div>
                        <div class="tabset">
                            <ul class="tab-nav" data-ul="ul-tab1"></ul>
                            <ul class="tab-panels" data-ul="ul-tab2"></ul>
                        </div>
                    </div>
                    <div style="display:none;">
                    <script>
                    $(document).ready(function(){
                        $('ul[data-ul=ul-tab2] li').each(function(){ $(this).hide();})
                        $('ul[data-ul=ul-tab1] li').find('input').eq(0).prop('checked', true);
                        $('ul[data-ul=ul-tab2] li').eq(0).show();
                        $('ul[data-ul=ul-tab1] li').eq(0).addClass('active');

                    })
                        $(document).on('click','ul[data-ul=ul-tab1] li',function(){
                            let item = $(this).index();
                            
                            $(this).find('input').prop('checked', true);
                            $('ul[data-ul=ul-tab2] li').each(function(){ $(this).hide();})
                            $('ul[data-ul=ul-tab1] li').each(function(){ $(this).removeClass('active');})
                            $(this).addClass('active');
                            $('ul[data-ul=ul-tab2] li').eq(item).show();
                            
                        })
                    </script>
                    <style>
                    ul[data-ul=ul-tab1] li input {
                        opacity: 0;
                        width: 0;
                    }
                    ul[data-ul=ul-tab1] li {
                        border: 1px solid #fff;
                        border-bottom: 1px solid #fff;
                        margin-bottom: -1px;
                        padding: 0 10px;
                        font-size: 16px;
                        border-bottom: 1px solid #cccccc;
                    }
                    ul[data-ul=ul-tab1] li.active {
                        border: 1px solid #ccc;
                        border-bottom: 1px solid #fff;
                        margin-bottom: -1px;
                    }
                    </style>
                    </div>
                </div>
            </div>
            `
        ],

    ]

};

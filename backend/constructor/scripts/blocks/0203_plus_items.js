BLOCKS[203] = {
    name: 'Преимущества',
    id_categories:[
        EnumCategories.ABOUT_THE_PROJECT
    ],
    settings: [
        ['html_variant', 'Преимущества'],
    ],
    tags:[
        {
            tag: '',
            class: '.pluses',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#ededed'}],
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
            title: 'Заголовок',
            text: 'Почему мы?',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:46}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:35}],
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
            text: 'наши преимущества',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:30}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:26}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.MARGIN, {val:[0,0,20,0]}],
            ]
        },       
        {
            tag: 'ul',
            class: '.list',
            title: 'Контейнер Колонки',
            li_html: `<div class="column-3 column">
                        <div class="image-wrp ${EnumLiTargeting.STRING}"></div>
                        <div class="container-text">
                            <div class="title ${EnumLiTargeting.STRING}"></div>
                            <div class="text ${EnumLiTargeting.STRING}"></div> 
                        </div>
                    </div>`,
            li_array :  [
                {strings : ['1','Заявка','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
                {strings : ['2','Расчет стоимости','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
                {strings : ['3','Строительство','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
                {strings : ['4','Сдача проекта','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
                {strings : ['3','Строительство','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
                {strings : ['4','Сдача проекта','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
            ],
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.MARGIN, {val:[0, -15, 0 ,-15]}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto'}],
            ],
        },
        {
            class: '.image-wrp',
            title: 'Фон - стили',
            tags_options: [
                [EnumOption.WIDTH, {val:60}],
                [EnumOption.HEIGHT, {val:60}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.MARGIN_RIGHT, {val:10}],
                [EnumOption.BORDER_RADIUS, {val:50,unit:'%'}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.BACKGROUND_COLOR, {val:'#ff822e'}],                
            ],
        },
        {
            class: '.title',
            title: 'Заголовок - стили',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.FONT_WEIGHT, {val:700}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.MARGIN, {val:[0, 0, 10, 0]}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.COLOR, {val:'#1A1A1D7a'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:14}],
                [EnumOption.COLOR, {val:'#1A1A1D7a'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ]
        },
        {
            class: '.container-text',
            title: 'Текстовый блок - стили',
            tags_options: [
                [EnumOption.POSITION, {val:'relative'}],
                [EnumOption.FONT_SIZE, {val:15}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.PADDING, {val:15}],
                [EnumOption.WIDTH, {val:70,unit: '%'}],
                
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:75,unit: '%'}],
                [EnumOption.PADDING, {val:15}],
            ]
        },
        {
            class: '.text',
            title: 'Описание - стили',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:15}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.MARGIN, {val:[0, 0, 0, 0]}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:14}],
            ]
        },
        {
            tag: '',
            class: '.list li',
            title: 'Колонка',
            tags_options: [
                [EnumOption.WIDTH, {val:33,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:15,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            tag: '',
            class: '.column',
            title: 'Контейнер item',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
   
    ],
    html_variants: [
        [
            'Преимущества',
            `
            <div class="pluses">
                <div class="container">
                    <div class="section-h2" contenteditable></div>
                        <div class="sub_title" contenteditable></div>
                        <ul class="list"> </ul>
                    </div>
                </div>
            </div>
            `
        ],

    ]

};
{
    /* <div class="column-3 column column-11">
                                    <div class="image-wrp image-wrp1" contenteditable></div>
                                    <div class="container-text container-text-1">
                                        <div class="title column-title-1" contenteditable></div>
                                        <div class="text column-text-1" contenteditable></div> 
                                    </div>
                                </div>
                                <div class="column-3 column column-12">
                                    <div class="image-wrp image-wrp2" contenteditable></div>
                                    <div class="container-text container-text-2">
                                        <div class="title column-title-2" contenteditable></div>
                                        <div class="text column-text-2" contenteditable></div> 
                                    </div>
                                </div>
                                <div class="column-3 column column-13">
                                    <div class="image-wrp image-wrp3" contenteditable></div>
                                    <div class="container-text container-text-3">
                                        <div class="title column-title-3" contenteditable></div>
                                        <div class="text column-text-3" contenteditable></div> 
                                    </div>
                                </div>
                                <div class="column-3 column column-14">
                                    <div class="image-wrp image-wrp4" contenteditable></div>
                                    <div class="container-text container-text-4">
                                        <div class="title column-title-4" contenteditable></div>
                                        <div class="text column-text-4" contenteditable></div> 
                                    </div>
                                </div>
                                <div class="column-3 column column-15">
                                    <div class="image-wrp image-wrp5" contenteditable></div>
                                    <div class="container-text container-text-5">
                                        <div class="title column-title-5" contenteditable></div>
                                        <div class="text column-text-5" contenteditable></div> 
                                    </div>
                                </div>
                                <div class="column-3 column column-16">
                                    <div class="image-wrp image-wrp6" contenteditable></div>
                                    <div class="container-text container-text-6">
                                        <div class="title column-title-6" contenteditable></div>
                                        <div class="text column-text-6" contenteditable></div> 
                                    </div>
                                </div> */}
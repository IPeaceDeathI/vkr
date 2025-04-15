BLOCKS[12] = {
    name: 'Слайдер',
    id_categories: [
        EnumCategories.GALLERY,
        EnumCategories.IMAGE
    ],
    settings: [
        ['html_variant', 'Слайдер'],
    ],
    tags:[
        {
            class: '.section-slider',
            title: 'Блок слайдера',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#F2FBFFff', edit_option: EnumEditOption.EDITABLE}],
                [EnumOption.PADDING, {val:[60,0,60,0]}],
                [EnumOption.BACKGROUND_IMAGE, {val:''}],
                [EnumOption.BACKGROUND_REPEAT,{edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_SIZE, {val:'cover', edit_option: EnumEditOption.ADVANCED}],
                [EnumOption.BACKGROUND_POSITION, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.section-slider h2',
            title: 'Заголовок',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:46}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:35}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:24}],
                [EnumOption.MARGIN, {val:[0,0,20,0]}],
            ]
        },
        {
            class: '.sub_title',
            title: 'Подзаголовок',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:22}],
                [EnumOption.COLOR, {val:'#1A1A1D'}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:20}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:17}],
            ]
        },
        {
            class: '.slider-wrp',
            title: 'Контейнер слайдера',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:22}],
                [EnumOption.COLOR, {val:'#1A1A1D'}],
                [EnumOption.POSITION, {val:'relative',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[0,0,0,0]}],
            ],
        },
        {
            tag: 'ul',
            class: '.slider-list',
            title: 'Список слайдов',
            li_html: `<div class="item"><img class="${EnumLiTargeting.IMAGE}"/></div>`,
            li_array :  [
                {images : ['/resource/img/constructor_default/blockSlider/image9.jpg']},
                {images : ['/resource/img/constructor_default/blockSlider/image9.jpg']},
                {images : ['/resource/img/constructor_default/blockSlider/image9.jpg']},
                {images : ['/resource/img/constructor_default/blockSlider/image9.jpg']},
            ],
            tags_options: [
                [EnumOption.FONT_SIZE, {val:22}],
                [EnumOption.COLOR, {val:'#1A1A1D'}],
                [EnumOption.POSITION, {val:'relative',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.LEFT, {val:'0',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.TOP, {val:'0',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val: 100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN, {val:[0,0,0,0],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'nowrap',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:1600,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[0,0,0,0]}],
            ],
            tags_options_tablet: [
                [EnumOption.HEIGHT, {val:250,edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.HEIGHT, {val:250,edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.MARGIN, {val:[0,0,0,0]}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[0, 15, 0, 15],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH_MAX, {val:1170,edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.slider-scroll',
            title: 'Контейнер - scroll',
            tags_options: [
                [EnumOption.OVERFLOW_X, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        
        {
            class: '.item',
            title: 'Контейнер Картинки',
            tags_options: [
                // [EnumOption.WIDTH_MAX, {val:475}],
                [EnumOption.WIDTH, {val:495}],
                [EnumOption.PADDING, {val:[0, 15, 0 ,15],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:340}],
                [EnumOption.OVERFLOW, {val:'hidden',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.HEIGHT, {val:280,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH_MAX, {val:300}],
                [EnumOption.WIDTH, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[0, 5, 0 ,5],edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.HEIGHT, {val:250}],
            ]
        },
        {
            class: '.item img',
            title: 'Картинки',
            tags_options: [
                [EnumOption.WIDTH_MAX, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.OBJECT_FIT, {val:'cover',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.slider',
            title: 'Слайдер',
            tags_options: [
                [EnumOption.WIDTH_MAX, {val:'1500px',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[40, 0, 30 , 0],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN, {val:[0, 0, 0 , 0],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.POSITION, {val:'relative',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.OVERFLOW_X, {val:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.PADDING, {val:[40, 0, 0 , 0],edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: '.item-nav',
            title: 'Навигация слайдера',
            tags_options: [
                [EnumOption.TOP, {val:0,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BOTTOM, {val:0,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:35,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:35,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER_RADIUS, {val: 50,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.Z_INDEX, {val:4,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.POSITION, {val:'absolute',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.item-nav-left',
            title: 'Навигация слайдера - левая кнопка',
            tags_options: [
                [EnumOption.LEFT, {val:75,edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        
        {
            class: '.button-slider',
            title: 'Под слайдером',
            tags_options: [
                [EnumOption.WIDTH_MAX, {val:233,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN, {val:[0,0,0,0],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.button',
            title: 'Кнопка',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER, {val:[1, 'none', '#FFFFFFff;']}],
                [EnumOption.BORDER_RADIUS, {val:70,unit:'px'}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.HEIGHT, {val:45}],
                [EnumOption.WIDTH_PERCENT, {val:100,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_COLOR,{val: '#E20C07ff'}],
                [EnumOption.MARGIN, {val:[10,0,10,0]}],
                [EnumOption.CURSOR, {val:'pointer',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.TEXT_DECORATION, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.btn-wrp',
            title: 'Контейнер кнопки',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        
        
    ],

    html_variants: [
        [
            'Слайдер',
            `
            <div class="wrapper">
                <div class="section-slider section-padding">
                    <div class="container">
                        <h2 class="section-h2" contenteditable>Мы готовы помочь 24/7</h2>
                        <div class="sub_title">У нас есть обучающие видео по настройке конструктора, создания сайта, настройке СРМ и аналитике</div>   
                    <div class="slider-scroll">
                        <div class="slider-wrp"> 
                            <div class="slider">
                                <div class="slider-nav-wrp">
                                    <div class="item-nav item-nav-left"><img src="/resource/img/constructor_default/blockSlider/left.svg" alt=""></div>
                                    <div class="item-nav item-nav-right"><img src="/resource/img/constructor_default/blockSlider/right.svg" alt=""></div>
                                </div>
                                <ul class="slider-list">

                                </ul>
                            </div>
                        </div>
                    </div>

                    </div>
                    <div class="container">
                        <div class="btn-wrp">
                            <a href="" class="button button-slider">Задать вопрос</a>
                        </div>
                    </div>
                </div>
            </div>
            `
        ],

    ]
};
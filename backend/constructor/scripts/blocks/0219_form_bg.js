BLOCKS[219] = {
    name: 'Форма фон',
    settings: [
        ['html_variant', 'Форма фон'],
    ],
    id_categories:[
        EnumCategories.FORMS
    ],
    tags:[
        {
            tag: '',
            class: '.section',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/214/bg.jpg'}],
                [EnumOption.PADDING, {val:[45, 0, 45, 0]}],
                [EnumOption.POSITION, {val:'relative',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            tag: '',
            class: '.bg-color',
            title: 'Фон поверх картинки',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#000000d6'}],
                [EnumOption.POSITION, {val:'absolute',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.TOP, {val:0,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.LEFT, {val:0,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.RIGHT, {val:0,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BOTTOM, {val:0,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            tag: '',
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.PADDING, {val:[0, 15, 0, 15]}],
                [EnumOption.WIDTH_MAX, {val:1170}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            tag: '',
            class: '.section_h2',
            title: 'Заголовок',
            text: 'Заголовок формы',
            tags_options: [
                [EnumOption.COLOR, {val:'#ffffff'}],
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
            text: 'Подзаголовок формы укажите какие поля нужно заполнить',
            tags_options: [
                [EnumOption.COLOR, {val:'#ffffff'}],
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
            class: '.column-1',
            title: 'Колонка с фоном',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_DIRECTION, {val:'column',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[0, 15, 0, 15],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.BACKGROUND_COLOR, {val:'#00000000'}],
                [EnumOption.PADDING, {val:[50, 50, 50, 50]}],
                [EnumOption.POSITION, {val:'relative'}],
                [EnumOption.Z_INDEX, {val:5}],
            ],
            tags_options_tablet: [
                
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: '.form-columns',
            title: 'Контейнер формы',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],  
                [EnumOption.JUSTIFY_CONTENT, {val:'space-between'}],                          
            ],
            tags_options_tablet: [
                
                
            ],
            tags_options_mobile: [
                [EnumOption.DISPLAY, {val:'block'}],
            ]
        },
        {
            class: '.item-form',
            title: 'Колонка полей формы',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}], 
                [EnumOption.WIDTH, {val:32,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],   
                [EnumOption.MARGIN, {val:[0, 2, 0, 2],edit_option: EnumEditOption.NONEDITABLE}],   
                [EnumOption.COLOR, {val:'#ffffff'}],                          
            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],   
            ]
        },
        {
            class: '.item-form input',
            title: 'Поля формы',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#00000000',edit_option: EnumEditOption.NONEDITABLE}], 
                [EnumOption.HEIGHT, {val:56}],   
                [EnumOption.PADDING, {val:[0, 15, 0, 15]}],   
                [EnumOption.BORDER, {val:[1, 'solid', '#00000000']}],
                [EnumOption.COLOR, {val:'#ffffff'}], 
                [EnumOption.FONT_SIZE, {val:16}],                          
            ],
        },
        {
            class: '.item-form.itm',
            title: 'Поля формы текстовые',
            tags_options: [
                [EnumOption.BORDER, {val:[1, 'solid', '#c9c3c3']}],                          
            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
                [EnumOption.MARGIN, {val:[10, 0, 10, 0],edit_option: EnumEditOption.NONEDITABLE}],   
            ]
            
        },
        {
            class: '.form-wrp',
            title: 'Контейнер формы внешняя',
            tags_options: [
                [EnumOption.WIDTH, {val:100, unit:'%',edit_option: EnumEditOption.NONEDITABLE}], 
                [EnumOption.WIDTH_MAX, {val:900,edit_option: EnumEditOption.NONEDITABLE}],                            
            ],
        },
        {
            class: '.item-form .btn-submit',
            title: 'Кнопка формы',
            text: 'Отправить',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#f5914f'}],
                [EnumOption.HEIGHT, {val:56}],
                [EnumOption.PADDING, {val:[0, 15, 0, 15]}],
                [EnumOption.BORDER, {val:[1, 'solid', '#f5914f']}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.WIDTH, {val:100,unit:'%'}],
            ],
        },
    ],
    html_variants: [
        [
            'Форма фон',
            `
            <div class="section">
                <div class="bg-color"></div>
                <div class="container">
                    <div class="column-1">
                        <h2 class="section_h2" contenteditable></h2>
                        <div class="sub_title" contenteditable></div>
                        <div class="form-wrp">
                            <form>
                                <div class="form-columns">
                                    <div class="item-form itm">
                                        <input type="text" name="user_name" placeholder="Имя" required>
                                    </div>
                                    <div class="item-form itm">
                                        <input type="text" name="phone" placeholder="Телефон" required>
                                    </div>
                                    <div class="item-form">
                                        <button type="submit" class="btn-submit" contenteditable></button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            `
        ],
    ]
};
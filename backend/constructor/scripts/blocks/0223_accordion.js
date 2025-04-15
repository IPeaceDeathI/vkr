BLOCKS[223] = {
    name: 'Accordions',
    id_categories:[
        EnumCategories.TEXT_BLOCK,
        EnumCategories.OTHER
    ],
    settings: [
        ['html_variant', 'Accordions'],
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
            text: 'Вопрос - ответ',
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
            text: 'Ответы на самые распространенные вопросы',
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
            class: '.accordion-nav',
            title: 'Аккордеон контент',
            li_html: `
                        <div class="accordion ${EnumLiTargeting.STRING}"></div>
                        <div class="accordion-content ${EnumLiTargeting.STRING}"></div>
                    `,
            li_array :  [ 
                {strings: ['Заголовок 1','Для современного мира новая модель организационной деятельности способствует подготовке и реализации направлений']},
                {strings: ['Заголовок 2','Для современного мира новая модель организационной деятельности способствует подготовке и реализации направлений']},
                {strings: ['Заголовок 3','Для современного мира новая модель организационной деятельности способствует подготовке и реализации направлений']},
            ],
            tags_options: [
                [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:0, edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.TEXT_ALIGN, {val:'left', edit_option: EnumEditOption.NONEDITABLE}],
                
            ]
        },
        {
            tag: '',
            class: '.accordion-nav li',
            title: 'Навигация item',
            tags_options: [
                [EnumOption.PADDING, {val:[0,10,0,10], edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:100,unit:'%', edit_option: EnumEditOption.NONEDITABLE}],

            ]
        },
        {
            tag: '',
            class: '.accordion',
            title: 'Заголовок',
            tags_options: [
                [EnumOption.MARGIN, {val:[0,0,0,0]}],
                [EnumOption.TEXT_ALIGN, {val:'left', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.FONT_WEIGHT, {val:700}],
                [EnumOption.HEIGHT_MIN, {val:53, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER_BOTTOM, {val:[1,'solid','#cccccc']}],
            ]
        },      
        {
            tag: '',
            class: '.accordion-content',
            title: 'Описание',
            tags_options: [
                [EnumOption.MARGIN, {val:[0,0,0,0]}],
                [EnumOption.TEXT_ALIGN, {val:'left', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.BORDER_BOTTOM, {val:[1,'solid','#eeeeee']}],
            ]
        },      
    ],
    html_variants: [
        [
            'Accordions',
            `
            <div class="steps">
                <div class="container">
                    <h2 class="section-h2" contenteditable></h2>
                    <div class="sub_title" contenteditable></div>
                    <div>
                        <div class="accordion-wrp">
                            <ul class="accordion-nav" data-acc="accordion-nav" ></ul>
                            
                        </div>
                    </div>
                    <div style="display:none;">
                    <script>
                    $(document).ready(function(){
                        let accordionBtns = document.querySelectorAll("[data-acc=accordion-nav] li");
                        accordionBtns.forEach((accordion) => {
                        accordion.onclick = function () {
                            this.classList.toggle("is-open");

                            let content = this.querySelectorAll('div')[1];
                            //getElementsByClassName('accordion-content')[0];
                            if (content.style.maxHeight) {
                                content.style.maxHeight = null;
                            } else {
                                content.style.maxHeight = content.scrollHeight + "px";
                                console.log(content.style.maxHeight);
                            }
                        };
                        });
                    });

                    </script>
                    <style>
                    .accordion {
                        width: 100%;
                        background-color: #eeeeee;
                        border: none;
                        outline: none;
                        text-align: left;
                        padding: 15px 34px 15px 20px;
                        font-size: 18px;
                        color: #333;
                        cursor: pointer;
                        transition: background-color 0.2s linear;
                        position: relative;
                    }
                
                    .accordion-nav li.is-open .accordion-content {
                        padding: 20px;
                    }
                    .accordion-nav li .accordion:after {
                        content:'';
                        background-size: 15px;
                        width: 15px;
                        height: 15px;
                        background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3C!-- Uploaded to: SVG Repo  www.svgrepo.com  Generator: SVG Repo Mixer Tools --%3E%3Csvg fill='%23000000' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'  width='800px' height='800px' viewBox='0 0 100 100' enable-background='new 0 0 100 100' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M78.466 35.559L50.15 63.633L22.078 35.317c-0.777-0.785-2.044-0.789-2.828-0.012s-0.789 2.044-0.012 2.827L48.432 67.58c0.365 0.368 0.835 0.563 1.312 0.589c0.139 0.008 0.278-0.001 0.415-0.021c0.054 0.008 0.106 0.021 0.16 0.022c0.544 0.029 1.099-0.162 1.515-0.576l29.447-29.196c0.785-0.777 0.79-2.043 0.012-2.828S79.249 34.781 78.466 35.559z'/%3E%3C/g%3E%3C/svg%3E");
                        background-repeat: no-repeat;
                        position: relative;
                        background-position: 96% center;
                        position: absolute;
                        right: 15px;
                        top:0;
                        bottom: 0;
                        margin: auto;
                    }
                    
                    .accordion-nav li.is-open .accordion:after {
                        transform: rotate(180deg);
                    }
                      
                 
                    .accordion.is-open {
                        background-color: #eeeeee;
                    }
                    
                    .accordion-content {
                        background-color: white;
                        border-left: 1px solid #eeeeee;
                        border-right: 1px solid #eeeeee;
                        padding: 0;
                        max-height: 0;
                        overflow: hidden;
                        transition: max-height 0.2s ease-in-out;
                    }
                    .accordion-nav li:last-child .accordion-content {
                        border-bottom: 1px solid #eeeeee;
                    }
                      
                    </style>
                    </div>
                </div>
            </div>
            `
        ],

    ]

};

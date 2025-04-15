import { NestedTable } from "~/import_helper"
export var AdminModule = {
    template: `
    <div class="admin-module">
        <nested-table
            :heroes="gridData"
            :columns="nestedColumns.main"
            :nestedColumns = "nestedColumns"
            :filter-key="searchQuery"
        ></nested-table>
    </div>
    `,
    components:{
        'nested-table' : NestedTable,
    },
    data(){
        return{
            searchQuery : null,
            nestedColumns:{  
                            main: [
                                {key :'user_id', name:"id"},
                                {key :'user_fio', name:"ФИО"}, 
                                {key :'user_phone', name:"Телефон"}, 
                                {key :'user_email', name:"email"}, 
                                {key :'user_date_last_login', name:"Дата последнего почещения"},
                                {key :'user_date_register',  name:"Дата регистрации"},
                                {key :'sites', name:"Количесвто сайтов"}, 
                            ],
                            sites : [
                                {key : 'id', name:"id"},
                                {key : 'id_flow', name: "id_группы"},
                                {key : 'id_user_create', name: "id_создателя"},
                                {key : 'preview', name: "Превью"},
                                {key : 'add_date_time', name: "Дата создания"},
                                {key : 'update_date_time', name: "Дата обновления"},
                                {key : 'title', name: "Название"},
                                {key : 'status', name: "Статус"},
                                {key : 'pages', name: "Страницы"},
                            ],
                            pages :[
                                {key : 'page_id', name:"id"},
                                {key : 'id_user_create', name: "id_создателя"},
                                {key : 'add_date_time', name: "Дата создания"},
                                {key : 'update_date_time', name: "Дата обновления"},
                                {key : 'description', name: "Описание"},
                                {key : 'uri', name: "uri"},
                                {key : 'views', name: "Просмотры"},
                                {key : 'status', name: "Статус"},

                            ]
                        },
        }
    },
    computed:{
        gridData(){
            return this.$store.getters.GET_USERS;
        }
    },

    mounted(){
        this.$store.dispatch("UPDATE_USERS")
    }
}
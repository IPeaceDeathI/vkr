import {ToolbarItemSvg} from '~/import_helper.js'
import {Modules} from '~/import_helper.js'

export var MainToolbarItem = {
    template: `
        <a v-on:click="select" class="main-toolbar-item">
            <div class="rs-item" :class="{select: isSelect}" :title="title">
                <div class="rs-simple-item">
                    <div class="fa" :class="icon"></div>
                </div>
            </div>  
        </a>
    `,
    // data(){ return {
    //     isSelect : false,
    // }},
    props: {
        icon: {
            type : String,
            default : ToolbarItemSvg.DEFAULT
        },
        title: {
            type : String,
            default : "Раздел в разработке"
        },
        attached_module: {
            type : Number,
            default : Modules.DEFAULT
        }
    },
    computed:{
        isSelect(){
            return this.$store.getters.GET_MODULE == this.attached_module;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity;
        } 
    },
    methods: {
      select() {
        this.$store.dispatch('SET_MODULE',this.attached_module)
      },
    }
}

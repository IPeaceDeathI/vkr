import { MainSvg, Helpers } from "~/import_helper"

export default{
    template: `
    <div class="navigation-bar">
        <div class="logo-wrapper">
            ${MainSvg.LOGO}
        </div>
        <div v-on:click="toHome" class="on-main-button">
            <i class="fa fa-home"></i>
        </div>
    </div>`,
    methods:{
        toHome(){
            Helpers.redirect_to_home_page(); 
        }
    }
}
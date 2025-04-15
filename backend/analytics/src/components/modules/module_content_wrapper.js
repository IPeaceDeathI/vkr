import {MultiChannelAnalytics}  from './_multi_channel_analytics'
import {AdminModule}  from './_admin'
import {Modules} from '~/import_helper.js'

export default{
    template : `
    <div class="module-content-wrapper" v-if="selectedModule===${Modules.ADMIN} && isAdmin">   
        <admin-module></admin-module>
    </div>
    <div class="module-content-wrapper" v-else-if="selectedModule===${Modules.MULTI_CHANNEL_ANALYTICS}">
        <multi-channel-analytics></multi-channel-analytics>
    </div>
    <div class="module-content-wrapper" v-else-if="selectedModule===${Modules.DASHBOARD}">
        Модуль в разработке
    </div>
    <div class="module-content-wrapper" v-else>
        Модуль в разработке
    </div>  
    `,
    components:{
        'admin-module' : AdminModule,
        'multi-channel-analytics': MultiChannelAnalytics,
    },
    computed:{
        selectedModule(){     
            return this.$store.getters.GET_MODULE;
        },
        isAdmin(){
            return this.$store.getters.IS_ADMIN;
        }
    },
}
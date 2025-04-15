import ModuleContent from './modules/module_content_wrapper'
import TimeSelector from '~/components/helpers/time_period_selector'


export var ModuleWrapper = {
    template: `
    <div class="module-wrapper">
        <time-selector></time-selector>
        <module-content></module-content>
    </div>
    `,
    components:{
        'module-content' : ModuleContent,
        'time-selector' : TimeSelector,
    },
   
}


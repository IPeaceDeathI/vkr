import {MainToolbar} from './main_toolbar/toolbar.js'
import {ModuleWrapper} from './_module_wrapper.js'
import NavigationToolbar from './_navigation_bar.js'



export default  {
    template: `
    <div  class="main-wrapper">
        <navigation-toolbar></navigation-toolbar>
        <main-toolbar></main-toolbar>
        <module-wrapper></module-wrapper> 
    </div>
    `, 
    components:{
        'navigation-toolbar' : NavigationToolbar,
        'main-toolbar': MainToolbar,
        'module-wrapper': ModuleWrapper,
    },

}




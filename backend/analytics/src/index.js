import Vue from 'vue'

import MainWrapper from './components/main-wrapper'
import {store} from '~/import_helper'
console.log('test')






var app = new Vue({
  el: '#app',
  template: `
        <div>
            <main-wrapper></main-wrapper>
        </div>
    `,
  components:{
    'main-wrapper' : MainWrapper,
  },
  mounted: function(){
    this.$store.dispatch("SET_TIME_TO",new Date())
    //tomorrow
    let time = new Date();
    time.setDate(time.getDate() - 1);
    this.$store.dispatch("SET_TIME_FROM",time)
  },
  store
})
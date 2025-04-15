import DatePicker from "vue2-datepicker"
export default {

    template:`
    <div class="time-period-selector">
        <vue2-datepicker
            v-model="time1" 
            valueType="date"
            format="YYYY-MM-DD hh:mm:ss"
            title-format="YYYY-MM-DD hh:mm:ss"
            time-title-format-format="YYYY-MM-DD hh:mm:ss"
            range
        ></vue2-datepicker>
     
    </div>
    `, 
    components:{
        'vue2-datepicker':DatePicker,
    },
    computed:{
        time1:{
            get(){
                return [this.$store.getters.GET_TIME_FROM,
                        this.$store.getters.GET_TIME_TO]
            },
            set(value){
                this.$store.dispatch("SET_TIME_FROM",value[0])
                this.$store.dispatch("SET_TIME_TO",value[1])    
            },
        }
    }
    
}

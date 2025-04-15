export class Helpers{
    /**
     * 
     * @param {Date} data 
     * @returns 
     */
    static get_array_from_data(data){
        var time = {
            year : data.getFullYear(),
            month : data.getMonth(),
            day : data.getDate(),
            hour : data.getHours(),
            minute : data.getMinutes(), 
            seconds : data.getSeconds(),
        }
        return time;   
    }
    static get_current_time(){
        var currentdate = new Date(); 
       
        return currentdate;
    }

    static before_exit(){
        return;
    }
    static redirect_to_home_page(){
        this.before_exit();
        window.location.href = `/admin/sites`;
    }
}
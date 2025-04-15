import Api from "@/classes/Api";
//TODO добавить проверку на наличие изменнеий перед сохранением (ТОЛЬКО КОГДА ВСЕ ИЗМЕНЕНИЯ СЧИТЫВАЮТСЯ UNDOMANAGEROM)
export default class AutosaveManager{
    private static storageName = 'noksConstructorAutosaveEnabled'
    private static intervalId : NodeJS.Timer;
    private static readonly  intervalTime = 3000;
    public static init(){
        if(AutosaveManager.isEnabled()){
            AutosaveManager.enable()
        }else{
            AutosaveManager.disable()
        }
    }
    public static enable() : void{
        localStorage[AutosaveManager.storageName] = true;
        AutosaveManager.setAutosave()
    }
    public static disable() : void{
        localStorage[AutosaveManager.storageName] = false;
        AutosaveManager.unsetAutosave()
    }
    public static delete() : void{
        localStorage.removeItem(AutosaveManager.storageName);
    }
    public static isEnabled() : boolean{
        if(localStorage[AutosaveManager.storageName]===undefined) return true;
        return (!!JSON.parse(localStorage[AutosaveManager.storageName]))
    }
    private static setAutosave(){
        AutosaveManager.intervalId = setInterval(AutosaveManager.updateStructure, AutosaveManager.intervalTime)
    }
    private static unsetAutosave(){
        if(AutosaveManager.intervalId){
            clearInterval(AutosaveManager.intervalId)
        }
    }
    private  static async updateStructure(){
        try {
            const result = await Api.save_project_structure(
                {
                    blocks_structure: JSON.stringify(
                        (window as unknown as MyWindow).main.blocks_model.get_model_as_json()
                    ),
                    pages_options: JSON.stringify(
                        (window as unknown as MyWindow).main.page_model.get_model_as_json()
                    ),
                    page_hash_id : (window as unknown as MyWindow).main.get_page_hash_id()
                }
            )
        } catch (error) {
            console.log('Автосохранение ошибка: '+error)
        }
     
       
    }
}
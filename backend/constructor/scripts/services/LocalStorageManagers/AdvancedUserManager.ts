export default class AdvancedUserManager {
    private static storageName = 'noksConstructorAdvancedUserEnabled'
    public static enable() : void{
        localStorage[AdvancedUserManager.storageName] = true;
    }
    public static disable() : void{
        localStorage[AdvancedUserManager.storageName] = false;
    }
    public static delete() : void{
        localStorage.removeItem(AdvancedUserManager.storageName);
    }
    public static isEnabled() : boolean{
        if(localStorage[AdvancedUserManager.storageName]===undefined) return false;
        return (!!JSON.parse(localStorage[AdvancedUserManager.storageName]))
    }
}
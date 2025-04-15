import { Observable } from "@/classes/Observer";

export default class Options extends Observable {
    constructor(val) {
        super();
        if (val == null) console.log("Не указано значение для опции", this);
        if (val === [] || val === {})
            console.log(
                `%cЗначение val ${val} - массив. Никита, не балуй!!!`,
                "color: #ff0000"
            );
        this.val = val;
    }
}

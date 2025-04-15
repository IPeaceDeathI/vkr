import { DefineFlexbeService } from "./Define/Flexbe/DefineFlexbeService";
import { DefineTildaService } from "./Define/Tilda/DefineTildaService";
import { SAASConstructorEnum } from "./../../../Enum/SAASConstructor/SAASConstructorEnum";

export class DefineConstructorService {
    static define() {
        let s;
        s = new DefineFlexbeService();
        if (s.define()) return SAASConstructorEnum.FLEXBE;

        // ------------------------------------------------------------------
        //
        // ------------------------------------------------------------------

        s = new DefineTildaService();
        if (s.define()) return SAASConstructorEnum.TILDA;

        return null;
    }
}

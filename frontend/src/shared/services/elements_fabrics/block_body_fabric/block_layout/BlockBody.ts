import {
    collectMobileStyle,
    collectStyle,
    getSelector,
} from "@/shared/services";
import { BodyLayoutCommonParams, BodyLayoutParams } from "@/types";

export class BlockBody {
    protected getStyles(params: any): string {
        return "";
    }
    protected getMobileStyles(params: any): string {
        return "";
    }
    //Можно переопределить, если нужно добавить дополнительные селекторы со стилями
    protected getAdditionalCombinedStyles(id: id, params: any): string {
        return "";
    }
    public getCombinedStyles(id: id, params: BodyLayoutParams): string {
        const mainSelector = getSelector(id, `.block-body`, false);

        const mainStyles = collectStyle(mainSelector, this.getStyles(params));
        const mobileStyles = collectMobileStyle(
            mainSelector,
            this.getMobileStyles(params)
        );
        return (
            mainStyles +
            mobileStyles +
            this.getAdditionalCombinedStyles(id, params)
        );
    }
}

import {
    CardParams,
    CardStylesParams,
    ZoneStylesParams,
    ZoneTypes,
} from "@/types";
import { styleGenerator } from "@/shared/services/style";
import { Zone } from "./Zone";

export class Card extends Zone {
    protected static instance: Card;
    private constructor() {
        super();
        // сделать что-нибудь...
    }
    private convertCommoneStylesToWindow(
        params: ZoneStylesParams
    ): CardStylesParams {
        return {
            ...params,
            gapBetween: 50,
        };
    }
    static getInstance() {
        if (!Card.instance) {
            Card.instance = new Card();
            // ... здесь единожды выполняется инициализация ...
        }
        return Card.instance;
    }
    public getType(): ZoneTypes.card {
        return ZoneTypes.card;
    }

    public getDefaultParams(parentId: id): CardParams {
        const tmp = this.getZoneCommonParams(this.getType(), parentId);
        const result = {
            ...tmp,
            secondChildrenIds: [],
            enableSecondColumn: false,
            settings: {
                events: [],
                enableOnClick: false,
                enableOnHover: false,
            },
            styles: this.convertCommoneStylesToWindow(tmp.styles),
            type: this.getType(),
        };
        result.styles.shadow.enabled = true;
        result.styles.borderRadius.enabled = true;
        result.styles.background.color = "#ffffff";
        return result;
    }
    public getStyles(params: CardParams) {
        return styleGenerator([]) + this.getCommonStyles(params);
    }
    public getMobileStyles(params: CardParams) {
        return styleGenerator([]) + this.getCommonMobileStyles(params);
    }
}

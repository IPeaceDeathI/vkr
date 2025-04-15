import { BodyLayoutCommonParams, BodyLayoutType } from "./_common";

export interface BodyLayoutColumnParams extends BodyLayoutCommonParams {
    type: BodyLayoutType.columns;
    //DEVELOP
    mobile: {
        changeOrder: boolean;
    };
    //END DEVELOP
}

import { CommonZoneParams, ZoneSettings, ZoneTypes } from "./_common";

export interface BlockTitleParams extends CommonZoneParams {
    type: ZoneTypes.blockTitle;
    settings: ZoneSettings;
}

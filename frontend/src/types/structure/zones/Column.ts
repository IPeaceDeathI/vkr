import { CommonZoneParams, ZoneSettings, ZoneTypes } from "./_common";

export interface ColumnParams extends CommonZoneParams {
    type: ZoneTypes.column;
    cols: ColumnCols;
    settings: ZoneSettings;
}
export type ColumnCols =
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24;
export const MIN_COLS_SIZE: ColumnCols = 3;
export const MAX_COLS_SIZE: ColumnCols = 24;

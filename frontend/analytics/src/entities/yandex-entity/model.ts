import { ApiYandexEntity } from "@/shared/api/modules/YandexEntity";
import { YandexDirectEntity } from "./types";
// import { ApiYandexEntity } from '../../api/modules/YandexEntity';

export class YandexEntityModel {
    // CAMPAIGN CHANNEL YANDEX DIRECT
    static async getAllEntitys(
        stat_id: number,
        integration_id: number
    ): Promise<Array<YandexDirectEntity>> {
        return ApiYandexEntity.getInstance().GET_ALL_ENTITYS(
            stat_id,
            integration_id
        );
    }
}

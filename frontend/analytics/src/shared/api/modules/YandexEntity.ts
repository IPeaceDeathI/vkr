import { YandexDirectEntity } from "@/entities/yandex-entity/types";

import { z } from "zod";
import { SYandexDirectEntity } from "@/entities/yandex-entity/scheme";
import { BaseApi } from "./BaseApi";
// import { SYandexDirectEntity } from "../../entities/yandex-entity/scheme";
// import { YandexDirectEntity } from "../../entities/yandex-entity/types";

export class ApiYandexEntity extends BaseApi {
    private static instance: ApiYandexEntity;
    private localBaseUrl = `api/stat`;
    private constructor() {
        super();
    }

    public static getInstance() {
        ApiYandexEntity.instance = new ApiYandexEntity();
        return ApiYandexEntity.instance;
    }

    public async GET_ALL_ENTITYS(stat_id: number, integration_id: number) {
        const result: Array<YandexDirectEntity> = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/channel/yandex_direct/entity/campaign`,
            },
            z.array(SYandexDirectEntity)
        );
        return result;
    }
}

import { ApiNoks } from "@/shared/api/modules/Noks";
import { setAsyncTimeout } from "@/shared/libs/async";
import { NoksSites } from "./types";

export class NoksModel {
    static async postIntegration(
        stat_id: number,
        name: string
    ): Promise<number> {
        return ApiNoks.getInstance().postIntegrationSource(stat_id, name);
    }

    static async postIntegrationAuthSource(
        stat_id: number,
        integration_id: number,
        site_id: number
    ): Promise<boolean> {
        return ApiNoks.getInstance().postAuthSource(
            stat_id,
            integration_id,
            site_id
        );
    }

    static async getSites(
        integration_id: number,
        stat_id: number
    ): Promise<NoksSites> {
        return ApiNoks.getInstance().getSitesNoks(integration_id, stat_id);
    }
}

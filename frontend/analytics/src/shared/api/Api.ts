import * as models from "./modules";
export class Api {
    public static User() {
        return models.ApiUser.getInstance();
    }
    public static CrmAmo() {
        return models.ApiUser.getInstance();
    }
    public static Stat() {
        return models.ApiStat.getInstance();
    }
    public static ApiYandexDirect() {
        return models.ApiYandexDirect.getInstance();
    }
    public static Report() {
        return models.ApiReport.getInstance();
    }
}

import { Api } from "@/shared/api";
import { CategoriesData } from "@/shared/api/models";
import { CriticalError } from "@/shared/services/error_service";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";

export class CategoriesModel {
    public static getAllCategories(): Promise<Array<CategoriesData>> {
        try {
            return Api.Categories().GET();
        } catch {
            NotificationService.common().error({
                text: "Не удалось загрузить категории!",
            });
            throw new CriticalError({
                bundle: "not structure error",
                message: "Ошибка при получении категорий",
                isNotification: false,
            });
        }
    }
    public static addCategory(
        name: string,
        position?: number
    ): Promise<number> {
        try {
            return Api.Categories().POST({
                category_name: name,
                category_position: position,
            });
        } catch {
            NotificationService.common().error({
                text: "Не удалось добавить категорию!",
            });
            throw new CriticalError({
                bundle: "not structure error",
                message: "Ошибка при добавлении категорий",
                isNotification: false,
            });
        }
    }
}

import { Api } from "@/shared/api";
import { VideoPOSTResponse } from "@/shared/api/models/Video";
import { CriticalError } from "@/shared/services/error_service";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";

export class VideosModel {
    public static async getVideo(
        data: Array<File>
    ): Promise<VideoPOSTResponse> {
        const formData = data.map((file) => {
            const newForm = new FormData();
            newForm.append("Video", file);
            return newForm;
        });
        try {
            return Api.Video().POST(formData[0]);
        } catch {
            NotificationService.common().error({
                text: "Не удалось загрузить видео!",
            });
            throw new CriticalError({
                bundle: "not structure error",
                message: "Ошибка при загрузке видео",
                isNotification: false,
            });
        }
    }
    public static getAllVideo(
        data: Array<File>
    ): Array<Promise<VideoPOSTResponse>> {
        const formData = data.map((file) => {
            const newForm = new FormData();
            newForm.append("Video", file);
            return newForm;
        });
        const response = [] as Array<Promise<VideoPOSTResponse>>;
        formData.forEach((data) => {
            try {
                response.push(Api.Video().POST(data));
            } catch {
                NotificationService.common().error({
                    text: "Не удалось загрузить видео!",
                });
                throw new CriticalError({
                    bundle: "not structure error",
                    message: "Ошибка при загрузке видео",
                    isNotification: false,
                });
            }
        });
        return response;
    }
}

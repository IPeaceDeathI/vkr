import { Api } from "@/shared/api";
import { ImagePOSTResponse } from "@/shared/api/validation/Image";
import { CriticalError } from "@/shared/services/error_service";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";

export class ImagesModel {
    public static async getImage(
        data: Array<File>
    ): Promise<ImagePOSTResponse> {
        const formData = data.map((file) => {
            const newForm = new FormData();
            newForm.append("image", file);
            return newForm;
        });
        try {
            return Api.Image().POST(formData[0], false);
        } catch {
            NotificationService.common().error({
                text: "Не удалось загрузить фото!",
            });
            throw new CriticalError({
                bundle: "not structure error",
                message: "Ошибка при загрузке фото",
                isNotification: false,
            });
        }
    }
    public static getAllImage(
        data: Array<File>
    ): Array<Promise<ImagePOSTResponse>> {
        const formData = data.map((file) => {
            const newForm = new FormData();
            newForm.append("image", file);
            return newForm;
        });
        const response = [] as Array<Promise<ImagePOSTResponse>>;
        formData.forEach((data) => {
            try {
                response.push(Api.Image().POST(data, false));
            } catch {
                NotificationService.common().error({
                    text: "Не удалось загрузить фото!",
                });
                throw new CriticalError({
                    bundle: "not structure error",
                    message: "Ошибка при загрузке фото",
                    isNotification: false,
                });
            }
        });
        return response;
    }
    public static getImageResize(
        data: Array<File>
    ): Promise<ImagePOSTResponse> {
        const formData = data.map((file) => {
            const newForm = new FormData();
            newForm.append("image", file);
            return newForm;
        });
        try {
            return Api.Image().POST(formData[0], true);
        } catch {
            NotificationService.common().error({
                text: "Не удалось загрузить фото!",
            });
            throw new CriticalError({
                bundle: "not structure error",
                message: "Ошибка при загрузке фото",
                isNotification: false,
            });
        }
    }
    public static getImageResizeByUrl(
        data: string
    ): Promise<ImagePOSTResponse> {
        const newForm = new FormData();
        newForm.append("url", data);
        try {
            return Api.Image().POST(newForm, true);
            // return Api.Image().POSTbyUrl(newForm);
        } catch {
            NotificationService.common().error({
                text: "Не удалось загрузить фото!",
            });
            throw new CriticalError({
                bundle: "not structure error",
                message: "Ошибка при загрузке фото",
                isNotification: false,
            });
        }
    }
    public static getAllImageResize(
        data: Array<File>
    ): Array<Promise<ImagePOSTResponse>> {
        const formData = data.map((file) => {
            const newForm = new FormData();
            newForm.append("image", file);
            return newForm;
        });
        const response = [] as Array<Promise<ImagePOSTResponse>>;
        formData.forEach((data) => {
            try {
                response.push(Api.Image().POST(data, true));
            } catch {
                NotificationService.common().error({
                    text: "Не удалось загрузить фото!",
                });
                throw new CriticalError({
                    bundle: "not structure error",
                    message: "Ошибка при загрузке фото",
                    isNotification: false,
                });
            }
        });
        return response;
    }
}

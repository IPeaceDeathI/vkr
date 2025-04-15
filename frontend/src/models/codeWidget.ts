import { Api } from "@/shared/api";
import {
    GetResponseDataCodeWidget,
    PostPutDataCode,
    PostPutPosition,
} from "@/shared/api/models";
import { CriticalError } from "@/shared/services/error_service";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";
import { WidgetArea, WidgetStatus, CodeInterface } from "@/types";
import { ArrPutPosition } from "../shared/api/models/CodeWidget";

interface LoadResult {
    HeadWidgets: Array<CodeInterface>;
    BodyWidgets: Array<CodeInterface>;
}

// Тип для успешного ответа
interface SuccessResponse {
    data: number;
}

// Тип для неудачного ответа
interface ErrorResponse {
    errors?: Record<string, string>; // Объект с ключами типа string и значениями типа string
}

// тип результата, успешный или ошибочный
type ResultType = SuccessResponse | ErrorResponse;

// Тип для успешного ответа
interface SuccessResponsePut {
    data: boolean;
}
type SuccessResponse2 = SuccessResponsePut | boolean;
type ResultTypePut = SuccessResponse2 | ErrorResponse;
export class CodeWidgetModels {
    static $store: any;
    public static async load(projectID: number): Promise<LoadResult> {
        const sirieData = await Api.CodeWidget().GET(projectID);
        const headArray: Array<CodeInterface> = [];
        const bodyArray: Array<CodeInterface> = [];

        sirieData.forEach((widget) => {
            if (widget.area === WidgetArea.head) {
                headArray.push(getResponseDataToCodeInterfacew(widget));
            } else if (widget.area === WidgetArea.body) {
                bodyArray.push(getResponseDataToCodeInterfacew(widget));
            }
        });
        return {
            HeadWidgets: headArray,
            BodyWidgets: bodyArray,
        };
    }
    public static async save(
        projectID: number,
        data: PostPutDataCode
    ): Promise<ResultType> {
        console.log(data);
        try {
            //передаем массив и разделяем по area
            const result = await Api.CodeWidget().POST(projectID, data);

            if (result !== null && result !== undefined) {
                return result as SuccessResponse; // Вернем данные в случае успешного ответа
            } else {
                NotificationService.common().error({
                    text: "Не удалось сохранить!",
                });
                throw new CriticalError({
                    bundle: "not structure error",
                    message: "Ошибка при сохранении полей codeWidget",
                    isNotification: false,
                });
            }
        } catch (error: any) {
            const errorResponse: ErrorResponse = {
                errors: error.response?.data?.errors, // Попробуйте получить ошибки из ответа
            };

            return errorResponse;
        }
    }
    public static async edit(
        projectID: number,
        data: PostPutDataCode,
        widget_id: number
    ): Promise<ResultTypePut> {
        try {
            const result = await Api.CodeWidget().PUT(
                projectID,
                data,
                widget_id
            );
            return result as SuccessResponse2; // Вернем данные в случае успешного ответа
        } catch (error: any) {
            const errorResponse: ErrorResponse = {
                errors: error.response?.data?.errors, // Попробуйте получить ошибки из ответа
            };

            return errorResponse;
        }
    }
    public static async editPositionWidget(
        projectID: number,
        headArray: CodeInterface[],
        bodyArray: CodeInterface[]
    ): Promise<ResultTypePut> {
        try {
            ///получаем 2 массива head body,
            const newArrayHead: CodeInterface[] = headArray.map(
                (item: CodeInterface) => ({
                    ...item,
                    area: 0,
                })
            );
            const newArrayBody: CodeInterface[] = bodyArray.map(
                (item: CodeInterface) => ({
                    ...item,
                    area: 1,
                })
            );
            const codesDataAfter = [...newArrayHead, ...newArrayBody];
            console.log(codesDataAfter);
            const filteredArray: Array<PostPutPosition> = codesDataAfter.map(
                (obj) => ({
                    widget_id: obj.id,
                    position: obj.position,
                    area: obj.area,
                })
            );

            const positionCode: ArrPutPosition = {
                sorting: filteredArray,
            };
            const result = await Api.CodeWidget().PUT_SORTING(
                projectID,
                positionCode
            );
            return result as SuccessResponse2; // Вернем данные в случае успешного ответа
        } catch (error: any) {
            const errorResponse: ErrorResponse = {
                errors: error.response?.data?.errors, // Попробуйте получить ошибки из ответа
            };

            return errorResponse;
        }
    }
    // public static async editPositionWidget(
    //     projectID: number,
    //     data: ArrPutPosition
    // ): Promise<ResultTypePut> {
    //     try {
    //         ///получаем 2 массива head body,
    //         const result = await Api.CodeWidget().PUT_SORTING(projectID, data);
    //         return result as SuccessResponse2; // Вернем данные в случае успешного ответа
    //     } catch (error: any) {
    //         const errorResponse: ErrorResponse = {
    //             errors: error.response?.data?.errors, // Попробуйте получить ошибки из ответа
    //         };

    //         return errorResponse;
    //     }
    // }
    public static async delete(
        projectID: number,
        widget_id: number
    ): Promise<ResultTypePut> {
        try {
            const result = await Api.CodeWidget().DELETE(projectID, widget_id);
            return result as SuccessResponse2; // Вернем данные в случае успешного ответа
        } catch (error: any) {
            const errorResponse: ErrorResponse = {
                errors: error.response?.data?.errors, // Попробуйте получить ошибки из ответа
            };

            return errorResponse;
        }
    }
    public static async loadWidgetById(
        projectID: number,
        widgetID: number
    ): Promise<GetResponseDataCodeWidget | undefined> {
        const dataByProject = await Api.CodeWidget().GET(projectID);
        const widgetById = dataByProject.filter(
            (item) => item.widget_id === widgetID
        );

        return widgetById[0] ?? undefined;
    }
}
function getResponseDataToCodeInterfacew(
    response: GetResponseDataCodeWidget
): CodeInterface {
    return {
        id: response.widget_id,
        name: response.name,
        html: response.html === null ? "" : response.html,
        css: response.css === null ? "" : response.css,
        js: response.js === null ? "" : response.js,
        area: response.area === WidgetArea.head ? 0 : 1,
        status: response.status === WidgetStatus.active ? 1 : 0,
        file: response.file?.length === 0 ? "" : response.file,
        position: response.position,
    };
}

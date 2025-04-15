import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { NOKS_HOST } from "../../config";
import { ZodType } from "zod";
import { CriticalError } from "@/shared/services/error_service";
interface ResponseContainer<type> {
    data: type;
}
export class ApiModel {
    protected axiosConfig: AxiosRequestConfig;
    protected pathToData: Array<string>; // путь до ответа валидируемого типа Zod
    protected constructor() {
        this.axiosConfig = {
            baseURL: `${NOKS_HOST}api`,
            timeout: 10000,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        };
        this.pathToData = ["data"];
    }
    private zodValidate<T>(scheme: ZodType, result: T) {
        const response = scheme.safeParse(result);
        if (response.success === false) {
            throw new CriticalError({
                bundle: "not structure error",
                message: "Ошибка валидации типа ответа сервера",
                isNotification: false,
            });
        }
    }
    protected hookBeforeRequest(
        requestConfig: AxiosRequestConfig
    ): AxiosRequestConfig {
        const result = {
            ...this.axiosConfig,
            ...requestConfig,
        };
        return result;
    }
    protected hookAfterResponse<ResponseDataType>(
        response: AxiosResponse<ResponseContainer<ResponseDataType>>,
        validationScheme: ZodType
    ): ResponseDataType {
        const result = this.pathToData.reduce((acc, curr) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return acc[curr];
        }, response.data) as unknown as ResponseDataType;
        this.zodValidate(validationScheme, result);
        return result;
    }
    protected async get<ResponseDataType>(
        requestConfig: AxiosRequestConfig,
        validationScheme: ZodType
    ): Promise<ResponseDataType> {
        const getConfig = this.hookBeforeRequest(requestConfig);

        const response = await axios.get<ResponseContainer<ResponseDataType>>(
            getConfig.url ?? "",
            getConfig
        );
        return this.hookAfterResponse<ResponseDataType>(
            response,
            validationScheme
        );
    }
    protected async post<ResponseDataType>(
        requestConfig: AxiosRequestConfig,
        validationScheme: ZodType
    ): Promise<ResponseDataType> {
        const postConfig = this.hookBeforeRequest(requestConfig);
        const response = await axios.post<ResponseContainer<ResponseDataType>>(
            postConfig.url ?? "",
            postConfig.data,
            postConfig
        );
        return this.hookAfterResponse<ResponseDataType>(
            response,
            validationScheme
        );
    }
    protected async put<ResponseDataType>(
        requestConfig: AxiosRequestConfig,
        validationScheme: ZodType
    ): Promise<ResponseDataType> {
        const putConfig = this.hookBeforeRequest(requestConfig);
        const response = await axios.put<ResponseContainer<ResponseDataType>>(
            putConfig.url ?? "",
            putConfig.data,
            putConfig
        );

        return this.hookAfterResponse<ResponseDataType>(
            response,
            validationScheme
        );
    }
    protected async delete<ResponseDataType>(
        requestConfig: AxiosRequestConfig,
        validationScheme: ZodType
    ): Promise<ResponseDataType> {
        const deleteConfig = this.hookBeforeRequest(requestConfig);
        const response = await axios.delete<
            ResponseContainer<ResponseDataType>
        >(deleteConfig.url ?? "", deleteConfig);
        return this.hookAfterResponse<ResponseDataType>(
            response,
            validationScheme
        );
    }
}

// import { WidgetArea } from "@/validation/CodeWidget";
import { ApiModel } from "./main";
import { z } from "zod";
import { getResponseDataSchema } from "../validation/CodeWidget";
import { WidgetArea, WidgetStatus } from "@/types";

//данные уходят в post
export interface PostPutDataCode {
    name: string;
    html: string | null;
    css: string | null;
    js: string | null;
    area: WidgetArea;
    file: string;
    status: WidgetStatus;
    position: number;
}

export interface GetResponseDataCodeWidget {
    widget_id: number;
    site_page_id: number;
    status: WidgetStatus;
    name: string;
    css: string | null;
    js: string | null;
    html: string | null;
    file: string;
    area: WidgetArea;
    created_at: string;
    updated_at: string;
    position: number;
}

export interface PostPutPosition {
    widget_id: number;
    position: number;
    area: WidgetArea;
}
export interface ArrPutPosition {
    sorting: Array<PostPutPosition>;
}
export class ApiCodeWidget extends ApiModel {
    private static instance: ApiCodeWidget;
    private localBaseUrl = "/constructor/page";
    private constructor() {
        super();
    }
    static getInstance() {
        // console.log("ApiCodeWidget.instance", ApiCodeWidget);
        if (!ApiCodeWidget.instance) {
            ApiCodeWidget.instance = new ApiCodeWidget();
            // console.log("ApiCodeWidget", ApiCodeWidget.instance);
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiCodeWidget.instance;
    }
    public async GET(
        site_page_id: number
    ): Promise<Array<GetResponseDataCodeWidget>> {
        const result: Array<GetResponseDataCodeWidget> = await this.get(
            {
                url: `${this.localBaseUrl}/${site_page_id}/widget`,
            },
            getResponseDataSchema
        );
        return result;
    }
    public async POST(
        site_page_id: number,
        data: PostPutDataCode
    ): Promise<null> {
        const result: null = await this.post(
            {
                url: `${this.localBaseUrl}/${site_page_id}/widget`,
                data: data,
            },
            z.number()
        );
        return result;
    }
    public async PUT(
        site_page_id: number,
        data: PostPutDataCode,
        widget_id: number
    ): Promise<boolean> {
        const result: boolean = await this.put(
            {
                url: `${this.localBaseUrl}/${site_page_id}/widget/${widget_id}`,
                data: data,
            },
            z.boolean()
        );
        return result;
    }
    public async DELETE(
        site_page_id: number,
        widget_id: number
    ): Promise<boolean> {
        const result: boolean = await this.delete(
            {
                url: `${this.localBaseUrl}/${site_page_id}/widget/${widget_id}`,
                data: "",
            },
            z.boolean()
        );
        return result;
    }

    public async PUT_SORTING(
        site_page_id: number,
        data: ArrPutPosition
    ): Promise<boolean> {
        const result: boolean = await this.put(
            {
                url: `${this.localBaseUrl}/${site_page_id}/widget/sorting`,
                data: data,
            },
            z.boolean()
        );
        return result;
    }
}

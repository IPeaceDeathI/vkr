import { z } from "zod";

export interface Result {
    src: string;
    path_files: string;
    status: boolean;
    old_name: string;
    new_name: string;
    errors: Array<string>;
    size: number;
    resize?: Array<string>;
}

export interface VideoPOSTResponse {
    status: boolean;
    result: Array<Result>;
    errors: Array<string>;
}

const resultVideoData = z.object({
    src: z.string(),
    path_files: z.string(),
    status: z.boolean(),
    old_name: z.string(),
    new_name: z.string(),
    errors: z.array(z.string()),
    size: z.number(),
});

export const postResponseVideoSchema = z.object({
    status: z.boolean(),
    result: z.array(resultVideoData),
    errors: z.array(z.string()),
});

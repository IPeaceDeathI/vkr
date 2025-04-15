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

export interface ImagePOSTResponse {
    status: boolean;
    result: Array<Result>;
    errors: Array<string>;
}

const resultImageData = z.object({
    src: z.string(),
    path_files: z.string(),
    status: z.boolean(),
    old_name: z.string(),
    new_name: z.string(),
    errors: z.array(z.string()),
    size: z.number(),
    resize: z.array(z.string()).optional(),
});

export const postResponseImageSchema = z.object({
    status: z.boolean(),
    result: z.array(resultImageData),
    errors: z.array(z.string()),
});

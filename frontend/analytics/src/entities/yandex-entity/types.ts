import { z } from "zod";
import { SYandexDirectEntity } from "./scheme";

export type YandexDirectEntity = z.infer<typeof SYandexDirectEntity>;

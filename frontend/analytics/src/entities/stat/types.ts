import * as Schemes from "./scheme";
import { z } from "zod";

export type Stat = z.infer<typeof Schemes.SStat>;
export type StatPost = string;
export type StatPostTo = { name: string };

export type StatHash = z.infer<typeof Schemes.SStatHash>;

import * as Schemes from "./scheme";
import { z } from "zod";

export type UserInfoStat = z.infer<typeof Schemes.SUserInfoStat>;
export type UserInfoStatPost = { name: string };

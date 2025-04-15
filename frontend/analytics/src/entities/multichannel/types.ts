import { SApiChannel, SChannel } from "./scheme";
import { z } from "zod";

export type ApiChannel = z.infer<typeof SApiChannel>;
export type Channel = z.infer<typeof SChannel>;

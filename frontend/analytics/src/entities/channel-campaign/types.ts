import { z } from "zod";
import { SChannelCompaign } from "./scheme";
export type ChannelCompaign = z.infer<typeof SChannelCompaign>;

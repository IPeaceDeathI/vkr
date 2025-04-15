import { z } from "zod";

export const SApiChannel = z.object({
    name: z.string().optional(),
    visits: z.number().optional(),
    leads: z.number().optional(),
    multichannelLeads: z.number().optional(),
    sales: z.number().optional(),
    proceeds: z.number().optional(),
    expenses: z.number().optional(),
});
export const SChannel = z.object({
    name: z.string().optional(),
    visits: z.number().optional(),
    leads: z.number().optional(),
    leadsConversion: z.number().optional(),
    multichannelLeads: z.number().optional(),
    sales: z.number().optional(),
    salesConversion: z.number().optional(),
    proceeds: z.number().optional(),
    averageBill: z.number().optional(),
    expenses: z.number().optional(),
    profit: z.number().optional(),
});

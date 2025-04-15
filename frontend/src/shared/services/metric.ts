import { PublishTargetAttributes } from "@/publish";
import { GoalsParams } from "@/types";

type MetricTarget =
    | PublishTargetAttributes.metricsClick
    | PublishTargetAttributes.metricsSend;

// export function collectMetricsAttr(
//     goals: GoalsParams,
//     metricTarget: MetricTarget
// ): { [key in MetricTarget]: Array<string> } {
//     const arr = Object.values(goals).filter((el) => {
//         return el !== "";
//     });
//     return { [metricTarget]: arr };
// }
type Response = {
    [K in MetricTarget]: string;
};

export function collectMetricsAttr<T extends MetricTarget>(
    goals: GoalsParams,
    metricTarget: T
): {
    [K in T]: string;
} {
    const arr = Object.values(goals).filter((el) => {
        return el !== "";
    });

    return { [metricTarget]: JSON.stringify(arr) } as { [key in T]: string };
}

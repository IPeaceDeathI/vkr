import { DesktopSidesPadding, MobileSidesPadding } from "@/types";
import { InjectionKey, ComputedRef, Ref } from "vue";

export const INumberOfBlocks = Symbol() as InjectionKey<ComputedRef<number>>;
export const INumberOfZones = Symbol() as InjectionKey<ComputedRef<number>>;
export const IDesktopSidesPadding = Symbol() as InjectionKey<
    Ref<DesktopSidesPadding>
>;
export const IMobileSidesPadding = Symbol() as InjectionKey<
    Ref<MobileSidesPadding>
>;

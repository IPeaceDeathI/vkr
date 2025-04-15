import { TextType } from "@/types";

type TextTypeFabricT = {
    [keyof in TextType]: {
        fontSize: number;
        lineHeight: number;
        letterSpacing: number;
        fontWeight: number;
    };
};
const TextTypeFabricHelper: TextTypeFabricT = {
    [TextType.header]: {
        fontSize: 48,
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: 0,
    },
    [TextType.subheader]: {
        fontSize: 22,
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: 0,
    },
    [TextType.text]: {
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: 0,
        fontWeight: 400,
    },
    [TextType.quote]: {
        fontSize: 24,
        fontWeight: 400,
        lineHeight: 1.3,
        letterSpacing: 0,
    },
};
export function TextTypeFabric(value: TextType) {
    return structuredClone(TextTypeFabricHelper[value]);
}

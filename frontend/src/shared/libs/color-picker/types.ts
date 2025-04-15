interface Color {
    red: string;
    green: string;
    blue: string;
    alpha: string;
}
export interface ColorPicker {
    color: Color;
    onStartChange: Color;
    onChange: Color;
    onEndChange: Color;
}
interface Gradient {
    type: string;
    degree: number;
    points: Array<Point>;
}
interface Point {
    left: number;
    red: number;
    green: number;
    blue: number;
    alpha: number;
}
export interface GradientPicker {
    gradient: Gradient;
    isGradient: boolean;
    onStartChange: Color;
    onChange: Color;
    onEndChange: Color;
}
export interface EmitColor {
    alpha: number;
    blue: number;
    green: number;
    hue: number;
    red: number;
    saturation: number;
    style: string;
    value: number;
}
export interface EmitGradient {
    alpha: number;
    blue: number;
    green: number;
    hue: number;
    red: number;
    saturation: number;
    style: string;
    value: number;
}

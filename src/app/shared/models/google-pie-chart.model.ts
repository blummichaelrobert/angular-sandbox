export class GooglePieChart {
    data: (string | number)[][];
    googleChartOptions: GooglePieChartOptions;
    type: string;
}

export class GooglePieChartOptions {
    backgroundColor?: {
        stroke?: string;
        strokeWidth?: string;
        fill?: string;
    };
    chartArea?: {
        backgroundColor?: { stroke?: string; strokeWidth?: string };
        left?: number;
        top?: number;
        width?: number;
        height?: number;
    };
    colors?: string[];
    enableInteractivity?: boolean;
    fontSize?: number;
    fontName?: string;
    forceIFrame?: boolean;
    height?: number;
    is3D?: boolean;
    legend?: {
        alignment?: string;
        maxLines?: number;
        position?: string;
        textStyle?: {
            bold?: boolean;
            color?: string;
            fontName?: string;
            fontSize?: number;
            italic?: number;
        };
    };
    pieHole?: number;
    pieSliceBorderColor?: string;
    pieSliceText?: string;
    pieSliceTextStyle?: {
        color?: string;
        fontName?: string;
        fontSize?: number;
    };
    pieStartAngle?: number;
    reverseCategories?: boolean;
    pieResidueSliceColor?: string;
    pieResidueSliceLabel?: string;
    sliceVisibilityThreshold?: number;
    title?: string;
    titleTextStyle?: {
        color?: string;
        fontName?: string;
        fontSize?: number;
        bold?: boolean; 
        italic?: boolean;
    };
    tooltip?: {
        ignoreBounds?: boolean;
        isHtml?: boolean;
        showColorCode?: boolean;
        text?: string;
        textStyle?: {
            color?: string;
            fontName?: string;
            fontSize?: string;
            bold?: string;
            italic?: string;
        };
        trigger?: string;
    };
    width?: number;
}

/// <reference path="../react/react.d.ts" />
declare function Radium(component: __React.ComponentClass<any>);
// declare namespace Radium {

// }

declare module 'radium' {
    const Radium: ClassDecorator;
    export interface CssClass {
        [name: string]: CssProps;
    }
    interface StyleProps {
        rules?: CssClass;
        scopeSelector?: string;
    }
    interface CssProps {
        display?: string | number;
        opacity?: string | number;
        visibility?: string | number;
        zIndex?: string | number;
        orientation?: string | number;
        maxZoom?: string | number;
        minZoom?: string | number;
        userZoom?: string | number;
        zoom?: string | number;
        position?: string | number;
        top?: string | number;
        right?: string | number;
        bottom?: string | number;
        left?: string | number;
        flex?: string | number;
        flexGrow?: string | number;
        flexShrink?: string | number;
        flexBasis?: string | number;
        flexFlow?: string | number;
        flexDirection?: string | number;
        flexWrap?: string | number;
        justifyContent?: string | number;
        alignItems?: string | number;
        alignContent?: string | number;
        alignSelf?: string | number;
        order?: string | number;
        float?: string | number;
        clear?: string | number;
        boxSizing?: string | number;
        width?: string | number;
        minWidth?: string | number;
        maxWidth?: string | number;
        height?: string | number;
        minHeight?: string | number;
        maxHeight?: string | number;
        margin?: string | number;
        marginTop?: string | number;
        marginRight?: string | number;
        marginBottom?: string | number;
        marginLeft?: string | number;
        padding?: string | number;
        paddingTop?: string | number;
        paddingRight?: string | number;
        paddingBottom?: string | number;
        paddingLeft?: string | number;
        border?: string | number;
        borderWidth?: string | number;
        borderStyle?: string | number;
        borderColor?: string | number;
        borderTop?: string | number;
        borderTopWidth?: string | number;
        borderTopStyle?: string | number;
        borderTopColor?: string | number;
        borderRight?: string | number;
        borderRightWidth?: string | number;
        borderRightStyle?: string | number;
        borderRightColor?: string | number;
        borderBottom?: string | number;
        borderBottomWidth?: string | number;
        borderBottomStyle?: string | number;
        borderBottomColor?: string | number;
        borderLeft?: string | number;
        borderLeftWidth?: string | number;
        borderLeftStyle?: string | number;
        borderLeftColor?: string | number;
        borderRadius?: string | number;
        borderTopLeftRadius?: string | number;
        borderTopRightRadius?: string | number;
        borderBottomRightRadius?: string | number;
        borderBottomLeftRadius?: string | number;
        borderImage?: string | number;
        borderImageSource?: string | number;
        borderImageSlice?: string | number;
        borderImageWidth?: string | number;
        borderImageOutset?: string | number;
        borderImageRepeat?: string | number;
        borderTopImage?: string | number;
        borderRightImage?: string | number;
        borderBottomImage?: string | number;
        borderLeftImage?: string | number;
        borderCornerImage?: string | number;
        borderTopLeftImage?: string | number;
        borderTopRightImage?: string | number;
        borderBottomRightImage?: string | number;
        borderBottomLeftImage?: string | number;
        outline?: string | number;
        outlineWidth?: string | number;
        outlineStyle?: string | number;
        outlineColor?: string | number;
        outlineOffset?: string | number;
        clip?: string | number;
        overflow?: string | number;
        overflowX?: string | number;
        overflowY?: string | number;
        listStyle?: string | number;
        listStylePosition?: string | number;
        listStyleType?: string | number;
        listStyleImage?: string | number;
        tableLayout?: string | number;
        borderSpacing?: string | number;
        borderCollapse?: string | number;
        captionSide?: string | number;
        emptyCells?: string | number;
        columns?: string | number;
        columnWidth?: string | number;
        columnCount?: string | number;
        columnFill?: string | number;
        columnGap?: string | number;
        columnRule?: string | number;
        columnRuleWidth?: string | number;
        columnRuleStyle?: string | number;
        columnRuleColor?: string | number;
        columnSpan?: string | number;
        direction?: string | number;
        color?: string | number;
        font?: string | number;
        fontStyle?: string | number;
        fontVariant?: string | number;
        fontWeight?: string | number;
        fontSize?: string | number;
        lineHeight?: string | number;
        fontFamily?: string | number;
        fontSizeAdjust?: string | number;
        fontStretch?: string | number;
        textAlign?: string | number;
        textAlignLast?: string | number;
        textDecoration?: string | number;
        textEmphasis?: string | number;
        textEmphasisPosition?: string | number;
        textEmphasisStyle?: string | number;
        textEmphasisColor?: string | number;
        textIndent?: string | number;
        textJustify?: string | number;
        textOutline?: string | number;
        textOverflow?: string | number;
        textOverflowEllipsis?: string | number;
        textOverflowMode?: string | number;
        textSizeAdjust?: string | number;
        textTransform?: string | number;
        textWrap?: string | number;
        textShadow?: string | number;
        verticalAlign?: string | number;
        writingMode?: string | number;
        hyphens?: string | number;
        letterSpacing?: string | number;
        tabSize?: string | number;
        whiteSpace?: string | number;
        wordBreak?: string | number;
        wordSpacing?: string | number;
        wordWrap?: string | number;
        cursor?: string | number;
        navIndex?: string | number;
        navUp?: string | number;
        navRight?: string | number;
        navDown?: string | number;
        navLeft?: string | number;
        pointerEvents?: string | number;
        resize?: string | number;
        content?: string | number;
        counterIncrement?: string | number;
        counterReset?: string | number;
        quotes?: string | number;
        background?: string | number;
        backgroundColor?: string | number;
        backgroundImage?: string | number;
        backgroundRepeat?: string | number;
        backgroundAttachment?: string | number;
        backgroundPosition?: string | number;
        backgroundClip?: string | number;
        backgroundOrigin?: string | number;
        backgroundSize?: string | number;
        transition?: string | number;
        transitionProperty?: string | number;
        transitionDuration?: string | number;
        transitionTimingFunction?: string | number;
        transitionDelay?: string | number;
        animation?: string | number;
        animationName?: string | number;
        animationDuration?: string | number;
        animationTimingFunction?: string | number;
        animationDelay?: string | number;
        animationIterationCount?: string | number;
        animationDirection?: string | number;
        animationFillMode?: string | number;
        animationPlayState?: string | number;
        filter?: string | number;
        transform?: string | number;
        transformOrigin?: string | number;
        breakBefore?: string | number;
        breakInside?: string | number;
        breakAfter?: string | number;
        pageBreakBefore?: string | number;
        pageBreakInside?: string | number;
        pageBreakAfter?: string | number;
        orphans?: string | number;
        [name: string]: string | number;
    }
    export class Plugins { }
    export class Style extends __React.Component<StyleProps, any> { }
    export class StyleRoot { }
    export class getState { }
    export class keyframes { }
    export class __clearStateForTests { }
    export default Radium
}
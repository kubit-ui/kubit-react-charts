/**
 * Defines the properties for rendering text within SVG elements in React components.
 *
 * This interface encompasses a wide range of properties that control the appearance and positioning of text in SVG.
 * It includes standard SVG attributes for positioning (x, y, dx, dy), text formatting (fontFamily, fontSize, fontStyle,
 * fontWeight), text decoration (textDecoration), and more advanced SVG features like textLength, lengthAdjust, and
 * writingMode. Additionally, it supports React-specific properties like style, className, and children, allowing for
 * further customization and integration within React applications.
 */

export interface ChartTextProps {
  x?: number | string;
  y?: number | string;
  dx?: number | string;
  dy?: number | string;
  textLength?: number | string;
  lengthAdjust?: 'spacing' | 'spacingAndGlyphs';
  rotate?: number;
  textAnchor?: 'start' | 'middle' | 'end';
  startOffset?: number;
  direction?: 'ltr' | 'rtl';
  kerning?: number;
  letterSpacing?: number;
  wordSpacing?: number;
  textDecoration?: 'none' | 'underline' | 'overline' | 'line-through' | 'blink';
  unicodeBidi?: 'normal' | 'embed' | 'bidi-override';
  writingMode?: 'lr-tb' | 'rl-tb' | 'tb-rl' | 'lr' | 'rl' | 'tb';
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  fontFamily?: string;
  /**
   * Font size in SVG user units (unitless number).
   *
   * Must be a number to ensure proper scaling with the SVG viewBox coordinate system.
   * Using string units like 'px' or 'em' would break responsive chart scaling and
   * cause layout calculation errors in text measurement utilities.
   *
   * @example
   * // ✅ Correct: Scales with viewBox
   * fontSize: 2
   *
   * // ❌ Incorrect: Fixed size, doesn't scale
   * fontSize: "12px"
   */
  fontSize?: number;
  fontStyle?: 'normal' | 'italic' | 'oblique';
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  opacity?: number;
  transform?: string;
  style?: React.CSSProperties;
  className?: string;
  tabIndex?: number;
  children?: React.ReactNode;
}

/**
 * Types specific to Foreign Object stories for demo content types
 * These props are only used in PieChart.Foreign stories to demonstrate different content types
 */

/**
 * Enhanced props specific to Foreign Object stories for demo content types
 * These props are only used in PieChart.Foreign stories to demonstrate different content types
 */
export interface ForeignStoryEnhancedProps {
  // Content type selection for demo purposes
  children?: string; // For PieChart Foreign component content type selection

  // Text content props (when children is "text")
  fontSize?: number;
  textContent?: string;

  // Icon props (when children is "icon") 
  iconColor?: string;
  iconSize?: number;

  // Image props (when children is "image")
  imageUrl?: string;
  imageSize?: number;

  // GIF props (when children is "gif")
  gifUrl?: string;
  gifSize?: number;
}

/**
 * Utility type for Foreign Object stories
 * Combines component props with Foreign-specific enhanced props
 */
export type ForeignStoryArgs<TComponentProps> = TComponentProps & ForeignStoryEnhancedProps;
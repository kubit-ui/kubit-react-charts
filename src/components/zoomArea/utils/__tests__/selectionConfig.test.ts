import { getSelectionConfig } from '../selectionConfig';

describe('selectionConfig', () => {
  describe('getSelectionConfig', () => {
    it('should return default values when no config is provided', () => {
      const result = getSelectionConfig();

      expect(result).toEqual({
        fill: '#0078d4',
        fillOpacity: 0.5,
        hideOverlayOnFullRange: true,
        stroke: '#0078d4',
        strokeWidth: 0,
      });
    });

    it('should return default values when undefined config is provided', () => {
      const result = getSelectionConfig(undefined);

      expect(result).toEqual({
        fill: '#0078d4',
        fillOpacity: 0.5,
        hideOverlayOnFullRange: true,
        stroke: '#0078d4',
        strokeWidth: 0,
      });
    });

    it('should merge user config with defaults for partial overrides', () => {
      const partialConfig = {
        fill: '#ff0000',
        strokeWidth: 2,
      };

      const result = getSelectionConfig(partialConfig);

      expect(result).toEqual({
        fill: '#ff0000', // User override
        fillOpacity: 0.5, // Default value
        hideOverlayOnFullRange: true, // Default value
        stroke: '#0078d4', // Default value
        strokeWidth: 2, // User override
      });
    });

    it('should handle complete config overrides', () => {
      const completeConfig = {
        fill: '#00ff00',
        fillOpacity: 0.7,
        hideOverlayOnFullRange: false,
        stroke: '#ff00ff',
        strokeWidth: 3,
      };

      const result = getSelectionConfig(completeConfig);

      expect(result).toEqual(completeConfig);
    });

    it('should handle edge cases: zero, falsy values, and empty strings', () => {
      // Zero and false values should be preserved
      const edgeCaseConfig = {
        fill: '',
        fillOpacity: 0,
        hideOverlayOnFullRange: false,
        stroke: '',
        strokeWidth: 0,
      };

      const result = getSelectionConfig(edgeCaseConfig);

      expect(result).toEqual({
        fill: '', // User override (empty string)
        fillOpacity: 0, // User override (zero value)
        hideOverlayOnFullRange: false, // User override (false value)
        stroke: '', // User override (empty string)
        strokeWidth: 0, // User override (zero value)
      });
    });
  });
});

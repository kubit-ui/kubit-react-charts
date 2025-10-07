import { getInteractionConfig } from '../interactionConfig';

describe('interactionConfig', () => {
  describe('getInteractionConfig', () => {
    it('should return default values when no config is provided', () => {
      const result = getInteractionConfig();

      expect(result).toEqual({
        keyboardFastStep: 2,
        keyboardStep: 1,
        minHandlerDistance: 1,
      });
    });

    it('should return default values when undefined config is provided', () => {
      const result = getInteractionConfig(undefined);

      expect(result).toEqual({
        keyboardFastStep: 2,
        keyboardStep: 1,
        minHandlerDistance: 1,
      });
    });

    it('should merge user config with defaults for partial overrides', () => {
      const partialConfig = {
        keyboardStep: 0.05,
        minHandlerDistance: 0.2,
      };

      const result = getInteractionConfig(partialConfig);

      expect(result).toEqual({
        keyboardFastStep: 2, // Default value
        keyboardStep: 0.05, // User override
        minHandlerDistance: 0.2, // User override
      });
    });

    it('should handle complete config overrides and edge cases', () => {
      // Test all values overridden
      const completeConfig = {
        keyboardFastStep: 0.8,
        keyboardStep: 0.2,
        minHandlerDistance: 0.3,
      };

      const completeResult = getInteractionConfig(completeConfig);
      expect(completeResult).toEqual(completeConfig);

      // Test zero values (should be preserved)
      const zeroConfig = {
        keyboardFastStep: 0,
        keyboardStep: 0,
        minHandlerDistance: 0,
      };

      const zeroResult = getInteractionConfig(zeroConfig);
      expect(zeroResult).toEqual(zeroConfig);
    });
  });
});

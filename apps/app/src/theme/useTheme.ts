import colors from './colors';

export const useTheme = () => {
  // Lightweight helper for getting theme tokens in components.
  // For now this is static, but it centralizes access and allows
  // switching themes (dark/light) later.
  return { colors } as const;
};

export type Theme = ReturnType<typeof useTheme>;

export default useTheme;

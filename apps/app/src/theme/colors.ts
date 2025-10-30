// Design tokens: 18 semantic color tokens for a real-world app
// Keep these semantic names; components should consume these tokens
export const colors = {
  // Brand
  primary: '#2A4BA0', // primary action color
  primaryContrast: '#FAFBFD',

  // Supporting
  secondary: '#6C5CE7',
  accent: '#00C2A8',

  // Feedback
  success: '#16A34A',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#0EA5E9',

  // Neutrals
  background: '#FFFFFF',
  surface: '#F8FAFC',
  muted: '#F1F5F9',
  border: '#E6EEF8',

  // Text
  text: '#0F172A', // primary body text
  textSecondary: '#64748B',
  label: '#475569',

  // UI
  card: '#FFFFFF',
  overlay: 'rgba(15,23,42,0.6)',
  shadow: 'rgba(2,6,23,0.12)'
} as const;

export type Colors = typeof colors;

export default colors;

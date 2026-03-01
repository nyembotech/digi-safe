import { useTheme, themeColors } from '../context/ThemeContext';

/**
 * Utility to get theme-aware Tailwind classes
 */
export function getThemeClass(lightClass: string, darkClass: string): string {
  return `${lightClass} dark:${darkClass}`;
}

/**
 * Utility to get theme-aware color value
 */
export function getThemeColor(lightColor: string, darkColor: string): string {
  return `var(--light: ${lightColor}); var(--dark: ${darkColor})`;
}

/**
 * Hook to get current theme colors object
 */
export function useCurrentThemeColors() {
  const { theme } = useTheme();
  return themeColors[theme];
}

/**
 * Common theme-aware Tailwind class combinations
 */
export const themeClasses = {
  // Text on default background
  textPrimary: getThemeClass('text-gray-900', 'text-white'),
  textSecondary: getThemeClass('text-gray-600', 'text-gray-300'),
  textTertiary: getThemeClass('text-gray-500', 'text-gray-400'),
  textMuted: getThemeClass('text-gray-400', 'text-gray-500'),

  // Backgrounds
  bgPrimary: getThemeClass('bg-white', 'bg-slate-900'),
  bgSecondary: getThemeClass('bg-gray-50', 'bg-slate-800'),
  bgTertiary: getThemeClass('bg-gray-100', 'bg-slate-700'),

  // Cards and containers
  card: getThemeClass('bg-white shadow', 'bg-slate-800 shadow-lg'),
  cardHover: getThemeClass('hover:bg-gray-50', 'hover:bg-slate-700'),

  // Borders
  border: getThemeClass('border-gray-200', 'border-slate-700'),
  borderLight: getThemeClass('border-gray-100', 'border-slate-800'),

  // Buttons
  buttonPrimary: getThemeClass(
    'bg-blue-600 text-white hover:bg-blue-700',
    'bg-blue-600 text-white hover:bg-blue-500'
  ),
  buttonSecondary: getThemeClass(
    'bg-gray-200 text-gray-900 hover:bg-gray-300',
    'bg-slate-700 text-white hover:bg-slate-600'
  ),
  buttonOutline: getThemeClass(
    'border-2 border-gray-300 text-gray-900 hover:bg-gray-50',
    'border-2 border-slate-600 text-white hover:bg-slate-700'
  ),

  // Input fields
  input: getThemeClass(
    'bg-white text-gray-900 border-gray-300 placeholder-gray-400',
    'bg-slate-800 text-white border-slate-600 placeholder-gray-400'
  ),
  inputFocus: getThemeClass(
    'focus:ring-blue-500 focus:border-blue-500',
    'focus:ring-blue-400 focus:border-blue-400'
  ),

  // Modals and overlays
  modal: getThemeClass(
    'bg-white text-gray-900',
    'bg-slate-800 text-white'
  ),
  backdrop: getThemeClass(
    'bg-black/50',
    'bg-black/70'
  ),

  // Dividers
  divider: getThemeClass('bg-gray-200', 'bg-slate-700'),

  // Status colors
  success: getThemeClass(
    'text-green-600 bg-green-50',
    'text-green-400 bg-green-900/20'
  ),
  error: getThemeClass(
    'text-red-600 bg-red-50',
    'text-red-400 bg-red-900/20'
  ),
  warning: getThemeClass(
    'text-yellow-600 bg-yellow-50',
    'text-yellow-400 bg-yellow-900/20'
  ),
  info: getThemeClass(
    'text-blue-600 bg-blue-50',
    'text-blue-400 bg-blue-900/20'
  ),
};

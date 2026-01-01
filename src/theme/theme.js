import { MD3LightTheme } from 'react-native-paper';

// 🎨 RATION+ Design System - Modern Minimalist Palette
export const colors = {
  // Primary Colors
  primary: '#B3DE9C', // Soft sage green - main brand color
  primaryDark: '#8BC34A', // Accent green for CTAs
  white: '#FFFFFF',
  
  // Text Colors
  textDark: '#2C3E2C', // Dark green-tinted for headings
  textBody: '#4A5F4A', // Softer green-tinted for body text
  
  // Background Colors
  backgroundLight: '#F8FBF6', // Very light green tint
  border: '#E0EED8', // Subtle borders
  
  // Status Colors
  success: '#66BB6A', // Vibrant green
  warning: '#FFA726', // Warm orange
  error: '#EF5350', // Soft red
  info: '#42A5F5', // Blue
  
  // Legacy support
  card: '#FFFFFF',
  background: '#FFFFFF',
  text: '#2C3E2C',
  textSecondary: '#4A5F4A',
  secondary: '#8BC34A',
  accent: '#8BC34A',
};

// Gradient Colors
export const gradients = {
  primary: ['#B3DE9C', '#8BC34A'],
  card: ['#FFFFFF', '#F8FBF6'],
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    primaryContainer: colors.primaryDark,
    secondary: colors.primaryDark,
    background: colors.white,
    surface: colors.white,
    text: colors.textDark,
    onSurface: colors.textDark,
    onBackground: colors.textDark,
    error: colors.error,
  },
};

// Typography Scale
export const typography = {
  display: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    letterSpacing: -0.2,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  overline: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
};

// Spacing Scale
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 48,
};

// Border Radius
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

// Elevation/Shadows
export const elevation = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};


/**
 * Common types for the design system components
 */

// Component size variants
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Component variants
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost'

// Component states
export type ComponentState = 'default' | 'hover' | 'focus' | 'active' | 'disabled'

// Color variants
export type ColorVariant = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'info'

// Theme modes
export type ThemeMode = 'light' | 'dark'

// Common component props
export interface BaseComponentProps {
  /** Component size */
  size?: Size
  /** Component variant */
  variant?: Variant
  /** Disabled state */
  disabled?: boolean
  /** Loading state */
  loading?: boolean
  /** Custom CSS class */
  class?: string
  /** Accessibility label */
  ariaLabel?: string
}
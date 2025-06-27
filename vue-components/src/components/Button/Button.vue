<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :aria-label="ariaLabel"
    :aria-busy="loading"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="loading" class="button-spinner" aria-hidden="true">
      <svg
        class="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
    <span :class="{ 'opacity-0': loading }">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
/**
 * Primary UI component for user interaction
 * 
 * @example
 * ```vue
 * <Button 
 *   variant="primary" 
 *   @click="handleClick"
 * >
 *   Save Changes
 * </Button>
 * ```
 */

import { computed } from 'vue'
import type { Size, Variant } from '@/types'

interface Props {
  /** Button display text */
  label?: string
  /** Visual style variant */
  variant?: Variant
  /** Button size */
  size?: Size
  /** Disabled state */
  disabled?: boolean
  /** Loading state */
  loading?: boolean
  /** Accessibility label */
  ariaLabel?: string
}

interface Emits {
  /** Emitted when button is clicked */
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false
})

const emit = defineEmits<Emits>()

const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-md',
    'font-medium',
    'transition-colors',
    'focus-ring',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'relative'
  ]

  // Size classes
  const sizeClasses = {
    xs: ['px-2', 'py-1', 'text-xs'],
    sm: ['px-3', 'py-1.5', 'text-sm'],
    md: ['px-4', 'py-2', 'text-sm'],
    lg: ['px-4', 'py-2', 'text-base'],
    xl: ['px-6', 'py-3', 'text-base']
  }

  // Variant classes
  const variantClasses = {
    primary: [
      'bg-primary-600',
      'text-white',
      'hover:bg-primary-700',
      'active:bg-primary-800'
    ],
    secondary: [
      'bg-secondary-100',
      'text-secondary-900',
      'hover:bg-secondary-200',
      'active:bg-secondary-300',
      'dark:bg-secondary-800',
      'dark:text-secondary-100',
      'dark:hover:bg-secondary-700'
    ],
    success: [
      'bg-green-600',
      'text-white',
      'hover:bg-green-700',
      'active:bg-green-800'
    ],
    warning: [
      'bg-yellow-600',
      'text-white',
      'hover:bg-yellow-700',
      'active:bg-yellow-800'
    ],
    danger: [
      'bg-red-600',
      'text-white',
      'hover:bg-red-700',
      'active:bg-red-800'
    ],
    ghost: [
      'bg-transparent',
      'text-secondary-700',
      'hover:bg-secondary-100',
      'active:bg-secondary-200',
      'dark:text-secondary-300',
      'dark:hover:bg-secondary-800'
    ]
  }

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...variantClasses[props.variant]
  ].join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.button-spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
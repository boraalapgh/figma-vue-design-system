import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button.vue'

describe('Button', () => {
  it('renders with default props', () => {
    render(Button, { props: { label: 'Click me' } })
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeVisible()
    expect(button).toHaveClass('bg-primary-600') // primary variant
    expect(button).toHaveClass('px-4', 'py-2') // md size
  })

  it('renders with slot content', () => {
    render(Button, {
      slots: {
        default: 'Custom Content'
      }
    })
    
    expect(screen.getByRole('button', { name: /custom content/i })).toBeVisible()
  })

  it('applies correct variant classes', () => {
    const { rerender } = render(Button, { 
      props: { label: 'Test', variant: 'secondary' } 
    })
    
    let button = screen.getByRole('button')
    expect(button).toHaveClass('bg-secondary-100')
    
    rerender({ label: 'Test', variant: 'danger' })
    button = screen.getByRole('button')
    expect(button).toHaveClass('bg-red-600')
  })

  it('applies correct size classes', () => {
    const { rerender } = render(Button, { 
      props: { label: 'Test', size: 'sm' } 
    })
    
    let button = screen.getByRole('button')
    expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm')
    
    rerender({ label: 'Test', size: 'xl' })
    button = screen.getByRole('button')
    expect(button).toHaveClass('px-6', 'py-3', 'text-base')
  })

  it('handles click events', async () => {
    const mockClick = vi.fn()
    render(Button, { 
      props: { label: 'Click me' },
      attrs: { onClick: mockClick }
    })
    
    const button = screen.getByRole('button')
    await fireEvent.click(button)
    
    expect(mockClick).toHaveBeenCalledOnce()
  })

  it('does not emit click when disabled', async () => {
    const mockClick = vi.fn()
    render(Button, { 
      props: { label: 'Disabled', disabled: true },
      attrs: { onClick: mockClick }
    })
    
    const button = screen.getByRole('button')
    await fireEvent.click(button)
    
    expect(mockClick).not.toHaveBeenCalled()
    expect(button).toBeDisabled()
  })

  it('shows loading state correctly', () => {
    render(Button, { 
      props: { label: 'Loading', loading: true } 
    })
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toBeDisabled()
    
    // Check for spinner
    const spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toHaveAttribute('aria-hidden', 'true')
  })

  it('does not emit click when loading', async () => {
    const mockClick = vi.fn()
    render(Button, { 
      props: { label: 'Loading', loading: true },
      attrs: { onClick: mockClick }
    })
    
    const button = screen.getByRole('button')
    await fireEvent.click(button)
    
    expect(mockClick).not.toHaveBeenCalled()
  })

  it('applies custom aria-label', () => {
    render(Button, { 
      props: { 
        label: 'Save', 
        ariaLabel: 'Save document' 
      } 
    })
    
    const button = screen.getByRole('button', { name: /save document/i })
    expect(button).toBeVisible()
  })

  it('is accessible with keyboard navigation', async () => {
    const mockClick = vi.fn()
    render(Button, { 
      props: { label: 'Test' },
      attrs: { onClick: mockClick }
    })
    
    const button = screen.getByRole('button')
    button.focus()
    expect(button).toHaveFocus()
    
    await fireEvent.keyDown(button, { key: 'Enter' })
    expect(mockClick).toHaveBeenCalledOnce()
    
    await fireEvent.keyDown(button, { key: ' ' })
    expect(mockClick).toHaveBeenCalledTimes(2)
  })

  it('applies focus ring classes', () => {
    render(Button, { props: { label: 'Focus test' } })
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('focus-ring')
  })

  it('supports all variant types', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost'] as const
    
    variants.forEach(variant => {
      const { unmount } = render(Button, { 
        props: { label: 'Test', variant } 
      })
      
      const button = screen.getByRole('button')
      expect(button).toBeVisible()
      
      unmount()
    })
  })

  it('supports all size types', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    
    sizes.forEach(size => {
      const { unmount } = render(Button, { 
        props: { label: 'Test', size } 
      })
      
      const button = screen.getByRole('button')
      expect(button).toBeVisible()
      
      unmount()
    })
  })
})
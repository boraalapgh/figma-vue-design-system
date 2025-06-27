import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Primary UI component for user interaction with comprehensive accessibility support.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost']
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    disabled: {
      control: { type: 'boolean' }
    },
    loading: {
      control: { type: 'boolean' }
    },
    label: {
      control: { type: 'text' }
    },
    ariaLabel: {
      control: { type: 'text' }
    },
    onClick: { action: 'clicked' }
  },
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {}

// Variant stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button'
  }
}

export const Success: Story = {
  args: {
    variant: 'success',
    label: 'Success Button'
  }
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    label: 'Warning Button'
  }
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    label: 'Danger Button'
  }
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Button'
  }
}

// Size stories
export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex items-center gap-4">
        <Button size="xs" label="Extra Small" />
        <Button size="sm" label="Small" />
        <Button size="md" label="Medium" />
        <Button size="lg" label="Large" />
        <Button size="xl" label="Extra Large" />
      </div>
    `
  })
}

// State stories
export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Button'
  }
}

export const Loading: Story = {
  args: {
    loading: true,
    label: 'Loading Button'
  }
}

// Interactive story
export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="grid grid-cols-3 gap-4">
        <Button variant="primary" label="Primary" />
        <Button variant="secondary" label="Secondary" />
        <Button variant="success" label="Success" />
        <Button variant="warning" label="Warning" />
        <Button variant="danger" label="Danger" />
        <Button variant="ghost" label="Ghost" />
      </div>
    `
  })
}

// Dark mode story
export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  decorators: [
    () => ({
      template: '<div class="dark"><story /></div>'
    })
  ],
  render: () => ({
    components: { Button },
    template: `
      <div class="grid grid-cols-3 gap-4">
        <Button variant="primary" label="Primary" />
        <Button variant="secondary" label="Secondary" />
        <Button variant="success" label="Success" />
        <Button variant="warning" label="Warning" />
        <Button variant="danger" label="Danger" />
        <Button variant="ghost" label="Ghost" />
      </div>
    `
  })
}
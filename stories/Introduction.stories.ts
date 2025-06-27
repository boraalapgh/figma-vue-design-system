import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta = {
  title: 'Welcome/Introduction',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => {
        return `
# Design System

Welcome to our **production-ready Vue 3 design system** with Figma integration!

## 🚀 Features

- **Vue 3** with TypeScript and Composition API
- **Tailwind CSS** with design tokens from Figma
- **Comprehensive testing** with Vitest and Testing Library
- **Accessibility-first** with axe-core integration
- **Production-ready** with proper CI/CD and deployment
- **Automated changelog** with changesets
- **GitHub MCP integration** for repository management

## 🎨 Design Tokens

Our design system uses CSS variables that are automatically synchronized from Figma:

\`\`\`css
/* Colors */
--color-primary-500: #3b82f6;
--color-secondary-500: #64748b;

/* Spacing */
--spacing-md: 1rem;
--spacing-lg: 1.5rem;

/* Typography */
--font-size-base: 1rem;
--line-height-base: 1.5rem;
\`\`\`

## 📦 Components

### Button
Our primary Button component with comprehensive variants:
- **Variants**: Primary, Secondary, Success, Warning, Danger, Ghost
- **Sizes**: XS, SM, MD, LG, XL
- **States**: Default, Disabled, Loading
- **Accessibility**: Full keyboard navigation and ARIA support

## 🧪 Testing

Every component includes:
- **Unit tests** with ≥90% coverage
- **Accessibility tests** with axe-core
- **Visual regression tests** with Storybook
- **Keyboard navigation tests**

## 🔧 Development

\`\`\`bash
# Install dependencies
pnpm install

# Start Storybook
pnpm storybook

# Run tests
pnpm test

# Build library
pnpm build:lib
\`\`\`

---

Ready to build amazing user interfaces! 🎉
        `
      }
    }
  }
}

export default meta

export const Introduction: StoryObj = {
  render: () => ({
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold mb-6 text-primary-600">Design System</h1>
        <p class="text-lg mb-8 text-secondary-700">
          Welcome to our production-ready Vue 3 design system with Figma integration!
        </p>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="p-6 border border-secondary-200 rounded-lg">
            <h2 class="text-xl font-semibold mb-4">🚀 Features</h2>
            <ul class="space-y-2 text-sm">
              <li>• Vue 3 with TypeScript and Composition API</li>
              <li>• Tailwind CSS with design tokens from Figma</li>
              <li>• Comprehensive testing with Vitest</li>
              <li>• Accessibility-first with axe-core integration</li>
              <li>• Production-ready with proper CI/CD</li>
            </ul>
          </div>
          
          <div class="p-6 border border-secondary-200 rounded-lg">
            <h2 class="text-xl font-semibold mb-4">📦 Components</h2>
            <ul class="space-y-2 text-sm">
              <li>• Button with 6 variants and 5 sizes</li>
              <li>• Full accessibility support</li>
              <li>• Loading and disabled states</li>
              <li>• Keyboard navigation</li>
              <li>• ARIA compliance</li>
            </ul>
          </div>
        </div>
        
        <div class="mt-8 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <p class="text-sm text-primary-700">
            🎯 <strong>Quick Start:</strong> Navigate to "Components/Button" to see our Button component in action!
          </p>
        </div>
      </div>
    `
  })
}
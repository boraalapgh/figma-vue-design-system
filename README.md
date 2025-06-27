# Figma → Vue Design System

A **production-ready Vue 3 component library** with automated Figma design token synchronization, comprehensive testing, and Storybook documentation.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/boraalapgh/figma-vue-design-system)
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://design-system-storybook.vercel.app)

## ✨ Features

- **🎨 Figma Integration**: Automated design token sync via MCP Server
- **⚡ Vue 3**: Composition API with TypeScript support
- **🎯 Production Ready**: Comprehensive testing and CI/CD pipeline
- **📚 Storybook**: Interactive component documentation
- **♿ Accessibility**: WCAG 2.1 AA compliant with axe-core testing
- **🌙 Dark Mode**: Full dark theme support
- **📦 Tree Shaking**: Optimized bundle size with ESM exports
- **🔄 Automated Versioning**: Changeset-based release management

## 🚀 Quick Start

### Installation

```bash
npm install @design-system/vue-components
# or
pnpm add @design-system/vue-components
# or
yarn add @design-system/vue-components
```

### Usage

```vue
<template>
  <div>
    <Button variant="primary" @click="handleClick">
      Save Changes
    </Button>
  </div>
</template>

<script setup>
import { Button } from '@design-system/vue-components'
import '@design-system/vue-components/style.css'

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

## 🏗️ Development

### Prerequisites

- **Node.js** ≥ 20 LTS
- **pnpm** ≥ 8.0.0
- **Figma Desktop App** (for design token sync)

### Setup

```bash
# Clone the repository
git clone https://github.com/boraalapgh/figma-vue-design-system.git
cd figma-vue-design-system

# Install dependencies
pnpm install

# Start Storybook
pnpm storybook

# Run tests
pnpm test

# Build library
pnpm build:lib
```

## 📦 Components

### Button

Primary UI component with comprehensive variants and accessibility support.

```vue
<Button 
  variant="primary" 
  size="md" 
  :disabled="false"
  :loading="false"
  @click="handleClick"
>
  Click me
</Button>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost'`
- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- `disabled`: `boolean`
- `loading`: `boolean`
- `ariaLabel`: `string`

## 🎨 Figma MCP Integration

### Setup MCP Server

1. **Enable in Figma**: Open Figma Desktop → Preferences → Enable Dev Mode MCP Server
2. **Configure Cursor**: Add MCP server configuration in Cursor settings

```json
{
  "mcpServers": {
    "Figma": {
      "url": "http://127.0.0.1:3845/sse"
    }
  }
}
```

### Sync Design Tokens

```bash
# Sync tokens from Figma file
pnpm mcp-sync --file YOUR_FIGMA_FILE_KEY --out ./tokens

# This generates:
# - design-tokens.json (CSS variables)
# - components.schema.json (component definitions)
# - changelog-draft.md (proposed changes)
```

## 🧪 Testing

- **Unit Tests**: Component logic and props
- **Accessibility Tests**: axe-core compliance
- **Visual Tests**: Storybook test runner
- **Keyboard Navigation**: Focus management

## 🚀 Deployment

### Vercel (Recommended)

Click the deploy button above or manually deploy:

```bash
# Build Storybook
pnpm build:storybook

# Deploy to Vercel
vercel --prod
```

---

Built with ❤️ by the Design System Team
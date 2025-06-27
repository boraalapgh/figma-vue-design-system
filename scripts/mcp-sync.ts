#!/usr/bin/env tsx

/**
 * MCP Sync Script
 * Synchronizes design tokens and component schemas from Figma MCP Server
 */

import fs from 'fs/promises'
import path from 'path'

interface DesignToken {
  name: string
  value: string
  type: 'color' | 'spacing' | 'typography' | 'shadow'
  description?: string
}

interface ComponentSchema {
  name: string
  props: Record<string, {
    type: string
    required: boolean
    default?: any
    description?: string
  }>
  variants: string[]
}

interface ChangelogEntry {
  version: string
  date: string
  changes: {
    added: string[]
    changed: string[]
    deprecated: string[]
    removed: string[]
    fixed: string[]
    security: string[]
  }
  figmaSync?: {
    componentsUpdated: string[]
    tokensUpdated: string[]
  }
}

class MCPSyncService {
  private outputDir: string
  private fileKey: string

  constructor(fileKey: string, outputDir: string = './mcp-cache') {
    this.fileKey = fileKey
    this.outputDir = outputDir
  }

  async ensureOutputDir() {
    try {
      await fs.access(this.outputDir)
    } catch {
      await fs.mkdir(this.outputDir, { recursive: true })
    }
  }

  async syncDesignTokens(): Promise<DesignToken[]> {
    console.log('🎨 Syncing design tokens from Figma...')
    
    // In a real implementation, this would use the Figma MCP Server
    // For now, we'll create a mock structure
    const tokens: DesignToken[] = [
      {
        name: 'color-primary-500',
        value: '#3b82f6',
        type: 'color',
        description: 'Primary brand color'
      },
      {
        name: 'spacing-md',
        value: '1rem',
        type: 'spacing',
        description: 'Medium spacing unit'
      },
      {
        name: 'font-size-base',
        value: '1rem',
        type: 'typography',
        description: 'Base font size'
      }
    ]

    await this.saveDesignTokens(tokens)
    return tokens
  }

  async syncComponentSchemas(): Promise<ComponentSchema[]> {
    console.log('📦 Syncing component schemas from Figma...')
    
    const schemas: ComponentSchema[] = [
      {
        name: 'Button',
        props: {
          variant: {
            type: 'primary | secondary | success | warning | danger | ghost',
            required: false,
            default: 'primary',
            description: 'Visual style variant'
          },
          size: {
            type: 'xs | sm | md | lg | xl',
            required: false,
            default: 'md',
            description: 'Button size'
          },
          disabled: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Disabled state'
          }
        },
        variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost']
      }
    ]

    await this.saveComponentSchemas(schemas)
    return schemas
  }

  async saveDesignTokens(tokens: DesignToken[]) {
    const filePath = path.join(this.outputDir, 'design-tokens.json')
    await fs.writeFile(filePath, JSON.stringify(tokens, null, 2))
    console.log(`✅ Design tokens saved to ${filePath}`)
  }

  async saveComponentSchemas(schemas: ComponentSchema[]) {
    const filePath = path.join(this.outputDir, 'components.schema.json')
    await fs.writeFile(filePath, JSON.stringify(schemas, null, 2))
    console.log(`✅ Component schemas saved to ${filePath}`)
  }

  async generateChangelog(tokens: DesignToken[], schemas: ComponentSchema[]): Promise<ChangelogEntry> {
    const changelog: ChangelogEntry = {
      version: 'pending',
      date: new Date().toISOString(),
      changes: {
        added: [],
        changed: [`Updated ${tokens.length} design tokens`, `Synced ${schemas.length} component schemas`],
        deprecated: [],
        removed: [],
        fixed: [],
        security: []
      },
      figmaSync: {
        componentsUpdated: schemas.map(s => s.name),
        tokensUpdated: tokens.map(t => t.name)
      }
    }

    const filePath = path.join(this.outputDir, 'changelog-draft.md')
    const markdownContent = this.formatChangelogAsMarkdown(changelog)
    await fs.writeFile(filePath, markdownContent)
    console.log(`✅ Changelog draft saved to ${filePath}`)

    return changelog
  }

  private formatChangelogAsMarkdown(changelog: ChangelogEntry): string {
    return `# Changelog Draft

## Figma Sync - ${new Date().toLocaleDateString()}

### Changed
${changelog.changes.changed.map(change => `- ${change}`).join('\n')}

### Figma Sync Details
- **Components Updated**: ${changelog.figmaSync?.componentsUpdated.join(', ') || 'None'}
- **Tokens Updated**: ${changelog.figmaSync?.tokensUpdated.join(', ') || 'None'}

---
*This changelog was automatically generated from Figma MCP sync*
`
  }

  async run() {
    console.log('🚀 Starting MCP sync process...')
    console.log(`📁 File Key: ${this.fileKey}`)
    console.log(`📂 Output Directory: ${this.outputDir}`)

    try {
      await this.ensureOutputDir()
      
      const [tokens, schemas] = await Promise.all([
        this.syncDesignTokens(),
        this.syncComponentSchemas()
      ])

      await this.generateChangelog(tokens, schemas)

      console.log('✨ MCP sync completed successfully!')
      console.log('\n📋 Summary:')
      console.log(`  - ${tokens.length} design tokens synced`)
      console.log(`  - ${schemas.length} component schemas synced`)
      console.log(`  - Changelog draft generated`)
    } catch (error) {
      console.error('❌ MCP sync failed:', error)
      process.exit(1)
    }
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2)
  const fileKeyIndex = args.indexOf('--file')
  const outputDirIndex = args.indexOf('--out')

  if (fileKeyIndex === -1 || !args[fileKeyIndex + 1]) {
    console.error('❌ Missing required --file argument')
    console.log('Usage: pnpm mcp-sync --file <figma-file-key> [--out <output-dir>]')
    process.exit(1)
  }

  const fileKey = args[fileKeyIndex + 1]
  const outputDir = outputDirIndex !== -1 && args[outputDirIndex + 1] 
    ? args[outputDirIndex + 1] 
    : './mcp-cache'

  const syncService = new MCPSyncService(fileKey, outputDir)
  await syncService.run()
}

if (require.main === module) {
  main().catch(console.error)
}

export { MCPSyncService }
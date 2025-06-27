<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-8">Vue Design System</h1>
    
    <div class="space-y-8">
      <section>
        <h2 class="text-xl font-semibold mb-4">Button Variants</h2>
        <div class="flex gap-4 flex-wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-4">Button Sizes</h2>
        <div class="flex gap-4 items-center flex-wrap">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-4">Button States</h2>
        <div class="flex gap-4 flex-wrap">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from './components/Button'
</script>
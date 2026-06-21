<template>
  <component :is="iconComponent" :class="['inline-block align-middle', sizeClass, colorClass]" />
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import { computed } from 'vue'
import type { Component } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: '5', // h-5 w-5 por padrão
  },
  color: {
    type: String,
    default: 'currentColor', // cor atual herdada do texto
  },
})

// Mapeia o tamanho do ícone para classes do Tailwind CSS
const sizeClass = computed(() => {
  const sizeMap: Record<string, string> = {
    '3.5': 'h-3.5 w-3.5',
    '4': 'h-4 w-4',
    '5': 'h-5 w-5',
    '6': 'h-6 w-6',
    '8': 'h-8 w-8',
    '10': 'h-10 w-10',
    '12': 'h-12 w-12',
  }
  return sizeMap[props.size] || `h-${props.size} w-${props.size}`
})

// Mapeia classes de cores comuns baseadas no Tailwind CSS
const colorClass = computed(() => {
  if (props.color === 'currentColor') return ''
  return props.color
})

// Obtém o ícone Lucide correspondente (com fallback para AlertTriangle se não encontrado)
const iconComponent = computed(() => {
  // Converte o nome para PascalCase (ex: git-branch -> GitBranch, laptop -> Laptop)
  const pascalName = props.name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

  return (icons as Record<string, Component>)[pascalName] || icons.AlertTriangle
})
</script>

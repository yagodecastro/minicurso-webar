<template>
  <div class="relative group my-6">
    <!-- Nome do arquivo no canto superior esquerdo (se disponível) -->
    <div
      v-if="filename"
      class="absolute left-4 top-3.5 z-10 text-xs font-mono text-slate-500 select-none"
    >
      {{ filename }}
    </div>

    <!-- Botão de copiar no canto superior direito -->
    <button
      @click="copyCode"
      class="absolute right-3.5 top-3 z-10 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-slate-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-400 opacity-0 transition-all duration-200 hover:bg-slate-800 hover:text-white group-hover:opacity-100 focus:opacity-100 active:scale-95 cursor-pointer select-none backdrop-blur-xs"
      aria-label="Copiar código"
    >
      <span v-if="copied" class="text-emerald-400 flex items-center gap-1 font-sans">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        Copiado!
      </span>
      <span v-else class="flex items-center gap-1 font-sans">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>
        Copiar
      </span>
    </button>

    <!-- Bloco de código padrão renderizado pelo Nuxt Content -->
    <pre :class="[$props.class, filename ? 'pt-10!' : '']" class="m-0"><slot /></pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})

const copied = ref(false)

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>

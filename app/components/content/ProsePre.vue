<template>
  <div
    v-if="language === 'mermaid'"
    class="my-6 relative group overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-lg transition-all duration-300"
  >
    <!-- Header elegante para o diagrama -->
    <div
      class="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20"
    >
      <span
        class="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-sans select-none"
      >
        <svg
          class="w-4 h-4 text-indigo-500 animate-pulse"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
        Diagrama Visual
      </span>
      <button
        class="inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-all duration-200 shadow-xs cursor-pointer select-none active:scale-95"
        @click="copyCode"
      >
        <span v-if="copied" class="text-emerald-500 flex items-center gap-1 font-sans">
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
          Copiar Código
        </span>
      </button>
    </div>

    <!-- Área do diagrama -->
    <div
      class="p-6 overflow-x-auto flex justify-center items-center min-h-[120px] bg-slate-50/30 dark:bg-slate-900/10"
    >
      <!-- Loading state -->
      <div v-if="loading" class="flex flex-col items-center gap-3 py-6">
        <div
          class="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"
        ></div>
        <span class="text-xs text-slate-400 dark:text-slate-500 font-medium font-sans"
          >Carregando diagrama...</span
        >
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="w-full text-left p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 rounded-xl"
      >
        <div class="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-2 select-none">
          <svg
            class="w-5 h-5 shrink-0"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span class="font-semibold text-sm">Não foi possível renderizar o diagrama</span>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">
          Exibindo a definição original:
        </p>
        <pre
          class="bg-slate-950 p-4 rounded-lg overflow-x-auto text-[11px] leading-relaxed font-mono text-slate-300 border border-slate-800"
          >{{ code }}</pre
        >
      </div>

      <!-- Container onde o SVG será injetado -->
      <div
        v-show="!loading && !error"
        ref="diagramContainer"
        class="w-full flex justify-center py-2 prose-mermaid"
      ></div>
    </div>
  </div>

  <div v-else class="relative group my-6">
    <!-- Nome do arquivo no canto superior esquerdo (se disponível) -->
    <div
      v-if="filename"
      class="absolute left-4 top-3.5 z-10 text-xs font-mono text-slate-500 select-none"
    >
      {{ filename }}
    </div>

    <!-- Botão de copiar no canto superior direito -->
    <button
      class="absolute right-3.5 top-3.5 z-10 inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white opacity-0 transition-all duration-200 group-hover:opacity-100 focus:opacity-100 active:scale-95 cursor-pointer select-none shadow-xs"
      aria-label="Copiar código"
      @click="copyCode"
    >
      <span v-if="copied" class="text-emerald-500 flex items-center gap-1 font-sans">
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
    <pre :class="[$props.class, filename ? 'pt-12!' : '']" class="m-0"><slot /></pre>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, watch, nextTick, type Ref } from 'vue'

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

// Lógica de Renderização do Mermaid
const diagramContainer = ref<HTMLElement | null>(null)
const loading = ref(false)
const error = ref(false)

// Injeta o estado de dark mode
const isDark = inject<Ref<boolean>>('isDark', ref(true))

async function renderDiagram() {
  if (!import.meta.client || props.language !== 'mermaid' || !diagramContainer.value) {
    return
  }

  loading.value = true
  error.value = false

  try {
    const mermaid = (await import('mermaid')).default

    // Configura o tema do Mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark.value ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'Outfit, sans-serif',
      themeVariables: {
        background: isDark.value ? '#0f172a' : '#ffffff',
        primaryColor: isDark.value ? '#1e293b' : '#f1f5f9',
        primaryTextColor: isDark.value ? '#f8fafc' : '#0f172a',
        primaryBorderColor: isDark.value ? '#334155' : '#cbd5e1',
        lineColor: isDark.value ? '#818cf8' : '#4f46e5', // Cores mais vivas nos fluxos
      },
    })

    // ID único e seguro para o contêiner temporário do Mermaid
    const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`

    // Remove qualquer renderização anterior
    diagramContainer.value.innerHTML = ''

    // Renderiza a partir da string raw code
    const { svg } = await mermaid.render(id, props.code)

    // Injeta o SVG gerado
    diagramContainer.value.innerHTML = svg
  } catch (err) {
    console.error('Mermaid rendering failed:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (props.language === 'mermaid') {
    nextTick(() => {
      renderDiagram()
    })
  }
})

// Re-renderiza o diagrama quando o tema do site mudar ou o código mudar
watch([isDark, () => props.code], () => {
  if (props.language === 'mermaid') {
    renderDiagram()
  }
})
</script>

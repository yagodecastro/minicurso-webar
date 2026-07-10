<script setup lang="ts">
import { computed, onMounted, watch, nextTick } from 'vue'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import chaptersData from '~/chapters.json'
import hljs from 'highlight.js'

const route = useRoute()

const highlightCode = () => {
  if (!import.meta.client) return
  nextTick(() => {
    // 1. Destaque de sintaxe
    document.querySelectorAll('pre code').forEach((block) => {
      if (!block.classList.contains('hljs')) {
        hljs.highlightElement(block as HTMLElement)
      }
    })

    // 2. Inserção de botões de copiar
    document.querySelectorAll('pre').forEach((pre) => {
      // Evita duplicar o wrapper e o botão se o script rodar novamente
      if (pre.parentElement?.classList.contains('code-block-wrapper')) {
        return
      }

      // Cria a div wrapper
      const wrapper = document.createElement('div')
      wrapper.className = 'relative group code-block-wrapper'

      // Insere o wrapper no DOM antes do pre e move o pre para dentro dele
      pre.parentNode?.insertBefore(wrapper, pre)
      wrapper.appendChild(pre)

      // Cria o botão de copiar
      const button = document.createElement('button')
      button.className =
        'absolute right-3.5 top-3.5 z-10 inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white opacity-0 group-hover:opacity-100 focus:opacity-100 active:scale-95 transition-all duration-200 cursor-pointer select-none shadow-xs'
      button.setAttribute('aria-label', 'Copiar código')

      // Ícones do botão de copiar (SVG)
      const copyIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        <span>Copiar</span>
      `

      const copiedIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <span class="text-emerald-500 font-semibold">Copiado!</span>
      `

      button.innerHTML = copyIcon

      // Lógica de clique do botão
      button.addEventListener('click', async () => {
        const codeElement = pre.querySelector('code')
        const codeText = codeElement ? codeElement.textContent || '' : pre.textContent || ''
        
        try {
          await navigator.clipboard.writeText(codeText)
          button.innerHTML = copiedIcon
          button.classList.add('border-emerald-500/30', 'dark:border-emerald-500/30')
          
          setTimeout(() => {
            button.innerHTML = copyIcon
            button.classList.remove('border-emerald-500/30', 'dark:border-emerald-500/30')
          }, 2000)
        } catch (err) {
          console.error('Falha ao copiar código: ', err)
        }
      })

      // Adiciona o botão no wrapper (como irmão do pre, por cima dele)
      wrapper.appendChild(button)
    })
  })
}

onMounted(() => {
  highlightCode()
})

watch(
  () => route.path,
  () => {
    highlightCode()
  }
)


// Ordenação idêntica à da sidebar
const chapters = computed(() => {
  return chaptersData.filter((p) => p.path !== '/' && p.path !== '/about')
})

// Achar índice atual
const currentIndex = computed(() => {
  return chapters.value.findIndex((c) => c.path === route.path)
})

const progress = computed(() => {
  return Math.round(((currentIndex.value + 1) / chapters.value.length) * 100)
})

const prevChapter = computed(() => {
  if (currentIndex.value > 0) {
    return chapters.value[currentIndex.value - 1]
  }
  return null
})

const nextChapter = computed(() => {
  if (currentIndex.value !== -1 && currentIndex.value < chapters.value.length - 1) {
    return chapters.value[currentIndex.value + 1]
  }
  return null
})

function formatChapterTitle(stem: string) {
  let title = stem.replace(/^(\d+(?:_\d+)?)-/, '')
  title = title.replace(/-/g, ' ')

  const words = title.split(' ').map((word) => {
    const lower = word.toLowerCase()
    if (lower === 'webar') return 'WebAR'
    if (lower === 'html') return 'HTML'
    if (lower === 'git') return 'Git'
    if (lower === 'github') return 'GitHub'
    if (lower === 'a-frame') return 'A-Frame'
    if (lower === '3d') return '3D'
    if (lower === '2d') return '2D'
    if (['e', 'o', 'a', 'ao', 'com', 'nas', 'no', 'na', 'para', 'da', 'do', 'de'].includes(lower))
      return lower
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  }

  return words.join(' ')
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-12">
    <!-- Indicador de Capítulo (apenas para páginas de capítulos) -->
    <div
      v-if="currentIndex !== -1"
      class="flex items-center gap-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium tracking-wide"
    >
      <span
        class="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 font-mono"
      >
        Capítulo {{ String(currentIndex + 1).padStart(2, '0') }}
      </span>
      <div class="flex items-center gap-3 flex-1 max-w-xs">
        <div
          class="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"
          role="progressbar"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-500"
            :style="{ width: progress + '%' }"
          />
        </div>
        <span class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums">
          {{ progress }}%
        </span>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <article
      class="prose prose-slate dark:prose-invert prose-indigo max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500 dark:hover:prose-a:text-indigo-300 prose-a:transition-colors prose-img:rounded-2xl prose-img:shadow-2xl"
    >
      <slot />
    </article>

    <!-- Navegação Inferior -->
    <div
      v-if="currentIndex !== -1 || route.path === '/'"
      class="pt-10 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row gap-4 justify-between items-stretch"
    >
      <!-- Botão Anterior -->
      <NuxtLink
        v-if="prevChapter"
        :to="prevChapter.path"
        class="flex-1 group flex flex-col justify-center items-start p-5 rounded-2xl bg-slate-100/40 dark:bg-slate-900/40 hover:bg-slate-200/50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
      >
        <span
          class="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium mb-1"
        >
          <ArrowLeft class="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Capítulo Anterior
        </span>
        <span
          class="text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white font-semibold text-sm transition-colors"
        >
          {{ formatChapterTitle(prevChapter.stem) }}
        </span>
      </NuxtLink>

      <!-- Se estiver na Home, bota link para o primeiro capítulo -->
      <NuxtLink
        v-else-if="route.path === '/' && chapters.length > 0"
        :to="chapters[0].path"
        class="flex-1 group flex flex-col justify-center items-center p-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium shadow-md shadow-indigo-500/10 dark:shadow-lg dark:shadow-indigo-500/20 transition-all duration-200"
      >
        <span class="text-xs text-indigo-200 font-semibold uppercase tracking-wider mb-1"
          >Começar o Minicurso</span
        >
        <span class="flex items-center gap-2 text-base font-bold">
          Iniciar Primeiro Capítulo
          <ArrowRight class="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </NuxtLink>
      <div v-else class="flex-1 hidden sm:block"></div>

      <!-- Botão Próximo -->
      <NuxtLink
        v-if="nextChapter"
        :to="nextChapter.path"
        class="flex-1 group flex flex-col justify-center items-end text-right p-5 rounded-2xl bg-slate-100/40 dark:bg-slate-900/40 hover:bg-slate-200/50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/20 dark:hover:border-indigo-500/30 shadow-sm dark:shadow-lg dark:shadow-black/20 transition-all duration-200"
      >
        <span
          class="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider mb-1"
        >
          Próximo Capítulo
          <ArrowRight class="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
        <span
          class="text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-200 font-bold text-sm transition-colors"
        >
          {{ formatChapterTitle(nextChapter.stem) }}
        </span>
      </NuxtLink>
      <div v-else class="flex-1 hidden sm:block"></div>
    </div>
  </div>
</template>

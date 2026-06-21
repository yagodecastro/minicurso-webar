<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'

const route = useRoute()

// Busca a página atual
const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

// Busca todos os capítulos para a paginação
const { data: allPages } = await useAsyncData('all-pages', () => {
  return queryCollection('content').select('path', 'title', 'stem').all()
})

if (!page.value && !import.meta.dev) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// Ordenação idêntica à da sidebar
const chapters = computed(() => {
  if (!allPages.value) return []
  return allPages.value
    .filter((p) => p.path !== '/' && p.path !== '/about')
    .map((p) => {
      const match = p.stem.match(/^(\d+(?:_\d+)?)/)
      const sortKey = match ? match[1].replace('_', '.') : '999'
      return {
        ...p,
        sortValue: parseFloat(sortKey),
      }
    })
    .sort((a, b) => a.sortValue - b.sortValue)
})

// Achar índice atual
const currentIndex = computed(() => {
  return chapters.value.findIndex((c) => c.path === route.path)
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
  <div v-if="page" class="max-w-4xl mx-auto space-y-12">
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
      <span class="text-slate-300 dark:text-slate-700">•</span>
      <span class="text-slate-500 dark:text-slate-400"
        >Progresso: {{ Math.round(((currentIndex + 1) / chapters.length) * 100) }}%</span
      >
    </div>

    <!-- Conteúdo Principal -->
    <article
      class="prose prose-slate dark:prose-invert prose-indigo max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500 dark:hover:prose-a:text-indigo-300 prose-a:transition-colors prose-img:rounded-2xl prose-img:shadow-2xl"
    >
      <ContentRenderer :value="page" />
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

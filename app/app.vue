<script setup lang="ts">
import { ref, computed, watch, onMounted, provide } from 'vue'
import { Sun, Moon, Menu, X, Home, Glasses } from 'lucide-vue-next'
import allPages from '~/chapters.json'

const route = useRoute()
const isMobileMenuOpen = ref(false)

// Estado do tema
const isDark = ref(true)
provide('isDark', isDark)

// Configurar o script que roda imediatamente no cliente para evitar flashes de transição de cores (SSR-safe)
useHead({
  script: [
    {
      innerHTML: `
        (function() {
          const theme = localStorage.getItem('theme');
          if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        })();
      `,
      type: 'text/javascript',
    },
  ],
})

const chapters = computed(() => {
  if (!allPages) return []
  return allPages
})

// Fecha o menu mobile quando a rota muda
watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false
  },
)

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    isDark.value = saved === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  updateTheme()
})

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  updateTheme()
}

function updateTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

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
  <div
    class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row antialiased transition-colors duration-300"
  >
    <!-- Header Mobile -->
    <header
      class="md:hidden flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 transition-colors duration-300"
    >
      <NuxtLink to="/" class="flex items-center gap-2">
        <span
          class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent"
          >Minicurso WebAR</span
        >
        <span
          class="px-2 py-0.5 text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 rounded-full"
          >Mini</span
        >
      </NuxtLink>

      <div class="flex items-center gap-2">
        <!-- Botão Alternar Tema (Mobile) -->
        <button
          class="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle Theme"
          @click="toggleTheme"
        >
          <!-- Ícones Lucide para Sol e Lua -->
          <Sun v-if="isDark" class="h-5 w-5" />
          <Moon v-else class="h-5 w-5" />
        </button>

        <!-- Botão Abrir/Fechar Menu (Mobile) -->
        <button
          class="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle Menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <!-- Ícones Lucide para Menu e X -->
          <Menu v-if="!isMobileMenuOpen" class="h-5 w-5" />
          <X v-else class="h-5 w-5" />
        </button>
      </div>
    </header>

    <!-- Sidebar (Desktop e Mobile colapsável) -->
    <aside
      :class="[
        'w-full md:w-80 bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800/80 flex flex-col shrink-0 md:sticky md:top-0 md:h-screen z-20 transition-all duration-300',
        isMobileMenuOpen
          ? 'fixed top-[65px] left-0 bottom-0 h-[calc(100vh-65px)] block'
          : 'hidden md:flex',
      ]"
    >
      <!-- Logo da Plataforma -->
      <div
        class="hidden md:flex items-center justify-between px-8 py-8 border-b border-slate-200 dark:border-slate-800/60 transition-colors duration-300"
      >
        <div class="flex items-center gap-3">
          <div
            class="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/10 dark:shadow-indigo-500/20 text-white"
          >
            <Glasses class="h-5 w-5" />
          </div>
          <div>
            <NuxtLink
              to="/"
              class="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-300 dark:to-cyan-300 bg-clip-text text-transparent hover:opacity-90 transition-colors duration-300"
              >Minicurso WebAR</NuxtLink
            >
            <p class="text-xs text-slate-500 font-medium">Realidade Aumentada na Web</p>
          </div>
        </div>

        <!-- Botão Alternar Tema (Desktop) -->
        <button
          class="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 shrink-0"
          aria-label="Toggle Theme"
          @click="toggleTheme"
        >
          <!-- Ícones Lucide para Sol e Lua -->
          <Sun v-if="isDark" class="h-5 w-5" />
          <Moon v-else class="h-5 w-5" />
        </button>
      </div>

      <!-- Links de Navegação -->
      <nav class="flex-1 overflow-y-auto px-6 py-8 space-y-7">
        <div>
          <h3
            class="px-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3"
          >
            Introdução
          </h3>
          <NuxtLink
            to="/"
            :class="[
              'group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm border',
              route.path === '/'
                ? 'bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/20 shadow-inner'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40 border-transparent',
            ]"
          >
            <!-- Ícone Lucide para Home -->
            <Home class="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
            Apresentação do minicurso
          </NuxtLink>
        </div>

        <div>
          <div class="flex items-center justify-between px-3 mb-3">
            <h3
              class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider"
            >
              Capítulos
            </h3>
            <span
              class="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full font-mono border border-slate-200 dark:border-slate-700"
              >{{ chapters.length }}</span
            >
          </div>
          <div class="space-y-1.5">
            <NuxtLink
              v-for="(chapter, idx) in chapters"
              :key="chapter.path"
              :to="chapter.path"
              :class="[
                'group flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm border',
                route.path === chapter.path
                  ? 'bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/20 shadow-inner font-medium'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40 border-transparent',
              ]"
            >
              <span
                class="font-mono text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700/80 px-1.5 py-0.5 rounded shrink-0 transition-colors border border-slate-200 dark:border-slate-700"
              >
                {{ String(idx + 1).padStart(2, '0') }}
              </span>
              <span class="leading-tight">{{ formatChapterTitle(chapter.stem) }}</span>
            </NuxtLink>
          </div>
        </div>
      </nav>

      <!-- Rodapé da Sidebar -->
      <div
        class="p-6 border-t border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-950/20 flex flex-col gap-2 transition-colors duration-300"
      >
        <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
          <span>Biblioteca de AR</span>
          <span
            class="font-mono bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800"
            >A-Frame + AR.js</span
          >
        </div>
      </div>
    </aside>

    <!-- Main Wrapper -->
    <div class="flex-1 flex flex-col min-w-0">
      <main class="flex-1 overflow-y-auto px-6 py-8 md:p-12 lg:p-16">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

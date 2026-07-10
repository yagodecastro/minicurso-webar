<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { VueFlow, type Node, type Edge, useVueFlow } from '@vue-flow/core'
import { LocateFixed } from 'lucide-vue-next'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

const props = withDefaults(defineProps<{
  nodes: Node[]
  edges: Edge[]
  height?: string
}>(), {
  height: undefined,
})

const isMobile = ref(false)
const flowContainer = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null

const checkMobile = () => {
  if (import.meta.client) {
    isMobile.value = window.innerWidth < 768
  }
}

const nodeBounds = computed(() => {
  if (!props.nodes.length) return { minX: 0, minY: 0, maxX: 0, maxY: 0 }
  let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity]
  for (const node of props.nodes) {
    const w = node.class?.includes?.('node-xwide') ? 320 : node.class?.includes?.('node-wide') ? 260 : 200
    const h = node.class?.includes?.('node-header') ? 30 : 50
    minX = Math.min(minX, node.position.x - 50)
    minY = Math.min(minY, node.position.y - 50)
    maxX = Math.max(maxX, node.position.x + w + 50)
    maxY = Math.max(maxY, node.position.y + h + 50)
  }
  return { minX, minY, maxX, maxY }
})

const computedHeight = computed(() => {
  if (props.height) return props.height
  const { minY, maxY } = nodeBounds.value
  const contentHeight = maxY - minY
  return `${Math.max(contentHeight, 200)}px`
})

const translateExtent = computed(() => {
  const { minX, minY, maxX, maxY } = nodeBounds.value
  const pad = 100
  return [[minX - pad, minY - pad], [maxX + pad, maxY + pad]] as [[number, number], [number, number]]
})

const flowId = `vue-flow-${Math.random().toString(36).substring(2, 9)}`
const { fitView } = useVueFlow({ id: flowId })

const triggerFitView = () => {
  if (!import.meta.client) return
  nextTick(() => {
    setTimeout(() => {
      fitView({ padding: isMobile.value ? 0.25 : 0.15, duration: 200 })
    }, 150)
  })
}

const onPaneReady = () => {
  triggerFitView()
}

watch(
  [() => props.nodes, () => props.edges, isMobile],
  () => {
    triggerFitView()
  },
  { deep: true }
)

onMounted(() => {
  if (import.meta.client) {
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    if (flowContainer.value) {
      resizeObserver = new ResizeObserver(() => {
        triggerFitView()
      })
      resizeObserver.observe(flowContainer.value)
    }
    
    setTimeout(triggerFitView, 500)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', checkMobile)
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<template>
  <div
    ref="flowContainer"
    :style="{ height: computedHeight }"
    class="relative w-full border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden my-6 bg-slate-50 dark:bg-slate-900/50"
  >
    <VueFlow
      :id="flowId"
      :nodes="nodes"
      :edges="edges"
      :nodes-draggable="false"
      :nodes-connectable="false"
      :zoom-on-scroll="false"
      :zoom-on-pinch="true"
      :zoom-on-double-click="true"
      :pan-on-drag="true"
      :pan-on-scroll="true"
      :min-zoom="isMobile ? 0.7 : 0.5"
      :max-zoom="1.5"
      :translate-extent="translateExtent"
      :default-edge-options="{ type: 'smoothstep' }"
      class="vue-flow-container"
      @pane-ready="onPaneReady"
    />
    
    <button
      @click="triggerFitView"
      class="absolute bottom-4 right-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-md p-2 z-10 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50 transition-colors"
      title="Centralizar diagrama"
      aria-label="Centralizar diagrama"
    >
      <LocateFixed class="w-5 h-5" />
    </button>
  </div>
</template>

<style scoped>
.vue-flow-container {
  width: 100%;
  height: 100%;
}

:deep(.vue-flow__edge-path) {
  stroke: #94a3b8;
  stroke-width: 2;
}

:deep(.vue-flow__edge-textbg) {
  fill: #f8fafc;
}

:deep(.vue-flow__edge-text) {
  fill: #334155;
  font-weight: 500;
}

:global(.dark) :deep(.vue-flow__edge-path) {
  stroke: #475569;
}

:global(.dark) :deep(.vue-flow__edge-textbg) {
  fill: #0f172a;
}

:global(.dark) :deep(.vue-flow__edge-text) {
  fill: #cbd5e1;
}

:global(.dark) :deep(.vue-flow__arrowhead polyline) {
  stroke: #475569;
  fill: #475569;
}

:deep(.vue-flow__arrowhead polyline) {
  stroke: #94a3b8;
  fill: #94a3b8;
}

:deep(.vue-flow__handle) {
  opacity: 0;
}

:deep(.node-default) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  border: 1px solid #cbd5e1;
  background: #fff;
  color: #0f172a;
}

:global(.dark) :deep(.node-default) {
  background: #1e293b;
  color: #f1f5f9;
  border-color: #475569;
}

:deep(.node-error) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  border: 2px solid #b91c1c;
  background: #ef4444;
  color: #fff;
}

:deep(.node-success) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  border: 2px solid #047857;
  background: #10b981;
  color: #fff;
}

:deep(.node-blue) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  border: 2px solid #1d4ed8;
  background: #3b82f6;
  color: #fff;
}

:deep(.node-indigo) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  border: 2px solid #3730a3;
  background: #4f46e5;
  color: #fff;
}

:deep(.node-light-error) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  border: 1px solid #fecaca;
  background: #fee2e2;
  color: #991b1b;
}

:deep(.node-light-success) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  border: 1px solid #a7f3d0;
  background: #d1fae5;
  color: #065f46;
}

:deep(.node-light-blue) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  border: 1px solid #bfdbfe;
  background: #dbeafe;
  color: #1e40af;
}

:deep(.node-light-gray) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  border: 1px solid #d1d5db;
  background: #f3f4f6;
  color: #374151;
}

:deep(.node-decision) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  border: 2px dashed #d97706;
  background: #fffbeb;
  color: #92400e;
}

:global(.dark) :deep(.node-decision) {
  background: #451a03;
  color: #fcd34d;
  border-color: #f59e0b;
}

:deep(.node-header) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6366f1;
  pointer-events: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  background: #eef2ff;
  border: 1px solid #e0e7ff;
  width: fit-content;
}

:global(.dark) :deep(.node-header) {
  color: #a5b4fc;
  background: #1e1b4b;
  border-color: #312e81;
}

:deep(.node-wide) {
  width: 260px;
}

:deep(.node-amber) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  border: 2px solid #92400e;
  background: #d97706;
  color: #fff;
}

:deep(.node-light-amber) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  border: 1px solid #fde68a;
  background: #fef3c7;
  color: #78350f;
}

:deep(.node-gray) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  border: 2px solid #374151;
  background: #6b7280;
  color: #fff;
}

:deep(.node-xwide) {
  width: 320px;
}
</style>

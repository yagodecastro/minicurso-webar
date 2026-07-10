<script lang="ts" setup>
import { ref } from 'vue'
import { MarkerType, Position } from '@vue-flow/core'
import DiagramFlow from '~/components/DiagramFlow.vue'

const nodeClass =
  'dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600 flex items-center justify-center font-medium w-[180px] h-[50px] shadow-sm rounded-lg border border-slate-300 bg-white text-slate-900'

const nodes = ref([
  {
    id: 'A',
    position: { x: 0, y: 0 },
    data: { label: 'Git & Editor' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    class:
      'bg-indigo-600 text-white border-indigo-800 dark:border-indigo-400 border-2 flex items-center justify-center font-medium w-[180px] h-[50px] shadow-sm rounded-lg',
  },
  {
    id: 'B',
    position: { x: 250, y: 0 },
    data: { label: 'HTML & A-Frame 3D' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    class: nodeClass,
  },
  {
    id: 'C',
    position: { x: 500, y: 0 },
    data: { label: 'WebAR & Câmera' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Left,
    class: nodeClass,
  },
  {
    id: 'D',
    position: { x: 0, y: 150 },
    data: { label: 'Marcadores & Imagens' },
    sourcePosition: Position.Right,
    targetPosition: Position.Top,
    class: nodeClass,
  },
  {
    id: 'E',
    position: { x: 250, y: 150 },
    data: { label: 'Animações & Lógica' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    class: nodeClass,
  },
  {
    id: 'F',
    position: { x: 500, y: 150 },
    data: { label: 'Deploy & Desafio' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    class:
      'bg-emerald-500 text-white border-emerald-700 dark:border-emerald-400 border-2 flex items-center justify-center font-medium w-[180px] h-[50px] shadow-sm rounded-lg',
  },
])

const edges = ref([
  { id: 'eA-B', source: 'A', target: 'B', markerEnd: MarkerType.ArrowClosed },
  { id: 'eB-C', source: 'B', target: 'C', markerEnd: MarkerType.ArrowClosed },
  {
    id: 'eC-D',
    source: 'C',
    target: 'D',
    markerEnd: MarkerType.ArrowClosed,
  },
  { id: 'eD-E', source: 'D', target: 'E', markerEnd: MarkerType.ArrowClosed },
  { id: 'eE-F', source: 'E', target: 'F', markerEnd: MarkerType.ArrowClosed },
])
</script>

<template>
  <ChapterLayout>
    <h1>
      Manual de Desenvolvimento: Realidade Aumentada na Web com A-Frame e AR.js
    </h1>
    <p>
      Bem-vindo(a) ao desenvolvimento de Realidade Aumentada na Web (WebAR)! Neste manual, você vai
      aprender a construir aplicações usando apenas HTML, JavaScript e o navegador do seu celular.
      Esqueça instalações pesadas e lojas de aplicativos: o código é executado diretamente no
      navegador.
    </p>
    <p><strong>O que você vai precisar:</strong></p>
    <ul>
      <li>Um computador com conexão à internet.</li>
      <li>Um navegador web atualizado (Chrome, Edge ou Firefox).</li>
      <li>Uma webcam no computador e um smartphone para testar os projetos.</li>
    </ul>
    <h2>O que você será capaz de fazer</h2>
    <p>
      Ao finalizar esta apostila, você terá construído e publicado um portfólio inicial de WebAR.
      Você saberá como:
    </p>
    <ol>
      <li>Configurar um ambiente de desenvolvimento com VS Code e versionar código com Git.</li>
      <li>Entender e estruturar páginas HTML.</li>
      <li>
        Configurar o ecossistema do <a href="https://aframe.io/">A-Frame</a> e
        <a href="https://ar-js-org.github.io/AR.js-Docs/">AR.js</a>.
      </li>
      <li>Criar e treinar seus próprios marcadores visuais.</li>
      <li>Projetar ilustrações 2D no mundo real e animá-las nativamente.</li>
      <li>Usar JavaScript para interações dinâmicas ao detectar a câmera.</li>
      <li>Publicar seu projeto gratuitamente na internet usando o GitHub.</li>
    </ol>
    <h3>Roteiro de Aprendizagem</h3>
    <ClientOnly>
      <div class="h-87.5 md:h-75">
        <DiagramFlow :edges="edges" :nodes="nodes" height="100%" />
      </div>
    </ClientOnly>
    <p>Vamos começar?</p>
  </ChapterLayout>
</template>

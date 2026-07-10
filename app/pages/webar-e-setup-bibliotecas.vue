<script lang="ts" setup>
import { ref } from 'vue'
import { Position, MarkerType } from '@vue-flow/core'
import DiagramFlow from '~/components/DiagramFlow.vue'

const nodes = ref([
  { id: 'h-trad', position: { x: 0, y: -20 }, data: { label: '■ Caminho Tradicional (Nativo)' }, class: 'node-header', draggable: false, connectable: false },
  { id: 'A1', position: { x: 0, y: 10 }, data: { label: 'Abrir Loja de Apps' }, sourcePosition: Position.Bottom, class: 'node-error' },
  { id: 'A2', position: { x: 0, y: 80 }, data: { label: 'Pesquisar Aplicativo' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-error' },
  { id: 'A3', position: { x: 0, y: 150 }, data: { label: 'Baixar 100MB+' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-error' },
  { id: 'A4', position: { x: 0, y: 220 }, data: { label: 'Aceitar Permissões' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-error' },
  { id: 'A5', position: { x: 0, y: 290 }, data: { label: 'Usar a Câmera' }, targetPosition: Position.Top, class: 'node-error' },

  { id: 'h-webar', position: { x: 400, y: -20 }, data: { label: '■ Caminho WebAR (Direto)' }, class: 'node-header', draggable: false, connectable: false },
  { id: 'B1', position: { x: 400, y: 10 }, data: { label: 'Escanear QR Code' }, sourcePosition: Position.Bottom, class: 'node-success' },
  { id: 'B2', position: { x: 400, y: 80 }, data: { label: 'Abrir no Navegador' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-success' },
  { id: 'B3', position: { x: 400, y: 150 }, data: { label: 'Pronto para Usar!' }, targetPosition: Position.Top, class: 'node-success' },
])

const edges = ref([
  { id: 'eA1-A2', source: 'A1', target: 'A2', markerEnd: MarkerType.ArrowClosed },
  { id: 'eA2-A3', source: 'A2', target: 'A3', markerEnd: MarkerType.ArrowClosed },
  { id: 'eA3-A4', source: 'A3', target: 'A4', markerEnd: MarkerType.ArrowClosed },
  { id: 'eA4-A5', source: 'A4', target: 'A5', markerEnd: MarkerType.ArrowClosed },
  { id: 'eB1-B2', source: 'B1', target: 'B2', markerEnd: MarkerType.ArrowClosed },
  { id: 'eB2-B3', source: 'B2', target: 'B3', markerEnd: MarkerType.ArrowClosed },
])
</script>

<template>
  <ChapterLayout>
    <h2>Introdução ao WebAR e Setup de Bibliotecas</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Compreender a diferença entre a Realidade Aumentada
      tradicional e a WebAR, entender o papel de cada biblioteca que vamos utilizar e criar a
      primeira base de arquivos do projeto importando os scripts necessários passo a passo.
    </p>
    <hr />
    <h3>Conceitos Fundamentais</h3>
    <h4>1. O que é WebAR? (E quais são suas vantagens?)</h4>
    <p>
      Até pouco tempo atrás, para experimentar a Realidade Aumentada (RA) no celular, o usuário
      precisava seguir um caminho longo e chato:
    </p>
    <ClientOnly>
      <DiagramFlow :nodes="nodes" :edges="edges" />
    </ClientOnly>
    <p>
      A <strong>WebAR (Web Augmented Reality)</strong> quebra todas essas barreiras. Em vez de um
      aplicativo nativo, a experiência inteira é executada
      <strong>dentro do navegador de internet</strong> que o usuário já tem instalado no aparelho. O
      fluxo de acesso se resume a:
    </p>
    <ol>
      <li>Escanear um QR Code impresso em um panfleto ou apontar a câmera para um link.</li>
      <li>O navegador se abre e carrega a experiência instantaneamente na web.</li>
    </ol>
    <p>
      Isso simplifica o acesso do usuário, tornando a tecnologia útil para portfólios, cartões de
      visita interativos e protótipos rápidos.
    </p>
    <h4>2. O que são Bibliotecas JavaScript e CDNs?</h4>
    <p>
      Escrever um programa capaz de reconhecer imagens da câmera do celular em tempo real e calcular
      a matemática 3D necessária do zero exigiria milhares de linhas de código extremamente
      avançado. Felizmente, outros desenvolvedores já criaram essas ferramentas complexas e as
      disponibilizaram de graça. Essas ferramentas prontas são chamadas de
      <strong>bibliotecas</strong>.
    </p>
    <p>
      Para usarmos essas bibliotecas no nosso site, usamos uma
      <strong>CDN (Content Delivery Network)</strong>. Uma CDN é um servidor na internet que hospeda
      os arquivos dessas bibliotecas de forma pública. Em vez de baixar os arquivos das bibliotecas
      para a sua máquina, basta colocar uma tag <code v-pre>&lt;script&gt;</code> no seu código HTML
      apontando para a URL da CDN. O navegador do usuário fará o download delas automaticamente ao
      abrir sua página.
    </p>
    <h4>3. As Tecnologias do Nosso Projeto</h4>
    <ul>
      <li>
        <strong><a href="https://aframe.io/">A-Frame</a> (Mozilla):</strong> É um framework web para
        construir mundos tridimensionais (3D) e de Realidade Virtual (VR). Ele permite criar
        cenários digitais usando marcações HTML simples, sem a necessidade de aprender WebGL
        complexo.
      </li>
      <li>
        <strong><a href="https://ar-js-org.github.io/AR.js-Docs/">AR.js</a>:</strong> É uma
        biblioteca leve de Realidade Aumentada para a Web. Ela estende as capacidades do A-Frame,
        adicionando funcionalidades de rastreamento de câmera e reconhecimento de marcadores
        físicos.
      </li>
    </ul>
    <hr />
    <h3>Mão na Massa: Passo a Passo</h3>
    <h4>Passo 1: Criando a Pasta e o Arquivo do Projeto</h4>
    <ol>
      <li>Abra o <strong>Visual Studio Code</strong>.</li>
      <li>
        Abra a sua pasta de trabalho criada no capítulo anterior (por exemplo,
        <code v-pre>meu-projeto-webar</code>) em <strong>File &gt; Open Folder</strong>.
      </li>
      <li>
        Na barra lateral esquerda (Explorer), clique no ícone <strong>New File</strong> (Novo
        Arquivo) e nomeie-o exatamente como <code v-pre>index.html</code>. É importante usar letras
        minúsculas.
      </li>
      <li>
        Escreva a estrutura básica do HTML5 digitando o atalho <code v-pre>!</code> e pressionando
        <code v-pre>Enter</code>:
      </li>
    </ol>
    <pre v-pre><code v-pre class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;pt-BR&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot; /&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;
    &lt;title&gt;Minha Primeira Experiência WebAR&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;&lt;/body&gt;
&lt;/html&gt;
</code></pre>
    <h4>Passo 2: Importando o Motor 3D (A-Frame)</h4>
    <p>
      A primeira biblioteca que devemos carregar é o A-Frame, pois o AR.js depende dele para
      desenhar as coisas em 3D.
    </p>
    <ol>
      <li>
        No <code v-pre>&lt;head&gt;</code> do seu arquivo HTML, logo abaixo da tag
        <code v-pre>&lt;title&gt;</code>, insira a tag de importação do A-Frame:
      </li>
    </ol>
    <pre v-pre><code v-pre class="language-html">&lt;!-- Biblioteca A-Frame (Versão 1.3.0) --&gt;
&lt;script src=&quot;https://aframe.io/releases/1.3.0/aframe.min.js&quot;&gt;&lt;/script&gt;
</code></pre>
    <h4>Passo 3: Importando o Rastreador de Realidade Aumentada (AR.js)</h4>
    <p>
      Com o A-Frame carregado, agora podemos importar a biblioteca que gerencia a câmera e os
      marcadores de RA.
    </p>
    <ol>
      <li>
        Adicione a tag de script do AR.js logo abaixo do script do A-Frame no
        <code v-pre>&lt;head&gt;</code>:
      </li>
    </ol>
    <pre v-pre><code v-pre class="language-html">&lt;!-- Biblioteca AR.js para A-Frame --&gt;
&lt;script src=&quot;https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js&quot;&gt;&lt;/script&gt;
</code></pre>
    <blockquote>
      <p>
        [!WARNING] A ordem de importação é crucial! O script do <strong>A-Frame</strong> deve sempre
        vir antes do script do <strong>AR.js</strong>. Caso contrário, o AR.js tentará usar recursos
        do A-Frame antes de eles existirem, o que causará erros no console e impedirá a aplicação de
        rodar.
      </p>
    </blockquote>
    <hr />
    <h3>Desafio Prático</h3>
    <ol>
      <li>
        Salve o seu arquivo pressionando <code v-pre>Ctrl + S</code> (Windows) ou
        <code v-pre>Cmd + S</code> (Mac).
      </li>
      <li>
        Abra a página com o <strong>Live Server</strong> clicando no botão
        <strong>Go Live</strong> no canto inferior direito do VS Code (ou clique com o botão direito
        sobre o código e selecione <strong>Open with Live Server</strong>).
      </li>
      <li>
        No seu navegador web externo que abrir, acesse o Console de Desenvolvedor pressionando a
        tecla <code v-pre>F12</code> (ou clique com o botão direito em qualquer parte da página e
        selecione <strong>Inspecionar</strong>, depois clique na aba <strong>Console</strong>).
      </li>
      <li>
        Você verá um painel com um texto de boas-vindas do A-Frame e estatísticas do motor gráfico.
        Certifique-se de que não há nenhuma linha vermelha de erro indicando falha ao carregar os
        scripts.
      </li>
    </ol>
  </ChapterLayout>
</template>

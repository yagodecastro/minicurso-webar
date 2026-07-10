<script setup lang="ts">
import DiagramFlow from '~/components/DiagramFlow.vue'
import { ref } from 'vue'
import { Position, MarkerType } from '@vue-flow/core'

const nodes = ref([
  {
    id: 'Img',
    position: { x: 250, y: 0 },
    data: { label: 'Imagem Original: 800×400px Proporção 2:1' },
    sourcePosition: Position.Bottom,
    class: 'node-default node-wide',
  },
  {
    id: 'Dist',
    position: { x: 60, y: 120 },
    data: { label: 'Distorcido: Imagem espremida ❌' },
    targetPosition: Position.Top,
    class: 'node-error node-wide',
  },
  {
    id: 'Corr',
    position: { x: 440, y: 120 },
    data: { label: 'Correto: Proporção preservada ✔' },
    targetPosition: Position.Top,
    class: 'node-success node-wide',
  },
])

const edges = ref([
  { id: 'eImg-Dist', source: 'Img', target: 'Dist', label: "width='1' height='1'", markerEnd: MarkerType.ArrowClosed },
  { id: 'eImg-Corr', source: 'Img', target: 'Corr', label: "width='2' height='1'", markerEnd: MarkerType.ArrowClosed },
])
</script>

<template>
  <ChapterLayout>
    <h2>Inserindo Ilustrações 2D</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Substituir as formas geométricas coloridas básicas por
      ilustrações bidimensionais (2D) reais e personalizadas, dominar o uso da tag
      <code v-pre>&lt;a-image&gt;</code> do A-Frame e posicionar texturas gráficas sobre marcadores
      físicos de Realidade Aumentada.
    </p>
    <hr />
    <h3>Conceitos Fundamentais</h3>
    <h4>1. O poder das Ilustrações no WebAR</h4>
    <p>
      Embora cubos e esferas sejam excelentes para compreender o plano cartesiano, criar
      experiências premium e atraentes exige o uso de elementos visuais mais ricos.
    </p>
    <p>
      Na Realidade Aumentada, é muito comum projetar ilustrações autorais, logotipos de marcas,
      cartazes promocionais, fotos ou artes vetorizadas. Em vez de modelar elementos 3D complexos no
      início, podemos usar o poder do design 2D integrado ao ambiente tridimensional.
    </p>
    <h4>
      <strong>2. A tag <code v-pre>&lt;a-image&gt;</code></strong>
    </h4>
    <p>
      A tag <strong><code v-pre>&lt;a-image&gt;</code></strong> é um elemento nativo do A-Frame
      usado para renderizar planos bidimensionais revestidos por uma textura de imagem. Ela funciona
      de forma semelhante à tag <code v-pre>&lt;img&gt;</code> tradicional do HTML, porém possui
      comportamento espacial completo no mundo 3D (posição, rotação e escala).
    </p>
    <p>Alguns atributos essenciais da tag <code v-pre>&lt;a-image&gt;</code> são:</p>
    <ul>
      <li>
        <strong><code v-pre>src</code>:</strong> Aponta para o arquivo de imagem local (na nossa
        pasta <code v-pre>assets</code>) ou uma URL de imagem externa na internet.
      </li>
      <li>
        <strong><code v-pre>width</code> e <code v-pre>height</code>:</strong> Definem o tamanho
        físico virtual da imagem no espaço 3D (medido em metros virtuais).
      </li>
      <li>
        <strong><code v-pre>opacity</code>:</strong> Controla a transparência da imagem (valores de
        <code v-pre>0</code> a <code v-pre>1</code>).
      </li>
    </ul>
    <h4>3. Mantendo as Proporções Visuais</h4>
    <p>
      Se você tiver uma imagem retangular (por exemplo, com proporção de 2 de largura para 1 de
      altura) e definir os atributos <code v-pre>width=&quot;1&quot; height=&quot;1&quot;</code> na
      tag <code v-pre>&lt;a-image&gt;</code>, a sua imagem ficará &quot;espremida&quot; e achatada.
    </p>
    <p>
      Para que a ilustração seja renderizada no mundo real com suas proporções perfeitas de design,
      os valores de <code v-pre>width</code> e <code v-pre>height</code> da tag
      <code v-pre>&lt;a-image&gt;</code> devem seguir a mesma proporção matemática de pixels da
      imagem original.
    </p>
    <ClientOnly>
      <DiagramFlow :nodes="nodes" :edges="edges" />
    </ClientOnly>
    <hr />
    <h3>Mão na Massa: Passo a Passo</h3>
    <h4>Passo 1: Preparando a Imagem de Teste</h4>
    <ol>
      <li>
        Escolha uma imagem no seu computador (por exemplo, um logotipo pessoal, uma foto ou um
        desenho simples).
      </li>
      <li>
        Salve-a na pasta <code v-pre>assets</code> do seu projeto com um nome curto e limpo (por
        exemplo, <code v-pre>meu-logo.png</code>).
      </li>
      <li>Verifique se o formato do arquivo é PNG ou JPG.</li>
    </ol>
    <h4>Passo 2: Configurando o Código HTML</h4>
    <ol>
      <li>No VS Code, abra o arquivo <code v-pre>index.html</code>.</li>
      <li>
        Substitua a tag <code v-pre>&lt;a-plane&gt;</code> vermelha que criamos anteriormente pela
        tag <code v-pre>&lt;a-image&gt;</code> dentro do bloco de marcador customizado:
      </li>
    </ol>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;a-scene embedded arjs=&quot;sourceType: webcam; debugUIEnabled: false;&quot;&gt;
  &lt;!-- Carrega seu marcador customizado --&gt;
  &lt;a-marker type=&quot;pattern&quot; url=&quot;assets/meu-marcador.patt&quot;&gt;
    &lt;!-- Desenha a ilustração 2D deitada sobre o marcador físico --&gt;
    &lt;a-image
      src=&quot;assets/meu-logo.png&quot;
      position=&quot;0 0.01 0&quot;
      rotation=&quot;-90 0 0&quot;
      width=&quot;1&quot;
      height=&quot;1&quot;
    &gt;&lt;/a-image&gt;
  &lt;/a-marker&gt;

  &lt;a-entity camera&gt;&lt;/a-entity&gt;
&lt;/a-scene&gt;
</code></pre>
    <ul>
      <li>
        <code v-pre>src=&quot;assets/meu-logo.png&quot;</code>: Indica ao A-Frame onde buscar a
        imagem no projeto local.
      </li>
      <li>
        <code v-pre>position=&quot;0 0.01 0&quot;</code>: Eleva ligeiramente a imagem na vertical
        (Y: 0.01) para que ela não cause z-fighting com o papel do marcador físico na mesa.
      </li>
      <li><code v-pre>rotation=&quot;-90 0 0&quot;</code>: Deita a imagem sobre o papel físico.</li>
    </ul>
    <h4>Passo 3: Visualizando a Projeção</h4>
    <ol>
      <li>Salve as alterações.</li>
      <li>
        Abra a página com o <strong>Live Server</strong> (clicando em <strong>Go Live</strong> no
        canto inferior direito).
      </li>
      <li>Aponte a webcam do computador para o seu marcador de papel ou tela do celular.</li>
      <li>
        Veja que o seu logotipo ou foto digital agora é renderizado colado de forma estável sobre a
        superfície do marcador físico!
      </li>
    </ol>
    <hr />
    <h3>Desafio Prático</h3>
    <ol>
      <li>
        Descubra a largura e altura em pixels da imagem que você usou (no Windows, clique com o
        botão direito na imagem &gt; <em>Propriedades &gt; Detalhes</em>; no Mac, clique com o botão
        direito &gt; <em>Obter Informações</em>).
      </li>
      <li>
        Se a sua imagem for retangular (por exemplo: 800px de largura por 400px de altura), calcule
        a proporção simplificada (2 de largura para 1 de altura).
      </li>
      <li>
        Ajuste os atributos da tag <code v-pre>&lt;a-image&gt;</code> para que ela exiba essa
        proporção perfeita na tela (exemplo:
        <code v-pre>width=&quot;2&quot; height=&quot;1&quot;</code> ou
        <code v-pre>width=&quot;1.6&quot; height=&quot;0.8&quot;</code>). Salve e verifique se a
        distorção sumiu!
      </li>
    </ol>
  </ChapterLayout>
</template>

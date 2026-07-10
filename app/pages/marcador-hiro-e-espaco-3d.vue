<script setup lang="ts">
import DiagramFlow from '~/components/DiagramFlow.vue'
import { ref } from 'vue'
import { Position, MarkerType } from '@vue-flow/core'

const nodes1 = ref([
  { id: 'Origem', position: { x: 250, y: 80 }, data: { label: 'Centro do Marcador (0, 0, 0)' }, sourcePosition: Position.Right, class: 'node-indigo node-wide' },
  { id: 'X_Eixo', position: { x: 580, y: 0 }, data: { label: 'Laterais do Papel (Esq./Dir.)' }, targetPosition: Position.Left, class: 'node-error node-wide' },
  { id: 'Y_Eixo', position: { x: 580, y: 80 }, data: { label: 'Altura Vertical (Levitar no Ar)' }, targetPosition: Position.Left, class: 'node-success node-wide' },
  { id: 'Z_Eixo', position: { x: 580, y: 160 }, data: { label: 'Profundidade (Frente/Trás do Papel)' }, targetPosition: Position.Left, class: 'node-amber node-wide' },
])

const edges1 = ref([
  { id: 'e-Origem-X', source: 'Origem', target: 'X_Eixo', label: 'Eixo X + / -', markerEnd: MarkerType.ArrowClosed },
  { id: 'e-Origem-Y', source: 'Origem', target: 'Y_Eixo', label: 'Eixo Y +', markerEnd: MarkerType.ArrowClosed },
  { id: 'e-Origem-Z', source: 'Origem', target: 'Z_Eixo', label: 'Eixo Z + / -', markerEnd: MarkerType.ArrowClosed },
])

const nodes2 = ref([
  { id: 'h-zfight', position: { x: 80, y: -20 }, data: { label: '■ Com Z-Fighting (Cintilação ❌)' }, class: 'node-header', draggable: false, connectable: false },
  { id: 'A1', position: { x: 80, y: 20 }, data: { label: 'Plano Virtual: Y = 0.0' }, sourcePosition: Position.Bottom, class: 'node-default' },
  { id: 'B1', position: { x: 80, y: 110 }, data: { label: 'Papel Físico: Y = 0.0' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-default' },
  { id: 'C1', position: { x: 80, y: 200 }, data: { label: 'Conflito: Textura pisca na tela' }, targetPosition: Position.Top, class: 'node-error' },
  { id: 'h-semzf', position: { x: 420, y: -20 }, data: { label: '■ Sem Z-Fighting (Correto ✔)' }, class: 'node-header', draggable: false, connectable: false },
  { id: 'A2', position: { x: 420, y: 20 }, data: { label: 'Plano Virtual: Y = 0.01' }, sourcePosition: Position.Bottom, class: 'node-default' },
  { id: 'B2', position: { x: 420, y: 110 }, data: { label: 'Papel Físico: Y = 0.0' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-default' },
  { id: 'C2', position: { x: 420, y: 200 }, data: { label: 'Renderização estável e limpa' }, targetPosition: Position.Top, class: 'node-success' },
])

const edges2 = ref([
  { id: 'eA1-B1', source: 'A1', target: 'B1', markerEnd: MarkerType.ArrowClosed },
  { id: 'eB1-C1', source: 'B1', target: 'C1', markerEnd: MarkerType.ArrowClosed },
  { id: 'eA2-B2', source: 'A2', target: 'B2', label: 'Espaço Invisível', markerEnd: MarkerType.ArrowClosed, style: { strokeDasharray: '5 5' } },
  { id: 'eB2-C2', source: 'B2', target: 'C2', markerEnd: MarkerType.ArrowClosed },
])
</script>

<template>
  <ChapterLayout>
    <h2>O Marcador Hiro e o Espaço 3D</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Compreender a mecânica de rastreamento por marcadores
      físicos, entender como os eixos tridimensionais (X, Y, Z) se comportam em relação ao papel
      real e projetar seu primeiro objeto virtual plano colado exatamente acima do marcador Hiro.
    </p>
    <hr />
    <h3>Conceitos Fundamentais</h3>
    <h4>1. Como funciona o rastreamento por marcadores?</h4>
    <p>
      O AR.js utiliza uma técnica clássica de Realidade Aumentada chamada
      <strong>rastreamento baseado em marcadores</strong> (<em>marker-based tracking</em>).
    </p>
    <p>
      A câmera do celular filma o ambiente em tempo real buscando por padrões geométricos
      específicos de alto contraste. Quando ela encontra um padrão conhecido, o processador calcula
      a distância do marcador, a inclinação da mesa e o ângulo do celular. Em milissegundos, o motor
      posiciona a cena tridimensional virtual exatamente sobre aquela posição do papel físico.
    </p>
    <h4>2. O Marcador Hiro</h4>
    <p>
      O <strong>Hiro</strong> é o marcador padrão de testes mais conhecido no mundo da Realidade
      Aumentada. Ele consiste em um caractere japonês preto cercado por uma borda preta grossa em um
      quadrado branco. A borda preta grossa é essencial porque ajuda o algoritmo da câmera a
      identificar o contorno e as quinas do marcador, mesmo sob condições ruins de iluminação.
    </p>
    <p>
      Você pode baixar a imagem oficial para usar no seu celular ou imprimir:
      <img
        src="https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/HIRO.jpg"
        alt="Marcador Hiro"
      />
    </p>
    <h4>3. Os Eixos 3D em cima da Mesa</h4>
    <p>
      No capítulo anterior (Cena Virtual Pura), o centro do universo 3D ficava na posição da nossa
      tela. Agora, na Realidade Aumentada,
      <strong
        >o centro do universo 3D (coordenada <code v-pre>0 0 0</code>) passa a ser o exato centro
        físico do seu marcador de papel.</strong
      >
    </p>
    <p>Os eixos se comportam da seguinte forma em relação ao marcador deitado na mesa:</p>
    <ul>
      <li>
        <strong>Eixo X (Horizontal):</strong> Controla a posição para a direita ou esquerda do
        papel.
      </li>
      <li>
        <strong>Eixo Y (Vertical):</strong> Representa a altura. Valores positivos sobem o objeto no
        ar, &quot;levitando&quot; acima da mesa.
      </li>
      <li>
        <strong>Eixo Z (Profundidade):</strong> Controla a posição para frente ou para trás em
        relação à borda do papel.
      </li>
    </ul>
    <ClientOnly>
      <DiagramFlow :nodes="nodes1" :edges="edges1" />
    </ClientOnly>
    <h4>4. O Efeito de Z-Fighting (Cintilação)</h4>
    <p>
      Quando colocamos dois objetos exatamente na mesma coordenada espacial (por exemplo, um plano
      virtual na altura <code v-pre>Y: 0</code> e o papel real que também está na altura
      <code v-pre>Y: 0</code>), o motor gráfico fica confuso sem saber qual superfície deve desenhar
      por cima. Isso causa um efeito visual desagradável onde o objeto virtual fica piscando ou
      cortado. Para evitar isso, costumamos dar uma leve elevação vertical nos nossos objetos
      virtuais (como <code v-pre>Y: 0.01</code>).
    </p>
    <ClientOnly>
      <DiagramFlow :nodes="nodes2" :edges="edges2" />
    </ClientOnly>
    <hr />
    <h3>Mão na Massa: Passo a Passo</h3>
    <h4>Passo 1: Preparando a Imagem do Marcador</h4>
    <ol>
      <li>
        No seu smartphone, abra o navegador e pesquise por &quot;Hiro Marker&quot; na busca de
        imagens.
      </li>
      <li>
        Deixe a imagem do marcador aberta na tela inteira do celular, ou, se preferir, imprima a
        imagem em um papel.
      </li>
    </ol>
    <h4>Passo 2: Configurando o Marcador no HTML</h4>
    <ol>
      <li>No VS Code, abra o seu arquivo <code v-pre>index.html</code>.</li>
      <li>Certifique-se de que a estrutura básica da cena e a câmera estejam configuradas.</li>
      <li>
        Dentro da tag <code v-pre>&lt;a-scene&gt;</code>, adicione a tag
        <code v-pre>&lt;a-marker&gt;</code> usando o modelo padrão Hiro:
      </li>
    </ol>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;a-scene embedded arjs=&quot;sourceType: webcam; debugUIEnabled: false;&quot;&gt;
  &lt;!-- Marcador Hiro padrão do AR.js --&gt;
  &lt;a-marker preset=&quot;hiro&quot;&gt; &lt;/a-marker&gt;

  &lt;a-entity camera&gt;&lt;/a-entity&gt;
&lt;/a-scene&gt;
</code></pre>
    <h4>Passo 3: Criando o Plano Virtual Colorido</h4>
    <ol>
      <li>
        Dentro do bloco do <code v-pre>&lt;a-marker&gt;</code>, vamos adicionar a tag
        <code v-pre>&lt;a-plane&gt;</code> para desenhar uma folha vermelha virtual deitada
        exatamente sobre o papel real:
      </li>
    </ol>
    <pre v-pre><code v-pre class="language-html">&lt;a-marker preset=&quot;hiro&quot;&gt;
  &lt;!-- Plano deitado 90 graus no eixo X e elevado levemente no eixo Y (0.01) para evitar piscar --&gt;
  &lt;a-plane position=&quot;0 0.01 0&quot; rotation=&quot;-90 0 0&quot; width=&quot;1&quot; height=&quot;1&quot; color=&quot;#EF2D5E&quot;&gt;&lt;/a-plane&gt;
&lt;/a-marker&gt;
</code></pre>
    <ul>
      <li>
        <code v-pre>rotation=&quot;-90 0 0&quot;</code>: rotaciona o plano em -90 graus no eixo X.
        Como a tag <code v-pre>&lt;a-plane&gt;</code> é originalmente em pé, essa rotação serve para
        &quot;deitar&quot; o plano na horizontal, alinhando-o perfeitamente com a mesa.
      </li>
      <li>
        <code v-pre>width=&quot;1&quot; height=&quot;1&quot;</code>: define que o tamanho virtual do
        plano será de 1x1 unidade (que o AR.js mapeia aproximadamente como o mesmo tamanho real da
        borda interna do marcador físico).
      </li>
    </ul>
    <h4>Passo 4: Testando a Experiência</h4>
    <ol>
      <li>Salve o arquivo.</li>
      <li>
        Abra a página com o <strong>Live Server</strong> (clicando em <strong>Go Live</strong> no
        canto inferior direito).
      </li>
      <li>
        Pegue o seu celular (com a imagem do Hiro Marker na tela) ou o papel impresso e aponte-o em
        direção à webcam do seu computador.
      </li>
      <li>
        Veja o plano vermelho digital aparecer colado perfeitamente sobre a imagem física! Se você
        rotacionar ou inclinar o papel, o plano vermelho acompanhará o movimento dinamicamente.
      </li>
    </ol>
    <hr />
    <h3>Desafio Prático</h3>
    <ol>
      <li>Mude a cor do plano para verde.</li>
      <li>
        Modifique os valores de posição do plano para que ele flutue a 0.5 metros acima do marcador
        (ajustando o eixo Y).
      </li>
      <li>
        Mude a largura (<code v-pre>width</code>) e altura (<code v-pre>height</code>) do plano para
        <code v-pre>1.5</code> e veja o tamanho dele em relação ao marcador aumentar na tela.
      </li>
    </ol>
  </ChapterLayout>
</template>

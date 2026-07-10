<script setup lang="ts">
import DiagramFlow from '~/components/DiagramFlow.vue'
import { ref } from 'vue'
import { Position, MarkerType } from '@vue-flow/core'

const nodes1 = ref([
  { id: 'h-errado', position: { x: 0, y: -10 }, data: { label: '■ Y = 0.0 (Errado ❌)' }, class: 'node-header', draggable: false, connectable: false },
  { id: 'A1', position: { x: 250, y: 20 }, data: { label: 'Pivô no Centro do Personagem' }, sourcePosition: Position.Bottom, class: 'node-error node-wide' },
  { id: 'B1', position: { x: 60, y: 130 }, data: { label: 'Metade de Cima: 0.5m Visível' }, targetPosition: Position.Top, class: 'node-error node-wide' },
  { id: 'C1', position: { x: 440, y: 130 }, data: { label: 'Metade de Baixo: 0.5m Enterrada' }, targetPosition: Position.Top, class: 'node-error node-wide' },
])

const edges1 = ref([
  { id: 'eA1-B1', source: 'A1', target: 'B1', markerEnd: MarkerType.ArrowClosed },
  { id: 'eA1-C1', source: 'A1', target: 'C1', markerEnd: MarkerType.ArrowClosed },
])

const nodes2 = ref([
  { id: 'h-correto', position: { x: 0, y: -10 }, data: { label: '■ Y = 0.5 (Correto ✔)' }, class: 'node-header', draggable: false, connectable: false },
  { id: 'A2', position: { x: 250, y: 20 }, data: { label: 'Pivô elevado: Altura / 2' }, sourcePosition: Position.Bottom, class: 'node-success' },
  { id: 'B2', position: { x: 250, y: 130 }, data: { label: 'Base do personagem apoia na mesa' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-success' },
  { id: 'C2', position: { x: 250, y: 240 }, data: { label: 'Personagem 100% visível no espaço virtual' }, targetPosition: Position.Top, class: 'node-success' },
])

const edges2 = ref([
  { id: 'eA2-B2', source: 'A2', target: 'B2', markerEnd: MarkerType.ArrowClosed },
  { id: 'eB2-C2', source: 'B2', target: 'C2', markerEnd: MarkerType.ArrowClosed },
])
</script>

<template>
  <ChapterLayout>
    <h2>O Efeito &quot;Outdoor&quot; (Levantando a Arte)</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Aprender a posicionar suas ilustrações digitais na
      vertical (em pé) em relação ao marcador horizontal deitado na mesa, compreender a mecânica de
      ancoragem central dos objetos tridimensionais no A-Frame e aplicar o cálculo de elevação
      vertical necessário para evitar que elementos fiquem enterrados debaixo da mesa real.
    </p>
    <hr />
    <h3>Conceitos Fundamentais</h3>
    <h4>1. O Efeito de Display Físico</h4>
    <p>
      Até agora, as imagens que projetamos estavam deitadas na mesa física como se fossem adesivos
      colados no papel. No entanto, uma das experiências visuais mais interessantes no WebAR é o
      <strong>efeito &quot;Outdoor&quot; (ou display de mesa)</strong>.
    </p>
    <p>
      Imagine um totem de papelão publicitário ou o stand de um personagem de jogo que fica em pé
      sobre o marcador. O usuário pode rodar a câmera ao redor dele e ver o personagem erguido no
      espaço tridimensional.
    </p>
    <h4>2. O Problema da Ancoragem pelo Centro</h4>
    <p>
      No desenvolvimento 3D, todos os objetos possuem um ponto de referência central invisível
      chamado de <strong>pivô ou âncora</strong>. É a partir desse ponto central que o computador
      calcula a posição espacial do objeto.
    </p>
    <p>
      No A-Frame, a âncora padrão de uma imagem fica exatamente no seu
      <strong>centro geométrico</strong> (e não na borda inferior). Isso gera uma consequência
      importante ao posicionarmos objetos em pé:
    </p>
    <ul>
      <li>
        Se a sua imagem tem 1 metro de altura (<code v-pre>height=&quot;1&quot;</code>) e você a
        posiciona na coordenada vertical zero (<code v-pre>Y: 0</code>), o A-Frame alinhará o centro
        da imagem com a mesa.
      </li>
      <li>
        Isso significa que a metade de cima da imagem (0,5 metros) ficará visível flutuando acima da
        mesa, mas a metade inferior (0,5 metros) ficará
        <strong>enterrada debaixo da mesa física</strong> (desaparecendo da tela).
      </li>
    </ul>
    <ClientOnly>
      <DiagramFlow :nodes="nodes1" :edges="edges1" />
    </ClientOnly>
    <h4>3. A Fórmula de Correção de Altura</h4>
    <p>
      Para fazer com que a base da imagem fique perfeitamente apoiada no papel físico sem afundar na
      superfície da mesa, precisamos elevá-la verticalmente (eixo Y). O cálculo é muito simples:
      basta deslocar o objeto para cima na exata
      <strong>metade do valor da sua altura</strong> (<code v-pre>height</code>):
    </p>
    <p>
      $$\text&#123;Posição &#125; Y = \frac&#123;\text&#123;Altura do
      Objeto&#125;&#125;&#123;2&#125;$$
    </p>
    <ul>
      <li>Se a altura for <code v-pre>1</code>, a posição Y deve ser <code v-pre>0.5</code>.</li>
      <li>Se a altura for <code v-pre>1.6</code>, a posição Y deve ser <code v-pre>0.8</code>.</li>
    </ul>
    <ClientOnly>
      <DiagramFlow :nodes="nodes2" :edges="edges2" />
    </ClientOnly>
    <hr />
    <h3>Mão na Massa: Passo a Passo</h3>
    <h4>Passo 1: Zerando a Rotação para Levantar a Arte</h4>
    <ol>
      <li>No VS Code, abra o arquivo <code v-pre>index.html</code>.</li>
      <li>Localize a tag <code v-pre>&lt;a-image&gt;</code> dentro do seu marcador customizado.</li>
      <li>
        Altere o atributo <code v-pre>rotation</code> de <code v-pre>&quot;-90 0 0&quot;</code> para
        <code v-pre>&quot;0 0 0&quot;</code>. Isso avisa ao motor gráfico para não deitar o plano na
        mesa virtual.
      </li>
    </ol>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;a-marker type=&quot;pattern&quot; url=&quot;assets/meu-marcador.patt&quot;&gt;
  &lt;!-- Levanta a imagem zerando a rotação --&gt;
  &lt;a-image src=&quot;#personagem-png&quot; width=&quot;1&quot; height=&quot;1&quot; rotation=&quot;0 0 0&quot; position=&quot;0 0 0&quot;&gt;&lt;/a-image&gt;
&lt;/a-marker&gt;
</code></pre>
    <h4>Passo 2: Aplicando a Elevação de Correção</h4>
    <p>
      Se você testar o código do Passo 1 na câmera, verá que o personagem parecerá cortado ao meio
      pela mesa de apoio. Vamos elevar seu posicionamento no eixo Y:
    </p>
    <ol>
      <li>
        Altere o atributo <code v-pre>position</code> da tag <code v-pre>&lt;a-image&gt;</code> de
        <code v-pre>&quot;0 0.01 0&quot;</code> para <code v-pre>&quot;0 0.5 0&quot;</code> (já que
        a imagem tem <code v-pre>height=&quot;1&quot;</code>):
      </li>
    </ol>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;a-marker type=&quot;pattern&quot; url=&quot;assets/meu-marcador.patt&quot;&gt;
  &lt;!-- Posiciona o personagem em pé e apoiado perfeitamente na base do marcador --&gt;
  &lt;a-image src=&quot;#personagem-png&quot; width=&quot;1&quot; height=&quot;1&quot; rotation=&quot;0 0 0&quot; position=&quot;0 0.5 0&quot;&gt;&lt;/a-image&gt;
&lt;/a-marker&gt;
</code></pre>
    <h4>Passo 3: Testando no Live Server</h4>
    <ol>
      <li>Salve o arquivo e abra a visualização.</li>
      <li>Aponte o marcador personalizado para a webcam.</li>
      <li>
        Observe como o personagem agora parece &quot;pular&quot; para fora da folha, mantendo-se
        totalmente erguido na vertical e com a base colada sobre o marcador físico!
      </li>
    </ol>
    <hr />
    <h3>Desafio Prático</h3>
    <ol>
      <li>
        Imagine que você está usando um personagem gigante que precisa ter a altura física virtual
        de 2 metros (<code v-pre>height=&quot;2&quot;</code>).
      </li>
      <li>
        Ajuste o tamanho da tag <code v-pre>&lt;a-image&gt;</code> configurando
        <code v-pre>width=&quot;1.25&quot; height=&quot;2&quot;</code>.
      </li>
      <li>
        Calcule qual deve ser o valor correto da coordenada Y no atributo
        <code v-pre>position</code> para que este personagem de 2 metros fique apoiado na superfície
        sem afundar no papel.
      </li>
      <li>
        <strong>Dica:</strong> Lembre-se da fórmula: $\text&#123;Posição &#125; Y =
        \frac&#123;\text&#123;Altura&#125;&#125;&#123;2&#125;$.
      </li>
    </ol>
  </ChapterLayout>
</template>

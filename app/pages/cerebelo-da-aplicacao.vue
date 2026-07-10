<script setup lang="ts">
import DiagramFlow from '~/components/DiagramFlow.vue'
import { ref } from 'vue'
import { Position, MarkerType } from '@vue-flow/core'

const nodes = ref([
  { id: 'A', position: { x: 250, y: 0 }, data: { label: 'Iniciar Página: Opacidade 0' }, sourcePosition: Position.Bottom, class: 'node-light-gray' },
  { id: 'B', position: { x: 250, y: 120 }, data: { label: 'Câmera buscou o .patt?' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-decision' },
  { id: 'C', position: { x: 440, y: 240 }, data: { label: 'Injeta animation__aparecer' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-light-blue' },
  { id: 'D', position: { x: 440, y: 360 }, data: { label: 'Personagem surge suavemente' }, class: 'node-default' },
  { id: 'E', position: { x: 60, y: 240 }, data: { label: 'Remove animation__aparecer' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-light-error' },
  { id: 'F', position: { x: 60, y: 360 }, data: { label: 'Reseta opacidade para 0' }, class: 'node-light-error' },
])

const edges = ref([
  { id: 'eA-B', source: 'A', target: 'B', markerEnd: MarkerType.ArrowClosed },
  { id: 'eB-C', source: 'B', target: 'C', label: 'Sim (markerFound)', markerEnd: MarkerType.ArrowClosed },
  { id: 'eC-D', source: 'C', target: 'D', markerEnd: MarkerType.ArrowClosed },
  { id: 'eB-E', source: 'B', target: 'E', label: 'Não / Escondeu (markerLost)', markerEnd: MarkerType.ArrowClosed },
  { id: 'eE-F', source: 'E', target: 'F', markerEnd: MarkerType.ArrowClosed },
])
</script>

<template>
  <ChapterLayout>
    <h2>O Cerebelo da Aplicação (Eventos JavaScript)</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Integrar interatividade lógica à sua aplicação usando
      scripts em JavaScript, escutar os eventos físicos de detecção de câmera do AR.js (<code v-pre
        >markerFound</code
      >
      e <code v-pre>markerLost</code>) e criar um efeito de surgimento (fade-in) e desaparecimento
      suave dos seus hologramas para elevar a qualidade visual da experiência.
    </p>
    <hr />
    <h3>Conceitos Fundamentais</h3>
    <h4>1. O Problema do Surgimento Abrupto</h4>
    <p>
      Por padrão, quando colocamos um objeto 3D dentro do bloco de um marcador, ele aparece e
      desaparece na tela de forma instantânea (como um piscar de luzes) quando a câmera detecta ou
      perde o papel físico de vista. Isso dá um aspecto amador e artificial à aplicação.
    </p>
    <p>
      Para criarmos experiências premium, queremos que o holograma surja de forma suave, realizando
      um esmaecimento gradual (efeito de <em>fade-in</em>) e suma da mesma forma
      (<em>fade-out</em>). Para controlar esse comportamento dinâmico, precisamos de uma linguagem
      lógica: o <strong>JavaScript</strong>.
    </p>
    <h4>2. Os Eventos de Câmera do AR.js</h4>
    <p>
      O AR.js adiciona &quot;sensores&quot; especiais às tags de marcadores HTML. Esses sensores
      disparam eventos lógicos que o JavaScript consegue ler em tempo real:
    </p>
    <ol>
      <li>
        <strong><code v-pre>markerFound</code> (Marcador Encontrado):</strong> É executado no exato
        instante em que a câmera reconhece o padrão do seu arquivo <code v-pre>.patt</code>.
      </li>
      <li>
        <strong><code v-pre>markerLost</code> (Marcador Perdido):</strong> É executado no momento em
        que o marcador sai do campo de visão da câmera ou quando alguém o cobre com a mão.
      </li>
    </ol>
    <h4>3. Manipulação de Elementos via JavaScript (DOM)</h4>
    <p>
      Para fazer o holograma acender, programamos o JavaScript para fazer o seguinte fluxo de
      transição:
    </p>
    <ClientOnly>
      <DiagramFlow :nodes="nodes" :edges="edges" />
    </ClientOnly>
    <ol>
      <li>
        Iniciar o personagem com opacidade invisível (<code v-pre>opacity=&quot;0&quot;</code>).
      </li>
      <li>
        Quando o sensor acusar <code v-pre>markerFound</code>, o JavaScript injeta dinamicamente um
        atributo de animação de opacidade no objeto, fazendo-o ir de <code v-pre>0</code> para
        <code v-pre>1</code>.
      </li>
      <li>
        Quando o sensor acusar <code v-pre>markerLost</code>, o JavaScript remove essa animação e
        retorna a opacidade para <code v-pre>0</code>, preparando o objeto para o próximo ciclo de
        detecção.
      </li>
    </ol>
    <hr />
    <h3>Mão na Massa: Passo a Passo</h3>
    <h4>Passo 1: Identificando os Elementos com IDs e Ocultando a Arte</h4>
    <p>
      Para que o JavaScript saiba exatamente quem controlar na tela, precisamos dar nomes (IDs) a
      eles e inicializar o personagem de forma invisível.
    </p>
    <ol>
      <li>No VS Code, abra o arquivo <code v-pre>index.html</code>.</li>
      <li>
        Ajuste a tag do seu marcador inserindo <code v-pre>id=&quot;meu-marcador&quot;</code>.
      </li>
      <li>
        Ajuste a tag <code v-pre>&lt;a-image&gt;</code> inserindo
        <code v-pre>id=&quot;arte-principal&quot;</code> e o atributo
        <code v-pre>opacity=&quot;0&quot;</code>:
      </li>
    </ol>
    <pre v-pre><code v-pre class="language-html">&lt;!-- Identifica o marcador com um ID --&gt;
&lt;a-marker type=&quot;pattern&quot; url=&quot;assets/meu-marcador.patt&quot; id=&quot;meu-marcador&quot;&gt;
  &lt;!-- Personagem inicia invisível (opacity=&quot;0&quot;) e possui um ID --&gt;
  &lt;a-image
    id=&quot;arte-principal&quot;
    src=&quot;#personagem-png&quot;
    position=&quot;0 0.5 0&quot;
    width=&quot;1&quot;
    height=&quot;1&quot;
    rotation=&quot;0 0 0&quot;
    opacity=&quot;0&quot;
    animation__pulsar=&quot;property: scale; to: 1.1 1.1 1.1; dir: alternate; loop: true; dur: 1000; easing: easeInOutSine&quot;
    animation__flutuar=&quot;property: position; to: 0 0.7 0; dir: alternate; loop: true; dur: 1800; easing: easeInOutQuad&quot;
  &gt;
  &lt;/a-image&gt;
&lt;/a-marker&gt;
</code></pre>
    <h4>Passo 2: Escrevendo a Lógica em JavaScript</h4>
    <ol>
      <li>
        Logo abaixo do fechamento da tag da cena (<code v-pre>&lt;/a-scene&gt;</code>), pouco antes
        do fechamento de <code v-pre>&lt;/body&gt;</code>, adicione a tag
        <code v-pre>&lt;script&gt;</code> com a lógica de controle:
      </li>
    </ol>
    <pre v-pre><code v-pre class="language-html"> &lt;/a-scene&gt;

 &lt;!-- Início da programação lógica --&gt;
 &lt;script&gt;
 // 1. Captura os elementos HTML em variáveis do JavaScript
 const marcador = document.querySelector(&#39;#meu-marcador&#39;);
 const arte = document.querySelector(&#39;#arte-principal&#39;);

 // 2. Escuta quando a câmera encontra o marcador
 marcador.addEventListener(&#39;markerFound&#39;, () =&gt; &#123;
 // Injeta uma animação de fade-in na opacidade
 arte.setAttribute(&#39;animation__aparecer&#39;, &#39;property: opacity; to: 1; dur: 600; easing: linear&#39;);
 &#125;);

 // 3. Escuta quando a câmera perde o marcador de vista
 marcador.addEventListener(&#39;markerLost&#39;, () =&gt; &#123;
 // Remove a animação de fade-in para evitar conflitos futuros
 arte.removeAttribute(&#39;animation__aparecer&#39;);
 // Retorna o objeto ao estado invisível
 arte.setAttribute(&#39;opacity&#39;, &#39;0&#39;);
 &#125;);
 &lt;/script&gt;
&lt;/body&gt;
</code></pre>
    <h4>Passo 3: Testando a Interatividade</h4>
    <ol>
      <li>
        Salve o arquivo e abra-o com o <strong>Live Server</strong> (clique no botão
        <strong>Go Live</strong> no canto inferior direito do VS Code).
      </li>
      <li>Aponte a webcam para o marcador.</li>
      <li>
        Repare no efeito suave: o personagem não pisca na tela; ele surge gradualmente por meio de
        um brilho suave durante 0.6 segundos (<code v-pre>dur: 600</code>)!
      </li>
      <li>
        Tire o papel da frente da câmera e coloque-o de volta para ver a transição se repetir.
      </li>
    </ol>
    <hr />
    <h3>Desafio Prático</h3>
    <ol>
      <li>
        Além do efeito de transparência (opacidade), faça o personagem se erguer fisicamente da mesa
        ao ser encontrado pela câmera.
      </li>
      <li>
        <strong>Dica:</strong> Modifique a escuta de <code v-pre>markerFound</code> para adicionar
        também uma animação de movimento vertical (fade-in + movimento de subida).
      </li>
      <li>
        Você pode fazer isso injetando uma nova animação chamada
        <code v-pre>animation__subir</code> no evento <code v-pre>markerFound</code> que varie a
        propriedade <code v-pre>position</code> de <code v-pre>&quot;0 0 0&quot;</code> (deitado na
        mesa) para <code v-pre>&quot;0 0.5 0&quot;</code> (sua altura oficial de apoio em pé).
        Lembra de remover esse atributo no <code v-pre>markerLost</code> também!
      </li>
    </ol>
  </ChapterLayout>
</template>

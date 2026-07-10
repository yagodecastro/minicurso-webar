<script setup lang="ts">
import DiagramFlow from '~/components/DiagramFlow.vue'
import { ref } from 'vue'
import { Position, MarkerType } from '@vue-flow/core'

const nodes1 = ref([
  { id: 'h-linear', position: { x: 0, y: -10 }, data: { label: '■ Easing Linear (Robótico ❌)' }, class: 'node-header', draggable: false, connectable: false },
  { id: 'A1', position: { x: 0, y: 20 }, data: { label: 'Velocidade Constante' }, sourcePosition: Position.Bottom, class: 'node-error' },
  { id: 'B1', position: { x: 0, y: 120 }, data: { label: 'Início brusco e fim abrupto' }, targetPosition: Position.Top, class: 'node-light-error node-wide' },
  { id: 'h-organico', position: { x: 400, y: -10 }, data: { label: '■ Easing easeInOutSine (Orgânico ✔)' }, class: 'node-header', draggable: false, connectable: false },
  { id: 'A2', position: { x: 400, y: 20 }, data: { label: 'Velocidade Variável' }, sourcePosition: Position.Bottom, class: 'node-success' },
  { id: 'B2', position: { x: 400, y: 120 }, data: { label: 'Começa devagar, acelera no meio, amortece no fim' }, targetPosition: Position.Top, class: 'node-light-success node-wide' },
])

const edges1 = ref([
  { id: 'eA1-B1', source: 'A1', target: 'B1', markerEnd: MarkerType.ArrowClosed },
  { id: 'eA2-B2', source: 'A2', target: 'B2', markerEnd: MarkerType.ArrowClosed },
])

const nodes2 = ref([
  { id: 'h-ciclo', position: { x: -10, y: -10 }, data: { label: '■ Ciclo de Repetição (dir)' }, class: 'node-header', draggable: false, connectable: false },
  { id: 'dir_normal', position: { x: 0, y: 30 }, data: { label: 'dir: normal' }, sourcePosition: Position.Right, class: 'node-default' },
  { id: 'to_normal', position: { x: 280, y: 30 }, data: { label: 'Escala: 1.2' }, sourcePosition: Position.Right, targetPosition: Position.Left, class: 'node-default' },
  { id: 'loop_normal', position: { x: 560, y: 30 }, data: { label: 'Reseta instantâneo para 1.0' }, targetPosition: Position.Left, class: 'node-light-error' },
  { id: 'dir_alt', position: { x: 0, y: 140 }, data: { label: 'dir: alternate' }, sourcePosition: Position.Right, class: 'node-default' },
  { id: 'to_alt', position: { x: 280, y: 140 }, data: { label: 'Escala: 1.2' }, sourcePosition: Position.Right, targetPosition: Position.Left, class: 'node-default' },
  { id: 'loop_alt', position: { x: 560, y: 140 }, data: { label: 'Murcha gradualmente até 1.0' }, targetPosition: Position.Left, class: 'node-light-success' },
])

const edges2 = ref([
  { id: 'edn-ton', source: 'dir_normal', target: 'to_normal', label: 'Crescimento', markerEnd: MarkerType.ArrowClosed },
  { id: 'eton-ln', source: 'to_normal', target: 'loop_normal', label: 'Corte Seco ❌', markerEnd: MarkerType.ArrowClosed },
  { id: 'eda-toa', source: 'dir_alt', target: 'to_alt', label: 'Crescimento', markerEnd: MarkerType.ArrowClosed },
  { id: 'etoa-la', source: 'to_alt', target: 'loop_alt', label: 'Suave ✔', markerEnd: MarkerType.ArrowClosed },
])
</script>

<template>
  <ChapterLayout>
    <h2>Animação Nativa (Pulsação)</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Aprender a dar dinamismo e movimento aos seus elementos
      gráficos virtuais, dominar o uso do componente nativo de animação do A-Frame e aplicar curvas
      de aceleração orgânicas para criar efeitos visuais premium de pulsação sem precisar de scripts
      em JavaScript.
    </p>
    <hr />
    <h3>Conceitos Fundamentais</h3>
    <h4>
      <strong>1. O Componente <code v-pre>animation</code></strong>
    </h4>
    <p>
      Cenas estáticas podem parecer sem vida. Na Realidade Aumentada, pequenas movimentações sutis
      (como um leve flutuar ou pulsar) ajudam a prender a atenção do usuário e dão a sensação de que
      o holograma é interativo e dinâmico.
    </p>
    <p>
      O A-Frame possui um sistema de <strong>animações nativas</strong> robusto configurado
      diretamente através de atributos HTML. O motor gráfico encarrega-se de interpolar os valores
      físicos (posição, escala ou rotação) ao longo do tempo de forma suave.
    </p>
    <h4>2. Anatomia dos Atributos de Animação</h4>
    <p>
      Para configurar uma animação, passamos uma lista de parâmetros dentro do atributo
      <code v-pre>animation=&quot;&quot;</code> separados por ponto e vírgula:
    </p>
    <ul>
      <li>
        <strong><code v-pre>property</code>:</strong> Define qual propriedade do objeto será
        alterada. Os valores comuns são <code v-pre>position</code>, <code v-pre>rotation</code>,
        <code v-pre>scale</code> ou <code v-pre>material.opacity</code>.
      </li>
      <li>
        <strong><code v-pre>to</code>:</strong> O valor final que o objeto deve atingir. Se a escala
        inicial do objeto é <code v-pre>1 1 1</code> e você define
        <code v-pre>to: 1.2 1.2 1.2</code>, o objeto crescerá 20% no final da animação.
      </li>
      <li>
        <strong><code v-pre>dur</code> (Duração):</strong> O tempo de duração de um ciclo completo
        da animação, medido em milissegundos. Por exemplo, <code v-pre>1000</code> equivale a 1
        segundo.
      </li>
      <li>
        <strong><code v-pre>dir</code> (Direção):</strong> Controla o fluxo da repetição. Se
        definirmos como <code v-pre>alternate</code>, o objeto fará o caminho de volta suavemente
        (como um balão enchendo e esvaziando). Se usarmos <code v-pre>normal</code>, ele voltará
        bruscamente ao estado inicial a cada ciclo concluído.
      </li>
      <li>
        <strong><code v-pre>loop</code>:</strong> Define se o movimento é contínuo. Usamos
        <code v-pre>true</code> para rodar infinitamente.
      </li>
      <li>
        <strong><code v-pre>easing</code>:</strong> Controla a aceleração física do movimento.
        Movimentos com curvas lineares parecem robóticos e artificiais. Curvas como
        <strong><code v-pre>easeInOutSine</code></strong> ou <code v-pre>easeInOutQuad</code> fazem
        com que o objeto comece a se mover devagar, acelere no meio e desacelere no final, simulando
        a física real da gravidade ou da respiração.
      </li>
    </ul>
    <ClientOnly>
      <DiagramFlow :nodes="nodes1" :edges="edges1" />
    </ClientOnly>
    <ClientOnly>
      <DiagramFlow :nodes="nodes2" :edges="edges2" />
    </ClientOnly>
    <hr />
    <h3>Mão na Massa: Passo a Passo</h3>
    <h4>Passo 1: Adicionando a Pulsação no Código</h4>
    <p>
      Vamos configurar nossa ilustração para pulsar suavemente, simulando o efeito de respiração de
      um personagem de jogo.
    </p>
    <ol>
      <li>No VS Code, abra o arquivo <code v-pre>index.html</code>.</li>
      <li>
        Localize a tag <code v-pre>&lt;a-image&gt;</code> e adicione o atributo
        <code v-pre>animation</code>:
      </li>
    </ol>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;a-marker type=&quot;pattern&quot; url=&quot;assets/meu-marcador.patt&quot;&gt;
  &lt;!-- Adiciona a pulsação de escala nativa ao personagem --&gt;
  &lt;a-image
    src=&quot;#personagem-png&quot;
    position=&quot;0 0.5 0&quot;
    width=&quot;1&quot;
    height=&quot;1&quot;
    rotation=&quot;0 0 0&quot;
    animation=&quot;property: scale; to: 1.2 1.2 1.2; dir: alternate; loop: true; dur: 800; easing: easeInOutSine&quot;
  &gt;
  &lt;/a-image&gt;
&lt;/a-marker&gt;
</code></pre>
    <h4>Passo 2: Analisando as Configurações da Animação</h4>
    <p>No código acima:</p>
    <ul>
      <li>A escala crescerá até <code v-pre>1.2 1.2 1.2</code> (<code v-pre>to</code>).</li>
      <li>O ciclo de crescimento durará 800 milissegundos (<code v-pre>dur</code>).</li>
      <li>
        A direção alternada (<code v-pre>dir: alternate</code>) fará o personagem encolher de volta
        para a escala padrão de <code v-pre>1 1 1</code> também em 800ms.
      </li>
      <li>
        Isso se repetirá infinitamente (<code v-pre>loop: true</code>) de forma orgânica (<code
          v-pre
          >easing: easeInOutSine</code
        >).
      </li>
    </ul>
    <h4>Passo 3: Testando a Experiência</h4>
    <ol>
      <li>Salve o arquivo.</li>
      <li>
        Abra a página com o <strong>Live Server</strong> (clique no botão
        <strong>Go Live</strong> no canto inferior direito) e aponte a webcam para o marcador
        personalizado.
      </li>
      <li>
        Observe como o personagem cresce e diminui suavemente acima da folha de papel física,
        trazendo dinamismo instantâneo para a Realidade Aumentada!
      </li>
    </ol>
    <hr />
    <h3>Desafio Prático</h3>
    <ol>
      <li>
        Altere o parâmetro da animação para fazer o personagem girar continuamente em vez de pulsar.
      </li>
      <li>
        <strong>Dica:</strong> Mude o atributo <code v-pre>property</code> para
        <code v-pre>rotation</code>. Defina o <code v-pre>to</code> para
        <code v-pre>&quot;0 360 0&quot;</code> (uma volta de 360 graus completa sobre o eixo
        vertical Y).
      </li>
      <li>
        Mude a direção para <code v-pre>dir: normal</code> (para que ele continue girando sempre no
        mesmo sentido) e ajuste o <code v-pre>easing</code> para <code v-pre>linear</code> (para
        manter uma velocidade constante sem desacelerações).
      </li>
      <li>
        Defina uma duração de <code v-pre>5000</code> (5 segundos) para o giro não ficar rápido
        demais. Salve e teste o resultado!
      </li>
    </ol>
  </ChapterLayout>
</template>

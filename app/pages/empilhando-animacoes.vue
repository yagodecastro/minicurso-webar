<script setup lang="ts">
import DiagramFlow from '~/components/DiagramFlow.vue'
import { ref } from 'vue'
import { Position, MarkerType } from '@vue-flow/core'

const nodes = ref([
  { id: 'A', position: { x: 60, y: 0 }, data: { label: 'Animação 1: Pulsar Escala' }, sourcePosition: Position.Bottom, class: 'node-default' },
  { id: 'B', position: { x: 440, y: 0 }, data: { label: 'Animação 2: Flutuar Y' }, sourcePosition: Position.Bottom, class: 'node-default' },
  { id: 'C', position: { x: 250, y: 120 }, data: { label: 'Movimento Final Combinado' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-indigo' },
  { id: 'D', position: { x: 250, y: 240 }, data: { label: 'Balanço orgânico sem repetição mecânica ✔' }, targetPosition: Position.Top, class: 'node-success node-wide' },
])

const edges = ref([
  { id: 'eA-C', source: 'A', target: 'C', label: 'Ciclo de 1000ms', markerEnd: MarkerType.ArrowClosed },
  { id: 'eB-C', source: 'B', target: 'C', label: 'Ciclo de 1800ms', markerEnd: MarkerType.ArrowClosed },
  { id: 'eC-D', source: 'C', target: 'D', markerEnd: MarkerType.ArrowClosed },
])
</script>

<template>
  <ChapterLayout>
    <h2>Empilhando Animações (Flutuando)</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Compreender as limitações de sintaxe de atributos
      duplicados no HTML padrão, aprender a contornar essa regra utilizando o sistema de namespaces
      (duplo underscore <code v-pre>__</code>) do A-Frame e empilhar múltiplos efeitos físicos
      independentes (como pulsar e flutuar verticalmente) em uma única imagem holográfica.
    </p>
    <hr />
    <h3>Conceitos Fundamentais</h3>
    <h4>1. A Limitação de Atributos no HTML</h4>
    <p>
      No desenvolvimento web tradicional, você não pode duplicar um atributo dentro da mesma tag
      HTML. Por exemplo, escrever o código abaixo é inválido:
    </p>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;!-- CÓDIGO INCORRETO (O navegador ignorará a segunda animação) --&gt;
&lt;a-image animation=&quot;property: scale; ...&quot; animation=&quot;property: position; ...&quot;&gt;&lt;/a-image&gt;
</code></pre>
    <p>
      Se fôssemos limitados a essa regra, só seria possível aplicar uma única animação por vez em
      cada elemento tridimensional.
    </p>
    <h4>
      <strong>2. O Recurso de Namespaces do A-Frame (<code v-pre>__</code>)</strong>
    </h4>
    <p>
      Para resolver essa limitação, os criadores do A-Frame desenvolveram uma sintaxe inteligente
      baseada em <strong>duplos underscores (<code v-pre>__</code>)</strong>.
    </p>
    <p>
      Você pode criar quantas animações desejar em um mesmo elemento, bastando adicionar o caractere
      <code v-pre>__</code> seguido de um nome personalizado que você inventar. O motor gráfico do
      A-Frame identificará todas elas como componentes individuais rodando em paralelo:
    </p>
    <pre v-pre><code v-pre class="language-html">&lt;!-- CÓDIGO CORRETO --&gt;
&lt;a-image animation__pulsar=&quot;...&quot; animation__flutuar=&quot;...&quot; animation__girar=&quot;...&quot;&gt;&lt;/a-image&gt;
</code></pre>
    <pre v-pre><code v-pre>Estrutura do Namespace no compilador do A-Frame:
Tag HTML ──► Lendo animation__pulsar ──► Instancia Componente Escala (Suave)
 ──► Lendo animation__flutuar ──► Instancia Componente Posição (Suave)
</code></pre>
    <h4>3. Criando o Efeito de Flutuabilidade Natural</h4>
    <p>
      Para criar um efeito de holograma flutuante realista (semelhante a um fantasma ou objeto
      magnético), combinamos dois movimentos com velocidades e durações diferentes:
    </p>
    <ol>
      <li>
        <strong>Pulsação de Escala (<code v-pre>scale</code>):</strong> O objeto expande e contrai
        levemente no tamanho a cada 1 segundo (duração de <code v-pre>1000</code>ms).
      </li>
      <li>
        <strong>Flutuação Vertical (<code v-pre>position</code> no eixo Y):</strong> O objeto sobe e
        desce lentamente no ar a cada 1,8 segundos (duração de <code v-pre>1800</code>ms).
      </li>
    </ol>
    <p>
      Como as durações são diferentes, os movimentos não se completam no mesmo instante, o que
      quebra a repetição robótica e gera um balanço muito mais suave e natural aos olhos do usuário.
    </p>
    <ClientOnly>
      <DiagramFlow :nodes="nodes" :edges="edges" />
    </ClientOnly>
    <hr />
    <h3>Mão na Massa: Passo a Passo</h3>
    <h4>Passo 1: Empilhando as Animações no Código</h4>
    <ol>
      <li>No VS Code, abra o arquivo <code v-pre>index.html</code>.</li>
      <li>Localize a tag <code v-pre>&lt;a-image&gt;</code> dentro de seu marcador.</li>
      <li>
        Substitua o atributo <code v-pre>animation</code> simples por duas animações separadas
        usando namespaces:
      </li>
    </ol>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;a-marker type=&quot;pattern&quot; url=&quot;assets/meu-marcador.patt&quot;&gt;
  &lt;!-- Aplica dois movimentos paralelos: pulsar no tamanho e flutuar na altura Y --&gt;
  &lt;a-image
    src=&quot;#personagem-png&quot;
    position=&quot;0 0.5 0&quot;
    width=&quot;1&quot;
    height=&quot;1&quot;
    rotation=&quot;0 0 0&quot;
    animation__pulsar=&quot;property: scale; to: 1.1 1.1 1.1; dir: alternate; loop: true; dur: 1000; easing: easeInOutSine&quot;
    animation__flutuar=&quot;property: position; to: 0 0.7 0; dir: alternate; loop: true; dur: 1800; easing: easeInOutQuad&quot;
  &gt;
  &lt;/a-image&gt;
&lt;/a-marker&gt;
</code></pre>
    <h4>Passo 2: Entendendo a Variação de Posição</h4>
    <ul>
      <li>
        Em <code v-pre>animation__flutuar</code>, definimos <code v-pre>property: position</code>.
      </li>
      <li>
        O valor de destino <code v-pre>to: 0 0.7 0</code> diz ao motor gráfico para deslocar o
        objeto verticalmente até a altura <code v-pre>Y: 0.7</code>.
      </li>
      <li>
        Como a posição inicial definida no atributo principal era
        <code v-pre>position=&quot;0 0.5 0&quot;</code>, o personagem ficará subindo e descendo
        continuamente na faixa entre <strong>0,5 e 0,7 metros</strong> acima da mesa real.
      </li>
    </ul>
    <h4>Passo 3: Testando a Sincronização</h4>
    <ol>
      <li>
        Salve o arquivo e abra-o com o <strong>Live Server</strong> (clique no botão
        <strong>Go Live</strong> no canto inferior direito do VS Code).
      </li>
      <li>Aponte a webcam para o marcador físico e observe.</li>
      <li>
        Veja como o objeto flutua verticalmente enquanto pulsa no tamanho de forma extremamente
        suave e premium!
      </li>
    </ol>
    <hr />
    <h3>Desafio Prático</h3>
    <ol>
      <li>
        Adicione uma terceira animação simultânea chamada
        <code v-pre>animation__rotacionar</code> na sua tag <code v-pre>&lt;a-image&gt;</code>.
      </li>
      <li>
        Configure-a para girar o personagem suavemente de um lado para o outro de forma alternada
        (efeito de balanço).
      </li>
      <li>
        <strong>Dica:</strong> Use <code v-pre>property: rotation</code>, defina o destino
        <code v-pre>to: 0 20 0</code> (20 graus no eixo Y) e configure uma duração mais lenta (ex:
        <code v-pre>dur: 3000</code>), com <code v-pre>dir: alternate</code> e
        <code v-pre>loop: true</code>.
      </li>
      <li>
        Salve e analise como a combinação de flutuação, pulsação e rotação suave cria um holograma
        muito mais vivo no mundo real.
      </li>
    </ol>
  </ChapterLayout>
</template>

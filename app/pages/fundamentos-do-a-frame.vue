<script setup lang="ts">
import DiagramFlow from '~/components/DiagramFlow.vue'
import { ref } from 'vue'
import { Position, MarkerType } from '@vue-flow/core'

const nodes = ref([
  { id: 'Origem', position: { x: 250, y: 150 }, data: { label: 'Origem do Espaço 3D (0, 0, 0)' }, sourcePosition: Position.Right, class: 'node-indigo node-wide' },
  { id: 'X_Pos', position: { x: 580, y: 25 }, data: { label: 'Direita (Valores Positivos)' }, targetPosition: Position.Left, class: 'node-error node-wide' },
  { id: 'X_Neg', position: { x: -80, y: 25 }, data: { label: 'Esquerda (Valores Negativos)' }, targetPosition: Position.Right, class: 'node-light-error node-wide' },
  { id: 'Y_Pos', position: { x: 580, y: 150 }, data: { label: 'Cima (Valores Positivos)' }, targetPosition: Position.Left, class: 'node-success node-wide' },
  { id: 'Y_Neg', position: { x: -80, y: 150 }, data: { label: 'Baixo (Valores Negativos)' }, targetPosition: Position.Right, class: 'node-light-success node-wide' },
  { id: 'Z_Pos', position: { x: 580, y: 275 }, data: { label: 'Perto / Atrás (Valores Positivos)' }, targetPosition: Position.Left, class: 'node-amber node-wide' },
  { id: 'Z_Neg', position: { x: -80, y: 275 }, data: { label: 'Longe / Frente (Valores Negativos)' }, targetPosition: Position.Right, class: 'node-light-amber node-wide' },
])

const edges = ref([
  { id: 'e-X+', source: 'Origem', target: 'X_Pos', label: 'Eixo X +', markerEnd: MarkerType.ArrowClosed },
  { id: 'e-X-', source: 'Origem', target: 'X_Neg', label: 'Eixo X -', markerEnd: MarkerType.ArrowClosed },
  { id: 'e-Y+', source: 'Origem', target: 'Y_Pos', label: 'Eixo Y +', markerEnd: MarkerType.ArrowClosed },
  { id: 'e-Y-', source: 'Origem', target: 'Y_Neg', label: 'Eixo Y -', markerEnd: MarkerType.ArrowClosed },
  { id: 'e-Z+', source: 'Origem', target: 'Z_Pos', label: 'Eixo Z +', markerEnd: MarkerType.ArrowClosed },
  { id: 'e-Z-', source: 'Origem', target: 'Z_Neg', label: 'Eixo Z -', markerEnd: MarkerType.ArrowClosed },
])
</script>

<template>
  <ChapterLayout>
    <h2>Fundamentos do A-Frame (Criando Mundos Virtuais 3D)</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Compreender a mecânica do framework A-Frame, aprender a
      criar uma cena tridimensional puramente virtual e manipular formas geométricas básicas
      (primitivos) controlando suas coordenadas cartesianas, dimensões e cores.
    </p>
    <hr />
    <h3>Conceitos Fundamentais</h3>
    <h4>1. O que é o A-Frame?</h4>
    <p>
      O <strong><a href="https://aframe.io/">A-Frame</a></strong> é uma biblioteca de código aberto
      desenvolvida pela equipe da Mozilla para criar mundos tridimensionais (3D) e de Realidade
      Virtual (VR) rodando diretamente no navegador de internet.
    </p>
    <p>
      A grande facilidade do A-Frame é que ele usa a sintaxe amigável do HTML. Em vez de escrever
      códigos de matemática complexa para gerar luzes, texturas e polígonos 3D (usando linguagens
      como WebGL), você apenas escreve tags simples, como <code v-pre>&lt;a-box&gt;</code> para
      desenhar um cubo ou <code v-pre>&lt;a-sphere&gt;</code> para desenhar uma esfera.
    </p>
    <h4>2. Primitivos do A-Frame (Formas Geométricas)</h4>
    <p>
      O A-Frame disponibiliza elementos 3D básicos prontos chamados de <strong>primitivos</strong>.
      Alguns dos mais utilizados são:
    </p>
    <ul>
      <li><code v-pre>&lt;a-box&gt;</code>: Renderiza um cubo ou paralelepípedo.</li>
      <li><code v-pre>&lt;a-sphere&gt;</code>: Cria uma esfera (uma bola).</li>
      <li>
        <code v-pre>&lt;a-cylinder&gt;</code>: Desenha um cilindro (pode ser usado para criar
        colunas ou tubos).
      </li>
      <li>
        <code v-pre>&lt;a-plane&gt;</code>: Cria uma superfície plana 2D flutuando no espaço 3D
        (ótimo para representar o chão, paredes ou telas de projeção).
      </li>
      <li>
        <code v-pre>&lt;a-sky&gt;</code>: Envolve toda a cena em uma esfera gigante interna,
        permitindo definir uma cor de fundo ou projetar imagens de 360 graus.
      </li>
    </ul>
    <h4>3. O Espaço 3D e Coordenadas (X, Y, Z)</h4>
    <p>
      Para posicionar elementos no espaço tridimensional virtual, usamos três valores numéricos
      separados por espaços no atributo <code v-pre>position=&quot;X Y Z&quot;</code>:
    </p>
    <ul>
      <li>
        <strong>Eixo X (Horizontal/Largura):</strong> Valores positivos movem o objeto para a
        <strong>direita</strong> e negativos para a <strong>esquerda</strong>. O valor
        <code v-pre>0</code> é o centro.
      </li>
      <li>
        <strong>Eixo Y (Vertical/Altura):</strong> Valores positivos movem o objeto para
        <strong>cima</strong> e negativos para <strong>baixo</strong>.
      </li>
      <li>
        <strong>Eixo Z (Profundidade):</strong> Valores negativos afastam o objeto para o
        <strong>fundo</strong> da cena (para longe de onde a câmera inicia). Valores positivos
        trazem o objeto para mais <strong>perto</strong> de nós.
      </li>
    </ul>
    <ClientOnly>
      <DiagramFlow :nodes="nodes" :edges="edges" />
    </ClientOnly>
    <pre v-pre><code v-pre class="language-markdown">Exemplo: position=&quot;-1 0.5 -3&quot;

- Moverá o elemento 1 metro para a esquerda (X: -1).
- Subirá o elemento 0,5 metros de altura (Y: 0.5).
- Afastará o elemento 3 metros para o fundo da tela (Z: -3).
</code></pre>
    <h4><strong>4. Rotação e Escala</strong> e</h4>
    <ul>
      <li>
        <strong>Rotation (<code v-pre>rotation=&quot;X Y Z&quot;</code>):</strong> Define os graus
        de rotação do objeto ao redor de cada eixo físico (de <code v-pre>0</code> a
        <code v-pre>360</code> graus).
      </li>
      <li>
        <strong>Scale (<code v-pre>scale=&quot;X Y Z&quot;</code>):</strong> Multiplica o tamanho do
        objeto nos eixos X, Y e Z. O valor padrão de escala de qualquer objeto é
        <code v-pre>1 1 1</code>. Se você colocar <code v-pre>2 2 2</code>, o objeto dobrará de
        tamanho em todas as direções.
      </li>
    </ul>
    <hr />
    <h3>Mão na Massa: Passo a Passo</h3>
    <h4>Passo 1: Criando a Estrutura HTML do Mundo Virtual</h4>
    <ol>
      <li>
        No VS Code, na pasta do seu projeto, crie um novo arquivo chamado
        <code v-pre>cena-virtual.html</code>.
      </li>
      <li>
        Insira o esqueleto padrão do HTML e importe
        <strong>apenas a biblioteca do A-Frame</strong> no <code v-pre>&lt;head&gt;</code> (não
        precisaremos do AR.js nem da webcam por enquanto):
      </li>
    </ol>
    <pre v-pre><code v-pre class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;pt-BR&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot; /&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;
    &lt;title&gt;Minha Primeira Cena 3D Virtual&lt;/title&gt;
    &lt;!-- Importando apenas o motor 3D A-Frame --&gt;
    &lt;script src=&quot;https://aframe.io/releases/1.3.0/aframe.min.js&quot;&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body style=&quot;margin: 0; overflow: hidden;&quot;&gt;&lt;/body&gt;
&lt;/html&gt;
</code></pre>
    <h4>Passo 2: Declarando a Cena e o Céu</h4>
    <ol>
      <li>
        Dentro da tag <code v-pre>&lt;body&gt;</code>, crie o container da cena (<code v-pre
          >&lt;a-scene&gt;</code
        >).
      </li>
      <li>
        Adicione a tag do céu (<code v-pre>&lt;a-sky&gt;</code>) com uma cor suave para termos um
        plano de fundo:
      </li>
    </ol>
    <pre v-pre><code v-pre class="language-html">&lt;a-scene&gt;
  &lt;!-- Fundo de céu cinza claro virtual --&gt;
  &lt;a-sky color=&quot;#ECECEC&quot;&gt;&lt;/a-sky&gt;
&lt;/a-scene&gt;
</code></pre>
    <h4>Passo 3: Adicionando Cubos e Esferas</h4>
    <p>
      Vamos começar a posicionar nossos primitivos 3D. Lembre-se de colocar coordenadas no eixo Z
      com valores negativos (como <code v-pre>-3</code> ou <code v-pre>-4</code>) para que eles
      fiquem posicionados na frente da câmera inicial.
    </p>
    <ol>
      <li>Insira os seguintes elementos dentro de <code v-pre>&lt;a-scene&gt;</code>:</li>
    </ol>
    <pre v-pre><code v-pre class="language-html">&lt;!-- Cubo vermelho à esquerda --&gt;
&lt;a-box position=&quot;-1 0.5 -3&quot; rotation=&quot;0 45 0&quot; color=&quot;#4CC3D9&quot;&gt;&lt;/a-box&gt;

&lt;!-- Esfera amarela ao centro --&gt;
&lt;a-sphere position=&quot;0 1.25 -5&quot; radius=&quot;1.25&quot; color=&quot;#EF2D5E&quot;&gt;&lt;/a-sphere&gt;

&lt;!-- Cilindro azul à direita --&gt;
&lt;a-cylinder position=&quot;1 0.75 -3&quot; radius=&quot;0.5&quot; height=&quot;1.5&quot; color=&quot;#FFC65D&quot;&gt;&lt;/a-cylinder&gt;
</code></pre>
    <ul>
      <li><code v-pre>radius</code>: Define o raio da esfera ou do cilindro.</li>
      <li><code v-pre>height</code>: Controla a altura do cilindro.</li>
      <li>
        <code v-pre>rotation=&quot;0 45 0&quot;</code>: Rotaciona o cubo em 45 graus ao redor do
        próprio eixo vertical para podermos ver suas quinas tridimensionais.
      </li>
    </ul>
    <h4>Passo 4: Criando o Chão (Plano)</h4>
    <p>
      Para os objetos não parecerem flutuar no vazio absoluto, vamos criar uma superfície de piso.
    </p>
    <ol>
      <li>Adicione a tag <code v-pre>&lt;a-plane&gt;</code> deitada na base da cena:</li>
    </ol>
    <pre v-pre><code v-pre class="language-html">&lt;!-- Chão verde deitado na base --&gt;
&lt;a-plane position=&quot;0 0 -4&quot; rotation=&quot;-90 0 0&quot; width=&quot;4&quot; height=&quot;4&quot; color=&quot;#7BC8A4&quot;&gt;&lt;/a-plane&gt;
</code></pre>
    <blockquote>
      <p>
        [!NOTE] Por padrão, a tag <code v-pre>&lt;a-plane&gt;</code> é criada em pé como uma folha
        de papel na vertical. Adicionamos <code v-pre>rotation=&quot;-90 0 0&quot;</code> para
        deitá-la 90 graus na horizontal para servir como um piso real para os objetos.
      </p>
    </blockquote>
    <h4>Passo 5: Visualizando o Mundo 3D</h4>
    <ol>
      <li>Salve o arquivo.</li>
      <li>
        Abra o arquivo <code v-pre>cena-virtual.html</code> com o
        <strong>Live Server</strong> (clique no botão <strong>Go Live</strong> no canto inferior
        direito do VS Code ou clique com o botão direito sobre o código e selecione
        <strong>Open with Live Server</strong>).
      </li>
      <li>Você verá seu cenário virtual completo!</li>
      <li>
        <strong>Interação:</strong> Clique com o mouse dentro da tela do navegador e arraste para
        olhar ao redor. Use as teclas <code v-pre>W</code>, <code v-pre>A</code>,
        <code v-pre>S</code> e <code v-pre>D</code> do teclado para caminhar pela cena como se
        estivesse jogando um jogo em primeira pessoa!
      </li>
    </ol>
    <hr />
    <h3>Desafio Prático</h3>
    <ol>
      <li>
        Mude o valor de <code v-pre>position</code> da esfera amarela (<code v-pre
          >&lt;a-sphere&gt;</code
        >) para que ela fique posicionada exatamente no topo do cubo azul (<code v-pre
          >&lt;a-box&gt;</code
        >).
      </li>
      <li>
        <strong>Dica:</strong> O topo do cubo está na posição <code v-pre>Y: 1.0</code> (já que a
        caixa tem 1 metro de altura padrão e seu centro está posicionado no
        <code v-pre>Y: 0.5</code>). Ajuste também os eixos X e Z para alinhar perfeitamente!
      </li>
    </ol>
  </ChapterLayout>
</template>

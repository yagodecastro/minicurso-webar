<script setup lang="ts">
import DiagramFlow from '~/components/DiagramFlow.vue'
import { ref } from 'vue'
import { Position, MarkerType } from '@vue-flow/core'

const nodes1 = ref([
  { id: 'h-jpg', position: { x: 0, y: -20 }, data: { label: '■ Renderização com JPG' }, class: 'node-header', draggable: false, connectable: false },
  { id: 'A1', position: { x: 0, y: 20 }, data: { label: 'Imagem JPG sem Canal Alfa' }, sourcePosition: Position.Bottom, class: 'node-default node-xwide' },
  { id: 'B1', position: { x: 0, y: 130 }, data: { label: 'Fundo branco opaco desenhado' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-default node-xwide' },
  { id: 'C1', position: { x: 0, y: 240 }, data: { label: 'Holograma parece papel flutuando ❌' }, targetPosition: Position.Top, class: 'node-error node-xwide' },
  { id: 'h-png', position: { x: 0, y: 340 }, data: { label: '■ Renderização com PNG' }, class: 'node-header', draggable: false, connectable: false },
  { id: 'A2', position: { x: 0, y: 380 }, data: { label: 'Imagem PNG com Canal Alfa' }, sourcePosition: Position.Bottom, class: 'node-default node-xwide' },
  { id: 'B2', position: { x: 0, y: 490 }, data: { label: 'Pixels com transparência ocultados' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-default node-xwide' },
  { id: 'C2', position: { x: 0, y: 600 }, data: { label: 'Holograma funde-se ao mundo real ✔' }, targetPosition: Position.Top, class: 'node-success node-xwide' },
])

const edges1 = ref([
  { id: 'eA1-B1', source: 'A1', target: 'B1', markerEnd: MarkerType.ArrowClosed },
  { id: 'eB1-C1', source: 'B1', target: 'C1', markerEnd: MarkerType.ArrowClosed },
  { id: 'eA2-B2', source: 'A2', target: 'B2', markerEnd: MarkerType.ArrowClosed },
  { id: 'eB2-C2', source: 'B2', target: 'C2', markerEnd: MarkerType.ArrowClosed },
])

const nodes2 = ref([
  { id: 'h-sem', position: { x: 0, y: -20 }, data: { label: '■ Sem a-assets (Engasgos ❌)' }, class: 'node-header', draggable: false, connectable: false },
  { id: 'A1', position: { x: 0, y: 20 }, data: { label: 'Câmera liga' }, sourcePosition: Position.Bottom, class: 'node-default' },
  { id: 'B1', position: { x: 0, y: 110 }, data: { label: 'Marcador lido' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-default' },
  { id: 'C1', position: { x: 0, y: 200 }, data: { label: 'Tela pisca/trava enquanto faz download' }, targetPosition: Position.Top, class: 'node-error node-xwide' },
  { id: 'h-com', position: { x: 0, y: 300 }, data: { label: '■ Com a-assets (Fluido e Otimizado ✔)' }, class: 'node-header', draggable: false, connectable: false },
  { id: 'A2', position: { x: 0, y: 340 }, data: { label: 'Aguardando download / Cache' }, sourcePosition: Position.Bottom, class: 'node-default' },
  { id: 'B2', position: { x: 0, y: 430 }, data: { label: 'Câmera liga' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-default' },
  { id: 'C2', position: { x: 0, y: 520 }, data: { label: 'Marcador lido' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-default' },
  { id: 'D2', position: { x: 0, y: 610 }, data: { label: 'Renderização instantânea' }, targetPosition: Position.Top, class: 'node-success' },
])

const edges2 = ref([
  { id: 'eA1-B1', source: 'A1', target: 'B1', markerEnd: MarkerType.ArrowClosed },
  { id: 'eB1-C1', source: 'B1', target: 'C1', markerEnd: MarkerType.ArrowClosed },
  { id: 'eA2-B2', source: 'A2', target: 'B2', markerEnd: MarkerType.ArrowClosed },
  { id: 'eB2-C2', source: 'B2', target: 'C2', markerEnd: MarkerType.ArrowClosed },
  { id: 'eC2-D2', source: 'C2', target: 'D2', markerEnd: MarkerType.ArrowClosed },
])
</script>

<template>
  <ChapterLayout>
    <h2>O Canal Alfa e as Boas Práticas (Assets)</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Compreender a importância da transparência de pixels
      (Canal Alfa) para a criação de elementos integrados de forma natural à Realidade Aumentada,
      aprender a utilizar a tag de pré-carregamento <code v-pre>&lt;a-assets&gt;</code> para
      otimizar o desempenho do aplicativo e manter seu versionamento de código atualizado no Git.
    </p>
    <hr />
    <h3>Conceitos Fundamentais</h3>
    <h4>1. O que é o Canal Alfa? (PNG vs. JPG)</h4>
    <p>
      Imagens digitais comuns contêm três canais de cores primárias: Vermelho, Verde e Azul (RGB).
      Juntos, eles geram todas as cores que vemos na tela.
    </p>
    <p>
      No entanto, formatos de imagem como o <strong>PNG</strong> contêm um quarto canal de dados
      chamado <strong>Canal Alfa</strong> (RGBA). Esse canal define a opacidade de cada pixel da
      imagem. Pixels com valor alfa zero são considerados 100% transparentes.
    </p>
    <ul>
      <li>
        <strong>Imagens JPG:</strong> Não suportam canal alfa. Se você tentar criar um recorte
        redondo, o JPG preencherá o resto da caixa retangular com uma cor sólida (geralmente branco
        ou preto). Na Realidade Aumentada, isso fica muito feio, parecendo uma folha de papel
        impressa flutuando no ar.
      </li>
      <li>
        <strong>Imagens PNG:</strong> Suportam canal alfa. Isso permite que o A-Frame recorte as
        bordas perfeitamente e exiba apenas o personagem ou logotipo flutuando fisicamente sobre a
        sua mesa real capturada pela câmera.
      </li>
    </ul>
    <ClientOnly>
      <DiagramFlow :nodes="nodes1" :edges="edges1" />
    </ClientOnly>
    <h4>
      <strong>2. O Sistema de Pré-Carregamento (<code v-pre>&lt;a-assets&gt;</code>)</strong>
    </h4>
    <p>
      Imagens grandes ou modelos 3D podem demorar alguns segundos para baixar da internet. Se você
      carregar esses arquivos diretamente nas tags tridimensionais (como
      <code v-pre>&lt;a-image src=&quot;foto-pesada.png&quot;&gt;</code>), o usuário experimentará
      travamentos ou verá os objetos surgirem na tela com atraso (piscando do nada quando o download
      terminar).
    </p>
    <p>
      Para resolver isso, usamos a tag
      <strong><code v-pre>&lt;a-assets&gt;</code></strong> (ativos/recursos) logo no topo do
      <code v-pre>&lt;a-scene&gt;</code>. Ela serve como a &quot;sala de pré-carregamento&quot; ou
      &quot;bastidores&quot; do seu código.
    </p>
    <p>
      O A-Frame pausa a exibição da tela 3D até que todas as mídias listadas dentro de
      <code v-pre>&lt;a-assets&gt;</code> tenham sido totalmente baixadas pelo navegador. Desta
      forma, quando a câmera ligar, todos os recursos visuais estarão prontos no cache local do
      computador ou celular do usuário.
    </p>
    <ClientOnly>
      <DiagramFlow :nodes="nodes2" :edges="edges2" />
    </ClientOnly>
    <h4>
      <strong>3. O que significa <code v-pre>crossorigin=&quot;anonymous&quot;</code>?</strong>
    </h4>
    <p>
      Ao carregar imagens ou ativos de outros servidores na internet, os navegadores ativam
      bloqueios de segurança contra carregamento de mídias não autorizadas (conhecido como erros de
      <strong>CORS</strong>). Adicionar o atributo
      <code v-pre>crossorigin=&quot;anonymous&quot;</code> avisa ao navegador que aquela mídia pode
      ser baixada publicamente sem violar credenciais de segurança do site.
    </p>
    <hr />
    <h3>Mão na Massa: Passo a Passo</h3>
    <h4>Passo 1: Salvando a Imagem com Fundo Transparente</h4>
    <ol>
      <li>Escolha ou crie uma imagem que tenha fundo transparente (PNG real).</li>
      <li>
        Salve-a na pasta <code v-pre>assets</code> do seu projeto com o nome
        <code v-pre>personagem.png</code>.
      </li>
    </ol>
    <h4>Passo 2: Declarando a Sala de Assets no Código</h4>
    <ol>
      <li>No VS Code, abra o arquivo <code v-pre>index.html</code>.</li>
      <li>
        Logo na primeira linha abaixo da tag <code v-pre>&lt;a-scene&gt;</code>, crie o bloco
        <code v-pre>&lt;a-assets&gt;</code>:
      </li>
    </ol>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;a-scene embedded arjs=&quot;sourceType: webcam; debugUIEnabled: false;&quot;&gt;
  &lt;!-- Sala de pré-carregamento dos arquivos --&gt;
  &lt;a-assets&gt;
    &lt;img id=&quot;personagem-png&quot; src=&quot;assets/personagem.png&quot; crossorigin=&quot;anonymous&quot; /&gt;
  &lt;/a-assets&gt;

  &lt;a-marker type=&quot;pattern&quot; url=&quot;assets/meu-marcador.patt&quot;&gt; &lt;/a-marker&gt;

  &lt;a-entity camera&gt;&lt;/a-entity&gt;
&lt;/a-scene&gt;
</code></pre>
    <ul>
      <li>
        <code v-pre>id=&quot;personagem-png&quot;</code>: Atribui um nome identificador único a essa
        mídia para podermos chamá-la em outros blocos do código de forma organizada.
      </li>
    </ul>
    <h4>Passo 3: Chamando o Ativo pelo ID</h4>
    <ol>
      <li>
        Dentro do bloco do seu <code v-pre>&lt;a-marker&gt;</code>, adicione a tag
        <code v-pre>&lt;a-image&gt;</code> e configure o atributo <code v-pre>src</code> usando o
        caractere <code v-pre>#</code> seguido pelo ID que você definiu:
      </li>
    </ol>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;a-marker type=&quot;pattern&quot; url=&quot;assets/meu-marcador.patt&quot;&gt;
  &lt;!-- Chama o ativo pré-carregado no assets usando o seletor # --&gt;
  &lt;a-image
    src=&quot;#personagem-png&quot;
    position=&quot;0 0.01 0&quot;
    rotation=&quot;-90 0 0&quot;
    width=&quot;1&quot;
    height=&quot;1&quot;
  &gt;&lt;/a-image&gt;
&lt;/a-marker&gt;
</code></pre>
    <h4>Passo 4: Versionando no Git</h4>
    <p>
      Como adicionamos novos arquivos e organizamos o código de forma profissional, tire um tempo
      para salvar seu progresso:
    </p>
    <ol>
      <li>Abra o terminal integrado no VS Code (ou use o GitHub Desktop).</li>
      <li>Registre as modificações:</li>
    </ol>
    <pre v-pre><code v-pre class="language-bash">git add .
git commit -m &quot;Adiciona assets em PNG e configura pre-carregamento&quot;
</code></pre>
    <hr />
    <h3>Desafio Prático</h3>
    <ol>
      <li>
        Tente colocar uma imagem JPG (com fundo branco comum) e a sua imagem PNG transparente lado a
        lado na mesma cena virtual para comparar o comportamento visual.
      </li>
      <li>
        <strong>Dica:</strong> Coloque a imagem JPG na posição
        <code v-pre>position=&quot;-0.6 0.01 0&quot;</code> e a PNG na posição
        <code v-pre>position=&quot;0.6 0.01 0&quot;</code>.
      </li>
      <li>
        Abra a prévia e perceba como o PNG parece fundido ao seu ambiente real, enquanto o JPG exibe
        uma moldura quadrada artificial na tela.
      </li>
    </ol>
  </ChapterLayout>
</template>

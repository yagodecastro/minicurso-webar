<script setup lang="ts">
import DiagramFlow from '~/components/DiagramFlow.vue'
import { ref } from 'vue'
import { Position, MarkerType } from '@vue-flow/core'

const nodes = ref([
  { id: 'A', position: { x: 250, y: 0 }, data: { label: 'Moldura Frontal (Z: 0.5)' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-default' },
  { id: 'B', position: { x: 250, y: 100 }, data: { label: 'Personagem Central (Z: 0.0)' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-default' },
  { id: 'C', position: { x: 250, y: 200 }, data: { label: 'Cenário de Fundo (Z: -0.5)' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-default' },
  { id: 'D', position: { x: 250, y: 300 }, data: { label: 'Usuário / Câmera' }, targetPosition: Position.Top, class: 'node-default' },
])

const edges = ref([
  { id: 'eA-D', source: 'A', target: 'D', label: 'Mais próxima', markerEnd: MarkerType.ArrowClosed },
  { id: 'eB-D', source: 'B', target: 'D', label: 'Centro', markerEnd: MarkerType.ArrowClosed },
  { id: 'eC-D', source: 'C', target: 'D', label: 'Mais afastado', markerEnd: MarkerType.ArrowClosed },
])
</script>

<template>
  <ChapterLayout>
    <h2>Desafio Final de Certificação (O Efeito Diorama)</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Consolidar todos os conhecimentos práticos e teóricos
      adquiridos ao longo desta apostila construindo um projeto completo e avançado de Realidade
      Aumentada. Você criará um <strong>Diorama 3D</strong> (efeito de profundidade e paralaxe por
      camadas) usando imagens transparentes personalizadas, animações e controle lógico por
      JavaScript, versionando o projeto final no Git e publicando-o no GitHub Pages.
    </p>
    <hr />
    <h3>O Conceito do Desafio: O Efeito Diorama</h3>
    <p>
      Um <strong>Diorama</strong> (ou teatro de sombras) é um modelo tridimensional que representa
      uma cena real ou fictícia por meio de camadas físicas sobrepostas posicionadas em
      profundidades diferentes.
    </p>
    <p>
      No desenvolvimento 3D e na Realidade Aumentada, podemos simular esse efeito de profundidade
      usando três imagens 2D transparentes (PNG) alinhadas em diferentes coordenadas do
      <strong>Eixo Z (Profundidade)</strong>:
    </p>
    <ol>
      <li>
        <strong>Camada de Fundo (Background):</strong> Fica posicionada mais ao fundo (coordenada Z
        negativa, ex: <code v-pre>Z: -0.5</code>).
      </li>
      <li>
        <strong>Camada do Personagem (Midground):</strong> Fica posicionada ao centro (coordenada
        <code v-pre>Z: 0</code>).
      </li>
      <li>
        <strong>Camada de Moldura/Obstáculos (Foreground):</strong> Fica posicionada mais perto do
        espectador (coordenada Z positiva, ex: <code v-pre>Z: 0.5</code>).
      </li>
    </ol>
    <p>
      Quando o usuário gira o marcador físico na frente da câmera, a perspectiva matemática faz com
      que a camada da frente se desloque mais rápido do que a camada do fundo. Isso gera um
      <strong>efeito de paralaxe tridimensional realista</strong>, dando a impressão de que estamos
      espiando dentro de uma caixa tridimensional física!
    </p>
    <ClientOnly>
      <DiagramFlow :nodes="nodes" :edges="edges" />
    </ClientOnly>
    <hr />
    <h3>Roteiro de Desenvolvimento: Passo a Passo</h3>
    <h4>Passo 1: Preparação das Mídias</h4>
    <ol>
      <li>Escolha ou desenhe três imagens PNG que tenham <strong>fundo transparente</strong>:</li>
    </ol>
    <ul>
      <li>
        <code v-pre>cenario-fundo.png</code> (ex: um portal de pedras, o interior de uma caverna ou
        estrelas no espaço).
      </li>
      <li><code v-pre>personagem.png</code> (ex: seu avatar, um guerreiro, um robô ou animal).</li>
      <li>
        <code v-pre>moldura-frente.png</code> (ex: arbustos, rochas ou correntes que ficarão em
        primeiro plano moldurando a cena).
      </li>
    </ul>
    <ol start="2">
      <li>Salve as três imagens na pasta <code v-pre>assets</code> do seu projeto.</li>
      <li>
        Acesse a ferramenta online
        <a href="https://arnext.org/marker-training/">AR.js Marker Training</a> e gere um novo
        marcador customizado com a sua própria marca ou logotipo. Baixe o arquivo
        <code v-pre>.patt</code> e salve na pasta <code v-pre>assets</code> como
        <code v-pre>marcador-diorama.patt</code>.
      </li>
    </ol>
    <h4>Passo 2: Configurando o HTML e Assets</h4>
    <ol>
      <li>
        No seu arquivo <code v-pre>index.html</code>, declare as três imagens transparentes dentro
        do bloco de pré-carregamento <code v-pre>&lt;a-assets&gt;</code> definindo IDs únicos e o
        atributo <code v-pre>crossorigin=&quot;anonymous&quot;</code>.
      </li>
      <li>
        Configure a tag <code v-pre>&lt;a-marker&gt;</code> para carregar o seu arquivo
        <code v-pre>marcador-diorama.patt</code>:
      </li>
    </ol>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;a-marker type=&quot;pattern&quot; url=&quot;assets/marcador-diorama.patt&quot; id=&quot;meu-marcador&quot;&gt; &lt;/a-marker&gt;
</code></pre>
    <h4>Passo 3: Construindo as Camadas 3D (O Diorama)</h4>
    <ol>
      <li>
        Dentro do bloco do seu marcador, insira as três tags
        <code v-pre>&lt;a-image&gt;</code> apontando para os IDs dos seus assets.
      </li>
      <li>
        Certifique-se de que a rotação de todas as camadas esteja como
        <code v-pre>&quot;0 0 0&quot;</code> para mantê-las em pé.
      </li>
      <li>
        Configure a profundidade de cada camada usando o eixo Z no atributo
        <code v-pre>position</code>:
      </li>
    </ol>
    <ul>
      <li>Fundo: <code v-pre>position=&quot;0 0.5 -0.5&quot;</code></li>
      <li>Meio (Personagem): <code v-pre>position=&quot;0 0.5 0&quot;</code></li>
      <li>Frente: <code v-pre>position=&quot;0 0.5 0.5&quot;</code></li>
    </ul>
    <blockquote>
      <p>
        [!IMPORTANT] Lembre-se da fórmula de correção de altura vista no Capítulo 9! Se a altura
        (<code v-pre>height</code>) das suas imagens for <code v-pre>1</code>, o posicionamento no
        eixo Y deve ser configurado como <code v-pre>0.5</code> em todas as camadas para que a base
        da cena fique colada no papel sem afundar na mesa.
      </p>
    </blockquote>
    <h4>Passo 4: Adicionando Movimento e Lógica Interativa</h4>
    <ol>
      <li>
        Insira uma animação nativa (Capítulo 10 e 11) de pulsação ou flutuação suave apenas no
        personagem central para dar mais dinamismo à cena.
      </li>
      <li>
        Adicione o atributo <code v-pre>opacity=&quot;0&quot;</code> em todas as três tags de imagem
        no HTML para que elas iniciem invisíveis.
      </li>
      <li>
        No seu bloco <code v-pre>&lt;script&gt;</code>, crie a escuta dos eventos
        <code v-pre>markerFound</code> e <code v-pre>markerLost</code> (Capítulo 12) para realizar a
        transição de esmaecimento suave das três imagens ao mesmo tempo (fade-in ao encontrar o
        marcador e fade-out ao perdê-lo de vista).
      </li>
    </ol>
    <h4>Passo 5: Versionamento e Publicação</h4>
    <ol>
      <li>
        Abra o <strong>GitHub Desktop</strong> e faça o commit das modificações finais no seu
        repositório.
      </li>
      <li>Dê o <strong>Push origin</strong> para enviar as alterações para a nuvem do GitHub.</li>
      <li>
        Acesse as configurações (<em>Settings &gt; Pages</em>) do seu repositório no GitHub e ative
        o <strong>GitHub Pages</strong> (Capítulo 13).
      </li>
      <li>
        Copie o link seguro (HTTPS) gerado, crie um QR Code gratuito e compartilhe-o para que seus
        colegas possam testar o diorama em tempo real pelos seus smartphones!
      </li>
    </ol>
    <hr />
    <h3>Critérios de Sucesso (Checklist de Validação)</h3>
    <p>Antes de dar o projeto por concluído, certifique-se de que:</p>
    <ul>
      <li>
        <input disabled="" type="checkbox" /> O aplicativo ativa a câmera do celular com sucesso
        através do link HTTPS público.
      </li>
      <li>
        <input disabled="" type="checkbox" /> Ao apontar a câmera para o seu marcador customizado, a
        cena em camadas é carregada.
      </li>
      <li>
        <input disabled="" type="checkbox" /> As três camadas de imagens PNG transparentes estão
        alinhadas no eixo Z, gerando o efeito de profundidade 3D (sem causar piscares ou texturas
        cortadas).
      </li>
      <li>
        <input disabled="" type="checkbox" /> Os hologramas surgem por meio de transições suaves de
        acendimento de opacidade controladas por JavaScript.
      </li>
      <li>
        <input disabled="" type="checkbox" /> O código-fonte final está devidamente versionado e
        salvo no seu portfólio do GitHub.
      </li>
    </ul>
  </ChapterLayout>
</template>

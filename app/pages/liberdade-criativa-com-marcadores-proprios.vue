<script setup lang="ts">
import DiagramFlow from '~/components/DiagramFlow.vue'
import { ref } from 'vue'
import { Position, MarkerType } from '@vue-flow/core'

const nodes1 = ref([
  { id: 'Start', position: { x: 400, y: 0 }, data: { label: 'Criar Marcador' }, sourcePosition: Position.Bottom, class: 'node-default' },
  { id: 'Contraste', position: { x: 400, y: 100 }, data: { label: 'Alto Contraste?' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-decision' },
  { id: 'Fail1', position: { x: 120, y: 200 }, data: { label: 'Rejeitado pelo AR.js: Instabilidade' }, targetPosition: Position.Top, class: 'node-light-error node-xwide' },
  { id: 'Simetria', position: { x: 680, y: 200 }, data: { label: 'É Assimétrico?' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-decision' },
  { id: 'Fail2', position: { x: 460, y: 310 }, data: { label: 'Rejeitado: Modelo gira sem controle' }, targetPosition: Position.Top, class: 'node-light-error node-xwide' },
  { id: 'Moldura', position: { x: 900, y: 310 }, data: { label: 'Possui Moldura Grossa?' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-decision' },
  { id: 'Fail3', position: { x: 680, y: 420 }, data: { label: 'Rejeitado: Câmera não isola o desenho' }, targetPosition: Position.Top, class: 'node-light-error node-xwide' },
  { id: 'Success', position: { x: 1100, y: 420 }, data: { label: 'Marcador Aprovado 🚀' }, targetPosition: Position.Top, class: 'node-light-success' },
])

const edges1 = ref([
  { id: 'eStart-Contraste', source: 'Start', target: 'Contraste', markerEnd: MarkerType.ArrowClosed },
  { id: 'eContraste-Fail1', source: 'Contraste', target: 'Fail1', label: 'Não ❌', markerEnd: MarkerType.ArrowClosed },
  { id: 'eContraste-Simetria', source: 'Contraste', target: 'Simetria', label: 'Sim ✔', markerEnd: MarkerType.ArrowClosed },
  { id: 'eSimetria-Fail2', source: 'Simetria', target: 'Fail2', label: 'Não ❌', markerEnd: MarkerType.ArrowClosed },
  { id: 'eSimetria-Moldura', source: 'Simetria', target: 'Moldura', label: 'Sim ✔', markerEnd: MarkerType.ArrowClosed },
  { id: 'eMoldura-Fail3', source: 'Moldura', target: 'Fail3', label: 'Não ❌', markerEnd: MarkerType.ArrowClosed },
  { id: 'eMoldura-Success', source: 'Moldura', target: 'Success', label: 'Sim ✔', markerEnd: MarkerType.ArrowClosed },
])

const nodes2 = ref([
  { id: 'Arte', position: { x: 250, y: 0 }, data: { label: 'Imagem Original PNG/JPG' }, sourcePosition: Position.Bottom, class: 'node-default' },
  { id: 'Gerador', position: { x: 250, y: 100 }, data: { label: 'AR.js Marker Training' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-default' },
  { id: 'Patt', position: { x: 80, y: 220 }, data: { label: 'Arquivo de dados .patt' }, targetPosition: Position.Top, class: 'node-blue' },
  { id: 'Img', position: { x: 420, y: 220 }, data: { label: 'Marcador com Borda Preta' }, targetPosition: Position.Top, class: 'node-success' },
  { id: 'HTML', position: { x: 80, y: 340 }, data: { label: 'Código HTML5' }, targetPosition: Position.Top, class: 'node-default' },
  { id: 'Celular', position: { x: 420, y: 340 }, data: { label: 'Câmera do Dispositivo' }, targetPosition: Position.Top, class: 'node-default' },
])

const edges2 = ref([
  { id: 'eArte-Gerador', source: 'Arte', target: 'Gerador', markerEnd: MarkerType.ArrowClosed },
  { id: 'eGerador-Patt', source: 'Gerador', target: 'Patt', label: 'Exporta Dados', markerEnd: MarkerType.ArrowClosed },
  { id: 'eGerador-Img', source: 'Gerador', target: 'Img', label: 'Exporta Visual', markerEnd: MarkerType.ArrowClosed },
  { id: 'ePatt-HTML', source: 'Patt', target: 'HTML', label: 'Importado', markerEnd: MarkerType.ArrowClosed },
  { id: 'eImg-Celular', source: 'Img', target: 'Celular', label: 'Impresso / Tela', markerEnd: MarkerType.ArrowClosed },
])
</script>

<template>
  <ChapterLayout>
    <h2>Liberdade Criativa com Marcadores Próprios</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Aprender a criar seus próprios marcadores customizados
      com logotipos ou artes exclusivas, compreender as regras de contraste e assimetria exigidas
      pelo motor de rastreamento, gerar o arquivo matemático de mapeamento
      <code v-pre>.patt</code> e configurá-lo no código HTML.
    </p>
    <hr />
    <h3>Conceitos Fundamentais</h3>
    <h4>1. Como o motor de RA &quot;enxerga&quot; imagens?</h4>
    <p>
      Diferente dos humanos, o computador não entende a beleza ou o significado de um desenho. O
      algoritmo do AR.js analisa a imagem da câmera procurando por
      <strong>pontos de quebra de contraste (quinas e bordas afiadas)</strong>.
    </p>
    <p>
      Se você usar uma imagem suave, como uma pintura em aquarela ou uma foto desfocada com cores
      muito parecidas, a câmera não encontrará quinas suficientes e o objeto virtual não aparecerá
      na tela de forma estável.
    </p>
    <h4>2. Três Diretrizes para Criar um Marcador Estável</h4>
    <p>
      Para garantir que seu marcador customizado seja lido de forma rápida e estável, sua imagem
      deve seguir estas diretrizes:
    </p>
    <ol>
      <li>
        <strong>Assimetria Obrigatória:</strong> Se você usar um desenho simétrico (como uma estrela
        de cinco pontas idênticas, um círculo perfeito ou uma cruz), o AR.js ficará confuso. Ele não
        conseguirá distinguir qual lado do marcador está para cima, para baixo, para a esquerda ou
        direita. Como resultado, seu modelo 3D ficará girando sem controle. Use sempre desenhos que
        tenham um &quot;lado de cima&quot; e um &quot;lado de baixo&quot; bem definidos (como
        letras, setas ou silhuetas complexas).
      </li>
      <li>
        <strong>Alto Contraste:</strong> Prefira desenhos em preto e branco ou cores primárias muito
        contrastantes. Formas simples e linhas sólidas funcionam muito melhor do que degradês e
        texturas suaves.
      </li>
      <li>
        <strong>Moldura de Enquadramento:</strong> O marcador precisa de uma borda preta grossa ao
        redor da imagem (ou uma borda branca sobre fundo escuro). Essa moldura serve para o
        algoritmo isolar o seu desenho do resto da mesa real, sabendo exatamente onde começa e
        termina o marcador.
      </li>
    </ol>
    <ClientOnly>
      <DiagramFlow :nodes="nodes1" :edges="edges1" />
    </ClientOnly>
    <h4>
      <strong>3. O que é o arquivo <code v-pre>.patt</code>?</strong>
    </h4>
    <p>
      O AR.js não analisa a sua imagem original (PNG/JPG) diretamente no celular para economizar
      bateria e processamento. Em vez disso, nós passamos a imagem por uma ferramenta que a converte
      em um arquivo de dados simplificado com a extensão
      <strong><code v-pre>.patt</code></strong> (<em>pattern</em> ou padrão). Este arquivo contém
      uma descrição numérica das quinas e contrastes da sua imagem, tornando a leitura do celular
      extremamente leve e rápida.
    </p>
    <ClientOnly>
      <DiagramFlow :nodes="nodes2" :edges="edges2" />
    </ClientOnly>
    <hr />
    <h3>Mão na Massa: Passo a Passo</h3>
    <h4>Passo 1: Criando a Arte do Marcador</h4>
    <ol>
      <li>
        Desenhe ou baixe uma imagem simples e assimétrica de sua escolha (como uma letra estilizada,
        uma logo geométrica simples ou uma engrenagem).
      </li>
      <li>Salve-a no formato PNG ou JPG.</li>
    </ol>
    <h4>
      <strong>Passo 2: Gerando o Marcador e o Arquivo <code v-pre>.patt</code></strong>
    </h4>
    <ol>
      <li>
        Acesse a ferramenta oficial online
        <a href="https://arnext.org/marker-training/">AR.js Marker Training</a> (ou busque por
        &quot;AR.js Marker Generator&quot; na internet).
      </li>
      <li>
        Clique no botão <strong>Upload</strong> e selecione a imagem que você preparou. A ferramenta
        colocará automaticamente a borda preta grossa padrão ao redor da sua arte.
      </li>
      <li>
        Clique em <strong>Download Marker</strong> para baixar o arquivo de dados com a extensão
        <code v-pre>.patt</code>. Renomeie-o para <code v-pre>meu-marcador.patt</code>.
      </li>
      <li>
        Clique em <strong>Download Image</strong> para baixar a imagem final do marcador (que tem a
        borda preta). Guarde essa imagem no seu celular ou imprima para apontar para a webcam mais
        tarde.
      </li>
    </ol>
    <h4>Passo 3: Importando o Marcador no Projeto</h4>
    <ol>
      <li>
        No seu VS Code, na pasta do seu projeto, crie uma subpasta chamada
        <code v-pre>assets</code> para organizar seus arquivos de mídia e dados.
      </li>
      <li>
        Mova o arquivo <code v-pre>meu-marcador.patt</code> que você baixou para dentro dessa pasta
        <code v-pre>assets</code>.
      </li>
      <li>Abra seu arquivo <code v-pre>index.html</code>.</li>
      <li>
        Altere a tag <code v-pre>&lt;a-marker&gt;</code> padrão do Hiro para carregar o seu marcador
        personalizado usando os atributos <code v-pre>type=&quot;pattern&quot;</code> e
        <code v-pre>url</code>:
      </li>
    </ol>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;a-scene embedded arjs=&quot;sourceType: webcam; debugUIEnabled: false;&quot;&gt;
  &lt;!-- Marcador Customizado apontando para o arquivo local .patt --&gt;
  &lt;a-marker type=&quot;pattern&quot; url=&quot;assets/meu-marcador.patt&quot;&gt;
    &lt;!-- Desenha o plano vermelho deitado sobre o marcador --&gt;
    &lt;a-plane position=&quot;0 0.01 0&quot; rotation=&quot;-90 0 0&quot; width=&quot;1&quot; height=&quot;1&quot; color=&quot;#EF2D5E&quot;&gt;&lt;/a-plane&gt;
  &lt;/a-marker&gt;

  &lt;a-entity camera&gt;&lt;/a-entity&gt;
&lt;/a-scene&gt;
</code></pre>
    <h4>Passo 4: Testando na Câmera</h4>
    <ol>
      <li>
        Salve o arquivo no VS Code e abra-o com o <strong>Live Server</strong> (clique no botão
        <strong>Go Live</strong> no canto inferior direito).
      </li>
      <li>
        Aponte a webcam para a imagem que você baixou no passo anterior (com a borda preta grossa).
      </li>
      <li>
        Verifique se o plano vermelho aparece estável exatamente sobre a sua arte customizada!
      </li>
    </ol>
    <hr />
    <h3>Desafio Prático</h3>
    <ol>
      <li>Crie um segundo marcador personalizado com uma arte diferente.</li>
      <li>
        Salve o arquivo <code v-pre>.patt</code> como <code v-pre>marcador-secundario.patt</code> na
        pasta <code v-pre>assets</code>.
      </li>
      <li>
        Tente adicionar as duas tags de marcador no seu código HTML ao mesmo tempo (cada uma com sua
        própria arte e planos de cores diferentes).
      </li>
      <li>
        <strong>Dica:</strong> O código aceita múltiplos marcadores ao mesmo tempo dentro do
        <code v-pre>&lt;a-scene&gt;</code>! Teste apontar as duas artes para a câmera
        simultaneamente e veja os dois planos virtuais surgirem juntos na tela.
      </li>
    </ol>
  </ChapterLayout>
</template>

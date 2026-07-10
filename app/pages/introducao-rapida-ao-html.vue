<script setup lang="ts">
import DiagramFlow from '~/components/DiagramFlow.vue'
import { ref } from 'vue'
import { Position, MarkerType } from '@vue-flow/core'

const nodes = ref([
  { id: 'HTML', position: { x: 250, y: 0 }, data: { label: 'Documento HTML (<html>)' }, sourcePosition: Position.Bottom, class: 'node-blue' },
  { id: 'HEAD', position: { x: 80, y: 130 }, data: { label: 'Cabeça (<head>)' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-gray' },
  { id: 'BODY', position: { x: 420, y: 130 }, data: { label: 'Corpo (<body>)' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-success' },
  { id: 'HEAD_CONTENT', position: { x: 80, y: 260 }, data: { label: 'Configurações Invisíveis (Metadados, Título, CSS/Scripts)' }, targetPosition: Position.Top, class: 'node-default node-xwide' },
  { id: 'BODY_CONTENT', position: { x: 420, y: 260 }, data: { label: 'Conteúdo Visível (Cabeçalhos, Parágrafos, Imagens)' }, targetPosition: Position.Top, class: 'node-default node-xwide' },
])

const edges = ref([
  { id: 'eHTML-HEAD', source: 'HTML', target: 'HEAD', markerEnd: MarkerType.ArrowClosed },
  { id: 'eHTML-BODY', source: 'HTML', target: 'BODY', markerEnd: MarkerType.ArrowClosed },
  { id: 'eHEAD-HC', source: 'HEAD', target: 'HEAD_CONTENT', markerEnd: MarkerType.ArrowClosed },
  { id: 'eBODY-BC', source: 'BODY', target: 'BODY_CONTENT', markerEnd: MarkerType.ArrowClosed },
])
</script>

<template>
  <ChapterLayout>
    <h2>Introdução Rápida ao HTML (A Fundação)</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Compreender a estrutura de uma página de internet,
      dominar o uso de tags e atributos, e construir a fundação de código em HTML necessária para
      abrigar qualquer projeto de Realidade Aumentada.
    </p>
    <hr />
    <h3>Conceitos Fundamentais</h3>
    <h4>1. O que é HTML? (A Metáfora da Construção)</h4>
    <p>Para entender o desenvolvimento web, pense na construção de uma casa:</p>
    <ul>
      <li>
        <strong>HTML (HyperText Markup Language):</strong> É a estrutura física, os tijolos, vigas e
        paredes. Ele define <em>o que</em> está na página (um título, um botão, uma imagem).
      </li>
      <li>
        <strong>CSS (Cascading Style Sheets):</strong> É o acabamento, a pintura, o design de
        interiores. Ele define <em>como</em> as coisas se parecem (cores, fontes, posicionamentos).
      </li>
      <li>
        <strong>JavaScript:</strong> É a parte elétrica, hidráulica e a automação. Ele define o
        <em>comportamento</em> da casa (o que acontece quando você aperta um interruptor).
      </li>
    </ul>
    <p>
      O HTML não é uma linguagem de programação com lógica complexa, mas sim uma
      <strong>linguagem de marcação</strong>. Nós a usamos para marcar textos e elementos indicando
      o que cada um representa para o navegador.
    </p>
    <h4>2. Anatomia de uma Tag HTML</h4>
    <p>
      O HTML funciona com base em etiquetas (chamadas de <strong>tags</strong>). Quase todos os
      elementos na tela possuem uma tag de abertura, o conteúdo interno e uma tag de fechamento:
    </p>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;h1 class=&quot;titulo-principal&quot;&gt;Olá, Mundo!&lt;/h1&gt;
</code></pre>
    <ul>
      <li>
        <code v-pre>&lt;h1&gt;</code>: Tag de abertura (indica um título de nível 1, o mais
        importante).
      </li>
      <li>
        <code v-pre>class=&quot;titulo-principal&quot;</code>: É um
        <strong>atributo</strong> (informação extra sobre a tag) e seu respectivo
        <strong>valor</strong>.
      </li>
      <li><code v-pre>Olá, Mundo!</code>: O conteúdo que será visível na tela.</li>
      <li>
        <code v-pre>&lt;/h1&gt;</code>: Tag de fechamento (possui a barra <code v-pre>/</code> antes
        do nome da tag).
      </li>
    </ul>
    <blockquote>
      <p>
        [!NOTE] Algumas tags são chamadas de &quot;autofechadas&quot; porque não envolvem blocos de
        texto. Por exemplo, a tag de imagem
        <code v-pre>&lt;img src=&quot;foto.jpg&quot;&gt;</code> ou quebra de linha
        <code v-pre>&lt;br&gt;</code>.
      </p>
    </blockquote>
    <h4>3. O Esqueleto de uma Página Web</h4>
    <p>
      Todo arquivo HTML precisa de uma estrutura mínima de códigos para ser reconhecido corretamente
      por navegadores no mundo todo. Esse esqueleto inicial é estruturado de forma hierárquica:
    </p>
    <ClientOnly>
      <DiagramFlow :nodes="nodes" :edges="edges" />
    </ClientOnly>
    <ul>
      <li>
        <code v-pre>&lt;!DOCTYPE html&gt;</code>: Avisa ao navegador que este arquivo está escrito
        na versão mais atualizada (HTML5).
      </li>
      <li>
        <code v-pre>&lt;html lang=&quot;pt-BR&quot;&gt;</code>: Envolve toda a página e indica que o
        idioma principal dela é o Português do Brasil.
      </li>
      <li>
        <code v-pre>&lt;head&gt;</code> (Cabeça): Contém configurações invisíveis para o usuário
        final, mas fundamentais para o navegador (configuração de acentos, título da aba, links de
        estilos).
      </li>
      <li>
        <code v-pre>&lt;body&gt;</code> (Corpo): Contém toda a parte visual que o usuário enxerga e
        interage no site.
      </li>
    </ul>
    <hr />
    <h3>Mão na Massa: Passo a Passo</h3>
    <h4>Passo 1: Criando a Estrutura Básica</h4>
    <ol>
      <li>No VS Code, abra a pasta do seu projeto.</li>
      <li>Certifique-se de que possui um arquivo limpo chamado <code v-pre>index.html</code>.</li>
      <li>
        Digite o caractere <code v-pre>!</code> (ponto de exclamação) na primeira linha do arquivo
        vazio e pressione <code v-pre>Enter</code> ou <code v-pre>Tab</code>. O VS Code utilizará o
        recurso <em>Emmet</em> para gerar a estrutura padrão de forma automática!
      </li>
      <li>Faça pequenos ajustes na estrutura gerada para que ela fique no formato abaixo:</li>
    </ol>
    <pre v-pre><code v-pre class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;pt-BR&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot; /&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;
    &lt;title&gt;Meu Portfólio de WebAR&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;&lt;/body&gt;
&lt;/html&gt;
</code></pre>
    <h4>Passo 2: Adicionando Conteúdo de Texto</h4>
    <p>
      Vamos rechear o nosso <code v-pre>&lt;body&gt;</code> com cabeçalhos de diferentes
      importâncias e parágrafos:
    </p>
    <ol>
      <li>Dentro da tag <code v-pre>&lt;body&gt;</code>, insira as seguintes linhas de código:</li>
    </ol>
    <pre v-pre><code v-pre class="language-html">&lt;h1&gt;Meu Portfólio WebAR&lt;/h1&gt;
&lt;h2&gt;Sobre o Projeto&lt;/h2&gt;
&lt;p&gt;
  Este site foi criado para exibir projetos tridimensionais diretamente no navegador de qualquer
  smartphone usando A-Frame e AR.js.
&lt;/p&gt;

&lt;h2&gt;Tecnologias Utilizadas&lt;/h2&gt;
</code></pre>
    <h4>Passo 3: Criando Listas e Links</h4>
    <p>
      Listas e hiperlinks (links para outros sites) ajudam a organizar a página e criar conexões:
    </p>
    <ol>
      <li>
        Logo abaixo do título <code v-pre>&lt;h2&gt;Tecnologias Utilizadas&lt;/h2&gt;</code>,
        adicione uma lista não ordenada (<code v-pre>&lt;ul&gt;</code> e
        <code v-pre>&lt;li&gt;</code>):
      </li>
    </ol>
    <pre v-pre><code v-pre class="language-html">&lt;ul&gt;
  &lt;li&gt;HTML5 para a estrutura básica.&lt;/li&gt;
  &lt;li&gt;A-Frame para o ambiente 3D.&lt;/li&gt;
  &lt;li&gt;AR.js para detecção do marcador de Realidade Aumentada.&lt;/li&gt;
&lt;/ul&gt;
</code></pre>
    <ol start="2">
      <li>
        Adicione um link externo utilizando a tag <code v-pre>&lt;a&gt;</code> com o atributo
        <code v-pre>href</code> apontando para o site oficial do A-Frame:
      </li>
    </ol>
    <pre v-pre><code v-pre class="language-html">&lt;p&gt;
  Acesse a documentação do &lt;a href=&quot;https://aframe.io&quot; target=&quot;_blank&quot;&gt;A-Frame Oficial&lt;/a&gt; para
  estudar mais.
&lt;/p&gt;
</code></pre>
    <h4>Passo 4: Visualizando os Resultados</h4>
    <ol>
      <li>Salve o arquivo (<code v-pre>Ctrl + S</code> ou <code v-pre>Cmd + S</code>).</li>
      <li>
        Abra a página com o <strong>Live Server</strong> clicando no botão
        <strong>Go Live</strong> no canto inferior direito do VS Code (ou clicando com o botão
        direito sobre o código e selecionando <strong>Open with Live Server</strong>).
      </li>
      <li>
        Veja o layout simples gerado, percebendo a diferença de tamanho automática de fontes gerada
        pelo navegador entre as tags <code v-pre>&lt;h1&gt;</code>, <code v-pre>&lt;h2&gt;</code> e
        <code v-pre>&lt;p&gt;</code>.
      </li>
    </ol>
    <hr />
    <h3>Desafio Prático</h3>
    <ol>
      <li>Adicione uma nova seção à sua página HTML abaixo do link do A-Frame.</li>
      <li>Crie um subtítulo <code v-pre>&lt;h2&gt;Meus Contatos&lt;/h2&gt;</code>.</li>
      <li>
        Adicione um parágrafo que contenha um link direto para o seu perfil do GitHub (ou outra rede
        social de sua preferência), configurando-o para abrir em uma nova aba (<code v-pre
          >target=&quot;_blank&quot;</code
        >).
      </li>
      <li>
        Insira uma imagem genérica da internet usando a tag
        <code v-pre
          >&lt;img src=&quot;https://picsum.photos/300/200&quot; alt=&quot;Imagem de
          Teste&quot;&gt;</code
        >. Salve e veja o resultado renderizado!
      </li>
    </ol>
    <hr />
    <h3>💡 Quer Ir Além?</h3>
    <p>
      Se você quiser dominar por completo a estrutura do HTML5 e a estilização avançada com CSS3,
      recomendamos fortemente o
      <strong
        ><a href="https://www.youtube.com/playlist?list=PLHz_AreHm4dkZ9-atkcmcBaMZdmLHft8n"
          >Curso de HTML5 e CSS3 (Módulo 1) do Professor Gustavo Guanabara</a
        ></strong
      >. Ele oferece uma base teórica e prática fantástica e totalmente gratuita para quem quer
      construir páginas web profissionais!
    </p>
  </ChapterLayout>
</template>

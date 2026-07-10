<script setup lang="ts">
import DiagramFlow from '~/components/DiagramFlow.vue'
import { ref } from 'vue'
import { Position, MarkerType } from '@vue-flow/core'

const nodes = ref([
  { id: 'h-errado', position: { x: 0, y: -10 }, data: { label: '■ Errado' }, class: 'node-header', draggable: false, connectable: false },
  { id: 'A', position: { x: 0, y: 30 }, data: { label: 'Dois cliques no index.html' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-error' },
  { id: 'B', position: { x: 0, y: 140 }, data: { label: 'Navegador bloqueia câmera por segurança' }, targetPosition: Position.Top, class: 'node-error node-xwide' },
  { id: 'h-correto', position: { x: 420, y: -10 }, data: { label: '■ Correto' }, class: 'node-header', draggable: false, connectable: false },
  { id: 'C', position: { x: 420, y: 30 }, data: { label: 'Executar Live Server' }, sourcePosition: Position.Bottom, targetPosition: Position.Top, class: 'node-success' },
  { id: 'D', position: { x: 420, y: 140 }, data: { label: 'Navegador ativa webcam normalmente' }, targetPosition: Position.Top, class: 'node-success node-xwide' },
])

const edges = ref([
  { id: 'eA-B', source: 'A', target: 'B', label: 'file:///Users/projeto/index.html', markerEnd: MarkerType.ArrowClosed },
  { id: 'eC-D', source: 'C', target: 'D', label: 'http://127.0.0.1:5500', markerEnd: MarkerType.ArrowClosed },
])
</script>

<template>
  <ChapterLayout>
    <h2>Preparando o Editor de Código (VS Code e Live Server)</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Configurar a sua principal ferramenta de trabalho
      instalando o editor de código Visual Studio Code (VS Code) e ativar a extensão Live Server
      para visualizar a renderização das suas páginas web em tempo real no seu navegador de internet
      padrão.
    </p>
    <hr />
    <h3>Conceitos Fundamentais</h3>
    <h4>1. O que é o VS Code?</h4>
    <p>
      O <strong>VS Code (Visual Studio Code)</strong> é o editor de texto e código-fonte gratuito
      mais utilizado por programadores no mundo. Desenvolvido pela Microsoft, ele facilita muito o
      trabalho de desenvolvimento porque colore as palavras-chave da linguagem (HTML, JavaScript,
      CSS), avisa quando há algum erro de digitação e permite instalar ferramentas extras que tornam
      a criação de sites muito mais rápida.
    </p>
    <h4>2. Por que usar a extensão Live Server?</h4>
    <p>
      Para visualizar uma página web em desenvolvimento, o navegador de internet precisa interpretar
      o arquivo. Contudo, para recursos avançados como Realidade Aumentada ou scripts complexos,
      abrir o arquivo diretamente no navegador com dois cliques (usando o protocolo
      <code v-pre>file://</code>) pode bloquear o funcionamento por questões de segurança do
      navegador.
    </p>
    <p>
      A extensão <strong>Live Server</strong> resolve esse problema criando um
      <strong>servidor local de desenvolvimento</strong> dentro do seu próprio computador. Ela gera
      um endereço local temporário (como <code v-pre>http://127.0.0.1:5500</code> ou similar) e abre
      a página no seu navegador de internet externo. Isso é extremamente importante para projetos de
      Realidade Aumentada (WebAR), pois o navegador integrado do VS Code (usado por extensões como o
      Live Preview) <strong>bloqueia o acesso à câmera por motivos de segurança</strong>. Usando o
      Live Server no seu navegador real, você poderá conceder a permissão da webcam normalmente.
    </p>
    <ClientOnly>
      <DiagramFlow :nodes="nodes" :edges="edges" />
    </ClientOnly>
    <hr />
    <h3>Mão na Massa: Passo a Passo</h3>
    <h4>Passo 1: Baixando e Instalando o VS Code</h4>
    <ol>
      <li>
        Acesse o site oficial do <a href="https://code.visualstudio.com/">Visual Studio Code</a>.
      </li>
      <li>
        Baixe a versão correspondente ao sistema operacional do seu computador (Windows, macOS ou
        Linux).
      </li>
      <li>
        Execute o instalador baixado e siga as etapas padrão de instalação na tela até concluir.
      </li>
    </ol>
    <h4>Passo 2: Instalando a extensão Live Server</h4>
    <ol>
      <li>Abra o Visual Studio Code.</li>
      <li>
        Na barra lateral esquerda, clique no ícone de <strong>Extensions</strong> (Extensões) –
        representado por quatro blocos quadrados (o atalho é <code v-pre>Ctrl + Shift + X</code> no
        Windows/Linux ou <code v-pre>Cmd + Shift + X</code> no Mac).
      </li>
      <li>
        Na barra de pesquisa que aparecer no topo esquerdo, digite <code v-pre>Live Server</code>.
      </li>
      <li>Procure pela extensão oficial publicada por <strong>Ritwick Dey</strong>.</li>
      <li>
        Clique no botão azul <strong>Install</strong> (Instalar). Aguarde alguns segundos até que a
        instalação seja concluída.
      </li>
    </ol>
    <h4>Passo 3: Criando a sua Pasta de Trabalho</h4>
    <ol>
      <li>
        No seu computador, crie uma pasta vazia em um local fácil (como a Área de Trabalho) chamada
        <code v-pre>meu-projeto-webar</code>.
      </li>
      <li>
        No VS Code, acesse o menu superior e clique em
        <strong>File &gt; Open Folder...</strong> (Arquivo &gt; Abrir Pasta...).
      </li>
      <li>
        Selecione a pasta <code v-pre>meu-projeto-webar</code> que você acabou de criar e clique em
        <strong>Abrir</strong>.
      </li>
      <li>
        Se o VS Code perguntar se você confia nos autores desta pasta, clique em
        <em>Yes, I trust the authors</em> (Sim, eu confio nos autores).
      </li>
    </ol>
    <h4>Passo 4: Criando seu Primeiro Arquivo e Visualizando</h4>
    <ol>
      <li>
        Na barra lateral esquerda do VS Code (Explorer), clique no ícone de
        <strong>New File</strong> (Novo Arquivo) ao lado do nome da sua pasta ou clique em
        <strong>File &gt; New File</strong>.
      </li>
      <li>
        Nomeie o arquivo como <code v-pre>index.html</code> e aperte <code v-pre>Enter</code>.
      </li>
      <li>Escreva o seguinte código básico dentro do arquivo:</li>
    </ol>
    <pre v-pre><code v-pre class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;pt-BR&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot; /&gt;
    &lt;title&gt;Teste de Ambiente&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Ambiente Configurado com Sucesso!&lt;/h1&gt;
    &lt;p&gt;O VS Code e o Live Server já estão funcionando juntos.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>
    <ol start="4">
      <li>
        Salve o arquivo pressionando <code v-pre>Ctrl + S</code> (Windows) ou
        <code v-pre>Cmd + S</code> (Mac).
      </li>
      <li>
        Com o arquivo <code v-pre>index.html</code> aberto no editor, clique na opção
        <strong>Go Live</strong> que aparece na barra de status azul no canto inferior direito do VS
        Code (ou clique com o botão direito sobre o código e selecione
        <strong>Open with Live Server</strong>).
      </li>
      <li>
        O seu navegador web padrão (Chrome, Firefox, etc.) será aberto automaticamente na página
        <code v-pre>http://127.0.0.1:5500/index.html</code> mostrando a mensagem que você escreveu!
      </li>
    </ol>
    <hr />
    <h3>Desafio Prático</h3>
    <ol>
      <li>
        Com o seu navegador aberto lado a lado com o VS Code, altere o texto dentro da tag
        <code v-pre>&lt;p&gt;</code> para:
        <code v-pre>Esta página está sendo atualizada ao vivo pelo Live Server!</code>
      </li>
      <li>Salve o arquivo (<code v-pre>Ctrl + S</code> ou <code v-pre>Cmd + S</code>).</li>
      <li>
        Verifique se o texto mudou imediatamente no seu navegador sem que você precisasse recarregar
        a página manualmente.
      </li>
    </ol>
  </ChapterLayout>
</template>

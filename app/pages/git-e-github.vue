<script setup lang="ts">
import DiagramFlow from '~/components/DiagramFlow.vue'
import { ref } from 'vue'
import { Position, MarkerType } from '@vue-flow/core'

const nodes = ref([
  {
    id: 'h-local',
    position: { x: 0, y: -30 },
    data: { label: '■ Computador Local' },
    class: 'node-header',
    draggable: false,
    connectable: false,
  },
  {
    id: 'A',
    position: { x: 0, y: 30 },
    data: { label: 'Código editado' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    class: 'node-default',
  },
  {
    id: 'B',
    position: { x: 250, y: 30 },
    data: { label: 'Git Local / Pasta monitorada' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    class: 'node-blue',
  },
  {
    id: 'h-nuvem',
    position: { x: 500, y: -30 },
    data: { label: '■ Nuvem' },
    class: 'node-header',
    draggable: false,
    connectable: false,
  },
  {
    id: 'C',
    position: { x: 500, y: 30 },
    data: { label: 'GitHub / Repositório Remoto' },
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
    class: 'node-success',
  },
])

const edges = ref([
  { id: 'eA-B', source: 'A', target: 'B', label: 'Commit', markerEnd: MarkerType.ArrowClosed },
  { id: 'eB-C', source: 'B', target: 'C', label: 'Push ➡️  |  ⬅️ Pull', markerEnd: MarkerType.ArrowClosed, markerStart: MarkerType.ArrowClosed },
])
</script>

<template>
  <ChapterLayout>
    <h2>Tutorial: Dominando Git e GitHub de Forma Visual</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Aprender a salvar o histórico do seu código com o Git,
      criar uma conta no GitHub para guardar seu portfólio na nuvem e gerenciar todo esse processo
      sem precisar digitar comandos complexos no terminal, utilizando a interface amigável do GitHub
      Desktop.
    </p>
    <hr />
    <h3>Conceitos Fundamentais</h3>
    <h4>1. O fim das &quot;Pastas Zipadas&quot;</h4>
    <p>
      Imagine que você está criando um site. Você faz uma versão e, por segurança, cria um arquivo
      chamado <code v-pre>site_cliente.zip</code>. Depois de algumas alterações, você salva como
      <code v-pre>site_cliente_v2.zip</code>, e depois <code v-pre>site_cliente_final.zip</code>,
      <code v-pre>site_cliente_agora_vai.zip</code>, e assim por diante. Isso vira uma bagunça
      gigantesca e consome espaço desnecessário no seu computador.
    </p>
    <p>
      O <strong>versionamento de código</strong> serve para organizar isso. Em vez de criar cópias
      inteiras do seu projeto, o sistema monitora as alterações no seu código linha por linha. É
      como ter uma verdadeira &quot;máquina do tempo&quot; para voltar a qualquer ponto do projeto
      se algo der errado.
    </p>
    <h4>2. Git vs. GitHub</h4>
    <ul>
      <li>
        <strong>Git:</strong> É o motor invisível. É o software instalado no seu computador que
        registra o histórico de alterações (repositório local). Você não precisa de internet para
        usá-lo.
      </li>
      <li>
        <strong>GitHub:</strong> É o estacionamento na nuvem. É um site (serviço online) onde você
        guarda os códigos que estão sendo monitorados pelo Git na sua máquina (repositório remoto).
        Além disso, funciona como uma rede social para desenvolvedores exporem seus portfólios.
      </li>
    </ul>
    <ClientOnly>
      <DiagramFlow :nodes="nodes" :edges="edges" />
    </ClientOnly>
    <h4>3. Vocabulário Essencial</h4>
    <ul>
      <li>
        <strong>Repositório (Repository):</strong> A pasta do seu projeto monitorada pelo Git.
      </li>
      <li>
        <strong>Commit:</strong> A &quot;fotografia&quot; do seu código naquele exato instante. Cada
        commit registra quais linhas foram adicionadas ou removidas.
      </li>
      <li>
        <strong>Push (Empurrar):</strong> O ato de enviar os seus commits locais para o GitHub
        (nuvem).
      </li>
      <li>
        <strong>Pull (Puxar):</strong> Trazer as atualizações da nuvem para o seu computador local.
      </li>
      <li>
        <strong>Clone:</strong> Copiar um repositório inteiro que já está no GitHub para a sua
        máquina de forma sincronizada.
      </li>
      <li>
        <strong>Branch (Ramificação):</strong> Uma cópia paralela do seu código onde você pode
        testar novas funcionalidades sem estragar a versão principal (<code v-pre>main</code> ou
        <code v-pre>master</code>).
      </li>
      <li>
        <strong>Merge (Mesclar):</strong> Unir as alterações de uma branch paralela de volta ao
        código principal.
      </li>
      <li>
        <strong>Issue (Problemas/Fórum):</strong> Um espaço no repositório do GitHub usado para
        reportar erros ou sugerir melhorias.
      </li>
    </ul>
    <hr />
    <h3>Mão na Massa: Passo a Passo</h3>
    <h4>Passo 1: Criando sua Conta e Baixando as Ferramentas</h4>
    <ol>
      <li>
        Acesse o site do <a href="https://github.com">GitHub</a> e crie uma conta gratuita. Escolha
        um nome de usuário profissional, pois ele servirá como seu portfólio no futuro!
      </li>
      <li>Baixe e instale o <a href="https://desktop.github.com">GitHub Desktop</a>.</li>
      <li>Abra o GitHub Desktop instalado e faça login com a conta que você acabou de criar.</li>
    </ol>
    <h4>Passo 2: Criando o seu Primeiro Repositório</h4>
    <ol>
      <li>
        Com o GitHub Desktop aberto, clique em <strong>File &gt; New Repository</strong> (ou no
        botão <strong>Create a New Repository on your Local Drive</strong>).
      </li>
      <li>Preencha as seguintes informações:</li>
    </ol>
    <ul>
      <li><strong>Name:</strong> <code v-pre>meu-primeiro-projeto-ar</code></li>
      <li>
        <strong>Local Path:</strong> Escolha uma pasta de fácil acesso no seu computador (por
        exemplo, dentro de Documentos ou na Área de Trabalho).
      </li>
      <li>
        <strong>Initialize this repository with a README:</strong> Deixe marcada esta opção (ela
        cria um arquivo explicativo simples sobre o projeto).
      </li>
    </ul>
    <ol start="3">
      <li>
        Clique em <strong>Create Repository</strong>. Pronto! Sua pasta foi criada e o Git já está
        monitorando-a secretamente.
      </li>
    </ol>
    <h4>Passo 3: Publicando o Repositório no GitHub (Push)</h4>
    <p>Por enquanto, o projeto existe apenas no seu computador. Vamos enviá-lo para a internet:</p>
    <ol>
      <li>
        No menu superior do GitHub Desktop, localize e clique no botão
        <strong>Publish repository</strong> (Publicar repositório).
      </li>
      <li>
        Verifique se o nome está correto. Se você quiser que outras pessoas vejam seu código,
        desmarque a opção <em>Keep this code private</em>.
      </li>
      <li>Clique em <strong>Publish Repository</strong>.</li>
      <li>
        Acesse o seu perfil no site do GitHub. Você verá que a pasta do seu projeto agora está
        disponível na nuvem!
      </li>
    </ol>
    <h4>Passo 4: Fazendo Alterações e Criando um Commit</h4>
    <ol>
      <li>
        No GitHub Desktop, clique no botão <strong>Open in Visual Studio Code</strong> (ou abra o VS
        Code manualmente e importe a pasta <code v-pre>meu-primeiro-projeto-ar</code> que você
        criou).
      </li>
      <li>No VS Code, abra o arquivo <code v-pre>README.md</code>.</li>
      <li>Adicione a seguinte linha ao final do arquivo:</li>
    </ol>
    <pre
      v-pre
    ><code v-pre class="language-markdown">Este é o meu primeiro repositório configurado com Git e GitHub Desktop para o Mini Curso de WebAR!
</code></pre>
    <ol start="4">
      <li>
        Salve o arquivo (<code v-pre>Ctrl + S</code> no Windows ou <code v-pre>Cmd + S</code> no
        Mac).
      </li>
      <li>
        Volte para o <strong>GitHub Desktop</strong>. Note que na barra lateral esquerda, na aba
        <strong>Changes</strong>, o arquivo <code v-pre>README.md</code> aparece listado com um
        símbolo verde indicando a alteração.
      </li>
      <li>Na parte inferior esquerda, você verá dois campos de texto:</li>
    </ol>
    <ul>
      <li>
        <strong>Summary (Required):</strong> Escreva um título curto para a alteração, por exemplo:
        <code v-pre>Atualiza descrição no README</code>.
      </li>
      <li><strong>Description:</strong> (Opcional) Explique o motivo da mudança.</li>
    </ul>
    <ol start="7">
      <li>
        Clique no botão azul <strong>Commit to main</strong>. Sua foto do código local está tirada!
      </li>
    </ol>
    <h4>Passo 5: Enviando as Modificações para a Nuvem</h4>
    <p>
      Notará que o botão superior mudou de &quot;Publish&quot; para
      <strong>Push origin</strong> (com uma seta para cima).
    </p>
    <ol>
      <li>Clique em <strong>Push origin</strong>.</li>
      <li>
        Vá até a página do seu projeto no site do GitHub e atualize o navegador. Suas alterações já
        estão atualizadas na nuvem para qualquer pessoa ver.
      </li>
    </ol>
    <hr />
    <h3>Desafio Prático</h3>
    <ol>
      <li>
        Crie uma nova Branch chamada <code v-pre>teste-layout</code> no GitHub Desktop (clicando no
        botão <strong>Current branch &gt; New branch</strong>).
      </li>
      <li>
        No VS Code, adicione um título <code v-pre>## Informações do Aluno</code> e o seu nome no
        arquivo <code v-pre>README.md</code>. Salve.
      </li>
      <li>
        Volte ao GitHub Desktop, faça o <em>commit</em> da alteração na branch
        <code v-pre>teste-layout</code>.
      </li>
      <li>
        Mude de volta para a branch <code v-pre>main</code> (em <strong>Current branch</strong>).
        Perceba que a alteração com o seu nome sumiu do arquivo README no VS Code! Isso prova o
        poder das branches.
      </li>
      <li>
        Volte para a branch <code v-pre>teste-layout</code> e clique em
        <strong>Publish branch</strong> para enviar esse &quot;universo paralelo&quot; para a nuvem.
      </li>
    </ol>
    <hr />
    <h3>💡 Quer Ir Além?</h3>
    <p>
      Se você quiser se aprofundar e dominar completamente todos os recursos avançados e comandos do
      terminal do Git e GitHub, recomendamos fortemente o
      <strong
        ><a href="https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA"
          >Curso de Git e GitHub do Professor Gustavo Guanabara</a
        ></strong
      >. É um curso completo, gratuito e extremamente didático!
    </p>
  </ChapterLayout>
</template>

<script setup lang="ts">
// Página gerada a partir do markdown
</script>

<template>
  <ChapterLayout>
    <h2>Compartilhando com o Mundo (GitHub Pages)</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Sincronizar a pasta local do seu projeto de WebAR com a
      nuvem do GitHub (reutilizando as ferramentas instaladas anteriormente) e ativar o recurso
      <strong>GitHub Pages</strong> para gerar um link público seguro com suporte a HTTPS. Isso
      permitirá testar a Realidade Aumentada diretamente no navegador do seu smartphone ou de
      qualquer pessoa no mundo.
    </p>
    <hr />
    <h3>Conceitos Fundamentais</h3>
    <h4>1. O que é o GitHub Pages?</h4>
    <p>
      O <strong>GitHub Pages</strong> é um serviço gratuito de hospedagem oferecido pelo GitHub que
      permite publicar sites diretamente a partir de arquivos HTML, CSS e JavaScript armazenados em
      um repositório. Ele lê o arquivo principal do repositório (geralmente chamado de
      <code v-pre>index.html</code>) e o disponibiliza na web como um site ativo.
    </p>
    <h4>2. Por que ele é fundamental para a Realidade Aumentada?</h4>
    <p>
      Como vimos no Capítulo 3.2, os navegadores de smartphones possuem restrições rígidas que
      <strong>bloqueiam o uso da câmera do celular em conexões comuns de HTTP</strong>. A câmera só
      é autorizada em duas situações:
    </p>
    <ol>
      <li>
        Ambiente de testes local (<code v-pre>localhost</code> ou <code v-pre>127.0.0.1</code>), que
        só funciona dentro do seu próprio computador.
      </li>
      <li>
        Sites publicados sob uma conexão criptografada segura com suporte ao protocolo
        <strong>HTTPS</strong> (o famoso ícone do cadeado).
      </li>
    </ol>
    <p>
      Ao publicar seu projeto no GitHub Pages, o GitHub gera automaticamente um endereço seguro do
      tipo <code v-pre>https://seu-usuario.github.io/nome-do-repositorio/</code>. Com essa URL
      segura, o navegador de qualquer smartphone Android ou iPhone liberará o acesso à câmera física
      do usuário sem restrições.
    </p>
    <hr />
    <h3>Mão na Massa: Passo a Passo</h3>
    <h4>Passo 1: Salvando e Sincronizando o Trabalho</h4>
    <p>
      Antes de publicar na internet, precisamos garantir que todos os arquivos do curso (como o
      <code v-pre>index.html</code>, o marcador <code v-pre>.patt</code> e as imagens da pasta
      <code v-pre>assets</code>) estão com suas versões finais salvas.
    </p>
    <ol>
      <li>Abra o <strong>GitHub Desktop</strong>.</li>
      <li>
        Verifique se na barra lateral esquerda todas as alterações feitas nos capítulos anteriores
        aparecem listadas na aba <em>Changes</em>.
      </li>
      <li>
        No campo inferior esquerdo, preencha o resumo da mudança (ex:
        <code v-pre>Conclui estrutura final da aplicacao WebAR</code>) e clique em
        <strong>Commit to main</strong>.
      </li>
      <li>
        Clique no botão superior <strong>Push origin</strong> (ou
        <strong>Publish repository</strong> caso seja a primeira vez que você está enviando este
        projeto específico) para subir seus commits locais para os servidores do GitHub.
      </li>
    </ol>
    <h4>Passo 2: Acessando o Repositório na Web</h4>
    <ol>
      <li>
        Acesse o site do <a href="https://github.com/">GitHub</a> pelo navegador de internet e faça
        login.
      </li>
      <li>
        Vá até a lista dos seus repositórios e clique sobre o repositório do seu projeto (por
        exemplo, <code v-pre>webar-projeto</code> ou <code v-pre>meu-primeiro-projeto-ar</code>).
      </li>
      <li>
        Verifique se todos os seus arquivos (inclusive a pasta <code v-pre>assets</code> e o arquivo
        <code v-pre>index.html</code>) aparecem listados na tela.
      </li>
    </ol>
    <h4>Passo 3: Ativando o GitHub Pages</h4>
    <ol>
      <li>
        No menu superior da página do seu repositório no GitHub, clique na aba
        <strong>Settings</strong> (Configurações) – identificada pelo ícone de engrenagem.
      </li>
      <li>
        No menu lateral esquerdo, localize a seção <em>Code and automation</em> e clique na opção
        <strong>Pages</strong>.
      </li>
      <li>
        Na seção <strong>Build and deployment</strong>, sob o campo <strong>Source</strong>,
        certifique-se de que a opção <em>Deploy from a branch</em> está selecionada.
      </li>
      <li>
        No campo <strong>Branch</strong>, clique na caixa de seleção que está como <em>None</em> e
        mude para <strong><code v-pre>main</code></strong> (ou <code v-pre>master</code>). Deixe a
        pasta de origem como <code v-pre>/ (root)</code> e clique no botão <strong>Save</strong>.
      </li>
      <li>Aguarde cerca de 1 a 2 minutos. Atualize a página do navegador.</li>
      <li>
        Um banner verde aparecerá no topo da seção Pages exibindo a mensagem:
        <em>&quot;Your site is live at...&quot;</em> acompanhado pelo seu link público HTTPS
        oficial!
      </li>
    </ol>
    <h4>Passo 4: Testando no Celular</h4>
    <ol>
      <li>Copie a URL gerada pelo GitHub Pages.</li>
      <li>
        Abra essa URL no navegador de internet do seu smartphone (se for iPhone, use
        preferencialmente o Safari; se for Android, use o Chrome).
      </li>
      <li>Conceda a permissão de câmera quando solicitado pelo navegador.</li>
      <li>
        Aponte a câmera do celular para o seu marcador de papel e veja o holograma interativo
        funcionar perfeitamente no ambiente físico!
      </li>
    </ol>
    <hr />
  </ChapterLayout>
</template>

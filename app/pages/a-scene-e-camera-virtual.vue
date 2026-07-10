<script setup lang="ts">
// Página gerada a partir do markdown
</script>

<template>
  <ChapterLayout>
    <h2>Criando a Cena 3D e Ativando a Câmera</h2>
    <p>
      <strong>O seu objetivo aqui:</strong> Estruturar o espaço tridimensional no A-Frame, adicionar
      a câmera virtual que mapeará os movimentos físicos do dispositivo e iniciar a visualização ao
      vivo concedendo as devidas permissões de vídeo no Live Server.
    </p>
    <hr />
    <h3>Conceitos Fundamentais</h3>
    <h4>1. O que é o Espaço Tridimensional (3D)?</h4>
    <p>
      Em páginas web comuns em duas dimensões (2D), trabalhamos apenas com duas direções para
      posicionar elementos na tela:
    </p>
    <ul>
      <li><strong>Largura (Eixo X):</strong> Direita e Esquerda.</li>
      <li><strong>Altura (Eixo Y):</strong> Cima e Baixo.</li>
    </ul>
    <p>Na Realidade Aumentada e no desenvolvimento 3D, adicionamos um terceiro eixo fundamental:</p>
    <ul>
      <li>
        <strong>Profundidade (Eixo Z):</strong> Frente e Trás (o quanto o objeto está perto ou longe
        de quem o observa).
      </li>
    </ul>
    <p>
      O A-Frame cria um universo tridimensional baseado nesse plano cartesiano. Para gerenciar esse
      espaço tridimensional, precisamos de um container que controle a renderização e o
      comportamento físico de tudo o que colocamos nele. Esse container é a tag
      <code v-pre>&lt;a-scene&gt;</code>.
    </p>
    <h4>2. A Cena do A-Frame com AR.js</h4>
    <p>
      Ao trabalharmos com WebAR, precisamos misturar o mundo real com o virtual. Para isso,
      adicionamos atributos especiais à nossa cena:
    </p>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;a-scene embedded arjs=&quot;sourceType: webcam; debugUIEnabled: false;&quot;&gt;&lt;/a-scene&gt;
</code></pre>
    <ul>
      <li>
        <strong><code v-pre>embedded</code>:</strong> Indica ao navegador que a cena 3D deve ser
        tratada como um elemento embutido dentro da hierarquia normal do nosso documento HTML,
        permitindo que possamos estilizá-la e combiná-la com textos e botões na página.
      </li>
      <li>
        <strong><code v-pre>arjs=&quot;sourceType: webcam&quot;</code>:</strong> Ativa o AR.js e
        define que o fundo da cena 3D não será um céu virtual, mas sim o feed de imagem ao vivo
        capturado pela webcam do computador ou câmera do celular.
      </li>
      <li>
        <strong><code v-pre>debugUIEnabled: false</code>:</strong> Oculta caixas pretas de depuração
        que o AR.js costuma mostrar na tela, mantendo a interface limpa.
      </li>
    </ul>
    <h4>3. A Câmera Virtual</h4>
    <p>
      Toda cena 3D precisa de um ponto de vista. A tag
      <code v-pre>&lt;a-entity camera&gt;</code> gera uma câmera virtual e o AR.js conecta-se aos
      sensores de movimento do seu dispositivo. Quando você gira a câmera do seu computador ou
      celular no mundo real, a câmera virtual rotaciona na mesma intensidade dentro do cenário 3D,
      dando a ilusão de que as artes virtuais estão fixas no ambiente.
    </p>
    <hr />
    <h3>Mão na Massa: Passo a Passo</h3>
    <h4>Passo 1: Organizando o Corpo do HTML</h4>
    <p>
      Para que o vídeo da câmera preencha completamente o navegador sem criar barras de rolagem
      irritantes, precisamos remover as margens.
    </p>
    <ol>
      <li>
        No seu arquivo <code v-pre>index.html</code>, adicione a regra de estilo na tag
        <code v-pre>&lt;body&gt;</code>:
      </li>
    </ol>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;body style=&quot;margin: 0; overflow: hidden;&quot;&gt;&lt;/body&gt;
</code></pre>
    <h4>Passo 2: Declarando a Cena com AR.js</h4>
    <ol>
      <li>
        Dentro da tag <code v-pre>&lt;body&gt;</code>, insira a tag
        <code v-pre>&lt;a-scene&gt;</code> configurando o AR.js:
      </li>
    </ol>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;a-scene embedded arjs=&quot;sourceType: webcam; debugUIEnabled: false;&quot;&gt; &lt;/a-scene&gt;
</code></pre>
    <h4>Passo 3: Adicionando a Câmera</h4>
    <ol>
      <li>Adicione a entidade de câmera dentro do bloco da <code v-pre>&lt;a-scene&gt;</code>:</li>
    </ol>
    <pre
      v-pre
    ><code v-pre class="language-html">&lt;a-scene embedded arjs=&quot;sourceType: webcam; debugUIEnabled: false;&quot;&gt;
  &lt;!-- Câmera do A-Frame acoplada aos sensores físicos de movimento --&gt;
  &lt;a-entity camera&gt;&lt;/a-entity&gt;
&lt;/a-scene&gt;
</code></pre>
    <blockquote>
      <p>
        [!IMPORTANT] Mantenha a câmera sempre no nível principal de
        <code v-pre>&lt;a-scene&gt;</code>. Ela não deve ficar aninhada dentro de tags de marcadores
        ou modelos 3D que criaremos no futuro.
      </p>
    </blockquote>
    <h4>Passo 4: Ativando a Webcam no Live Server</h4>
    <ol>
      <li>No VS Code, salve o seu arquivo <code v-pre>index.html</code>.</li>
      <li>
        Inicie o <strong>Live Server</strong> clicando no botão <strong>Go Live</strong> no canto
        inferior direito do VS Code (ou clique com o botão direito sobre o código e selecione
        <strong>Open with Live Server</strong>).
      </li>
      <li>
        No navegador externo que abrir, localize o pop-up de solicitação de acesso à câmera e clique
        em <strong>Permitir</strong> (Allow).
      </li>
      <li>
        A luz física da webcam do seu computador deve acender e o feed de vídeo ao vivo preencherá o
        navegador.
      </li>
    </ol>
    <hr />
    <h3>Guia Rápido de Solução de Problemas</h3>
    <ul>
      <li>
        <strong>Permissão Negada por Engano:</strong> Se você bloqueou a câmera sem querer, clique
        no ícone de &quot;Cadeado&quot; ou &quot;Câmera&quot; ao lado esquerdo da URL no navegador,
        altere a permissão para <strong>Permitir</strong> e recarregue a página (<code v-pre
          >F5</code
        >).
      </li>
      <li>
        <strong>Webcam Ocupada por Outro App:</strong> O AR.js não conseguirá ativar a webcam se ela
        já estiver sendo usada por outro software (como Zoom, Teams, Meet ou OBS Studio). Feche
        esses programas e atualize a página no navegador.
      </li>
    </ul>
    <hr />
    <h3>Desafio Prático</h3>
    <ol>
      <li>
        Mude temporariamente o parâmetro <code v-pre>debugUIEnabled: false</code> para
        <code v-pre>debugUIEnabled: true</code> dentro do seu código e salve o arquivo.
      </li>
      <li>
        Abra a prévia e observe as informações técnicas de depuração do AR.js em tempo real. Depois
        do teste, volte o parâmetro para <code v-pre>false</code>.
      </li>
    </ol>
  </ChapterLayout>
</template>

## **Liberdade Criativa com Marcadores Próprios**

**O seu objetivo aqui:** Aprender a criar seus próprios marcadores customizados com logotipos ou artes exclusivas, compreender as regras de contraste e assimetria exigidas pelo motor de rastreamento, gerar o arquivo matemático de mapeamento `.patt` e configurá-lo no código HTML.

---

### **Conceitos Fundamentais**

#### **1. Como o motor de RA "enxerga" imagens?**

Diferente dos humanos, o computador não entende a beleza ou o significado de um desenho. O algoritmo do AR.js analisa a imagem da câmera procurando por **pontos de quebra de contraste (quinas e bordas afiadas)**.

Se você usar uma imagem suave, como uma pintura em aquarela ou uma foto desfocada com cores muito parecidas, a câmera não encontrará quinas suficientes e o objeto virtual não aparecerá na tela de forma estável.

#### **2. Três Regras de Ouro para Criar um Marcador Perfeito**

Para garantir que seu marcador customizado seja lido de forma rápida e estável, sua imagem deve seguir estas diretrizes:

1.  **Assimetria Obrigatória:** Se você usar um desenho simétrico (como uma estrela de cinco pontas idênticas, um círculo perfeito ou uma cruz), o AR.js ficará confuso. Ele não conseguirá distinguir qual lado do marcador está para cima, para baixo, para a esquerda ou direita. Como resultado, seu modelo 3D ficará girando sem controle. Use sempre desenhos que tenham um "lado de cima" e um "lado de baixo" bem definidos (como letras, setas ou silhuetas complexas).
2.  **Alto Contraste:** Prefira desenhos em preto e branco ou cores primárias muito contrastantes. Formas simples e linhas sólidas funcionam muito melhor do que degradês e texturas suaves.
3.  **Moldura de Enquadramento:** O marcador precisa de uma borda preta grossa ao redor da imagem (ou uma borda branca sobre fundo escuro). Essa moldura serve para o algoritmo isolar o seu desenho do resto da mesa real, sabendo exatamente onde começa e termina o marcador.

#### **3. O que é o arquivo `.patt`?**

O AR.js não analisa a sua imagem original (PNG/JPG) diretamente no celular para economizar bateria e processamento. Em vez disso, nós passamos a imagem por uma ferramenta que a converte em um arquivo de dados simplificado com a extensão **`.patt`** (_pattern_ ou padrão). Este arquivo contém uma descrição numérica das quinas e contrastes da sua imagem, tornando a leitura do celular extremamente leve e rápida.

---

### **Mão na Massa: Passo a Passo**

#### **Passo 1: Criando a Arte do Marcador**

1. Desenhe ou baixe uma imagem simples e assimétrica de sua escolha (como uma letra estilizada, uma logo geométrica simples ou uma engrenagem).
2. Salve-a no formato PNG ou JPG.

#### **Passo 2: Gerando o Marcador e o Arquivo `.patt`**

1. Acesse a ferramenta oficial online [AR.js Marker Training](https://arnext.org/marker-training/) (ou busque por "AR.js Marker Generator" na internet).
2. Clique no botão **Upload** e selecione a imagem que você preparou. A ferramenta colocará automaticamente a borda preta grossa padrão ao redor da sua arte.
3. Clique em **Download Marker** para baixar o arquivo de dados com a extensão `.patt`. Renomeie-o para `meu-marcador.patt`.
4. Clique em **Download Image** para baixar a imagem final do marcador (que tem a borda preta). Guarde essa imagem no seu celular ou imprima para apontar para a webcam mais tarde.

#### **Passo 3: Importando o Marcador no Projeto**

1. No seu VS Code, na pasta do seu projeto, crie uma subpasta chamada `assets` para organizar seus arquivos de mídia e dados.
2. Mova o arquivo `meu-marcador.patt` que você baixou para dentro dessa pasta `assets`.
3. Abra seu arquivo `index.html`.
4. Altere a tag `<a-marker>` padrão do Hiro para carregar o seu marcador personalizado usando os atributos `type="pattern"` e `url`:

```html
<a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
  <!-- Marcador Customizado apontando para o arquivo local .patt -->
  <a-marker type="pattern" url="assets/meu-marcador.patt">
    <!-- Desenha o plano vermelho deitado sobre o marcador -->
    <a-plane position="0 0.01 0" rotation="-90 0 0" width="1" height="1" color="#EF2D5E"></a-plane>
  </a-marker>

  <a-entity camera></a-entity>
</a-scene>
```

#### **Passo 4: Testando na Câmera**

1. Salve o arquivo no VS Code e abra-o com o **Live Server** (clique no botão **Go Live** no canto inferior direito).
2. Aponte a webcam para a imagem que você baixou no passo anterior (com a borda preta grossa).
3. Verifique se o plano vermelho aparece estável exatamente sobre a sua arte customizada!

---

### **Desafio Prático**

1. Crie um segundo marcador personalizado com uma arte diferente.
2. Salve o arquivo `.patt` como `marcador-secundario.patt` na pasta `assets`.
3. Tente adicionar as duas tags de marcador no seu código HTML ao mesmo tempo (cada uma com sua própria arte e planos de cores diferentes).
4. **Dica:** O código aceita múltiplos marcadores ao mesmo tempo dentro do `<a-scene>`! Teste apontar as duas artes para a câmera simultaneamente e veja os dois planos virtuais surgirem juntos na tela.

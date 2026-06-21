## **Criando a Cena 3D e Ativando a Câmera**

**O seu objetivo aqui:** Estruturar o espaço tridimensional no A-Frame, adicionar a câmera virtual que mapeará os movimentos físicos do dispositivo e iniciar a visualização ao vivo concedendo as devidas permissões de vídeo no Live Server.

---

### **Conceitos Fundamentais**

#### **1. O que é o Espaço Tridimensional (3D)?**

Em páginas web comuns em duas dimensões (2D), trabalhamos apenas com duas direções para posicionar elementos na tela:

- **Largura (Eixo X):** Direita e Esquerda.
- **Altura (Eixo Y):** Cima e Baixo.

Na Realidade Aumentada e no desenvolvimento 3D, adicionamos um terceiro eixo fundamental:

- **Profundidade (Eixo Z):** Frente e Trás (o quanto o objeto está perto ou longe de quem o observa).

O A-Frame cria um universo tridimensional baseado nesse plano cartesiano. Para gerenciar esse espaço tridimensional, precisamos de um container que controle a renderização e o comportamento físico de tudo o que colocamos nele. Esse container é a tag `<a-scene>`.

#### **2. A Cena do A-Frame com AR.js**

Ao trabalharmos com WebAR, precisamos misturar o mundo real com o virtual. Para isso, adicionamos atributos especiais à nossa cena:

```html
<a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;"></a-scene>
```

- **`embedded`:** Indica ao navegador que a cena 3D deve ser tratada como um elemento embutido dentro da hierarquia normal do nosso documento HTML, permitindo que possamos estilizá-la e combiná-la com textos e botões na página.
- **`arjs="sourceType: webcam"`:** Ativa o AR.js e define que o fundo da cena 3D não será um céu virtual, mas sim o feed de imagem ao vivo capturado pela webcam do computador ou câmera do celular.
- **`debugUIEnabled: false`:** Oculta caixas pretas de depuração que o AR.js costuma mostrar na tela, mantendo a interface limpa.

#### **3. A Câmera Virtual**

Toda cena 3D precisa de um ponto de vista. A tag `<a-entity camera>` gera uma câmera virtual e o AR.js conecta-se aos sensores de movimento do seu dispositivo. Quando você gira a câmera do seu computador ou celular no mundo real, a câmera virtual rotaciona na mesma intensidade dentro do cenário 3D, dando a ilusão de que as artes virtuais estão fixas no ambiente.

---

### **Mão na Massa: Passo a Passo**

#### **Passo 1: Organizando o Corpo do HTML**

Para que o vídeo da câmera preencha completamente o navegador sem criar barras de rolagem irritantes, precisamos remover as margens.

1. No seu arquivo `index.html`, adicione a regra de estilo na tag `<body>`:

```html
<body style="margin: 0; overflow: hidden;"></body>
```

#### **Passo 2: Declarando a Cena com AR.js**

1. Dentro da tag `<body>`, insira a tag `<a-scene>` configurando o AR.js:

```html
<a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;"> </a-scene>
```

#### **Passo 3: Adicionando a Câmera**

1. Adicione a entidade de câmera dentro do bloco da `<a-scene>`:

```html
<a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
  <!-- Câmera do A-Frame acoplada aos sensores físicos de movimento -->
  <a-entity camera></a-entity>
</a-scene>
```

> [!IMPORTANT]
> Mantenha a câmera sempre no nível principal de `<a-scene>`. Ela não deve ficar aninhada dentro de tags de marcadores ou modelos 3D que criaremos no futuro.

#### **Passo 4: Ativando a Webcam no Live Server**

1. No VS Code, salve o seu arquivo `index.html`.
2. Inicie o **Live Server** clicando no botão **Go Live** no canto inferior direito do VS Code (ou clique com o botão direito sobre o código e selecione **Open with Live Server**).
3. No navegador externo que abrir, localize o pop-up de solicitação de acesso à câmera e clique em **Permitir** (Allow).
4. A luz física da webcam do seu computador deve acender e o feed de vídeo ao vivo preencherá o navegador.

---

### **Guia Rápido de Solução de Problemas**

- **Permissão Negada por Engano:** Se você bloqueou a câmera sem querer, clique no ícone de "Cadeado" ou "Câmera" ao lado esquerdo da URL no navegador, altere a permissão para **Permitir** e recarregue a página (`F5`).
- **Webcam Ocupada por Outro App:** O AR.js não conseguirá ativar a webcam se ela já estiver sendo usada por outro software (como Zoom, Teams, Meet ou OBS Studio). Feche esses programas e atualize a página no navegador.

---

### **Desafio Prático**

1. Mude temporariamente o parâmetro `debugUIEnabled: false` para `debugUIEnabled: true` dentro do seu código e salve o arquivo.
2. Abra a prévia e observe as informações técnicas de depuração do AR.js em tempo real. Depois do teste, volte o parâmetro para `false`.

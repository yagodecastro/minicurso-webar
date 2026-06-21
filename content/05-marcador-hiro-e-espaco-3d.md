## **O Marcador Hiro e o Espaço 3D**

**O seu objetivo aqui:** Compreender a mecânica de rastreamento por marcadores físicos, entender como os eixos tridimensionais (X, Y, Z) se comportam em relação ao papel real e projetar seu primeiro objeto virtual plano colado exatamente acima do marcador Hiro.

---

### **Conceitos Fundamentais**

#### **1. Como funciona o rastreamento por marcadores?**

O AR.js utiliza uma técnica clássica de Realidade Aumentada chamada **rastreamento baseado em marcadores** (_marker-based tracking_).

A câmera do celular filma o ambiente em tempo real buscando por padrões geométricos específicos de alto contraste. Quando ela encontra um padrão conhecido, o processador calcula a distância do marcador, a inclinação da mesa e o ângulo do celular. Em milissegundos, o motor posiciona a cena tridimensional virtual exatamente sobre aquela posição do papel físico.

#### **2. O Marcador Hiro**

O **Hiro** é o marcador padrão de testes mais conhecido no mundo da Realidade Aumentada. Ele consiste em um caractere japonês preto cercado por uma borda preta grossa em um quadrado branco. A borda preta grossa é essencial porque ajuda o algoritmo da câmera a identificar o contorno e as quinas do marcador, mesmo sob condições ruins de iluminação.

#### **3. Os Eixos 3D em cima da Mesa**

No capítulo anterior (Cena Virtual Pura), o centro do universo 3D ficava na posição da nossa tela. Agora, na Realidade Aumentada, **o centro do universo 3D (coordenada `0 0 0`) passa a ser o exato centro físico do seu marcador de papel.**

Os eixos se comportam da seguinte forma em relação ao marcador deitado na mesa:

- **Eixo X (Horizontal):** Controla a posição para a direita ou esquerda do papel.
- **Eixo Y (Vertical):** Representa a altura. Valores positivos sobem o objeto no ar, "levitando" acima da mesa.
- **Eixo Z (Profundidade):** Controla a posição para frente ou para trás em relação à borda do papel.

#### **4. O Efeito de Z-Fighting (Cintilação)**

Quando colocamos dois objetos exatamente na mesma coordenada espacial (por exemplo, um plano virtual na altura `Y: 0` e o papel real que também está na altura `Y: 0`), o motor gráfico fica confuso sem saber qual superfície deve desenhar por cima. Isso causa um efeito visual desagradável onde o objeto virtual fica piscando ou cortado. Para evitar isso, costumamos dar uma leve elevação vertical nos nossos objetos virtuais (como `Y: 0.01`).

---

### **Mão na Massa: Passo a Passo**

#### **Passo 1: Preparando a Imagem do Marcador**

1. No seu smartphone, abra o navegador e pesquise por "Hiro Marker" na busca de imagens.
2. Deixe a imagem do marcador aberta na tela inteira do celular, ou, se preferir, imprima a imagem em um papel.

#### **Passo 2: Configurando o Marcador no HTML**

1. No VS Code, abra o seu arquivo `index.html`.
2. Certifique-se de que a estrutura básica da cena e a câmera estejam configuradas.
3. Dentro da tag `<a-scene>`, adicione a tag `<a-marker>` usando o modelo padrão Hiro:

```html
<a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
  <!-- Marcador Hiro padrão do AR.js -->
  <a-marker preset="hiro"> </a-marker>

  <a-entity camera></a-entity>
</a-scene>
```

#### **Passo 3: Criando o Plano Virtual Colorido**

1. Dentro do bloco do `<a-marker>`, vamos adicionar a tag `<a-plane>` para desenhar uma folha vermelha virtual deitada exatamente sobre o papel real:

```html
<a-marker preset="hiro">
  <!-- Plano deitado 90 graus no eixo X e elevado levemente no eixo Y (0.01) para evitar piscar -->
  <a-plane position="0 0.01 0" rotation="-90 0 0" width="1" height="1" color="#EF2D5E"></a-plane>
</a-marker>
```

- `rotation="-90 0 0"`: rotaciona o plano em -90 graus no eixo X. Como a tag `<a-plane>` é originalmente em pé, essa rotação serve para "deitar" o plano na horizontal, alinhando-o perfeitamente com a mesa.
- `width="1" height="1"`: define que o tamanho virtual do plano será de 1x1 unidade (que o AR.js mapeia aproximadamente como o mesmo tamanho real da borda interna do marcador físico).

#### **Passo 4: Testando a Experiência**

1. Salve o arquivo.
2. Abra a página com o **Live Server** (clicando em **Go Live** no canto inferior direito).
3. Pegue o seu celular (com a imagem do Hiro Marker na tela) ou o papel impresso e aponte-o em direção à webcam do seu computador.
4. Veja o plano vermelho digital aparecer colado perfeitamente sobre a imagem física! Se você rotacionar ou inclinar o papel, o plano vermelho acompanhará o movimento dinamicamente.

---

### **Desafio Prático**

1. Mude a cor do plano para verde.
2. Modifique os valores de posição do plano para que ele flutue a 0.5 metros acima do marcador (ajustando o eixo Y).
3. Mude a largura (`width`) e altura (`height`) do plano para `1.5` e veja o tamanho dele em relação ao marcador aumentar na tela.

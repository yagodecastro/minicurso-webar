## **Inserindo Ilustrações 2D**

**O seu objetivo aqui:** Substituir as formas geométricas coloridas básicas por ilustrações bidimensionais (2D) reais e personalizadas, dominar o uso da tag `<a-image>` do A-Frame e posicionar texturas gráficas sobre marcadores físicos de Realidade Aumentada.

---

### **Conceitos Fundamentais**

#### **1. O poder das Ilustrações no WebAR**

Embora cubos e esferas sejam excelentes para compreender o plano cartesiano, criar experiências premium e atraentes exige o uso de elementos visuais mais ricos.

Na Realidade Aumentada, é muito comum projetar ilustrações autorais, logotipos de marcas, cartazes promocionais, fotos ou artes vetorizadas. Em vez de modelar elementos 3D complexos no início, podemos usar o poder do design 2D integrado ao ambiente tridimensional.

#### **2. A tag `<a-image>`**

A tag **`<a-image>`** é um elemento nativo do A-Frame usado para renderizar planos bidimensionais revestidos por uma textura de imagem. Ela funciona de forma semelhante à tag `<img>` tradicional do HTML, porém possui comportamento espacial completo no mundo 3D (posição, rotação e escala).

Alguns atributos essenciais da tag `<a-image>` são:

- **`src`:** Aponta para o arquivo de imagem local (na nossa pasta `assets`) ou uma URL de imagem externa na internet.
- **`width` e `height`:** Definem o tamanho físico virtual da imagem no espaço 3D (medido em metros virtuais).
- **`opacity`:** Controla a transparência da imagem (valores de `0` a `1`).

#### **3. Mantendo as Proporções Visuais**

Se você tiver uma imagem retangular (por exemplo, com proporção de 2 de largura para 1 de altura) e definir os atributos `width="1" height="1"` na tag `<a-image>`, a sua imagem ficará "espremida" e achatada.

Para que a ilustração seja renderizada no mundo real com suas proporções perfeitas de design, os valores de `width` e `height` da tag `<a-image>` devem seguir a mesma proporção matemática de pixels da imagem original.

---

### **Mão na Massa: Passo a Passo**

#### **Passo 1: Preparando a Imagem de Teste**

1. Escolha uma imagem no seu computador (por exemplo, um logotipo pessoal, uma foto ou um desenho simples).
2. Salve-a na pasta `assets` do seu projeto com um nome curto e limpo (por exemplo, `meu-logo.png`).
3. Verifique se o formato do arquivo é PNG ou JPG.

#### **Passo 2: Configurando o Código HTML**

1. No VS Code, abra o arquivo `index.html`.
2. Substitua a tag `<a-plane>` vermelha que criamos anteriormente pela tag `<a-image>` dentro do bloco de marcador customizado:

```html
<a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
  <!-- Carrega seu marcador customizado -->
  <a-marker type="pattern" url="assets/meu-marcador.patt">
    <!-- Desenha a ilustração 2D deitada sobre o marcador físico -->
    <a-image
      src="assets/meu-logo.png"
      position="0 0.01 0"
      rotation="-90 0 0"
      width="1"
      height="1"
    ></a-image>
  </a-marker>

  <a-entity camera></a-entity>
</a-scene>
```

- `src="assets/meu-logo.png"`: Indica ao A-Frame onde buscar a imagem no projeto local.
- `position="0 0.01 0"`: Eleva ligeiramente a imagem na vertical (Y: 0.01) para que ela não cause z-fighting com o papel do marcador físico na mesa.
- `rotation="-90 0 0"`: Deita a imagem sobre o papel físico.

#### **Passo 3: Visualizando a Projeção**

1. Salve as alterações.
2. Abra a página com o **Live Server** (clicando em **Go Live** no canto inferior direito).
3. Aponte a webcam do computador para o seu marcador de papel ou tela do celular.
4. Veja que o seu logotipo ou foto digital agora é renderizado colado de forma estável sobre a superfície do marcador físico!

---

### **Desafio Prático**

1. Descubra a largura e altura em pixels da imagem que você usou (no Windows, clique com o botão direito na imagem > _Propriedades > Detalhes_; no Mac, clique com o botão direito > _Obter Informações_).
2. Se a sua imagem for retangular (por exemplo: 800px de largura por 400px de altura), calcule a proporção simplificada (2 de largura para 1 de altura).
3. Ajuste os atributos da tag `<a-image>` para que ela exiba essa proporção perfeita na tela (exemplo: `width="2" height="1"` ou `width="1.6" height="0.8"`). Salve e verifique se a distorção sumiu!

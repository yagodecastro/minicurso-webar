## **O Efeito "Outdoor" (Levantando a Arte)**

**O seu objetivo aqui:** Aprender a posicionar suas ilustrações digitais na vertical (em pé) em relação ao marcador horizontal deitado na mesa, compreender a mecânica de ancoragem central dos objetos tridimensionais no A-Frame e aplicar o cálculo de elevação vertical necessário para evitar que elementos fiquem enterrados debaixo da mesa real.

---

### **Conceitos Fundamentais**

#### **1. O Efeito de Display Físico**

Até agora, as imagens que projetamos estavam deitadas na mesa física como se fossem adesivos colados no papel. No entanto, uma das experiências visuais mais interessantes no WebAR é o **efeito "Outdoor" (ou display de mesa)**.

Imagine um totem de papelão publicitário ou o stand de um personagem de jogo que fica em pé sobre o marcador. O usuário pode rodar a câmera ao redor dele e ver o personagem erguido no espaço tridimensional.

#### **2. O Problema da Ancoragem pelo Centro**

No desenvolvimento 3D, todos os objetos possuem um ponto de referência central invisível chamado de **pivô ou âncora**. É a partir desse ponto central que o computador calcula a posição espacial do objeto.

No A-Frame, a âncora padrão de uma imagem fica exatamente no seu **centro geométrico** (e não na borda inferior). Isso gera uma consequência importante ao posicionarmos objetos em pé:

- Se a sua imagem tem 1 metro de altura (`height="1"`) e você a posiciona na coordenada vertical zero (`Y: 0`), o A-Frame alinhará o centro da imagem com a mesa.
- Isso significa que a metade de cima da imagem (0,5 metros) ficará visível flutuando acima da mesa, mas a metade inferior (0,5 metros) ficará **enterrada debaixo da mesa física** (desaparecendo da tela).

```mermaid
graph TD
 subgraph Y = 0.0 (Errado ❌)
 A1[Pivô no Centro do Personagem] --> B1[Metade de Cima: 0.5m Visível acima da mesa]
 A1 --> C1[Metade de Baixo: 0.5m Enterrada abaixo da mesa]
 end
 style A1 fill:#EF4444,stroke:#B91C1C,color:#fff
```

#### **3. A Fórmula de Correção de Altura**

Para fazer com que a base da imagem fique perfeitamente apoiada no papel físico sem afundar na superfície da mesa, precisamos elevá-la verticalmente (eixo Y). O cálculo é muito simples: basta deslocar o objeto para cima na exata **metade do valor da sua altura** (`height`):

$$\text{Posição } Y = \frac{\text{Altura do Objeto}}{2}$$

- Se a altura for `1`, a posição Y deve ser `0.5`.
- Se a altura for `1.6`, a posição Y deve ser `0.8`.

```mermaid
graph TD
 subgraph Y = 0.5 (Correto ✔)
 A2[Pivô elevado: Altura / 2] --> B2[Base do personagem apoia na mesa]
 B2 --> C2[Personagem 100% visível no espaço virtual]
 end
 style A2 fill:#10B981,stroke:#047857,color:#fff
```

---

### **Mão na Massa: Passo a Passo**

#### **Passo 1: Zerando a Rotação para Levantar a Arte**

1. No VS Code, abra o arquivo `index.html`.
2. Localize a tag `<a-image>` dentro do seu marcador customizado.
3. Altere o atributo `rotation` de `"-90 0 0"` para `"0 0 0"`. Isso avisa ao motor gráfico para não deitar o plano na mesa virtual.

```html
<a-marker type="pattern" url="assets/meu-marcador.patt">
  <!-- Levanta a imagem zerando a rotação -->
  <a-image src="#personagem-png" width="1" height="1" rotation="0 0 0" position="0 0 0"></a-image>
</a-marker>
```

#### **Passo 2: Aplicando a Elevação de Correção**

Se você testar o código do Passo 1 na câmera, verá que o personagem parecerá cortado ao meio pela mesa de apoio. Vamos elevar seu posicionamento no eixo Y:

1. Altere o atributo `position` da tag `<a-image>` de `"0 0.01 0"` para `"0 0.5 0"` (já que a imagem tem `height="1"`):

```html
<a-marker type="pattern" url="assets/meu-marcador.patt">
  <!-- Posiciona o personagem em pé e apoiado perfeitamente na base do marcador -->
  <a-image src="#personagem-png" width="1" height="1" rotation="0 0 0" position="0 0.5 0"></a-image>
</a-marker>
```

#### **Passo 3: Testando no Live Server**

1. Salve o arquivo e abra a visualização.
2. Aponte o marcador personalizado para a webcam.
3. Observe como o personagem agora parece "pular" para fora da folha, mantendo-se totalmente erguido na vertical e com a base colada sobre o marcador físico!

---

### **Desafio Prático**

1. Imagine que você está usando um personagem gigante que precisa ter a altura física virtual de 2 metros (`height="2"`).
2. Ajuste o tamanho da tag `<a-image>` configurando `width="1.25" height="2"`.
3. Calcule qual deve ser o valor correto da coordenada Y no atributo `position` para que este personagem de 2 metros fique apoiado na superfície sem afundar no papel.
4. **Dica:** Lembre-se da fórmula: $\text{Posição } Y = \frac{\text{Altura}}{2}$.

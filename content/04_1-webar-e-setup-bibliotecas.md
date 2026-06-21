## **Introdução ao WebAR e Setup de Bibliotecas**

**O seu objetivo aqui:** Compreender a diferença entre a Realidade Aumentada tradicional e a WebAR, entender o papel de cada biblioteca que vamos utilizar e criar a primeira base de arquivos do projeto importando os scripts necessários passo a passo.

---

### **Conceitos Fundamentais**

#### **1. O que é WebAR? (E quais são suas vantagens?)**

Até pouco tempo atrás, para experimentar a Realidade Aumentada (RA) no celular, o usuário precisava seguir um caminho longo e chato:

```
Caminho Tradicional (Nativo):
[Abrir Loja de Apps] ➔ [Pesquisar Aplicativo] ➔ [Baixar 100MB+] ➔ [Aceitar Permissões] ➔ [Usar a Câmera]

Caminho WebAR (Direto):
[Escanear QR Code] ➔ [Abrir no Navegador] ➔ [Pronto para Usar!]
```

A **WebAR (Web Augmented Reality)** quebra todas essas barreiras. Em vez de um aplicativo nativo, a experiência inteira é executada **dentro do navegador de internet** que o usuário já tem instalado no aparelho. O fluxo de acesso se resume a:

1. Escanear um QR Code impresso em um panfleto ou apontar a câmera para um link.
2. O navegador se abre e carrega a experiência instantaneamente na web.

Isso simplifica o acesso do usuário, tornando a tecnologia útil para portfólios, cartões de visita interativos e protótipos rápidos.

#### **2. O que são Bibliotecas JavaScript e CDNs?**

Escrever um programa capaz de reconhecer imagens da câmera do celular em tempo real e calcular a matemática 3D necessária do zero exigiria milhares de linhas de código extremamente avançado. Felizmente, outros desenvolvedores já criaram essas ferramentas complexas e as disponibilizaram de graça. Essas ferramentas prontas são chamadas de **bibliotecas**.

Para usarmos essas bibliotecas no nosso site, usamos uma **CDN (Content Delivery Network)**. Uma CDN é um servidor na internet que hospeda os arquivos dessas bibliotecas de forma pública. Em vez de baixar os arquivos das bibliotecas para a sua máquina, basta colocar uma tag `<script>` no seu código HTML apontando para a URL da CDN. O navegador do usuário fará o download delas automaticamente ao abrir sua página.

#### **3. As Tecnologias do Nosso Projeto**

- **[A-Frame](https://aframe.io/) (Mozilla):** É um framework web para construir mundos tridimensionais (3D) e de Realidade Virtual (VR). Ele permite criar cenários digitais usando marcações HTML simples, sem a necessidade de aprender WebGL complexo.
- **[AR.js](https://ar-js-org.github.io/AR.js-Docs/):** É uma biblioteca leve de Realidade Aumentada para a Web. Ela estende as capacidades do A-Frame, adicionando funcionalidades de rastreamento de câmera e reconhecimento de marcadores físicos.

---

### **Mão na Massa: Passo a Passo**

#### **Passo 1: Criando a Pasta e o Arquivo do Projeto**

1. Abra o **Visual Studio Code**.
2. Abra a sua pasta de trabalho criada no capítulo anterior (por exemplo, `meu-projeto-webar`) em **File > Open Folder**.
3. Na barra lateral esquerda (Explorer), clique no ícone **New File** (Novo Arquivo) e nomeie-o exatamente como `index.html`. É importante usar letras minúsculas.
4. Escreva a estrutura básica do HTML5 digitando o atalho `!` e pressionando `Enter`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Minha Primeira Experiência WebAR</title>
  </head>
  <body></body>
</html>
```

#### **Passo 2: Importando o Motor 3D (A-Frame)**

A primeira biblioteca que devemos carregar é o A-Frame, pois o AR.js depende dele para desenhar as coisas em 3D.

1. No `<head>` do seu arquivo HTML, logo abaixo da tag `<title>`, insira a tag de importação do A-Frame:

```html
<!-- Biblioteca A-Frame (Versão 1.3.0) -->
<script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
```

#### **Passo 3: Importando o Rastreador de Realidade Aumentada (AR.js)**

Com o A-Frame carregado, agora podemos importar a biblioteca que gerencia a câmera e os marcadores de RA.

1. Adicione a tag de script do AR.js logo abaixo do script do A-Frame no `<head>`:

```html
<!-- Biblioteca AR.js para A-Frame -->
<script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
```

> [!WARNING]
> A ordem de importação é crucial! O script do **A-Frame** deve sempre vir antes do script do **AR.js**. Caso contrário, o AR.js tentará usar recursos do A-Frame antes de eles existirem, o que causará erros no console e impedirá a aplicação de rodar.

---

### **Desafio Prático**

1. Salve o seu arquivo pressionando `Ctrl + S` (Windows) ou `Cmd + S` (Mac).
2. Abra a página com o **Live Server** clicando no botão **Go Live** no canto inferior direito do VS Code (ou clique com o botão direito sobre o código e selecione **Open with Live Server**).
3. No seu navegador web externo que abrir, acesse o Console de Desenvolvedor pressionando a tecla `F12` (ou clique com o botão direito em qualquer parte da página e selecione **Inspecionar**, depois clique na aba **Console**).
4. Você verá um painel com um texto de boas-vindas do A-Frame e estatísticas do motor gráfico. Certifique-se de que não há nenhuma linha vermelha de erro indicando falha ao carregar os scripts.

# 🕶️ Portal do Minicurso de WebAR (Nuxt 3)

Este repositório contém a aplicação e o conteúdo do **Minicurso de Realidade Aumentada na Web (WebAR)**. A plataforma foi projetada como um manual iterativo passo a passo para desenvolvedores aprenderem a criar experiências tridimensionais imersivas direto no navegador do celular utilizando tecnologias abertas como **A-Frame** e **AR.js**.

---

## ⚡ Tecnologias Utilizadas

O portal de aprendizado foi construído com ferramentas de última geração:

- **Framework Principal:** [Nuxt 3](https://nuxt.com/) (Vue 3, Vite, SSR).
- **Motor de Conteúdo:** `@nuxt/content` v3 para autoria de aulas baseadas em arquivos Markdown enriquecidos.
- **Estilização & Temas:** [Tailwind CSS v4](https://tailwindcss.com/) com suporte nativo a **Dark & Light Mode** integrado e transição de cores suave.
- **Biblioteca de Ícones:** [Lucide Icons](https://lucide.dev/) (`lucide-vue-next`).
- **Destaque de Sintaxe (Shiki):** Destaque de código adaptável que muda automaticamente as cores com base no tema selecionado (`github-light` no tema claro e `dracula` no escuro).
- **Gerenciador de Pacotes:** [Bun](https://bun.sh/) para instalação de dependências e execução ultra-rápida.

---

## 🔧 Estrutura do Conteúdo

As aulas do curso residem na pasta `/content` no formato Markdown e são enumeradas dinamicamente:

```bash
content/
├── 00-introducao.md
├── 01-preparando-as-ferramentas.md
├── 02-introducao-rapida-ao-html.md
├── 03-fundamentos-do-a-frame.md
├── 04_1-webar-e-setup-bibliotecas.md
├── 04_2-a-scene-e-camera-virtual.md
└── ...
```

---

## 🚀 Como Inicializar o Projeto

Siga os passos abaixo para instalar e rodar a plataforma de aprendizado na sua máquina de desenvolvimento:

### 1. Instalar as dependências do projeto

Utilize o Bun para resolver e instalar os pacotes necessários:

```bash
bun install
```

### 2. Iniciar o servidor de desenvolvimento

Execute o servidor local do Nuxt:

```bash
bun run dev
```

A plataforma estará disponível em: [http://localhost:3000](http://localhost:3000)

### 3. Gerar build de produção (Opcional)

Para compilar a aplicação final otimizada para publicação:

```bash
bun run build
```

---

## 📘 Instruções de Realidade Aumentada (WebAR)

Para que os projetos práticos do curso funcionem, é obrigatório rodá-los sob conexões seguras ou em servidores locais reais (`localhost`), pois as APIs de mídia do navegador (acesso à webcam/câmera do celular) são estritamente bloqueadas sob protocolos inseguros ou visualizadores internos sem sandbox de segurança (como o Live Preview do VS Code).

Nas aulas, orientamos o uso da extensão **Live Server** (porta `:5500`) em navegadores reais externos (como Google Chrome ou Safari) para conceder as devidas permissões da câmera do dispositivo.

# Regras do Projeto (Workspace Rules)

Este arquivo contém instruções e regras específicas para o desenvolvimento deste projeto. Ele deve ser lido por qualquer agente de codificação antes de realizar alterações no codebase.

## Diretrizes Gerais
- Todo o código deve ser escrito em Inglês.
- As respostas ao usuário devem ser sempre em Português (pt-br).
- **CRÍTICO:** Não executar o aplicativo locally em background no terminal (conforme memória definida).

## Stack & Padrões do Projeto
- **Framework:** Nuxt 3 (Vue 3, TypeScript).
- **Estilização:** Tailwind CSS v4.
- **Ícones:** Biblioteca `lucide-vue-next` (Lucide). Não utilizar emojis ou SVGs inline para ícones de UI.
- **Gerenciador de Pacotes:** Bun (utilizar `bun run`, `bun add`, etc.).

## Convenções de Temas & Estilo
- **Suporte a Dark/Light Mode:** O projeto é híbrido. 
  - A variante `dark` do Tailwind v4 está configurada via classe no arquivo `app/assets/css/main.css` utilizando: `@custom-variant dark (&:where(.dark, .dark *));`.
  - A classe `.dark` é adicionada ao elemento `<html>` via script.
  - Qualquer alteração de cores deve suportar ambos os modos usando classes apropriadas (ex: `bg-slate-50 dark:bg-slate-950`).
- **Destaque de Código (Syntax Highlighting):** O Nuxt Content utiliza o motor Shiki configurado em `nuxt.config.ts` com múltiplos temas: `default: 'github-light'` e `dark: 'dracula'`.
- **Numeração de Capítulos:** Os arquivos Markdown em `content/` são ordenados dinamicamente na sidebar e na navegação com base no prefixo numérico de seus nomes (ex: `04_1`, `12`).
  - **ATENÇÃO:** Não adicione textos estáticos de numeração como "Capítulo X: " nos títulos dos markdowns, pois o Nuxt renderiza o número do capítulo dinamicamente no layout.

## Convenções de Código Geral
- Manter funções curtas (4-20 linhas).
- Manter arquivos abaixo de 500 linhas, dividindo-os por responsabilidade.
- Evitar duplicação de código.
- Retornos antecipados (early returns) são preferíveis a ifs aninhados (máximo 2 níveis de indentação).
- Testes devem ser F.I.R.S.T (fast, independent, repeatable, self-validating, timely).

## Instruções do Curso de WebAR
- Para testes de Realidade Aumentada (WebAR) com uso de câmera, as apostilas orientam os alunos a utilizarem a extensão **Live Server** (porta `:5500` no navegador real externo), pois o navegador integrado do VS Code bloqueia o acesso à webcam por segurança.

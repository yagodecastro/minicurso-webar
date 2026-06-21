## **Compartilhando com o Mundo (GitHub Pages)**

**O seu objetivo aqui:** Sincronizar a pasta local do seu projeto de WebAR com a nuvem do GitHub (reutilizando as ferramentas instaladas anteriormente) e ativar o recurso **GitHub Pages** para gerar um link público seguro com suporte a HTTPS. Isso permitirá testar a Realidade Aumentada diretamente no navegador do seu smartphone ou de qualquer pessoa no mundo.

---

### **Conceitos Fundamentais**

#### **1. O que é o GitHub Pages?**

O **GitHub Pages** é um serviço gratuito de hospedagem oferecido pelo GitHub que permite publicar sites diretamente a partir de arquivos HTML, CSS e JavaScript armazenados em um repositório. Ele lê o arquivo principal do repositório (geralmente chamado de `index.html`) e o disponibiliza na web como um site ativo.

#### **2. Por que ele é fundamental para a Realidade Aumentada?**

Como vimos no Capítulo 3.2, os navegadores de smartphones possuem restrições rígidas que **bloqueiam o uso da câmera do celular em conexões comuns de HTTP**. A câmera só é autorizada em duas situações:

1. Ambiente de testes local (`localhost` ou `127.0.0.1`), que só funciona dentro do seu próprio computador.
2. Sites publicados sob uma conexão criptografada segura com suporte ao protocolo **HTTPS** (o famoso ícone do cadeado).

```
 ┌───────────────┐
 │ Navegador │
 └───────┬───────┘
 │
 Tenta acessar a câmera do celular?
 │
 ┌────────────────┴────────────────┐
 [ HTTP Comum ] [ HTTPS Seguro ]
 (Sem criptografia) (Link com cadeado)
 │ │
 ▼ ▼
 Câmera Bloqueada ❌ Câmera Liberada ✔
```

Ao publicar seu projeto no GitHub Pages, o GitHub gera automaticamente um endereço seguro do tipo `https://seu-usuario.github.io/nome-do-repositorio/`. Com essa URL segura, o navegador de qualquer smartphone Android ou iPhone liberará o acesso à câmera física do usuário sem restrições.

---

### **Mão na Massa: Passo a Passo**

#### **Passo 1: Salvando e Sincronizando o Trabalho**

Antes de publicar na internet, precisamos garantir que todos os arquivos do curso (como o `index.html`, o marcador `.patt` e as imagens da pasta `assets`) estão com suas versões finais salvas.

1. Abra o **GitHub Desktop**.
2. Verifique se na barra lateral esquerda todas as alterações feitas nos capítulos anteriores aparecem listadas na aba _Changes_.
3. No campo inferior esquerdo, preencha o resumo da mudança (ex: `Conclui estrutura final da aplicacao WebAR`) e clique em **Commit to main**.
4. Clique no botão superior **Push origin** (ou **Publish repository** caso seja a primeira vez que você está enviando este projeto específico) para subir seus commits locais para os servidores do GitHub.

#### **Passo 2: Acessando o Repositório na Web**

1. Acesse o site do [GitHub](https://github.com/) pelo navegador de internet e faça login.
2. Vá até a lista dos seus repositórios e clique sobre o repositório do seu projeto (por exemplo, `webar-projeto` ou `meu-primeiro-projeto-ar`).
3. Verifique se todos os seus arquivos (inclusive a pasta `assets` e o arquivo `index.html`) aparecem listados na tela.

#### **Passo 3: Ativando o GitHub Pages**

1. No menu superior da página do seu repositório no GitHub, clique na aba **Settings** (Configurações) – identificada pelo ícone de engrenagem.
2. No menu lateral esquerdo, localize a seção _Code and automation_ e clique na opção **Pages**.
3. Na seção **Build and deployment**, sob o campo **Source**, certifique-se de que a opção _Deploy from a branch_ está selecionada.
4. No campo **Branch**, clique na caixa de seleção que está como _None_ e mude para **`main`** (ou `master`). Deixe a pasta de origem como `/ (root)` e clique no botão **Save**.
5. Aguarde cerca de 1 a 2 minutos. Atualize a página do navegador.
6. Um banner verde aparecerá no topo da seção Pages exibindo a mensagem: _"Your site is live at..."_ acompanhado pelo seu link público HTTPS oficial!

#### **Passo 4: Testando no Celular**

1. Copie a URL gerada pelo GitHub Pages.
2. Abra essa URL no navegador de internet do seu smartphone (se for iPhone, use preferencialmente o Safari; se for Android, use o Chrome).
3. Conceda a permissão de câmera quando solicitado pelo navegador.
4. Aponte a câmera do celular para o seu marcador de papel e veja o holograma interativo funcionar perfeitamente no ambiente físico!

---

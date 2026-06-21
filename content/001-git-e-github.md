## **Tutorial: Dominando Git e GitHub de Forma Visual**

**O seu objetivo aqui:** Aprender a salvar o histórico do seu código com o Git, criar uma conta no GitHub para guardar seu portfólio na nuvem e gerenciar todo esse processo sem precisar digitar comandos complexos no terminal, utilizando a interface amigável do GitHub Desktop.

---

### **Conceitos Fundamentais**

#### **1. O fim das "Pastas Zipadas"**

Imagine que você está criando um site. Você faz uma versão e, por segurança, cria um arquivo chamado `site_cliente.zip`. Depois de algumas alterações, você salva como `site_cliente_v2.zip`, e depois `site_cliente_final.zip`, `site_cliente_agora_vai.zip`, e assim por diante. Isso vira uma bagunça gigantesca e consome espaço desnecessário no seu computador.

O **versionamento de código** serve para organizar isso. Em vez de criar cópias inteiras do seu projeto, o sistema monitora as alterações no seu código linha por linha. É como ter uma verdadeira "máquina do tempo" para voltar a qualquer ponto do projeto se algo der errado.

#### **2. Git vs. GitHub**

- **Git:** É o motor invisível. É o software instalado no seu computador que registra o histórico de alterações (repositório local). Você não precisa de internet para usá-lo.
- **GitHub:** É o estacionamento na nuvem. É um site (serviço online) onde você guarda os códigos que estão sendo monitorados pelo Git na sua máquina (repositório remoto). Além disso, funciona como uma rede social para desenvolvedores exporem seus portfólios.

#### **3. Vocabulário Essencial**

- **Repositório (Repository):** A pasta do seu projeto monitorada pelo Git.
- **Commit:** A "fotografia" do seu código naquele exato instante. Cada commit registra quais linhas foram adicionadas ou removidas.
- **Push (Empurrar):** O ato de enviar os seus commits locais para o GitHub (nuvem).
- **Pull (Puxar):** Trazer as atualizações da nuvem para o seu computador local.
- **Clone:** Copiar um repositório inteiro que já está no GitHub para a sua máquina de forma sincronizada.
- **Branch (Ramificação):** Uma cópia paralela do seu código onde você pode testar novas funcionalidades sem estragar a versão principal (`main` ou `master`).
- **Merge (Mesclar):** Unir as alterações de uma branch paralela de volta ao código principal.
- **Issue (Problemas/Fórum):** Um espaço no repositório do GitHub usado para reportar erros ou sugerir melhorias.

---

### **Mão na Massa: Passo a Passo**

#### **Passo 1: Criando sua Conta e Baixando as Ferramentas**

1. Acesse o site do [GitHub](https://github.com) e crie uma conta gratuita. Escolha um nome de usuário profissional, pois ele servirá como seu portfólio no futuro!
2. Baixe e instale o [GitHub Desktop](https://desktop.github.com).
3. Abra o GitHub Desktop instalado e faça login com a conta que você acabou de criar.

#### **Passo 2: Criando o seu Primeiro Repositório**

1. Com o GitHub Desktop aberto, clique em **File > New Repository** (ou no botão **Create a New Repository on your Local Drive**).
2. Preencha as seguintes informações:
   - **Name:** `meu-primeiro-projeto-ar`
   - **Local Path:** Escolha uma pasta de fácil acesso no seu computador (por exemplo, dentro de Documentos ou na Área de Trabalho).
   - **Initialize this repository with a README:** Deixe marcada esta opção (ela cria um arquivo explicativo simples sobre o projeto).
3. Clique em **Create Repository**. Pronto! Sua pasta foi criada e o Git já está monitorando-a secretamente.

#### **Passo 3: Publicando o Repositório no GitHub (Push)**

Por enquanto, o projeto existe apenas no seu computador. Vamos enviá-lo para a internet:

1. No menu superior do GitHub Desktop, localize e clique no botão **Publish repository** (Publicar repositório).
2. Verifique se o nome está correto. Se você quiser que outras pessoas vejam seu código, desmarque a opção _Keep this code private_.
3. Clique em **Publish Repository**.
4. Acesse o seu perfil no site do GitHub. Você verá que a pasta do seu projeto agora está disponível na nuvem!

#### **Passo 4: Fazendo Alterações e Criando um Commit**

1. No GitHub Desktop, clique no botão **Open in Visual Studio Code** (ou abra o VS Code manualmente e importe a pasta `meu-primeiro-projeto-ar` que você criou).
2. No VS Code, abra o arquivo `README.md`.
3. Adicione a seguinte linha ao final do arquivo:
   ```markdown
   Este é o meu primeiro repositório configurado com Git e GitHub Desktop para o Mini Curso de WebAR!
   ```
4. Salve o arquivo (`Ctrl + S` no Windows ou `Cmd + S` no Mac).
5. Volte para o **GitHub Desktop**. Note que na barra lateral esquerda, na aba **Changes**, o arquivo `README.md` aparece listado com um símbolo verde indicando a alteração.
6. Na parte inferior esquerda, você verá dois campos de texto:
   - **Summary (Required):** Escreva um título curto para a alteração, por exemplo: `Atualiza descrição no README`.
   - **Description:** (Opcional) Explique o motivo da mudança.
7. Clique no botão azul **Commit to main**. Sua foto do código local está tirada!

#### **Passo 5: Enviando as Modificações para a Nuvem**

Notará que o botão superior mudou de "Publish" para **Push origin** (com uma seta para cima).

1. Clique em **Push origin**.
2. Vá até a página do seu projeto no site do GitHub e atualize o navegador. Suas alterações já estão atualizadas na nuvem para qualquer pessoa ver.

---

### **Desafio Prático**

1. Crie uma nova Branch chamada `teste-layout` no GitHub Desktop (clicando no botão **Current branch > New branch**).
2. No VS Code, adicione um título `## Informações do Aluno` e o seu nome no arquivo `README.md`. Salve.
3. Volte ao GitHub Desktop, faça o _commit_ da alteração na branch `teste-layout`.
4. Mude de volta para a branch `main` (em **Current branch**). Perceba que a alteração com o seu nome sumiu do arquivo README no VS Code! Isso prova o poder das branches.
5. Volte para a branch `teste-layout` e clique em **Publish branch** para enviar esse "universo paralelo" para a nuvem.

---

### **💡 Quer Ir Além?**

Se você quiser se aprofundar e dominar completamente todos os recursos avançados e comandos do terminal do Git e GitHub, recomendamos fortemente o **[Curso de Git e GitHub do Professor Gustavo Guanabara](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA)**. É um curso completo, gratuito e extremamente didático!

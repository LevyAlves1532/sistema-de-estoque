## Sistema de Gerenciamento de Estoque
Este foi um projeto construido como parte de um aprendizado que tive no "Curso de JavaScript e TypeScript do básico ao avançado JS/TS" da udemy, fiz um projeto neste curso voltado para o gerenciamento de contatos e baseado neste projeto fiz um voltado ao gerenciamento de estoque, implementei funcionalidades novas como upload de imagens com o multer, filtro por categoria e relação entre as collections criadas dentro do MongoDB.

## Tecnologias

Tecnologias usadas no projeto:

  * Webpack versão 5.91.0
  * Express versão 4.18.3
  * Mongoose versão 8.2.1
  * EJS versão 3.1.9
  * Dotenv versão 16.4.5
  * BcryptJS versão 2.4.3
  * Bootstrap versão 4.6.2

## Serviços Usados

Usamos um banco de dados NoSQL, o MongoDB para ser cadastrado os dados enviados e salvar as sessões.

## Para Iniciar

  * Ambiente:
    - Ter o Node na versão 20.9.0 LTS

  * Instruções:
    - Crie uma copia do arquivo `.env.example` e o nomeie para `.env`
    - Na variavel de ambiente `CONNECTIONSTRING` você deve colocar o seu link de conexão com o MongoDB

      *Exemplo:*

      mongodb+srv://{nome_do_usuario}:{senha_do_usuario}@cluster0.okdecrh.mongodb.net/{nome_do_db}?retryWrites=true&w=majority&appName=Cluster0

      * Eu não instalei o MongoDB, eu usei deste site para criar o meu banco dedao [https://cloud.mongodb.com/](https://cloud.mongodb.com/), recomendo!
  
  * Comandos:
    - Instale as dependencias do projeto na raiz do mesmo com o seguinte comando: `npm install` ou `yarn`
    - Para iniciar o servidor node do nodemon, digite o seguinte comando: `npm start`

      *Exemplo:*

      ```bash
        PS C:\projetos\sistema-de-estoque> npm start

        > aula17_helmet_csrf@1.0.0 start
        > nodemon server.js --ignore public --ignore frontend

        [nodemon] 3.1.0
        [nodemon] to restart at any time, enter `rs`
        [nodemon] watching path(s): *.*
        [nodemon] watching extensions: js,mjs,cjs,json
        [nodemon] starting `node server.js`
        Conectei a base de dados.
        Acessar http://localhost:3000
        Servidor executando na porta 3000
      ```

      * Clique no link ou copie `http://localhost:3000` e cole na URL do seu navegador.

    - E para rodar o comando webpack para fazer alterações no javascript do frontend, digite o seguinte comando: `npm run dev`

## Como usar?

Para você usar você precisa configurar o banco de dados, no geral seria isso, após configurar o seu banco de dados você já pode criar conta, registrar seus produtos e categorias.

### 1 Tela de Login - Para você logar com seu e-mail e senha.

![Tela de Sign In](https://github.com/LevyAlves1532/sistema-de-estoque/raw/master/readme/sign-in.jpeg)

### 2 Tela de Inicio - Apresenta todos os produtos.

Além de você poder filtrar por categorias e ter acesso rápido as páginas de registro de categoria e produto.

![Tela de Inicio](https://github.com/LevyAlves1532/sistema-de-estoque/blob/master/readme/home.jpeg)

### 3 Tela de Categorias - Apresenta todas as categorias.

![Tela de Categorias](https://github.com/LevyAlves1532/sistema-de-estoque/blob/master/readme/categories.jpeg)

### 4 Tela de Registro de Categoria - Registra uma Categoria.

![Bloco de Serviços](https://github.com/LevyAlves1532/sistema-de-estoque/blob/master/readme/categories-add.jpeg)

### 5 Tela de Edição de Produto - Edita um Produto.

![Bloco de Portfolio](https://github.com/LevyAlves1532/sistema-de-estoque/blob/master/readme/products-edit.jpeg)

## Funcionalidades do Projeto

Todas as funcionalidades do projeto:
  - Cadastro de novos usuários
  - Autenticação apartir do email e senha do usuário
  - Cadastro de categorias, listamento, edição e exclusão das mesmas
  - Cadastro de produtos, listamento, edição e exclusão das mesmas
  - Filtro por categorias
  - Edição dos dados dos usuários
  - Validação dos formulários

## Links

* Repositorio: https://github.com/LevyAlves1532/sistema-de-estoque
  - Caso você encontre algum bug, ou tenha dúvidas sobre o projeto, entre em contato levy.pereiraA1532@gmail.com, desde já agradeço pela atenção!

## Versão do Projeto

1.0.0

## Autor do Projeto

  * **Lêvy Pereira Alves**

Siga o github e junte-se a nós!
Obrigado por me visitar e boa codificação!
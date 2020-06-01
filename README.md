# b-our-log

Um simples blog para visualização de artigos, com um CRUD completo para categorias e artigos, este projeto foi desenvolvido com intuito de aprender mais sobre as mecânicas do node.js e suas bibliotecas para desenvolvimento web. Feito no curso 

Para utilizar esse modelo basta digitar o código abaixo em um diretório adequado

`git clone https://github.com/jhonpedro/b-our-log`

após o clone dê um `npm install` para instalar as dependencias e certifique-se de que há uma tabela criada com o nome, usuário e senha, definidos no diretório database/database.js. E force a criação dos modelos das tabelas no banco de dados com `<nomeDoModel>.sync({force: true})`

Após toda essa configuração crie um admin em `/admin/users/create` e adicione o middleware adminAuth na última rota citada

Qualquer dúvida comente em algum commit :)

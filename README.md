# Lista de Mercado

Desafio Back-End 1 do processo seletivo da Cowala Software. Trata-se de uma API de salvamento de itens de compra em um banco de dados PostgreSQL, com CRUD completo, testes unitários e de integração. 

O deploy da API foi feito no Heroku e o deploy do banco de dados foi feito no ElephantSQL.

* Link de Deploy: https://listademercado.herokuapp.com/

# Principais tecnologias utilizadas
- Node.js
- Typescript
- Express
- PostgreSQL
- Typeorm
- Jest
- Supertest
- Heroku
- ElephantSQL

# Como funciona
Os itens do banco de dados têm a seguinte estrutura: 

```
{
    "id": integer,
    "item": string,
    "preco": decimal
}
```

O id é a chave primária que é auto incrementada em cada salvamento no banco de dados.
Através das rotas pode-se criar, ler, alterar e deletar itens da lista. As funcionalidades foram isoladas em serviços específicos localizados em 'src/services/'

Foram implementados testes unitários e de integração (localizados em 'src/tests/') utilizando-se as bibliotecas Jest e Supertest.

# Rotas

| Métodos   | Rotas  | Descrição     
| :---------| :------|:---------------------------------- |
| GET       | /      | Retorna todos os itens salvos no banco de dados                           |
| GET       | /itens/:id | Retorna o item correspondente ao parâmetro "id" da url|
| POST       | /itens | Cria um novo item no banco de dados com os dados passados no "body"|
| PUT       | /itens | Altera um item existente no banco de dados com os dados passados no "body"|
| DELETE       | /itens/:id | Deleta um item do banco de dados correspondente ao parâmetro "id" da url|

- POST
Body:
```
{
    "item": "nome-do-item",
    "preco": 5
}
```

- PUT
Body:
```
  {
    "id": 1,
    "preco": 10
  }
```

# Rodando o projeto

Para rodar o projeto deve-se definir as configurações de conexão com o banco de dados como descrito nesse link: https://typeorm.io/#/using-ormconfig

# Quem fez o projeto?

O projeto foi inteiramente produzido por mim, Erik Chagas Rozal, Desenvolvedor Web Full-Stack.


# Frontend DMCard

## Descrição do projeto

O backedn do desafio de código da DMCard tem 2 entidades, a primeira é a de usuário, onde é feito a autenticação para ter acesso as solicitações de cartão de crédito feitas e segunda entidade é a das solicitações de cartão de crédito.

### Entidades

#### Usuário

1. Atributos

- **name**: nome do usuário
- **username**: username de acesso a conta
- **hash**: aqui fica a hash gerada a partir da password informada na criação do usuário

2. Rotas: [`endpoint`, `METHOD`, `params`]

- **Criar usuário**: [`/users/register`, `POST`, `{name:"", username: "", password: ""}`] -> o acesso a esse endpoint é liberado, assim pode ser criado novos usuários atravez da api
- **Login**: [`/users/authenticate`, `POST`, `{username: "", password: ""}`]
- **Usuário atual**: [`/users/current`, `GET`] -> retorna os dados do usuário autenticado

#### Solicitações de cartão de crédito

1. Atributos

- **name**: Nome da pessoa que está solicitando o cartão de crédito
- **email**: E-mail da pessoa que está solicitando o cartão de crédito
- **cpf**: CPF da pessoa que está solicitando o cartão de crédito
- **phone**: Celular da pessoa que está solicitando o cartão de crédito
- **income**: Renda da pessoa que está solicitando o cartão de crédito
- **score**: Número gerado pela análise de crédito, este valor vai de 1 até 999
- **credit**: Este é o crédito concedido para aquela pessoa, baseado no score da análise de crédito dela.

2. Rotas: [`endpoint`, `METHOD`, `params`]

Para fazer a requisição como usuário autenticado é necessário fazer login, pegar o token e enviar no header como `header["Authorization"] = "Bearer ${token}"`

- **Criar solicitação para cartão de crédito**: [`/credit/request`, `POST`, `{ name: "", email: "", cpf: "", phone: "", income: 0 }`] -> No caso do CPF e celular, deve ser enviado apenas números, para acessar esse endpoint não precisa está autenticado
- **Todas as solicitações de cartão de crédito**: [`/credit/request`, `GET`] -> Retorna todas as solicitações realizadas de cartão de crédito, para acessar este enpoint precisa está autenticado
- **Apenas as solicitações de cartão de crédito que a análise de crédito aprovou**: [`/credit/request/accepted`, `GET`] -> Retorna apenas as solicitações de cartão de crédito que a análise de crédito aprovou, para acessar este enpoint precisa está autenticado
- **Apenas as solicitações de cartão de crédito que a análise de crédito recusou**: [`/credit/request/refused`, `GET`] -> Retorna apenas as solicitações de cartão de crédito que a análise de crédito recusou, para acessar este enpoint precisa está autenticado
- **Excluir solicitação de cartão de crédito**: [`/credit/request/:id`, `DELETE`] -> Exclui a solicitação de cartão de crédito informada pelo id, para acessar este enpoint precisa está autenticado

### Execução

Para executar o projeto é necessário ter o docker e o docker compose. E é necessário executar os seguintes comandos:

```shell
cd /path/to/project
docker-compose build
docker-compose up
```

Depois de fazer isso o projeto vai está executando na port 4000

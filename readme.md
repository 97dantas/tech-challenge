# Como Rodar o Projeto com Docker Compose

Siga os passos abaixo para rodar o projeto utilizando o `docker-compose`:

## Pré-requisitos

- Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.
  - [Instalar Docker](https://docs.docker.com/get-docker/)

## Passos

1. **Clone o repositório** (se ainda não o fez):
   ```bash
   git clone https://github.com/97dantas/tech-challenge
   ```

2. **Suba os containers com o Docker Compose**:
   Execute o comando abaixo na raiz do projeto:
   ```bash
   docker compose up
   ```

3. **Acesse o projeto**:
   - O servidor estará disponível em: [http://localhost:4000](http://localhost:4000)
   - O banco de dados PostgreSQL estará disponível na porta `5432`.
   - O Redis estará disponível na porta `6379`.

4. **Parar os containers**:
   Para parar os containers, utilize o comando:
   ```bash
   docker compose down
   ```

Documentação da API
Esta documentação descreve como consumir os endpoints disponíveis na API. A API utiliza autenticação baseada em tokens JWT para proteger alguns endpoints. Certifique-se de realizar o login para obter o token antes de acessar os endpoints protegidos.

1. Cadastro de Usuário
Endpoint
POST /users

Descrição
Cria um novo usuário.

Headers
Nenhum cabeçalho especial é necessário.

Body
Resposta
201 Created
400 Bad Request
2. Login
Endpoint
POST /auth/login

Descrição
Realiza o login do usuário e retorna um token JWT.

Headers
Nenhum cabeçalho especial é necessário.

Body
Resposta
200 OK
1 vulnerability
400 Bad Request
401 Unauthorized
3. Listar Usuários (Protegido)
Endpoint
GET /users

Descrição
Retorna a lista de todos os usuários.

Headers
Resposta
200 OK
401 Unauthorized
4. Buscar Usuário por Email (Protegido)
Endpoint
GET /users/email/:email

Descrição
Retorna os detalhes de um usuário com base no email.

Headers
Resposta
200 OK
404 Not Found
5. Criar Lista de Desejos
Endpoint
POST /wish-lists

Descrição
Cria uma nova lista de desejos para o usuário autenticado.

Headers
Resposta
201 Created
6. Adicionar Produto à Lista de Desejos
Endpoint
POST /wish-lists/products/:productId

Descrição
Adiciona um produto à lista de desejos do usuário autenticado.

Headers
Resposta
200 OK
7. Remover Produto da Lista de Desejos
Endpoint
DELETE /wish-lists/products/:productId

Descrição
Remove um produto da lista de desejos do usuário autenticado.

Headers
Resposta
200 OK
8. Buscar Lista de Desejos do Usuário
Endpoint
GET /wish-lists

Descrição
Retorna a lista de desejos do usuário autenticado.

Headers
Resposta
200 OK
Observações:
Autenticação: Certifique-se de incluir o token JWT no cabeçalho Authorization para acessar os endpoints protegidos.
Erros comuns:
401 Unauthorized: O token JWT está ausente ou inválido.
404 Not Found: O recurso solicitado não foi encontrado.
400 Bad Request: Os dados enviados na requisição estão incorretos ou incompletos.

# Documentação da API

Este documento descreve como consumir os endpoints da API. A API utiliza JSON para os corpos de requisição e resposta. Alguns endpoints requerem autenticação via token Bearer.

---

## 1. Cadastro de Usuário

### Endpoint
`POST /users`

### Descrição
Registra um novo usuário.

### Corpo da Requisição
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### Resposta
- **201 Created**: Retorna o objeto do usuário criado.
- **400 Bad Request**: Caso algum campo obrigatório esteja ausente.

---

## 2. Login de Usuário

### Endpoint
`POST /auth/login`

### Descrição
Autentica um usuário e retorna um token JWT.

### Corpo da Requisição
```json
{
  "email": "string",
  "password": "string"
}
```

### Resposta
- **200 OK**: Retorna um token.
- **400 Bad Request**: Caso o email ou senha estejam ausentes.
- **401 Unauthorized**: Caso a autenticação falhe.

---

## 3. Endpoints da Lista de Desejos (Autenticado)

### Listar Produtos na Lista de Desejos
**Endpoint**: `GET /wish-list`  
**Descrição**: Obtém a lista de desejos do usuário autenticado.  
**Cabeçalhos**:  
```json
{
  "Authorization": "Bearer <token>"
}
```

### Criar Lista de Desejos
**Endpoint**: `POST /wish-list`  
**Descrição**: Obtém a lista de desejos do usuário autenticado.  
**Cabeçalhos**:  
```json
{
  "Authorization": "Bearer <token>"
}
```

### Adicionar Produto à Lista de Desejos
**Endpoint**: `POST /wish-list/products/:productId`  
**Descrição**: Adiciona um produto à lista de desejos do usuário.  
**Cabeçalhos**:  
```json
{
  "Authorization": "Bearer <token>"
}
```

### Adicionar Produto à Lista de Desejos
**Endpoint**: `POST /wish-list/products/:productId`  
**Descrição**: Adiciona um produto à lista de desejos do usuário.  
**Cabeçalhos**:  
```json
{
  "Authorization": "Bearer <token>"
}
```

### Remover Produto da Lista de Desejos
**Endpoint**: `DELETE /wish-list/products/:productId`  
**Descrição**: Remove um produto da lista de desejos do usuário.  
**Cabeçalhos**:  
```json
{
  "Authorization": "Bearer <token>"
}
```

---

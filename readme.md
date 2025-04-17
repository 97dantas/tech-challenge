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

# Documentação da API

Este documento descreve como consumir os endpoints da API. Utiliza JSON para os corpos de requisição e resposta. Alguns endpoints requerem autenticação via token Bearer.

---

## 1. Cadastro de Usuário

### Endpoint
`POST /user`

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


### Criar Lista de Desejos
**Endpoint**: `POST /wish-list`  
**Descrição**: Obtém a lista de desejos do usuário autenticado.  
**Cabeçalhos**:
```json
{
  "Authorization": "Bearer <token>"
}
```

### Listar Produtos na Lista de Desejos
**Endpoint**: `GET /wish-list`  
**Descrição**: Obtém a lista de desejos do usuário autenticado.  
**Cabeçalhos**:  
```json
{
  "Authorization": "Bearer <token>"
}
```


### Adicionar Produto à Lista de Desejos
**Endpoint**: `POST /wish-list/product/:productId`  
**Descrição**: Adiciona um produto à lista de desejos do usuário.  
**Cabeçalhos**:  
```json
{
  "Authorization": "Bearer <token>"
}
```

### Adicionar Produto à Lista de Desejos
**Endpoint**: `POST /wish-list/product/:productId`  
**Descrição**: Adiciona um produto à lista de desejos do usuário.  
**Cabeçalhos**:  
```json
{
  "Authorization": "Bearer <token>"
}
```

### Remover Produto da Lista de Desejos
**Endpoint**: `DELETE /wish-list/product/:productId`  
**Descrição**: Remove um produto da lista de desejos do usuário.  
**Cabeçalhos**:  
```json
{
  "Authorization": "Bearer <token>"
}
```

---

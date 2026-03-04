# Fast Graphics - User Management API

Sistema completo de gerenciamento de usuários com autenticação JWT e validação usando NestJS e PostgreSQL.

## Pré-requisitos

- Node.js 18+
- PostgreSQL 12+

## Instalação

```bash
npm install
```

## Configuração

Copiar `.env.example` para `.env`:

```bash
cp .env.example .env
```

### Banco de Dados

#### PostgreSQL local

```bash
createdb fast_graphics
```

#### Docker

```bash
docker run --name postgres-fast-graphics \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=fast_graphics \
  -p 5432:5432 \
  -d postgres:15
```

## Executar

```bash
npm run start:dev
```

## Endpoints

### Registrar

```bash
POST /users
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

### Login

```bash
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Listar Usuários (requer JWT)

```bash
GET /users
Authorization: Bearer <access_token>
```

### Obter Usuário (requer JWT)

```bash
GET /users/:id
Authorization: Bearer <access_token>
```

### Atualizar Usuário (requer JWT)

```bash
PATCH /users/:id
Authorization: Bearer <access_token>
{
  "name": "Jane Doe"
}
```

### Deletar Usuário (requer JWT)

```bash
DELETE /users/:id
Authorization: Bearer <access_token>
```

## Validações

- Email: válido e único
- Senha: mínimo 6 caracteres
- Senhas hasheadas com bcrypt
- JWT expira em 24 horas

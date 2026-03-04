# Fast Graphics - User Management & Service Orders API

Sistema completo de gerenciamento de usuários, clientes e ordens de serviço com autenticação JWT e validação usando NestJS e PostgreSQL.

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

### Autenticação

#### Registrar

```bash
POST /users
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

#### Login

```bash
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Usuários (requer JWT)

#### Listar

```bash
GET /users
Authorization: Bearer <access_token>
```

#### Obter por ID

```bash
GET /users/:id
Authorization: Bearer <access_token>
```

#### Atualizar

```bash
PATCH /users/:id
Authorization: Bearer <access_token>
{
  "name": "Jane Doe"
}
```

#### Deletar

```bash
DELETE /users/:id
Authorization: Bearer <access_token>
```

### Clientes (requer JWT)

#### Criar Cliente

```bash
POST /clients
Authorization: Bearer <access_token>
{
  "name": "Empresa XYZ",
  "phone": "11987654321",
  "email": "contato@empresa.com",
  "address": "Rua das Flores, 123 - São Paulo, SP"
}
```

#### Listar Clientes

```bash
GET /clients
Authorization: Bearer <access_token>
```

#### Obter Cliente por ID

```bash
GET /clients/:id
Authorization: Bearer <access_token>
```

#### Atualizar Cliente

```bash
PATCH /clients/:id
Authorization: Bearer <access_token>
{
  "phone": "11987654322"
}
```

#### Deletar Cliente

```bash
DELETE /clients/:id
Authorization: Bearer <access_token>
```

### Ordens de Serviço (requer JWT)

#### Criar O.S

```bash
POST /os
Authorization: Bearer <access_token>
{
  "serviceType": "adesivo",
  "width": 100,
  "height": 50,
  "vehicle": "Van Branca",
  "arrivalTime": "2024-01-15T10:00:00Z",
  "pickupTime": "2024-01-15T14:00:00Z",
  "clientId": "uuid-do-cliente"
}
```

**Tipos de Serviço:**

- `adesivo`: R$ 35/m²
- `lona`: R$ 45/m²

**Cálculo:**

- Metro quadrado = (largura × altura) / 10000
- Valor total = metro quadrado × valor unitário

#### Listar O.S

```bash
GET /os
Authorization: Bearer <access_token>
```

#### Obter O.S por ID

```bash
GET /os/:id
Authorization: Bearer <access_token>
```

#### Obter O.S por Número Sequencial

```bash
GET /os/sequential/:sequentialId
Authorization: Bearer <access_token>
```

#### Atualizar O.S

```bash
PATCH /os/:id
Authorization: Bearer <access_token>
{
  "serviceType": "lona",
  "width": 120,
  "height": 60
}
```

#### Deletar O.S

```bash
DELETE /os/:id
Authorization: Bearer <access_token>
```

## Validações

### CreateUserDto

- `email`: Email válido e único
- `name`: String obrigatória
- `password`: Mínimo 6 caracteres

### LoginDto

- `email`: Email válido obrigatório
- `password`: String obrigatória

### CreateClientDto

- `name`: String obrigatória
- `phone`: Telefone válido (formato BR)
- `email`: Email válido e único
- `address`: String obrigatória

### CreateOsDto

- `serviceType`: 'adesivo' ou 'lona'
- `width`: Número > 0
- `height`: Número > 0
- `vehicle`: String obrigatória
- `arrivalTime`: Data ISO obrigatória
- `pickupTime`: Data ISO obrigatória
- `clientId`: UUID do cliente obrigatório

## Segurança

- Senhas hasheadas com bcrypt (salt rounds: 10)
- JWT expira em 24 horas
- ValidationPipe ativa com whitelist e forbidNonWhitelisted
- Proteção de rotas com JwtAuthGuard
- O.S vinculada ao funcionário que a criou e ao cliente

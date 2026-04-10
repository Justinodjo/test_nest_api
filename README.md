# 🚀 Users API — NestJS + JWT + Swagger

API REST complète de gestion des utilisateurs avec authentification JWT, contrôle d'accès par rôles (RBAC) et documentation Swagger interactive.

---

## 📦 Stack technique

| Outil | Rôle |
|---|---|
| **NestJS** | Framework backend |
| **Passport + JWT** | Authentification |
| **bcryptjs** | Hachage des mots de passe |
| **class-validator** | Validation des DTOs |
| **Swagger (OpenAPI)** | Documentation auto |

---

## 🗂️ Structure du projet

```
src/
├── auth/
│   ├── dto/auth.dto.ts          # LoginDto, AuthResponseDto
│   ├── auth.controller.ts       # POST /auth/login, GET /auth/me
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── jwt.strategy.ts          # Stratégie Passport JWT
│
├── users/
│   ├── dto/user.dto.ts          # CreateUserDto, UpdateUserDto, UserResponseDto
│   ├── user.entity.ts           # Entité User + enum UserRole
│   ├── users.controller.ts      # CRUD complet avec Swagger
│   ├── users.module.ts
│   └── users.service.ts         # Logique métier + stockage mémoire
│
├── common/
│   ├── guards/
│   │   ├── jwt-auth.guard.ts    # Guard JWT global
│   │   └── roles.guard.ts       # Guard RBAC (rôles)
│   ├── decorators/
│   │   └── roles.decorator.ts   # @Roles() decorator
│   └── filters/
│       └── http-exception.filter.ts
│
├── app.module.ts
└── main.ts                      # Bootstrap + config Swagger
```

---

## ⚙️ Installation & Démarrage

```bash
npm install
cp .env.example .env
npm run start:dev
```

---

## 🌐 URLs

| URL | Description |
|---|---|
| `http://localhost:3000/api/v1` | Base URL |
| `http://localhost:3000/api/docs` | Swagger UI |
| `https://dev.odjo.tech/api/docs` | Swagger UI |

---

## 🔐 Compte admin par défaut

| Email | Mot de passe | Rôle |
|---|---|---|
| `admin@example.com` | `Admin@1234` | `admin` |

---

## 📋 Endpoints

| Méthode | Endpoint | Auth | Rôle | Description |
|---|---|---|---|---|
| `POST` | `/auth/login` | ❌ | - | Connexion → JWT |
| `GET` | `/auth/me` | ✅ | any | Mon profil |
| `POST` | `/users/register` | ❌ | - | Inscription |
| `GET` | `/users` | ✅ | admin | Tous les users |
| `GET` | `/users/:id` | ✅ | any | Un user |
| `PUT` | `/users/:id` | ✅ | owner/admin | Modifier |
| `DELETE` | `/users/:id` | ✅ | owner/admin | Supprimer |

---

## 🛡️ Sécurité

- ✅ Hachage **bcrypt** (salt 10)
- ✅ **JWT** avec expiration
- ✅ **RBAC** admin/user
- ✅ Validation stricte (`whitelist: true`)
- ✅ Messages d'erreur neutres
- ✅ Filtre global d'exceptions
- ✅ **CORS** configurable

> ⚠️ En production, changez `JWT_SECRET` dans `.env` par une chaîne aléatoire longue et sécurisée.

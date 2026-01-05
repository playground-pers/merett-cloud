# Sprint 1: Fundamentos y Autenticación

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Sprint** | 01 |
| **Nombre** | Fundamentos y Autenticación |
| **Estado** | ⚪ Planificado |
| **Inicio** | TBD |
| **Fin** | TBD |
| **Duración** | 2 semanas |

---

## 🎯 Objetivo del Sprint

Establecer la base del proyecto Merett Cloud PWA con Next.js 15, configurar el entorno de desarrollo con Docker, implementar el sistema completo de autenticación con NextAuth.js, y crear las páginas fundamentales de usuario (login, registro, perfil).

**Valor entregado:** Sistema de autenticación funcional, proyecto base configurado, y capacidad para que usuarios se registren e inicien sesión.

---

## 📊 Épicas Relacionadas

| Épica | Porcentaje en este Sprint |
|-------|--------------------------|
| EPIC-01: Autenticación y Gestión de Usuario | 80% |
| EPIC-02: PWA Setup | 20% |

---

## 📝 Tareas del Sprint

### 🔴 Alta Prioridad - Project Setup

- [ ] **TASK-001**: Inicializar proyecto Next.js 15 con TypeScript
  - Épica: EPIC-01
  - Estimación: 2h
  - Asignado: @dev
  - **Criterios de aceptación**:
    - [ ] Proyecto Next.js 15 creado con App Router
    - [ ] TypeScript configurado (tsconfig.json)
    - [ ] Estructura de carpetas creada según arquitectura
    - [ ] package.json con scripts básicos
  - **Notas**: `npx create-next-app@latest frontend --typescript --tailwind --app`

- [ ] **TASK-002**: Configurar Tailwind CSS + shadcn/ui
  - Épica: EPIC-01
  - Estimación: 3h
  - Asignado: @dev
  - **Criterios de aceptación**:
    - [ ] Tailwind CSS 4.x configurado
    - [ ] shadcn/ui inicializado
    - [ ] Componentes base instalados (button, input, form, dialog)
    - [ ] Tema personalizado configurado
    - [ ] CSS variables definidas
  - **Notas**: `npx shadcn@latest init`

- [ ] **TASK-003**: Setup Docker Compose para desarrollo
  - Épica: EPIC-01
  - Estimación: 4h
  - Asignado: @dev
  - **Criterios de aceptación**:
    - [ ] docker-compose.yml en raíz del proyecto
    - [ ] Servicio frontend (Next.js) configurado - Puerto 3679
    - [ ] Servicio backend (Express) configurado - Puerto 4578
    - [ ] PostgreSQL configurado - Puerto 5432
    - [ ] Servicios de monitoreo configurados (Grafana, Prometheus, AlertManager)
    - [ ] Hot reload funcionando en desarrollo
    - [ ] Variables de entorno configuradas
  - **Notas**: Ver `6-deployment-strategy.md` para configuración

- [ ] **TASK-004**: Configurar ESLint + Prettier + Husky
  - Épica: EPIC-01
  - Estimación: 2h
  - Asignado: @dev
  - **Criterios de aceptación**:
    - [ ] ESLint 9.x configurado con reglas Next.js
    - [ ] Prettier 3.x configurado
    - [ ] Husky 9.x con pre-commit hooks
    - [ ] lint-staged para archivos staged
    - [ ] Scripts en package.json: lint, format, type-check

### 🔴 Alta Prioridad - Backend Auth

- [ ] **TASK-005**: Configurar PostgreSQL + Prisma
  - Épica: EPIC-01
  - Estimación: 3h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] Prisma 6.x instalado
    - [ ] Schema.prisma con modelo User
    - [ ] Migración inicial creada
    - [ ] Prisma Client generado
    - [ ] Connection pool configurado
  - **Notas**: Ver `4-database-schema.md` para schema

- [ ] **TASK-006**: Implementar endpoints de autenticación
  - Épica: EPIC-01
  - Estimación: 6h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] POST /api/v1/auth/signup
    - [ ] POST /api/v1/auth/login
    - [ ] POST /api/v1/auth/logout
    - [ ] POST /api/v1/auth/refresh
    - [ ] POST /api/v1/auth/forgot-password
    - [ ] POST /api/v1/auth/reset-password
    - [ ] JWT token generation (access + refresh)
    - [ ] Password hashing con bcrypt
    - [ ] Validation con express-validator
  - **Notas**: Ver `5-api-specification.md` para especificaciones

- [ ] **TASK-007**: Configurar middleware de autenticación
  - Épica: EPIC-01
  - Estimación: 3h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] Middleware para verificar JWT
    - [ ] Middleware para refresh token
    - [ ] Manejo de errores de auth (401, 403)
    - [ ] Rate limiting específico para auth
  - **Notas**: Ya existe en express/src/middleware/authMiddleware.ts - adaptar

### 🔴 Alta Prioridad - Frontend Auth

- [ ] **TASK-008**: Configurar NextAuth.js
  - Épica: EPIC-01
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] NextAuth.js 5.x instalado
    - [ ] Configuración en app/api/auth/[...nextauth]/route.ts
    - [ ] Credentials provider configurado
    - [ ] JWT strategy configurado
    - [ ] Session handling con cookies
    - [ ] Environment variables configuradas
  - **Notas**: Integrar con backend Express en puerto 4578

- [ ] **TASK-009**: Crear páginas de autenticación
  - Épica: EPIC-01
  - Estimación: 6h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Página /login con form responsive
    - [ ] Página /register con form y validación
    - [ ] Página /forgot-password
    - [ ] Página /reset-password con token
    - [ ] Manejo de errores visible
    - [ ] Loading states
    - [ ] Redirección automática después de login
  - **Notas**: Usar shadcn/ui components

- [ ] **TASK-010**: Implementar forms con React Hook Form + Zod
  - Épica: EPIC-01
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] React Hook Form 7.x configurado
    - [ ] Schemas Zod para login, register, reset
    - [ ] Validación en tiempo real
    - [ ] Mensajes de error informativos
    - [ ] Componente AuthForm reutilizable
  - **Notas**: Integrar con @hookform/resolvers

- [ ] **TASK-011**: Crear auth store con Zustand
  - Épica: EPIC-01
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] lib/stores/authStore.ts creado
    - [ ] Estado: user, isAuthenticated, isLoading
    - [ ] Actions: login, logout, register, refreshToken
    - [ ] Persist en cookies (NextAuth maneja)
    - [ ] Hook useAuth() personalizado
  - **Notas**: Zustand 5.x

### 🟡 Media Prioridad - Profile

- [ ] **TASK-012**: Crear página de perfil de usuario
  - Épica: EPIC-01
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Página /dashboard/settings/profile
    - [ ] Mostrar info del usuario (nombre, email, avatar)
    - [ ] Form para editar perfil
    - [ ] Cambio de contraseña
    - [ ] Tabs para diferentes secciones
  - **Notas**: Usar shadcn/ui Tabs component

- [ ] **TASK-013**: Implementar upload de avatar
  - Épica: EPIC-01
  - Estimación: 3h
  - Asignado: @fullstack
  - **Criterios de aceptación**:
    - [ ] Backend: POST /api/v1/users/me/profile-picture
    - [ ] Frontend: Upload component con preview
    - [ ] Crop de imagen (opcional)
    - [ ] Compresión client-side
    - [ ] Actualización inmediata en UI
  - **Notas**: browser-image-compression

- [ ] **TASK-014**: Endpoint de perfil de usuario
  - Épica: EPIC-01
  - Estimación: 2h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] GET /api/v1/users/me
    - [ ] PATCH /api/v1/users/me
    - [ ] POST /api/v1/users/me/change-password
    - [ ] Validación de datos
  - **Notas**: Ya existe en express/src - revisar y adaptar

### 🟡 Media Prioridad - Testing & Docs

- [ ] **TASK-015**: Setup testing framework
  - Épica: EPIC-01
  - Estimación: 3h
  - Asignado: @dev
  - **Criterios de aceptación**:
    - [ ] Jest 29.x configurado para frontend y backend
    - [ ] React Testing Library configurado
    - [ ] Supertest para backend
    - [ ] Scripts de test en package.json
    - [ ] Coverage configurado (target 70%)
  - **Notas**: jest.config.js en ambos proyectos

- [ ] **TASK-016**: Tests unitarios de autenticación
  - Épica: EPIC-01
  - Estimación: 4h
  - Asignado: @dev
  - **Criterios de aceptación**:
    - [ ] Tests para auth.service.ts (backend)
    - [ ] Tests para auth controllers
    - [ ] Tests para auth middleware
    - [ ] Tests para validaciones
    - [ ] Coverage > 80% en módulos de auth
  - **Notas**: Usar @faker-js/faker para datos de prueba

### 🟢 Baja Prioridad - Polish

- [ ] **TASK-017**: Crear componentes UI base
  - Épica: EPIC-01
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Button variants (primary, secondary, outline, ghost)
    - [ ] Input component con error states
    - [ ] Label component
    - [ ] Card component
    - [ ] Loading spinner
    - [ ] Toast notifications (sonner)
  - **Notas**: Usar shadcn/ui como base

- [ ] **TASK-018**: Setup de variables de entorno
  - Épica: EPIC-01
  - Estimación: 2h
  - Asignado: @dev
  - **Criterios de aceptación**:
    - [ ] .env.example en frontend y backend
    - [ ] .env.local.example para desarrollo
    - [ ] Documentación de variables requeridas
    - [ ] Validación de env vars al iniciar
  - **Notas**: next-env.d.ts para TypeScript

---

## 📈 Progreso

| Métrica | Valor |
|---------|-------|
| **Tareas Totales** | 18 |
| **Completadas** | 0 |
| **En Progreso** | 0 |
| **Bloqueadas** | 0 |
| **Progreso** | 0% |

### Distribución por Prioridad

```
Alta Prioridad:    11 tareas (61%)
Media Prioridad:    5 tareas (28%)
Baja Prioridad:     2 tareas (11%)
```

### Por Área

```
Setup/Config:       5 tareas
Backend:            4 tareas
Frontend:           6 tareas
Testing:            2 tareas
Polish:             1 tarea
```

---

## 🚫 Bloqueantes

| ID | Descripción | Impacto | Responsable | Estado |
|----|-------------|---------|-------------|--------|
| - | Sin bloqueantes actualmente | - | - | - |

---

## 🎯 Definition of Done

Para que este sprint se considere completado, debe cumplir:

### Funcionalidad
- ✅ Usuario puede registrarse con email/password
- ✅ Usuario puede iniciar sesión
- ✅ Usuario puede recuperar contraseña
- ✅ Usuario puede ver y editar su perfil
- ✅ Usuario puede cerrar sesión
- ✅ Sesión persiste entre recargas

### Técnico
- ✅ Proyecto Next.js 15 configurado y funcionando
- ✅ Docker Compose levanta todos los servicios
- ✅ Backend Express conectado a PostgreSQL
- ✅ JWT authentication funcionando
- ✅ Tests unitarios pasando (coverage > 70%)
- ✅ ESLint sin errores
- ✅ TypeScript sin errores

### UX/UI
- ✅ Diseño responsive (mobile, tablet, desktop)
- ✅ Forms con validación en tiempo real
- ✅ Loading states visibles
- ✅ Error messages claros
- ✅ Success feedback

---

## 📅 Daily Log

### Inicio del Sprint (TBD)
- Sprint iniciado
- Tareas asignadas
- Ambiente de desarrollo configurado

---

## 🔄 Retrospectiva

### ✅ ¿Qué salió bien?
- (A completar al finalizar sprint)

### ❌ ¿Qué se puede mejorar?
- (A completar al finalizar sprint)

### 💡 Acciones de Mejora
- [ ] (A definir después de retrospectiva)

---

## 📊 Métricas Finales

| Métrica | Planificado | Real |
|---------|-------------|------|
| Tareas | 18 | - |
| Días | 14 | - |
| Velocidad | - | - pts/día |

---

## 📦 Entregables del Sprint

1. ✅ Proyecto Next.js configurado y funcionando en localhost:3679
2. ✅ Docker Compose con todos los servicios corriendo
3. ✅ Sistema de autenticación completo (backend + frontend)
4. ✅ Páginas: /login, /register, /forgot-password, /dashboard/settings/profile
5. ✅ Auth store funcionando con Zustand
6. ✅ Tests unitarios de auth con coverage > 70%
7. ✅ README actualizado con instrucciones de setup

---

## 🔗 Recursos

### Documentación
- `.project/1-high-level.md` - Visión general
- `.project/2-architecture.md` - Arquitectura
- `.project/3-tech-stack.md` - Tecnologías
- `.project/5-api-specification.md` - API endpoints

### Guías Técnicas
- [Next.js 15 Docs](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Prisma Docs](https://www.prisma.io/docs)

---

## 📝 Notas

- Este es el sprint fundamental que establece las bases del proyecto
- Es crítico tener el setup correcto desde el inicio
- No subestimar el tiempo de configuración inicial
- Validar que Docker funciona correctamente en todos los ambientes
- Probar la autenticación exhaustivamente antes de continuar

---

## ⚡ Quick Start

```bash
# Clonar/iniciar proyecto
cd /var/www/merett-cloud

# Levantar servicios con Docker
docker-compose up -d

# Acceder a servicios
Frontend:    http://localhost:3679
Backend:     http://localhost:4578
Grafana:     http://localhost:3847
Prometheus:  http://localhost:9287
PostgreSQL:  localhost:5432

# Logs
docker-compose logs -f frontend
docker-compose logs -f backend

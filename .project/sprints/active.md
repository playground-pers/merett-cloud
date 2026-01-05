# 🎯 Sprint Activo: Sprint 1

## 📋 Sprint Actual

| Campo | Valor |
|-------|-------|
| **Sprint** | 01 |
| **Nombre** | Fundamentos y Autenticación |
| **Estado** | 🟡 Listo para Iniciar |
| **Inicio** | Pendiente |
| **Fin** | Pendiente |
| **Duración** | 2 semanas |

---

## 🎯 Objetivo del Sprint

Establecer la base del proyecto Merett Cloud PWA con Next.js 15, configurar el entorno de desarrollo con Docker, implementar el sistema completo de autenticación con NextAuth.js, y crear las páginas fundamentales de usuario (login, registro, perfil).

---

## 📊 Progreso General

```
Completadas:    ░░░░░░░░░░░░░░░░░░░░  0%  (0/18)
En Progreso:    ░░░░░░░░░░░░░░░░░░░░  0%  (0/18)
Pendientes:     ████████████████████  100% (18/18)
```

---

## 🚀 Próximos Pasos para Iniciar

### 1️⃣ Setup Inicial (Día 1)
- [ ] **TASK-001**: Inicializar proyecto Next.js 15
- [ ] **TASK-002**: Configurar Tailwind CSS + shadcn/ui
- [ ] **TASK-003**: Setup Docker Compose
- [ ] **TASK-004**: Configurar ESLint + Prettier + Husky

### 2️⃣ Backend Auth (Días 2-4)
- [ ] **TASK-005**: Configurar PostgreSQL + Prisma
- [ ] **TASK-006**: Implementar endpoints de autenticación
- [ ] **TASK-007**: Configurar middleware de autenticación

### 3️⃣ Frontend Auth (Días 5-8)
- [ ] **TASK-008**: Configurar NextAuth.js
- [ ] **TASK-009**: Crear páginas de autenticación
- [ ] **TASK-010**: Implementar forms con React Hook Form + Zod
- [ ] **TASK-011**: Crear auth store con Zustand

### 4️⃣ Profile & Testing (Días 9-14)
- [ ] **TASK-012**: Crear página de perfil
- [ ] **TASK-013**: Implementar upload de avatar
- [ ] **TASK-014**: Endpoint de perfil
- [ ] **TASK-015**: Setup testing framework
- [ ] **TASK-016**: Tests unitarios de autenticación
- [ ] **TASK-017**: Crear componentes UI base
- [ ] **TASK-018**: Setup de variables de entorno

---

## 📝 Tareas en Progreso

| ID | Tarea | Asignado | Estado | Progreso |
|----|-------|----------|--------|----------|
| - | Sin tareas iniciadas | - | - | - |

---

## 🚫 Bloqueantes Activos

| ID | Descripción | Impacto | Responsable | Desde |
|----|-------------|---------|-------------|-------|
| - | Sin bloqueantes | - | - | - |

---

## 📦 Entregables del Sprint

Al finalizar este sprint debemos tener:

1. ✅ Proyecto Next.js configurado en localhost:3679
2. ✅ Docker Compose funcionando con todos los servicios
3. ✅ Backend Express conectado a PostgreSQL (puerto 4578)
4. ✅ Sistema de autenticación completo (JWT + NextAuth)
5. ✅ Páginas: /login, /register, /forgot-password, /dashboard/settings/profile
6. ✅ Tests unitarios con coverage > 70%
7. ✅ README con instrucciones de setup

---

## 🔗 Documentación Relevante

### Deben Leerse Antes de Empezar:
1. `.project/1-high-level.md` - Visión general del proyecto
2. `.project/3-tech-stack.md` - Stack tecnológico completo
3. `.project/2-architecture.md` - Arquitectura de la solución
4. `.project/6-deployment-strategy.md` - Docker y deployment
5. `.project/sprints/sprint-1-fundamentos-autenticacion.md` - Detalle del sprint

### Referencias Técnicas:
- [Next.js 15 Docs](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Prisma Docs](https://www.prisma.io/docs)

---

## ⚡ Quick Start Commands

```bash
# Navegar al proyecto
cd /var/www/merett-cloud

# Crear proyecto frontend (TASK-001)
npx create-next-app@latest frontend --typescript --tailwind --app

# Levantar servicios con Docker (TASK-003)
docker-compose up -d

# Verificar que todo funciona
curl http://localhost:3679  # Frontend
curl http://localhost:4578/health  # Backend
curl http://localhost:3847  # Grafana
```

---

## 📊 Métricas del Sprint

| Métrica | Target | Actual |
|---------|--------|--------|
| Tareas Completadas | 18 | 0 |
| Tests Coverage | >70% | - |
| Bugs Encontrados | - | 0 |
| Velocidad | - | - pts/día |

---

## 📅 Ceremonias

### Sprint Planning
- **Fecha**: TBD
- **Duración**: 2 horas
- **Objetivo**: Asignar tareas y estimar esfuerzo

### Daily Standup (Opcional)
- **Frecuencia**: Diaria
- **Duración**: 15 min
- **Formato**: ¿Qué hice? ¿Qué haré? ¿Bloqueantes?

### Sprint Review
- **Fecha**: TBD (fin del sprint)
- **Duración**: 1 hora
- **Objetivo**: Demo de lo completado

### Retrospectiva
- **Fecha**: TBD (fin del sprint)
- **Duración**: 1 hora
- **Objetivo**: Identificar mejoras

---

## 💡 Tips para el Equipo

1. **Leer documentación antes de empezar** - Especialmente 1-high-level.md y 3-tech-stack.md
2. **Seguir puertos configurados** - No usar puertos por defecto
3. **Usar Docker desde el inicio** - Facilita onboarding
4. **Tests desde el principio** - No dejar para el final
5. **Commits pequeños y frecuentes** - Facilita code review
6. **Actualizar este archivo** - Mantener progreso visible

---

## 🔄 Actualización de Estado

Para actualizar el estado del sprint:

1. Marcar tareas completadas en el archivo de sprint correspondiente
2. Mover tareas entre estados en `.project/tasks/`
3. Actualizar métricas de progreso aquí
4. Documentar bloqueantes si aparecen
5. Actualizar daily log en el sprint file

---

## 📞 Contactos

| Rol | Nombre | Responsabilidad |
|-----|--------|----------------|
| Tech Lead | TBD | Arquitectura y decisiones técnicas |
| Frontend Lead | TBD | Next.js, PWA, UI/UX |
| Backend Lead | TBD | Express, PostgreSQL, S3 |
| DevOps | TBD | Docker, CI/CD, Deployment |
| QA | TBD | Testing, Quality assurance |

---

**Última actualización**: 2026-01-05
**Próximo sprint**: Sprint 2 - PWA Setup y Navegación

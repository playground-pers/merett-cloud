# 📋 Sistema de Gestión de Tareas

> Sistema Kanban para tracking de tareas individuales

---

## 🎯 Propósito

Este directorio implementa un sistema Kanban basado en archivos markdown para gestionar tareas de desarrollo. Cada archivo representa un estado en el flujo de trabajo.

---

## 📁 Estructura de Archivos

| Archivo | Estado | Descripción |
|---------|--------|-------------|
| `backlog.md` | 📋 Backlog | Tareas pendientes, priorizadas |
| `in-progress.md` | 🚧 En Progreso | Tareas activamente en desarrollo |
| `review.md` | 🔍 En Revisión | Tareas esperando revisión/PR |
| `completed.md` | ✅ Completado | Tareas terminadas (del sprint actual) |
| `blocked.md` | 🚫 Bloqueado | Tareas con impedimentos |

---

## 🔄 Flujo de Tareas

```
                    ┌─────────────┐
                    │   BACKLOG   │
                    │   📋        │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
             ┌──────│ IN PROGRESS │──────┐
             │      │     🚧      │      │
             │      └──────┬──────┘      │
             │             │             │
             ▼             ▼             ▼
      ┌─────────────┐ ┌─────────────┐
      │   BLOCKED   │ │   REVIEW    │
      │     🚫      │ │     🔍      │
      └──────┬──────┘ └──────┬──────┘
             │             │
             └──────┬──────┘
                    │
                    ▼
             ┌─────────────┐
             │  COMPLETED  │
             │     ✅      │
             └─────────────┘
```

---

## 📄 Template de Tarea

### Formato Completo

```markdown
- [ ] **TASK-XXX**: [Título descriptivo]
  - **Épica**: EPIC-XX
  - **Sprint**: Sprint-XX
  - **Prioridad**: 🔴 Alta / 🟡 Media / 🟢 Baja
  - **Estimación**: Xh / Xd
  - **Asignado**: @usuario / @ai-agent / @pendiente
  - **Creado**: YYYY-MM-DD
  - **Descripción**: [Descripción detallada de la tarea]
  - **Criterios de Aceptación**:
    - [ ] [Criterio 1]
    - [ ] [Criterio 2]
    - [ ] [Criterio 3]
  - **Notas técnicas**: [Consideraciones de implementación]
  - **Dependencias**: TASK-YYY, TASK-ZZZ
```

### Formato Mínimo

```markdown
- [ ] **TASK-XXX**: [Título descriptivo]
  - **Prioridad**: 🔴/🟡/🟢
  - **Estimación**: Xh
```

### Formato para Bugs

```markdown
- [ ] **BUG-XXX**: [Descripción del bug]
  - **Severidad**: 🔴 Crítico / 🟡 Mayor / 🟢 Menor
  - **Reportado**: YYYY-MM-DD
  - **Pasos para reproducir**:
    1. [Paso 1]
    2. [Paso 2]
  - **Comportamiento esperado**: [Qué debería pasar]
  - **Comportamiento actual**: [Qué está pasando]
  - **Ambiente**: [iOS/Android/Web, versión, etc.]
```

---

## 🏷️ Convenciones de ID

| Prefijo | Tipo | Secuencia |
|---------|------|-----------|
| `TASK-` | Tareas de desarrollo | TASK-001, TASK-002, ... |
| `BUG-` | Corrección de bugs | BUG-001, BUG-002, ... |
| `TECH-` | Deuda técnica | TECH-001, TECH-002, ... |
| `SPIKE-` | Investigación | SPIKE-001, SPIKE-002, ... |

---

## 🏷️ Prioridades

| Emoji | Nivel | Criterio | Acción |
|-------|-------|----------|--------|
| 🔴 | **Alta** | Bloqueante, crítico para el sprint | Hacer primero |
| 🟡 | **Media** | Importante, no urgente | Hacer después de Alta |
| 🟢 | **Baja** | Nice to have, mejoras | Hacer si hay tiempo |

---

## 🔄 Cómo Mover Tareas

### De Backlog a In Progress

1. Copiar la tarea completa de `backlog.md`
2. Pegarla en `in-progress.md`
3. Eliminarla de `backlog.md`
4. Actualizar `sprints/active.md` si aplica

### De In Progress a Review

1. Asegurar que los criterios de aceptación están cumplidos
2. Mover la tarea a `review.md`
3. Agregar información del PR si existe

### De Review a Completed

1. Confirmar que pasó la revisión
2. Marcar checkbox principal como completado: `- [x]`
3. Mover a `completed.md`
4. Actualizar progreso en sprint

### A Blocked

1. Mover tarea a `blocked.md`
2. Agregar razón del bloqueo:
   ```markdown
   - **Bloqueado por**: [Razón del bloqueo]
   - **Desde**: YYYY-MM-DD
   - **Acción requerida**: [Qué se necesita para desbloquear]
   ```

---

## 📊 Estructura de Cada Archivo

### backlog.md

```markdown
# 📋 Backlog

> Tareas pendientes priorizadas para futuros sprints

## 🔴 Alta Prioridad

[Tareas críticas]

## 🟡 Media Prioridad

[Tareas importantes]

## 🟢 Baja Prioridad

[Nice to have]

---

## 📊 Resumen

- **Total**: X tareas
- **Alta**: X
- **Media**: X
- **Baja**: X
```

### in-progress.md

```markdown
# 🚧 En Progreso

> Tareas actualmente en desarrollo

## Sprint Actual: Sprint-XX

### @usuario1
- [ ] **TASK-XXX**: [Título]

### @ai-agent
- [ ] **TASK-YYY**: [Título]

### Sin Asignar
- [ ] **TASK-ZZZ**: [Título]

---

## 📊 Resumen

- **Total en progreso**: X tareas
```

### review.md

```markdown
# 🔍 En Revisión

> Tareas esperando revisión de código o QA

## Esperando Revisión

- [ ] **TASK-XXX**: [Título]
  - **PR**: #123
  - **Reviewer**: @nombre
  - **Desde**: YYYY-MM-DD

---

## 📊 Resumen

- **Total en revisión**: X tareas
- **Tiempo promedio en revisión**: X días
```

### completed.md

```markdown
# ✅ Completadas

> Tareas completadas en el sprint actual

## Sprint-XX

- [x] **TASK-XXX**: [Título] - Completado YYYY-MM-DD
- [x] **TASK-YYY**: [Título] - Completado YYYY-MM-DD

---

## 📊 Resumen Sprint-XX

- **Total completadas**: X tareas
- **Puntos completados**: X
```

### blocked.md

```markdown
# 🚫 Bloqueadas

> Tareas con impedimentos que requieren atención

## Bloqueantes Activos

- [ ] **TASK-XXX**: [Título]
  - **Bloqueado por**: [Razón]
  - **Desde**: YYYY-MM-DD
  - **Impacto**: [Qué más bloquea]
  - **Acción requerida**: [Qué se necesita]
  - **Responsable de resolver**: @nombre

---

## 📊 Resumen

- **Total bloqueadas**: X tareas
- **Más antigua**: X días
```

---

## 🤖 Guía para Agentes de IA

### Al Iniciar Trabajo

1. Consultar `../sprints/active.md` para contexto
2. Revisar `in-progress.md` para tareas asignadas
3. Si no hay asignadas, tomar de `backlog.md` por prioridad
4. Verificar `blocked.md` por si hay algo que puedas desbloquear

### Al Tomar una Tarea

1. Mover de `backlog.md` a `in-progress.md`
2. Asignar a `@ai-agent` o tu identificador
3. Actualizar sprint activo si corresponde

### Durante el Desarrollo

- Mantener actualizado el estado de la tarea
- Si encuentras bloqueante, mover a `blocked.md`
- Cumplir TODOS los criterios de aceptación

### Al Completar

1. Verificar criterios de aceptación marcados
2. Mover a `review.md` o `completed.md` según el flujo
3. Marcar como `[x]` completado
4. Actualizar métricas del sprint

### Formato de Actualización

```markdown
**Actualización TASK-XXX** (YYYY-MM-DD)
- Estado: En Progreso → Review
- Cambios: [Descripción de lo realizado]
- Archivos: [Lista de archivos modificados]
- Notas: [Cualquier nota relevante]
```

---

## 📋 Checklist para Nueva Tarea

- [ ] ID único asignado (TASK-XXX)
- [ ] Título descriptivo
- [ ] Épica relacionada (si aplica)
- [ ] Prioridad definida
- [ ] Estimación (horas o puntos)
- [ ] Criterios de aceptación claros
- [ ] Dependencias identificadas
- [ ] Sprint asignado (si corresponde)

---

## 📊 Métricas

### Por Sprint

| Métrica | Valor |
|---------|-------|
| Tareas creadas | X |
| Tareas completadas | X |
| Tareas bloqueadas | X |
| Tiempo promedio en progreso | X días |

### Acumuladas

- **Total tareas históricas**: X
- **Velocidad promedio**: X tareas/sprint
- **Tasa de bloqueo**: X%

---

## 🔗 Archivos Relacionados

- `../sprints/active.md` - Sprint actual
- `../epics/` - Épicas relacionadas
- `../testing/bugs.md` - Bugs reportados

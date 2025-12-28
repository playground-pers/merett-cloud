# 🚀 Gestión de Sprints

> Planificación y tracking de iteraciones de desarrollo

---

## 🎯 Propósito

Los sprints son iteraciones de tiempo fijo (típicamente 1-2 semanas) donde el equipo se compromete a completar un conjunto de tareas. Este directorio contiene:

- Planificación de cada sprint
- Tracking de progreso
- Retrospectivas y aprendizajes

---

## ⭐ Sprint Activo

**Ver: `active.md`** - Siempre consultar este archivo para conocer el contexto actual de trabajo.

---

## 📁 Índice de Sprints

| Sprint | Nombre | Estado | Fechas | Progreso |
|--------|--------|--------|--------|----------|
| Sprint-01 | [Nombre] | 🟢 Completado | DD/MM - DD/MM | 100% |
| Sprint-02 | [Nombre] | 🟡 Activo | DD/MM - DD/MM | 45% |
| Sprint-03 | [Nombre] | ⚪ Planificado | DD/MM - DD/MM | 0% |

---

## 🏷️ Estados de Sprint

| Emoji | Estado | Descripción |
|-------|--------|-------------|
| ⚪ | `Planificado` | Sprint definido pero no iniciado |
| 🟡 | `Activo` | Sprint en ejecución (solo uno a la vez) |
| 🟢 | `Completado` | Sprint finalizado |
| 🔴 | `Cancelado` | Sprint interrumpido (raro) |

---

## 📄 Template de Sprint

Crear un archivo `sprint-XX.md` para cada sprint:

```markdown
# Sprint XX: [Nombre del Sprint]

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Sprint** | XX |
| **Nombre** | [Nombre descriptivo] |
| **Estado** | ⚪ Planificado / 🟡 Activo / 🟢 Completado |
| **Inicio** | YYYY-MM-DD |
| **Fin** | YYYY-MM-DD |
| **Duración** | X días/semanas |

---

## 🎯 Objetivo del Sprint

[Descripción clara de lo que se quiere lograr en este sprint.
¿Qué valor se entrega al final?]

---

## 📊 Épicas Relacionadas

| Épica | Porcentaje en este Sprint |
|-------|--------------------------|
| EPIC-XX | 50% |
| EPIC-YY | 30% |

---

## 📝 Tareas del Sprint

### 🔴 Alta Prioridad

- [ ] **TASK-XXX**: [Título]
  - Épica: EPIC-XX
  - Estimación: Xh
  - Asignado: @nombre

- [ ] **TASK-YYY**: [Título]
  - Épica: EPIC-XX
  - Estimación: Xh
  - Asignado: @nombre

### 🟡 Media Prioridad

- [ ] **TASK-ZZZ**: [Título]
  - Épica: EPIC-YY
  - Estimación: Xh
  - Asignado: @nombre

### 🟢 Baja Prioridad

- [ ] **TASK-AAA**: [Título]
  - Épica: EPIC-YY
  - Estimación: Xh
  - Asignado: @nombre

---

## 📈 Progreso

| Métrica | Valor |
|---------|-------|
| **Tareas Totales** | X |
| **Completadas** | Y |
| **En Progreso** | Z |
| **Bloqueadas** | W |
| **Progreso** | XX% |

### Por Estado

```
Completadas:    ████████░░░░░░░░░░░░  40%
En Progreso:    ████░░░░░░░░░░░░░░░░  20%
Pendientes:     ████████░░░░░░░░░░░░  40%
```

---

## 🚫 Bloqueantes

| ID | Descripción | Impacto | Responsable | Estado |
|----|-------------|---------|-------------|--------|
| - | Sin bloqueantes actualmente | - | - | - |

---

## 📅 Daily Log (Opcional)

### YYYY-MM-DD
- [Qué se completó]
- [Qué está en progreso]
- [Bloqueantes encontrados]

---

## 🔄 Retrospectiva

### ✅ ¿Qué salió bien?

- [Item 1]
- [Item 2]

### ❌ ¿Qué se puede mejorar?

- [Item 1]
- [Item 2]

### 💡 Acciones de Mejora

- [ ] [Acción 1] - Responsable: @nombre
- [ ] [Acción 2] - Responsable: @nombre

---

## 📊 Métricas Finales

| Métrica | Planificado | Real |
|---------|-------------|------|
| Tareas | X | Y |
| Puntos | X | Y |
| Velocidad | - | Z pts/día |

---

## 📝 Notas

[Cualquier nota adicional relevante del sprint]
```

---

## 🔄 Ciclo de Vida del Sprint

```
[Planificación]
    ↓ → Definir objetivo, seleccionar tareas, estimar
[Activo]
    ↓ → Daily updates, tracking de progreso
    ↓ → Resolver bloqueantes
[Completado]
    ↓ → Retrospectiva
    ↓ → Mover tareas incompletas al siguiente sprint
[Siguiente Sprint]
```

---

## 📅 Ceremonias

### Sprint Planning

- **Cuándo**: Inicio del sprint
- **Duración**: 1-2 horas
- **Objetivo**: Definir qué se hará en el sprint
- **Resultado**: Sprint backlog definido

### Daily Standup (Opcional)

- **Cuándo**: Cada día
- **Duración**: 15 minutos máximo
- **Preguntas**:
  - ¿Qué hice ayer?
  - ¿Qué haré hoy?
  - ¿Hay bloqueantes?

### Sprint Review

- **Cuándo**: Fin del sprint
- **Duración**: 30-60 minutos
- **Objetivo**: Demostrar lo completado
- **Resultado**: Feedback de stakeholders

### Retrospectiva

- **Cuándo**: Después del review
- **Duración**: 30-60 minutos
- **Objetivo**: Mejorar el proceso
- **Resultado**: Acciones de mejora

---

## 🤖 Guía para Agentes de IA

### Al Iniciar Trabajo

1. **SIEMPRE** leer `active.md` primero
2. Identificar tareas asignadas o disponibles
3. Verificar prioridades (Alta → Media → Baja)
4. Revisar bloqueantes antes de empezar

### Durante el Trabajo

- Actualizar progreso de tareas
- Reportar bloqueantes inmediatamente
- Seguir el orden de prioridad

### Al Completar Tareas

1. Marcar tarea como completada en el sprint
2. Actualizar `tasks/in-progress.md` → `tasks/completed.md`
3. Actualizar métricas de progreso

### Formato de Actualización

```markdown
### Actualización YYYY-MM-DD

**Completado:**
- TASK-XXX: [Descripción breve]

**En Progreso:**
- TASK-YYY: [Estado actual]

**Bloqueantes:**
- [Ninguno / Descripción del bloqueante]
```

---

## 📊 Métricas de Equipo

### Velocidad Histórica

| Sprint | Puntos Planificados | Puntos Completados |
|--------|--------------------|--------------------|
| Sprint-01 | X | Y |
| Sprint-02 | X | Y |
| **Promedio** | X | Y |

### Capacidad

- **Capacidad por sprint**: [X puntos]
- **Buffer recomendado**: 20% para imprevistos

---

## 🔗 Archivos Relacionados

- `active.md` - Sprint activo actual
- `../tasks/` - Detalle de tareas
- `../epics/` - Épicas relacionadas
- `../1-high-level.md` - Roadmap general

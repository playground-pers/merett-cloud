# 📚 Épicas del Proyecto

> Agrupación de funcionalidades y user stories a nivel de producto

---

## 🎯 Propósito

Las épicas representan grandes bloques de funcionalidad que entregan valor al usuario. Cada épica:

- Agrupa user stories relacionadas
- Define un objetivo de negocio claro
- Puede abarcar múltiples sprints
- Tiene dependencias identificadas

---

## 📁 Índice de Épicas

| ID | Nombre | Estado | Sprint(s) | Progreso |
|----|--------|--------|-----------|----------|
| EPIC-01 | [Nombre de la épica] | 🟡 En Progreso | Sprint 01-02 | 30% |
| EPIC-02 | [Nombre de la épica] | ⚪ Pendiente | Sprint 03 | 0% |

---

## 🏷️ Estados de Épica

| Emoji | Estado | Descripción |
|-------|--------|-------------|
| ⚪ | `Pendiente` | No iniciada |
| 🟡 | `En Progreso` | Al menos una US en desarrollo |
| 🟢 | `Completada` | Todas las US completadas |
| 🔴 | `Bloqueada` | Tiene impedimentos |

---

## 📄 Template de Épica

Crear un archivo por cada épica siguiendo esta estructura:

```markdown
# EPIC-XX: [Nombre de la Épica]

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **ID** | EPIC-XX |
| **Nombre** | [Nombre descriptivo] |
| **Estado** | ⚪ Pendiente / 🟡 En Progreso / 🟢 Completada |
| **Sprints** | Sprint XX - Sprint YY |
| **Owner** | [Nombre del responsable] |

---

## 🎯 Objetivo

[Descripción clara del objetivo de negocio que esta épica resuelve.
¿Qué problema soluciona? ¿Qué valor entrega al usuario?]

---

## 📝 User Stories

### US-XXX: [Título de la User Story]

**Como** [rol/persona]
**Quiero** [acción/funcionalidad]
**Para** [beneficio/valor]

**Criterios de Aceptación:**
- [ ] [Criterio 1]
- [ ] [Criterio 2]
- [ ] [Criterio 3]

**Estimación:** [X puntos]
**Prioridad:** 🔴 Alta / 🟡 Media / 🟢 Baja
**Sprint:** Sprint-XX

---

### US-YYY: [Título de la User Story]

**Como** [rol/persona]
**Quiero** [acción/funcionalidad]
**Para** [beneficio/valor]

**Criterios de Aceptación:**
- [ ] [Criterio 1]
- [ ] [Criterio 2]

**Estimación:** [X puntos]
**Prioridad:** 🔴 Alta / 🟡 Media / 🟢 Baja
**Sprint:** Sprint-XX

---

## 🔗 Dependencias

### Requiere (Épicas anteriores)

- [ ] **EPIC-XX**: [Descripción de la dependencia]
- [ ] **EPIC-YY**: [Descripción de la dependencia]

### Bloquea (Épicas posteriores)

- **EPIC-ZZ**: [Qué bloquea de esa épica]

### Dependencias Técnicas

- [Servicio/API externa]
- [Configuración requerida]

---

## 🏗️ Componentes Técnicos

### Nuevos Archivos a Crear

| Tipo | Ubicación | Descripción |
|------|-----------|-------------|
| Scene | `scenes/[nombre]/` | [Descripción] |
| Component | `components/elements/[Nombre]/` | [Descripción] |
| Slice | `slices/[nombre].slice.ts` | [Descripción] |
| Service | `services/[nombre].service.ts` | [Descripción] |
| Type | `types/[nombre].ts` | [Descripción] |

### Archivos a Modificar

| Archivo | Cambios |
|---------|---------|
| `[ruta/archivo]` | [Descripción del cambio] |

---

## 📊 Progreso

| User Story | Estado | Asignado | Sprint |
|------------|--------|----------|--------|
| US-XXX | 🟢 Done | @dev | Sprint-01 |
| US-YYY | 🟡 In Progress | @dev | Sprint-01 |
| US-ZZZ | ⚪ Todo | - | Sprint-02 |

**Progreso Total:** X/Y User Stories (Z%)

---

## ⚠️ Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| [Descripción del riesgo] | Alta/Media/Baja | Alto/Medio/Bajo | [Plan de mitigación] |

---

## 📝 Notas

[Cualquier nota adicional relevante para la épica]

---

## 📅 Historial

| Fecha | Cambio | Autor |
|-------|--------|-------|
| YYYY-MM-DD | Creación de la épica | @nombre |
| YYYY-MM-DD | US-XXX completada | @nombre |
```

---

## 🔄 Ciclo de Vida de una Épica

```
[Propuesta]
    ↓
[Refinamiento] → Definir US, estimar, identificar dependencias
    ↓
[Planificación] → Asignar a sprint(s)
    ↓
[En Progreso] → Desarrollo de user stories
    ↓
[Completada] → Todas las US entregadas
```

---

## 🤖 Guía para Agentes de IA

### Al Trabajar en una Épica

1. **Leer** la épica completa para entender el contexto
2. **Identificar** la user story específica a implementar
3. **Verificar** dependencias antes de empezar
4. **Seguir** la lista de componentes técnicos
5. **Actualizar** progreso al completar

### Al Crear Código Relacionado

- Referenciar el ID de la épica en comentarios si es relevante
- Seguir la estructura de archivos propuesta
- Cumplir todos los criterios de aceptación de la US

### Actualizaciones Requeridas

Al completar una user story:
1. Marcar checkboxes de criterios de aceptación
2. Actualizar estado en tabla de progreso
3. Actualizar porcentaje de progreso total

---

## 📋 Checklist para Nueva Épica

- [ ] Objetivo de negocio claro
- [ ] User stories definidas con formato correcto
- [ ] Criterios de aceptación específicos y medibles
- [ ] Dependencias identificadas
- [ ] Componentes técnicos listados
- [ ] Estimación inicial
- [ ] Riesgos evaluados
- [ ] Asignada a sprint(s)

---

## 🔗 Archivos Relacionados

- `../1-high-level.md` - Visión general del proyecto
- `../sprints/` - Planificación de sprints
- `../tasks/` - Tareas derivadas de las épicas
- `../2-architecture.md` - Arquitectura técnica

---

## 📊 Métricas

- **Total de Épicas**: [número]
- **Completadas**: [número]
- **En Progreso**: [número]
- **Pendientes**: [número]
- **Velocidad Promedio**: [US/sprint]

# 📋 .project/ - Framework de Gestión para Desarrollo Colaborativo IA-Humano

> **Marco de trabajo agnóstico para gestión de proyectos de software optimizado para colaboración entre desarrolladores humanos y agentes de IA**

---

## 🎯 Propósito

Este directorio establece un sistema estructurado de documentación y gestión de proyectos diseñado específicamente para:

1. **Trabajo híbrido IA-Humano**: Permite que agentes de IA (Cline, Cursor, Claude, GPT, etc.) comprendan el contexto del proyecto y tomen decisiones alineadas
2. **Onboarding rápido**: Cualquier desarrollador o agente puede entender el proyecto leyendo los archivos en orden
3. **Trazabilidad**: Registro de decisiones, cambios y progreso
4. **Consistencia**: Reglas claras que aseguran uniformidad en el desarrollo

---

## 🤖 Protocolo para Agentes de IA

### Secuencia de Lectura Obligatoria

Antes de ejecutar cualquier tarea, el agente DEBE leer en este orden:

| Paso | Archivo | Propósito |
|------|---------|-----------|
| 1 | `1-high-level.md` | Entender visión, alcance y roadmap del proyecto |
| 2 | `3-tech-stack.md` | Conocer tecnologías aprobadas y restricciones |
| 3 | `2-architecture.md` | Comprender estructura del código y patrones |
| 4 | `design/design-system.md` | Reglas de UI/UX y estilos |
| 5 | `sprints/active.md` | Sprint actual y contexto de trabajo |
| 6 | `tasks/in-progress.md` | Tareas asignadas actualmente |

### Reglas de Decisión

```
SI necesitas elegir una librería       → CONSULTA 3-tech-stack.md
SI necesitas crear un componente UI    → CONSULTA design/design-system.md
SI necesitas modificar arquitectura    → CONSULTA 2-architecture.md + decisions/
SI necesitas estilo de código          → CONSULTA .cursor/rules/ o guías del proyecto
SI la decisión no está documentada     → PROPÓN y DOCUMENTA en decisions/
```

### Actualizaciones Requeridas

Al completar una tarea, el agente DEBE:

1. Actualizar estado en `tasks/` (mover entre archivos según estado)
2. Actualizar checklist en sprint activo si aplica
3. Documentar decisiones técnicas tomadas en `decisions/` si son significativas

---

## 📁 Estructura del Directorio

### Documentación Principal (Archivos Numerados)

Los archivos numerados son la **fuente de verdad** del proyecto. Se leen en orden.

```
.project/
├── 1-high-level.md           # Visión, objetivos, épicas, roadmap
├── 2-architecture.md         # Arquitectura técnica y estructura
├── 3-tech-stack.md           # Tecnologías, librerías, herramientas
├── 4-database-schema.md      # Modelos de datos y relaciones
├── 5-api-specification.md    # Contratos de API
└── 6-deployment-strategy.md  # CI/CD, ambientes, deployment
```

| Archivo | Contenido | Audiencia Principal |
|---------|-----------|---------------------|
| `1-high-level.md` | Visión del producto, épicas, sprints planificados, métricas de éxito | Todos |
| `2-architecture.md` | Diagramas, patrones, estructura de carpetas, decisiones de diseño | Desarrolladores, Agentes |
| `3-tech-stack.md` | Stack aprobado, versiones, librerías permitidas/prohibidas | Desarrolladores, Agentes |
| `4-database-schema.md` | ERD, modelos, índices, migraciones | Backend, Agentes |
| `5-api-specification.md` | Endpoints, request/response, autenticación | Frontend/Backend, Agentes |
| `6-deployment-strategy.md` | Ambientes, pipelines, configuración | DevOps, Agentes |

---

### Subdirectorios de Gestión

#### `/decisions` - Architecture Decision Records (ADRs)

Registro inmutable de decisiones técnicas importantes.

```
decisions/
├── README.md                 # Template y guía
├── ADR-001-[titulo].md      # Primera decisión
├── ADR-002-[titulo].md      # Segunda decisión
└── ...
```

**Cuándo crear un ADR:**

- Elegir entre tecnologías/frameworks
- Cambiar patrones arquitectónicos
- Decisiones que afectan múltiples componentes
- Trade-offs significativos

**Estados de ADR:** `Propuesto` → `Aceptado` | `Rechazado` | `Deprecado`

---

#### `/design` - Sistema de Diseño

Guías visuales y de UX que garantizan consistencia.

```
design/
├── design-system.md          # Sistema de diseño completo
├── colors.md                 # Paleta de colores
├── typography.md             # Tipografía y escalas
├── spacing.md                # Sistema de espaciado
├── components.md             # Catálogo de componentes
├── icons.md                  # Iconografía
├── animations.md             # Animaciones y transiciones
└── screens/                  # Specs por pantalla (opcional)
```

**Para agentes:**

- NUNCA inventar colores → usar `colors.md`
- NUNCA crear componentes duplicados → verificar `components.md`
- SIEMPRE seguir espaciado de `spacing.md`

---

#### `/epics` - Épicas y User Stories

Agrupación de funcionalidades a nivel de producto.

```
epics/
├── README.md                 # Índice y template
├── epic-XX-[nombre].md      # Una épica por archivo
└── ...
```

**Contenido de cada épica:**

- Descripción y objetivo de negocio
- User stories con criterios de aceptación
- Dependencias con otras épicas
- Componentes técnicos involucrados

---

#### `/sprints` - Gestión de Sprints

Planificación y tracking de iteraciones.

```
sprints/
├── README.md                 # Índice y estado general
├── active.md                 # ⭐ SPRINT ACTIVO - Siempre consultar
├── sprint-XX.md              # Sprints planificados/completados
└── ...
```

**`active.md` es crítico:**

- Define el contexto actual de trabajo
- Lista tareas en progreso
- Muestra bloqueantes
- Es el punto de entrada para agentes

---

#### `/tasks` - Sistema Kanban

Tracking de tareas individuales.

```
tasks/
├── README.md                 # Templates y guía de uso
├── backlog.md                # 📋 Pendientes priorizados
├── in-progress.md            # 🚧 En desarrollo activo
├── review.md                 # 🔍 En revisión/PR
├── completed.md              # ✅ Completadas (archivo de sprint)
└── blocked.md                # 🚫 Bloqueadas con razón
```

**Flujo de tareas:**

```
backlog.md → in-progress.md → review.md → completed.md
                ↓
            blocked.md (si hay bloqueante)
```

---

#### `/testing` - Calidad y QA

Estrategia de testing y tracking de bugs.

```
testing/
├── README.md                 # Estrategia de testing
├── test-cases.md             # Casos de prueba por feature
├── coverage.md               # Requisitos de cobertura
└── bugs.md                   # Bug tracking
```

---

## 🔄 Workflows

### Workflow: Nueva Sesión de Trabajo

```
[Inicio]
    ↓
[Leer 1-high-level.md] → Entender visión
    ↓
[Leer 3-tech-stack.md] → Conocer restricciones
    ↓
[Leer sprints/active.md] → Contexto actual
    ↓
[Identificar tarea en tasks/] → Qué hacer
    ↓
[Leer épica relacionada] → Contexto funcional
    ↓
[Consultar design/ si es UI] → Reglas visuales
    ↓
[Implementar]
    ↓
[Actualizar tasks/] → Registrar progreso
```

### Workflow: Crear Nuevo Componente

1. **Verificar** que no existe en `design/components.md`
2. **Seguir** reglas de `design/design-system.md`
3. **Usar** colores/tipografía del tema
4. **Documentar** nuevo componente en `design/components.md`
5. **Crear** tests según `testing/README.md`

### Workflow: Decisión Técnica

1. **Buscar** si existe ADR previo en `decisions/`
2. **Si existe**: Seguir la decisión documentada
3. **Si no existe**:
   - Crear nuevo ADR con template
   - Documentar alternativas
   - Marcar como `Propuesto`
   - Esperar aprobación antes de implementar

### Workflow: Completar Tarea

1. **Mover** tarea de `in-progress.md` a `review.md`
2. **Actualizar** checkboxes de criterios de aceptación
3. **Actualizar** progreso en `sprints/active.md`
4. **Crear** ADR si hubo decisiones técnicas significativas

---

## 🏷️ Convenciones de Nomenclatura

### IDs

| Prefijo | Uso | Ejemplo |
|---------|-----|---------|
| `TASK-` | Tareas técnicas | TASK-042 |
| `US-` | User Stories | US-015 |
| `BUG-` | Bugs | BUG-007 |
| `ADR-` | Decisiones | ADR-003 |
| `EPIC-` | Épicas | EPIC-02 |

### Estados

| Emoji | Estado | Descripción |
|-------|--------|-------------|
| ⚪ | `Todo` | No iniciado |
| 🟡 | `In Progress` | En desarrollo |
| 🔵 | `Review` | En revisión |
| 🟢 | `Done` | Completado |
| 🔴 | `Blocked` | Bloqueado |

### Prioridades

| Emoji | Prioridad | Criterio |
|-------|-----------|----------|
| 🔴 | `Alta` | Bloqueante o crítico |
| 🟡 | `Media` | Importante, no urgente |
| 🟢 | `Baja` | Mejora, nice-to-have |

---

## 📝 Templates Rápidos

### Template de Tarea

```markdown
- [ ] **TASK-XXX**: [Título descriptivo]
  - **Sprint**: Sprint-XX
  - **Épica**: EPIC-XX
  - **Prioridad**: 🔴/🟡/🟢
  - **Estimación**: Xh/Xd
  - **Asignado**: @usuario | @ai-agent
  - **Descripción**: [Qué se debe hacer]
  - **Criterios de Aceptación**:
    - [ ] Criterio 1
    - [ ] Criterio 2
  - **Notas técnicas**: [Opcional]
```

### Template de ADR

```markdown
# ADR-XXX: [Título]

## Estado
[Propuesto | Aceptado | Rechazado | Deprecado]

## Contexto
[Problema o situación que requiere decisión]

## Decisión
[Decisión tomada]

## Alternativas Consideradas
1. **Opción A**: [Pros/Contras]
2. **Opción B**: [Pros/Contras]

## Consecuencias
- Positivas: [Lista]
- Negativas: [Lista]
```

Ver templates completos en cada subdirectorio (`tasks/README.md`, `decisions/README.md`, etc.)

---

## ❓ FAQ para Agentes

| Pregunta | Respuesta |
|----------|-----------|
| ¿Dónde están las reglas de código? | En `.cursor/rules/` o equivalente del proyecto |
| ¿Qué librerías puedo usar? | Solo las listadas en `3-tech-stack.md` |
| ¿Cómo elijo colores? | Consulta `design/colors.md`, usa theme del proyecto |
| ¿Qué hago si no hay decisión documentada? | Crea un ADR en `decisions/` y espera aprobación |
| ¿Cómo actualizo progreso? | Mueve tareas entre archivos en `tasks/` |
| ¿Cuál es el sprint activo? | Siempre en `sprints/active.md` |
| ¿Dónde veo la arquitectura? | En `2-architecture.md` |
| ¿Cómo documento una decisión? | Usa template en `decisions/README.md` |

---

## 🔗 Integración con el Proyecto

Este framework se conecta con:

- **Código fuente**: Estructura documentada en `2-architecture.md`
- **Guías de código**: `.cursor/rules/` o `CONTRIBUTING.md`
- **Tema visual**: Directorio de tema del proyecto
- **Componentes**: Directorio de componentes
- **Servicios**: Capa de servicios
- **Estado global**: Gestión de estado (Redux, Zustand, etc.)
- **CI/CD**: Documentado en `6-deployment-strategy.md`

---

## 🚀 Quick Start para Nuevos Proyectos

1. Copiar estructura `.project/` al nuevo proyecto
2. Llenar `1-high-level.md` con visión y épicas
3. Definir stack en `3-tech-stack.md`
4. Documentar arquitectura en `2-architecture.md`
5. Crear sistema de diseño en `design/`
6. Crear primer sprint en `sprints/active.md`
7. Poblar backlog inicial en `tasks/backlog.md`

---

**Este framework es agnóstico y funciona para cualquier proyecto de software: web, mobile, backend, fullstack, data, ML, etc.**

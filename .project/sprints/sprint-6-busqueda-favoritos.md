# Sprint 6: Búsqueda y Favoritos

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Sprint** | 06 |
| **Nombre** | Búsqueda y Favoritos |
| **Estado** | ⚪ Planificado |
| **Inicio** | TBD |
| **Fin** | TBD |
| **Duración** | 2 semanas |

---

## 🎯 Objetivo del Sprint

Implementar sistema de búsqueda full-text con filtros avanzados, command palette para acceso rápido, sistema de favoritos, vista de archivos recientes, y capacidades de filtrado/ordenamiento sofisticadas.

**Valor entregado:** Usuarios pueden encontrar archivos rápidamente mediante búsqueda potente, marcar favoritos, y acceder a archivos recientes.

---

## 📊 Épicas Relacionadas

| Épica | Porcentaje en este Sprint |
|-------|--------------------------|
| EPIC-06: Búsqueda y Filtros | 100% |

---

## 📝 Tareas del Sprint

### 🔴 Alta Prioridad - Search Backend

- [ ] **TASK-089**: Implementar full-text search en PostgreSQL
  - Épica: EPIC-06
  - Estimación: 5h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] Usar pg_trgm extension
    - [ ] Columna search_vector (tsvector) en files
    - [ ] Trigger para actualizar search_vector
    - [ ] GIN index en search_vector
    - [ ] Ranking por relevancia (ts_rank)
  - **Notas**: Ver `4-database-schema.md` para setup

- [ ] **TASK-090**: Endpoint de búsqueda con filtros
  - Épica: EPIC-06
  - Estimación: 5h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] GET /api/v1/search?q=term&filters
    - [ ] Filtros: category, dateFrom, dateTo, minSize, maxSize
    - [ ] Sorting: relevancia, fecha, tamaño, nombre
    - [ ] Paginación cursor-based
    - [ ] Performance: < 500ms para 10k archivos
  - **Notas**: Ver `5-api-specification.md`

- [ ] **TASK-091**: Search suggestions/autocomplete
  - Épica: EPIC-06
  - Estimación: 3h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] GET /api/v1/search/suggestions?q=partial
    - [ ] Sugerencias de nombres de archivos
    - [ ] Sugerencias de carpetas
    - [ ] Sugerencias de tags (si existen)
    - [ ] Límite de 10 sugerencias
    - [ ] Respuesta rápida (<100ms)
  - **Notas**: Cache sugerencias frecuentes

### 🔴 Alta Prioridad - Search Frontend

- [ ] **TASK-092**: SearchBar component en header
  - Épica: EPIC-06
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Input con icon y placeholder
    - [ ] Autocomplete dropdown
    - [ ] Debounce en búsqueda (300ms)
    - [ ] Recent searches
    - [ ] Clear search button
    - [ ] Focus con Ctrl+F o /
  - **Notas**: shadcn/ui Command o custom

- [ ] **TASK-093**: Página de resultados de búsqueda
  - Épica: EPIC-06
  - Estimación: 5h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Página /dashboard/search
    - [ ] Lista de resultados con relevancia
    - [ ] Highlight de términos buscados
    - [ ] Empty state informativo
    - [ ] Loading state con skeleton
    - [ ] Infinite scroll o paginación
  - **Notas**: Reusar FileItem component

- [ ] **TASK-094**: FilterPanel component
  - Épica: EPIC-06
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Sidebar o drawer con filtros
    - [ ] Filtro por tipo (checkboxes)
    - [ ] Filtro por fecha (date range picker)
    - [ ] Filtro por tamaño (slider)
    - [ ] Filtro por owner (en compartidos)
    - [ ] Clear all filters button
    - [ ] Active filters chips
  - **Notas**: shadcn/ui Checkbox, DatePicker, Slider

- [ ] **TASK-095**: Search history en IndexedDB
  - Épica: EPIC-06
  - Estimación: 2h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Guardar últimas 20 búsquedas
    - [ ] Mostrar en dropdown al focus
    - [ ] Click para repetir búsqueda
    - [ ] Delete individual
    - [ ] Clear all history
  - **Notas**: Tabla en Dexie DB

- [ ] **TASK-096**: Implementar search.store con Zustand
  - Épica: EPIC-06
  - Estimación: 2h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] lib/stores/searchStore.ts
    - [ ] Estado: query, results, filters, isLoading
    - [ ] Actions: search, setFilters, clearSearch
    - [ ] History management
  - **Notas**: Integrar con React Query

### 🟡 Media Prioridad - Favorites

- [ ] **TASK-097**: Backend - Favorites endpoints
  - Épica: EPIC-06
  - Estimación: 3h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] POST /api/v1/files/:id/favorite (toggle)
    - [ ] GET /api/v1/search/favorites
    - [ ] Tabla favorites o flag en files
    - [ ] Index en is_favorite
  - **Notas**: Ver `5-api-specification.md`

- [ ] **TASK-098**: Frontend - Página de favoritos
  - Épica: EPIC-06
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Página /dashboard/favorites
    - [ ] Lista de archivos favoritos
    - [ ] Star icon en FileItem (toggle)
    - [ ] Sorting options
    - [ ] Empty state
  - **Notas**: Reusar componentes existentes

- [ ] **TASK-099**: Favorites store
  - Épica: EPIC-06
  - Estimación: 2h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] lib/stores/favoritesStore.ts
    - [ ] Estado: favorites, isLoading
    - [ ] Actions: toggleFavorite, loadFavorites
    - [ ] Optimistic UI updates
  - **Notas**: Zustand

### 🟡 Media Prioridad - Recent Files

- [ ] **TASK-100**: Backend - Recent files endpoint
  - Épica: EPIC-06
  - Estimación: 2h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] GET /api/v1/search/recent
    - [ ] Ordenar por last_accessed_at
    - [ ] Límite de 100 archivos
    - [ ] Track access time en cada view
  - **Notas**: Índice en last_accessed_at

- [ ] **TASK-101**: Frontend - Página de recientes
  - Épica: EPIC-06
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Página /dashboard/recent
    - [ ] Lista de archivos recientes
    - [ ] Agrupación por fecha (Hoy, Ayer, Esta semana)
    - [ ] Quick access desde home
  - **Notas**: Reusar FileItem

### 🟡 Media Prioridad - Command Palette

- [ ] **TASK-102**: Implementar command palette con cmdk
  - Épica: EPIC-06
  - Estimación: 5h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] cmdk component integrado
    - [ ] Shortcut: Cmd/Ctrl + K
    - [ ] Quick actions: New folder, Upload, Search
    - [ ] Recent files search
    - [ ] Keyboard navigation (arrows, enter, esc)
    - [ ] Command categories
  - **Notas**: shadcn/ui tiene command component

- [ ] **TASK-103**: Advanced sorting y filtering UI
  - Épica: EPIC-06
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Sort dropdown (nombre, fecha, tamaño)
    - [ ] Order toggle (asc/desc)
    - [ ] Filter chips visibles
    - [ ] Persist filters en URL query params
    - [ ] Clear all button
  - **Notas**: URL debe ser shareable

### 🟢 Baja Prioridad - Tags System

- [ ] **TASK-104**: Tags system backend (opcional)
  - Épica: EPIC-06
  - Estimación: 4h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] Tabla tags y file_tags
    - [ ] CRUD endpoints para tags
    - [ ] Asignar tags a files
    - [ ] Buscar por tags
    - [ ] Tag colors
  - **Notas**: Feature opcional para organización

- [ ] **TASK-105**: Tags UI (opcional)
  - Épica: EPIC-06
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Tag manager en file details
    - [ ] Add/remove tags
    - [ ] Tag autocomplete
    - [ ] Filter by tag
    - [ ] Tag colors en UI
  - **Notas**: shadcn/ui Badge component

---

## 📈 Progreso

| Métrica | Valor |
|---------|-------|
| **Tareas Totales** | 17 |
| **Completadas** | 0 |
| **En Progreso** | 0 |
| **Bloqueadas** | 0 |
| **Progreso** | 0% |

### Distribución por Prioridad

```
Alta Prioridad:     9 tareas (53%)
Media Prioridad:    6 tareas (35%)
Baja Prioridad:     2 tareas (12%)
```

### Por Área

```
Backend Search:     3 tareas
Frontend Search:    5 tareas
Favorites:          3 tareas
Recent:             2 tareas
Command Palette:    2 tareas
Tags (opcional):    2 tareas
```

---

## 🎯 Definition of Done

### Funcionalidad
- ✅ Usuario puede buscar archivos por nombre
- ✅ Usuario puede aplicar filtros avanzados
- ✅ Usuario puede ordenar resultados
- ✅ Usuario puede marcar archivos como favoritos
- ✅ Usuario puede ver archivos recientes
- ✅ Usuario puede usar command palette (Cmd+K)
- ✅ Búsqueda muestra sugerencias

### Técnico
- ✅ Full-text search funcionando rápidamente
- ✅ Índices optimizados para search
- ✅ Autocomplete con debounce
- ✅ Search history en IndexedDB
- ✅ Command palette con keyboard navigation
- ✅ Filters persisten en URL

### UX/UI
- ✅ SearchBar prominente y accesible
- ✅ Results page informativos
- ✅ Filters UI intuitiva
- ✅ Command palette moderno
- ✅ Favorites fácil de acceder

---

## 📦 Entregables del Sprint

1. ✅ Full-text search con PostgreSQL
2. ✅ Search page con resultados
3. ✅ Advanced filters panel
4. ✅ Autocomplete suggestions
5. ✅ Search history
6. ✅ Sistema de favoritos completo
7. ✅ Página de favoritos
8. ✅ Página de archivos recientes
9. ✅ Command palette (Cmd+K)
10. ✅ Tags system (opcional)

---

## 🔗 Recursos

### Referencias Técnicas
- [PostgreSQL Full-Text Search](https://www.postgresql.org/docs/current/textsearch.html)
- [cmdk](https://cmdk.paco.me/)
- [shadcn/ui Command](https://ui.shadcn.com/docs/components/command)

---

## 📝 Notas

- Full-text search es crítico para UX
- Command palette mejora productividad significativamente
- Search debe ser rápido (<500ms)
- Considerar Elasticsearch para escala futura
- Tags son opcionales pero útiles para organización

---

## ⚡ Testing Checklist

### Search
- [ ] Búsqueda por nombre exacto
- [ ] Búsqueda parcial funciona
- [ ] Búsqueda con typos (fuzzy)
- [ ] Filtros se aplican correctamente
- [ ] Sorting funciona
- [ ] Paginación funciona
- [ ] Performance aceptable

### Favorites
- [ ] Toggle favorite funciona
- [ ] Star icon actualiza UI
- [ ] Página favorites carga
- [ ] Unfavorite funciona

### Recent
- [ ] Archivos recientes aparecen
- [ ] Ordenados por fecha de acceso
- [ ] Límite de 100 funciona

### Command Palette
- [ ] Cmd+K abre palette
- [ ] Búsqueda funciona
- [ ] Actions ejecutan
- [ ] Keyboard navigation funciona
- [ ] Esc cierra palette

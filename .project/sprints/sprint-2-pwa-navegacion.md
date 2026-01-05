# Sprint 2: PWA Setup y Navegación

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Sprint** | 02 |
| **Nombre** | PWA Setup y Navegación |
| **Estado** | ⚪ Planificado |
| **Inicio** | TBD |
| **Fin** | TBD |
| **Duración** | 2 semanas |

---

## 🎯 Objetivo del Sprint

Configurar la Progressive Web App con Service Workers (Serwist), implementar el sistema de navegación principal con layouts responsivos, y crear la funcionalidad básica de gestión de archivos y carpetas con integración a AWS S3.

**Valor entregado:** PWA instalable con funcionalidad offline básica, navegación completa, y sistema de archivos/carpetas funcional.

---

## 📊 Épicas Relacionadas

| Épica | Porcentaje en este Sprint |
|-------|--------------------------|
| EPIC-02: Navegación y PWA Setup | 70% |
| EPIC-03: Gestión de Archivos | 30% |

---

## 📝 Tareas del Sprint

### 🔴 Alta Prioridad - PWA Configuration

- [ ] **TASK-019**: Configurar Serwist para Service Workers
  - Épica: EPIC-02
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] @serwist/next instalado y configurado
    - [ ] next.config.js con Serwist plugin
    - [ ] Service Worker generado en /public/sw.js
    - [ ] Caching strategies definidas (Network First, Cache First)
    - [ ] Offline fallback page
  - **Notas**: Ver `2-architecture.md` para configuración de caching

- [ ] **TASK-020**: Crear PWA manifest y assets
  - Épica: EPIC-02
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] manifest.json con metadata completa
    - [ ] Iconos PWA en múltiples tamaños (192x192, 512x512)
    - [ ] Splash screens
    - [ ] Theme color y background color
    - [ ] Display mode: standalone
    - [ ] Short name y name definidos
  - **Notas**: Usar herramientas como pwa-asset-generator

- [ ] **TASK-021**: Implementar install prompt
  - Épica: EPIC-02
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Detectar BeforeInstallPromptEvent
    - [ ] Banner/modal de instalación
    - [ ] Botón "Instalar App"
    - [ ] Tracking de instalación
    - [ ] Dismiss persistente (no mostrar más)
  - **Notas**: Solo en navegadores compatibles (Chrome, Edge, etc)

- [ ] **TASK-022**: Configurar IndexedDB con Dexie
  - Épica: EPIC-02
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Dexie.js instalado
    - [ ] Schema definido en lib/db/schema.ts
    - [ ] Tablas: files, operations, cache
    - [ ] CRUD operations helpers
    - [ ] Type-safe queries
  - **Notas**: Ver `2-architecture.md` para schema IndexedDB

### 🔴 Alta Prioridad - Navigation & Layout

- [ ] **TASK-023**: Crear layout principal de dashboard
  - Épica: EPIC-02
  - Estimación: 5h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Layout con sidebar + header
    - [ ] Sidebar navigation items
    - [ ] Sidebar collapsible
    - [ ] Mobile: Drawer/Hamburger menu
    - [ ] Breadcrumbs en header
    - [ ] User menu en header
    - [ ] Responsive breakpoints
  - **Notas**: Ver diseño en Figma/referencias

- [ ] **TASK-024**: Implementar sidebar navigation
  - Épica: EPIC-02
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Navigation items: Files, Recent, Shared, Favorites, Settings
    - [ ] Active state highlighting
    - [ ] Icons con Lucide React
    - [ ] Storage bar en sidebar footer
    - [ ] Collapse/expand animation
  - **Notas**: Usar Framer Motion para animaciones

- [ ] **TASK-025**: Crear header con breadcrumbs
  - Épica: EPIC-02
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Breadcrumbs dinámicos según ruta
    - [ ] Search bar en header
    - [ ] User dropdown menu
    - [ ] Notifications icon (preparado)
    - [ ] Upload button
    - [ ] Mobile responsive
  - **Notas**: Command palette trigger (Cmd+K)

### 🔴 Alta Prioridad - Backend Files API

- [ ] **TASK-026**: Configurar AWS S3 integration
  - Épica: EPIC-03
  - Estimación: 4h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] AWS SDK v3 instalado
    - [ ] S3 client configurado
    - [ ] Environment variables (bucket, region, credentials)
    - [ ] Presigned URL generation
    - [ ] S3 key naming strategy
  - **Notas**: Ver `3-tech-stack.md` para AWS SDK

- [ ] **TASK-027**: Crear modelos Prisma para Files y Folders
  - Épica: EPIC-03
  - Estimación: 3h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] Modelo File en schema.prisma
    - [ ] Modelo Folder en schema.prisma
    - [ ] Relaciones definidas
    - [ ] Migraciones creadas
    - [ ] Índices optimizados
  - **Notas**: Ver `4-database-schema.md` para definiciones

- [ ] **TASK-028**: Implementar endpoints de Files
  - Épica: EPIC-03
  - Estimación: 5h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] GET /api/v1/files (list con paginación)
    - [ ] GET /api/v1/files/:id (detalles)
    - [ ] PATCH /api/v1/files/:id (update)
    - [ ] DELETE /api/v1/files/:id (soft delete)
    - [ ] Filtros: folderId, category, sortBy
    - [ ] Cursor-based pagination
  - **Notas**: Ver `5-api-specification.md`

- [ ] **TASK-029**: Implementar endpoints de Folders
  - Épica: EPIC-03
  - Estimación: 4h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] GET /api/v1/folders (list)
    - [ ] GET /api/v1/folders/:id (detalles)
    - [ ] POST /api/v1/folders (create)
    - [ ] PATCH /api/v1/folders/:id (update)
    - [ ] DELETE /api/v1/folders/:id (soft delete con cascade)
    - [ ] Breadcrumbs generation
  - **Notas**: Implementar recursive queries para tree

- [ ] **TASK-030**: Implementar storage quota management
  - Épica: EPIC-03
  - Estimación: 3h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] GET /api/v1/storage/stats
    - [ ] Calcular storage usado por usuario
    - [ ] Breakdown por tipo de archivo
    - [ ] Validar quota antes de upload
    - [ ] Trigger para actualizar storage_used
  - **Notas**: Ver función update_user_storage() en schema

### 🟡 Media Prioridad - Frontend Files Pages

- [ ] **TASK-031**: Crear página principal de archivos
  - Épica: EPIC-03
  - Estimación: 5h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Página /dashboard/files
    - [ ] Vista lista y vista grid (toggle)
    - [ ] Empty state cuando no hay archivos
    - [ ] Loading skeletons
    - [ ] Error states
    - [ ] Infinite scroll o paginación
  - **Notas**: Usar React Query para data fetching

- [ ] **TASK-032**: Crear componentes FileItem y FolderItem
  - Épica: EPIC-03
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] FileItem component con thumbnail
    - [ ] FolderItem component con icon
    - [ ] File size formatting
    - [ ] Date formatting
    - [ ] Hover states
    - [ ] Context menu (right-click)
    - [ ] Selection checkbox
  - **Notas**: Usar Lucide React para iconos

- [ ] **TASK-033**: Implementar navegación de carpetas
  - Épica: EPIC-03
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Página /dashboard/files/[folderId]
    - [ ] Click en folder abre su contenido
    - [ ] Breadcrumbs actualizados dinámicamente
    - [ ] Botón "Back"
    - [ ] URL refleja estructura de carpetas
  - **Notas**: Next.js dynamic routes

- [ ] **TASK-034**: Crear modal para crear carpetas
  - Épica: EPIC-03
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Dialog modal con form
    - [ ] Input para nombre de carpeta
    - [ ] Color picker (opcional)
    - [ ] Validación de nombre
    - [ ] Integración con API
    - [ ] Actualización optimistic UI
  - **Notas**: shadcn/ui Dialog

- [ ] **TASK-035**: Implementar files.store con Zustand
  - Épica: EPIC-03
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] lib/stores/filesStore.ts
    - [ ] Estado: files, folders, currentFolder, view (list/grid)
    - [ ] Actions: setFiles, addFile, updateFile, deleteFile
    - [ ] Filtros y sorting
    - [ ] Selección múltiple
  - **Notas**: Integrar con React Query

- [ ] **TASK-036**: Crear StorageBar component
  - Épica: EPIC-03
  - Estimación: 2h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Barra de progreso visual
    - [ ] Mostrar usado/total
    - [ ] Porcentaje
    - [ ] Colores según nivel (verde, amarillo, rojo)
    - [ ] Tooltip con breakdown por tipo
  - **Notas**: Ubicar en sidebar footer

### 🟡 Media Prioridad - Offline Basic

- [ ] **TASK-037**: Implementar detección de estado online/offline
  - Épica: EPIC-02
  - Estimación: 2h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Hook useOnlineStatus()
    - [ ] Listener de navigator.onLine
    - [ ] Banner cuando está offline
    - [ ] Indicador visual en UI
    - [ ] Eventos de online/offline
  - **Notas**: Usar Service Worker para detección confiable

- [ ] **TASK-038**: Cache básico de metadata en IndexedDB
  - Épica: EPIC-02
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Guardar lista de files en IndexedDB
    - [ ] Guardar folders structure
    - [ ] Sincronizar con backend
    - [ ] Mostrar data cacheada cuando offline
    - [ ] Indicador de "cached data"
  - **Notas**: Sync al recuperar conexión

---

## 📈 Progreso

| Métrica | Valor |
|---------|-------|
| **Tareas Totales** | 20 |
| **Completadas** | 0 |
| **En Progreso** | 0 |
| **Bloqueadas** | 0 |
| **Progreso** | 0% |

### Distribución por Prioridad

```
Alta Prioridad:    12 tareas (60%)
Media Prioridad:    8 tareas (40%)
```

### Por Área

```
PWA Config:         4 tareas
Backend API:        5 tareas
Frontend Pages:     7 tareas
Offline:            2 tareas
Components:         2 tareas
```

---

## 🚫 Bloqueantes

| ID | Descripción | Impacto | Responsable | Estado |
|----|-------------|---------|-------------|--------|
| - | Sin bloqueantes actualmente | - | - | - |

---

## 🎯 Definition of Done

### Funcionalidad
- ✅ PWA instalable en dispositivos compatibles
- ✅ Service Workers funcionando
- ✅ Usuario puede ver lista de archivos y carpetas
- ✅ Usuario puede navegar entre carpetas
- ✅ Usuario puede crear carpetas
- ✅ Usuario puede ver espacio de almacenamiento
- ✅ Funcionalidad básica offline (ver archivos cacheados)

### Técnico
- ✅ Service Workers registrados correctamente
- ✅ IndexedDB funcionando
- ✅ AWS S3 configurado
- ✅ Backend conectado a S3
- ✅ API de files/folders funcional
- ✅ React Query para data fetching
- ✅ Zustand stores funcionando

### UX/UI
- ✅ Navegación intuitiva
- ✅ Responsive en mobile/tablet/desktop
- ✅ Loading states en todas las operaciones
- ✅ Empty states informativos
- ✅ PWA install banner (cuando aplique)

---

## 📦 Entregables del Sprint

1. ✅ PWA funcional instalable en dispositivos
2. ✅ Service Workers con caching configurado
3. ✅ Manifest.json con todos los assets
4. ✅ Dashboard layout completo (sidebar + header)
5. ✅ Página de archivos con lista/grid toggle
6. ✅ Navegación de carpetas funcional
7. ✅ Create folder modal
8. ✅ Storage bar con info de quota
9. ✅ IndexedDB para cache offline básico
10. ✅ AWS S3 integrado con backend

---

## 🔗 Recursos

### Documentación
- `.project/2-architecture.md` - PWA Architecture
- `.project/3-tech-stack.md` - Serwist configuration
- `.project/5-api-specification.md` - Files/Folders API

### Referencias Técnicas
- [Serwist Docs](https://serwist.pages.dev/)
- [Dexie.js Docs](https://dexie.org/)
- [AWS S3 SDK Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [React Query Docs](https://tanstack.com/query/latest)

---

## 📝 Notas

- Este sprint es crítico para establecer la funcionalidad PWA
- Service Workers requieren HTTPS en producción (usar ngrok en dev si es necesario)
- Probar instalación en diferentes navegadores (Chrome, Edge, Safari)
- IndexedDB tiene límites de storage según navegador
- AWS S3 credentials no deben exponerse en frontend

---

## ⚡ Testing Checklist

### PWA
- [ ] PWA installable en Chrome desktop
- [ ] PWA installable en Chrome mobile (Android)
- [ ] Service Worker registrado correctamente
- [ ] Offline page funciona
- [ ] Cache strategies funcionan

### Navegación
- [ ] Sidebar navigation funciona
- [ ] Breadcrumbs se actualizan
- [ ] Crear carpeta funciona
- [ ] Navegar entre carpetas funciona
- [ ] Storage bar muestra datos correctos

### Responsive
- [ ] Mobile (< 640px) funciona
- [ ] Tablet (640-1024px) funciona
- [ ] Desktop (> 1024px) funciona

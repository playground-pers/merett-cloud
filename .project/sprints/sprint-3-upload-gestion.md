# Sprint 3: Upload y Gestión de Archivos

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Sprint** | 03 |
| **Nombre** | Upload y Gestión de Archivos |
| **Estado** | ⚪ Planificado |
| **Inicio** | TBD |
| **Fin** | TBD |
| **Duración** | 2 semanas |

---

## 🎯 Objetivo del Sprint

Implementar el sistema completo de upload de archivos con drag & drop, progress tracking, y operaciones CRUD completas para archivos y carpetas (renombrar, mover, eliminar, copiar). Incluye optimizaciones como compresión de imágenes y chunked uploads.

**Valor entregado:** Usuarios pueden subir archivos de cualquier tipo, ver progreso en tiempo real, y gestionar sus archivos completamente.

---

## 📊 Épicas Relacionadas

| Épica | Porcentaje en este Sprint |
|-------|--------------------------|
| EPIC-03: Gestión de Archivos | 100% |

---

## 📝 Tareas del Sprint

### 🔴 Alta Prioridad - Upload System Backend

- [ ] **TASK-039**: Implementar presigned URLs para S3
  - Épica: EPIC-03
  - Estimación: 4h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] POST /api/v1/upload/presigned-url
    - [ ] Generar URL firmada con expiración (1 hora)
    - [ ] Validar tipo de archivo
    - [ ] Validar tamaño (max 100MB por defecto)
    - [ ] Verificar storage quota del usuario
    - [ ] Generar fileId y s3Key únicos
  - **Notas**: Usar @aws-sdk/s3-request-presigner

- [ ] **TASK-040**: Endpoint de confirmación de upload
  - Épica: EPIC-03
  - Estimación: 3h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] POST /api/v1/upload/complete
    - [ ] Verificar que archivo existe en S3
    - [ ] Crear registro en DB (files table)
    - [ ] Actualizar storage_used del usuario
    - [ ] Generar thumbnail asíncrono (queue)
    - [ ] Retornar file metadata
  - **Notas**: Usar Sharp para thumbnails

- [ ] **TASK-041**: Implementar multipart upload para archivos grandes
  - Épica: EPIC-03
  - Estimación: 6h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] POST /api/v1/upload/multipart/initiate
    - [ ] GET /api/v1/upload/multipart/:sessionId/part-urls
    - [ ] POST /api/v1/upload/multipart/complete
    - [ ] DELETE /api/v1/upload/multipart/:sessionId (cancel)
    - [ ] Tabla upload_sessions para tracking
    - [ ] Cleanup de uploads abandonados (cron job)
  - **Notas**: Para archivos >100MB

- [ ] **TASK-042**: Sistema de generación de thumbnails
  - Épica: EPIC-03
  - Estimación: 5h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] Sharp para imágenes (resize, crop, optimize)
    - [ ] FFmpeg para video thumbnails
    - [ ] Queue de procesamiento (async)
    - [ ] Upload thumbnail a S3 bucket separado
    - [ ] Actualizar thumbnail_s3_key en DB
  - **Notas**: Procesar en background, no bloquear upload

### 🔴 Alta Prioridad - Upload System Frontend

- [ ] **TASK-043**: Implementar HTML5 File API integration
  - Épica: EPIC-03
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] File input con accept types
    - [ ] Multiple files selection
    - [ ] File validation client-side (size, type)
    - [ ] File metadata extraction
    - [ ] Checksum generation (opcional)
  - **Notas**: Usar Web Crypto API para checksum

- [ ] **TASK-044**: Crear UploadZone con drag & drop
  - Épica: EPIC-03
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] react-dropzone integrado
    - [ ] Drag & drop visual feedback
    - [ ] Multi-file drop
    - [ ] Paste de archivos (Ctrl+V)
    - [ ] Click to browse
    - [ ] Validation feedback
  - **Notas**: Mostrar en área principal cuando carpeta vacía

- [ ] **TASK-045**: Implementar upload queue management
  - Épica: EPIC-03
  - Estimación: 5h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] lib/stores/uploadStore.ts
    - [ ] Queue de uploads (max 3 concurrentes)
    - [ ] Progress tracking por archivo
    - [ ] Pause/Resume (si es posible)
    - [ ] Cancel upload
    - [ ] Retry fallidos
    - [ ] Estado: pending, uploading, completed, failed
  - **Notas**: Zustand para state

- [ ] **TASK-046**: Crear UI de upload progress
  - Épica: EPIC-03
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] UploadProgress component
    - [ ] Progress bar individual por archivo
    - [ ] Progress global
    - [ ] Speed indicator (MB/s)
    - [ ] ETA (tiempo restante)
    - [ ] Success/Error feedback
    - [ ] Toast notifications
  - **Notas**: Drawer en bottom o modal

- [ ] **TASK-047**: Compresión client-side de imágenes
  - Épica: EPIC-03
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] browser-image-compression integrado
    - [ ] Auto-compress imágenes >2MB
    - [ ] Mostrar size before/after
    - [ ] Option para skip compression
    - [ ] Preservar EXIF (opcional)
  - **Notas**: Comprimir antes de upload a S3

### 🟡 Media Prioridad - File Operations

- [ ] **TASK-048**: Implementar rename de archivos/carpetas
  - Épica: EPIC-03
  - Estimación: 3h
  - Asignado: @fullstack
  - **Criterios de aceptación**:
    - [ ] Backend: PATCH /api/v1/files/:id y folders/:id
    - [ ] Frontend: Rename modal/inline edit
    - [ ] Validación de nombre (caracteres especiales)
    - [ ] Conflict detection (nombre duplicado)
    - [ ] Optimistic UI update
  - **Notas**: Double-click para inline edit

- [ ] **TASK-049**: Implementar move/copy de archivos
  - Épica: EPIC-03
  - Estimación: 5h
  - Asignado: @fullstack
  - **Criterios de aceptación**:
    - [ ] Backend: POST /api/v1/files/:id/move y /copy
    - [ ] Frontend: Move modal con folder tree
    - [ ] Drag & drop para mover
    - [ ] Copy opción en context menu
    - [ ] Validación de permisos
    - [ ] Progress para operaciones masivas
  - **Notas**: Copiar en S3 sin re-upload

- [ ] **TASK-050**: Implementar delete con confirmación
  - Épica: EPIC-03
  - Estimación: 3h
  - Asignado: @fullstack
  - **Criterios de aceptación**:
    - [ ] Backend: Soft delete funcionando
    - [ ] Frontend: Confirmation dialog
    - [ ] Delete individual
    - [ ] Bulk delete (múltiples archivos)
    - [ ] Undo opción (opcional)
    - [ ] Actualizar UI inmediatamente
  - **Notas**: Keyboard shortcut: Delete key

- [ ] **TASK-051**: Crear FileOptionsMenu component
  - Épica: EPIC-03
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Context menu (right-click)
    - [ ] Dropdown menu (3 dots icon)
    - [ ] Opciones: Rename, Move, Copy, Delete, Download, Share
    - [ ] Keyboard shortcuts support
    - [ ] Disabled states según permisos
  - **Notas**: shadcn/ui DropdownMenu

- [ ] **TASK-052**: Implementar bulk operations UI
  - Épica: EPIC-03
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Checkbox selection en cada item
    - [ ] Select all checkbox
    - [ ] Bulk actions bar (aparece al seleccionar)
    - [ ] Acciones: Download, Move, Delete
    - [ ] Progress para operaciones masivas
    - [ ] Deselect all
  - **Notas**: Ctrl+Click, Shift+Click para selección

### 🟡 Media Prioridad - Optimizations

- [ ] **TASK-053**: Implementar chunked upload
  - Épica: EPIC-03
  - Estimación: 5h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Split files >10MB en chunks
    - [ ] Upload chunks en paralelo (max 3)
    - [ ] Progress por chunk y total
    - [ ] Retry de chunks fallidos
    - [ ] Resume capability
  - **Notas**: Usar File.slice() API

- [ ] **TASK-054**: Background upload con Service Worker
  - Épica: EPIC-03
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Upload continúa si usuario cierra tab
    - [ ] Background Sync API
    - [ ] Notification cuando completa
    - [ ] Retry automático en background
  - **Notas**: Feature progresivo (no todos los browsers)

### 🟢 Baja Prioridad - Polish

- [ ] **TASK-055**: Keyboard shortcuts para file operations
  - Épica: EPIC-03
  - Estimación: 2h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Ctrl+A: Select all
    - [ ] Delete: Delete selected
    - [ ] Ctrl+C: Copy
    - [ ] Ctrl+X: Cut
    - [ ] Ctrl+V: Paste
    - [ ] F2: Rename
    - [ ] Esc: Deselect
  - **Notas**: Mostrar shortcuts en tooltip

- [ ] **TASK-056**: Animations y transitions
  - Épica: EPIC-03
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Upload progress animations
    - [ ] File list enter/exit animations
    - [ ] Drag & drop feedback
    - [ ] Success checkmark animation
    - [ ] Error shake animation
  - **Notas**: Framer Motion

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
Alta Prioridad:    12 tareas (67%)
Media Prioridad:    4 tareas (22%)
Baja Prioridad:     2 tareas (11%)
```

### Por Área

```
Backend Upload:     4 tareas
Frontend Upload:    5 tareas
File Operations:    4 tareas
Optimizations:      2 tareas
Polish:             2 tareas
Testing:            1 tarea
```

---

## 🎯 Definition of Done

### Funcionalidad
- ✅ Usuario puede subir archivos (cualquier tipo)
- ✅ Usuario puede arrastrar y soltar archivos
- ✅ Usuario puede ver progreso de upload en tiempo real
- ✅ Usuario puede renombrar archivos y carpetas
- ✅ Usuario puede mover archivos entre carpetas
- ✅ Usuario puede copiar archivos
- ✅ Usuario puede eliminar archivos (con confirmación)
- ✅ Usuario puede seleccionar múltiples archivos

### Técnico
- ✅ Presigned URLs funcionando
- ✅ Upload directo a S3
- ✅ Thumbnails generándose en background
- ✅ Chunked upload para archivos grandes
- ✅ Queue de uploads con límite concurrente
- ✅ Client-side compression para imágenes
- ✅ Operaciones bulk funcionando

### UX/UI
- ✅ Drag & drop visual feedback excelente
- ✅ Progress bars informativos
- ✅ Success/Error feedback claro
- ✅ Keyboard shortcuts funcionando
- ✅ Animaciones suaves

---

## 📦 Entregables del Sprint

1. ✅ Sistema de upload completo (simple y multipart)
2. ✅ Drag & drop zone funcional
3. ✅ Upload queue con progress tracking
4. ✅ Compresión automática de imágenes
5. ✅ Thumbnails generándose en backend
6. ✅ Rename, Move, Copy, Delete funcionando
7. ✅ Bulk operations UI completo
8. ✅ Context menu con todas las opciones
9. ✅ Keyboard shortcuts implementados
10. ✅ Background upload con Service Workers

---

## 🚫 Bloqueantes

| ID | Descripción | Impacto | Responsable | Estado |
|----|-------------|---------|-------------|--------|
| - | Sin bloqueantes actualmente | - | - | - |

---

## 🔗 Recursos

### Documentación
- `.project/5-api-specification.md` - Upload API
- `.project/2-architecture.md` - Upload flow

### Referencias Técnicas
- [react-dropzone](https://react-dropzone.js.org/)
- [browser-image-compression](https://www.npmjs.com/package/browser-image-compression)
- [AWS S3 Presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html)
- [Sharp](https://sharp.pixelplumbing.com/)

---

## 📝 Notas

- Upload directo a S3 ahorra ancho de banda del servidor
- Thumbnails deben generarse asíncronamente
- Chunked upload mejora reliability para archivos grandes
- Client-side compression reduce costos de S3
- Bulk operations deben tener feedback de progreso

---

## ⚡ Testing Checklist

### Upload
- [ ] Upload archivo pequeño (<1MB)
- [ ] Upload archivo mediano (1-10MB)
- [ ] Upload archivo grande (>10MB, chunked)
- [ ] Upload múltiples archivos simultáneos
- [ ] Drag & drop funciona
- [ ] Paste (Ctrl+V) funciona
- [ ] Progress bars correctos
- [ ] Upload falla correctamente si quota excedido

### File Operations
- [ ] Rename archivo/carpeta
- [ ] Move archivo a otra carpeta
- [ ] Copy archivo
- [ ] Delete archivo (soft delete)
- [ ] Bulk operations (select + delete)
- [ ] Context menu aparece
- [ ] Keyboard shortcuts funcionan

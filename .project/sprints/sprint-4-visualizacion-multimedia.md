# Sprint 4: Visualización de Multimedia

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Sprint** | 04 |
| **Nombre** | Visualización de Multimedia |
| **Estado** | ⚪ Planificado |
| **Inicio** | TBD |
| **Fin** | TBD |
| **Duración** | 2 semanas |

---

## 🎯 Objetivo del Sprint

Implementar visualizadores y reproductores para diferentes tipos de archivos (imágenes, videos, audio, PDFs), sistema de download con progress tracking, y display de metadata completa. Incluir caché de archivos para acceso offline.

**Valor entregado:** Usuarios pueden previsualizar y consumir contenido multimedia directamente en la app, con download opcional para offline.

---

## 📊 Épicas Relacionadas

| Épica | Porcentaje en este Sprint |
|-------|--------------------------|
| EPIC-04: Vista de Multimedia | 100% |

---

## 📝 Tareas del Sprint

### 🔴 Alta Prioridad - Image Viewer

- [ ] **TASK-057**: Crear ImageViewer component con lightbox
  - Épica: EPIC-04
  - Estimación: 5h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Modal/overlay para full-screen view
    - [ ] Zoom in/out (pinch, scroll, buttons)
    - [ ] Pan con drag
    - [ ] Navigation prev/next entre imágenes
    - [ ] Keyboard: arrows, Esc, +/-
    - [ ] Loading state con blur placeholder
  - **Notas**: Considerar usar next/image para optimization

- [ ] **TASK-058**: Image gallery con lazy loading
  - Épica: EPIC-04
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Grid responsive de imágenes
    - [ ] Lazy loading (IntersectionObserver)
    - [ ] Thumbnails optimizados
    - [ ] Click abre ImageViewer
    - [ ] Loading skeletons
    - [ ] Virtual scrolling para muchas imágenes
  - **Notas**: Next.js Image component con priority=false

### 🔴 Alta Prioridad - Video Player

- [ ] **TASK-059**: Implementar VideoPlayer component
  - Épica: EPIC-04
  - Estimación: 5h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] video.js integrado o HTML5 video
    - [ ] Controles personalizados
    - [ ] Play/pause, volume, timeline
    - [ ] Fullscreen mode
    - [ ] Playback speed control
    - [ ] Picture-in-picture (si navegador soporta)
    - [ ] Keyboard shortcuts (space, arrows, f)
  - **Notas**: Streaming desde S3 con signed URLs

- [ ] **TASK-060**: Generar video thumbnails en backend
  - Épica: EPIC-04
  - Estimación: 4h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] FFmpeg para extraer frame
    - [ ] Thumbnail al segundo 1 del video
    - [ ] Resize a 320x240 o similar
    - [ ] Upload a S3 thumbnails bucket
    - [ ] Actualizar file.thumbnail_s3_key
  - **Notas**: Queue de procesamiento asíncrono

### 🔴 Alta Prioridad - Audio Player

- [ ] **TASK-061**: Implementar AudioPlayer component
  - Épica: EPIC-04
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] howler.js o HTML5 audio
    - [ ] Controles: play/pause, volume, timeline
    - [ ] Waveform visualization (opcional)
    - [ ] Playlist support para múltiples archivos
    - [ ] Background playback con Service Worker
    - [ ] Now playing notification
  - **Notas**: Sticky player en bottom de UI

### 🔴 Alta Prioridad - PDF Viewer

- [ ] **TASK-062**: Implementar PDFViewer component
  - Épica: EPIC-04
  - Estimación: 5h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] react-pdf integrado
    - [ ] Page navigation (prev/next, go to page)
    - [ ] Zoom controls (+/-)
    - [ ] Fit to width/height
    - [ ] Page thumbnails sidebar (opcional)
    - [ ] Search en PDF (opcional)
    - [ ] Download button
    - [ ] Print button
  - **Notas**: Lazy loading de páginas

### 🟡 Media Prioridad - Download System

- [ ] **TASK-063**: Backend - Endpoint de download
  - Épica: EPIC-04
  - Estimación: 3h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] GET /api/v1/download/:fileId
    - [ ] Generar signed URL de S3
    - [ ] Verificar permisos del usuario
    - [ ] Track download count
    - [ ] Expiration time (5 min)
    - [ ] Logs de descarga
  - **Notas**: Ver `5-api-specification.md`

- [ ] **TASK-064**: Frontend - Download con progress
  - Épica: EPIC-04
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Fetch con streaming
    - [ ] Progress bar durante download
    - [ ] Cancel download
    - [ ] Retry en caso de error
    - [ ] Save to downloads folder
    - [ ] Toast notification al completar
  - **Notas**: Usar ReadableStream para progress

- [ ] **TASK-065**: Batch download como ZIP
  - Épica: EPIC-04
  - Estimación: 5h
  - Asignado: @fullstack
  - **Criterios de aceptación**:
    - [ ] Backend: POST /api/v1/download/batch
    - [ ] Backend: Crear ZIP en server o S3
    - [ ] Frontend: Download ZIP con progress
    - [ ] Límite razonable (ej: 20 archivos o 500MB)
    - [ ] Cleanup de ZIPs temporales
  - **Notas**: Considerar usar jszip o backend ZIP

### 🟡 Media Prioridad - File Metadata & Details

- [ ] **TASK-066**: File details modal/sidebar
  - Épica: EPIC-04
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Modal o sidebar con file info
    - [ ] Mostrar: nombre, tipo, tamaño, fechas
    - [ ] Owner info
    - [ ] Thumbnail/preview grande
    - [ ] Activity log (últimas acciones)
    - [ ] Tabs: Details, Activity, Sharing
  - **Notas**: shadcn/ui Sheet o Dialog

- [ ] **TASK-067**: Metadata extractor para imágenes
  - Épica: EPIC-04
  - Estimación: 3h
  - Asignado: @fullstack
  - **Criterios de aceptación**:
    - [ ] Backend: Extraer EXIF data (cámara, ubicación, settings)
    - [ ] Backend: Obtener dimensiones (width, height)
    - [ ] Almacenar en file.metadata (JSONB)
    - [ ] Frontend: Mostrar metadata en file details
    - [ ] Map de ubicación si hay GPS (opcional)
  - **Notas**: Usar exif-parser o similar

- [ ] **TASK-068**: Metadata para videos y audio
  - Épica: EPIC-04
  - Estimación: 3h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] Extraer duración con FFmpeg
    - [ ] Extraer resolución (width, height)
    - [ ] Extraer codec, bitrate
    - [ ] Audio: artist, album, year (ID3 tags)
    - [ ] Almacenar en metadata JSONB
  - **Notas**: FFprobe para metadata

### 🟡 Media Prioridad - Cache & Offline

- [ ] **TASK-069**: Cache de archivos en Service Worker
  - Épica: EPIC-04
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Cache API para almacenar files
    - [ ] LRU eviction cuando cache lleno
    - [ ] Límite configurable (ej: 500MB)
    - [ ] Indicador "Available offline"
    - [ ] Manual "Download for offline"
  - **Notas**: Serwist con custom strategy

- [ ] **TASK-070**: Download manager con queue
  - Épica: EPIC-04
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] lib/stores/downloadStore.ts
    - [ ] Queue de downloads
    - [ ] Progress tracking
    - [ ] Pause/Cancel
    - [ ] Retry logic
  - **Notas**: Similar a uploadStore

### 🟢 Baja Prioridad - Additional Viewers

- [ ] **TASK-071**: Viewer para documentos de texto
  - Épica: EPIC-04
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Preview para .txt, .md, .json, .csv
    - [ ] Syntax highlighting para código (.js, .ts, .py, etc)
    - [ ] Copy to clipboard
    - [ ] Download option
  - **Notas**: Usar prism.js o highlight.js

- [ ] **TASK-072**: Fallback viewer para otros tipos
  - Épica: EPIC-04
  - Estimación: 2h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Generic file icon con info
    - [ ] File details visibles
    - [ ] Download button prominente
    - [ ] "No preview available" message
    - [ ] Suggest download
  - **Notas**: Para archivos sin viewer específico

---

## 📈 Progreso

| Métrica | Valor |
|---------|-------|
| **Tareas Totales** | 16 |
| **Completadas** | 0 |
| **En Progreso** | 0 |
| **Bloqueadas** | 0 |
| **Progreso** | 0% |

### Distribución por Prioridad

```
Alta Prioridad:     9 tareas (56%)
Media Prioridad:    5 tareas (31%)
Baja Prioridad:     2 tareas (13%)
```

### Por Área

```
Image Viewer:       2 tareas
Video Player:       2 tareas
Audio Player:       1 tarea
PDF Viewer:         1 tarea
Download:           3 tareas
Metadata:           3 tareas
Cache/Offline:      2 tareas
Additional:         2 tareas
```

---

## 🎯 Definition of Done

### Funcionalidad
- ✅ Usuario puede previsualizar imágenes con zoom/pan
- ✅ Usuario puede reproducir videos con controles
- ✅ Usuario puede reproducir audio
- ✅ Usuario puede ver PDFs con navegación de páginas
- ✅ Usuario puede descargar archivos con progress
- ✅ Usuario puede ver metadata completa
- ✅ Archivos descargados disponibles offline

### Técnico
- ✅ ImageViewer funcionando en todos los formatos comunes
- ✅ VideoPlayer con streaming desde S3
- ✅ AudioPlayer con background playback
- ✅ PDFViewer con todas las páginas
- ✅ Download signed URLs funcionando
- ✅ Metadata extraction en backend
- ✅ Cache Storage para archivos offline

### UX/UI
- ✅ Viewers responsive y intuitivos
- ✅ Loading states durante carga de media
- ✅ Error handling (archivo corrupto, etc)
- ✅ Keyboard shortcuts en viewers
- ✅ Progress feedback en downloads

---

## 📦 Entregables del Sprint

1. ✅ Image viewer con zoom, pan, navigation
2. ✅ Video player con controles completos
3. ✅ Audio player con playlist
4. ✅ PDF viewer con página navigation
5. ✅ Download system con progress
6. ✅ Batch download como ZIP
7. ✅ File details modal con metadata
8. ✅ Thumbnail generation en backend
9. ✅ Cache de archivos para offline
10. ✅ Viewers para texto/código

---

## 🔗 Recursos

### Referencias Técnicas
- [video.js](https://videojs.com/)
- [howler.js](https://howlerjs.com/)
- [react-pdf](https://react-pdf.org/)
- [FFmpeg](https://ffmpeg.org/)
- [Sharp](https://sharp.pixelplumbing.com/)

---

## 📝 Notas

- Viewers deben funcionar con archivos desde S3 (CORS configurado)
- Thumbnails mejoran UX significativamente
- Cache de media consume storage local - ser consciente de límites
- Video streaming debe ser eficiente (no descargar todo)
- Metadata EXIF puede contener información sensible (GPS)

---

## ⚡ Testing Checklist

### Viewers
- [ ] Previsualizar JPG, PNG, GIF, WEBP
- [ ] Reproducir MP4, WEBM, MOV
- [ ] Reproducir MP3, WAV, OGG
- [ ] Ver PDF multi-página
- [ ] Ver archivos de texto
- [ ] Fallback para tipos no soportados

### Download
- [ ] Download archivo individual
- [ ] Download múltiples archivos (ZIP)
- [ ] Progress bar correcto
- [ ] Cancel download funciona
- [ ] Retry en caso de error

### Metadata
- [ ] EXIF data visible en imágenes
- [ ] Video duration y resolución visible
- [ ] Audio metadata visible
- [ ] Fecha de creación correcta

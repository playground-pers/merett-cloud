# Plan de Alto Nivel: Merett Cloud PWA

## 📋 Resumen del Proyecto

**Merett Cloud** es una Progressive Web App (PWA) de almacenamiento en la nube multiplataforma, accesible desde cualquier dispositivo con navegador (desktop, tablet, móvil), optimizada para multimedia y archivos, similar a Google Drive.

### Tecnologías Core

- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **PWA**: Serwist (Service Workers)
- **State**: Zustand + React Query
- **Auth**: NextAuth.js
- **Backend**: Express + TypeScript
- **Database**: PostgreSQL + Prisma
- **Storage**: AWS S3
- **Deployment**: Docker + PM2 + Nginx + EC2

---

## 🎯 Épicas Principales

### **Épica 1: Autenticación y Gestión de Usuario**
Implementar sistema completo de autenticación con NextAuth.js y gestión de perfiles.

### **Épica 2: Navegación y PWA Setup**
Crear la arquitectura de navegación de Next.js, layouts responsivos y configuración PWA con Service Workers.

### **Épica 3: Gestión de Archivos**
Sistema completo de exploración, carga, descarga y gestión de archivos usando HTML5 APIs.

### **Épica 4: Vista de Multimedia**
Visualizadores y reproductores web para diferentes tipos de archivos (imágenes, videos, audio, PDFs).

### **Épica 5: Compartir y Colaboración**
Sistema para compartir archivos y carpetas con otros usuarios, con control de permisos.

### **Épica 6: Búsqueda y Filtros**
Búsqueda avanzada con filtros y sistema de favoritos.

### **Épica 7: Sincronización Offline**
Gestión de espacio, sincronización offline con Service Workers e IndexedDB.

### **Épica 8: Optimización y Seguridad**
Performance web, SEO, seguridad, y preparación para producción.

---

## 🚀 Sprints Detallados

### **Sprint 1: Fundamentos y Autenticación (Semana 1-2)**

**Épica: Autenticación y Setup Base**

#### Historias de Usuario:
- Como usuario, quiero registrarme con email/password
- Como usuario, quiero iniciar sesión de forma segura
- Como usuario, quiero recuperar mi contraseña
- Como usuario, quiero ver y editar mi perfil
- Como usuario, quiero cerrar sesión

#### Tareas Técnicas:

1. **Project Setup**
   - Inicializar proyecto Next.js 16 con TypeScript
   - Configurar Tailwind CSS
   - Setup shadcn/ui components
   - Configurar ESLint + Prettier
   - Setup Docker para desarrollo

2. **Backend - Auth API**
   - Configurar Express + TypeScript (ya existe)
   - Configurar PostgreSQL + Prisma
   - Implementar JWT authentication
   - Endpoints: register, login, logout, refresh-token
   - Password reset flow

3. **Frontend - Auth Pages**
   - Configurar NextAuth.js
   - Crear páginas: /login, /register, /forgot-password
   - Implementar auth forms con React Hook Form + Zod
   - Crear auth.store.ts (Zustand)
   - Implementar auth service (API calls)

4. **Frontend - Profile**
   - Página /settings con tabs
   - Edición de perfil
   - Cambio de contraseña
   - Avatar upload
   - Crear user.store.ts

#### Entregables:
- ✅ Proyecto Next.js configurado
- ✅ Sistema de autenticación funcional
- ✅ Páginas de login/registro con diseño responsive
- ✅ Perfil de usuario básico
- ✅ Persistencia de sesión con cookies

---

### **Sprint 2: PWA Setup y Navegación (Semana 3-4)**

**Épica: PWA y Estructura Base**

#### Historias de Usuario:
- Como usuario, quiero instalar la app en mi dispositivo
- Como usuario, quiero acceder a la app offline (básico)
- Como usuario, quiero ver mis archivos en una lista/grid
- Como usuario, quiero navegar entre carpetas
- Como usuario, quiero ver el espacio disponible

#### Tareas Técnicas:

1. **PWA Configuration**
   - Configurar Serwist (Service Workers)
   - Crear manifest.json con iconos
   - Implementar install prompt
   - Setup caching strategies (Network First, Cache First)
   - Configurar offline fallback page

2. **Layout y Navegación**
   - Crear layout principal con sidebar
   - Header con breadcrumbs
   - Sidebar navigation (responsive)
   - Mobile: Bottom navigation o hamburger menu
   - Dark mode toggle (opcional)

3. **Backend - Files API**
   - Configurar AWS S3
   - Crear modelos Prisma: File, Folder
   - Endpoints: GET /files, GET /folders, POST /folders
   - Implementar signed URLs para S3
   - Storage quota management

4. **Frontend - Files Pages**
   - Página /dashboard/files (lista principal)
   - Página /dashboard/files/[folderId]
   - Implementar files.store.ts (Zustand)
   - Crear componentes: FileItem, FolderItem, FileGrid
   - StorageBar component
   - EmptyState component
   - Crear folders modal

5. **IndexedDB Setup**
   - Configurar Dexie.js
   - Schema para files metadata
   - Sincronización con backend

#### Entregables:
- ✅ PWA funcional con install prompt
- ✅ Service Workers configurados
- ✅ Navegación responsive funcionando
- ✅ Lista/Grid de archivos y carpetas
- ✅ Navegación entre carpetas
- ✅ Indicador de espacio de almacenamiento
- ✅ Funcionalidad offline básica

---

### **Sprint 3: Upload y Gestión de Archivos (Semana 5-6)**

**Épica: Gestión de Archivos**

#### Historias de Usuario:
- Como usuario, quiero subir archivos desde mi dispositivo
- Como usuario, quiero arrastrar y soltar archivos
- Como usuario, quiero ver el progreso de subida
- Como usuario, quiero renombrar archivos/carpetas
- Como usuario, quiero mover archivos entre carpetas
- Como usuario, quiero eliminar archivos
- Como usuario, quiero seleccionar múltiples archivos

#### Tareas Técnicas:

1. **Upload System (Frontend)**
   - Implementar HTML5 File API
   - Drag & Drop zone con react-dropzone
   - Client-side image compression (browser-image-compression)
   - Upload progress tracking
   - Crear upload.store.ts para queue management
   - Retry logic para uploads fallidos

2. **Upload System (Backend)**
   - Endpoint POST /upload/presigned-url
   - Endpoint POST /files/:id/confirm
   - Multer para multipart (si se usa upload directo)
   - Sharp para thumbnail generation (async)
   - File validation (size, type)

3. **Componentes Upload**
   - UploadButton component
   - UploadZone component (drag & drop area)
   - UploadProgress component
   - UploadQueue drawer/modal
   - FileTypeIcon component

4. **File Operations**
   - Rename modal
   - Move/Copy modal con folder tree
   - Delete confirmation dialog
   - Bulk operations (select multiple)
   - FileOptionsMenu (dropdown)
   - Keyboard shortcuts (Ctrl+A, Delete, etc.)

5. **Optimización**
   - Chunk uploads para archivos grandes (>10MB)
   - Upload queue con límite concurrente
   - Resume uploads interrumpidos (opcional)
   - Background upload con Service Workers

#### Entregables:
- ✅ Upload de múltiples tipos de archivos
- ✅ Drag & Drop funcional
- ✅ Indicador de progreso detallado
- ✅ Operaciones CRUD completas
- ✅ Bulk operations
- ✅ Upload en background (Service Worker)

---

### **Sprint 4: Visualización de Multimedia (Semana 7-8)**

**Épica: Vista de Multimedia**

#### Historias de Usuario:
- Como usuario, quiero previsualizar imágenes con zoom
- Como usuario, quiero reproducir videos
- Como usuario, quiero reproducir audio
- Como usuario, quiero ver PDFs
- Como usuario, quiero ver metadatos de archivos
- Como usuario, quiero descargar archivos

#### Tareas Técnicas:

1. **Image Viewer**
   - Implementar lightbox/modal con zoom/pan
   - Navigation entre imágenes (prev/next)
   - Usar Next.js Image para optimization
   - Full-screen mode
   - Lazy loading de imágenes en grid

2. **Video Player**
   - Implementar video.js o player nativo
   - Controles personalizados
   - Subtítulos (opcional)
   - Picture-in-picture
   - Streaming desde S3

3. **Audio Player**
   - Implementar howler.js o player nativo
   - Playlist support
   - Visualización de waveform (opcional)
   - Background playback con Service Workers

4. **PDF Viewer**
   - Implementar react-pdf
   - Zoom controls
   - Page navigation
   - Download option
   - Print option

5. **Download System**
   - Implementar download.service.ts
   - Backend: Endpoint GET /files/:id/download (signed URL)
   - Progress tracking
   - Resume downloads (opcional)
   - Save to Cache Storage via Service Worker

6. **File Info & Metadata**
   - File details modal/sidebar
   - Mostrar: nombre, tamaño, tipo, fecha, propietario
   - Image metadata: dimensiones, cámara (EXIF)
   - Video metadata: duración, resolución
   - Edit metadata básico

#### Entregables:
- ✅ Previsualización de imágenes con galería
- ✅ Reproducción de video con controles
- ✅ Reproducción de audio
- ✅ Visualización de PDFs
- ✅ Sistema de download con progress
- ✅ Sistema de caché para offline
- ✅ Metadata completa visible

---

### **Sprint 5: Compartir y Notificaciones (Semana 9-10)**

**Épica: Compartir y Colaboración**

#### Historias de Usuario:
- Como usuario, quiero compartir archivos con otros usuarios
- Como usuario, quiero generar links públicos de compartir
- Como usuario, quiero controlar permisos de acceso
- Como usuario, quiero ver archivos compartidos conmigo
- Como usuario, quiero recibir notificaciones

#### Tareas Técnicas:

1. **Share System (Backend)**
   - Crear modelo Prisma: Share
   - Endpoints: POST /files/:id/share, GET /files/:id/shares
   - Sistema de permisos: viewer, editor, owner
   - Generate public share links con token
   - Expiration time para links
   - Revoke access endpoint

2. **Share System (Frontend)**
   - Share dialog/modal
   - User search/autocomplete
   - Permissions selector
   - Public link generator con copy button
   - Link expiration settings
   - Crear share.store.ts

3. **Shared Files Views**
   - Página /dashboard/shared (compartidos por mí)
   - Página /dashboard/shared-with-me
   - Filtros: por usuario, por fecha
   - Lista de usuarios con acceso
   - Manage permissions UI

4. **Notifications (Web Push)**
   - Setup Web Push API
   - Service Worker notification handler
   - Backend: Send notifications (Firebase Cloud Messaging o similar)
   - Frontend: Request permission
   - Notification preferences en settings
   - Toast notifications para eventos locales (sonner)

5. **Activity Log**
   - Modelo Prisma: ActivityLog
   - Track: shares, downloads, uploads, edits
   - Activity timeline en file details
   - Recent activity dashboard

#### Entregables:
- ✅ Sistema de compartir con permisos
- ✅ Links públicos con expiración
- ✅ Vista de archivos compartidos
- ✅ Gestión de permisos
- ✅ Notificaciones web push
- ✅ Activity log básico

---

### **Sprint 6: Búsqueda y Favoritos (Semana 11-12)**

**Épica: Búsqueda y Filtros**

#### Historias de Usuario:
- Como usuario, quiero buscar archivos por nombre
- Como usuario, quiero filtrar por tipo de archivo
- Como usuario, quiero filtrar por fecha
- Como usuario, quiero ver archivos recientes
- Como usuario, quiero marcar archivos como favoritos
- Como usuario, quiero acceso rápido con command palette

#### Tareas Técnicas:

1. **Search System (Backend)**
   - Implementar full-text search en PostgreSQL (pg_trgm)
   - Endpoint GET /search con query params
   - Indexar: nombre, tipo, tags
   - Ordenamiento: relevancia, fecha, tamaño
   - Paginación y límites

2. **Search UI (Frontend)**
   - SearchBar component en header
   - Página /dashboard/search con results
   - Search suggestions/autocomplete
   - Crear search.store.ts
   - Search history en IndexedDB
   - Recent searches dropdown

3. **Filters & Sorting**
   - FilterPanel component
   - Filtro por tipo: imágenes, videos, docs, etc.
   - Filtro por fecha: hoy, semana, mes, año, rango custom
   - Filtro por tamaño: pequeño, mediano, grande, custom
   - Filtro por owner (en compartidos)
   - Sort by: nombre, fecha, tamaño

4. **Recent Files**
   - Página /dashboard/recent
   - Lista de últimos 50-100 archivos accedidos
   - Track access time en backend
   - Quick access en home

5. **Favorites System**
   - Modelo Prisma: Favorite (relación user-file)
   - Endpoint POST /files/:id/favorite
   - Toggle favorite en FileItem (star icon)
   - Página /dashboard/favorites
   - Crear favorites.store.ts

6. **Command Palette**
   - Implementar cmdk (command palette)
   - Shortcut: Cmd/Ctrl + K
   - Quick actions: search, create folder, upload
   - Recent files quick access
   - Keyboard navigation

#### Entregables:
- ✅ Búsqueda funcional con filtros avanzados
- ✅ Vista de archivos recientes
- ✅ Sistema de favoritos
- ✅ Historial de búsqueda
- ✅ Command palette funcional
- ✅ Filters UI intuitiva

---

### **Sprint 7: Sincronización Offline (Semana 13-14)**

**Épica: Offline y Sincronización**

#### Historias de Usuario:
- Como usuario, quiero acceso a archivos offline
- Como usuario, quiero que mis cambios se sincronicen automáticamente
- Como usuario, quiero ver el estado de sincronización
- Como usuario, quiero gestionar archivos offline
- Como usuario, quiero ver cuánto espacio uso

#### Tareas Técnicas:

1. **Service Worker Sync**
   - Implementar Background Sync API
   - Queue de operaciones offline (CRUD)
   - Sync automático al recuperar conexión
   - Conflict resolution (last-write-wins o manual)
   - Retry logic exponencial

2. **Offline Storage (IndexedDB)**
   - Expandir schema Dexie
   - Store: files metadata, file blobs, sync queue
   - Cache management (LRU)
   - Límite de storage (configurable)
   - Clear cache utility

3. **Offline Queue System**
   - Queue operations: upload, delete, rename, move
   - Crear offline.store.ts
   - UI indicator: "Syncing...", "Offline", "Synced"
   - Queue viewer en settings
   - Manual retry option

4. **Offline UI/UX**
   - Offline indicator banner
   - Cached files badge/icon
   - "Available offline" toggle en file menu
   - Download for offline button
   - Offline mode toggle (force offline for testing)

5. **Storage Management**
   - Página /dashboard/settings/storage
   - Gráfico de uso por tipo de archivo
   - Lista de archivos más grandes
   - Clear cache button
   - Manage offline files
   - Mostrar: usado/disponible en cuenta
   - Quota management (backend)

6. **Network Status**
   - Detect online/offline con navigator.onLine
   - React to connection changes
   - Auto-sync on reconnect
   - Show sync status

#### Entregables:
- ✅ Sincronización automática con Background Sync
- ✅ Queue de operaciones offline
- ✅ Acceso offline a archivos cacheados
- ✅ UI de estado de sincronización
- ✅ Gestión de almacenamiento local
- ✅ Conflict resolution básico
- ✅ Storage analytics

---

### **Sprint 8: Optimización y Producción (Semana 15-16)**

**Épica: Performance, SEO y Seguridad**

#### Historias de Usuario:
- Como usuario, quiero que la app cargue rápido
- Como usuario, quiero que mis datos estén seguros
- Como usuario, quiero personalizar mi experiencia
- Como usuario, quiero ayuda/soporte

#### Tareas Técnicas:

1. **Performance Optimization**
   - Implementar code splitting dinámico
   - Lazy loading de components pesados
   - Virtual scrolling en listas largas (tanstack-virtual)
   - Image optimization con Next.js Image
   - Prefetch de rutas críticas
   - Bundle analysis y tree shaking
   - Lighthouse audit y mejoras

2. **SEO & Meta Tags**
   - Meta tags dinámicos por página
   - Open Graph tags
   - Sitemap.xml
   - robots.txt
   - Schema.org markup
   - Canonical URLs

3. **Security Hardening**
   - Implementar Content Security Policy (CSP)
   - Rate limiting en API (express-rate-limit)
   - Input sanitization (frontend y backend)
   - SQL injection prevention (Prisma ya protege)
   - XSS prevention
   - CORS configuration correcta
   - Helmet.js en Express
   - Secrets management (AWS Secrets Manager)

4. **Settings & Preferences**
   - Página /dashboard/settings completa con tabs:
     - Profile
     - Security (change password, 2FA opcional)
     - Storage
     - Notifications
     - Privacy
     - Appearance (theme, language)
   - Crear settings.store.ts
   - Persist preferences en DB

5. **Error Handling & Monitoring**
   - Error boundaries en React
   - Sentry integration (frontend)
   - Winston logging (backend)
   - Toast notifications para errores
   - Retry mechanisms
   - Graceful degradation

6. **Analytics & Monitoring**
   - Setup Prometheus metrics (backend ya tiene)
   - Grafana dashboards
   - Web Vitals tracking (CLS, FID, LCP)
   - User analytics (opcional: Posthog, Umami)
   - Error rate monitoring

7. **Testing**
   - Unit tests con Jest (services, utilities)
   - Component tests con React Testing Library
   - Integration tests (API)
   - E2E tests con Playwright (critical paths)
   - Target: 70% coverage mínimo

8. **Documentation & Deployment**
   - README completo
   - API documentation (Swagger/OpenAPI)
   - User guide/help section
   - Deployment guide
   - Docker production setup
   - CI/CD pipelines (GitHub Actions)
   - Rollback strategy

9. **UX Polish**
   - Animaciones con Framer Motion
   - Loading skeletons
   - Empty states mejorados
   - Error states informativos
   - Success feedback
   - Keyboard shortcuts documentation
   - Accessibility audit (WCAG 2.1 AA)
   - Mobile UX refinement

#### Entregables:
- ✅ App optimizada (Lighthouse 90+)
- ✅ SEO completo
- ✅ Seguridad hardened
- ✅ Settings completa
- ✅ Error handling robusto
- ✅ Monitoring completo
- ✅ Tests con 70%+ coverage
- ✅ Documentation completa
- ✅ PWA lista para producción
- ✅ Deployment automatizado
- ✅ UX pulida y accesible

---

## 🏗️ Arquitectura Técnica

### Stack Confirmado:

**Frontend (Next.js PWA):**
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS + shadcn/ui
- Zustand (state) + React Query (server state)
- Serwist (Service Workers)
- NextAuth.js (authentication)
- Dexie.js (IndexedDB)
- Framer Motion (animations)

**Backend (Express API):**
- Node.js 20 + Express + TypeScript
- PostgreSQL 15 + Prisma 6
- AWS S3 (file storage)
- JWT authentication
- Winston (logging)
- Prometheus (metrics)

**Infrastructure:**
- Docker + Docker Compose (development)
- PM2 (Next.js process management)
- Nginx (reverse proxy)
- EC2 (hosting)
- Grafana + Prometheus (monitoring)

### Puertos Configurados:

```
Frontend (Next.js):      3679
Backend (Express):       4578
PostgreSQL:              5432
Grafana:                 3847
Prometheus:              9287
AlertManager:            9341
Nginx (prod):            80/443
```

### Estructura de Carpetas:

```
/frontend
  /app                     # Next.js App Router
    /(auth)               # Auth routes
    /(dashboard)          # Main app routes
    /api                  # API routes (opcional)
  /components
    /ui                   # shadcn/ui components
    /features             # Feature components
    /layouts              # Layout components
  /lib
    /api                  # API clients
    /stores               # Zustand stores
    /hooks                # Custom hooks
    /utils                # Utilities
    /db                   # IndexedDB (Dexie)
  /types                  # TypeScript types
  /styles                 # Global styles
  /public                 # Static files + PWA assets

/express                  # Backend (ya existe)
  /src
    /config
    /controllers
    /services
    /routes
    /middleware
    /utils
  /prisma
    schema.prisma
    /migrations
```

---

## 📊 Métricas de Éxito

### Performance:
- **Lighthouse Score**: 90+ en todas las categorías
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Funcionalidad:
- **Upload**: Archivos hasta 100MB sin problemas
- **Offline**: Funcionalidad básica sin conexión
- **Cache Hit Rate**: > 80% para assets estáticos
- **Sync Success Rate**: > 95%

### UX:
- **Navigation**: < 3 clicks para acciones comunes
- **Mobile Responsive**: 100% funcional en móvil
- **Accessibility**: WCAG 2.1 AA compliance

### Security:
- **Authentication**: JWT seguro con refresh tokens
- **Data Encryption**: HTTPS everywhere
- **Input Validation**: 100% de endpoints validados

### SEO:
- **Meta Tags**: Completos en todas las páginas
- **Sitemap**: Generado automáticamente
- **Social Sharing**: Open Graph configurado

---

## ⚠️ Riesgos y Mitigaciones

### 1. **Costos de S3**
- **Riesgo**: Almacenamiento puede ser costoso con muchos usuarios
- **Mitigación**: 
  - Implementar límites por usuario (ej: 5GB gratis)
  - Lifecycle policies (mover a Glacier)
  - Compresión de imágenes
  - Limpieza de archivos eliminados

### 2. **Performance con Muchos Archivos**
- **Riesgo**: Listados lentos con miles de archivos
- **Mitigación**:
  - Paginación cursor-based
  - Virtual scrolling
  - Lazy loading
  - Índices en DB optimizados

### 3. **Sincronización Offline Compleja**
- **Riesgo**: Conflictos difíciles de resolver
- **Mitigación**:
  - Empezar con last-write-wins
  - Timestamps precisos
  - UI clara de estado de sync
  - Manual resolution si es necesario

### 4. **Browser Compatibility**
- **Riesgo**: Service Workers no disponibles en todos los browsers
- **Mitigación**:
  - Progressive enhancement
  - Fallback a funcionalidad sin offline
  - Browser detection y warnings
  - Polyfills donde sea posible

### 5. **Upload de Archivos Grandes**
- **Riesgo**: Uploads pueden fallar o ser lentos
- **Mitigación**:
  - Chunked uploads (>10MB)
  - Resume capability
  - Background uploads con Service Workers
  - Progress feedback claro

### 6. **Security Vulnerabilities**
- **Riesgo**: Exposición de datos sensibles
- **Mitigación**:
  - Regular security audits
  - Dependency updates automáticas
  - Rate limiting
  - Input validation estricta
  - CSP headers

---

## 📈 Roadmap Post-MVP

### Fase 2 (Meses 5-6):
- Colaboración en tiempo real (edición simultánea)
- Versioning de archivos
- File previews más avanzados
- Integración con Google Drive/Dropbox
- Mobile apps nativas (React Native)

### Fase 3 (Meses 7-9):
- OCR para documentos
- AI-powered search
- Auto-tagging con ML
- Video transcoding
- CDN para distribución global

### Fase 4 (Meses 10-12):
- Team workspaces
- Admin dashboard
- Analytics avanzado
- API pública para integraciones
- Plugins/Extensions system

---

## 🎓 Aprendizajes Clave

### De React Native a Next.js PWA:

**Ventajas Ganadas:**
- ✅ No app store dependencies
- ✅ Instant updates (no review process)
- ✅ Better SEO
- ✅ Universal accessibility (cualquier dispositivo)
- ✅ Menor costo de distribución
- ✅ Debugging más fácil

**Trade-offs:**
- ⚠️ Depende de navegador (no todos soportan PWA igualmente)
- ⚠️ No acceso a todas las APIs nativas
- ⚠️ Menos "app-like" que nativo (pero Service Workers ayudan)
- ⚠️ Límites de storage en browser

**Capacidades Mantenidas:**
- ✅ Offline functionality
- ✅ Push notifications
- ✅ File system access
- ✅ Camera/Media access
- ✅ Cross-platform support

---

Esta estrategia proporciona una base sólida para construir Merett Cloud PWA, priorizando funcionalidad core, experiencia de usuario, y preparación para escala futura.

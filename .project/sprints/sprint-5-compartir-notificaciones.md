# Sprint 5: Compartir y Notificaciones

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Sprint** | 05 |
| **Nombre** | Compartir y Notificaciones |
| **Estado** | ⚪ Planificado |
| **Inicio** | TBD |
| **Fin** | TBD |
| **Duración** | 2 semanas |

---

## 🎯 Objetivo del Sprint

Implementar sistema completo de compartir archivos y carpetas con control de permisos granular, generación de links públicos con expiración, y sistema de notificaciones web push. Incluye activity log para auditoría.

**Valor entregado:** Usuarios pueden colaborar compartiendo archivos, controlar quién tiene acceso, y recibir notificaciones de actividad importante.

---

## 📊 Épicas Relacionadas

| Épica | Porcentaje en este Sprint |
|-------|--------------------------|
| EPIC-05: Compartir y Colaboración | 100% |

---

## 📝 Tareas del Sprint

### 🔴 Alta Prioridad - Share System Backend

- [ ] **TASK-073**: Crear modelo Prisma para Shares
  - Épica: EPIC-05
  - Estimación: 3h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] Modelo Share en schema.prisma
    - [ ] Modelo Permission vinculado
    - [ ] Relaciones con User, File, Folder
    - [ ] Migraciones creadas
    - [ ] Índices optimizados
  - **Notas**: Ver `4-database-schema.md` para schema

- [ ] **TASK-074**: Implementar endpoints de compartir
  - Épica: EPIC-05
  - Estimación: 5h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] POST /api/v1/shares (create share)
    - [ ] GET /api/v1/shares?type=owned|received
    - [ ] GET /api/v1/shares/:shareId
    - [ ] PATCH /api/v1/shares/:shareId (update permisos)
    - [ ] DELETE /api/v1/shares/:shareId (revoke)
    - [ ] Validación de permisos
  - **Notas**: Ver `5-api-specification.md`

- [ ] **TASK-075**: Sistema de permisos granulares
  - Épica: EPIC-05
  - Estimación: 4h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] Permission levels: viewer, editor, owner
    - [ ] Can view, download, upload, edit, delete, share
    - [ ] Middleware para verificar permisos
    - [ ] Cascade de permisos en carpetas
    - [ ] Heredar permisos de carpeta padre
  - **Notas**: Tabla permissions en DB

- [ ] **TASK-076**: Generar links públicos con token
  - Épica: EPIC-05
  - Estimación: 3h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] Generar token único (crypto.randomBytes)
    - [ ] URL: /s/:shareToken
    - [ ] Expiration time configurable
    - [ ] Password protection opcional
    - [ ] Track accesos (access_count)
    - [ ] Endpoint público GET /public/shares/:token
  - **Notas**: No requiere autenticación

### 🔴 Alta Prioridad - Share System Frontend

- [ ] **TASK-077**: Crear ShareDialog component
  - Épica: EPIC-05
  - Estimación: 5h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Modal para compartir
    - [ ] Tab 1: Compartir con usuario (email search)
    - [ ] Tab 2: Link público
    - [ ] Permission selector (view, edit)
    - [ ] Expiration date picker
    - [ ] Password protection toggle
    - [ ] Copy link button
    - [ ] List de usuarios con acceso
  - **Notas**: shadcn/ui Dialog + Tabs

- [ ] **TASK-078**: User search/autocomplete
  - Épica: EPIC-05
  - Estimación: 3h
  - Asignado: @fullstack
  - **Criterios de aceptación**:
    - [ ] Backend: GET /api/v1/users/search?q=email
    - [ ] Frontend: Combobox con búsqueda
    - [ ] Debounce en búsqueda
    - [ ] Mostrar resultados con avatar
    - [ ] Selección de usuario
  - **Notas**: shadcn/ui Combobox

- [ ] **TASK-079**: Página de archivos compartidos
  - Épica: EPIC-05
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Página /dashboard/shared (compartidos por mí)
    - [ ] Página /dashboard/shared-with-me
    - [ ] Lista de archivos con quien está compartido
    - [ ] Filtros: por usuario, por fecha
    - [ ] Manage access desde aquí
    - [ ] Revoke access button
  - **Notas**: Reusar FileItem component

- [ ] **TASK-080**: Permissions manager UI
  - Épica: EPIC-05
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Lista de usuarios con acceso
    - [ ] Permission selector por usuario
    - [ ] Remove access button
    - [ ] Change owner (opcional)
    - [ ] Last accessed info
  - **Notas**: Dentro del ShareDialog o file details

- [ ] **TASK-081**: Public share page
  - Épica: EPIC-05
  - Estimación: 4h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Página /s/[token] (pública)
    - [ ] Mostrar file preview
    - [ ] Download button
    - [ ] Password prompt si requerido
    - [ ] Branding de Merett Cloud
    - [ ] Expiration info visible
  - **Notas**: No requiere login

### 🟡 Media Prioridad - Notifications

- [ ] **TASK-082**: Setup Web Push Notifications
  - Épica: EPIC-05
  - Estimación: 5h
  - Asignado: @fullstack
  - **Criterios de aceptación**:
    - [ ] Service Worker notification handler
    - [ ] Backend: Generar VAPID keys
    - [ ] Frontend: Request permission
    - [ ] Backend: POST /api/v1/notifications/subscribe
    - [ ] Backend: Send notification con FCM o similar
    - [ ] Frontend: Show notification
  - **Notas**: Usar Firebase Cloud Messaging o Web Push API nativo

- [ ] **TASK-083**: Sistema de notificaciones in-app
  - Épica: EPIC-05
  - Estimación: 4h
  - Asignado: @fullstack
  - **Criterios de aceptación**:
    - [ ] Backend: Tabla notifications en DB
    - [ ] Backend: Endpoints de notifications
    - [ ] Frontend: Notification dropdown en header
    - [ ] Frontend: Badge con unread count
    - [ ] Mark as read functionality
    - [ ] Notification types: share, comment, mention
  - **Notas**: Ver `5-api-specification.md`

- [ ] **TASK-084**: Notification preferences
  - Épica: EPIC-05
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Settings page: /dashboard/settings/notifications
    - [ ] Toggle por tipo de notificación
    - [ ] Email notifications toggle
    - [ ] Push notifications toggle
    - [ ] Frequency settings
    - [ ] Do not disturb mode
  - **Notas**: Guardar en user settings

- [ ] **TASK-085**: Toast notifications con sonner
  - Épica: EPIC-05
  - Estimación: 2h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] sonner integrado
    - [ ] Success toasts
    - [ ] Error toasts
    - [ ] Info toasts
    - [ ] Custom actions en toast
    - [ ] Position configurable
  - **Notas**: Para feedback local (no push)

### 🟡 Media Prioridad - Activity Log

- [ ] **TASK-086**: Backend - Activity logging
  - Épica: EPIC-05
  - Estimación: 3h
  - Asignado: @backend
  - **Criterios de aceptación**:
    - [ ] Tabla activity_logs en DB
    - [ ] Log automático de acciones: share, download, upload, delete
    - [ ] Store IP, user agent
    - [ ] GET /api/v1/files/:id/activity
    - [ ] Paginación de activity
  - **Notas**: Ver `4-database-schema.md`

- [ ] **TASK-087**: Frontend - Activity timeline
  - Épica: EPIC-05
  - Estimación: 3h
  - Asignado: @frontend
  - **Criterios de aceptación**:
    - [ ] Timeline component
    - [ ] Mostrar en file details
    - [ ] Icons por tipo de acción
    - [ ] Formato de fechas relativo (hace 2 horas)
    - [ ] Filtro por tipo de acción
  - **Notas**: En tab "Activity" del file details

### 🟢 Baja Prioridad - Collaboration

- [ ] **TASK-088**: Comments en archivos (opcional)
  - Épica: EPIC-05
  - Estimación: 5h
  - Asignado: @fullstack
  - **Criterios de aceptación**:
    - [ ] Backend: Tabla comments
    - [ ] Backend: CRUD endpoints
    - [ ] Frontend: Comments section en file details
    - [ ] Add comment form
    - [ ] Edit/Delete own comments
    - [ ] Mentions (@username)
  - **Notas**: Feature opcional para colaboración

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
Alta Prioridad:    11 tareas (69%)
Media Prioridad:    4 tareas (25%)
Baja Prioridad:     1 tarea  (6%)
```

### Por Área

```
Backend Sharing:    4 tareas
Frontend Sharing:   5 tareas
Notifications:      4 tareas
Activity Log:       2 tareas
Collaboration:      1 tarea
```

---

## 🎯 Definition of Done

### Funcionalidad
- ✅ Usuario puede compartir archivos con otros usuarios
- ✅ Usuario puede generar links públicos
- ✅ Usuario puede controlar permisos (view, edit)
- ✅ Usuario puede ver archivos compartidos con él
- ✅ Usuario puede revocar acceso
- ✅ Usuario recibe notificaciones push
- ✅ Usuario puede ver activity log

### Técnico
- ✅ Sistema de permisos funcionando
- ✅ Public share links funcionando
- ✅ Password protection funcionando
- ✅ Web Push API funcionando
- ✅ Activity log registrando acciones
- ✅ Notification preferences guardadas

### UX/UI
- ✅ ShareDialog intuitivo y completo
- ✅ Permissions UI clara
- ✅ Notifications dropdown funcional
- ✅ Toast feedback inmediato
- ✅ Public share page amigable

---

## 📦 Entregables del Sprint

1. ✅ Sistema de compartir con permisos granulares
2. ✅ Links públicos con password y expiración
3. ✅ Páginas de shared/shared-with-me
4. ✅ User search para compartir
5. ✅ Permissions manager UI
6. ✅ Web Push notifications
7. ✅ In-app notifications dropdown
8. ✅ Notification preferences
9. ✅ Activity log backend y frontend
10. ✅ Toast notifications con sonner

---

## 🔗 Recursos

### Referencias Técnicas
- [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
- [sonner](https://sonner.emilkowal.ski/)

---

## 📝 Notas

- Web Push requiere HTTPS (usar ngrok en dev)
- Notificaciones requieren permiso del usuario
- Activity log consume espacio - implementar retention policy
- Public shares son vulnerables si token se filtra - considerar rate limiting
- Email notifications pueden ser opcionales (futuro)

---

## ⚡ Testing Checklist

### Sharing
- [ ] Compartir archivo con usuario específico
- [ ] Generar link público
- [ ] Link con password funciona
- [ ] Link expirado no permite acceso
- [ ] Revocar acceso funciona
- [ ] Permissions view/edit funcionan

### Notifications
- [ ] Push notification llega
- [ ] Click en notification abre app
- [ ] In-app notifications aparecen
- [ ] Mark as read funciona
- [ ] Preferences se guardan

### Activity
- [ ] Activity log registra acciones
- [ ] Timeline muestra eventos
- [ ] Filtros funcionan

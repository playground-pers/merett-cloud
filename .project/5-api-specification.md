# API Specification - Merett Cloud

## 📡 Visión General

API RESTful para Merett Cloud PWA con autenticación JWT, paginación, rate limiting y versionado.

### Base URL

```
Development: http://localhost:4578/api/v1
Production: https://merettcloud.com/api/v1
```

### Características

- **Versionado**: `/api/v1`
- **Autenticación**: JWT con NextAuth.js
- **Rate Limiting**: 100 requests/min por usuario
- **Paginación**: Cursor-based pagination
- **Compresión**: gzip + brotli enabled
- **CORS**: Configurado para PWA

---

## 🔐 Autenticación

Todos los endpoints (excepto auth) requieren header de autorización:

```http
Authorization: Bearer <access_token>
```

### Refresh Token Flow

```
1. Access token expira (15 min)
2. Cliente detecta 401 Unauthorized
3. Cliente usa refresh token para obtener nuevo access token
4. Si refresh token válido → nuevo par de tokens
5. Si refresh token expirado → re-login requerido
```

---

## 📋 Tabla de Contenidos

1. [Authentication](#authentication)
2. [Users](#users)
3. [Files](#files)
4. [Folders](#folders)
5. [Upload](#upload)
6. [Download](#download)
7. [Shares](#shares)
8. [Search](#search)
9. [Notifications](#notifications)
10. [Storage](#storage)

---

## 🔑 Authentication

### Register

Crear nueva cuenta de usuario.

```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response 201 Created:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "storageQuota": 5368709120,
      "storageUsed": 0,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "expiresIn": 900
    }
  }
}
```

**Errors:**

- `400` - Validación fallida
- `409` - Email ya existe

---

### Login

Autenticar usuario existente.

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "profilePictureUrl": "https://...",
      "storageQuota": 5368709120,
      "storageUsed": 1073741824,
      "lastLoginAt": "2025-01-15T10:00:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "expiresIn": 900
    }
  }
}
```

**Errors:**

- `400` - Credenciales inválidas
- `401` - Email no verificado
- `403` - Cuenta suspendida

---

### Refresh Token

Obtener nuevo access token usando refresh token.

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": 900
  }
}
```

**Errors:**

- `401` - Refresh token inválido o expirado

---

### Logout

Invalidar tokens del usuario.

```http
POST /auth/logout
Authorization: Bearer <token>

{
  "refreshToken": "eyJhbGc..."
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Forgot Password

Solicitar reset de contraseña.

```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

---

### Reset Password

Resetear contraseña con token.

```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "newPassword": "NewSecurePass123!"
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

## 👤 Users

### Get Current User

Obtener información del usuario autenticado.

```http
GET /users/me
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "profilePictureUrl": "https://...",
    "phoneNumber": "+1234567890",
    "emailVerified": true,
    "storageQuota": 5368709120,
    "storageUsed": 1073741824,
    "role": "user",
    "status": "active",
    "lastLoginAt": "2025-01-15T10:00:00Z",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
}
```

---

### Update User Profile

Actualizar información del perfil.

```http
PATCH /users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "phoneNumber": "+1234567890"
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Smith",
    "phoneNumber": "+1234567890",
    "updatedAt": "2025-01-15T10:30:00Z"
  }
}
```

---

### Upload Profile Picture

Actualizar foto de perfil.

```http
POST /users/me/profile-picture
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: [binary data]
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "profilePictureUrl": "https://s3.../profile-pictures/uuid.jpg"
  }
}
```

---

### Change Password

Cambiar contraseña del usuario.

```http
POST /users/me/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Errors:**

- `400` - Contraseña actual incorrecta

---

## 📁 Files

### List Files

Listar archivos del usuario con paginación.

```http
GET /files?folderId=uuid&limit=50&cursor=abc123&sortBy=name&order=asc
Authorization: Bearer <token>
```

**Query Parameters:**

- `folderId` (optional): ID de carpeta (null = raíz)
- `limit` (optional): Número de resultados (default: 50, max: 100)
- `cursor` (optional): Cursor de paginación
- `sortBy` (optional): Campo de ordenamiento (name, size, createdAt)
- `order` (optional): asc o desc (default: asc)
- `category` (optional): Filtrar por categoría (image, video, document, audio)

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "files": [
      {
        "id": "uuid",
        "name": "document.pdf",
        "originalName": "My Document.pdf",
        "fileType": "application/pdf",
        "fileExtension": "pdf",
        "fileCategory": "document",
        "sizeBytes": 1048576,
        "thumbnailUrl": "https://...",
        "isFavorite": false,
        "isShared": false,
        "downloadCount": 5,
        "viewCount": 12,
        "folderId": "uuid",
        "createdAt": "2025-01-15T10:00:00Z",
        "updatedAt": "2025-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "nextCursor": "xyz789",
      "hasMore": true
    }
  }
}
```

---

### Get File Details

Obtener detalles completos de un archivo.

```http
GET /files/:fileId
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "vacation.jpg",
    "originalName": "IMG_20250115.jpg",
    "fileType": "image/jpeg",
    "fileExtension": "jpg",
    "fileCategory": "image",
    "sizeBytes": 2097152,
    "checksum": "sha256hash",
    "thumbnailUrl": "https://...",
    "width": 1920,
    "height": 1080,
    "metadata": {
      "exif": {
        "camera": "iPhone 15",
        "location": "40.7128,-74.0060"
      }
    },
    "isFavorite": true,
    "isShared": false,
    "downloadCount": 3,
    "viewCount": 8,
    "folderId": "uuid",
    "folder": {
      "id": "uuid",
      "name": "Photos",
      "path": "/Photos"
    },
    "tags": [
      {
        "id": "uuid",
        "name": "vacation",
        "color": "#FF5733"
      }
    ],
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z",
    "lastAccessedAt": "2025-01-15T12:00:00Z"
  }
}
```

**Errors:**

- `404` - Archivo no encontrado
- `403` - Sin permisos

---

### Update File

Actualizar metadata de archivo.

```http
PATCH /files/:fileId
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "new-name.pdf",
  "folderId": "uuid"
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "new-name.pdf",
    "folderId": "uuid",
    "updatedAt": "2025-01-15T11:00:00Z"
  }
}
```

---

### Delete File

Eliminar archivo (soft delete).

```http
DELETE /files/:fileId
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

---

### Toggle Favorite

Marcar/desmarcar archivo como favorito.

```http
POST /files/:fileId/favorite
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "isFavorite": true
  }
}
```

---

### Get File Versions

Listar versiones de un archivo.

```http
GET /files/:fileId/versions
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "versions": [
      {
        "id": "uuid",
        "versionNumber": 2,
        "sizeBytes": 1048576,
        "checksum": "sha256hash",
        "createdBy": {
          "id": "uuid",
          "name": "John Doe"
        },
        "createdAt": "2025-01-15T12:00:00Z"
      }
    ]
  }
}
```

---

## 📂 Folders

### List Folders

Listar carpetas del usuario.

```http
GET /folders?parentId=uuid
Authorization: Bearer <token>
```

**Query Parameters:**

- `parentId` (optional): ID de carpeta padre (null = raíz)

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "folders": [
      {
        "id": "uuid",
        "name": "Documents",
        "parentFolderId": null,
        "path": "/Documents",
        "color": "#4CAF50",
        "isFavorite": false,
        "isShared": false,
        "fileCount": 15,
        "folderCount": 3,
        "totalSize": 52428800,
        "createdAt": "2025-01-10T00:00:00Z",
        "updatedAt": "2025-01-15T10:00:00Z"
      }
    ]
  }
}
```

---

### Get Folder Details

Obtener detalles de carpeta incluyendo contenido.

```http
GET /folders/:folderId
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Documents",
    "parentFolderId": null,
    "path": "/Documents",
    "color": "#4CAF50",
    "isFavorite": false,
    "isShared": false,
    "breadcrumbs": [
      {
        "id": null,
        "name": "Root"
      },
      {
        "id": "uuid",
        "name": "Documents"
      }
    ],
    "stats": {
      "fileCount": 15,
      "folderCount": 3,
      "totalSize": 52428800
    },
    "createdAt": "2025-01-10T00:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
}
```

---

### Create Folder

Crear nueva carpeta.

```http
POST /folders
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Folder",
  "parentFolderId": "uuid",
  "color": "#FF5733"
}
```

**Response 201 Created:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "New Folder",
    "parentFolderId": "uuid",
    "path": "/Documents/New Folder",
    "color": "#FF5733",
    "createdAt": "2025-01-15T11:00:00Z"
  }
}
```

**Errors:**

- `409` - Carpeta con ese nombre ya existe

---

### Update Folder

Actualizar carpeta (renombrar o mover).

```http
PATCH /folders/:folderId
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Renamed Folder",
  "parentFolderId": "uuid",
  "color": "#2196F3"
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Renamed Folder",
    "parentFolderId": "uuid",
    "path": "/Documents/Renamed Folder",
    "color": "#2196F3",
    "updatedAt": "2025-01-15T11:30:00Z"
  }
}
```

---

### Delete Folder

Eliminar carpeta y su contenido (soft delete).

```http
DELETE /folders/:folderId
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "message": "Folder deleted successfully",
  "data": {
    "deletedFiles": 15,
    "deletedFolders": 3
  }
}
```

---

## ⬆️ Upload

### Request Upload URL

Solicitar presigned URL para subir archivo a S3.

```http
POST /upload/presigned-url
Authorization: Bearer <token>
Content-Type: application/json

{
  "fileName": "document.pdf",
  "fileSize": 1048576,
  "fileType": "application/pdf",
  "folderId": "uuid",
  "checksum": "sha256hash"
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "uploadUrl": "https://s3.amazonaws.com/...",
    "fileId": "uuid",
    "s3Key": "users/uuid/files/unique-id.pdf",
    "expiresIn": 3600,
    "uploadMethod": "PUT"
  }
}
```

**Errors:**

- `400` - Archivo duplicado (mismo checksum)
- `403` - Storage quota excedido

---

### Request Multipart Upload

Para archivos grandes (>100MB).

```http
POST /upload/multipart/initiate
Authorization: Bearer <token>
Content-Type: application/json

{
  "fileName": "large-video.mp4",
  "fileSize": 524288000,
  "fileType": "video/mp4",
  "folderId": "uuid",
  "partSize": 5242880
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "uploadSessionId": "uuid",
    "s3UploadId": "aws-multipart-id",
    "s3Key": "users/uuid/files/unique-id.mp4",
    "partUrls": [
      {
        "partNumber": 1,
        "uploadUrl": "https://s3.amazonaws.com/..."
      }
    ],
    "expiresAt": "2025-01-15T13:00:00Z"
  }
}
```

---

### Complete Upload

Confirmar que el archivo fue subido exitosamente.

```http
POST /upload/complete
Authorization: Bearer <token>
Content-Type: application/json

{
  "fileId": "uuid",
  "checksum": "sha256hash"
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "file": {
      "id": "uuid",
      "name": "document.pdf",
      "sizeBytes": 1048576,
      "thumbnailUrl": "https://...",
      "createdAt": "2025-01-15T11:00:00Z"
    }
  }
}
```

---

### Complete Multipart Upload

Finalizar upload multipart.

```http
POST /upload/multipart/complete
Authorization: Bearer <token>
Content-Type: application/json

{
  "uploadSessionId": "uuid",
  "parts": [
    {
      "partNumber": 1,
      "etag": "etag-value"
    }
  ]
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "file": {
      "id": "uuid",
      "name": "large-video.mp4",
      "sizeBytes": 524288000,
      "createdAt": "2025-01-15T12:00:00Z"
    }
  }
}
```

---

### Get Upload Progress

Obtener estado de upload multipart.

```http
GET /upload/multipart/:uploadSessionId/progress
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "uploadSessionId": "uuid",
    "status": "uploading",
    "partsCompleted": 5,
    "partsTotal": 10,
    "percentage": 50,
    "expiresAt": "2025-01-15T13:00:00Z"
  }
}
```

---

## ⬇️ Download

### Get Download URL

Obtener signed URL para descargar archivo.

```http
GET /download/:fileId
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://s3.amazonaws.com/...",
    "fileName": "document.pdf",
    "fileSize": 1048576,
    "expiresIn": 300
  }
}
```

**Errors:**

- `404` - Archivo no encontrado
- `403` - Sin permisos de descarga

---

### Download Multiple Files

Descargar múltiples archivos como ZIP.

```http
POST /download/batch
Authorization: Bearer <token>
Content-Type: application/json

{
  "fileIds": ["uuid1", "uuid2", "uuid3"],
  "zipName": "my-files.zip"
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://s3.amazonaws.com/zips/uuid.zip",
    "fileName": "my-files.zip",
    "expiresIn": 600
  }
}
```

---

## 🔗 Shares

### Create Share

Compartir archivo o carpeta.

```http
POST /shares
Authorization: Bearer <token>
Content-Type: application/json

{
  "resourceType": "file",
  "resourceId": "uuid",
  "sharedWithUserId": "uuid",
  "permissionLevel": "view",
  "expiresAt": "2025-12-31T23:59:59Z"
}
```

**Para share público:**

```json
{
  "resourceType": "file",
  "resourceId": "uuid",
  "isPublic": true,
  "permissionLevel": "view",
  "requiresPassword": true,
  "password": "SecurePass123",
  "expiresAt": "2025-12-31T23:59:59Z"
}
```

**Response 201 Created:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "shareToken": "unique-token",
    "shareUrl": "https://merettcloud.com/s/unique-token",
    "resourceType": "file",
    "resourceId": "uuid",
    "permissionLevel": "view",
    "isPublic": true,
    "requiresPassword": true,
    "expiresAt": "2025-12-31T23:59:59Z",
    "createdAt": "2025-01-15T11:00:00Z"
  }
}
```

---

### List Shares

Listar todos los shares del usuario.

```http
GET /shares?type=owned
Authorization: Bearer <token>
```

**Query Parameters:**

- `type`: "owned" (compartidos por mí) o "received" (compartidos conmigo)

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "shares": [
      {
        "id": "uuid",
        "resourceType": "file",
        "resourceId": "uuid",
        "resource": {
          "id": "uuid",
          "name": "document.pdf",
          "thumbnailUrl": "https://..."
        },
        "sharedWith": {
          "id": "uuid",
          "name": "Jane Doe",
          "email": "jane@example.com"
        },
        "permissionLevel": "edit",
        "isPublic": false,
        "accessCount": 5,
        "lastAccessedAt": "2025-01-15T10:00:00Z",
        "expiresAt": null,
        "createdAt": "2025-01-10T00:00:00Z"
      }
    ]
  }
}
```

---

### Update Share

Actualizar permisos de share.

```http
PATCH /shares/:shareId
Authorization: Bearer <token>
Content-Type: application/json

{
  "permissionLevel": "edit",
  "expiresAt": "2025-12-31T23:59:59Z"
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "permissionLevel": "edit",
    "expiresAt": "2025-12-31T23:59:59Z",
    "updatedAt": "2025-01-15T11:30:00Z"
  }
}
```

---

### Delete Share

Revocar acceso compartido.

```http
DELETE /shares/:shareId
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "message": "Share revoked successfully"
}
```

---

### Access Shared Resource

Acceder a recurso compartido con token público.

```http
GET /public/shares/:shareToken
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "shareId": "uuid",
    "resourceType": "file",
    "resource": {
      "id": "uuid",
      "name": "document.pdf",
      "fileType": "application/pdf",
      "sizeBytes": 1048576,
      "thumbnailUrl": "https://...",
      "owner": {
        "name": "John Doe"
      }
    },
    "permissionLevel": "view",
    "requiresPassword": false,
    "expiresAt": null
  }
}
```

**Errors:**

- `404` - Share no encontrado o expirado
- `401` - Contraseña requerida

---

## 🔍 Search

### Search Files

Búsqueda full-text de archivos.

```http
GET /search?q=documento&category=document&limit=20
Authorization: Bearer <token>
```

**Query Parameters:**

- `q` (required): Término de búsqueda
- `category` (optional): Filtrar por categoría
- `fileType` (optional): Filtrar por tipo MIME
- `dateFrom` (optional): Fecha desde (ISO 8601)
- `dateTo` (optional): Fecha hasta (ISO 8601)
- `minSize` (optional): Tamaño mínimo en bytes
- `maxSize` (optional): Tamaño máximo en bytes
- `limit` (optional): Número de resultados (default: 20, max: 100)

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "uuid",
        "name": "documento-importante.pdf",
        "fileType": "application/pdf",
        "sizeBytes": 1048576,
        "thumbnailUrl": "https://...",
        "folder": {
          "id": "uuid",
          "name": "Documents",
          "path": "/Documents"
        },
        "relevanceScore": 0.95,
        "createdAt": "2025-01-10T00:00:00Z"
      }
    ],
    "totalResults": 5,
    "query": "documento",
    "executionTime": 45
  }
}
```

---

### Recent Files

Obtener archivos recientes del usuario.

```http
GET /search/recent?limit=20
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "files": [
      {
        "id": "uuid",
        "name": "document.pdf",
        "fileType": "application/pdf",
        "sizeBytes": 1048576,
        "thumbnailUrl": "https://...",
        "folder": {
          "name": "Documents"
        },
        "createdAt": "2025-01-15T10:00:00Z"
      }
    ]
  }
}
```

---

### Favorites

Obtener archivos favoritos.

```http
GET /search/favorites?limit=50
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "files": [
      {
        "id": "uuid",
        "name": "important.pdf",
        "fileType": "application/pdf",
        "sizeBytes": 1048576,
        "thumbnailUrl": "https://...",
        "createdAt": "2025-01-10T00:00:00Z"
      }
    ]
  }
}
```

---

## 🔔 Notifications

### List Notifications

Listar notificaciones del usuario.

```http
GET /notifications?unreadOnly=true&limit=50
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "uuid",
        "type": "share",
        "title": "New file shared",
        "message": "John Doe shared 'document.pdf' with you",
        "data": {
          "shareId": "uuid",
          "fileId": "uuid"
        },
        "isRead": false,
        "actionUrl": "merettcloud://files/uuid",
        "createdAt": "2025-01-15T10:00:00Z"
      }
    ],
    "unreadCount": 3
  }
}
```

---

### Mark as Read

Marcar notificación como leída.

```http
POST /notifications/:notificationId/read
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

### Mark All as Read

Marcar todas las notificaciones como leídas.

```http
POST /notifications/read-all
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

## 💾 Storage

### Get Storage Stats

Obtener estadísticas de almacenamiento.

```http
GET /storage/stats
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "storageQuota": 5368709120,
    "storageUsed": 1073741824,
    "storageAvailable": 4294967296,
    "usagePercentage": 20,
    "breakdown": {
      "images": 536870912,
      "videos": 268435456,
      "documents": 134217728,
      "audio": 67108864,
      "other": 67108864
    },
    "fileCount": 150,
    "folderCount": 12
  }
}
```

---

### Get Storage History

Obtener histórico de uso de almacenamiento.

```http
GET /storage/history?period=30d
Authorization: Bearer <token>
```

**Query Parameters:**

- `period`: "7d", "30d", "90d", "1y"

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "history": [
      {
        "date": "2025-01-15",
        "storageUsed": 1073741824,
        "fileCount": 150
      }
    ]
  }
}
```

---

## 🌐 Error Responses

Todos los errores siguen el mismo formato:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      "field": "Error details if applicable"
    }
  }
}
```

### HTTP Status Codes

- `200` - OK: Request succeeded
- `201` - Created: Resource created successfully
- `204` - No Content: Request succeeded with no response body
- `400` - Bad Request: Invalid request parameters
- `401` - Unauthorized: Missing or invalid authentication
- `403` - Forbidden: Authenticated but not authorized
- `404` - Not Found: Resource not found
- `409` - Conflict: Resource conflict (duplicate, etc)
- `413` - Payload Too Large: File size exceeds limit
- `429` - Too Many Requests: Rate limit exceeded
- `500` - Internal Server Error: Server error
- `503` - Service Unavailable: Server temporarily unavailable

### Common Error Codes

```json
{
  "INVALID_CREDENTIALS": "Invalid email or password",
  "EMAIL_ALREADY_EXISTS": "Email already registered",
  "STORAGE_QUOTA_EXCEEDED": "Storage quota exceeded",
  "FILE_NOT_FOUND": "File not found",
  "FOLDER_NOT_FOUND": "Folder not found",
  "SHARE_NOT_FOUND": "Share not found or expired",
  "INVALID_TOKEN": "Invalid or expired token",
  "PERMISSION_DENIED": "Permission denied",
  "RATE_LIMIT_EXCEEDED": "Rate limit exceeded",
  "FILE_TOO_LARGE": "File size exceeds maximum allowed",
  "INVALID_FILE_TYPE": "File type not allowed",
  "DUPLICATE_FILE": "File with same checksum already exists",
  "FOLDER_NAME_EXISTS": "Folder with that name already exists"
}
```

---

## 📊 Rate Limiting

### Limits

```
Global: 100 requests/minute per user
Upload: 10 uploads/minute per user
Download: 50 downloads/minute per user
Search: 20 searches/minute per user
```

### Rate Limit Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642271400
```

### Rate Limit Exceeded Response

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again later.",
    "details": {
      "retryAfter": 60
    }
  }
}
```

---

## 🔄 Pagination

Se usa cursor-based pagination para listas:

### Request

```http
GET /files?limit=50&cursor=eyJpZCI6InV1aWQifQ==
```

### Response

```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "nextCursor": "eyJpZCI6InV1aWQyIn0=",
      "hasMore": true,
      "totalCount": 150
    }
  }
}
```

---

## 🔐 Security Headers

Todos los endpoints responden con security headers:

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

---

## 📱 Mobile-Specific Endpoints

### Register Device

Registrar dispositivo para push notifications.

```http
POST /devices/register
Authorization: Bearer <token>
Content-Type: application/json

{
  "deviceToken": "expo-push-token",
  "deviceType": "ios",
  "appVersion": "1.0.0",
  "osVersion": "17.0"
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "deviceId": "uuid"
  }
}
```

---

### Sync Queue

Obtener operaciones pendientes de sincronización.

```http
GET /sync/queue
Authorization: Bearer <token>
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "operations": [
      {
        "id": "uuid",
        "operationType": "create",
        "resourceType": "file",
        "payload": {...},
        "createdAt": "2025-01-15T10:00:00Z"
      }
    ]
  }
}
```

---

### Process Sync Queue

Procesar operaciones offline.

```http
POST /sync/process
Authorization: Bearer <token>
Content-Type: application/json

{
  "operations": [
    {
      "id": "uuid",
      "operationType": "create",
      "resourceType": "file",
      "payload": {...}
    }
  ]
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "data": {
    "processed": 5,
    "failed": 0,
    "conflicts": []
  }
}
```

---

## 🧪 Testing

### Health Check

```http
GET /health
```

**Response 200 OK:**

```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2025-01-15T10:00:00Z",
  "services": {
    "database": "healthy",
    "s3": "healthy",
    "redis": "healthy"
  }
}
```

---

## 📝 Changelog

### v1.0.0 (2025-01-15)

- Initial API release
- Authentication endpoints
- File management
- Folder management
- Upload/Download
- Sharing
- Search
- Notifications
- Storage management

---

Esta especificación completa define todos los endpoints REST necesarios para Merett Cloud, con ejemplos claros de request/response y manejo de errores consistente.

# Database Schema - Merett Cloud PWA

## 📊 Visión General

Base de datos **PostgreSQL 15.x** con Prisma ORM, relaciones normalizadas, índices optimizados y soporte para búsqueda full-text.

### Características Principales

- **ACID Compliance**: Transacciones seguras
- **UUID Primary Keys**: Seguridad y distribución
- **Soft Deletes**: Recuperación de datos
- **Timestamps**: Auditoría completa
- **JSONB Support**: Metadata flexible con indexación
- **Full-Text Search**: Búsqueda eficiente con pg_trgm
- **Prisma ORM**: Type-safe queries y migrations

---

## 🗂️ Diagrama de Relaciones

```
┌─────────────┐
│    users    │
└──────┬──────┘
       │
       ├──────────────┐
       │              │
       ▼              ▼
┌─────────┐    ┌─────────────┐
│ folders │◄───┤    files    │
└────┬────┘    └──────┬──────┘
     │                │
     │                ├───────────┐
     │                │           │
     ▼                ▼           ▼
┌──────────┐   ┌──────────┐  ┌──────────────┐
│ folders  │   │  shares  │  │ file_versions│
│(self-ref)│   └────┬─────┘  └──────────────┘
└──────────┘        │
                    ▼
            ┌───────────────┐
            │  permissions  │
            └───────────────┘
```

---

## 📋 Tablas Principales

### 1. users

Información de usuarios del sistema.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  profile_picture_url TEXT,
  phone_number VARCHAR(20),
  email_verified BOOLEAN DEFAULT FALSE,
  email_verification_token VARCHAR(255),
  password_reset_token VARCHAR(255),
  password_reset_expires TIMESTAMP,
  storage_quota BIGINT DEFAULT 5368709120, -- 5GB en bytes
  storage_used BIGINT DEFAULT 0,
  role VARCHAR(20) DEFAULT 'user', -- 'user', 'admin'
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'suspended', 'deleted'
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Índices
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at DESC);
CREATE INDEX idx_users_deleted_at ON users(deleted_at) WHERE deleted_at IS NULL;

-- Trigger para updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Campos clave:**

- `storage_quota`: Límite de almacenamiento (default 5GB)
- `storage_used`: Espacio utilizado calculado
- `role`: Control de acceso
- `deleted_at`: Soft delete

---

### 2. folders

Estructura jerárquica de carpetas.

```sql
CREATE TABLE folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  parent_folder_id UUID REFERENCES folders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  path TEXT NOT NULL, -- Path completo para búsquedas rápidas
  color VARCHAR(7), -- Color hex para UI
  is_favorite BOOLEAN DEFAULT FALSE,
  is_shared BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  CONSTRAINT unique_folder_name_per_parent UNIQUE(name, parent_folder_id, user_id)
);

-- Índices
CREATE INDEX idx_folders_user_id ON folders(user_id);
CREATE INDEX idx_folders_parent_id ON folders(parent_folder_id);
CREATE INDEX idx_folders_path ON folders(path);
CREATE INDEX idx_folders_name_trgm ON folders USING gin(name gin_trgm_ops);
CREATE INDEX idx_folders_deleted_at ON folders(deleted_at) WHERE deleted_at IS NULL;

-- Trigger para updated_at
CREATE TRIGGER update_folders_updated_at
  BEFORE UPDATE ON folders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Campos clave:**

- `parent_folder_id`: Jerarquía de carpetas (NULL = raíz)
- `path`: Path completo (ej: "/Documents/Work/Project")
- `is_favorite`: Acceso rápido
- `color`: Personalización UI

---

### 3. files

Metadata de archivos almacenados.

```sql
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  folder_id UUID REFERENCES folders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  s3_key TEXT NOT NULL UNIQUE, -- Ruta en S3
  s3_bucket VARCHAR(100) NOT NULL,
  file_type VARCHAR(100) NOT NULL, -- MIME type
  file_extension VARCHAR(10) NOT NULL,
  file_category VARCHAR(50), -- 'image', 'video', 'document', 'audio', 'other'
  size_bytes BIGINT NOT NULL,
  checksum VARCHAR(64), -- SHA-256 para deduplicación
  thumbnail_s3_key TEXT,
  preview_s3_key TEXT, -- Para previews de documentos
  width INTEGER, -- Para imágenes/videos
  height INTEGER,
  duration INTEGER, -- Para videos/audio (segundos)
  metadata JSONB, -- Metadata flexible (EXIF, tags, etc)
  is_favorite BOOLEAN DEFAULT FALSE,
  is_shared BOOLEAN DEFAULT FALSE,
  download_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Índices
CREATE INDEX idx_files_user_id ON files(user_id);
CREATE INDEX idx_files_folder_id ON files(folder_id);
CREATE INDEX idx_files_s3_key ON files(s3_key);
CREATE INDEX idx_files_file_type ON files(file_type);
CREATE INDEX idx_files_file_category ON files(file_category);
CREATE INDEX idx_files_created_at ON files(created_at DESC);
CREATE INDEX idx_files_name_trgm ON files USING gin(name gin_trgm_ops);
CREATE INDEX idx_files_checksum ON files(checksum);
CREATE INDEX idx_files_is_favorite ON files(is_favorite) WHERE is_favorite = TRUE;
CREATE INDEX idx_files_deleted_at ON files(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_files_metadata ON files USING gin(metadata);

-- Trigger para updated_at
CREATE TRIGGER update_files_updated_at
  BEFORE UPDATE ON files
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Campos clave:**

- `s3_key`: Ubicación única en S3
- `checksum`: Deduplicación de archivos
- `file_category`: Clasificación para filtros
- `metadata`: JSONB para data flexible (EXIF, tags, etc)
- `thumbnail_s3_key`: Previews generadas

---

### 4. file_versions

Control de versiones de archivos.

```sql
CREATE TABLE file_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_id UUID NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  s3_key TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  checksum VARCHAR(64) NOT NULL,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_file_version UNIQUE(file_id, version_number)
);

-- Índices
CREATE INDEX idx_file_versions_file_id ON file_versions(file_id);
CREATE INDEX idx_file_versions_created_at ON file_versions(created_at DESC);
```

**Campos clave:**

- `version_number`: Número de versión incremental
- `s3_key`: Ubicación de la versión específica
- `created_by`: Quién creó esta versión

---

### 5. shares

Compartir archivos y carpetas entre usuarios.

```sql
CREATE TABLE shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resource_type VARCHAR(10) NOT NULL, -- 'file' o 'folder'
  resource_id UUID NOT NULL, -- ID de file o folder
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  shared_with_user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- NULL si es link público
  share_token VARCHAR(64) UNIQUE, -- Token para links públicos
  permission_level VARCHAR(20) DEFAULT 'view', -- 'view', 'edit', 'admin'
  is_public BOOLEAN DEFAULT FALSE,
  requires_password BOOLEAN DEFAULT FALSE,
  password_hash VARCHAR(255),
  expires_at TIMESTAMP,
  access_count INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  CONSTRAINT check_share_target CHECK (
    (shared_with_user_id IS NOT NULL AND is_public = FALSE) OR
    (share_token IS NOT NULL AND is_public = TRUE)
  )
);

-- Índices
CREATE INDEX idx_shares_resource ON shares(resource_type, resource_id);
CREATE INDEX idx_shares_owner_id ON shares(owner_id);
CREATE INDEX idx_shares_shared_with ON shares(shared_with_user_id);
CREATE INDEX idx_shares_token ON shares(share_token);
CREATE INDEX idx_shares_expires_at ON shares(expires_at);
CREATE INDEX idx_shares_deleted_at ON shares(deleted_at) WHERE deleted_at IS NULL;

-- Trigger para updated_at
CREATE TRIGGER update_shares_updated_at
  BEFORE UPDATE ON shares
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Campos clave:**

- `resource_type`: 'file' o 'folder'
- `resource_id`: ID del recurso compartido
- `shared_with_user_id`: Usuario específico (NULL para público)
- `share_token`: Token único para links públicos
- `permission_level`: Control de acceso granular
- `expires_at`: Links con expiración

---

### 6. permissions

Permisos específicos para compartidos.

```sql
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  share_id UUID NOT NULL REFERENCES shares(id) ON DELETE CASCADE,
  can_view BOOLEAN DEFAULT TRUE,
  can_download BOOLEAN DEFAULT TRUE,
  can_upload BOOLEAN DEFAULT FALSE,
  can_edit BOOLEAN DEFAULT FALSE,
  can_delete BOOLEAN DEFAULT FALSE,
  can_share BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_permissions_share_id ON permissions(share_id);

-- Trigger para updated_at
CREATE TRIGGER update_permissions_updated_at
  BEFORE UPDATE ON permissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Campos clave:**

- Permisos granulares por operación
- Vinculado a shares para control fino

---

### 7. activity_logs

Registro de actividad de usuarios.

```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL, -- 'upload', 'download', 'delete', 'share', 'view', etc
  resource_type VARCHAR(20) NOT NULL, -- 'file', 'folder', 'user'
  resource_id UUID,
  details JSONB, -- Detalles adicionales
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_activity_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_resource ON activity_logs(resource_type, resource_id);
CREATE INDEX idx_activity_action ON activity_logs(action);
CREATE INDEX idx_activity_created_at ON activity_logs(created_at DESC);
```

**Campos clave:**

- `action`: Tipo de actividad
- `details`: Contexto adicional en JSONB
- `ip_address`: Seguridad y auditoría

---

### 8. tags

Sistema de etiquetado para archivos.

```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  color VARCHAR(7), -- Color hex
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_tag_name_per_user UNIQUE(user_id, name)
);

-- Índices
CREATE INDEX idx_tags_user_id ON tags(user_id);
CREATE INDEX idx_tags_name ON tags(name);
```

---

### 9. file_tags

Relación muchos-a-muchos entre files y tags.

```sql
CREATE TABLE file_tags (
  file_id UUID NOT NULL REFERENCES files(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (file_id, tag_id)
);

-- Índices
CREATE INDEX idx_file_tags_file_id ON file_tags(file_id);
CREATE INDEX idx_file_tags_tag_id ON file_tags(tag_id);
```

---

### 10. upload_sessions

Gestión de uploads multipart.

```sql
CREATE TABLE upload_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_size BIGINT NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  s3_upload_id VARCHAR(255), -- Multipart upload ID de S3
  s3_key TEXT NOT NULL,
  parts_completed INTEGER DEFAULT 0,
  parts_total INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'uploading', 'completed', 'failed', 'cancelled'
  error_message TEXT,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Índices
CREATE INDEX idx_upload_sessions_user_id ON upload_sessions(user_id);
CREATE INDEX idx_upload_sessions_status ON upload_sessions(status);
CREATE INDEX idx_upload_sessions_expires_at ON upload_sessions(expires_at);
CREATE INDEX idx_upload_sessions_created_at ON upload_sessions(created_at DESC);

-- Trigger para updated_at
CREATE TRIGGER update_upload_sessions_updated_at
  BEFORE UPDATE ON upload_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Campos clave:**

- `s3_upload_id`: ID de multipart upload en S3
- `parts_completed/parts_total`: Progreso del upload
- `status`: Estado del proceso
- `expires_at`: Cleanup de uploads abandonados

---

### 11. notifications

Sistema de notificaciones push.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'share', 'comment', 'mention', 'storage_limit', etc
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB, -- Datos adicionales
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  action_url TEXT, -- Deep link
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

---

### 12. sync_queue

Cola de sincronización offline.

```sql
CREATE TABLE sync_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  operation_type VARCHAR(20) NOT NULL, -- 'create', 'update', 'delete'
  resource_type VARCHAR(20) NOT NULL, -- 'file', 'folder'
  resource_id UUID,
  payload JSONB NOT NULL, -- Datos de la operación
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP
);

-- Índices
CREATE INDEX idx_sync_queue_user_id ON sync_queue(user_id);
CREATE INDEX idx_sync_queue_status ON sync_queue(status);
CREATE INDEX idx_sync_queue_created_at ON sync_queue(created_at ASC);
```

---

## 🔧 Functions & Triggers

### 1. Update timestamp function

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 2. Update user storage function

```sql
CREATE OR REPLACE FUNCTION update_user_storage()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE users
    SET storage_used = storage_used + NEW.size_bytes
    WHERE id = NEW.user_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE users
    SET storage_used = storage_used - OLD.size_bytes
    WHERE id = OLD.user_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.size_bytes != NEW.size_bytes THEN
    UPDATE users
    SET storage_used = storage_used - OLD.size_bytes + NEW.size_bytes
    WHERE id = NEW.user_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger
CREATE TRIGGER update_user_storage_on_file_change
  AFTER INSERT OR UPDATE OR DELETE ON files
  FOR EACH ROW
  EXECUTE FUNCTION update_user_storage();
```

### 3. Cascade soft delete for folders

```sql
CREATE OR REPLACE FUNCTION cascade_folder_soft_delete()
RETURNS TRIGGER AS $$
BEGIN
  -- Soft delete archivos en la carpeta
  UPDATE files
  SET deleted_at = NEW.deleted_at
  WHERE folder_id = NEW.id AND deleted_at IS NULL;

  -- Soft delete subcarpetas
  UPDATE folders
  SET deleted_at = NEW.deleted_at
  WHERE parent_folder_id = NEW.id AND deleted_at IS NULL;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger
CREATE TRIGGER cascade_folder_soft_delete_trigger
  AFTER UPDATE OF deleted_at ON folders
  FOR EACH ROW
  WHEN (NEW.deleted_at IS NOT NULL AND OLD.deleted_at IS NULL)
  EXECUTE FUNCTION cascade_folder_soft_delete();
```

---

## 📊 Vistas Útiles

### 1. Vista de archivos recientes

```sql
CREATE VIEW recent_files AS
SELECT
  f.id,
  f.name,
  f.file_type,
  f.file_category,
  f.size_bytes,
  f.thumbnail_s3_key,
  f.created_at,
  f.user_id,
  u.first_name || ' ' || u.last_name AS owner_name,
  COALESCE(folder.name, 'Root') AS folder_name
FROM files f
JOIN users u ON f.user_id = u.id
LEFT JOIN folders folder ON f.folder_id = folder.id
WHERE f.deleted_at IS NULL
ORDER BY f.created_at DESC;
```

### 2. Vista de uso de storage por usuario

```sql
CREATE VIEW user_storage_stats AS
SELECT
  u.id AS user_id,
  u.email,
  u.storage_quota,
  u.storage_used,
  ROUND((u.storage_used::NUMERIC / u.storage_quota::NUMERIC) * 100, 2) AS usage_percentage,
  COUNT(DISTINCT f.id) AS total_files,
  COUNT(DISTINCT fold.id) AS total_folders
FROM users u
LEFT JOIN files f ON u.id = f.user_id AND f.deleted_at IS NULL
LEFT JOIN folders fold ON u.id = fold.user_id AND fold.deleted_at IS NULL
WHERE u.deleted_at IS NULL
GROUP BY u.id;
```

### 3. Vista de archivos compartidos

```sql
CREATE VIEW shared_files_view AS
SELECT
  f.id AS file_id,
  f.name,
  f.file_type,
  f.size_bytes,
  f.thumbnail_s3_key,
  s.id AS share_id,
  s.permission_level,
  s.is_public,
  s.share_token,
  s.expires_at,
  owner.email AS owner_email,
  owner.first_name || ' ' || owner.last_name AS owner_name,
  shared_user.email AS shared_with_email
FROM files f
JOIN shares s ON s.resource_id = f.id AND s.resource_type = 'file'
JOIN users owner ON s.owner_id = owner.id
LEFT JOIN users shared_user ON s.shared_with_user_id = shared_user.id
WHERE f.deleted_at IS NULL AND s.deleted_at IS NULL;
```

---

## 🔍 Búsqueda Full-Text

### Setup de búsqueda

```sql
-- Agregar columna tsvector para búsqueda
ALTER TABLE files ADD COLUMN search_vector tsvector;

-- Función para actualizar search_vector
CREATE OR REPLACE FUNCTION files_search_vector_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.original_name, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.metadata::text, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para mantener search_vector actualizado
CREATE TRIGGER files_search_vector_trigger
  BEFORE INSERT OR UPDATE ON files
  FOR EACH ROW
  EXECUTE FUNCTION files_search_vector_update();

-- Índice GIN para búsqueda rápida
CREATE INDEX idx_files_search_vector ON files USING gin(search_vector);

-- Query de ejemplo
-- SELECT * FROM files
-- WHERE search_vector @@ plainto_tsquery('english', 'documento importante')
-- AND deleted_at IS NULL
-- ORDER BY ts_rank(search_vector, plainto_tsquery('english', 'documento importante')) DESC;
```

---

## 🎯 Queries Útiles

### 1. Obtener estructura de carpetas de un usuario

```sql
WITH RECURSIVE folder_tree AS (
  -- Carpetas raíz
  SELECT
    id,
    name,
    parent_folder_id,
    user_id,
    path,
    0 AS depth
  FROM folders
  WHERE parent_folder_id IS NULL
    AND user_id = $1
    AND deleted_at IS NULL

  UNION ALL

  -- Subcarpetas recursivas
  SELECT
    f.id,
    f.name,
    f.parent_folder_id,
    f.user_id,
    f.path,
    ft.depth + 1
  FROM folders f
  INNER JOIN folder_tree ft ON f.parent_folder_id = ft.id
  WHERE f.deleted_at IS NULL
)
SELECT * FROM folder_tree
ORDER BY depth, name;
```

### 2. Archivos duplicados por checksum

```sql
SELECT
  checksum,
  COUNT(*) AS duplicate_count,
  SUM(size_bytes) AS total_size,
  ARRAY_AGG(id) AS file_ids,
  ARRAY_AGG(name) AS file_names
FROM files
WHERE deleted_at IS NULL
  AND checksum IS NOT NULL
GROUP BY checksum
HAVING COUNT(*) > 1
ORDER BY total_size DESC;
```

### 3. Top archivos más descargados

```sql
SELECT
  f.id,
  f.name,
  f.file_type,
  f.download_count,
  f.view_count,
  u.email AS owner_email
FROM files f
JOIN users u ON f.user_id = u.id
WHERE f.deleted_at IS NULL
ORDER BY f.download_count DESC
LIMIT 50;
```

### 4. Actividad reciente de usuario

```sql
SELECT
  al.action,
  al.resource_type,
  al.created_at,
  CASE
    WHEN al.resource_type = 'file' THEN (SELECT name FROM files WHERE id = al.resource_id)
    WHEN al.resource_type = 'folder' THEN (SELECT name FROM folders WHERE id = al.resource_id)
    ELSE NULL
  END AS resource_name
FROM activity_logs al
WHERE al.user_id = $1
ORDER BY al.created_at DESC
LIMIT 100;
```

---

## 📈 Estadísticas y Métricas

### 1. Estadísticas globales

```sql
SELECT
  (SELECT COUNT(*) FROM users WHERE deleted_at IS NULL) AS total_users,
  (SELECT COUNT(*) FROM files WHERE deleted_at IS NULL) AS total_files,
  (SELECT SUM(size_bytes) FROM files WHERE deleted_at IS NULL) AS total_storage_used,
  (SELECT COUNT(*) FROM shares WHERE deleted_at IS NULL) AS total_shares;
```

### 2. Distribución de tipos de archivo

```sql
SELECT
  file_category,
  COUNT(*) AS file_count,
  SUM(size_bytes) AS total_size,
  AVG(size_bytes) AS avg_size
FROM files
WHERE deleted_at IS NULL
GROUP BY file_category
ORDER BY file_count DESC;
```

---

## 🔐 Seguridad

### Row Level Security (RLS) - Opcional

```sql
-- Habilitar RLS en la tabla files
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Policy: Usuario solo puede ver sus propios archivos
CREATE POLICY files_user_isolation ON files
  FOR ALL
  USING (user_id = current_setting('app.current_user_id')::UUID);

-- Policy: Usuario puede ver archivos compartidos con él
CREATE POLICY files_shared_access ON files
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM shares
      WHERE shares.resource_type = 'file'
        AND shares.resource_id = files.id
        AND shares.shared_with_user_id = current_setting('app.current_user_id')::UUID
        AND shares.deleted_at IS NULL
    )
  );
```

---

## 🧹 Mantenimiento

### 1. Cleanup de uploads expirados

```sql
-- Borrar sessions de upload expiradas (ejecutar diariamente)
DELETE FROM upload_sessions
WHERE status IN ('failed', 'cancelled')
  AND created_at < NOW() - INTERVAL '7 days';

DELETE FROM upload_sessions
WHERE status = 'pending'
  AND expires_at < NOW();
```

### 2. Cleanup de notificaciones antiguas

```sql
-- Borrar notificaciones leídas mayores a 30 días
DELETE FROM notifications
WHERE is_read = TRUE
  AND read_at < NOW() - INTERVAL '30 days';
```

### 3. Archivar activity logs

```sql
-- Mover logs antiguos a tabla de archivo (ejecutar mensualmente)
INSERT INTO activity_logs_archive
SELECT * FROM activity_logs
WHERE created_at < NOW() - INTERVAL '90 days';

DELETE FROM activity_logs
WHERE created_at < NOW() - INTERVAL '90 days';
```

---

## 📊 Migraciones

### Orden de creación

1. **Extensions**: uuid-ossp, pg_trgm, pgcrypto
2. **Functions**: update_updated_at_column()
3. **Tables**:
   - users
   - folders
   - files
   - file_versions
   - tags
   - file_tags
   - shares
   - permissions
   - activity_logs
   - upload_sessions
   - notifications
   - sync_queue
4. **Triggers**:
   - update\_\*\_updated_at
   - update_user_storage
   - cascade_folder_soft_delete
   - files_search_vector_trigger
5. **Views**: recent_files, user_storage_stats, shared_files_view
6. **Indexes**: (ya incluidos en CREATE TABLE)

### Script inicial completo

Ver archivo: `backend/migrations/001_initial_schema.sql`

---

Este esquema proporciona una base sólida, escalable y optimizada para Merett Cloud, con soporte completo para las features planificadas en los 8 sprints.

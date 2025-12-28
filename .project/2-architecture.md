# Arquitectura del Sistema - Merett Cloud PWA

## 📐 Visión General

Merett Cloud es una Progressive Web App (PWA) de almacenamiento en la nube construida con una arquitectura moderna de 3 capas:

1. **Frontend**: Next.js 16 PWA (Web responsive)
2. **Backend**: Node.js/Express en Docker
3. **Storage**: AWS S3 + PostgreSQL

```
┌─────────────────────────────────────────────────────────┐
│              WEB CLIENTS (PWA)                          │
│    Desktop / Tablet / Mobile (Navegadores)              │
│         + Service Workers (Offline)                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTPS/REST API
                     │
┌────────────────────▼────────────────────────────────────┐
│              EC2 Instance (Producción)                  │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Nginx Reverse Proxy                     │   │
│  │         Ports: 80 → 443 (HTTPS)                 │   │
│  └──────┬──────────────────────────┬────────────────┘   │
│         │                          │                    │
│  ┌──────▼────────────┐    ┌────────▼──────────┐       │
│  │  Next.js PWA      │    │  Express API      │       │
│  │  (PM2)            │    │  (Docker)         │       │
│  │  Port: 3679       │    │  Port: 4578       │       │
│  └───────────────────┘    └────────┬──────────┘       │
│                                     │                   │
│  ┌──────────────────────────────────┴────────────────┐ │
│  │       Monitoring Stack (Docker)                   │ │
│  │  Grafana: 3847 | Prometheus: 9287 | Alert: 9341  │ │
│  └───────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
                     │
        ┌────────────┼───────────┐
        │            │           │
┌───────▼─────┐  ┌───▼──────┐ ┌─▼────────────┐
│ PostgreSQL  │  │  AWS S3  │ │  CloudWatch  │
│ Port: 5432  │  │ (Files)  │ │  (Logs)      │
│  (Prisma)   │  │          │ │              │
└─────────────┘  └──────────┘ └──────────────┘
```

---

## 🌐 Arquitectura Frontend (Next.js PWA)

### Estructura de Capas

```
┌──────────────────────────────────────────────┐
│         PRESENTATION LAYER                   │
│  (Pages, Components, Layouts)                │
├──────────────────────────────────────────────┤
│         APPLICATION LAYER                    │
│  (Stores, Hooks, Context)                    │
├──────────────────────────────────────────────┤
│         DATA LAYER                           │
│  (API Clients, Services, Queries)            │
├──────────────────────────────────────────────┤
│         PWA LAYER                            │
│  (Service Workers, IndexedDB, Cache)         │
└──────────────────────────────────────────────┘
```

### Next.js App Router Structure

```
frontend/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   ├── globals.css            # Global styles
│   │
│   ├── (auth)/                # Auth group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── forgot-password/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/           # Main app (protected)
│   │   ├── layout.tsx         # Dashboard layout
│   │   ├── files/
│   │   │   ├── page.tsx       # Files list
│   │   │   └── [folderId]/
│   │   │       └── page.tsx   # Folder view
│   │   ├── recent/
│   │   │   └── page.tsx       # Recent files
│   │   ├── shared/
│   │   │   └── page.tsx       # Shared files
│   │   ├── favorites/
│   │   │   └── page.tsx       # Favorites
│   │   ├── search/
│   │   │   └── page.tsx       # Search results
│   │   └── settings/
│   │       └── page.tsx       # Settings
│   │
│   └── api/                   # API Routes (opcional)
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.ts   # NextAuth config
│       └── upload/
│           └── route.ts       # Upload endpoint (si se usa)
│
├── components/                 # React components
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown.tsx
│   │   └── ...
│   │
│   ├── features/              # Feature components
│   │   ├── files/
│   │   │   ├── FileItem.tsx
│   │   │   ├── FileGrid.tsx
│   │   │   ├── FolderTree.tsx
│   │   │   └── FilePreview.tsx
│   │   ├── upload/
│   │   │   ├── UploadZone.tsx
│   │   │   ├── UploadProgress.tsx
│   │   │   └── UploadQueue.tsx
│   │   ├── media/
│   │   │   ├── ImageViewer.tsx
│   │   │   ├── VideoPlayer.tsx
│   │   │   ├── AudioPlayer.tsx
│   │   │   └── PDFViewer.tsx
│   │   └── share/
│   │       ├── ShareDialog.tsx
│   │       └── PermissionsManager.tsx
│   │
│   └── layouts/               # Layout components
│       ├── Sidebar.tsx
│       ├── Header.tsx
│       └── Footer.tsx
│
├── lib/                       # Utilities and config
│   ├── api/                   # API clients
│   │   ├── client.ts          # Axios/Fetch config
│   │   ├── auth.ts
│   │   ├── files.ts
│   │   ├── upload.ts
│   │   └── share.ts
│   │
│   ├── stores/                # State management (Zustand)
│   │   ├── authStore.ts
│   │   ├── filesStore.ts
│   │   ├── uploadStore.ts
│   │   └── settingsStore.ts
│   │
│   ├── hooks/                 # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useFiles.ts
│   │   ├── useUpload.ts
│   │   └── useOffline.ts
│   │
│   ├── utils/                 # Utility functions
│   │   ├── format.ts
│   │   ├── validation.ts
│   │   └── file-helpers.ts
│   │
│   └── db/                    # IndexedDB (Dexie)
│       └── schema.ts
│
├── public/                    # Static files
│   ├── icons/
│   ├── manifest.json          # PWA manifest
│   └── sw.js                  # Service Worker (generado)
│
├── styles/                    # Additional styles
│   └── custom.css
│
├── types/                     # TypeScript types
│   ├── api.ts
│   ├── file.ts
│   ├── user.ts
│   └── global.d.ts
│
├── next.config.js             # Next.js config (con Serwist)
├── tailwind.config.ts         # Tailwind CSS config
├── tsconfig.json              # TypeScript config
├── package.json
└── .env.local                 # Environment variables
```

---

## 🔧 Arquitectura Backend (Express API)

### Estructura del Backend

```
express/                       # Backend (ya existente)
├── src/
│   ├── config/
│   │   ├── database.ts       # PostgreSQL + Prisma
│   │   ├── s3.ts            # AWS S3 client
│   │   ├── jwt.ts           # JWT configuration
│   │   └── env.ts           # Environment config
│   │
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   ├── validateRequest.ts
│   │   ├── errorHandler.ts
│   │   ├── rateLimiter.ts
│   │   └── securityHeaders.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── files.routes.ts
│   │   ├── upload.routes.ts
│   │   ├── share.routes.ts
│   │   └── monitoring.routes.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── files.controller.ts
│   │   └── share.controller.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── file.service.ts
│   │   ├── storage.service.ts (S3)
│   │   ├── share.service.ts
│   │   └── metrics.service.ts
│   │
│   ├── utils/
│   │   ├── apiResponse.ts
│   │   ├── appError.ts
│   │   └── errorCodes.ts
│   │
│   └── index.ts              # Entry point
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── Dockerfile                # Backend Docker
├── docker-compose.yml        # Dev environment
└── package.json
```

### Capas del Backend

```
┌──────────────────────────────────────┐
│         ROUTES LAYER                 │
│  (HTTP endpoints, validation)        │
└─────────────┬────────────────────────┘
              │
┌─────────────▼────────────────────────┐
│      CONTROLLERS LAYER               │
│  (Request/Response handling)         │
└─────────────┬────────────────────────┘
              │
┌─────────────▼────────────────────────┐
│       SERVICES LAYER                 │
│  (Business logic, orchestration)     │
└─────┬───────┬──────────┬─────────────┘
      │       │          │
┌─────▼───┐ ┌─▼──────┐ ┌▼───────────┐
│ Prisma  │ │AWS S3  │ │ External   │
│  (DB)   │ │Client  │ │ Services   │
└─────────┘ └────────┘ └────────────┘
```

---

## 🔄 PWA Architecture (Service Workers)

### Service Worker Strategy con Serwist

```
┌─────────────────────────────────────────────┐
│            Browser                          │
│  ┌──────────────────────────────────────┐  │
│  │      Next.js App (Main Thread)       │  │
│  └──────────────┬───────────────────────┘  │
│                 │                           │
│  ┌──────────────▼───────────────────────┐  │
│  │      Service Worker (SW)             │  │
│  │  ┌────────────────────────────────┐  │  │
│  │  │   Serwist Runtime              │  │  │
│  │  │   - Network strategies         │  │  │
│  │  │   - Cache management           │  │  │
│  │  │   - Background sync            │  │  │
│  │  │   - Push notifications         │  │  │
│  │  └────────────────────────────────┘  │  │
│  └──────────────┬───────────────────────┘  │
│                 │                           │
│  ┌──────────────▼───────────────────────┐  │
│  │     Cache Storage                    │  │
│  │  - Static assets                     │  │
│  │  - API responses                     │  │
│  │  - Images/Media                      │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │     IndexedDB (Dexie)                │  │
│  │  - Files metadata                    │  │
│  │  - Offline queue                     │  │
│  │  - User data                         │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Caching Strategies

```javascript
// next.config.js con Serwist
import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  cacheOnNavigation: true,
  reloadOnOnline: true,
  
  runtimeCaching: [
    // API calls - Network First
    {
      urlPattern: /^https:\/\/api\.merettcloud\.com\/api\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 5 * 60, // 5 minutes
        },
      },
    },
    
    // Images - Cache First
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    
    // Static assets - Cache First
    {
      urlPattern: /\.(?:js|css|woff|woff2|ttf|otf)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
});

export default withSerwist(nextConfig);
```

---

## 🔐 Arquitectura de Seguridad

### Flujo de Autenticación (NextAuth.js)

```
┌─────────┐                                    ┌──────────┐
│   PWA   │                                    │  Backend │
│ Browser │                                    │   API    │
└────┬────┘                                    └────┬─────┘
     │                                              │
     │ 1. POST /api/auth/signin                     │
     │    { email, password }                       │
     │─────────────────────────────────────────────>│
     │                                              │
     │                        2. Validate credentials
     │                           (bcrypt compare)    │
     │                                              │
     │ 3. JWT Tokens + Session                      │
     │    { accessToken, refreshToken }             │
     │<─────────────────────────────────────────────│
     │                                              │
     │ 4. Store in HttpOnly cookies + localStorage  │
     │    (NextAuth maneja cookies automáticamente) │
     │                                              │
     │ 5. Authenticated requests                    │
     │    Cookie: next-auth.session-token           │
     │─────────────────────────────────────────────>│
     │                                              │
     │                           6. Verify session  │
     │                              (NextAuth)       │
     │                                              │
     │ 7. Protected resource                        │
     │<─────────────────────────────────────────────│
     │                                              │
```

### Seguridad de Archivos

1. **Upload seguro**:
   - Request presigned URL desde backend
   - Upload directo a S3 desde browser
   - Metadata almacenada en PostgreSQL

2. **Download seguro**:
   - Verificar permisos en backend
   - Generar signed URL temporal
   - Download directo desde S3

3. **Control de acceso**:
   - Permisos a nivel de archivo/carpeta
   - Roles: Owner, Editor, Viewer
   - Middleware de autorización

```
File Access Flow (PWA):

Browser → Backend API (Port 4578) → Verify Auth → Check Permissions
                                                        │
                                                        ├─ Owner: Full access
                                                        ├─ Editor: Read/Write
                                                        └─ Viewer: Read only

Backend → Generate Signed URL → Return to Browser
Browser → Direct S3 Access (with signed URL)
```

---

## 💾 Arquitectura de Datos

### Flujo de Datos - Upload

```
1. User selects file
   └─> HTML5 File API / Drag & Drop

2. File compression (if image)
   └─> browser-image-compression (client-side)

3. Request upload URL from backend
   POST http://localhost:4578/api/upload/presigned-url
   { fileName, fileSize, fileType, folderId }

4. Receive presigned URL
   { uploadUrl, fileId, expiresIn }

5. Upload file to S3 directly
   PUT uploadUrl (presigned)
   Body: file binary data
   Headers: Content-Type

6. Confirm upload completion
   POST http://localhost:4578/api/files/{fileId}/confirm
   { success: true, checksum }

7. Backend updates metadata in PostgreSQL (Prisma)
   - File record created
   - User storage updated
   - Activity log created

8. Client updates state
   - Add file to filesStore (Zustand)
   - Update storage info
   - Remove from upload queue
   - Cache metadata in IndexedDB
```

### Flujo de Datos - Download

```
1. User clicks on file
   └─> Click event in FileItem component

2. Check if file exists in cache
   ├─> If cached: Load from Cache Storage or IndexedDB
   └─> If not cached: Request from server

3. Request download URL from backend
   GET http://localhost:4578/api/files/{fileId}/download

4. Verify permissions in backend
   ├─> Denied: Return 403 error
   └─> Allowed: Generate signed S3 URL

5. Receive signed URL
   { downloadUrl, expiresIn, fileName }

6. Download file from S3
   fetch(downloadUrl) con streaming

7. Cache file (Service Worker)
   - Store in Cache Storage
   - Update IndexedDB metadata

8. Update UI state
   - Mark as downloaded
   - Track offline availability
```

### Sincronización Offline (Service Workers + IndexedDB)

```
┌──────────────────────────────────────┐
│       OFFLINE OPERATIONS             │
├──────────────────────────────────────┤
│  - Queue CRUD operations             │
│  - Store in IndexedDB                │
│  - Timestamp each operation          │
│  - Service Worker Background Sync    │
└──────────────┬───────────────────────┘
               │
               │ Online?
               │ (navigator.onLine)
               │
┌──────────────▼───────────────────────┐
│       SYNC PROCESS                   │
├──────────────────────────────────────┤
│  1. Background Sync triggered        │
│  2. Fetch server state               │
│  3. Apply queued operations          │
│  4. Resolve conflicts (last-write)   │
│  5. Update local IndexedDB           │
│  6. Clear sync queue                 │
└──────────────────────────────────────┘
```

### IndexedDB Schema (Dexie)

```typescript
// lib/db/schema.ts
import Dexie, { Table } from 'dexie';

interface File {
  id: string;
  name: string;
  size: number;
  type: string;
  folderId?: string;
  url: string;
  thumbnail?: string;
  cached: boolean;
  lastModified: Date;
  userId: string;
}

interface OfflineOperation {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  resource: 'file' | 'folder' | 'share';
  data: any;
  timestamp: number;
  synced: boolean;
}

class MerettDB extends Dexie {
  files!: Table<File>;
  operations!: Table<OfflineOperation>;

  constructor() {
    super('MerettCloudDB');
    this.version(1).stores({
      files: 'id, userId, folderId, cached',
      operations: '++id, synced, timestamp',
    });
  }
}

export const db = new MerettDB();
```

---

## 🚀 Arquitectura de Performance

### Optimizaciones Frontend (Next.js)

1. **Server-Side Rendering (SSR)**
   - Pre-render páginas en el servidor
   - Faster First Contentful Paint (FCP)
   - Mejor SEO

2. **Static Site Generation (SSG)**
   - Pre-build páginas estáticas
   - Servir desde CDN
   - Landing pages, docs

3. **Incremental Static Regeneration (ISR)**
   - Regenerar páginas bajo demanda
   - Balance entre SSG y SSR

4. **Code Splitting**
   - Automatic con Next.js
   - Dynamic imports para componentes pesados
   - Route-based splitting

5. **Image Optimization**
   - Next.js Image component
   - Lazy loading automático
   - WebP/AVIF automático
   - Responsive images

6. **Caching (Service Workers)**
   - Cache API responses
   - Cache static assets
   - Offline-first strategy

### Optimizaciones Backend

1. **Database**
   - Índices en columnas frecuentes
   - Paginación en listados (cursor-based)
   - Query optimization con Prisma
   - Connection pooling

2. **API Response**
   - Compression (gzip/brotli)
   - ETags para caching
   - Pagination
   - Field filtering

3. **File Processing**
   - Async thumbnail generation
   - Sharp para image processing
   - Stream uploads/downloads

---

## 📊 Arquitectura de Monitoreo

### Prometheus Metrics

```typescript
// Backend: services/metrics.service.ts
import prometheus from 'prom-client';

const register = new prometheus.Registry();

// HTTP request duration
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

// Active users
const activeUsers = new prometheus.Gauge({
  name: 'active_users',
  help: 'Number of currently active users',
});

// File uploads
const fileUploads = new prometheus.Counter({
  name: 'file_uploads_total',
  help: 'Total number of file uploads',
  labelNames: ['status'],
});

register.registerMetric(httpRequestDuration);
register.registerMetric(activeUsers);
register.registerMetric(fileUploads);

export { register, httpRequestDuration, activeUsers, fileUploads };
```

### Logging Strategy

```
Frontend Logging:
- Sentry for error tracking
- Console logs (development)
- Analytics events
- Performance metrics (Web Vitals)

Backend Logging:
- Winston for structured logs
- Prometheus for metrics
- CloudWatch for AWS logs
- Grafana dashboards

Log Levels:
- ERROR: Critical failures
- WARN: Important warnings  
- INFO: General information
- DEBUG: Detailed debugging (dev only)
```

---

## 🔌 Port Architecture

### Development Environment

```yaml
Frontend (Next.js):     localhost:3679
Backend (Express):      localhost:4578
PostgreSQL:             localhost:5432
Grafana:                localhost:3847
Prometheus:             localhost:9287
AlertManager:           localhost:9341
```

### Production Environment (EC2)

```nginx
# Nginx Configuration
http {
  upstream nextjs {
    server localhost:3679;
  }
  
  upstream api {
    server localhost:4578;
  }
  
  upstream grafana {
    server localhost:3847;
  }
  
  server {
    listen 80;
    server_name merettcloud.com;
    return 301 https://$server_name$request_uri;
  }
  
  server {
    listen 443 ssl http2;
    server_name merettcloud.com;
    
    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/merettcloud.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/merettcloud.com/privkey.pem;
    
    # Main app
    location / {
      proxy_pass http://nextjs;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
    
    # API
    location /api {
      proxy_pass http://api;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    # Monitoring
    location /grafana {
      proxy_pass http://grafana;
      rewrite ^/grafana/(.*) /$1 break;
    }
  }
}
```

---

## 🐳 Docker Architecture

### Docker Compose (Development)

```yaml
# docker-compose.yml (raíz del proyecto)
version: '3.9'

services:
  frontend:
    build: ./frontend
    ports:
      - "3679:3679"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:4578
      - NODE_ENV=development
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend
  
  backend:
    build: ./express
    ports:
      - "4578:4578"
    environment:
      - PORT=4578
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/merett_cloud
      - NODE_ENV=development
    volumes:
      - ./express:/app
      - /app/node_modules
    depends_on:
      - postgres
  
  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=merett_cloud
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9287:9090"
    volumes:
      - ./express/data/prometheus:/etc/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
  
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3847:3000"
    environment:
      - GF_SERVER_HTTP_PORT=3000
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
      - ./express/data/grafana:/etc/grafana
    depends_on:
      - prometheus
  
  alertmanager:
    image: prom/alertmanager:latest
    ports:
      - "9341:9093"
    volumes:
      - ./express/data/alertmanager:/etc/alertmanager
    command:
      - '--config.file=/etc/alertmanager/alertmanager.yml'

volumes:
  postgres_data:
  grafana_data:

networks:
  default:
    name: merett-network
```

---

## 🔄 Arquitectura de Escalabilidad

### Load Balancing (Futuro)

```
┌────────────────────┐
│   Nginx LB         │
│   (80/443)         │
└─────────┬──────────┘
          │
    ┌─────┼──────┐
    │     │      │
┌───▼──┐ ┌▼───┐ ┌▼───┐
│ PM2  │ │PM2 │ │PM2 │
│Next.js│ │Next│ │Next│
│ :3679│ │:3679│ │:3679│
└──────┘ └────┘ └────┘
```

### Horizontal Scaling

**Frontend (Next.js):**
- PM2 cluster mode (multi-core)
- Multiple EC2 instances + Load Balancer
- CDN para assets estáticos (CloudFront)

**Backend (Express):**
- Docker containers replicados
- Load balancer entre instancias
- Stateless API (JWT)

**Database:**
- PostgreSQL Read Replicas
- Connection pooling
- Caching layer (Redis opcional)

---

## 🛡️ Disaster Recovery

### Backups

```
Database Backups (PostgreSQL):
- Daily automated snapshots
- Point-in-time recovery (5 min RPO

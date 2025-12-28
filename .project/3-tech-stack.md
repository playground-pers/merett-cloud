# Tech Stack - Merett Cloud PWA

## 🌐 Frontend (Next.js PWA)

### Core Framework

| Tecnología   | Versión | Propósito       | Justificación                                                |
| ------------ | ------- | --------------- | ------------------------------------------------------------ |
| **Next.js**  | 15.x    | React Framework | SSR/SSG, App Router, API Routes, mejor SEO, performance     |
| **React**    | 19.x    | UI Library      | Latest features, Server Components, mejor performance        |
| **TypeScript** | 5.7.x | Type Safety     | Menos bugs, mejor DX, autocomplete, refactoring seguro       |
| **Serwist**  | 9.x     | Service Workers | PWA offline, caching strategies, mejor que Workbox original  |

### Styling & UI

| Tecnología               | Versión | Propósito           | Justificación                                    |
| ------------------------ | ------- | ------------------- | ------------------------------------------------ |
| **Tailwind CSS**         | 4.x     | Utility-first CSS   | Desarrollo rápido, responsive, tree-shaking      |
| **shadcn/ui**            | Latest  | Component library   | Accesible, customizable, Radix UI bajo el capó   |
| **Radix UI**             | Latest  | Headless components | Accesibilidad, sin estilos predefinidos          |
| **Lucide React**         | Latest  | Icon system         | Iconos modernos, ligeros, tree-shakeable         |
| **clsx**                 | Latest  | Conditional classes | Manejo de clases CSS condicionales               |
| **tailwind-merge**       | Latest  | Class merging       | Combinar clases Tailwind sin conflictos          |

### State Management

| Tecnología        | Versión | Propósito           | Justificación                                    |
| ----------------- | ------- | ------------------- | ------------------------------------------------ |
| **Zustand**       | 5.x     | Global state        | Ligero, simple, sin boilerplate, mejor que Redux |
| **React Query**   | 5.x     | Server state        | Caching, sincronización, invalidation automática |
| **Jotai**         | 2.x     | Atomic state        | Estado local atómico, alternativa a Context API  |

### PWA & Offline

| Tecnología           | Versión | Propósito              | Sprint   |
| -------------------- | ------- | ---------------------- | -------- |
| **Serwist**          | 9.x     | Service Worker manager | Sprint 2 |
| **workbox-*****      | 7.x     | Caching strategies     | Sprint 2 |
| **IndexedDB**        | Native  | Local database         | Sprint 3 |
| **dexie**            | 4.x     | IndexedDB wrapper      | Sprint 3 |
| **Web Push API**     | Native  | Push notifications     | Sprint 5 |

### Authentication

| Tecnología        | Versión | Propósito          | Sprint   |
| ----------------- | ------- | ------------------ | -------- |
| **NextAuth.js**   | 5.x     | Authentication     | Sprint 1 |
| **jose**          | 5.x     | JWT utilities      | Sprint 1 |
| **bcryptjs**      | 2.x     | Password hashing   | Sprint 1 |

### File & Media Handling

| Tecnología              | Versión | Propósito              | Sprint   |
| ----------------------- | ------- | ---------------------- | -------- |
| **HTML5 File API**      | Native  | File selection         | Sprint 3 |
| **Drag & Drop API**     | Native  | Drag and drop uploads  | Sprint 3 |
| **Canvas API**          | Native  | Image manipulation     | Sprint 3 |
| **browser-image-compression** | 2.x | Client-side compression | Sprint 3 |
| **react-dropzone**      | 14.x    | File upload zone       | Sprint 3 |
| **react-pdf**           | 9.x     | PDF viewing            | Sprint 4 |
| **video.js**            | 8.x     | Video player           | Sprint 4 |
| **howler.js**           | 2.x     | Audio player           | Sprint 4 |

### Forms & Validation

| Tecnología           | Versión | Propósito          | Justificación                |
| -------------------- | ------- | ------------------ | ---------------------------- |
| **React Hook Form**  | 7.x     | Form management    | Performance, menos re-renders |
| **Zod**              | 3.x     | Schema validation  | Type-safe, runtime validation |
| **@hookform/resolvers** | 3.x  | Form validators    | Integración con Zod          |

### UI Enhancements

| Tecnología                | Versión | Propósito            | Justificación                    |
| ------------------------- | ------- | -------------------- | -------------------------------- |
| **Framer Motion**         | 11.x    | Animations           | Declarativo, gestures, layout    |
| **sonner**                | 1.x     | Toast notifications  | Moderno, accesible               |
| **cmdk**                  | 1.x     | Command palette      | Búsqueda rápida, keyboard-first  |
| **vaul**                  | 1.x     | Drawer component     | Mobile-friendly drawers          |

### Development Tools

| Tecnología               | Versión | Propósito             | Justificación                       |
| ------------------------ | ------- | --------------------- | ----------------------------------- |
| **ESLint**               | 9.x     | Code linting          | Consistency, error prevention       |
| **Prettier**             | 3.x     | Code formatting       | Style consistency                   |
| **Jest**                 | 29.x    | Testing framework     | Unit & integration tests            |
| **React Testing Library** | 16.x   | Component testing     | Best practices, user-centric        |
| **Playwright**           | 1.x     | E2E testing           | Cross-browser, reliable             |
| **Husky**                | 9.x     | Git hooks             | Pre-commit quality checks           |
| **lint-staged**          | 15.x    | Staged files linting  | Fast pre-commit checks              |
| **Turbopack**            | Latest  | Build tool            | Incluido en Next.js 16, más rápido  |

### Utilities

| Tecnología          | Versión | Propósito             |
| ------------------- | ------- | --------------------- |
| **date-fns**        | 4.x     | Date utilities        |
| **lodash-es**       | 4.x     | Utility functions     |
| **uuid**            | 11.x    | UUID generation       |
| **axios**           | 1.x     | HTTP client           |

---

## 🔧 Backend (Node.js + Express)

### Core Framework

| Tecnología     | Versión | Propósito       | Justificación                         |
| -------------- | ------- | --------------- | ------------------------------------- |
| **Node.js**    | 20.x LTS | Runtime        | Performance, ecosystem, async I/O     |
| **Express**    | 4.21.x  | Web framework   | Simplicidad, middleware ecosystem     |
| **TypeScript** | 5.7.x   | Type safety     | Shared types con frontend             |

### Database & ORM

| Tecnología     | Versión | Propósito        | Justificación                             |
| -------------- | ------- | ---------------- | ----------------------------------------- |
| **PostgreSQL** | 15.x    | Database         | ACID compliance, JSON support, escalable  |
| **Prisma**     | 6.x     | ORM              | Type-safe queries, migrations, mejor DX   |
| **pg**         | 8.x     | PostgreSQL driver | Backup para queries raw si necesario     |

### AWS Integration

| Tecnología                        | Versión | Propósito           |
| --------------------------------- | ------- | ------------------- |
| **@aws-sdk/client-s3**            | 3.x     | S3 operations       |
| **@aws-sdk/s3-request-presigner** | 3.x     | Signed URLs         |
| **@aws-sdk/client-cloudwatch**    | 3.x     | Logging & Metrics   |

### Authentication & Security

| Tecnología             | Versión | Propósito          |
| ---------------------- | ------- | ------------------ |
| **jsonwebtoken**       | 9.x     | JWT tokens         |
| **bcryptjs**           | 2.x     | Password hashing   |
| **helmet**             | 8.x     | Security headers   |
| **cors**               | 2.x     | CORS handling      |
| **express-rate-limit** | 7.x     | Rate limiting      |
| **express-validator**  | 7.x     | Input validation   |

### File Processing

| Tecnología | Versión | Propósito          |
| ---------- | ------- | ------------------ |
| **multer** | 1.x     | Multipart handling |
| **sharp**  | 0.33.x  | Image processing   |
| **ffmpeg** | System  | Video processing   |

### Monitoring & Metrics

| Tecnología           | Versión | Propósito            |
| -------------------- | ------- | -------------------- |
| **prom-client**      | 15.x    | Prometheus metrics   |
| **winston**          | 3.x     | Structured logging   |
| **express-prom-bundle** | 7.x  | Express metrics      |

### Utilities

| Tecnología   | Versión | Propósito              |
| ------------ | ------- | ---------------------- |
| **dotenv**   | 16.x    | Environment variables  |
| **joi**      | 17.x    | Schema validation      |
| **date-fns** | 4.x     | Date utilities         |
| **uuid**     | 11.x    | UUID generation        |

### Testing

| Tecnología          | Versión | Propósito          |
| ------------------- | ------- | ------------------ |
| **Jest**            | 29.x    | Testing framework  |
| **Supertest**       | 7.x     | API testing        |
| **@faker-js/faker** | 9.x     | Test data          |

---

## 💾 Database (PostgreSQL)

### PostgreSQL Configuration

```yaml
Version: 15.x
Port: 5432
Instance: Local/Docker (dev), RDS (prod)
Storage: GP3 SSD
Backup: Automated daily (prod)
Multi-AZ: Yes (producción)
Encryption: Yes (producción)
```

### Extensions Requeridas

| Extension     | Propósito            |
| ------------- | -------------------- |
| **uuid-ossp** | UUID generation      |
| **pg_trgm**   | Full-text search     |
| **pgcrypto**  | Encryption functions |

### Índices Importantes

```sql
-- Files table
CREATE INDEX idx_files_user_id ON files(user_id);
CREATE INDEX idx_files_folder_id ON files(folder_id);
CREATE INDEX idx_files_created_at ON files(created_at DESC);
CREATE INDEX idx_files_name_trgm ON files USING gin(name gin_trgm_ops);

-- Shares table
CREATE INDEX idx_shares_file_id ON shares(file_id);
CREATE INDEX idx_shares_shared_with ON shares(shared_with_user_id);

-- Folders table
CREATE INDEX idx_folders_parent_id ON folders(parent_folder_id);
CREATE INDEX idx_folders_user_id ON folders(user_id);
```

---

## ☁️ AWS Services

### S3 Configuration

```yaml
Bucket Structure:
  - merett-cloud-files-{env}
  - merett-cloud-thumbnails-{env}

Storage Classes:
  - Standard: Active files
  - Standard-IA: Archived files (>90 days)
  - Glacier: Long-term backup

Lifecycle Policies:
  - Delete incomplete multipart uploads after 7 days
  - Move to IA after 90 days
  - Versioning: Enabled

Security:
  - Block public access: Yes
  - Encryption: AES-256 (SSE-S3)
  - Bucket policy: Restrict to EC2 role
```

### EC2 Configuration

```yaml
Development:
  Type: Docker Container (local)
  
Production:
  Instance Type: t3.medium
  OS: Ubuntu 22.04 LTS
  Storage: 50GB GP3 SSD
  Security Group: HTTP/HTTPS, Custom ports
```

### CloudWatch

```yaml
Metrics:
  - API response times
  - Error rates
  - CPU/Memory usage
  - Database connections
  - S3 storage size

Alarms:
  - High error rate (> 5%)
  - High response time (> 2s)
  - High CPU (> 80%)
  - Low disk space (< 20%)

Logs:
  - Application logs (7 days retention)
  - Access logs (30 days retention)
  - Error logs (90 days retention)
```

---

## 🐳 Container & Deployment

### Docker

| Tecnología         | Versión | Propósito              |
| ------------------ | ------- | ---------------------- |
| **Docker**         | 27.x    | Containerization       |
| **Docker Compose** | 2.x     | Multi-container dev    |

### Process Management

| Tecnología | Versión | Propósito                 | Uso       |
| ---------- | ------- | ------------------------- | --------- |
| **PM2**    | 5.x     | Process manager Next.js   | Producción |
| **Nginx**  | 1.27.x  | Reverse proxy             | Producción |

---

## 📊 Monitoring Stack

### Observability

| Servicio          | Puerto | Propósito              | Justificación                    |
| ----------------- | ------ | ---------------------- | -------------------------------- |
| **Prometheus**    | 9287   | Metrics collection     | Time-series DB, industry standard |
| **Grafana**       | 3847   | Metrics visualization  | Dashboards, alerting             |
| **AlertManager**  | 9341   | Alert management       | Notifications, routing           |
| **Node Exporter** | 9182   | System metrics         | Hardware/OS metrics              |

### Application Monitoring

| Herramienta        | Propósito              | Costo            |
| ------------------ | ---------------------- | ---------------- |
| **Sentry**         | Error tracking         | Free tier + paid |
| **AWS CloudWatch** | Infrastructure logs    | Pay as you go    |
| **Grafana**        | Metrics visualization  | Self-hosted      |
| **Prometheus**     | Metrics collection     | Self-hosted      |

---

## 🔌 Port Configuration

### Merett Cloud Port Mapping

| Servicio             | Puerto | Ambiente   | Propósito                      |
| -------------------- | ------ | ---------- | ------------------------------ |
| **Next.js PWA**      | 3679   | Dev & Prod | Frontend application           |
| **Express API**      | 4578   | Dev & Prod | Backend API                    |
| **PostgreSQL**       | 5432   | Dev & Prod | Database                       |
| **Grafana**          | 3847   | Dev & Prod | Monitoring dashboard           |
| **Prometheus**       | 9287   | Dev & Prod | Metrics collection             |
| **AlertManager**     | 9341   | Dev & Prod | Alert management               |
| **Node Exporter**    | 9182   | Dev & Prod | System metrics (si se expone)  |
| **Nginx (HTTP)**     | 80     | Producción | Public HTTP (redirect to HTTPS) |
| **Nginx (HTTPS)**    | 443    | Producción | Public HTTPS                   |

### Production URL Mapping (Nginx)

```nginx
https://merettcloud.com/          → Next.js PWA :3679
https://merettcloud.com/api       → Express API :4578
https://merettcloud.com/grafana   → Grafana :3847
https://merettcloud.com/metrics   → Prometheus :9287
```

---

## 🚀 DevOps & CI/CD

### Version Control

| Herramienta        | Propósito          |
| ------------------ | ------------------ |
| **Git**            | Version control    |
| **GitHub**         | Repository hosting |
| **GitHub Actions** | CI/CD pipelines    |

### CI/CD Pipeline

```yaml
# Frontend Pipeline (Next.js)
Triggers: Push to main, PR
Steps:
  1. Lint & Format check
  2. TypeScript check
  3. Run tests
  4. Build Next.js
  5. Deploy to EC2 (on release)

# Backend Pipeline (Express)
Triggers: Push to main, PR
Steps:
  1. Lint & Format check
  2. TypeScript check
  3. Run tests
  4. Build Docker image
  5. Push to EC2 (on release)
```

### Deployment Strategy

| Componente | Desarrollo        | Producción             |
| ---------- | ----------------- | ---------------------- |
| **Frontend** | npm run dev     | PM2 + Nginx            |
| **Backend**  | Docker Compose  | Docker + Nginx         |
| **Database** | Docker Compose  | Docker o RDS           |
| **Monitoring** | Docker Compose | Docker                |

---

## 🔧 Development Tools

### Code Editor

| Tool        | Plugins Recomendados                                                  |
| ----------- | --------------------------------------------------------------------- |
| **VS Code** | ESLint, Prettier, TypeScript, Tailwind CSS IntelliSense, Prisma, GitLens |

### API Development

| Tool                | Propósito                     |
| ------------------- | ----------------------------- |
| **Postman**         | API testing                   |
| **Thunder Client**  | VS Code integrated API client |
| **Swagger/OpenAPI** | API documentation             |

### Database Tools

| Tool              | Propósito               |
| ----------------- | ----------------------- |
| **Prisma Studio** | Database GUI            |
| **pgAdmin**       | PostgreSQL management   |
| **DBeaver**       | Universal database tool |

---

## 📦 Package Management

### Frontend & Backend

```json
{
  "packageManager": "npm@10.x",
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}
```

---

## 🔐 Security Stack

### Frontend Security

| Medida                  | Implementación                        |
| ----------------------- | ------------------------------------- |
| **Token Storage**       | HttpOnly cookies + localStorage       |
| **Content Security**    | Next.js security headers              |
| **Input Validation**    | Zod schemas                           |
| **XSS Protection**      | React auto-escaping + CSP headers     |
| **HTTPS Only**          | Nginx force HTTPS                     |

### Backend Security

| Medida                 | Implementación                |
| ---------------------- | ----------------------------- |
| **Authentication**     | JWT with refresh tokens       |
| **Password Hashing**   | bcrypt (12 rounds)            |
| **Rate Limiting**      | express-rate-limit            |
| **SQL Injection**      | Prisma (parameterized queries) |
| **XSS Protection**     | Helmet.js                     |
| **CORS**               | Whitelist origins             |
| **Secrets Management** | Environment variables + AWS Secrets Manager |

---

## 📈 Scalability Considerations

### Current Architecture (MVP)

```
Users: 0-1,000
Concurrent: 10-50
Storage: 100GB-1TB
Cost: ~$100-200/month

Stack:
- 1x EC2 t3.medium (Backend + Frontend)
- Docker Compose
- PostgreSQL Container
- S3 Standard
- Basic monitoring
```

### Growth Phase (10K users)

```
Users: 1,000-10,000
Concurrent: 50-200
Storage: 1TB-10TB
Cost: ~$400-800/month

Stack:
- 2x EC2 t3.large (Load Balanced)
- RDS PostgreSQL Multi-AZ
- S3 Standard + CloudFront CDN
- Full monitoring stack
- Redis cache (optional)
```

### Scale Phase (100K+ users)

```
Users: 10,000+
Concurrent: 200-1,000+
Storage: 10TB+
Cost: ~$2,000+/month

Stack:
- Auto Scaling Group (4-10 instances)
- RDS db.r6g.large (Multi-AZ + Read Replicas)
- S3 + CloudFront CDN
- ElastiCache Redis Cluster
- SQS for async processing
- Separate microservices
```

---

## 🎯 Technology Decision Matrix

### Why These Choices?

| Decisión          | Alternativas Consideradas | Por qué elegimos esto                                    |
| ----------------- | ------------------------- | -------------------------------------------------------- |
| **Next.js**       | Remix, SvelteKit, Nuxt    | App Router, RSC, mejor ecosystem, Vercel backing         |
| **Serwist**       | Workbox original          | Fork mejorado, mejor DX, más actualizado                 |
| **Tailwind CSS**  | CSS Modules, Styled-comp. | Utility-first, responsive easy, no runtime overhead      |
| **PostgreSQL**    | MySQL, MongoDB            | ACID, JSON support, mejor para relaciones                |
| **Prisma**        | Sequelize, TypeORM        | Type-safety, migrations, mejor DX, Studio                |
| **Zustand**       | Redux, Jotai              | Simplicidad, sin boilerplate, mejor performance          |
| **NextAuth**      | Auth0, Clerk              | Open source, flexible, integrado con Next.js             |
| **PM2**           | Forever, nodemon          | Clustering, monitoring, production-ready                 |
| **Docker**        | Native deployment         | Consistencia, portabilidad, rollback fácil               |

---

## 📚 Dependencias por Sprint

### Sprint 1: Autenticación y Setup

```bash
# Frontend
npm install next-auth zod react-hook-form @hookform/resolvers
npm install -D @types/node

# Backend
npm install express jsonwebtoken bcryptjs @prisma/client
npm install -D prisma @types/jsonwebtoken @types/bcryptjs
```

### Sprint 2: PWA y Navegación

```bash
# Frontend
npm install @serwist/next serwist
npm install zustand react-query @tanstack/react-query
npm install framer-motion
```

### Sprint 3: Upload y Gestión de Archivos

```bash
# Backend
npm install multer sharp @aws-sdk/client-s3

# Frontend
npm install react-dropzone browser-image-compression
npm install dexie # IndexedDB wrapper
```

### Sprint 4: Visualización de Media

```bash
# Frontend
npm install react-pdf video.js howler.js
npm install @types/video.js
```

### Sprint 5: Compartir y Notificaciones

```bash
# Backend
npm install node-cron

# Frontend (Web Push API es nativo)
# Configuración de Service Worker para push notifications
```

### Sprint 6: Búsqueda

```bash
# Frontend
npm install cmdk # Command palette
```

### Sprint 7: Sincronización Offline

```bash
# Frontend
# Configuración de Serwist para cache strategies
# IndexedDB para storage offline (dexie ya instalado)
```

### Sprint 8: Monitoreo y Seguridad

```bash
# Backend
npm install helmet express-rate-limit prom-client

# Frontend
npm install @sentry/nextjs
```

---

## 🔄 Migration Notes

### De React Native a Next.js PWA

**Cambios principales:**

1. **Platform:** Mobile apps → Progressive Web App
2. **Framework:** React Native + Expo → Next.js 16
3. **Styling:** StyleSheet → Tailwind CSS
4. **Routing:** Expo Router → Next.js App Router
5. **State:** Redux Toolkit → Zustand + React Query
6. **Auth:** Custom JWT → NextAuth.js
7. **Offline:** expo-task-manager → Serwist + IndexedDB
8. **Deployment:** EAS → Docker + PM2 + EC2
9. **Storage:** AsyncStorage → IndexedDB
10. **File APIs:** Expo APIs → HTML5 File API

**Capacidades mantenidas:**

- ✅ Offline functionality (Service Workers)
- ✅ Push notifications (Web Push API)
- ✅ File upload/download
- ✅ Camera access (getUserMedia)
- ✅ Cross-platform (Web responsive)

**Capacidades ganadas:**

- ✅ SEO optimization
- ✅ Server-side rendering
- ✅ No app store restrictions
- ✅ Instant updates
- ✅ Better desktop experience
- ✅ Lower distribution costs

---

Este stack tecnológico proporciona una base sólida y escalable para Merett Cloud PWA, optimizado para desarrollo rápido, performance y experiencia de usuario profesional.

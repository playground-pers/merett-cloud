# Deployment Strategy - Merett Cloud PWA

## 🚀 Visión General

Estrategia de deployment completa para Merett Cloud PWA usando Docker, PM2, Nginx y EC2, con CI/CD automatizado, monitoreo continuo y estrategias de rollback.

### Ambientes

```
Development  → Testing → Staging → Production
   Docker       CI/CD     EC2        EC2
```

### Stack de Deployment

```
Frontend (Next.js PWA): PM2 + Nginx (Port 3679)
Backend (Express API):  Docker (Port 4578)
Database (PostgreSQL):  Docker/RDS (Port 5432)
Monitoring:            Docker (Grafana: 3847, Prometheus: 9287, AlertManager: 9341)
```

---

## 🏗️ Infraestructura AWS

### Arquitectura de Producción

```
┌─────────────────────────────────────────────────────────┐
│                  Route 53 (DNS)                         │
│              merettcloud.com                            │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Nginx (Port 80/443)                        │
│            SSL Termination (Let's Encrypt)              │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Location Routing:                               │  │
│  │  /           → Next.js PWA (3679)                │  │
│  │  /api        → Express API (4578)                │  │
│  │  /grafana    → Grafana (3847)                    │  │
│  │  /metrics    → Prometheus (9287)                 │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
┌───────▼────┐  ┌────▼────┐  ┌───▼──────────┐
│  Next.js   │  │ Express │  │  Monitoring  │
│    PWA     │  │   API   │  │    Stack     │
│  (PM2)     │  │ (Docker)│  │  (Docker)    │
│  :3679     │  │  :4578  │  │  3847/9287   │
└────────────┘  └────┬────┘  └──────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
┌───────▼─────┐  ┌───▼──────┐ ┌─▼────────────┐
│ PostgreSQL  │  │  AWS S3  │ │  CloudWatch  │
│  :5432      │  │ (Files)  │ │  (Logs)      │
│ (Docker/RDS)│  │          │ │              │
└─────────────┘  └──────────┘ └──────────────┘
```

---

## 🐳 Docker Configuration

### Root docker-compose.yml (Development)

```yaml
# /docker-compose.yml
version: '3.9'

services:
  # Frontend - Next.js PWA
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3679:3679"
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_API_URL=http://localhost:4578/api
      - NEXT_PUBLIC_WS_URL=ws://localhost:4578
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next
    depends_on:
      - backend
    networks:
      - merett-network

  # Backend - Express API
  backend:
    build:
      context: ./express
      dockerfile: Dockerfile.dev
    ports:
      - "4578:4578"
    environment:
      - NODE_ENV=development
      - PORT=4578
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/merett_cloud
      - JWT_SECRET=${JWT_SECRET:-dev-secret}
      - REFRESH_TOKEN_SECRET=${REFRESH_TOKEN_SECRET:-dev-refresh-secret}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
      - AWS_REGION=${AWS_REGION:-us-east-1}
      - S3_BUCKET=${S3_BUCKET:-merett-cloud-dev}
    volumes:
      - ./express:/app
      - /app/node_modules
      - ./express/logs:/app/logs
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - merett-network

  # Database - PostgreSQL
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
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - merett-network

  # Monitoring - Prometheus
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9287:9090"
    volumes:
      - ./express/data/prometheus:/etc/prometheus
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
    networks:
      - merett-network

  # Monitoring - Grafana
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3847:3000"
    environment:
      - GF_SERVER_HTTP_PORT=3000
      - GF_SERVER_ROOT_URL=http://localhost:3847
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_INSTALL_PLUGINS=grafana-clock-panel
    volumes:
      - grafana_data:/var/lib/grafana
      - ./express/data/grafana/provisioning:/etc/grafana/provisioning
      - ./express/data/grafana/dashboards:/etc/grafana/dashboards
    depends_on:
      - prometheus
    networks:
      - merett-network

  # Monitoring - AlertManager
  alertmanager:
    image: prom/alertmanager:latest
    ports:
      - "9341:9093"
    volumes:
      - ./express/data/alertmanager:/etc/alertmanager
    command:
      - '--config.file=/etc/alertmanager/alertmanager.yml'
      - '--storage.path=/alertmanager'
    networks:
      - merett-network

  # Monitoring - Node Exporter
  node-exporter:
    image: prom/node-exporter:latest
    ports:
      - "9182:9100"
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    networks:
      - merett-network

volumes:
  postgres_data:
  prometheus_data:
  grafana_data:

networks:
  merett-network:
    driver: bridge
```

### Frontend Dockerfile

```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3679

ENV PORT=3679
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### Frontend Dockerfile.dev

```dockerfile
# frontend/Dockerfile.dev
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3679

CMD ["npm", "run", "dev"]
```

### Backend Dockerfile (Already exists in express/)

```dockerfile
# express/Dockerfile
FROM node:20-alpine AS base

WORKDIR /app

# Dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs package*.json ./
COPY --chown=nodejs:nodejs prisma ./prisma

USER nodejs

EXPOSE 4578

CMD ["node", "dist/index.js"]
```

---

## 🔧 EC2 Instance Setup

### Initial Server Setup

```bash
#!/bin/bash
# EC2 User Data Script for Ubuntu 22.04

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Docker
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add ubuntu user to docker group
sudo usermod -aG docker ubuntu

# Install Nginx
sudo apt install -y nginx

# Install Certbot (SSL)
sudo apt install -y certbot python3-certbot-nginx

# Install AWS CLI
sudo apt install -y awscli

# Install PostgreSQL client
sudo apt install -y postgresql-client

# Create app directories
sudo mkdir -p /var/www/merett-cloud/{frontend,backend}
sudo chown -R ubuntu:ubuntu /var/www/merett-cloud

# Setup logging
sudo mkdir -p /var/log/merett-cloud
sudo chown -R ubuntu:ubuntu /var/log/merett-cloud

# Install CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i amazon-cloudwatch-agent.deb
rm amazon-cloudwatch-agent.deb
```

---

## 🔌 Nginx Configuration

### Main Configuration

```nginx
# /etc/nginx/sites-available/merett-cloud

# Upstream definitions
upstream nextjs {
    server 127.0.0.1:3679;
    keepalive 64;
}

upstream api {
    server 127.0.0.1:4578;
    keepalive 32;
}

upstream grafana {
    server 127.0.0.1:3847;
}

upstream prometheus {
    server 127.0.0.1:9287;
}

# HTTP server - redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name merettcloud.com www.merettcloud.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name merettcloud.com www.merettcloud.com;

    # SSL certificates (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/merettcloud.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/merettcloud.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-CHACHA20-POLY1305;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Logging
    access_log /var/log/nginx/merett-cloud-access.log combined;
    error_log /var/log/nginx/merett-cloud-error.log warn;

    # Client max body size (for file uploads)
    client_max_body_size 100M;
    client_body_timeout 300s;

    # Timeouts
    proxy_connect_timeout 60s;
    proxy_send_timeout 300s;
    proxy_read_timeout 300s;

    # Next.js PWA - Main application
    location / {
        proxy_pass http://nextjs;
        proxy_http_version 1.1;

        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # Standard proxy headers
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;

        # Next.js specific
        proxy_buffering off;
    }

    # API Backend
    location /api {
        proxy_pass http://api;
        proxy_http_version 1.1;

        # WebSocket support for Socket.IO
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # Standard proxy headers
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts for long-running requests
        proxy_connect_timeout 60s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }

    # Grafana Monitoring
    location /grafana/ {
        proxy_pass http://grafana/;
        proxy_http_version 1.1;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support for Grafana Live
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }

    # Prometheus Metrics (optionally restrict access)
    location /metrics/ {
        # Optional: Restrict to internal IPs
        # allow 10.0.0.0/8;
        # deny all;

        proxy_pass http://prometheus/;
        proxy_http_version 1.1;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://api/health;
        access_log off;
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/merett-cloud /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 📦 PM2 Configuration

### PM2 Ecosystem File for Next.js

```javascript
// /var/www/merett-cloud/frontend/ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'merett-cloud-frontend',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/merett-cloud/frontend',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3679,
        HOSTNAME: '0.0.0.0',
      },
      error_file: '/var/log/merett-cloud/frontend-error.log',
      out_file: '/var/log/merett-cloud/frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      max_memory_restart: '1G',
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      listen_timeout: 5000,
      kill_timeout: 5000,
      wait_ready: true,
      watch: false,
    },
  ],
};
```

### PM2 Commands

```bash
# Start application
pm2 start ecosystem.config.js

# Reload without downtime
pm2 reload ecosystem.config.js

# Stop application
pm2 stop merett-cloud-frontend

# Restart application
pm2 restart merett-cloud-frontend

# View logs
pm2 logs merett-cloud-frontend

# Monitor
pm2 monit

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions - Frontend Workflow

```yaml
# .github/workflows/deploy-frontend.yml

name: Deploy Frontend (Next.js PWA)

on:
  push:
    branches:
      - main
      - develop
    paths:
      - 'frontend/**'
  pull_request:
    branches:
      - main

env:
  NODE_VERSION: '20.x'

jobs:
  test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run tests
        run: npm test

      - name: Build Next.js
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: https://merettcloud.com/api

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy to Staging
        run: |
          cd frontend
          npm ci
          npm run build
          
          # Create deployment package
          tar -czf deploy-frontend.tar.gz \
            .next/ \
            public/ \
            package.json \
            package-lock.json \
            next.config.js \
            ecosystem.config.js
          
          # Upload to S3
          aws s3 cp deploy-frontend.tar.gz \
            s3://merett-cloud-deployments/staging/frontend-${{ github.sha }}.tar.gz
          
          # Deploy via SSM
          aws ssm send-command \
            --document-name "AWS-RunShellScript" \
            --targets "Key=tag:Environment,Values=staging" \
            --parameters 'commands=[
              "cd /var/www/merett-cloud/frontend",
              "aws s3 cp s3://merett-cloud-deployments/staging/frontend-${{ github.sha }}.tar.gz .",
              "tar -xzf frontend-${{ github.sha }}.tar.gz",
              "npm ci --production",
              "pm2 reload ecosystem.config.js",
              "rm frontend-${{ github.sha }}.tar.gz"
            ]'

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Build and Deploy
        run: |
          cd frontend
          npm ci
          npm run build
          
          # Create deployment package
          tar -czf deploy-frontend.tar.gz \
            .next/ \
            public/ \
            package.json \
            package-lock.json \
            next.config.js \
            ecosystem.config.js
          
          # Upload to S3
          aws s3 cp deploy-frontend.tar.gz \
            s3://merett-cloud-deployments/production/frontend-${{ github.sha }}.tar.gz

      - name: Deploy to Production EC2
        run: |
          # Get EC2 instances
          INSTANCE_IDS=$(aws ec2 describe-instances \
            --filters "Name=tag:Environment,Values=production" \
                     "Name=instance-state-name,Values=running" \
            --query "Reservations[*].Instances[*].InstanceId" \
            --output text)
          
          for INSTANCE_ID in $INSTANCE_IDS; do
            aws ssm send-command \
              --instance-ids $INSTANCE_ID \
              --document-name "AWS-RunShellScript" \
              --parameters 'commands=[
                "cd /var/www/merett-cloud/frontend",
                "aws s3 cp s3://merett-cloud-deployments/production/frontend-${{ github.sha }}.tar.gz .",
                "tar -xzf frontend-${{ github.sha }}.tar.gz",
                "npm ci --production",
                "pm2 reload ecosystem.config.js --update-env",
                "rm frontend-${{ github.sha }}.tar.gz"
              ]'
            
            # Wait between instances for rolling deployment
            sleep 30
          done

      - name: Verify deployment
        run: |
          sleep 30
          curl -f https://merettcloud.com/ || exit 1

      - name: Notify team
        if: always()
        run: |
          # Add notification logic (Slack, Discord, etc.)
          echo "Deployment ${{ job.status }}"
```

### GitHub Actions - Backend Workflow

```yaml
# .github/workflows/deploy-backend.yml

name: Deploy Backend (Express API)

on:
  push:
    branches:
      - main
      - develop
    paths:
      - 'express/**'
  pull_request:
    branches:
      - main

env:
  NODE_VERSION: '20.x'

jobs:
  test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: express

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: express/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run tests
        run: npm test

      - name: Build Docker image
        run: |
          docker build -t merett-cloud-api:${{ github.sha }} .
          docker tag merett-cloud-api:${{ github.sha }} merett-cloud-api:latest

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production

    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and Push Docker image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: merett-cloud-api
          IMAGE_TAG: ${{ github.sha }}
        run: |
          cd express
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest

      - name: Deploy to EC2
        run: |
          INSTANCE_IDS=$(aws ec2 describe-instances \
            --filters "Name=tag:Environment,Values=production" \
                     "Name=instance-state-name,Values=running" \
            --query "Reservations[*].Instances[*].InstanceId" \
            --output text)
          
          for INSTANCE_ID in $INSTANCE_IDS; do
            aws ssm send-command \
              --instance-ids $INSTANCE_ID \
              --document-name "AWS-RunShellScript" \
              --parameters 'commands=[
                "cd /var/www/merett-cloud/backend",
                "docker-compose pull",
                "docker-compose up -d --force-recreate",
                "docker system prune -f"
              ]'
          done

      - name: Verify deployment
        run: |
          sleep 30
          curl -f https://merettcloud.com/api/health || exit 1
```

---

## 🔐 SSL/TLS Configuration

### Let's Encrypt Setup

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d merettcloud.com -d www.merettcloud.com

# Test auto-renewal
sudo certbot renew --dry-run

# Auto-renewal cron job (already set up by certbot)
# Check with: sudo systemctl status certbot.timer
```

---

## 📊 Monitoring Setup

### Prometheus Configuration

```yaml
# express/data/prometheus/prometheus.yml

global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - localhost:9093

rule_files:
  - "/etc/prometheus/rules/*.yml"

scrape_configs:
  # Express API
  - job_name: 'api'
    static_configs:
      - targets: ['host.docker.internal:4578']
    metrics_path: '/metrics'

  # Node Exporter (System metrics)
  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']

  # Prometheus itself
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
```

### Grafana Dashboard Import

```bash
# Grafana is accessible at http://localhost:3847
# Default credentials: admin / admin

# Import pre-built dashboards:
# 1. Node Exporter Full: Dashboard ID 1860
# 2. Express.js Dashboard: Create custom or use express/data/grafana/dashboards/
```

---

## 💾 Backup Strategy

### Automated Backups

```bash
#!/bin/bash
# /var/www/merett-cloud/scripts/backup.

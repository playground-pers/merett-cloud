# 🎨 Paleta de Colores - Merett Cloud

> Sistema completo de colores mate y minimalistas inspirado en Notion, Next.js y Apple Design

---

## 🎯 Filosofía de Color

- **Mate sobre brillante**: Colores desaturados que no cansan la vista
- **Contraste elegante**: Diferencias sutiles pero claras
- **Modo oscuro real**: Negro mate (#0A0A0A) en lugar de gris oscuro
- **Consistencia semántica**: Cada color tiene un propósito específico

---

## 🟣 Colores de Marca

### Primary (Púrpura Mate)

| Variante | Hex     | RGB           | Uso                     |
| -------- | ------- | ------------- | ----------------------- |
| 50       | #F5F3FF | 245, 243, 255 | Backgrounds muy sutiles |
| 100      | #EDE9FE | 237, 233, 254 | Hover backgrounds       |
| 200      | #DDD6FE | 221, 214, 254 | Borders activos         |
| 300      | #C4B5FD | 196, 181, 253 | Disabled states         |
| 400      | #A78BFA | 167, 139, 250 | Secondary actions       |
| 500      | #8B5CF6 | 139, 92, 246  | **Primary base**        |
| 600      | #7C3AED | 124, 58, 237  | **Primary default**     |
| 700      | #6D28D9 | 109, 40, 217  | Primary hover           |
| 800      | #5B21B6 | 91, 33, 182   | Primary pressed         |
| 900      | #4C1D95 | 76, 29, 149   | Primary text on light   |

**Uso en código:**

```typescript
primary: '#7C3AED',      // Botones, links, CTAs
primaryHover: '#6D28D9', // Estados hover
primaryPressed: '#5B21B6', // Estados pressed
primaryLight: '#EDE9FE', // Backgrounds sutiles
```

### Secondary (Lavanda Suave)

| Variante | Hex     | RGB           | Uso                   |
| -------- | ------- | ------------- | --------------------- |
| 400      | #A78BFA | 167, 139, 250 | Secondary base        |
| 500      | #8B5CF6 | 139, 92, 246  | **Secondary default** |
| 600      | #7C3AED | 124, 58, 237  | Secondary hover       |

### Accent (Rosa Mate)

| Variante | Hex     | RGB          | Uso                |
| -------- | ------- | ------------ | ------------------ |
| 500      | #EC4899 | 236, 72, 153 | **Accent default** |
| 600      | #DB2777 | 219, 39, 119 | Accent hover       |
| 700      | #BE185D | 190, 24, 93  | Accent pressed     |

**Uso:** Highlights, badges importantes, notificaciones especiales

---

## 🌑 Neutrales (Inspirado en Apple/Notion)

### Light Mode - Grises Cálidos

| Token      | Hex     | RGB         | Uso                  |
| ---------- | ------- | ----------- | -------------------- |
| `white`    | #FFFFFF | 255,255,255 | Background principal |
| `gray-50`  | #F9FAFB | 249,250,251 | Surface alternativo  |
| `gray-100` | #F3F4F6 | 243,244,246 | Hover backgrounds    |
| `gray-200` | #E5E7EB | 229,231,235 | Borders normales     |
| `gray-300` | #D1D5DB | 209,213,219 | Borders activos      |
| `gray-400` | #9CA3AF | 156,163,175 | Placeholders         |
| `gray-500` | #6B7280 | 107,114,128 | **Text secondary**   |
| `gray-600` | #4B5563 | 75,85,99    | Text labels          |
| `gray-700` | #374151 | 55,65,81    | Text medium          |
| `gray-800` | #1F2937 | 31,41,55    | Text emphasis        |
| `gray-900` | #111827 | 17,24,39    | **Text primary**     |

### Dark Mode - Negros Mate

| Token      | Hex     | RGB         | Uso                      |
| ---------- | ------- | ----------- | ------------------------ |
| `black`    | #0A0A0A | 10,10,10    | **Background principal** |
| `gray-950` | #0F0F0F | 15,15,15    | Surface elevado          |
| `gray-900` | #1C1C1E | 28,28,30    | **Surface base**         |
| `gray-800` | #2C2C2E | 44,44,46    | Cards, inputs            |
| `gray-700` | #3A3A3C | 58,58,60    | Borders normales         |
| `gray-600` | #48484A | 72,72,74    | Borders activos          |
| `gray-500` | #636366 | 99,99,102   | Placeholders             |
| `gray-400` | #98989F | 152,152,159 | **Text secondary**       |
| `gray-300` | #AEAEB2 | 174,174,178 | Text labels              |
| `gray-200` | #C7C7CC | 199,199,204 | Text medium              |
| `gray-100` | #E5E5EA | 229,229,234 | Text emphasis            |
| `gray-50`  | #F9FAFB | 249,250,251 | **Text primary**         |

---

## 🎨 Colores Semánticos

### Success (Verde Mate)

| Token           | Light   | Dark    | Uso           |
| --------------- | ------- | ------- | ------------- |
| `success-light` | #ECFDF5 | #064E3B | Backgrounds   |
| `success`       | #10B981 | #34D399 | **Base**      |
| `success-dark`  | #059669 | #10B981 | Hover/pressed |

**Uso:** Upload completo, sincronización exitosa, archivos guardados

### Warning (Ámbar Mate)

| Token           | Light   | Dark    | Uso           |
| --------------- | ------- | ------- | ------------- |
| `warning-light` | #FFFBEB | #78350F | Backgrounds   |
| `warning`       | #F59E0B | #FCD34D | **Base**      |
| `warning-dark`  | #D97706 | #F59E0B | Hover/pressed |

**Uso:** Almacenamiento casi lleno, archivos sin sincronizar, advertencias

### Error (Rojo Mate)

| Token         | Light   | Dark    | Uso           |
| ------------- | ------- | ------- | ------------- |
| `error-light` | #FEF2F2 | #7F1D1D | Backgrounds   |
| `error`       | #EF4444 | #F87171 | **Base**      |
| `error-dark`  | #DC2626 | #EF4444 | Hover/pressed |

**Uso:** Errores de upload, archivos eliminados, fallos de sincronización

### Info (Azul Mate)

| Token        | Light   | Dark    | Uso           |
| ------------ | ------- | ------- | ------------- |
| `info-light` | #EFF6FF | #1E3A8A | Backgrounds   |
| `info`       | #3B82F6 | #60A5FA | **Base**      |
| `info-dark`  | #2563EB | #3B82F6 | Hover/pressed |

**Uso:** Información general, tooltips, ayuda contextual

---

## 📁 Colores por Tipo de Archivo

### Imágenes

| Token        | Hex     | Uso                   |
| ------------ | ------- | --------------------- |
| `image-tint` | #7C3AED | Overlay en thumbnails |
| `image-bg`   | #F5F3FF | Background de cards   |

### Videos

| Token        | Hex     | Uso                 |
| ------------ | ------- | ------------------- |
| `video-tint` | #EC4899 | Overlay play button |
| `video-bg`   | #FDF2F8 | Background de cards |

### Documentos

| Token           | Hex     | Uso                  |
| --------------- | ------- | -------------------- |
| `document-tint` | #3B82F6 | Íconos de documentos |
| `document-bg`   | #EFF6FF | Background de cards  |

### Audio

| Token        | Hex     | Uso                 |
| ------------ | ------- | ------------------- |
| `audio-tint` | #10B981 | Íconos de audio     |
| `audio-bg`   | #ECFDF5 | Background de cards |

### Carpetas

| Token         | Hex     | Uso                 |
| ------------- | ------- | ------------------- |
| `folder-tint` | #F59E0B | Íconos de carpetas  |
| `folder-bg`   | #FFFBEB | Background de cards |

---

## 🔄 Estados de Archivo

### Sincronización

| Estado    | Color   | Icono | Uso                     |
| --------- | ------- | ----- | ----------------------- |
| `synced`  | #10B981 | ✓     | Archivo sincronizado    |
| `syncing` | #3B82F6 | ↻     | Sincronizando ahora     |
| `offline` | #6B7280 | ☁️    | Solo local (offline)    |
| `error`   | #EF4444 | ⚠    | Error de sincronización |

### Compartir

| Estado    | Color   | Icono | Uso                  |
| --------- | ------- | ----- | -------------------- |
| `shared`  | #7C3AED | 👥    | Compartido con otros |
| `public`  | #EC4899 | 🔗    | Link público activo  |
| `private` | #6B7280 | 🔒    | Solo yo              |

---

## 💫 Efectos y Overlays

### Blur y Glassmorphism (Estilo iOS)

```typescript
// Para modals y bottom sheets
glassmorphism: {
  background: 'rgba(255, 255, 255, 0.8)',  // Light mode
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}

glassmorphismDark: {
  background: 'rgba(28, 28, 30, 0.8)',     // Dark mode
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}
```

### Overlays

| Tipo           | Light Mode      | Dark Mode       | Uso               |
| -------------- | --------------- | --------------- | ----------------- |
| `overlay-soft` | rgba(0,0,0,0.1) | rgba(0,0,0,0.3) | Hover sutil       |
| `overlay-med`  | rgba(0,0,0,0.3) | rgba(0,0,0,0.5) | Modals background |
| `overlay-hard` | rgba(0,0,0,0.6) | rgba(0,0,0,0.8) | Lightbox          |

---

## 🎭 Implementación en Código

### Estructura en theme/colors.ts

```typescript
export const lightTheme = {
  // Marca
  primary: '#7C3AED',
  primaryHover: '#6D28D9',
  primaryPressed: '#5B21B6',
  primaryLight: '#EDE9FE',

  secondary: '#8B5CF6',
  accent: '#EC4899',

  // Backgrounds
  background: '#FFFFFF',
  surface: '#F9FAFB',
  surfaceHover: '#F3F4F6',
  elevated: '#FFFFFF',

  // Borders
  border: '#E5E7EB',
  borderActive: '#D1D5DB',
  borderFocus: '#7C3AED',

  // Text
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textDisabled: '#D1D5DB',
  textInverse: '#FFFFFF',

  // Semantic
  success: '#10B981',
  successLight: '#ECFDF5',
  warning: '#F59E0B',
  warningLight: '#FFFBEB',
  error: '#EF4444',
  errorLight: '#FEF2F2',
  info: '#3B82F6',
  infoLight: '#EFF6FF',

  // File types
  imageTint: '#7C3AED',
  videoTint: '#EC4899',
  documentTint: '#3B82F6',
  audioTint: '#10B981',
  folderTint: '#F59E0B',
};

export const darkTheme = {
  // Marca
  primary: '#8B5CF6',
  primaryHover: '#7C3AED',
  primaryPressed: '#6D28D9',
  primaryLight: '#2C2C2E',

  secondary: '#A78BFA',
  accent: '#EC4899',

  // Backgrounds
  background: '#0A0A0A',
  surface: '#1C1C1E',
  surfaceHover: '#2C2C2E',
  elevated: '#2C2C2E',

  // Borders
  border: '#3A3A3C',
  borderActive: '#48484A',
  borderFocus: '#8B5CF6',

  // Text
  textPrimary: '#F9FAFB',
  textSecondary: '#98989F',
  textTertiary: '#636366',
  textDisabled: '#48484A',
  textInverse: '#111827',

  // Semantic
  success: '#34D399',
  successLight: '#064E3B',
  warning: '#FCD34D',
  warningLight: '#78350F',
  error: '#F87171',
  errorLight: '#7F1D1D',
  info: '#60A5FA',
  infoLight: '#1E3A8A',

  // File types
  imageTint: '#8B5CF6',
  videoTint: '#EC4899',
  documentTint: '#60A5FA',
  audioTint: '#34D399',
  folderTint: '#FCD34D',
};
```

---

## ✅ Reglas de Uso

### DO ✅

- Usar colores del tema, nunca hardcodear
- Respetar contraste mínimo 4.5:1 (texto) y 3:1 (UI)
- Usar colores semánticos para estados (success, error, etc.)
- Aplicar colores de tipo de archivo consistentemente
- Usar overlays para jerarquía visual

### DON'T ❌

- No inventar nuevos colores fuera de la paleta
- No usar negro puro (#000000) o blanco puro en fondos grandes
- No mezclar colores de diferentes escalas sin propósito
- No usar más de 3 colores de acción en una misma pantalla
- No ignorar el modo oscuro

---

## 🧪 Testing de Contraste

Todas las combinaciones de color/fondo deben cumplir:

| Nivel    | Ratio | Uso                  |
| -------- | ----- | -------------------- |
| AA       | 4.5:1 | Texto normal mínimo  |
| AAA      | 7:1   | Texto normal ideal   |
| AA Large | 3:1   | Texto grande (>18px) |

**Herramienta recomendada:** https://contrast-ratio.com

---

## 📚 Referencias

- Apple Human Interface Guidelines (Color)
- Tailwind CSS Color Palette
- Notion Design System
- Material Design 3 (Color tokens)

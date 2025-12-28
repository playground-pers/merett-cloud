# 🎯 Sistema de Iconografía - Merett Cloud

> Guía completa de iconos usando Ionicons (Expo Vector Icons)

---

## 🎯 Filosofía de Iconos

- **Claridad visual**: Iconos que se entienden sin necesidad de texto
- **Consistencia**: Mismo estilo (outline/filled) según contexto
- **Tamaños estandarizados**: Sistema de tamaños coherente
- **Accesibilidad**: Siempre con labels para lectores de pantalla

---

## 📦 Librería de Iconos

### Ionicons (por defecto en Expo)

**Ventajas:**

- Incluido con Expo (sin instalación adicional)
- Estilo iOS moderno
- Dos variantes: outline y filled
- Consistente con Apple Design

**Importación:**

```typescript
import { Ionicons } from '@expo/vector-icons';

<Ionicons name="cloud-upload-outline" size={24} color="#7C3AED" />
```

---

## 📏 Tamaños de Iconos

### Escala Estandarizada

| Token  | Tamaño | Uso                                    |
| ------ | ------ | -------------------------------------- |
| `xs`   | 16px   | Inline con texto small, badges         |
| `sm`   | 20px   | Botones secundarios, inputs            |
| `md`   | 24px   | **Estándar** - Botones, navegación     |
| `lg`   | 32px   | Headers, tabs, acciones principales    |
| `xl`   | 48px   | Estados vacíos, grandes acciones       |
| `hero` | 80px   | Onboarding, splash, estados especiales |

### Implementación

```typescript
// theme/icons.ts
export const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24, // Default
  lg: 32,
  xl: 48,
  hero: 80,
} as const;
```

---

## 🎨 Iconos por Categoría

### 1. Navegación y Acciones

| Acción        | Icon Name (Outline)   | Icon Name (Filled) | Tamaño  |
| ------------- | --------------------- | ------------------ | ------- |
| Home          | `home-outline`        | `home`             | md (24) |
| Búsqueda      | `search-outline`      | `search`           | md (24) |
| Filtros       | `filter-outline`      | `filter`           | sm (20) |
| Menu          | `menu-outline`        | `menu`             | md (24) |
| Más opciones  | `ellipsis-horizontal` | -                  | md (24) |
| Cerrar        | `close-outline`       | `close`            | md (24) |
| Atrás         | `arrow-back-outline`  | `arrow-back`       | md (24) |
| Perfil        | `person-outline`      | `person`           | md (24) |
| Configuración | `settings-outline`    | `settings`         | md (24) |

### 2. Archivos y Carpetas

| Tipo            | Icon Name (Outline)     | Icon Name (Filled) | Color     |
| --------------- | ----------------------- | ------------------ | --------- |
| Archivo general | `document-outline`      | `document`         | `#3B82F6` |
| Carpeta         | `folder-outline`        | `folder`           | `#F59E0B` |
| Imagen          | `image-outline`         | `image`            | `#7C3AED` |
| Video           | `videocam-outline`      | `videocam`         | `#EC4899` |
| Audio           | `musical-notes-outline` | `musical-notes`    | `#10B981` |
| PDF             | `document-text-outline` | `document-text`    | `#EF4444` |
| Compartido      | `people-outline`        | `people`           | `#7C3AED` |
| Favorito        | `heart-outline`         | `heart`            | `#EC4899` |

### 3. Acciones de Archivo

| Acción      | Icon Name (Outline)          | Icon Name (Filled)   |
| ----------- | ---------------------------- | -------------------- |
| Upload      | `cloud-upload-outline`       | `cloud-upload`       |
| Download    | `cloud-download-outline`     | `cloud-download`     |
| Compartir   | `share-social-outline`       | `share-social`       |
| Copiar      | `copy-outline`               | `copy`               |
| Mover       | `move-outline`               | `move`               |
| Renombrar   | `create-outline`             | `create`             |
| Eliminar    | `trash-outline`              | `trash`              |
| Información | `information-circle-outline` | `information-circle` |
| Abrir       | `open-outline`               | `open`               |
| Más         | `ellipsis-vertical`          | -                    |

### 4. Estados y Feedback

| Estado        | Icon Name (Outline)          | Icon Name (Filled)   | Color     |
| ------------- | ---------------------------- | -------------------- | --------- |
| Éxito         | `checkmark-circle-outline`   | `checkmark-circle`   | `#10B981` |
| Error         | `close-circle-outline`       | `close-circle`       | `#EF4444` |
| Advertencia   | `warning-outline`            | `warning`            | `#F59E0B` |
| Info          | `information-circle-outline` | `information-circle` | `#3B82F6` |
| Sincronizando | `sync-outline`               | `sync`               | `#3B82F6` |
| Sincronizado  | `checkmark-done-outline`     | `checkmark-done`     | `#10B981` |
| Offline       | `cloud-offline-outline`      | `cloud-offline`      | `#6B7280` |
| Cargando      | `reload-outline`             | `reload`             | `#7C3AED` |

### 5. Multimedia

| Acción            | Icon Name (Outline)         | Icon Name (Filled)  |
| ----------------- | --------------------------- | ------------------- |
| Play              | `play-circle-outline`       | `play-circle`       |
| Pause             | `pause-circle-outline`      | `pause-circle`      |
| Stop              | `stop-circle-outline`       | `stop-circle`       |
| Siguiente         | `play-skip-forward-outline` | `play-skip-forward` |
| Anterior          | `play-skip-back-outline`    | `play-skip-back`    |
| Volumen           | `volume-high-outline`       | `volume-high`       |
| Mute              | `volume-mute-outline`       | `volume-mute`       |
| Zoom In           | `add-circle-outline`        | `add-circle`        |
| Zoom Out          | `remove-circle-outline`     | `remove-circle`     |
| Pantalla completa | `expand-outline`            | `expand`            |

### 6. Edición y Creación

| Acción        | Icon Name (Outline)   | Icon Name (Filled) |
| ------------- | --------------------- | ------------------ |
| Agregar       | `add-circle-outline`  | `add-circle`       |
| Crear carpeta | `folder-open-outline` | `folder-open`      |
| Editar        | `create-outline`      | `create`           |
| Guardar       | `save-outline`        | `save`             |
| Deshacer      | `arrow-undo-outline`  | `arrow-undo`       |
| Rehacer       | `arrow-redo-outline`  | `arrow-redo`       |
| Cortar        | `cut-outline`         | `cut`              |
| Copiar        | `copy-outline`        | `copy`             |
| Pegar         | `clipboard-outline`   | `clipboard`        |

### 7. Vistas y Organización

| Tipo de vista | Icon Name (Outline)     | Icon Name (Filled) |
| ------------- | ----------------------- | ------------------ |
| Lista         | `list-outline`          | `list`             |
| Grid          | `grid-outline`          | `grid`             |
| Ordenar       | `swap-vertical-outline` | `swap-vertical`    |
| Filtrar       | `funnel-outline`        | `funnel`           |
| Calendario    | `calendar-outline`      | `calendar`         |
| Reloj         | `time-outline`          | `time`             |
| Ubicación     | `location-outline`      | `location`         |
| Etiqueta      | `pricetag-outline`      | `pricetag`         |

### 8. Almacenamiento

| Concepto      | Icon Name (Outline) | Icon Name (Filled) |
| ------------- | ------------------- | ------------------ |
| Cloud         | `cloud-outline`     | `cloud`            |
| Server        | `server-outline`    | `server`           |
| Base de datos | `albums-outline`    | `albums`           |
| Espacio       | `pie-chart-outline` | `pie-chart`        |
| Limpieza      | `trash-bin-outline` | `trash-bin`        |

---

## 🎨 Reglas de Color

### Por Contexto

```typescript
import { colors } from '@/theme/colors';
import { iconSizes } from '@/theme/icons';

// Iconos de navegación - color de texto
<Ionicons name="home-outline" size={iconSizes.md} color={colors.textPrimary} />

// Iconos de acción - color primario
<Ionicons name="add-circle" size={iconSizes.lg} color={colors.primary} />

// Iconos de estado - color semántico
<Ionicons name="checkmark-circle" size={iconSizes.md} color={colors.success} />
<Ionicons name="warning" size={iconSizes.md} color={colors.warning} />

// Iconos de tipo de archivo - color específico
<Ionicons name="image" size={iconSizes.md} color={colors.imageTint} />
<Ionicons name="folder" size={iconSizes.md} color={colors.folderTint} />
```

### Guía de Colores por Tipo

| Tipo de Icono     | Color a Usar    | Ejemplo                 |
| ----------------- | --------------- | ----------------------- |
| Navegación        | `textPrimary`   | Home, Perfil            |
| Acción principal  | `primary`       | Upload, Crear           |
| Acción secundaria | `textSecondary` | Filtros, Ordenar        |
| Éxito             | `success`       | Checkmark, Guardado     |
| Error             | `error`         | Error, Eliminar         |
| Advertencia       | `warning`       | Advertencia, Casi lleno |
| Info              | `info`          | Info, Ayuda             |
| Imágenes          | `imageTint`     | Icono de imagen         |
| Videos            | `videoTint`     | Icono de video          |
| Documentos        | `documentTint`  | Icono de documento      |
| Audio             | `audioTint`     | Icono de audio          |
| Carpetas          | `folderTint`    | Icono de carpeta        |

---

## 🎭 Outline vs Filled

### Cuándo Usar Cada Variante

**Outline (por defecto):**

- Estados inactivos
- Iconos de navegación no seleccionados
- Acciones secundarias
- Listas de opciones

**Filled:**

- Estados activos/seleccionados
- Navegación actual (tab activo)
- Acciones primarias
- Estados completados

### Ejemplo de Toggle

```typescript
// Tab navigation
function TabIcon({ focused, name }: { focused: boolean; name: string }) {
  const iconName = focused ? name : `${name}-outline`;

  return (
    <Ionicons
      name={iconName}
      size={iconSizes.lg}
      color={focused ? colors.primary : colors.textSecondary}
    />
  );
}

// Favorito toggle
function FavoriteIcon({ isFavorite }: { isFavorite: boolean }) {
  return (
    <Ionicons
      name={isFavorite ? 'heart' : 'heart-outline'}
      size={iconSizes.md}
      color={isFavorite ? colors.accent : colors.textSecondary}
    />
  );
}
```

---

## ♿ Accesibilidad

### Labels para Lectores de Pantalla

Siempre incluir `accessibilityLabel` cuando el icono es interactivo:

```typescript
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Subir archivo"
  accessibilityRole="button"
  accessibilityHint="Abre el selector de archivos"
>
  <Ionicons name="cloud-upload-outline" size={iconSizes.md} color={colors.primary} />
</TouchableOpacity>
```

### Iconos Decorativos

Si el icono es puramente decorativo (texto adyacente explica la función):

```typescript
<View accessible={true} accessibilityLabel="2.5 MB">
  <Ionicons name="document-outline" size={iconSizes.sm} color={colors.documentTint} />
  <Text>2.5 MB</Text>
</View>
```

---

## 💾 Implementación Completa

### Archivo: theme/icons.ts

```typescript
import { Ionicons } from '@expo/vector-icons';

// Icon sizes
export const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
  hero: 80,
} as const;

// Icon names por categoría (tipado)
export const iconNames = {
  // Navegación
  home: 'home-outline',
  homeActive: 'home',
  search: 'search-outline',
  profile: 'person-outline',
  profileActive: 'person',
  settings: 'settings-outline',

  // Archivos
  file: 'document-outline',
  folder: 'folder-outline',
  folderOpen: 'folder-open-outline',
  image: 'image-outline',
  video: 'videocam-outline',
  audio: 'musical-notes-outline',
  pdf: 'document-text-outline',

  // Acciones
  upload: 'cloud-upload-outline',
  download: 'cloud-download-outline',
  share: 'share-social-outline',
  delete: 'trash-outline',
  edit: 'create-outline',
  copy: 'copy-outline',
  move: 'move-outline',
  info: 'information-circle-outline',

  // Estados
  success: 'checkmark-circle-outline',
  error: 'close-circle-outline',
  warning: 'warning-outline',
  syncing: 'sync-outline',
  synced: 'checkmark-done-outline',
  offline: 'cloud-offline-outline',

  // UI
  close: 'close-outline',
  back: 'arrow-back-outline',
  menu: 'menu-outline',
  more: 'ellipsis-horizontal',
  moreVertical: 'ellipsis-vertical',
  filter: 'filter-outline',
  add: 'add-circle-outline',

  // Vista
  list: 'list-outline',
  grid: 'grid-outline',
  sort: 'swap-vertical-outline',

  // Multimedia
  play: 'play-circle-outline',
  pause: 'pause-circle-outline',
  stop: 'stop-circle-outline',
} as const;

// Helper component
export function Icon({
  name,
  size = iconSizes.md,
  color,
  style,
}: {
  name: keyof typeof iconNames;
  size?: number;
  color: string;
  style?: any;
}) {
  return <Ionicons name={iconNames[name]} size={size} color={color} style={style} />;
}
```

### Uso del Helper

```typescript
import { Icon } from '@/theme/icons';
import { colors } from '@/theme/colors';

// Simple
<Icon name="upload" color={colors.primary} />

// Con tamaño custom
<Icon name="folder" size={32} color={colors.folderTint} />

// Con estilo
<Icon name="success" color={colors.success} style={{ marginRight: 8 }} />
```

---

## 🎨 Componentes de Icono Personalizados

### FileTypeIcon Component

```typescript
import { Icon, iconSizes } from '@/theme/icons';
import { colors } from '@/theme/colors';

interface FileTypeIconProps {
  fileType: 'image' | 'video' | 'audio' | 'document' | 'folder';
  size?: number;
}

export function FileTypeIcon({ fileType, size = iconSizes.md }: FileTypeIconProps) {
  const iconMap = {
    image: { name: 'image' as const, color: colors.imageTint },
    video: { name: 'video' as const, color: colors.videoTint },
    audio: { name: 'audio' as const, color: colors.audioTint },
    document: { name: 'file' as const, color: colors.documentTint },
    folder: { name: 'folder' as const, color: colors.folderTint },
  };

  const { name, color } = iconMap[fileType];

  return <Icon name={name} size={size} color={color} />;
}
```

### StatusIcon Component

```typescript
interface StatusIconProps {
  status: 'synced' | 'syncing' | 'offline' | 'error';
  size?: number;
}

export function StatusIcon({ status, size = iconSizes.sm }: StatusIconProps) {
  const statusMap = {
    synced: { name: 'synced' as const, color: colors.success },
    syncing: { name: 'syncing' as const, color: colors.info },
    offline: { name: 'offline' as const, color: colors.textSecondary },
    error: { name: 'error' as const, color: colors.error },
  };

  const { name, color } = statusMap[status];

  return <Icon name={name} size={size} color={color} />;
}
```

---

## ✅ Reglas de Uso

### DO ✅

- Usar iconos de Ionicons para consistencia
- Aplicar tamaños del sistema (`iconSizes`)
- Usar colores semánticos del tema
- Incluir `accessibilityLabel` en iconos interactivos
- Usar outline para estado inactivo, filled para activo
- Mantener ratio 1:1 (cuadrados)

### DON'T ❌

- No usar tamaños arbitrarios de iconos
- No hardcodear colores en iconos
- No mezclar diferentes librerías de iconos
- No olvidar labels de accesibilidad
- No usar iconos muy pequeños (<16px)
- No usar demasiados iconos filled a la vez

---

## 📚 Referencias

- [Ionicons Official](https://ionic.io/ionicons)
- [Expo Vector Icons](https://icons.expo.fyi/Index)
- [Apple SF Symbols](https://developer.apple.com/sf-symbols/) (inspiración)
- [Material Icons](https://fonts.google.com/icons) (referencia alternativa)

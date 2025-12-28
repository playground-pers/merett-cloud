# 📐 Sistema de Espaciado - Merett Cloud

> Sistema de espaciado base-8 para diseño coherente y ritmo visual

---

## 🎯 Filosofía de Espaciado

- **Base-8 system**: Múltiplos de 8px para espaciado consistente
- **Respiración**: Espacios generosos inspirados en Notion y Apple
- **Ritmo visual**: Consistencia que guía el ojo naturalmente
- **Adaptabilidad**: Escalable para diferentes tamaños de pantalla

---

## 📏 Escala de Espaciado

### Tokens Base

| Token | Valor | Rem | Uso Principal                               |
| ----- | ----- | --- | ------------------------------------------- |
| `xs`  | 8px   | 0.5 | Gaps mínimos, padding interno muy compacto  |
| `sm`  | 16px  | 1.0 | Gap estándar entre elementos relacionados   |
| `md`  | 24px  | 1.5 | Padding de cards, separación de secciones   |
| `lg`  | 32px  | 2.0 | Separación de grupos, padding de containers |
| `xl`  | 48px  | 3.0 | Separación mayor, padding de screens        |
| `2xl` | 64px  | 4.0 | Separaciones principales de layout          |
| `3xl` | 96px  | 6.0 | Espacios hero, separadores de grandes áreas |

### Tokens Especiales

| Token   | Valor | Uso Específico                            |
| ------- | ----- | ----------------------------------------- |
| `xxxs`  | 4px   | Ajustes finos, borders, micro-spacing     |
| `micro` | 2px   | Hairline borders, separadores muy sutiles |
| `none`  | 0px   | Sin espaciado (usar conscientemente)      |

---

## 🎨 Aplicación por Contexto

### 1. Padding de Screens

```typescript
// Screen principal (vista completa)
screenPadding: {
  horizontal: spacing.md,  // 24px laterales
  top: spacing.md,          // 24px arriba
  bottom: spacing.lg,       // 32px abajo (más espacio para FAB)
}

// Screen con scroll
scrollViewPadding: {
  horizontal: spacing.md,   // 24px laterales
  vertical: spacing.sm,     // 16px vertical
}
```

**Uso:** Todas las pantallas principales (Files, Profile, Settings)

### 2. Cards y Contenedores

```typescript
// Card estándar
cardPadding: spacing.md,     // 24px interno
cardMargin: spacing.sm,      // 16px entre cards

// Card compacta (listas)
compactCardPadding: spacing.sm,  // 16px interno
compactCardMargin: spacing.xs,   // 8px entre cards

// Modal/Bottom Sheet
modalPadding: spacing.lg,    // 32px interno (más generoso)
```

**Uso:** FileCard, FolderCard, modals, bottom sheets

### 3. Listas y Grids

```typescript
// Lista vertical (archivos)
listItemGap: spacing.sm,         // 16px entre items
listSectionGap: spacing.lg,      // 32px entre secciones

// Grid de fotos
photoGridGap: spacing.xs,        // 8px entre fotos (compacto)
photoGridPadding: spacing.sm,    // 16px padding del grid

// Lista horizontal (scroll horizontal)
horizontalListGap: spacing.sm,   // 16px entre items
horizontalListPadding: spacing.md, // 24px padding lateral
```

**Uso:** Listas de archivos, photo grids, carruseles

### 4. Spacing Interno de Componentes

```typescript
// Button
buttonPadding: {
  horizontal: spacing.md,    // 24px lateral
  vertical: spacing.sm,      // 16px vertical
}

// Input Field
inputPadding: {
  horizontal: spacing.sm,    // 16px lateral
  vertical: spacing.sm,      // 16px vertical
}

// Thumbnail
thumbnailPadding: spacing.xs, // 8px interno
```

**Uso:** Componentes interactivos

### 5. Headers y Navigation

```typescript
// Header principal
headerPadding: {
  horizontal: spacing.md,    // 24px lateral
  vertical: spacing.sm,      // 16px vertical
}
headerHeight: 56,            // Altura fija (7 × 8)

// Tab bar
tabBarPadding: spacing.sm,   // 16px interno
tabBarHeight: 64,            // Altura fija (8 × 8)

// Search bar
searchBarPadding: spacing.sm, // 16px interno
searchBarMargin: spacing.md,  // 24px del header
```

**Uso:** Navegación, headers, tab bars

### 6. Texto y Tipografía

```typescript
// Spacing entre textos
textGapTight: spacing.xxxs,      // 4px (label + input)
textGapNormal: spacing.xs,       // 8px (párrafos)
textGapLoose: spacing.sm,        // 16px (secciones)

// Spacing en listas de texto
bulletGap: spacing.xs,           // 8px entre bullets
paragraphGap: spacing.sm,        // 16px entre párrafos
```

**Uso:** Formularios, contenido de texto, descripciones

### 7. Iconos y Badges

```typescript
// Icon + Text
iconTextGap: spacing.xs,         // 8px entre icon y texto

// Badge spacing
badgePadding: {
  horizontal: spacing.xs,        // 8px lateral
  vertical: spacing.xxxs,        // 4px vertical
}
badgeMargin: spacing.xxxs,       // 4px de separación
```

**Uso:** Botones con íconos, badges, labels con íconos

---

## 📱 Espaciado Específico para Merett Cloud

### File Items (Lista)

```typescript
fileItemSpacing: {
  padding: spacing.sm,           // 16px interno
  gap: spacing.xs,               // 8px entre nombre/metadata
  iconGap: spacing.sm,           // 16px entre icono y texto
  actionGap: spacing.md,         // 24px del borde para actions
}
```

### Photo Grid

```typescript
photoGridSpacing: {
  gap: spacing.xs,               // 8px entre fotos
  columns: 3,                    // 3 columnas en móvil
  padding: spacing.sm,           // 16px padding del contenedor
}
```

### Upload Zone

```typescript
uploadZoneSpacing: {
  padding: spacing.lg,           // 32px interno (generoso)
  iconTextGap: spacing.md,       // 24px entre icono y texto
  minHeight: 200,                // Altura mínima para drop zone
}
```

### Bottom Sheet Actions

```typescript
bottomSheetSpacing: {
  padding: spacing.lg,           // 32px interno
  itemGap: spacing.sm,           // 16px entre acciones
  sectionGap: spacing.md,        // 24px entre secciones
  headerGap: spacing.md,         // 24px entre header y contenido
}
```

### Storage Bar

```typescript
storageBarSpacing: {
  padding: spacing.md,           // 24px interno
  barHeight: 8,                  // Altura de barra (1 × 8)
  textGap: spacing.xs,           // 8px entre barra y texto
}
```

---

## 🎭 Implementación en Código

### Archivo: theme/spacing.ts

```typescript
// Base spacing scale (base-8)
export const spacing = {
  none: 0,
  micro: 2,
  xxxs: 4,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
  xxxl: 96,
} as const;

// Semantic spacing (uso específico)
export const semanticSpacing = {
  // Screen
  screenHorizontal: spacing.md,
  screenTop: spacing.md,
  screenBottom: spacing.lg,

  // Cards
  cardPadding: spacing.md,
  cardGap: spacing.sm,
  compactCardPadding: spacing.sm,
  compactCardGap: spacing.xs,

  // Lists
  listItemGap: spacing.sm,
  listSectionGap: spacing.lg,

  // Grids
  gridGap: spacing.xs,
  gridPadding: spacing.sm,

  // Components
  buttonPaddingH: spacing.md,
  buttonPaddingV: spacing.sm,
  inputPadding: spacing.sm,

  // Navigation
  headerPadding: spacing.md,
  headerHeight: 56,
  tabBarHeight: 64,

  // Text
  textGapTight: spacing.xxxs,
  textGapNormal: spacing.xs,
  textGapLoose: spacing.sm,

  // Icons
  iconTextGap: spacing.xs,

  // File specific
  fileItemPadding: spacing.sm,
  fileItemGap: spacing.xs,
  photoGridGap: spacing.xs,
  uploadZonePadding: spacing.lg,
  bottomSheetPadding: spacing.lg,
  storageBarPadding: spacing.md,
} as const;

// Insets (Safe Area aware)
export const insets = {
  top: spacing.md, // Base top inset
  bottom: spacing.lg, // Base bottom inset (considera FAB)
  horizontal: spacing.md, // Base horizontal inset
} as const;

// Sizes (dimensiones fijas comunes)
export const sizes = {
  // Touch targets
  touchTarget: 44, // Mínimo iOS
  touchTargetLarge: 56, // Botones grandes

  // Icons
  iconXs: 16,
  iconSm: 20,
  iconMd: 24,
  iconLg: 32,
  iconXl: 48,

  // Thumbnails
  thumbnailSm: 48,
  thumbnailMd: 80,
  thumbnailLg: 120,

  // Photo grid
  photoGridColumns: 3,
  photoGridItemHeight: 120,

  // Components
  headerHeight: 56,
  tabBarHeight: 64,
  fabSize: 56,
  avatarSm: 32,
  avatarMd: 48,
  avatarLg: 80,

  // Borders
  borderThin: 1,
  borderMedium: 2,
  borderThick: 4,

  // Border radius
  radiusNone: 0,
  radiusSm: 4,
  radiusMd: 8,
  radiusLg: 16,
  radiusXl: 24,
  radiusFull: 9999,
} as const;
```

---

## 🎨 Uso en Componentes

### Ejemplo 1: Screen Layout

```typescript
import { spacing, insets } from '@/theme/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function FilesScreen() {
  const safeInsets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: safeInsets.top + insets.top,
        paddingBottom: safeInsets.bottom + insets.bottom,
        paddingHorizontal: spacing.screenHorizontal,
      }}
    >
      {/* Contenido */}
    </View>
  );
}
```

### Ejemplo 2: FileItem Component

```typescript
import { spacing, sizes } from '@/theme/spacing';

function FileItem() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.fileItemPadding,
        gap: spacing.iconTextGap,
      }}
    >
      <Icon size={sizes.iconMd} />
      <View style={{ flex: 1, gap: spacing.textGapTight }}>
        <Text>Filename.jpg</Text>
        <Text>2.5 MB</Text>
      </View>
    </View>
  );
}
```

### Ejemplo 3: Photo Grid

```typescript
import { spacing, sizes } from '@/theme/spacing';

function PhotoGrid() {
  return (
    <View
      style={{
        padding: spacing.gridPadding,
        gap: spacing.gridGap,
      }}
    >
      {/* Photos en grid con gap */}
    </View>
  );
}
```

### Ejemplo 4: Button

```typescript
import { spacing, sizes } from '@/theme/spacing';

function PrimaryButton() {
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: spacing.buttonPaddingH,
        paddingVertical: spacing.buttonPaddingV,
        minHeight: sizes.touchTarget,
        borderRadius: sizes.radiusMd,
      }}
    >
      <Text>Upload</Text>
    </TouchableOpacity>
  );
}
```

---

## 📱 Responsive Spacing

### Por Tamaño de Pantalla

```typescript
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Breakpoints
const breakpoints = {
  sm: 375, // iPhone SE
  md: 768, // iPad
  lg: 1024, // iPad Pro
};

// Spacing responsivo
export const getResponsiveSpacing = () => {
  if (width < breakpoints.sm) {
    return {
      screenHorizontal: spacing.sm, // 16px en pantallas pequeñas
      cardPadding: spacing.sm, // 16px
    };
  }
  if (width < breakpoints.md) {
    return {
      screenHorizontal: spacing.md, // 24px normal
      cardPadding: spacing.md, // 24px
    };
  }
  return {
    screenHorizontal: spacing.lg, // 32px en tablets
    cardPadding: spacing.lg, // 32px
  };
};
```

---

## ✅ Reglas de Uso

### DO ✅

- Usar tokens de spacing, nunca valores arbitrarios
- Respetar el sistema base-8 (múltiplos de 8)
- Usar tokens semánticos cuando existan (`fileItemPadding` vs `spacing.sm`)
- Considerar safe areas en iOS
- Usar `gap` en lugar de margin cuando sea posible (FlexBox)
- Mantener consistencia: mismo spacing para mismo propósito

### DON'T ❌

- No usar valores como 15px, 17px, 23px (rompen el sistema)
- No crear spacing custom sin documentarlo
- No ignorar el touch target mínimo (44px iOS, 48px Android)
- No usar padding negativo
- No mezclar spacing tokens sin propósito claro
- No olvidar safe areas en top/bottom

---

## 🎯 Touch Targets (Accesibilidad)

### Tamaños Mínimos

| Plataforma | Mínimo | Recomendado | Uso                  |
| ---------- | ------ | ----------- | -------------------- |
| iOS        | 44×44  | 48×48       | Botones, touch areas |
| Android    | 48×48  | 56×56       | Material Design      |
| Web        | 44×44  | 48×48       | Desktop/tablet       |

### Implementación

```typescript
// Touch target mínimo garantizado
<TouchableOpacity
  style={{
    minWidth: sizes.touchTarget,   // 44px
    minHeight: sizes.touchTarget,  // 44px
    padding: spacing.sm,
  }}
>
  <Icon size={sizes.iconMd} />
</TouchableOpacity>

// Touch target grande (botones primarios)
<TouchableOpacity
  style={{
    minHeight: sizes.touchTargetLarge,  // 56px
    paddingHorizontal: spacing.md,
  }}
>
  <Text>Primary Action</Text>
</TouchableOpacity>
```

---

## 📐 Layouts Comunes

### Stack Layout (Vertical)

```typescript
<View style={{ gap: spacing.sm }}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</View>
```

### Inline Layout (Horizontal)

```typescript
<View style={{ flexDirection: 'row', gap: spacing.xs }}>
  <Icon />
  <Text>Label</Text>
</View>
```

### Grid Layout

```typescript
<View
  style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    padding: spacing.sm,
  }}
>
  {/* Items de grid */}
</View>
```

### Section Layout

```typescript
<View style={{ gap: spacing.lg }}>
  <Section>
    <Text style={{ marginBottom: spacing.sm }}>Section Title</Text>
    <View style={{ gap: spacing.xs }}>
      <Item />
      <Item />
    </View>
  </Section>

  <Section>
    <Text style={{ marginBottom: spacing.sm }}>Section Title</Text>
    <View style={{ gap: spacing.xs }}>
      <Item />
      <Item />
    </View>
  </Section>
</View>
```

---

## 🧪 Testing de Espaciado

### Checklist Visual

- [ ] ¿Los touch targets son ≥44×44?
- [ ] ¿El spacing es consistente entre elementos similares?
- [ ] ¿Hay suficiente separación entre secciones?
- [ ] ¿El contenido respira (no se siente apretado)?
- [ ] ¿Las cards tienen padding interno adecuado?
- [ ] ¿Los textos relacionados están agrupados visualmente?
- [ ] ¿El spacing funciona en pantallas pequeñas (iPhone SE)?

---

## 🎨 Ejemplos Visuales

### Bad vs Good Spacing

```typescript
// ❌ BAD: Valores arbitrarios
<View style={{ padding: 13, margin: 19, gap: 11 }}>

// ✅ GOOD: Sistema de spacing
<View style={{ padding: spacing.sm, margin: spacing.md, gap: spacing.xs }}>

// ❌ BAD: Padding inconsistente
<Card style={{ padding: 16 }} />
<Card style={{ padding: 24 }} />

// ✅ GOOD: Padding consistente
<Card style={{ padding: spacing.cardPadding }} />
<Card style={{ padding: spacing.cardPadding }} />

// ❌ BAD: Touch target pequeño
<TouchableOpacity style={{ width: 30, height: 30 }}>

// ✅ GOOD: Touch target adecuado
<TouchableOpacity style={{ minWidth: sizes.touchTarget, minHeight: sizes.touchTarget }}>
```

---

## 📚 Referencias

- [Apple HIG - Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Material Design - Layout](https://m3.material.io/foundations/layout/understanding-layout/overview)
- [WCAG - Touch Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [Tailwind CSS Spacing](https://tailwindcss.com/docs/customizing-spacing)

# 📝 Sistema Tipográfico - Merett Cloud

> Sistema de tipografía escalable y legible con OpenSans

---

## 🎯 Filosofía Tipográfica

- **Claridad sobre decoración**: Textos fáciles de leer para usuarios no técnicos
- **Jerarquía visual clara**: Diferenciación obvia entre niveles
- **Consistencia**: Mismo peso y tamaño para mismos propósitos
- **Accesibilidad**: Line-heights generosos para mejor lectura

---

## 🔤 Familia de Fuentes

### OpenSans (Fuente Principal)

| Variante        | Peso | Archivo                     | Uso                     |
| --------------- | ---- | --------------------------- | ----------------------- |
| Regular         | 400  | OpenSans-Regular.ttf        | Texto general, párrafos |
| Italic          | 400  | OpenSans-Italic.ttf         | Énfasis sutil, captions |
| SemiBold        | 600  | OpenSans-Semibold.ttf       | Subtítulos, labels      |
| SemiBold Italic | 600  | OpenSans-SemiboldItalic.ttf | Énfasis medio itálico   |
| Bold            | 700  | OpenSans-Bold.ttf           | Títulos, CTAs, headers  |
| Bold Italic     | 700  | OpenSans-BoldItalic.ttf     | Énfasis fuerte itálico  |

**Fallbacks:**

```typescript
fontFamily: 'OpenSans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif';
```

---

## 📏 Escala Tipográfica (Base-4)

### Títulos

#### Display (Opcional - Solo en onboarding/splash)

```typescript
display: {
  fontSize: 40,
  lineHeight: 48,
  fontFamily: 'OpenSans-Bold',
  letterSpacing: -0.5,
}
```

**Uso:** Splash screens, grandes anuncios, hero sections

#### H1 - Título Principal

```typescript
h1: {
  fontSize: 32,
  lineHeight: 40,
  fontFamily: 'OpenSans-Bold',
  letterSpacing: -0.5,
}
```

**Uso:** Títulos de pantalla principal (ej: "Mis Archivos", "Configuración")

#### H2 - Título de Sección

```typescript
h2: {
  fontSize: 24,
  lineHeight: 32,
  fontFamily: 'OpenSans-Bold',
  letterSpacing: -0.3,
}
```

**Uso:** Secciones dentro de pantallas (ej: "Recientes", "Compartidos")

#### H3 - Subtítulo

```typescript
h3: {
  fontSize: 20,
  lineHeight: 28,
  fontFamily: 'OpenSans-SemiBold',
  letterSpacing: -0.2,
}
```

**Uso:** Títulos de modals, headers de cards, nombres de carpetas destacados

#### H4 - Título Pequeño

```typescript
h4: {
  fontSize: 18,
  lineHeight: 24,
  fontFamily: 'OpenSans-SemiBold',
  letterSpacing: -0.1,
}
```

**Uso:** Headers de lista, títulos de bottom sheets

---

### Cuerpo de Texto

#### Body Large

```typescript
bodyLarge: {
  fontSize: 17,
  lineHeight: 26,
  fontFamily: 'OpenSans-Regular',
  letterSpacing: 0,
}
```

**Uso:** Texto principal en descripciones largas, contenido importante

#### Body (Default)

```typescript
body: {
  fontSize: 16,
  lineHeight: 24,
  fontFamily: 'OpenSans-Regular',
  letterSpacing: 0,
}
```

**Uso:** Texto general, descripciones, contenido estándar, nombres de archivos

#### Body Small

```typescript
bodySmall: {
  fontSize: 14,
  lineHeight: 20,
  fontFamily: 'OpenSans-Regular',
  letterSpacing: 0,
}
```

**Uso:** Texto secundario, información adicional, metadatos de archivos

---

### Textos Especializados

#### Label (Medium)

```typescript
label: {
  fontSize: 14,
  lineHeight: 20,
  fontFamily: 'OpenSans-SemiBold',
  letterSpacing: 0.1,
}
```

**Uso:** Labels de inputs, botones, tabs, categorías

#### Caption

```typescript
caption: {
  fontSize: 12,
  lineHeight: 16,
  fontFamily: 'OpenSans-Regular',
  letterSpacing: 0.2,
}
```

**Uso:** Timestamps, tamaños de archivo, metadatos, hints

#### Overline

```typescript
overline: {
  fontSize: 10,
  lineHeight: 14,
  fontFamily: 'OpenSans-SemiBold',
  letterSpacing: 1.5,
  textTransform: 'uppercase',
}
```

**Uso:** Badges, tags, estados (SINCRONIZADO, COMPARTIDO), secciones pequeñas

---

## 🎨 Estilos Especializados para Merett Cloud

### Nombre de Archivo

```typescript
fileName: {
  fontSize: 16,
  lineHeight: 22,
  fontFamily: 'OpenSans-SemiBold',
  letterSpacing: 0,
}
```

**Uso:** Nombres de archivos en listas y grids

### Tamaño de Archivo

```typescript
fileSize: {
  fontSize: 12,
  lineHeight: 16,
  fontFamily: 'OpenSans-Regular',
  letterSpacing: 0,
  color: colors.textSecondary,
}
```

**Uso:** Mostrar peso de archivos (ej: "2.5 MB")

### Fecha Modificación

```typescript
fileDate: {
  fontSize: 12,
  lineHeight: 16,
  fontFamily: 'OpenSans-Regular',
  letterSpacing: 0,
  color: colors.textSecondary,
}
```

**Uso:** Fechas de última modificación

### Path/Breadcrumb

```typescript
pathText: {
  fontSize: 14,
  lineHeight: 20,
  fontFamily: 'OpenSans-Regular',
  letterSpacing: 0,
  color: colors.textSecondary,
}
```

**Uso:** Rutas de navegación (ej: "Carpetas > Vacaciones > 2024")

### Badge de Estado

```typescript
statusBadge: {
  fontSize: 10,
  lineHeight: 14,
  fontFamily: 'OpenSans-Bold',
  letterSpacing: 0.5,
  textTransform: 'uppercase',
}
```

**Uso:** Estados de sincronización, compartir, etc.

### Botón Texto

```typescript
buttonText: {
  fontSize: 16,
  lineHeight: 24,
  fontFamily: 'OpenSans-SemiBold',
  letterSpacing: 0.5,
}
```

**Uso:** Texto dentro de botones principales

### Link

```typescript
link: {
  fontSize: 16,
  lineHeight: 24,
  fontFamily: 'OpenSans-Regular',
  letterSpacing: 0,
  textDecorationLine: 'underline',
  color: colors.primary,
}
```

**Uso:** Enlaces clickeables, acciones de texto

---

## 📐 Reglas de Line-Height

### Por Tamaño de Fuente

| Tamaño | Line-Height | Ratio | Uso                 |
| ------ | ----------- | ----- | ------------------- |
| 10px   | 14px        | 1.4   | Overlines, tags     |
| 12px   | 16px        | 1.33  | Captions, metadata  |
| 14px   | 20px        | 1.43  | Labels, small text  |
| 16px   | 24px        | 1.5   | Body text (default) |
| 17px   | 26px        | 1.53  | Body large          |
| 18px   | 24px        | 1.33  | H4, subtítulos      |
| 20px   | 28px        | 1.4   | H3                  |
| 24px   | 32px        | 1.33  | H2                  |
| 32px   | 40px        | 1.25  | H1                  |
| 40px   | 48px        | 1.2   | Display             |

**Regla general:** Line-height más amplio para textos pequeños (mejor legibilidad)

---

## 🔤 Letter Spacing

### Guidelines

| Tipo      | Spacing | Motivo                                |
| --------- | ------- | ------------------------------------- |
| Display   | -0.5px  | Reduce espacios en títulos grandes    |
| Headings  | -0.3px  | Compacta sin perder legibilidad       |
| Body      | 0px     | Natural, sin ajustes                  |
| Labels    | +0.1px  | Más aire entre letras pequeñas        |
| Captions  | +0.2px  | Mejora legibilidad en textos pequeños |
| Overlines | +1.5px  | Mayúsculas necesitan más espacio      |
| Buttons   | +0.5px  | Claridad en llamadas a la acción      |

---

## 🎭 Jerarquía Visual

### Niveles de Importancia

```
Nivel 1 (Más importante):
├─ Display / H1 (Bold, grande)
└─ Uso: Títulos principales de app

Nivel 2:
├─ H2 / H3 (SemiBold)
└─ Uso: Secciones, headers de modal

Nivel 3:
├─ Body Large / Body
└─ Uso: Contenido principal

Nivel 4:
├─ Body Small / Caption
└─ Uso: Información secundaria

Nivel 5 (Menos importante):
├─ Overline / Tags
└─ Uso: Metadatos, estados
```

---

## 💾 Implementación en Código

### Archivo: theme/typography.ts

```typescript
import { TextStyle } from 'react-native';

// Font families
export const fontFamilies = {
  regular: 'OpenSans-Regular',
  italic: 'OpenSans-Italic',
  semiBold: 'OpenSans-SemiBold',
  semiBoldItalic: 'OpenSans-SemiBoldItalic',
  bold: 'OpenSans-Bold',
  boldItalic: 'OpenSans-BoldItalic',
};

// Typography scale
export const typography = {
  // Display
  display: {
    fontSize: 40,
    lineHeight: 48,
    fontFamily: fontFamilies.bold,
    letterSpacing: -0.5,
  } as TextStyle,

  // Headings
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: fontFamilies.bold,
    letterSpacing: -0.5,
  } as TextStyle,

  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: fontFamilies.bold,
    letterSpacing: -0.3,
  } as TextStyle,

  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: fontFamilies.semiBold,
    letterSpacing: -0.2,
  } as TextStyle,

  h4: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fontFamilies.semiBold,
    letterSpacing: -0.1,
  } as TextStyle,

  // Body
  bodyLarge: {
    fontSize: 17,
    lineHeight: 26,
    fontFamily: fontFamilies.regular,
    letterSpacing: 0,
  } as TextStyle,

  body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamilies.regular,
    letterSpacing: 0,
  } as TextStyle,

  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilies.regular,
    letterSpacing: 0,
  } as TextStyle,

  // Specialized
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilies.semiBold,
    letterSpacing: 0.1,
  } as TextStyle,

  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontFamilies.regular,
    letterSpacing: 0.2,
  } as TextStyle,

  overline: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: fontFamilies.semiBold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  } as TextStyle,

  // File specific
  fileName: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: fontFamilies.semiBold,
    letterSpacing: 0,
  } as TextStyle,

  fileSize: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontFamilies.regular,
    letterSpacing: 0,
  } as TextStyle,

  fileDate: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontFamilies.regular,
    letterSpacing: 0,
  } as TextStyle,

  pathText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamilies.regular,
    letterSpacing: 0,
  } as TextStyle,

  statusBadge: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: fontFamilies.bold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  } as TextStyle,

  buttonText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamilies.semiBold,
    letterSpacing: 0.5,
  } as TextStyle,

  link: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fontFamilies.regular,
    letterSpacing: 0,
    textDecorationLine: 'underline',
  } as TextStyle,
};

// Helper to create text style with color
export const createTextStyle = (style: TextStyle, color: string): TextStyle => ({
  ...style,
  color,
});
```

---

## 🎨 Uso en Componentes

### Ejemplo 1: FileItem Component

```typescript
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

<View>
  <Text style={[typography.fileName, { color: colors.textPrimary }]}>
    Vacaciones2024.jpg
  </Text>
  <Text style={[typography.fileSize, { color: colors.textSecondary }]}>
    2.5 MB
  </Text>
  <Text style={[typography.fileDate, { color: colors.textSecondary }]}>
    Modificado hace 2 horas
  </Text>
</View>
```

### Ejemplo 2: Screen Header

```typescript
<View>
  <Text style={[typography.h1, { color: colors.textPrimary }]}>
    Mis Archivos
  </Text>
  <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
    342 archivos, 12 carpetas
  </Text>
</View>
```

### Ejemplo 3: Button

```typescript
<TouchableOpacity>
  <Text style={[typography.buttonText, { color: colors.white }]}>
    Subir Archivo
  </Text>
</TouchableOpacity>
```

---

## ♿ Accesibilidad

### Tamaños Dinámicos (iOS/Android)

Respetar preferencias de tamaño de texto del sistema:

```typescript
import { PixelRatio } from 'react-native';

const fontScale = PixelRatio.getFontScale();

// Aplicar escala a todos los tamaños
const scaledTypography = {
  h1: {
    ...typography.h1,
    fontSize: typography.h1.fontSize * fontScale,
  },
  // ... etc
};
```

### Contraste Mínimo

| Tamaño | Peso   | Contraste Mínimo |
| ------ | ------ | ---------------- |
| <18px  | Normal | 4.5:1 (AA)       |
| <18px  | Bold   | 3:1 (AA)         |
| ≥18px  | Normal | 3:1 (AA)         |
| ≥18px  | Bold   | 3:1 (AA)         |

### Truncamiento de Texto

```typescript
// Para nombres de archivo largos
<Text
  style={typography.fileName}
  numberOfLines={1}
  ellipsizeMode="middle" // "Vacacio...2024.jpg"
>
  {fileName}
</Text>

// Para descripciones
<Text
  style={typography.body}
  numberOfLines={3}
  ellipsizeMode="tail"
>
  {description}
</Text>
```

---

## ✅ Reglas de Uso

### DO ✅

- Usar estilos predefinidos de `typography`
- Combinar con colores de `colors` para consistencia
- Respetar jerarquía visual (H1 > H2 > Body > Caption)
- Usar `numberOfLines` para textos largos
- Aplicar letter-spacing en labels y tags
- Usar SemiBold para labels y nombres importantes

### DON'T ❌

- No definir fontSize/fontFamily inline sin usar el sistema
- No usar más de 3 niveles de jerarquía en una misma vista
- No mezclar pesos sin propósito (ej: Bold + Italic innecesario)
- No usar Italic como énfasis principal (usar SemiBold)
- No ignorar line-height (afecta legibilidad)
- No usar textTransform sin necesidad

---

## 📱 Responsive Typography

### Por Tamaño de Pantalla

```typescript
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Ajustar tamaño en pantallas pequeñas
const responsiveTypography = {
  h1: {
    ...typography.h1,
    fontSize: width < 375 ? 28 : typography.h1.fontSize, // iPhone SE
  },
};
```

### Por Plataforma

```typescript
import { Platform } from 'react-native';

const platformTypography = {
  body: {
    ...typography.body,
    fontSize: Platform.select({
      ios: 16,
      android: 15, // Android suele verse más grande
      web: 16,
    }),
  },
};
```

---

## 🧪 Testing

### Checklist de Tipografía

- [ ] ¿El texto es legible en ambos temas (light/dark)?
- [ ] ¿El contraste cumple WCAG AA (mínimo 4.5:1)?
- [ ] ¿Los nombres de archivo largos se truncan correctamente?
- [ ] ¿Los labels tienen suficiente letter-spacing?
- [ ] ¿La jerarquía es clara sin leer el código?
- [ ] ¿Funciona con tamaños de texto grandes del sistema?

---

## 📚 Referencias

- [Apple Human Interface Guidelines - Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- [Material Design - Type Scale](https://m3.material.io/styles/typography/type-scale-tokens)
- [WCAG 2.1 - Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum)
- [OpenSans on Google Fonts](https://fonts.google.com/specimen/Open+Sans)

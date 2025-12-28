# 🎨 Sistema de Diseño

> Guía completa de diseño visual y UX para el proyecto

---

## 🎯 Propósito

Este documento establece las reglas de diseño que garantizan consistencia visual en toda la aplicación. **Todos los desarrolladores y agentes de IA DEBEN seguir estas guías.**

---

## 🤖 Reglas para Agentes de IA

### OBLIGATORIO

```
✅ SIEMPRE usar colores del tema definido
✅ SIEMPRE seguir el sistema de espaciado
✅ SIEMPRE verificar si un componente ya existe antes de crear uno nuevo
✅ SIEMPRE usar la tipografía definida
✅ SIEMPRE seguir los patrones de componentes establecidos
```

### PROHIBIDO

```
❌ NUNCA inventar colores fuera de la paleta
❌ NUNCA usar valores de espaciado arbitrarios
❌ NUNCA duplicar componentes existentes
❌ NUNCA usar fuentes no definidas
❌ NUNCA ignorar estados de accesibilidad
```

---

## 🎨 Paleta de Colores

> Ver archivo detallado: `colors.md`

### Colores Primarios

| Nombre      | Light Mode | Dark Mode | Uso                        |
| ----------- | ---------- | --------- | -------------------------- |
| `primary`   | #[hex]     | #[hex]    | Acciones principales, CTAs |
| `secondary` | #[hex]     | #[hex]    | Acciones secundarias       |
| `accent`    | #[hex]     | #[hex]    | Destacados, badges         |

### Colores de Fondo

| Nombre       | Light Mode | Dark Mode | Uso                |
| ------------ | ---------- | --------- | ------------------ |
| `background` | #[hex]     | #[hex]    | Fondo principal    |
| `surface`    | #[hex]     | #[hex]    | Cards, modals      |
| `elevated`   | #[hex]     | #[hex]    | Elementos elevados |

### Colores de Texto

| Nombre           | Light Mode | Dark Mode | Uso                 |
| ---------------- | ---------- | --------- | ------------------- |
| `text-primary`   | #[hex]     | #[hex]    | Texto principal     |
| `text-secondary` | #[hex]     | #[hex]    | Texto secundario    |
| `text-disabled`  | #[hex]     | #[hex]    | Texto deshabilitado |
| `text-inverse`   | #[hex]     | #[hex]    | Texto sobre color   |

### Colores Semánticos

| Nombre    | Valor  | Uso                 |
| --------- | ------ | ------------------- |
| `success` | #[hex] | Éxito, confirmación |
| `warning` | #[hex] | Advertencias        |
| `error`   | #[hex] | Errores             |
| `info`    | #[hex] | Información         |

### Implementación

```typescript
// ✅ Correcto: Usar colores del tema
import { colors } from '@/theme/colors';
<View style={{ backgroundColor: colors.background }} />

// ❌ Incorrecto: Hardcodear colores
<View style={{ backgroundColor: '#FFFFFF' }} />
```

---

## 📝 Tipografía

> Ver archivo detallado: `typography.md`

### Familia de Fuentes

| Nombre     | Peso | Uso                |
| ---------- | ---- | ------------------ |
| `regular`  | 400  | Texto general      |
| `medium`   | 500  | Énfasis ligero     |
| `semibold` | 600  | Subtítulos, labels |
| `bold`     | 700  | Títulos, CTAs      |

### Escala Tipográfica

| Nombre       | Tamaño | Line Height | Uso                 |
| ------------ | ------ | ----------- | ------------------- |
| `h1`         | 32px   | 40px        | Títulos principales |
| `h2`         | 24px   | 32px        | Títulos de sección  |
| `h3`         | 20px   | 28px        | Subtítulos          |
| `h4`         | 18px   | 24px        | Headers de card     |
| `body`       | 16px   | 24px        | Texto general       |
| `body-small` | 14px   | 20px        | Texto secundario    |
| `caption`    | 12px   | 16px        | Labels, metadata    |
| `tiny`       | 10px   | 14px        | Badges, tags        |

### Implementación

```typescript
// ✅ Correcto: Usar estilos de tipografía
import { fonts } from '@/theme/fonts';
<Text style={fonts.h1}>Título</Text>

// ❌ Incorrecto: Definir estilos inline
<Text style={{ fontSize: 32, fontWeight: 'bold' }}>Título</Text>
```

---

## 📐 Sistema de Espaciado

> Ver archivo detallado: `spacing.md`

### Escala de Espaciado

Usar múltiplos de 4px (base-4 system):

| Token | Valor | Uso                    |
| ----- | ----- | ---------------------- |
| `xs`  | 4px   | Espaciado mínimo       |
| `sm`  | 8px   | Espaciado pequeño      |
| `md`  | 16px  | Espaciado estándar     |
| `lg`  | 24px  | Espaciado grande       |
| `xl`  | 32px  | Espaciado extra grande |
| `2xl` | 48px  | Secciones              |
| `3xl` | 64px  | Separadores mayores    |

### Reglas de Aplicación

```
Padding interno de cards:     md (16px)
Margen entre elementos:       sm (8px)
Margen entre secciones:       lg (24px)
Padding de pantalla:          md (16px)
Gap en listas:                sm (8px)
```

### Implementación

```typescript
// ✅ Correcto: Usar tokens de espaciado
import { spacing } from '@/theme/spacing';
<View style={{ padding: spacing.md, marginBottom: spacing.lg }} />

// ❌ Incorrecto: Valores arbitrarios
<View style={{ padding: 15, marginBottom: 25 }} />
```

---

## 🔲 Bordes y Esquinas

### Border Radius

| Token  | Valor  | Uso                 |
| ------ | ------ | ------------------- |
| `none` | 0px    | Sin redondeo        |
| `sm`   | 4px    | Inputs, chips       |
| `md`   | 8px    | Cards, buttons      |
| `lg`   | 16px   | Modals, sheets      |
| `xl`   | 24px   | Imágenes destacadas |
| `full` | 9999px | Avatares, badges    |

### Border Width

| Token    | Valor | Uso                 |
| -------- | ----- | ------------------- |
| `thin`   | 1px   | Separadores, inputs |
| `medium` | 2px   | Énfasis             |
| `thick`  | 4px   | Bordes activos      |

---

## 🌑 Sombras y Elevación

### Niveles de Elevación

| Nivel | Uso              | Sombra      |
| ----- | ---------------- | ----------- |
| `0`   | Elementos base   | Sin sombra  |
| `1`   | Cards, inputs    | Sutil       |
| `2`   | Dropdowns, menus | Media       |
| `3`   | Modals, dialogs  | Pronunciada |
| `4`   | Floating buttons | Máxima      |

### Implementación

```typescript
// Usar estilos de elevación predefinidos
import { shadows } from '@/theme/shadows';
<View style={shadows.elevation2} />
```

---

## 🧩 Componentes UI

> Ver catálogo completo: `components.md`

### Componentes Base Disponibles

Antes de crear un componente, verificar si ya existe:

| Componente | Ubicación                    | Variantes                         |
| ---------- | ---------------------------- | --------------------------------- |
| Button     | `components/elements/Button` | primary, secondary, ghost, danger |
| Input      | `components/elements/Input`  | text, password, search            |
| Image      | `components/elements/Image`  | standard, avatar, thumbnail       |
| Card       | `components/elements/Card`   | default, elevated, outlined       |
| Modal      | `components/elements/Modal`  | bottom-sheet, center, fullscreen  |

### Patrones de Componentes

#### Estructura de Props

```typescript
interface ComponentProps {
  // Requeridas primero
  title: string;
  onPress: () => void;

  // Opcionales después
  subtitle?: string;
  disabled?: boolean;

  // Estilos al final
  style?: ViewStyle;
  testID?: string;
}
```

#### Estados del Componente

Todo componente interactivo debe manejar:

- `default` - Estado normal
- `hover` - Mouse sobre (web)
- `pressed` - Presionado
- `focused` - Con foco (accesibilidad)
- `disabled` - Deshabilitado
- `loading` - Cargando (si aplica)
- `error` - Estado de error (si aplica)

---

## 📱 Diseño Responsivo

### Breakpoints

| Nombre    | Min Width | Dispositivo   |
| --------- | --------- | ------------- |
| `mobile`  | 0px       | Teléfonos     |
| `tablet`  | 768px     | Tablets       |
| `desktop` | 1024px    | Desktop (web) |

### Reglas de Adaptación

```
Mobile:
- Layout de una columna
- Navegación bottom tabs
- Touch targets mínimo 44x44px

Tablet:
- Layout de dos columnas donde aplique
- Navegación lateral posible
- Más contenido visible

Desktop (web):
- Layout multi-columna
- Navegación lateral fija
- Hover states
```

---

## ♿ Accesibilidad

### Requisitos Mínimos

- **Contraste**: Mínimo 4.5:1 para texto normal, 3:1 para texto grande
- **Touch targets**: Mínimo 44x44 puntos
- **Labels**: Todos los inputs deben tener labels
- **Alt text**: Todas las imágenes significativas
- **Focus indicators**: Visibles para navegación con teclado

### Implementación

```typescript
// ✅ Correcto: Incluir props de accesibilidad
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Subir archivo"
  accessibilityRole="button"
  accessibilityHint="Abre el selector de archivos"
>
  <Icon name="upload" />
</TouchableOpacity>

// ❌ Incorrecto: Sin información de accesibilidad
<TouchableOpacity>
  <Icon name="upload" />
</TouchableOpacity>
```

---

## 🎬 Animaciones

> Ver archivo detallado: `animations.md`

### Duraciones

| Token     | Valor | Uso                   |
| --------- | ----- | --------------------- |
| `instant` | 100ms | Micro-interacciones   |
| `fast`    | 200ms | Transiciones simples  |
| `normal`  | 300ms | Transiciones estándar |
| `slow`    | 500ms | Animaciones complejas |

### Curvas de Animación

| Nombre      | Uso                    |
| ----------- | ---------------------- |
| `easeIn`    | Elementos que salen    |
| `easeOut`   | Elementos que entran   |
| `easeInOut` | Transiciones completas |
| `spring`    | Interacciones táctiles |

### Principios

1. **Propósito**: Toda animación debe tener un propósito funcional
2. **Sutileza**: Preferir animaciones sutiles sobre llamativas
3. **Performance**: No animar propiedades costosas (layout)
4. **Reducción de movimiento**: Respetar preferencias del sistema

---

## 🖼️ Iconografía

> Ver archivo detallado: `icons.md`

### Fuente de Iconos

Usar: [Especificar librería de iconos del proyecto]

### Tamaños de Iconos

| Token | Valor | Uso              |
| ----- | ----- | ---------------- |
| `xs`  | 16px  | Inline con texto |
| `sm`  | 20px  | Botones pequeños |
| `md`  | 24px  | Estándar         |
| `lg`  | 32px  | Navegación       |
| `xl`  | 48px  | Estados vacíos   |

### Colores de Iconos

Los iconos heredan el color del texto o usan colores semánticos:

```typescript
// Hereda color del texto
<Icon name="home" color={colors.textPrimary} />

// Color de acción
<Icon name="add" color={colors.primary} />

// Color de estado
<Icon name="check" color={colors.success} />
```

---

## 📋 Checklist para Nuevos Componentes

Antes de crear un componente, verificar:

- [ ] ¿Ya existe un componente similar? → Usar o extender existente
- [ ] ¿Sigue la paleta de colores? → Solo colores del tema
- [ ] ¿Usa el sistema de espaciado? → Solo tokens de spacing
- [ ] ¿Usa la tipografía correcta? → Solo estilos de fonts
- [ ] ¿Maneja todos los estados? → default, pressed, disabled, etc.
- [ ] ¿Es accesible? → Labels, contraste, touch targets
- [ ] ¿Está documentado? → Agregar a `components.md`
- [ ] ¿Tiene tests? → Crear tests básicos

---

## 🔗 Archivos Relacionados

- `colors.md` - Paleta completa de colores
- `typography.md` - Sistema tipográfico completo
- `spacing.md` - Sistema de espaciado
- `components.md` - Catálogo de componentes
- `icons.md` - Guía de iconografía
- `animations.md` - Sistema de animaciones
- `screens/` - Especificaciones por pantalla (opcional)

---

## 📚 Recursos

- [Material Design Guidelines](https://material.io/design)
- [Human Interface Guidelines (Apple)](https://developer.apple.com/design/human-interface-guidelines/)
- [Figma del proyecto] (si existe)

# 🎬 Sistema de Animaciones - Merett Cloud

> Micro-interacciones sutiles y fluidas inspiradas en iOS y Notion

---

## 🎯 Filosofía de Animación

- **Sutileza sobre espectacularidad**: Animaciones que mejoran, no distraen
- **Velocidad**: Animaciones rápidas para sensación de app ágil
- **Propósito funcional**: Toda animación guía o confirma una acción
- **Respeto por preferencias**: Reducir movimiento cuando el usuario lo solicite

---

## ⏱️ Duraciones (Timing)

### Escala de Duraciones

| Token     | Valor | Uso                                     |
| --------- | ----- | --------------------------------------- |
| `instant` | 100ms | Micro-interacciones, hover, press       |
| `fast`    | 200ms | Transiciones simples, modals, tooltips  |
| `normal`  | 300ms | **Estándar** - Navegación, sheets       |
| `slow`    | 400ms | Animaciones complejas, transformaciones |
| `slower`  | 600ms | Animaciones de estado, grandes cambios  |

### Por Tipo de Interacción

| Interacción         | Duración | Razón                             |
| ------------------- | -------- | --------------------------------- |
| Button press        | 100ms    | Feedback instantáneo              |
| Hover (web)         | 100ms    | Respuesta rápida                  |
| Tooltip aparece     | 200ms    | Visible sin espera                |
| Modal open/close    | 300ms    | Transición suave                  |
| Bottom sheet slide  | 300ms    | Movimiento natural                |
| Screen transition   | 300ms    | Cambio de contexto                |
| Swipe action reveal | 200ms    | Feedback inmediato                |
| Pull to refresh     | 400ms    | Indicación clara de acción        |
| Upload progress     | N/A      | Continuo, basado en progreso real |
| Photo grid load     | 300ms    | Aparición gradual                 |

---

## 🌊 Curvas de Animación (Easing)

### Curvas Disponibles

| Curva       | Uso                            | Sensación           |
| ----------- | ------------------------------ | ------------------- |
| `linear`    | Progreso, loading bars         | Mecánico, constante |
| `easeOut`   | **Elementos que entran**       | Natural, suave      |
| `easeIn`    | Elementos que salen            | Aceleración final   |
| `easeInOut` | Transiciones completas (modal) | Balanceado          |
| `spring`    | Touch interactions, botones    | iOS-style, elástico |

### Curvas Específicas (iOS-style)

```typescript
// React Native Reanimated
import { Easing } from 'react-native-reanimated';

export const easings = {
  // Apple-style easing
  appleEaseOut: Easing.bezier(0.25, 0.1, 0.25, 1),
  appleEaseInOut: Easing.bezier(0.42, 0, 0.58, 1),

  // Quick interactions
  quickEaseOut: Easing.out(Easing.cubic),
  quickEaseIn: Easing.in(Easing.cubic),

  // Smooth transitions
  smoothEaseOut: Easing.out(Easing.quad),
  smoothEaseInOut: Easing.inOut(Easing.quad),

  // Spring (for touch)
  spring: Easing.elastic(1),
};
```

---

## 🎨 Animaciones por Categoría

### 1. Feedback de Touch

#### Button Press

```typescript
// Escala sutil al presionar
<Animated.View
  style={{
    transform: [{ scale: isPressed ? 0.95 : 1 }],
  }}
>
  <Button />
</Animated.View>

// Config:
duration: 100ms
easing: spring
scale: 0.95 (5% reducción)
```

#### Ripple Effect (Android-style)

```typescript
// Para dar feedback visual
<TouchableRipple
  rippleColor="rgba(124, 58, 237, 0.12)"
  duration={300}
>
  <Content />
</TouchableRipple>
```

### 2. Navegación y Screens

#### Screen Transitions

```typescript
// Slide from right (iOS-style)
{
  animation: 'slide_from_right',
  duration: 300ms,
  easing: appleEaseOut,
}

// Fade in (para modals)
{
  animation: 'fade',
  duration: 200ms,
  easing: smoothEaseOut,
}

// Slide from bottom (bottom sheets)
{
  animation: 'slide_from_bottom',
  duration: 300ms,
  easing: appleEaseInOut,
}
```

#### Tab Transitions

```typescript
// Sin animación para tabs (más rápido)
// O fade muy sutil
{
  animation: 'fade',
  duration: 100ms,
  easing: linear,
}
```

### 3. Modals y Overlays

#### Bottom Sheet

```typescript
// Slide up con backdrop fade
{
  sheet: {
    animation: 'slide_from_bottom',
    duration: 300ms,
    easing: appleEaseOut,
  },
  backdrop: {
    animation: 'fade',
    duration: 200ms,
    easing: linear,
  }
}
```

#### Modal Center

```typescript
// Scale + fade combo (iOS Alert style)
{
  scale: {
    from: 1.1,
    to: 1.0,
    duration: 300ms,
    easing: appleEaseOut,
  },
  opacity: {
    from: 0,
    to: 1,
    duration: 200ms,
  }
}
```

### 4. Listas y Contenido

#### Lista Aparece (FlatList)

```typescript
// Stagger animation - items aparecen uno tras otro
items.map((item, index) => ({
  delay: index * 50ms,  // 50ms entre items
  duration: 200ms,
  animation: 'fade_slide_up',
  easing: smoothEaseOut,
}))

// Máximo delay: 400ms (para evitar esperas largas)
```

#### Pull to Refresh

```typescript
{
  indicator: {
    rotation: 'continuous',  // Spinner gira
    duration: 1000ms,
    easing: linear,
  },
  pullDistance: {
    threshold: 80,  // px para activar
    resistance: 0.5,  // Resistencia del pull
  }
}
```

#### Infinite Scroll Loading

```typescript
// Spinner simple al final de lista
{
  animation: 'fade',
  duration: 200ms,
  easing: linear,
}
```

### 5. Photo Grid y Multimedia

#### Photo Grid Load (Stagger)

```typescript
// Thumbnails cargan con efecto stagger
photos.map((photo, index) => ({
  delay: Math.min(index * 30ms, 300ms),  // Max 300ms delay
  animation: 'fade',
  duration: 200ms,
  easing: smoothEaseOut,
}))
```

#### Image Zoom (Pinch)

```typescript
{
  scale: {
    min: 1,
    max: 4,
    gesture: 'pinch',
    easing: linear,  // Responde directamente al gesto
  }
}
```

#### Image Lightbox Open

```typescript
// Expand from thumbnail to fullscreen
{
  scale: {
    from: thumbnailSize,
    to: screenSize,
    duration: 300ms,
    easing: appleEaseOut,
  },
  position: {
    from: thumbnailPosition,
    to: centerScreen,
    duration: 300ms,
    easing: appleEaseOut,
  },
  backdrop: {
    opacity: 0 -> 1,
    duration: 200ms,
  }
}
```

### 6. Upload y Progress

#### Upload Progress Bar

```typescript
{
  width: {
    from: 0%,
    to: progress%,
    duration: linear,  // Basado en progreso real
    easing: linear,
  }
}
```

#### Upload Success (Checkmark)

```typescript
// Aparece checkmark con scale + fade
{
  scale: {
    from: 0,
    to: 1,
    duration: 300ms,
    easing: spring,
  },
  opacity: {
    from: 0,
    to: 1,
    duration: 200ms,
  }
}
```

#### Upload Error (Shake)

```typescript
// Shake horizontal sutil
{
  translateX: [0, -10, 10, -10, 10, -5, 5, 0],
  duration: 400ms,
  easing: linear,
}
```

### 7. Swipe Actions

#### Swipe to Delete/Edit

```typescript
{
  reveal: {
    translateX: 0 -> -80,  // Revela 80px de acciones
    duration: 200ms,
    easing: smoothEaseOut,
  },
  action: {
    opacity: 0 -> 1,
    duration: 100ms,
    delay: 50ms,  // Aparece después del swipe
  }
}
```

#### Delete Animation

```typescript
// Item se desvanece y colapsa
{
  opacity: {
    from: 1,
    to: 0,
    duration: 200ms,
  },
  height: {
    from: itemHeight,
    to: 0,
    duration: 300ms,
    easing: appleEaseInOut,
  }
}
```

### 8. Estados y Feedback

#### Loading Spinner

```typescript
{
  rotation: {
    from: 0deg,
    to: 360deg,
    duration: 1000ms,
    easing: linear,
    repeat: infinite,
  }
}
```

#### Success Toast

```typescript
// Slide in from top + auto dismiss
{
  slideIn: {
    translateY: -100 -> 0,
    duration: 300ms,
    easing: appleEaseOut,
  },
  stay: {
    duration: 3000ms,
  },
  slideOut: {
    translateY: 0 -> -100,
    duration: 200ms,
    easing: appleEaseIn,
  }
}
```

#### Skeleton Loading

```typescript
// Shimmer effect
{
  translateX: {
    from: -100%,
    to: 100%,
    duration: 1500ms,
    easing: linear,
    repeat: infinite,
  },
  gradient: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
}
```

### 9. FAB (Floating Action Button)

#### FAB Scroll Behavior

```typescript
// Se oculta al scroll down, aparece al scroll up
{
  scale: scrollingDown ? 0 : 1,
  opacity: scrollingDown ? 0 : 1,
  duration: 200ms,
  easing: quickEaseOut,
}
```

#### FAB Menu Expand

```typescript
// Sub-actions aparecen con stagger
subActions.map((action, index) => ({
  translateY: {
    from: 0,
    to: -(56 + spacing) * (index + 1),  // 56px = FAB size
    duration: 200ms,
    delay: index * 50ms,
    easing: appleEaseOut,
  },
  scale: {
    from: 0,
    to: 1,
    duration: 200ms,
    delay: index * 50ms,
  }
}))
```

---

## 💾 Implementación en Código

### Archivo: theme/animations.ts

```typescript
import { Easing } from 'react-native-reanimated';

// Duraciones
export const durations = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 400,
  slower: 600,
} as const;

// Easings personalizados
export const easings = {
  // Apple-style
  appleEaseOut: Easing.bezier(0.25, 0.1, 0.25, 1),
  appleEaseInOut: Easing.bezier(0.42, 0, 0.58, 1),

  // Quick
  quickEaseOut: Easing.out(Easing.cubic),
  quickEaseIn: Easing.in(Easing.cubic),

  // Smooth
  smoothEaseOut: Easing.out(Easing.quad),
  smoothEaseInOut: Easing.inOut(Easing.quad),

  // Spring
  spring: Easing.elastic(1),

  // Linear
  linear: Easing.linear,
} as const;

// Configuraciones predefinidas
export const animations = {
  // Button press
  buttonPress: {
    duration: durations.instant,
    easing: easings.spring,
    scale: 0.95,
  },

  // Screen transitions
  screenSlide: {
    duration: durations.normal,
    easing: easings.appleEaseOut,
  },

  // Modal
  modalFade: {
    duration: durations.fast,
    easing: easings.smoothEaseOut,
  },

  // Bottom sheet
  bottomSheet: {
    duration: durations.normal,
    easing: easings.appleEaseInOut,
  },

  // List items
  listItemFade: {
    duration: durations.fast,
    easing: easings.smoothEaseOut,
    staggerDelay: 50,
  },

  // Toast
  toast: {
    slideIn: {
      duration: durations.normal,
      easing: easings.appleEaseOut,
    },
    slideOut: {
      duration: durations.fast,
      easing: easings.appleEaseIn,
    },
    stayDuration: 3000,
  },

  // Swipe action
  swipeAction: {
    duration: durations.fast,
    easing: easings.smoothEaseOut,
    revealDistance: 80,
  },

  // Delete item
  deleteItem: {
    fade: {
      duration: durations.fast,
      easing: easings.linear,
    },
    collapse: {
      duration: durations.normal,
      easing: easings.appleEaseInOut,
    },
  },
} as const;

// Spring configs (React Native Reanimated)
export const springConfigs = {
  // Gentle spring (default)
  gentle: {
    damping: 20,
    mass: 1,
    stiffness: 200,
  },

  // Bouncy spring (iOS-style)
  bouncy: {
    damping: 15,
    mass: 1,
    stiffness: 300,
  },

  // Stiff spring (quick, less bounce)
  stiff: {
    damping: 25,
    mass: 1,
    stiffness: 400,
  },
} as const;
```

### Helper: useButtonAnimation

```typescript
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { animations, springConfigs } from '@/theme/animations';

export function useButtonAnimation() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(animations.buttonPress.scale, springConfigs.gentle);
  };

  const onPressOut = () => {
    scale.value = withSpring(1, springConfigs.gentle);
  };

  return {
    animatedStyle,
    onPressIn,
    onPressOut,
  };
}
```

### Helper: useListAnimation

```typescript
import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { animations, easings } from '@/theme/animations';

export function useListAnimation(index: number, maxDelay: number = 300) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    const delay = Math.min(index * animations.listItemFade.staggerDelay, maxDelay);

    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: animations.listItemFade.duration,
        easing: easings.smoothEaseOut,
      }),
    );

    translateY.value = withDelay(
      delay,
      withTiming(0, {
        duration: animations.listItemFade.duration,
        easing: easings.smoothEaseOut,
      }),
    );
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return animatedStyle;
}
```

---

## ♿ Reducción de Movimiento

### Respeto por Preferencias del Usuario

```typescript
import { AccessibilityInfo } from 'react-native';

export async function shouldReduceMotion(): Promise<boolean> {
  // iOS y Android soportan esto
  const isReduceMotionEnabled = await AccessibilityInfo.isReduceMotionEnabled();
  return isReduceMotionEnabled;
}

// Aplicar en animaciones
export function getAnimationConfig(baseConfig: any) {
  const reduceMotion = await shouldReduceMotion();

  if (reduceMotion) {
    return {
      ...baseConfig,
      duration: 0, // Sin animación
      // O duration muy corta si es necesaria
      duration: 50,
    };
  }

  return baseConfig;
}
```

---

## ✅ Reglas de Uso

### DO ✅

- Usar duraciones del sistema (`durations`)
- Aplicar easings apropiados según contexto
- Reducir animaciones cuando el usuario lo requiera
- Usar spring para touch interactions
- Mantener animaciones sutiles (scale 0.95, no 0.5)
- Stagger con límite de delay (max 300-400ms)
- Animar transform y opacity (mejor performance)

### DON'T ❌

- No animar propiedades costosas (width, height, position absoluto)
- No hacer animaciones muy lentas (>600ms para interacciones)
- No ignorar preferencias de reducción de movimiento
- No usar demasiadas animaciones simultáneas
- No hacer animaciones que distraigan del contenido
- No usar bounce exagerado (muy Android 4.0)

---

## ⚡ Performance

### Propiedades Optimizadas

| ✅ Rápido (GPU) | ❌ Lento (CPU) |
| --------------- | -------------- |
| `transform`     | `width`        |
| `opacity`       | `height`       |
| `scale`         | `top`, `left`  |
| `translateX/Y`  | `margin`       |
| `rotate`        | `padding`      |

### Layout Animation (React Native)

```typescript
import { LayoutAnimation, UIManager, Platform } from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// Usar para cambios de layout automáticos
LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
setState(newState); // Layout se anima automáticamente
```

---

## 🎨 Ejemplos Visuales

### Button Press Animation

```typescript
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

function AnimatedButton({ onPress, children }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.95);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        onPress={onPress}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
```

### Photo Grid Stagger

```typescript
function PhotoGrid({ photos }) {
  return (
    <View style={styles.grid}>
      {photos.map((photo, index) => (
        <PhotoItem
          key={photo.id}
          photo={photo}
          index={index}
        />
      ))}
    </View>
  );
}

function PhotoItem({ photo, index }) {
  const animatedStyle = useListAnimation(index, 300);

  return (
    <Animated.View style={[styles.photo, animatedStyle]}>
      <Image source={{ uri: photo.url }} />
    </Animated.View>
  );
}
```

---

## 📚 Referencias

- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Apple Motion Guidelines](https://developer.apple.com/design/human-interface-guidelines/motion)
- [Material Motion](https://m3.material.io/styles/motion/overview)
- [Framer Motion (conceptos)](https://www.framer.com/motion/)
- [Lottie for React Native](https://github.com/lottie-react-native/lottie-react-native)

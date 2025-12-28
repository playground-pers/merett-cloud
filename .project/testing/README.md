# 🧪 Testing y QA

> Estrategia de testing, casos de prueba y seguimiento de calidad

---

## 🎯 Propósito

Este directorio contiene la documentación relacionada con testing y calidad del software:

- Estrategia de testing del proyecto
- Casos de prueba
- Requisitos de cobertura
- Seguimiento de bugs

---

## 📁 Estructura de Archivos

| Archivo | Descripción |
|---------|-------------|
| `README.md` | Este archivo - Estrategia general |
| `test-cases.md` | Casos de prueba por feature |
| `coverage.md` | Requisitos y métricas de cobertura |
| `bugs.md` | Registro y seguimiento de bugs |

---

## 🧪 Estrategia de Testing

### Pirámide de Tests

```
                    /\
                   /  \
                  / E2E \         ← Pocos (lentos, costosos)
                 /──────\
                /  INT   \        ← Moderados
               /──────────\
              /    UNIT    \      ← Muchos (rápidos, económicos)
             /──────────────\
```

### Tipos de Tests

| Tipo | Descripción | Cobertura Objetivo | Herramienta |
|------|-------------|-------------------|-------------|
| **Unit** | Funciones y componentes aislados | 70%+ | Jest |
| **Integration** | Interacción entre módulos | 50%+ | Jest + RTL |
| **E2E** | Flujos completos de usuario | Críticos | Detox / Maestro |
| **Snapshot** | Regresiones visuales | Componentes UI | Jest |

---

## 📋 Qué Testear

### DEBE tener tests

- ✅ Lógica de negocio (services)
- ✅ Reducers y slices (estado)
- ✅ Utilidades y helpers
- ✅ Componentes con lógica
- ✅ Validaciones de formularios
- ✅ Transformaciones de datos

### PUEDE tener tests

- 🟡 Componentes puramente visuales
- 🟡 Estilos y layouts
- 🟡 Configuraciones

### NO testear

- ❌ Librerías de terceros
- ❌ Código generado automáticamente
- ❌ Constantes estáticas

---

## 📝 Convenciones de Testing

### Nomenclatura de Archivos

```
ComponentName.tsx       → ComponentName.test.tsx
serviceName.ts          → serviceName.test.ts
utils/helper.ts         → utils/helper.test.ts
```

### Ubicación de Tests

```
components/
  elements/
    Button/
      Button.tsx
      Button.test.tsx    ← Junto al componente
      index.ts

services/
  auth.service.ts
  auth.service.test.ts   ← Junto al servicio
```

### Estructura de Test

```typescript
describe('ComponentName', () => {
  // Setup común
  beforeEach(() => {
    // Configuración
  });

  describe('cuando [condición]', () => {
    it('debería [comportamiento esperado]', () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('render', () => {
    it('debería renderizar correctamente', () => {
      // Test de render básico
    });
  });

  describe('interacciones', () => {
    it('debería manejar click correctamente', () => {
      // Test de interacción
    });
  });
});
```

### Naming de Tests

```typescript
// ✅ Bueno: Descriptivo y claro
it('debería mostrar mensaje de error cuando el email es inválido', () => {})
it('debería llamar onSubmit con los datos del formulario', () => {})

// ❌ Malo: Vago o técnico
it('works', () => {})
it('test 1', () => {})
it('handles the thing', () => {})
```

---

## 🎯 Requisitos de Cobertura

### Mínimos por Tipo

| Métrica | Mínimo | Objetivo |
|---------|--------|----------|
| **Statements** | 60% | 80% |
| **Branches** | 50% | 70% |
| **Functions** | 60% | 80% |
| **Lines** | 60% | 80% |

### Por Directorio

| Directorio | Cobertura Mínima |
|------------|------------------|
| `services/` | 80% |
| `slices/` | 80% |
| `utils/` | 70% |
| `components/elements/` | 60% |
| `components/layouts/` | 50% |
| `scenes/` | 40% |

---

## 🐛 Gestión de Bugs

### Severidad

| Nivel | Emoji | Descripción | SLA |
|-------|-------|-------------|-----|
| **Crítico** | 🔴 | App crashea, pérdida de datos | 24h |
| **Mayor** | 🟠 | Feature principal no funciona | 72h |
| **Menor** | 🟡 | Feature secundaria afectada | Sprint |
| **Trivial** | 🟢 | Cosmético, mejora | Backlog |

### Template de Bug

```markdown
## BUG-XXX: [Título descriptivo]

### Información
- **Severidad**: 🔴/🟠/🟡/🟢
- **Reportado**: YYYY-MM-DD
- **Reportado por**: @nombre
- **Estado**: Abierto / En Progreso / Resuelto
- **Asignado**: @nombre

### Ambiente
- **Plataforma**: iOS / Android / Web
- **Versión App**: X.X.X
- **Dispositivo**: [Modelo]
- **OS Version**: [Versión]

### Descripción
[Descripción clara del bug]

### Pasos para Reproducir
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

### Comportamiento Esperado
[Qué debería pasar]

### Comportamiento Actual
[Qué está pasando]

### Screenshots / Videos
[Adjuntar evidencia si aplica]

### Logs
```
[Logs relevantes]
```

### Información Adicional
[Cualquier contexto adicional]

### Resolución
- **Fix**: [Descripción del fix]
- **PR**: #XXX
- **Fecha resolución**: YYYY-MM-DD
```

---

## 🔄 Flujo de QA

### Pre-Merge

```
[Desarrollo]
    ↓
[Tests Unitarios] → ❌ Fix y re-test
    ↓ ✅
[Tests de Integración] → ❌ Fix y re-test
    ↓ ✅
[Code Review]
    ↓ ✅
[Merge]
```

### Post-Merge

```
[CI Build]
    ↓
[Tests Automatizados]
    ↓ ✅
[Deploy a Staging]
    ↓
[QA Manual] → 🐛 Reportar bugs
    ↓ ✅
[Deploy a Production]
```

---

## 📊 Casos de Prueba

Ver archivo detallado: `test-cases.md`

### Estructura de Test Cases

```markdown
## Feature: [Nombre de la feature]

### TC-XXX: [Título del caso]

**Precondiciones:**
- [Condición 1]
- [Condición 2]

**Pasos:**
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

**Resultado Esperado:**
- [Resultado 1]
- [Resultado 2]

**Datos de Prueba:**
- [Dato 1]
- [Dato 2]

**Prioridad:** Alta / Media / Baja
**Tipo:** Funcional / Regresión / Smoke
```

---

## 🤖 Guía para Agentes de IA

### Al Crear Código

1. **SIEMPRE** crear tests para:
   - Nuevos services
   - Nuevos slices/reducers
   - Componentes con lógica
   - Utilidades

2. **Verificar** que los tests existentes siguen pasando

3. **Seguir** las convenciones de naming y estructura

### Al Crear Tests

```typescript
// 1. Importar dependencias de testing
import { render, screen, fireEvent } from '@testing-library/react-native';

// 2. Importar el componente/función a testear
import { Button } from './Button';

// 3. Mockear dependencias externas si es necesario
jest.mock('@/services/api', () => ({
  fetchData: jest.fn(),
}));

// 4. Escribir tests descriptivos
describe('Button', () => {
  it('debería renderizar el texto correctamente', () => {
    render(<Button title="Click me" onPress={() => {}} />);
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('debería llamar onPress al hacer tap', () => {
    const onPressMock = jest.fn();
    render(<Button title="Click" onPress={onPressMock} />);
    
    fireEvent.press(screen.getByText('Click'));
    
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
```

### Checklist de Testing

Antes de marcar una tarea como completada:

- [ ] Tests unitarios creados para lógica nueva
- [ ] Tests existentes siguen pasando
- [ ] Cobertura no disminuyó
- [ ] Tests tienen nombres descriptivos
- [ ] Edge cases considerados
- [ ] Mocks apropiados para dependencias externas

---

## 📈 Métricas de Calidad

### Por Sprint

| Métrica | Objetivo |
|---------|----------|
| Tests nuevos | +10 por sprint |
| Bugs encontrados en QA | < 5 |
| Bugs en producción | 0 |
| Cobertura | ≥ anterior |

### Dashboard

```
Cobertura Total:     ████████████░░░░░░░░  65%
Tests Pasando:       ██████████████████░░  95%
Bugs Abiertos:       ████░░░░░░░░░░░░░░░░  3
```

---

## 🛠️ Comandos de Testing

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage

# Ejecutar tests de un archivo específico
npm run test -- Button.test.tsx

# Ejecutar tests que coincidan con un patrón
npm run test -- --testNamePattern="debería renderizar"
```

---

## 🔗 Archivos Relacionados

- `test-cases.md` - Casos de prueba manuales
- `coverage.md` - Reportes de cobertura
- `bugs.md` - Registro de bugs
- `../tasks/` - Tareas de desarrollo incluyendo bugs

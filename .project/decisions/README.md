# 📋 Architecture Decision Records (ADRs)

> Registro de decisiones técnicas importantes del proyecto

---

## 🎯 Propósito

Los ADRs documentan decisiones arquitectónicas significativas, incluyendo el contexto, las alternativas consideradas y las consecuencias. Esto permite:

- **Trazabilidad**: Entender por qué se tomaron ciertas decisiones
- **Onboarding**: Nuevos miembros entienden el razonamiento detrás del código
- **Consistencia**: Evitar re-discutir decisiones ya tomadas
- **Aprendizaje**: Documentar lo que funcionó y lo que no

---

## 📁 Índice de Decisiones

| ID | Título | Estado | Fecha |
|----|--------|--------|-------|
| ADR-001 | [Título] | Aceptado | YYYY-MM-DD |

---

## 🏷️ Estados de ADR

| Estado | Descripción |
|--------|-------------|
| `Propuesto` | Decisión pendiente de revisión/aprobación |
| `Aceptado` | Decisión aprobada y en vigor |
| `Rechazado` | Decisión evaluada pero no adoptada |
| `Deprecado` | Decisión que ya no aplica |
| `Reemplazado` | Sustituido por otro ADR (indicar cuál) |

---

## 📝 Cuándo Crear un ADR

Crear un ADR cuando:

- ✅ Eliges entre tecnologías o frameworks
- ✅ Defines patrones arquitectónicos
- ✅ Tomas decisiones que afectan múltiples componentes
- ✅ Haces trade-offs significativos (performance vs legibilidad, etc.)
- ✅ Cambias una decisión previa
- ✅ Introduces una nueva librería o dependencia importante

NO crear ADR para:

- ❌ Cambios menores de implementación
- ❌ Refactors que no cambian arquitectura
- ❌ Bug fixes
- ❌ Actualizaciones de dependencias menores

---

## 📄 Template de ADR

```markdown
# ADR-XXX: [Título Descriptivo]

## Estado

[Propuesto | Aceptado | Rechazado | Deprecado | Reemplazado por ADR-XXX]

## Fecha

YYYY-MM-DD

## Contexto

[Descripción del problema o situación que requiere una decisión.
¿Qué factores influyen? ¿Qué restricciones existen?
¿Por qué es necesario tomar esta decisión ahora?]

## Decisión

[Descripción clara y concisa de la decisión tomada.
Usar lenguaje directo: "Usaremos X", "Implementaremos Y"]

## Alternativas Consideradas

### Opción 1: [Nombre]

**Descripción**: [Breve descripción]

**Pros**:
- [Ventaja 1]
- [Ventaja 2]

**Contras**:
- [Desventaja 1]
- [Desventaja 2]

### Opción 2: [Nombre]

**Descripción**: [Breve descripción]

**Pros**:
- [Ventaja 1]
- [Ventaja 2]

**Contras**:
- [Desventaja 1]
- [Desventaja 2]

## Consecuencias

### Positivas

- [Consecuencia positiva 1]
- [Consecuencia positiva 2]

### Negativas

- [Consecuencia negativa 1]
- [Consecuencia negativa 2]

### Riesgos

- [Riesgo 1 y posible mitigación]

## Referencias

- [Enlace a documentación relevante]
- [Enlace a issue o discusión]
- [Artículo o recurso consultado]

## Notas Adicionales

[Cualquier información adicional relevante]
```

---

## 🔄 Proceso de ADR

### 1. Proponer

```bash
# Crear nuevo archivo
ADR-XXX-titulo-descriptivo.md
```

- Usar el siguiente número disponible
- Llenar template con estado `Propuesto`
- Incluir todas las alternativas consideradas

### 2. Revisar

- Compartir con el equipo o stakeholders relevantes
- Recopilar feedback
- Actualizar alternativas si surgen nuevas opciones

### 3. Decidir

- Cambiar estado a `Aceptado` o `Rechazado`
- Documentar la razón si es rechazado
- Agregar fecha de decisión

### 4. Implementar

- Seguir la decisión en el código
- Referenciar ADR en commits/PRs relevantes

### 5. Evolucionar

- Si la decisión cambia, crear nuevo ADR
- Marcar el anterior como `Reemplazado por ADR-XXX`
- No modificar ADRs aceptados (son inmutables)

---

## 🤖 Guía para Agentes de IA

### Antes de Proponer Cambios

1. **Buscar** ADRs existentes relacionados
2. **Si existe**: Seguir la decisión documentada
3. **Si no existe y es significativo**: Crear ADR con estado `Propuesto`

### Al Crear un ADR

- Documentar TODAS las alternativas consideradas
- Ser objetivo en pros/contras
- Incluir consecuencias reales
- Esperar aprobación humana antes de implementar decisiones arquitectónicas

### Ejemplo de Búsqueda

```
¿Necesito elegir un sistema de autenticación?
→ Buscar: "auth", "autenticación", "login", "JWT", "OAuth"

¿Necesito elegir cómo manejar estado?
→ Buscar: "state", "estado", "Redux", "Zustand", "Context"
```

---

## 📊 Métricas de ADRs

- **Total**: [número]
- **Aceptados**: [número]
- **Propuestos**: [número]
- **Rechazados**: [número]

---

## 🔗 Referencias Útiles

- [ADR GitHub Organization](https://adr.github.io/)
- [Michael Nygard's ADR article](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [ADR Tools](https://github.com/npryce/adr-tools)

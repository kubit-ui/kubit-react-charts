# Kubit React Charts - Documentación Completa de Componentes y Funcionalidades

## 📋 Índice

1. [Descripción General](#descripción-general)
2. [Características Principales](#características-principales)
3. [Gráficos Principales](#gráficos-principales)
4. [Componentes Base](#componentes-base)
5. [Hooks Personalizados](#hooks-personalizados)
6. [Utilidades](#utilidades)
7. [Sistema de Tipos](#sistema-de-tipos)
8. [Instalación y Configuración](#instalación-y-configuración)

---

## 🎯 Descripción General

**Kubit React Charts** es una biblioteca moderna de gráficos para React que proporciona componentes SVG reutilizables, accesibles e interactivos para visualización de datos. Construida con TypeScript y React 18, ofrece una arquitectura modular y composable.

**Versión:** 1.5.0  
**Licencia:** Apache 2.0  
**Compatibilidad:** React ^18.3.1  
**Plataformas:** Web, Android (nativo), iOS (nativo)

---

## ✨ Características Principales

### 🏗️ Arquitectura y Diseño

- **Composable**: Arquitectura modular donde cada gráfico está compuesto de elementos especializados
- **Performante**: Renderizado SVG optimizado con React 18
- **TypeScript**: Completamente tipado para mejor experiencia de desarrollo
- **Tree-Shaking**: Soporte para importaciones granulares que optimizan el tamaño del bundle

### ♿ Accesibilidad y UX

- **Accesible**: Cumple con WCAG con soporte para navegación por teclado
- **Interactivo**: Eventos de hover, focus, click y teclado en todos los componentes
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Personalizable**: Estilos flexibles y configuraciones granulares

### 🔧 Características Técnicas

- **SSR Ready**: Soporte completo para Server-Side Rendering (Next.js, Remix, Gatsby)
- **Error Handling**: Sistema centralizado de manejo de errores con depuración detallada
- **Production Safe**: Sistema de logging optimizado automáticamente para builds de producción
- **Tested**: Cobertura completa con Vitest y Testing Library

---

## 📊 Gráficos Principales

### 1. LineChart (Gráfico de Líneas)

**Propósito**: Visualizar tendencias temporales y comparar múltiples series de datos.

**Características:**

- Múltiples líneas en un mismo gráfico
- Puntos interactivos (nodes) con diferentes formas
- Soporte para gradientes CSS/SVG
- Ejes X e Y configurables
- Separadores visuales
- Efectos de hover y focus
- Zoom y navegación

**Fragmentos Disponibles:**

- `LineChart.Path`: Renderiza una línea de datos
- `LineChart.XAxis`: Eje horizontal
- `LineChart.YAxis`: Eje vertical
- `LineChart.Separator`: Líneas separadoras

**Casos de Uso:**

- Tendencias temporales
- Comparación de métricas
- Series de datos relacionadas
- Análisis de evolución

### 2. BarChart (Gráfico de Barras)

**Propósito**: Comparar categorías discretas de datos mediante barras horizontales o verticales.

**Características:**

- Orientación vertical u horizontal
- Barras apiladas y agrupadas
- Múltiples configuraciones de color
- Bordes redondeados personalizables
- Espacio configurable entre barras
- Ejes configurables
- Animaciones y transiciones

**Fragmentos Disponibles:**

- `BarChart.Path`: Renderiza una barra
- `BarChart.XAxis`: Eje horizontal
- `BarChart.YAxis`: Eje vertical
- `BarChart.Separator`: Líneas separadoras

**Casos de Uso:**

- Comparación de categorías
- Datos discretos
- Rankings y clasificaciones
- Distribuciones

### 3. PieChart (Gráfico Circular)

**Propósito**: Mostrar relaciones parte-todo en datos categóricos.

**Características:**

- Segmentos interactivos
- Labels personalizables
- Soporte para donut charts
- Efectos de hover
- Contenido personalizado con foreignObject
- Colores y estilos configurables

**Fragmentos Disponibles:**

- `PieChart.Path`: Renderiza un segmento del círculo
- `PieChart.Foreign`: Contenido HTML/React dentro del SVG

**Casos de Uso:**

- Distribución porcentual
- Relaciones parte-todo
- Composición de datos
- Análisis de proporciones

---

## 🧩 Componentes Base

### 1. **SvgContainer**

**Descripción**: Contenedor SVG principal con características de accesibilidad.

**Funcionalidades:**

- Dimensiones configurables (width, height)
- ViewBox personalizable
- Soporte para imágenes de fondo
- Atributos ARIA (role, ariaLabel, ariaHidden)
- Control de overflow
- Background color y border radius
- Caption para accesibilidad (title element)
- Tab navigation support

**Props Principales:**

```typescript
- width, height: Dimensiones
- viewBox: Viewport del SVG
- backgroundColor: Color de fondo
- radius: Border radius
- overflow: Control de overflow
- caption: Título accesible
- imageSrc: Imagen de fondo
```

### 2. **Path**

**Descripción**: Componente SVG path personalizable con soporte para interactividad.

**Funcionalidades:**

- Renderizado de paths SVG complejos
- Soporte para gradientes CSS → SVG
- Estados de hover y focus
- Efectos de sombra
- Nodos opcionales (puntos de control)
- Eventos de mouse y teclado
- Configuración de stroke y fill
- Accesibilidad (ARIA, tabIndex)

**Características Especiales:**

- Conversión automática de gradientes CSS a SVG
- Sistema de focus outline personalizable
- Renderizado de nodos en puntos específicos
- Referencia imperativa (ref) con acceso a path, node y main

**Props Principales:**

```typescript
- d: Path data string
- fill, stroke, strokeWidth: Estilos
- gradient: Gradiente CSS
- focusConfig, hoverConfig: Estados interactivos
- points: Array de puntos para nodos
- nodeConfig: Configuración de nodos
```

### 3. **Node**

**Descripción**: Formas geométricas interactivas para puntos de datos.

**Tipos Disponibles:**

- Circle (círculo)
- Square (cuadrado)
- Triangle (triángulo)
- Star (estrella)
- Pentagon (pentágono)
- Hexagon (hexágono)
- Straight (línea vertical)

**Funcionalidades:**

- 7 formas geométricas diferentes
- Efecto de halo (glow)
- Estados de hover y focus
- Tamaño y posición configurables
- Eventos completos (click, double-click, keyboard)
- Datos asociados al nodo
- Auto-click detection
- Soporte para forwarded refs

**Props Principales:**

```typescript
- type: Tipo de nodo (NodeType enum)
- size: Tamaño del nodo
- position: { x, y } coordenadas
- fill, stroke: Colores
- hasHalo: Efecto de resplandor
- data: Datos asociados
- onClick, onDoubleClick, onKeyDown: Eventos
```

### 4. **Plot**

**Descripción**: Puntos de datos interactivos con efectos visuales avanzados.

**Tipos Disponibles:**

- Circle
- Square
- Triangle

**Tamaños Predefinidos:**

- Small (0.375rem)
- Medium (0.625rem)
- Large (1rem)

**Funcionalidades:**

- 3 formas base
- Efecto de hover con escala
- Focus outline con anillo doble
- Opacidad configurable en hover
- Tamaños predefinidos o personalizados
- Role="button" para accesibilidad
- Cálculo automático de focus outline

**Características Especiales:**

- Sistema de focus con anillo interior y exterior
- Efecto de escala en hover
- Configuración separada para hover y focus
- Soporte completo de eventos

### 5. **Line**

**Descripción**: Componente de línea SVG simple y accesible.

**Funcionalidades:**

- Renderizado de líneas SVG
- Atributos ARIA
- Navegación por teclado
- Estilos personalizables
- Props HTML/SVG estándar

**Props:**

```typescript
- x1, y1, x2, y2: Coordenadas
- stroke, strokeWidth: Estilos
- className, ariaLabel: Personalización
- tabIndex: Navegación
```

### 6. **Bar**

**Descripción**: Componente para renderizar barras individuales en gráficos.

**Funcionalidades:**

- Orientación horizontal o vertical
- Barras segmentadas (stacked)
- Bordes redondeados (inicio/fin)
- Ancho configurable
- Múltiples colores por barra
- Espaciado extra configurable
- Orden de apilamiento

**Características Especiales:**

- Sistema de segmentos para barras apiladas
- Cálculo automático de posiciones
- Path building dinámico
- Soporte para bordes redondeados selectivos

### 7. **Tick**

**Descripción**: Marcas de graduación para ejes de gráficos.

**Funcionalidades:**

- Renderizado de líneas de tick
- Labels de texto
- Mostrar/ocultar líneas
- Posición configurable
- Estilos personalizables

**Componentes:**

- Línea del tick (Line)
- Texto del tick (ChartText)

### 8. **ChartText**

**Descripción**: Texto formateado para etiquetas en gráficos.

**Funcionalidades:**

- Renderizado de texto SVG
- Posicionamiento preciso
- Estilos configurables
- Truncado y ajuste de texto
- Soporte para multilinea

### 9. **ForeignObject**

**Descripción**: Permite incrustar HTML/React dentro de SVG.

**Funcionalidades:**

- Contenido HTML dentro de SVG
- Dimensiones y posición configurables
- Soporte para componentes React
- Data test id para testing

**Uso:**

```typescript
<ForeignObject x={10} y={10} width={100} height={50}>
  <div>Contenido HTML personalizado</div>
</ForeignObject>
```

### 10. **ZoomArea**

**Descripción**: Componente avanzado para zoom e interacción con rangos de datos.

**Funcionalidades:**

- Área de selección interactiva
- Handlers arrastrables para inicio/fin del rango
- Navegación completa por teclado
- Renderizado de líneas de datos escaladas
- Cálculo automático de canvas
- Focus ring con doble anillo
- Labels de accesibilidad
- Gestión de estado de rango
- Callbacks de cambio de datos

**Características Especiales:**

- Hook `useZoomData` para gestión de estado
- Hook `useDragInteraction` para arrastre
- Hook `useKeyboardNavigation` para teclado
- Hook `useResponsiveCanvas` para dimensiones adaptables
- Cálculo de fingerprint para optimización
- Generación automática de paths para líneas

**Elementos Configurables:**

```typescript
- handlerConfig: Configuración de handles
- selectionConfig: Configuración de área de selección
- focusConfig: Configuración de focus outline
- interactionConfig: Configuración de interacción
- screenReaderTextConfig: Textos para lectores de pantalla
```

### 11. **AxisChart (XAxis / YAxis)**

**Descripción**: Componentes para ejes X e Y en gráficos cartesianos.

**Funcionalidades:**

- Ejes horizontales y verticales
- Ticks configurables
- Posicionamiento (TOP, BOTTOM, LEFT, RIGHT)
- Formateo de valores
- Mostrar/ocultar líneas de tick
- Separadores visuales
- Grid lines opcionales

---

## 🪝 Hooks Personalizados

### 1. **useFocus**

**Propósito**: Gestionar el estado de foco y eventos focus/blur de elementos.

**Funcionalidades:**

- Estado de foco (isFocused)
- Handlers para focus y blur
- Soporte para custom handlers
- Genérico para HTMLElement y SVGElement

**Retorna:**

```typescript
{
  isFocused: boolean,
  handleFocus: (event) => void,
  handleBlur: (event) => void
}
```

**Uso:**

```typescript
const { isFocused, handleFocus, handleBlur } = useFocus(onFocus, onBlur);
```

### 2. **useHover**

**Propósito**: Gestionar el estado de hover y eventos mouseEnter/mouseLeave.

**Funcionalidades:**

- Estado de hover (isHovered)
- Handlers para mouse enter y leave
- Soporte para custom handlers
- Genérico para HTMLElement y SVGElement

**Retorna:**

```typescript
{
  isHovered: boolean,
  handleMouseEnter: (event) => void,
  handleMouseLeave: (event) => void
}
```

**Uso:**

```typescript
const { isHovered, handleMouseEnter, handleMouseLeave } = useHover(onMouseEnter, onMouseLeave);
```

### 3. **useAutoClick** (LineChart)

**Propósito**: Detectar clicks automáticos vs clicks manuales.

**Funcionalidades:**

- Diferencia entre clicks programáticos y de usuario
- Referencia a elemento
- Estado de autoClick

### 4. **useZoomData**

**Propósito**: Gestionar el estado y lógica de zoom en ZoomArea.

**Funcionalidades:**

- Gestión de rango actual
- Filtrado de datos
- Callbacks de cambio
- Rango inicial

### 5. **useDragInteraction**

**Propósito**: Gestionar interacciones de arrastre en ZoomArea.

**Funcionalidades:**

- Detección de arrastre
- Actualización de posiciones
- Handles de inicio/fin
- Callbacks de cambio

### 6. **useKeyboardNavigation**

**Propósito**: Navegación por teclado en ZoomArea.

**Funcionalidades:**

- Teclas de flecha
- Home/End
- PageUp/PageDown
- Incrementos configurables

### 7. **useResponsiveCanvas**

**Propósito**: Calcular dimensiones responsivas del canvas.

**Funcionalidades:**

- Parsing de dimensiones porcentuales
- Cálculo de viewBox
- Dimensiones absolutas
- Actualización en resize

### 8. **useZoomAreaFocus**

**Propósito**: Gestionar foco en elementos de ZoomArea.

**Funcionalidades:**

- Focus en handlers
- Focus en área de selección
- Estados de foco

---

## 🛠️ Utilidades

### Gestión de Logs

#### **logger**

Sistema de logging con niveles configurables y optimización para producción.

**Niveles:**

- `debug`: Información de depuración
- `info`: Información general
- `warn`: Advertencias
- `error`: Errores

**Características:**

- Deshabilitado automáticamente en producción
- Prefijos personalizables
- Niveles mínimos configurables
- Argumentos opcionales

**Uso:**

```typescript
import { logger } from '@kubit-ui-web/react-charts';

logger.info('Chart renderizado correctamente');
logger.warn('Datos incompletos', { missingFields: ['value'] });
logger.error('Error al cargar datos', error);
```

#### **configureLogger**

Configurar el comportamiento del logger.

**Opciones:**

```typescript
{
  enabled: boolean,      // Habilitar/deshabilitar
  minLevel: LogLevel,    // Nivel mínimo
  prefix: string         // Prefijo para mensajes
}
```

**Uso:**

```typescript
import { configureLogger } from '@kubit-ui-web/react-charts';

configureLogger({
  enabled: true,
  minLevel: 'debug',
  prefix: '[MyApp Charts]',
});
```

### SSR (Server-Side Rendering)

#### **isBrowser()**

Detectar si el código se ejecuta en navegador.

**Retorna:** `boolean`

**Uso:**

```typescript
import { isBrowser } from '@kubit-ui-web/react-charts';

if (isBrowser()) {
  // Código que requiere APIs del navegador
}
```

#### **isServer()**

Detectar si el código se ejecuta en servidor.

**Retorna:** `boolean`

#### **safeWindow()**

Acceso seguro al objeto window en SSR.

**Retorna:** `Window | undefined`

**Uso:**

```typescript
import { safeWindow } from '@kubit-ui-web/react-charts';

const width = safeWindow()?.innerWidth || 800;
```

#### **safeDocument()**

Acceso seguro al objeto document en SSR.

**Retorna:** `Document | undefined`

#### **createSVGElement()**

Crear elementos SVG de forma compatible con SSR.

**Uso:**

```typescript
import { createSVGElement } from '@kubit-ui-web/react-charts';

const svgElement = createSVGElement('circle', { r: 5, cx: 10, cy: 10 });
```

### Manejo de Errores

#### **createErrorAccumulator()**

Sistema avanzado de acumulación de errores para componentes.

**Funcionalidades:**

- Acumulación de errores por categoría
- Validación de datos
- Callbacks de error
- Colección centralizada

**Uso:**

```typescript
import { createErrorAccumulator } from '@kubit-ui-web/react-charts';

const errorAccumulator = createErrorAccumulator();
errorAccumulator.add('validation', 'Valor fuera de rango');
const errors = errorAccumulator.getAll();
```

#### **buildErrors()**

Construir objetos de error estructurados.

**Características:**

- Códigos de error tipados
- Mensajes descriptivos
- Contexto adicional
- Stack trace

### Utilidades de Cálculo

#### **getCanvasDimensions()**

Calcular dimensiones del canvas considerando márgenes y padding.

**Retorna:**

```typescript
{
  width: number,
  height: number,
  marginLeft: number,
  marginRight: number,
  marginTop: number,
  marginBottom: number
}
```

#### **getCoordinates()**

Obtener coordenadas en el canvas para puntos de datos.

**Funcionalidades:**

- Escala de datos a píxeles
- Consideración de márgenes
- Orientación horizontal/vertical

#### **getPoints()**

Generar array de puntos {x, y} para una serie de datos.

#### **getTicks()**

Calcular posiciones y valores de ticks para ejes.

**Características:**

- Número de ticks configurable
- Valores personalizados
- Cálculo automático de escala

#### **buildTickValues()**

Construir valores de tick basados en rango de datos.

**Opciones:**

- Ticks uniformes
- Ticks basados en datos
- Formateo personalizado

#### **getTickTextCoordinate()**

Calcular posición de texto para ticks.

**Considera:**

- Posición del eje (TOP, BOTTOM, LEFT, RIGHT)
- Rotación del texto
- Padding y márgenes

### Utilidades de Texto

#### **textBound()**

Calcular dimensiones de texto SVG.

**Retorna:**

```typescript
{
  width: number,
  height: number
}
```

**Características:**

- Medición precisa
- Compatible con SSR
- Cache de mediciones

#### **adjustedTextSpace()**

Calcular espacio necesario para texto considerando rotación y padding.

**Parámetros:**

- Texto
- Font size
- Font family
- Rotación
- Padding

### Utilidades de Estilo

#### **cssGradientToSVG()**

Convertir gradientes CSS a definiciones SVG.

**Soporta:**

- Linear gradients
- Radial gradients
- Múltiples stops
- Direcciones personalizadas

**Uso:**

```typescript
import { cssGradientToSVG } from '@kubit-ui-web/react-charts';

const svgGradient = cssGradientToSVG(
  'linear-gradient(90deg, #FF0000 0%, #00FF00 100%)',
  'myGradient'
);
```

#### **classNames()**

Utilitario para combinar clases CSS condicionalmente.

**Uso:**

```typescript
import { classNames } from '@kubit-ui-web/react-charts';

const classes = classNames('base-class', isActive && 'active', { hover: isHovered });
```

### Utilidades de Focus

#### **calculateFocusOutline()**

Calcular dimensiones y posición del outline de focus.

**Características:**

- Outline doble (inner + outer)
- Gap configurable
- Adaptable a forma del elemento
- Consideración de stroke width

**Retorna:**

```typescript
{
  innerOutline: {
    x, y, width, height, strokeWidth
  },
  outerOutline: {
    x, y, width, height, strokeWidth
  }
}
```

#### **getFocusConfig()**

Obtener configuración de focus con valores por defecto.

**Valores por defecto:**

```typescript
{
  gap: 2,
  innerStrokeWidth: 2,
  outerStrokeWidth: 1,
  stroke: '#0000FF'
}
```

### Utilidades de Datos

#### **getDataFingerprint()**

Generar huella digital de datos para detección de cambios.

**Uso:**

- Optimización de renders
- Memoización
- Cache de cálculos

#### **getChildrenAttr()**

Extraer atributos de componentes hijos React.

**Funcionalidades:**

- Parsing de children
- Extracción de props
- Filtrado por tipo

#### **parseStringToNumberPx()**

Convertir strings de dimensiones a números en píxeles.

**Soporta:**

- Píxeles (px)
- Rems (rem)
- Porcentajes (%)
- Viewport units (vw, vh)

#### **pickCustomAttributes()**

Extraer atributos data-_ y aria-_ de objetos.

**Uso:**

```typescript
const customAttrs = pickCustomAttributes(props);
// Retorna: { 'data-*': ..., 'aria-*': ... }
```

### Utilidades de Detección

#### **cursorNear()**

Detectar si el cursor está cerca de un punto.

**Parámetros:**

- Posición del cursor
- Posición del punto
- Umbral de distancia

**Retorna:** `boolean`

**Uso:** Implementar tooltips, highlights, interacciones basadas en proximidad.

### Shadow SVG

#### **ShadowSvg**

Componente para añadir efectos de sombra a elementos SVG.

**Características:**

- Sombra drop-shadow
- Blur configurable
- Offset X/Y
- Color y opacidad

---

## 📐 Sistema de Tipos

### Enums

#### **Position**

```typescript
enum Position {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}
```

#### **Unit**

```typescript
enum Unit {
  PIXELS = 'px',
  PERCENTAGE = '%',
  REM = 'rem',
  VW = 'vw',
  VH = 'vh',
}
```

#### **NodeType**

```typescript
enum NodeType {
  Circle = 'circle',
  Square = 'square',
  Triangle = 'triangle',
  Star = 'star',
  Pentagon = 'pentagon',
  Hexagon = 'hexagon',
  Straight = 'straight',
}
```

#### **PlotType**

```typescript
enum PlotType {
  CIRCLE = 'circle',
  SQUARE = 'square',
  TRIANGLE = 'triangle',
}
```

#### **PlotSize**

```typescript
enum PlotSize {
  SMALL = 'small', // 0.375rem
  MEDIUM = 'medium', // 0.625rem
  LARGE = 'large', // 1rem
}
```

#### **BarOrientation**

```typescript
enum BarOrientation {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}
```

### Tipos Principales

#### **CanvasType**

```typescript
interface CanvasType {
  width: number;
  height: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}
```

#### **FocusConfigType**

```typescript
interface FocusConfigType {
  gap?: number;
  innerStrokeWidth?: number;
  outerStrokeWidth?: number;
  stroke?: string;
}
```

#### **ChartErrorCollection**

```typescript
interface ChartErrorCollection {
  [category: string]: string[];
}
```

#### **ValueFormatter**

```typescript
type ValueFormatter = (value: number | string) => string;
```

---

## 📦 Instalación y Configuración

### Instalación

```bash
# NPM
npm install @kubit-ui-web/react-charts

# Yarn
yarn add @kubit-ui-web/react-charts

# pnpm
pnpm add @kubit-ui-web/react-charts
```

### Peer Dependencies

```bash
npm install react react-dom
```

**Versiones compatibles:**

- React: ^18.3.1
- React DOM: ^18.3.1

### Importaciones

```typescript
// Gráficos completos
import { BarChart, LineChart, PieChart } from '@kubit-ui-web/react-charts';
// Hooks
import { useFocus, useHover } from '@kubit-ui-web/react-charts';
// Componentes específicos
import { Node, Path, Plot } from '@kubit-ui-web/react-charts/components';
import { Bar } from '@kubit-ui-web/react-charts/components/bar';
import { Line } from '@kubit-ui-web/react-charts/components/line';
// Tipos
import type {
  BarOrientation,
  ChartData,
  NodeType,
  Position,
} from '@kubit-ui-web/react-charts/types';
// Utilidades
import {
  configureLogger,
  createSVGElement,
  isBrowser,
  logger,
  safeWindow,
} from '@kubit-ui-web/react-charts/utils';
```

### Configuración de Logger

```typescript
import { configureLogger } from '@kubit-ui-web/react-charts';

// Desarrollo
configureLogger({
  enabled: process.env.NODE_ENV === 'development',
  minLevel: 'debug',
  prefix: '[Charts]',
});
```

### Tree-Shaking

La librería soporta importaciones granulares para optimizar el bundle:

```typescript
// ✅ Importa solo lo necesario
import { BarChart } from '@kubit-ui-web/react-charts/charts/barChart';
import { Node } from '@kubit-ui-web/react-charts/components/node';
import { logger } from '@kubit-ui-web/react-charts/utils/logger';

// ❌ Evita importaciones masivas si no las necesitas
import * from '@kubit-ui-web/react-charts';
```

---

## 🎨 Ejemplos de Uso

### LineChart Básico

```tsx
import { LineChart } from '@kubit-ui-web/react-charts';

const data = [
  { year: '2020', sales: 100, profit: 20 },
  { year: '2021', sales: 150, profit: 35 },
  { year: '2022', sales: 180, profit: 45 },
  { year: '2023', sales: 200, profit: 60 },
];

function MyLineChart() {
  return (
    <LineChart data={data} xKey="year" width="100%" height="400px">
      <LineChart.Path dataKey="sales" stroke="#0078D4" strokeWidth={2} />
      <LineChart.Path dataKey="profit" stroke="#FF6B35" strokeWidth={2} />
      <LineChart.XAxis position="BOTTOM" showTickLines />
      <LineChart.YAxis position="LEFT" valueFormatter={val => `$${val}k`} />
    </LineChart>
  );
}
```

### BarChart con Manejo de Errores

```tsx
import { BarChart, BarOrientation } from '@kubit-ui-web/react-charts';
import type { ChartErrorCollection } from '@kubit-ui-web/react-charts/types';

function MyBarChart() {
  const handleErrors = (errors: ChartErrorCollection) => {
    console.warn('Chart errors:', errors);
    // Mostrar mensajes al usuario o lógica de reintento
  };

  const data = [
    { category: 'A', value: 30 },
    { category: 'B', value: 45 },
    { category: 'C', value: 25 },
  ];

  return (
    <BarChart
      data={data}
      pKey="category"
      orientation={BarOrientation.VERTICAL}
      gapBetweenBars={5}
      width="100%"
      height="400px"
      onErrors={handleErrors}
    >
      <BarChart.Path
        dataKey="value"
        dataIdx={0}
        barConfig={{
          barWidth: 40,
          singleConfig: [{ color: '#0078D4', coverage: 100 }],
        }}
      />
      <BarChart.XAxis position="BOTTOM" />
      <BarChart.YAxis position="LEFT" />
    </BarChart>
  );
}
```

### Componentes Personalizados con Plot y Path

```tsx
import { Path, Plot, PlotSize, PlotType, SvgContainer } from '@kubit-ui-web/react-charts';

function CustomChart() {
  return (
    <SvgContainer width={400} height={300} caption="Custom Chart">
      <Path
        d="M 10 80 Q 95 10 180 80"
        stroke="#0078D4"
        strokeWidth={2}
        fill="transparent"
        focusConfig={{
          stroke: '#FF0000',
          strokeWidth: 3,
        }}
        hoverConfig={{
          stroke: '#00FF00',
          strokeWidth: 3,
        }}
      />
      <Plot
        type={PlotType.CIRCLE}
        size={PlotSize.LARGE}
        position={{ x: 95, y: 10 }}
        fill="#FF6B35"
        onClick={(e, data) => console.log('Plot clicked', data)}
      />
    </SvgContainer>
  );
}
```

---

## 📊 Resumen de Valor

**Kubit React Charts** aporta:

### Para Desarrolladores

✅ **Productividad**: Componentes listos para usar con API intuitiva  
✅ **Type Safety**: TypeScript completo para menos errores  
✅ **Flexibilidad**: Arquitectura composable y personalizable  
✅ **DX**: Excelente experiencia de desarrollo con logging y debugging  
✅ **Testing**: Fácil de testear con data-testid y coverage completa

### Para Usuarios Finales

✅ **Accesibilidad**: WCAG compliant, navegación por teclado  
✅ **Interactividad**: Hover, focus, click en todos los elementos  
✅ **Responsive**: Adaptable a cualquier dispositivo  
✅ **Performance**: Renderizado optimizado de SVG

### Para el Proyecto

✅ **Mantenibilidad**: Código modular y bien organizado  
✅ **Escalabilidad**: Tree-shaking y bundle optimization  
✅ **Multiplataforma**: Web, Android, iOS con misma API  
✅ **SSR Ready**: Compatible con frameworks modernos  
✅ **Production Ready**: Sistema de logging optimizado automáticamente

---

## 📝 Notas Finales

Esta librería proporciona un conjunto completo de herramientas para crear visualizaciones de datos profesionales en React. La arquitectura modular permite usar desde gráficos completos hasta componentes individuales, adaptándose a las necesidades específicas de cada proyecto.

**Documentación adicional:**

- [BarChart README](./src/charts/barChart/README.md)
- [LineChart README](./src/charts/lineChart/README.md)
- [PieChart README](./src/charts/pieChart/README.md)

**Repositorios relacionados:**

- [Kubit Android Charts](https://github.com/kubit-ui/kubit-android-charts)
- [Kubit iOS Charts](https://github.com/kubit-ui/kubit-ios-charts)

---

**Versión del documento:** 1.0  
**Fecha:** 22 de enero de 2026  
**Librería:** @kubit-ui-web/react-charts v1.5.0

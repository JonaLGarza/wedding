# WeatherWidget Component

Un componente de React que muestra el pronóstico del clima semanal usando la API de OpenWeatherMap.

## Características

- Muestra el clima actual y pronóstico de 7 días
- Diseño responsivo con Tailwind CSS
- Soporte para múltiples ciudades y países
- Iconos del clima de OpenWeatherMap
- Texto en español
- Manejo de errores y estados de carga

## Configuración

### 1. API Key de OpenWeatherMap

Necesitas obtener una API key gratuita de [OpenWeatherMap](https://openweathermap.org/api).

### 2. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
VITE_OPENWEATHER_API_KEY=tu_api_key_aqui
```

**Importante**: El archivo `.env` ya está incluido en `.gitignore` para no exponer tu API key.

### 3. Para GitHub Pages

Para que funcione en GitHub Pages, necesitas configurar la variable de entorno en tu repositorio:

1. Ve a tu repositorio en GitHub
2. Ve a Settings > Secrets and variables > Actions
3. Crea una nueva variable de repositorio:
   - Nombre: `VITE_OPENWEATHER_API_KEY`
   - Valor: `d6f4606ebddb2c1b102917878730738f`

## Uso

```tsx
import WeatherWidget from '@/components/atoms/WeatherWidget';

function App() {
  return (
    <div>
      {/* Uso básico */}
      <WeatherWidget />
      
      {/* Ciudad personalizada */}
      <WeatherWidget city="Monterrey" countryCode="MX" />
      
      {/* Con clases CSS personalizadas */}
      <WeatherWidget 
        city="Saltillo" 
        countryCode="MX" 
        className="max-w-4xl mx-auto" 
      />
    </div>
  );
}
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `city` | `string` | `"Saltillo"` | Nombre de la ciudad |
| `countryCode` | `string` | `"MX"` | Código del país (ISO 3166-1 alpha-2) |
| `className` | `string` | `""` | Clases CSS adicionales |

## API Endpoints Utilizados

- **Geocoding API**: Para obtener coordenadas de la ciudad
- **One Call API**: Para obtener el clima actual y pronóstico de 7 días

## Estilos

El componente usa Tailwind CSS y tiene un diseño que incluye:
- Colores neutros y elegantes
- Diseño de tarjeta con bordes redondeados
- Grid responsivo para los días de la semana
- Iconos del clima de OpenWeatherMap

## Dependencias

- React (hooks: useState, useEffect, useMemo)
- Tailwind CSS para estilos
- API de OpenWeatherMap para datos del clima

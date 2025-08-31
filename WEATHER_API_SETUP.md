# Configuración de la API del Clima (OpenWeather)

## Problema Identificado

El componente `WeatherWidget` estaba usando la **One Call API 2.5** que ha sido **deprecada** por OpenWeather. Esta API ya no funciona y debe ser reemplazada por la **One Call API 3.0**.

## Solución Implementada

✅ **Actualizado** el código para usar la nueva API 3.0:
```typescript
// ANTES (deprecado):
`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=es&exclude=minutely,hourly,alerts&appid=${apiKey}`

// DESPUÉS (nueva API):
`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&lang=es&exclude=minutely,hourly,alerts&appid=${apiKey}`
```

✅ **Sistema de Caché Inteligente** implementado:
- **Límite de API**: Solo 1 llamada por día por ciudad
- **Almacenamiento**: localStorage con fallback a sessionStorage
- **Compatibilidad**: iOS, macOS, Windows, navegadores modernos
- **Persistencia**: Datos se mantienen entre sesiones

## 🚀 Sistema de Caché

### Características Principales

1. **Límite de Llamadas API**: 
   - Máximo 1 llamada por día por ciudad
   - Reduce significativamente el uso de la API
   - Ahorra costos y mejora el rendimiento

2. **Almacenamiento Inteligente**:
   - **localStorage**: Almacenamiento persistente entre sesiones
   - **sessionStorage**: Fallback si localStorage no está disponible
   - **Memoria**: Fallback final para casos extremos

3. **Compatibilidad Universal**:
   - ✅ **iOS**: Safari, Chrome, Firefox
   - ✅ **macOS**: Safari, Chrome, Firefox, Edge
   - ✅ **Windows**: Chrome, Firefox, Edge, IE11+
   - ✅ **Android**: Chrome, Firefox, Samsung Internet
   - ✅ **Linux**: Chrome, Firefox, Chromium

4. **Gestión Automática**:
   - Caché expira automáticamente después de 24 horas
   - Nueva llamada a la API solo cuando es necesario
   - Fallback a datos del caché si la API falla

### Funcionamiento del Caché

```
1. Primera visita → Llama a la API → Guarda en caché
2. Visitas posteriores → Usa datos del caché (24h válidos)
3. Caché expirado → Llama automáticamente a la API
4. Error de API → Muestra datos del caché si están disponibles
```

### Estructura del Caché

```typescript
interface WeatherCache {
  data: {
    weather: OneCall;
    place: { name: string };
    timestamp: number;
  };
  timestamp: number;
  city: string;
  countryCode: string;
}
```

## Requisitos de la Nueva API

### 1. Suscripción Requerida
- **One Call API 3.0** requiere una suscripción separada llamada **"One Call by Call"**
- **NO** está incluida en otros planes de OpenWeather
- **2000 llamadas por día** por defecto (configurable)

### 2. Precios
- **1,000 llamadas/día**: Gratis
- **Llamadas adicionales**: Solo pagas por lo que uses
- Consulta [pricing page](https://openweathermap.org/price) para más detalles

### 3. Configuración
```bash
# En tu archivo .env
VITE_OPENWEATHER_API_KEY=tu_api_key_aqui
```

## Pasos para Activar la API

1. **Regístrate** en [OpenWeather](https://openweathermap.org/api)
2. **Suscríbete** al plan "One Call by Call" 
3. **Obtén tu API key** desde tu cuenta
4. **Configura la variable de entorno** en tu proyecto

## Verificación

Para verificar que la API funciona:

1. Ejecuta el proyecto: `yarn dev`
2. Navega a `/weather-demo`
3. Verifica que no hay errores en la consola del navegador
4. El widget debe mostrar el clima de Saltillo, MX
5. **Primera visita**: Verás "🌐 Actualizado al día" (datos de la API)
6. **Visitas posteriores**: Verás "📱 Desde caché" (datos del caché)
7. **Indicadores visuales**: El estado se muestra automáticamente sin botones

## Posibles Errores

### Error 401: Unauthorized
- API key inválida o no configurada
- Verifica que `VITE_OPENWEATHER_API_KEY` esté en tu archivo `.env`

### Error 403: Forbidden
- No tienes suscripción a One Call API 3.0
- Suscríbete al plan "One Call by Call"

### Error 429: Too Many Requests
- Has excedido el límite de llamadas diarias
- Verifica tu plan en OpenWeather

### Problemas de Caché
- **localStorage bloqueado**: El navegador puede bloquear localStorage en modo incógnito
- **Cuota excedida**: Algunos navegadores limitan el almacenamiento
- **Fallback automático**: El sistema usará sessionStorage o memoria como respaldo

## Archivos Modificados

- `src/components/atoms/WeatherWidget/WeatherWidget.tsx` - URL de API actualizada + sistema de caché
- `src/hooks/useWeatherCache.ts` - Hook personalizado para gestión de caché
- `src/components/atoms/WeatherWidget/CacheInfo.tsx` - Componente de información del caché
- `src/pages/WeatherDemo.tsx` - Documentación actualizada + demostración del caché

## Enlaces Útiles

- [One Call API 3.0 Documentation](https://openweathermap.org/api/one-call-3)
- [Pricing Page](https://openweathermap.org/price)
- [API Keys Management](https://home.openweathermap.org/api_keys)
- [localStorage Browser Support](https://caniuse.com/namevalue-storage)
- [sessionStorage Browser Support](https://caniuse.com/namevalue-storage)

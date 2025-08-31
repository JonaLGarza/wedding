# Guía de Despliegue para GitHub Pages

Esta guía te ayudará a desplegar tu aplicación de boda con el componente de clima en GitHub Pages.

## Configuración de Variables de Entorno

### 1. Configurar Secretos en GitHub

Para que el componente de clima funcione en GitHub Pages, necesitas configurar la variable de entorno:

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Secrets and variables** → **Actions**
4. Haz clic en **New repository secret**
5. Configura:
   - **Name**: `VITE_OPENWEATHER_API_KEY`
   - **Value**: `d6f4606ebddb2c1b102917878730738f`
6. Haz clic en **Add secret**

### 2. Verificar el Workflow de GitHub Actions

El archivo `.github/workflows/deploy.yml` ya está configurado para:
- Construir tu aplicación
- Crear el archivo `.env` con la API key
- Desplegar a GitHub Pages

### 3. Habilitar GitHub Pages

1. Ve a **Settings** → **Pages**
2. En **Source**, selecciona **GitHub Actions**
3. Esto permitirá que el workflow despliegue automáticamente

## Flujo de Despliegue

1. **Push a main**: Cada vez que hagas push a la rama `main`
2. **GitHub Actions**: Se ejecuta automáticamente el workflow
3. **Build**: Se construye la aplicación con la API key
4. **Deploy**: Se despliega a GitHub Pages

## Verificación

Después del despliegue:

1. Ve a la URL de tu GitHub Pages
2. Navega a `/wedding/weather-demo`
3. Verifica que el componente de clima se muestre correctamente
4. Revisa la consola del navegador para errores

## Solución de Problemas

### Error: "API key no configurada"

- Verifica que el secreto `VITE_OPENWEATHER_API_KEY` esté configurado
- Asegúrate de que el workflow se haya ejecutado correctamente
- Revisa los logs de GitHub Actions

### Error: "No se encontró la ciudad"

- Verifica que la ciudad y código de país sean correctos
- Asegúrate de que la API key sea válida
- Revisa los límites de la API gratuita de OpenWeatherMap

### El componente no se muestra

- Verifica que la ruta `/wedding/weather-demo` esté accesible
- Revisa la consola del navegador para errores
- Asegúrate de que Tailwind CSS esté funcionando

## Personalización

### Cambiar Ciudad por Defecto

Edita `src/components/atoms/WeatherWidget/WeatherWidget.tsx`:

```tsx
export default function WeatherWidget({
  city = "TuCiudad", // Cambia aquí
  countryCode = "TU", // Y aquí
  className = "",
}: Props) {
```

### Cambiar Estilos

El componente usa Tailwind CSS. Puedes personalizar los colores y estilos editando las clases en el componente.

## Monitoreo

- **GitHub Actions**: Revisa el historial de ejecuciones
- **GitHub Pages**: Monitorea el estado del despliegue
- **OpenWeatherMap**: Verifica el uso de tu API key

## Costos

- **GitHub Pages**: Gratis para repositorios públicos
- **OpenWeatherMap**: Gratis hasta 1000 llamadas/día
- **GitHub Actions**: Gratis hasta 2000 minutos/mes para repositorios públicos

## Seguridad

- ✅ La API key está en secretos de GitHub (no visible en el código)
- ✅ El archivo `.env` está en `.gitignore`
- ✅ Solo se expone en el build de producción
- ⚠️ La API key será visible en el código JavaScript del cliente (esto es normal para aplicaciones frontend)

## Soporte

Si tienes problemas:
1. Revisa los logs de GitHub Actions
2. Verifica la configuración de secretos
3. Prueba el componente localmente primero
4. Consulta la documentación de OpenWeatherMap

import WeatherWidget from '../components/atoms/WeatherWidget/WeatherWidget';
import CacheInfo from '../components/atoms/WeatherWidget/CacheInfo';

export default function WeatherDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            WeatherWidget Demo
          </h1>
          <p className="text-xl text-gray-600">
            Componente de clima con sistema de caché inteligente
          </p>
        </div>

        <div className="space-y-8">
          {/* Widget por defecto */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Widget por Defecto (Saltillo, MX)
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <WeatherWidget />
              </div>
              <div>
                <CacheInfo city="Saltillo" countryCode="MX" />
              </div>
            </div>
          </div>

          {/* Widget con ciudad personalizada */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Ciudad Personalizada (Monterrey, MX)
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <WeatherWidget city="Monterrey" countryCode="MX" />
              </div>
              <div>
                <CacheInfo city="Monterrey" countryCode="MX" />
              </div>
            </div>
          </div>

          {/* Widget con clases personalizadas */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Con Estilos Personalizados
            </h2>
            <WeatherWidget 
              city="Saltillo" 
              countryCode="MX" 
              className="max-w-4xl mx-auto shadow-2xl" 
            />
          </div>

          {/* Información del sistema de caché */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              🚀 Sistema de Caché Inteligente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 text-gray-600">
                <h4 className="font-semibold text-gray-800">✨ Características:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <strong>Límite de API:</strong> Solo 1 llamada por día por ciudad
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <strong>Almacenamiento:</strong> localStorage con fallback a sessionStorage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <strong>Compatibilidad:</strong> iOS, macOS, Windows, navegadores modernos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <strong>Persistencia:</strong> Datos se mantienen entre sesiones
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <strong>Indicadores visuales:</strong> Muestra si los datos vienen de la API o del caché
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3 text-gray-600">
                <h4 className="font-semibold text-gray-800">🔧 Funcionamiento:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">1.</span>
                    <span>Primera visita: Llama a la API y guarda en caché</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">2.</span>
                    <span>Visitas posteriores: Usa datos del caché (24h válidos)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">3.</span>
                    <span>Caché expirado: Llama automáticamente a la API</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">4.</span>
                    <span>Error de API: Muestra datos del caché si están disponibles</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Información de configuración */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Configuración Requerida
            </h3>
            <div className="space-y-3 text-gray-600">
              <p>
                <strong>API Key:</strong> Este componente requiere una API key de OpenWeatherMap.
              </p>
              <p>
                <strong>Variable de entorno:</strong> VITE_OPENWEATHER_API_KEY debe estar configurada.
              </p>
              <p>
                <strong>API Version:</strong> Usa One Call API 3.0 (requiere suscripción "One Call by Call").
              </p>
              <p>
                <strong>GitHub Pages:</strong> Para el despliegue, configura la variable de entorno en tu repositorio.
              </p>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>⚠️ Importante:</strong> La API 2.5 está deprecada. Si tienes problemas, 
                  asegúrate de tener una suscripción activa a One Call API 3.0 en OpenWeatherMap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

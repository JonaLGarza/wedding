import { useWeatherCache } from "../../../hooks/useWeatherCache";

type Props = {
  city: string;
  countryCode: string;
};

export default function CacheInfo({ city, countryCode }: Props) {
  const { getCacheInfo, clearCache } = useWeatherCache(city, countryCode);
  const cacheInfo = getCacheInfo();

  if (!cacheInfo) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">📱 Estado del Caché</h4>
        <p className="text-blue-600 text-sm">No hay datos en caché para esta ciudad.</p>
      </div>
    );
  }

  const { hours, minutes, isValid, expiresIn } = cacheInfo;
  const expiresInHours = Math.floor(expiresIn / (60 * 60 * 1000));
  const expiresInMinutes = Math.floor((expiresIn % (60 * 60 * 1000)) / (60 * 1000));

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <h4 className="font-semibold text-green-800 mb-2">📱 Estado del Caché</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-green-700">Estado:</span>
          <span className={`font-medium ${isValid ? 'text-green-600' : 'text-red-600'}`}>
            {isValid ? '✅ Válido' : '❌ Expirado'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-green-700">Última actualización:</span>
          <span className="text-green-600">
            {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-green-700">Expira en:</span>
          <span className="text-green-600">
            {expiresInHours > 0 ? `${expiresInHours}h ${expiresInMinutes}m` : `${expiresInMinutes}m`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-green-700">Ciudad:</span>
          <span className="text-green-600">{city}, {countryCode}</span>
        </div>
      </div>
      
      <button
        onClick={clearCache}
        className="mt-3 w-full px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
        title="Limpiar caché y forzar nueva actualización"
      >
        🗑️ Limpiar Caché
      </button>
    </div>
  );
}

import { useState, useEffect, useCallback } from 'react';

// Tipos para el caché
interface WeatherCache {
  data: any;
  timestamp: number;
  city: string;
  countryCode: string;
}

interface CacheStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

// Clave para el caché
const WEATHER_CACHE_KEY = 'weather_widget_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

// Función para obtener el storage disponible (localStorage con fallback a sessionStorage)
const getStorage = (): CacheStorage => {
  try {
    // Probar localStorage
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return localStorage;
  } catch {
    try {
      // Fallback a sessionStorage
      const test = '__sessionStorage_test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return sessionStorage;
    } catch {
      // Fallback a un objeto en memoria (solo para la sesión actual)
      const memoryStorage: { [key: string]: string } = {};
      return {
        getItem: (key: string) => memoryStorage[key] || null,
        setItem: (key: string, value: string) => { memoryStorage[key] = value; },
        removeItem: (key: string) => { delete memoryStorage[key]; }
      };
    }
  }
};

// Función para verificar si el caché es válido
const isCacheValid = (cache: WeatherCache | null): boolean => {
  if (!cache) return false;
  
  const now = Date.now();
  const cacheAge = now - cache.timestamp;
  
  return cacheAge < CACHE_DURATION;
};

// Función para generar una clave única para cada ciudad
const getCacheKey = (city: string, countryCode: string): string => {
  return `${WEATHER_CACHE_KEY}_${city.toLowerCase()}_${countryCode.toLowerCase()}`;
};

export const useWeatherCache = (city: string, countryCode: string) => {
  const [cache, setCache] = useState<WeatherCache | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);
  const storage = getStorage();

  // Función para obtener datos del caché
  const getCachedData = useCallback((): WeatherCache | null => {
    try {
      const cacheKey = getCacheKey(city, countryCode);
      const cached = storage.getItem(cacheKey);
      
      if (cached) {
        const parsedCache: WeatherCache = JSON.parse(cached);
        
        // Verificar si el caché es para la misma ciudad
        if (parsedCache.city === city && parsedCache.countryCode === countryCode) {
          return parsedCache;
        }
      }
    } catch (error) {
      console.warn('Error reading weather cache:', error);
    }
    
    return null;
  }, [city, countryCode, storage]);

  // Función para guardar datos en el caché
  const setCachedData = useCallback((data: any) => {
    try {
      const cacheKey = getCacheKey(city, countryCode);
      const cacheData: WeatherCache = {
        data,
        timestamp: Date.now(),
        city,
        countryCode
      };
      
      storage.setItem(cacheKey, JSON.stringify(cacheData));
      setCache(cacheData);
    } catch (error) {
      console.warn('Error saving weather cache:', error);
    }
  }, [city, countryCode, storage]);

  // Función para limpiar el caché
  const clearCache = useCallback(() => {
    try {
      const cacheKey = getCacheKey(city, countryCode);
      storage.removeItem(cacheKey);
      setCache(null);
      setIsFromCache(false);
    } catch (error) {
      console.warn('Error clearing weather cache:', error);
    }
  }, [city, countryCode, storage]);

  // Función para verificar si necesitamos hacer una nueva llamada a la API
  const shouldFetchFromAPI = useCallback((): boolean => {
    const cached = getCachedData();
    return !isCacheValid(cached);
  }, [getCachedData]);

  // Función para obtener datos (del caché o indicar que se necesita API)
  const getData = useCallback((): { data: any | null; shouldFetch: boolean } => {
    const cached = getCachedData();
    
    if (cached && isCacheValid(cached)) {
      setCache(cached);
      setIsFromCache(true);
      return { data: cached.data, shouldFetch: false };
    }
    
    return { data: null, shouldFetch: true };
  }, [getCachedData]);

  // Función para obtener información del caché
  const getCacheInfo = useCallback(() => {
    const cached = getCachedData();
    if (!cached) return null;
    
    const now = Date.now();
    const age = now - cached.timestamp;
    const hours = Math.floor(age / (60 * 60 * 1000));
    const minutes = Math.floor((age % (60 * 60 * 1000)) / (60 * 1000));
    
    return {
      age,
      hours,
      minutes,
      isValid: isCacheValid(cached),
      expiresIn: CACHE_DURATION - age
    };
  }, [getCachedData]);

  // Cargar datos del caché al montar el componente
  useEffect(() => {
    const { data, shouldFetch } = getData();
    if (!shouldFetch && data) {
      setCache({ data, timestamp: Date.now(), city, countryCode });
      setIsFromCache(true);
    }
  }, [city, countryCode, getData]);

  return {
    cache,
    isFromCache,
    shouldFetchFromAPI,
    setCachedData,
    clearCache,
    getCacheInfo,
    getData
  };
};

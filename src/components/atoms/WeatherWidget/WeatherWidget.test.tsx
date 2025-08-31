import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WeatherWidget from './WeatherWidget';

// Mock environment variable
vi.mock('import.meta.env', () => ({
  env: {
    VITE_OPENWEATHER_API_KEY: 'test-api-key'
  }
}));

// Mock fetch
global.fetch = vi.fn();

describe('WeatherWidget', () => {
  it('renders loading state initially', () => {
    render(<WeatherWidget />);
    expect(screen.getByText('Cargando pronóstico…')).toBeDefined();
  });

  it('renders with default props', () => {
    render(<WeatherWidget />);
    expect(screen.getByText('Cargando pronóstico…')).toBeDefined();
  });

  it('renders with custom city', () => {
    render(<WeatherWidget city="Monterrey" countryCode="MX" />);
    expect(screen.getByText('Cargando pronóstico…')).toBeDefined();
  });

  it('renders with custom className', () => {
    render(<WeatherWidget className="custom-class" />);
    const container = screen.getByText('Cargando pronóstico…').closest('div');
    expect(container?.className).toContain('custom-class');
  });
});

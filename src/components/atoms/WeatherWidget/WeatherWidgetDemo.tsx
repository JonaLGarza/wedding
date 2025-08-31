import WeatherWidget from './WeatherWidget';

export default function WeatherWidgetDemo() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Simulación del formulario RSVP */}
      <div className="bg-white rounded-xl border border-[var(--brand-olive)]/20 p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-[var(--brand-brown)] text-center mb-6">
          Formulario RSVP
        </h2>
        <div className="space-y-4">
          <div className="bg-[var(--brand-olive)]/10 border border-[var(--brand-olive)]/30 rounded-lg p-4">
            <p className="text-[var(--brand-olive)] text-sm">
              <strong>Instrucciones:</strong> Escribe las primeras 3 letras de tu nombre y da clic en la sugerencia que aparecerá desplegada. 
              Posteriormente puedes mantener o reducir la cantidad de invitados que asistirán (incluyéndote). 
              Captura todos los campos antes de dar clic en "ENVIAR"
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--brand-brown)] mb-2">
                Nombre(s)
              </label>
              <input 
                type="text" 
                placeholder="Escribe las primeras 3 letras de tu nombre"
                className="w-full p-3 border border-[var(--brand-olive)]/30 rounded-lg bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--brand-brown)] mb-2">
                Teléfono
              </label>
              <input 
                type="tel" 
                placeholder="Tu número de teléfono"
                className="w-full p-3 border border-[var(--brand-olive)]/30 rounded-lg bg-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--brand-brown)] mb-2">
              Confirmación de asistencia
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input type="radio" name="attending" value="yes" defaultChecked className="mr-2" />
                <span className="text-[var(--brand-olive)]">Asistiré</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="attending" value="no" className="mr-2" />
                <span className="text-[var(--brand-olive)]">No Asistiré</span>
              </label>
            </div>
          </div>
          
          <button className="w-full bg-[var(--brand-gold)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--brand-gold)]/90 transition-colors">
            ENVIAR
          </button>
        </div>
      </div>

      {/* Widget del Clima integrado */}
      <div className="mt-12">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-[var(--brand-brown)]">
            Clima para el Gran Día
          </h3>
          <p className="text-[var(--muted-fg)] text-sm">
            Revisa el pronóstico del clima para planificar tu asistencia
          </p>
        </div>
        <WeatherWidget className="max-w-4xl mx-auto" />
      </div>
    </div>
  );
}

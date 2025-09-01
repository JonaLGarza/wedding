import React, { useState, useEffect } from "react";

export interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, className = "" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={`text-center ${className}`}>
      <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-8 lg:space-x-12">
        {/* Días */}
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-script text-white">
            {timeLeft.days.toString().padStart(2, '0')}
          </div>
          <div className="text-sm sm:text-base md:text-lg text-white/80 font-viaoda font-medium tracking-wider">
            Días
          </div>
        </div>

        {/* Separador */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-script text-white/60">:</div>

        {/* Horas */}
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-script text-white">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-sm sm:text-base md:text-lg text-white/80 font-viaoda font-medium tracking-wider">
            Horas
          </div>
        </div>

        {/* Separador */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-script text-white/60">:</div>

        {/* Minutos */}
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-script text-white">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-sm sm:text-base md:text-lg text-white/80 font-viaoda font-medium tracking-wider">
            Minutos
          </div>
        </div>

        {/* Separador */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-script text-white/60">:</div>

        {/* Segundos */}
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-script text-white">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-sm sm:text-base md:text-lg text-white/80 font-viaoda font-medium tracking-wider">
            Segundos
          </div>
        </div>
      </div>
    </div>
  );
};

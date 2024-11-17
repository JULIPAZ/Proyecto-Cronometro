import React, { useState, useEffect } from 'react';
import './cronometro.css';

function Cronometro() {
  const [time, setTime] = useState(0); //guarda el tiempo en milisegundo
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]); // guarda las vulta parcial

  useEffect(() => { //maneja el intervalo del cronometro
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10); // Incrementa cada 10ms
      }, 10);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);// limpiamos el intervalo
  }, [isRunning]);
    // funcion para formatear el tiempo en el formato mm:ss.ms
  const formatTime = (time) => { 
    const milliseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
    const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  const handleStartPause = () => { //alternar el estado de 'isRunning entre true y false
    setIsRunning(!isRunning); //canbia el estado de ejecucion del cronometro
  };
    //funcion reinciar el cronometro
  const handleReset = () => {
    setIsRunning(false); //detiene el cronometro
    setTime(0);         //resetea el tiempo a 0
    setLaps([]);        //limpia las vueltas parciales
  };
    //funcion para registrar un parcal(vuelta) si el cronometro esta en ejecucion
  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);// Agrega el tiempo actual como una nueva vuelta
    }
  };

  return (
    <div className="cronometro-container">
      <h1 className="cronometro-title">Cronómetro</h1>
      <div className="cronometro-circle">
        <div className="cronometro-time">{formatTime(time)}</div>
      </div>
      <div className="cronometro-button-container">
        <button onClick={handleStartPause} className="cronometro-button">
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button onClick={handleReset} className="cronometro-button">Reiniciar</button>
        {/* El botón "parcial" solo aparece si el cronómetro está en ejecución */}
        {isRunning && (
          <button onClick={handleLap} className="cronometro-button">Parcial</button>
        )}
      </div>
      {laps.length > 0 && (
        <div className="cronometro-lap-container">
          <h3>Vueltas:</h3>
          <ul className="cronometro-lap-list">
            {laps.map((lap, index) => (
              <li key={index} className="cronometro-lap-item">
                #{index + 1}: {formatTime(lap)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Cronometro;


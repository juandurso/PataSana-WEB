import React, { useEffect } from 'react';

const BackgroundMusic = () => {
  useEffect(() => {
    const audio = new Audio('/audioCorto.mp3'); // Ajusta la ruta al archivo de audio.

    // Iniciamos la reproducción cuando el componente se monte
    audio.play();

    // Detenemos y reiniciamos la música cuando el componente se desmonte
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente.

  return null; // No renderizamos nada, ya que este componente solo maneja la reproducción de música.
};

export default BackgroundMusic;

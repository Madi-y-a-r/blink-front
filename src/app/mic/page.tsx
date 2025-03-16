"use client";
import { useEffect, useRef, useState } from "react";

export default function MicVisualizer() {
  const [volume, setVolume] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const initMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;

        const micStream = audioContext.createMediaStreamSource(stream);
        micStream.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        dataArrayRef.current = dataArray;

        const updateVolume = () => {
          if (!analyserRef.current || !dataArrayRef.current) return;

          analyserRef.current.getByteFrequencyData(dataArrayRef.current);
          const avg = dataArrayRef.current.reduce((sum, val) => sum + val, 0) / bufferLength;
          setVolume(avg / 255);

          requestAnimationFrame(updateVolume);
        };

        updateVolume();
      } catch (err) {
        console.error("Ошибка доступа к микрофону:", err);
      }
    };

    initMic();

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h2>Громкость микрофона</h2>
      <div style={{
        width: "100%",
        height: "20px",
        backgroundColor: "#ddd",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${volume * 100}%`,
          height: "100%",
          backgroundColor: volume > 0.5 ? "red" : "green",
          transition: "width 0.1s"
        }} />
      </div>
      <p>Уровень громкости: {Math.round(volume * 100)}</p>
    </div>
  );
}

"use client";

import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import SelectDemo from "../components/Select/Select";
import ToolbarDemo from "../components/Toolbar/Toolbar";
import styles from "./page.module.scss";
import ChatInput from "../components/Chat/Chat";
import { useChatStore } from "@/src/store/useChatStore"
import ChatMessages from "../components/Chat/ChatMessages";

export default function Home() {
  const { 
    isChatActive, 
    hasMicAccess, 
    soundLevel,
    messages,
    setMicAccess, 
    setSoundLevel, 
    addMessage 
  } = useChatStore();
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  
  const { rive, RiveComponent } = useRive({
    src: "/rive/ai_voice.riv",
    stateMachines: "bumpy",
    autoplay: true,
  });
  

  const scaleInput = useStateMachineInput(rive, "bumpy", "scale", 1);
  
  useEffect(() => {
    const requestMicAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicAccess(true);
        
        // Создаем аудиоконтекст и анализатор
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        
        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
        
        // Запускаем цикл обновления анимации
        requestAnimationFrame(updateAnimation);
      } catch (error) {
        console.error("Ошибка доступа к микрофону:", error);
        setMicAccess(false);
      }
    };
    
    requestMicAccess();
    
    return () => {
      // Очищаем аудиоконтекст при размонтировании компонента
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [setMicAccess]);
  
  // Обновляем анимацию Rive на основе уровня звука
  const updateAnimation = () => {
    if (!analyserRef.current || !dataArrayRef.current || !scaleInput) return;
    
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    // Вычисляем средний уровень громкости
    const average = dataArrayRef.current.reduce((a, b) => a + b, 0) / dataArrayRef.current.length;
    
    // Преобразуем средний уровень в масштаб от 0.8 до 1.5
    const normalizedScale = 0.8 + (average / 255) * 0.7;
    
    // Обновляем масштаб анимации Rive
    scaleInput.value = normalizedScale;
    
    // Сохраняем уровень звука в хранилище
    setSoundLevel(normalizedScale);
    
    // Продолжаем цикл анимации
    requestAnimationFrame(updateAnimation);
  };
  
  // Обработчик отправки сообщений
  const handleMessageSubmit = (text: string) => {
    if (text.trim()) {
      // Добавляем сообщение пользователя
      addMessage(text, false);
      
      // Имитируем ответ бота через небольшую задержку
      setTimeout(() => {
        addMessage("Это ответ от бота на ваше сообщение: " + text, true);
      }, 1000);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <SelectDemo />
        <ToolbarDemo />
      </div>
      <div className={styles.chat}>
        {!isChatActive ? (
          <div className={styles.ai}>
            {RiveComponent && (
              <>
                <RiveComponent />
                {!hasMicAccess && (
                  <div className={styles.micAccessPrompt}>
                    <button onClick={() => navigator.mediaDevices.getUserMedia({ audio: true })
                      .then(() => setMicAccess(true))
                      .catch(err => console.error("Доступ к микрофону запрещен:", err))
                    }>
                      Разрешить доступ к микрофону
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className={styles.chatContainer}>
            <ChatMessages messages={messages} />
            <div className={styles.botAvatar}>
              {RiveComponent && <RiveComponent />}
            </div>
          </div>
        )}
        <ChatInput onSubmit={handleMessageSubmit} />
      </div>
      <Sidebar />
    </div>
  );
}
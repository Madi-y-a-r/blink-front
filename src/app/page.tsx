"use client";

import { useRive } from "@rive-app/react-canvas";
import Sidebar from "../components/Sidebar/Sidebar";
import SelectDemo from "../components/Select/Select";
import ToolbarDemo from "../components/Toolbar/Toolbar";
import styles from "./page.module.scss";
import ChatInput from "../components/Chat/Chat";
import { useChatStore } from "@/src/store/useChatStore";
import ChatMessages from "../components/Chat/ChatMessages";
import { 
  KanbanBoard, 
  Gantt, 
  WeeklyTasks, 
  DailyStandup, 
  Backlog, 
  MyTasks 
} from "../components/Tools/ToolComponents";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const { 
    isChatActive, 
    hasMicAccess, 
    messages,
    activeTool,
    setMicAccess, 
    addMessage,
    setChatActive 
  } = useChatStore();
  
  const [volume, setVolume] = useState(0);
  
  const animationFrameId = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const { rive, RiveComponent } = useRive({
    src: "/rive/ai_voice.riv",
    stateMachines: "bumpy",
    autoplay: true,
  });

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'kanban':
        return <KanbanBoard />;
      case 'gantt':
        return <Gantt />;
      case 'weekly':
        return <WeeklyTasks />;
      case 'daily':
        return <DailyStandup />;
      case 'backlog':
        return <Backlog />;
      case 'myTasks':
        return <MyTasks />;
      default:
        return null;
    }
  };

  const startAudioAnalysis = async () => {
    try {

      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach(track => track.stop());
      if (audioContextRef.current) audioContextRef.current.close();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;


      const audioCtx = new AudioContext();
      audioContextRef.current = audioCtx;
      

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyserRef.current = analyser;

      const micSource = audioCtx.createMediaStreamSource(stream);
      micSource.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateVolume = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);

        const avgVolume = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;
        setVolume(Math.min(1, avgVolume / 128)); 
        
        animationFrameId.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
      setMicAccess(true);
    } catch (err) {
      console.error("Ошибка доступа к микрофону:", err);
      setMicAccess(false);
    }
  };

  useEffect(() => {
    startAudioAnalysis();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach(track => track.stop());
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);
  
  const handleMessageSubmit = (text: string) => {
    if (text.trim()) {
      addMessage(text, false);
      
      if (!isChatActive) {
        setChatActive(true);
      }
      
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
        {isChatActive ? (
          <div className={styles.chatContainer}>
            <ChatMessages messages={messages} />
            <div className={styles.botAvatar}>
              {RiveComponent && (
                  <RiveComponent style={{ width: '50px', height: '50px' }}/>
              )}
            </div>
          </div>
        ) : activeTool !== 'none' ? (
          renderActiveTool()
        ) : (
          <div className={styles.ai}>
            {RiveComponent && (
              <>
                <motion.div
                  animate={{ scale: Math.min(1 + volume * 1.5, 2) }} 
                  transition={{ 
                    duration: 0.001, 
                    ease: "linear"
                  }}
                  style={{
                    width: 300,
                    height: 300,
                    transformOrigin: "center center",
                }}
                >
                  <RiveComponent />
                </motion.div>
                
                <div style={{ 
                  position: 'absolute', 
                  bottom: '-40px', 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  {/* <div style={{ 
                    width: `${Math.max(50, volume * 200)}px`, 
                    height: '10px', 
                    background: `rgb(${Math.floor(volume * 255)}, ${Math.floor(255 - volume * 255)}, 100)`,
                    borderRadius: '5px'
                  }} /> */}
                  
                  {!hasMicAccess && (
                    <button 
                      className={styles.micAccessPrompt}
                      onClick={startAudioAnalysis}
                    >
                      Разрешить доступ к микрофону
                    </button>
                  )}
  
                </div>
              </>
            )}
          </div>
        )}
        <ChatInput onSubmit={handleMessageSubmit} />
      </div>
      <Sidebar />
    </div>
  );
}
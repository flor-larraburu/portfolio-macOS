"use client";

import { useState, useEffect, JSX } from "react";
import { motion } from "framer-motion";
import { Apple, Globe, Terminal, Settings, Trash2, Battery, Wifi } from "lucide-react";

interface FolderItem {
  id: string;
  name: string;
  icon: string;
  content: JSX.Element;
}

interface OpenWindow {
  id: string;
  folder: FolderItem;
  position: { x: number; y: number };
  isActive: boolean;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  width: number;
  height: number;
}

const folders: FolderItem[] = [
  { 
    id: '1',
    name: "Experiencia", 
    icon: "/icons8-carpeta-mac-96.png",
    content: <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mi Experiencia</h2>
      <p>Contenido de experiencia...</p>
    </div>
  },
  { 
    id: '2',
    name: "Proyectos", 
    icon: "/icons8-carpeta-mac-96.png",
    content: <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mis Proyectos</h2>
      <p>Contenido de proyectos...</p>
    </div>
  },
  { 
    id: '3',
    name: "Audiovisual", 
    icon: "/icons8-carpeta-mac-96.png",
    content: <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Portfolio Audiovisual</h2>
      <p>Contenido audiovisual...</p>
    </div>
  },
];

const dockApps = [
  { name: "Finder", icon: <Globe size={40} /> },
  { name: "Terminal", icon: <Terminal size={40} /> },
  { name: "Settings", icon: <Settings size={40} /> },
  { name: "Trash", icon: <Trash2 size={40} /> },
];

export default function MacOSPortfolio() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [highestZIndex, setHighestZIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFolderClick = (folder: FolderItem) => {
    // Comprobar si la ventana ya está abierta
    const existingWindow = openWindows.find(w => w.folder.id === folder.id);
    if (existingWindow) {
      // Si está minimizada, restaurarla
      if (existingWindow.isMinimized) {
        handleRestoreWindow(existingWindow.id);
      }
      // Traerla al frente
      handleWindowFocus(existingWindow.id);
      return;
    }

    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);

    const newWindow: OpenWindow = {
      id: `window-${Date.now()}`,
      folder,
      position: { x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 },
      isActive: true,
      zIndex: newZIndex,
      isMinimized: false,
      isMaximized: false,
      width: 600,
      height: 400
    };

    setOpenWindows(prev => [...prev.map(w => ({ ...w, isActive: false })), newWindow]);
  };

  const handleWindowFocus = (windowId: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    setOpenWindows(prev => prev.map(window => ({
      ...window,
      isActive: window.id === windowId,
      zIndex: window.id === windowId ? newZIndex : window.zIndex
    })));
  };

  const handleCloseWindow = (windowId: string) => {
    setOpenWindows(prev => prev.filter(window => window.id !== windowId));
  };

  const handleMinimizeWindow = (windowId: string) => {
    setOpenWindows(prev => prev.map(window => 
      window.id === windowId 
        ? { ...window, isMinimized: true }
        : window
    ));
  };

  const handleMaximizeWindow = (windowId: string) => {
    setOpenWindows(prev => prev.map(window => 
      window.id === windowId 
        ? { ...window, isMaximized: !window.isMaximized }
        : window
    ));
  };

  const handleRestoreWindow = (windowId: string) => {
    setOpenWindows(prev => prev.map(window => 
      window.id === windowId 
        ? { ...window, isMinimized: false }
        : window
    ));
  };

  return (
    <div style={{ 
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(to bottom right, #4b6cb7, #8a2387, #e94057)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden'
    }}>
      {/* Top Menu Bar */}
      <div style={{
        width: '100%',
        height: '24px',
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        color: 'white',
        fontSize: '13px',
        zIndex: 9999
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Apple size={14} />
          <span style={{ fontWeight: 500 }}>Finder</span>
          <span>Archivo</span>
          <span>Editar</span>
          <span>Ver</span>
          <span>Ir</span>
          <span>Ventana</span>
          <span>Ayuda</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Battery size={14} />
          <Wifi size={14} />
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Desktop Area with Folders */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {folders.map((folder) => (
            <motion.div
              key={folder.id}
              whileHover={{ scale: 1.05 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '80px',
                cursor: 'pointer'
              }}
              onClick={() => handleFolderClick(folder)}
            >
              <img 
                src={folder.icon} 
                alt={folder.name} 
                style={{ width: '48px', height: '48px' }}
              />
              <span style={{
                color: 'white',
                marginTop: '5px',
                fontSize: '12px',
                textAlign: 'center',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}>
                {folder.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Windows */}
      {openWindows.map((window) => (
        <motion.div
          key={window.id}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ 
            scale: window.isMinimized ? 0.5 : 1,
            opacity: window.isMinimized ? 0 : 1,
            x: window.position.x,
            y: window.position.y,
            width: window.isMaximized ? '100%' : window.width,
            height: window.isMaximized ? '100%' : window.height,
            top: window.isMaximized ? '24px' : '50%',
            left: window.isMaximized ? '0' : '50%',
          }}
          drag={!window.isMaximized}
          dragMomentum={false}
          dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
          style={{
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            display: window.isMinimized ? 'none' : 'flex',
            flexDirection: 'column',
            zIndex: window.zIndex,
            transform: `translate(-50%, -50%)`,
            overflow: 'hidden'
          }}
          onClick={() => handleWindowFocus(window.id)}
        >
          {/* Window Header */}
          <div style={{
            height: '32px',
            background: window.isActive ? '#E6E6E6' : '#F5F5F5',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            position: 'relative'
          }}>
            {/* Traffic Lights */}
            <div style={{ display: 'flex', gap: '8px', zIndex: 1 }}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseWindow(window.id);
                }}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#FF5F57',
                  border: '1px solid #E1483D',
                  cursor: 'pointer'
                }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMinimizeWindow(window.id);
                }}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#FEBC2E',
                  border: '1px solid #E1A116',
                  cursor: 'pointer'
                }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMaximizeWindow(window.id);
                }}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#28C940',
                  border: '1px solid #1AAA2F',
                  cursor: 'pointer'
                }}
              />
            </div>
            
            {/* Window Title */}
            <div style={{
              position: 'absolute',
              width: '100%',
              textAlign: 'center',
              left: 0,
              color: '#4A4A4A',
              fontSize: '13px',
              fontWeight: 500,
              pointerEvents: 'none'
            }}>
              {window.folder.name}
            </div>
          </div>

          {/* Window Content */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto'
          }}>
            {window.folder.content}
          </div>
        </motion.div>
      ))}

      {/* Dock */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        padding: '8px',
        display: 'flex',
        gap: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        {dockApps.map((app) => (
          <motion.div
            key={app.name}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{
              width: '50px',
              height: '50px',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {app.icon}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
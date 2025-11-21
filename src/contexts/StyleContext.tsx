import { createContext, useContext, useEffect, useState } from 'react';

type StyleMode = 'classic' | 'modern';

interface StyleContextType {
  styleMode: StyleMode;
  toggleStyleMode: () => void;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export function StyleProvider({ children }: { children: React.ReactNode }) {
  const [styleMode, setStyleMode] = useState<StyleMode>(() => {
    const saved = localStorage.getItem('styleMode');
    return (saved as StyleMode) || 'classic';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('classic', 'modern');
    root.classList.add(styleMode);
    localStorage.setItem('styleMode', styleMode);
  }, [styleMode]);

  const toggleStyleMode = () => {
    setStyleMode(prev => prev === 'classic' ? 'modern' : 'classic');
  };

  return (
    <StyleContext.Provider value={{ styleMode, toggleStyleMode }}>
      {children}
    </StyleContext.Provider>
  );
}

export function useStyle() {
  const context = useContext(StyleContext);
  if (context === undefined) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
}

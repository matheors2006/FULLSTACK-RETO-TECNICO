import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type ThemeKey = 'rojoFuego' | 'verdeHoja' | 'rubiOmega' | 'zafiroAlfa' | 'blanco' | 'negro';

interface Theme {
  name: string;
  vars: Record<string, string>;
}
const themes: Record<ThemeKey, Theme> = {
  rojoFuego: {
    name: 'Rojo Fuego',
    vars: {
      '--bg-app': 'linear-gradient(135deg, #ffccbc 0%, #ff8a65 100%)', // Naranja/melocotón intenso
      '--primary': '#d84315', // Rojo fuego oscuro para Navbar
      '--text-main': '#3e2723',
      '--text-muted': '#5d4037',
      '--card-bg': '#ffffff',
      '--font-main': 'system-ui, sans-serif'
    }
  },
  verdeHoja: {
    name: 'Verde Hoja',
    vars: {
      '--bg-app': 'linear-gradient(135deg, #c8e6c9 0%, #81c784 100%)', // Verde hoja profundo
      '--primary': '#2e7d32', // Verde oscuro forestal
      '--text-main': '#1b5e20',
      '--text-muted': '#388e3c',
      '--card-bg': '#ffffff',
      '--font-main': '"Trebuchet MS", sans-serif'
    }
  },
  rubiOmega: {
    name: 'Rubí Omega',
    vars: {
      '--bg-app': 'linear-gradient(135deg, #ffcdd2 0%, #e57373 100%)', // Rojo rubí pastel fuerte
      '--primary': '#c62828', // Rojo sangre intenso
      '--text-main': '#4a148c',
      '--text-muted': '#7b1fa2',
      '--card-bg': '#ffffff',
      '--font-main': 'Georgia, serif'
    }
  },
  zafiroAlfa: {
    name: 'Zafiro Alfa',
    vars: {
      '--bg-app': 'linear-gradient(135deg, #bbdefb 0%, #64b5f6 100%)', // Azul océano marcado
      '--primary': '#1565c0', // Azul marino profundo
      '--text-main': '#0d47a1',
      '--text-muted': '#1976d2',
      '--card-bg': '#ffffff',
      '--font-main': '"Lucida Console", Monaco, monospace'
    }
  },
  blanco: {
    name: 'Pokémon Blanco',
    vars: {
      '--bg-app': 'linear-gradient(135deg, #eceff1 0%, #b0bec5 100%)', // Gris azulado metálico
      '--primary': '#546e7a', // Gris oscuro
      '--text-main': '#263238',
      '--text-muted': '#455a64',
      '--card-bg': '#ffffff',
      '--font-main': 'Arial, sans-serif'
    }
  },
  negro: {
    name: 'Pokémon Negro',
    vars: {
      '--bg-app': 'linear-gradient(135deg, #424242 0%, #212121 100%)', // Oscuridad total elegante
      '--primary': '#000000', // Negro puro para Navbar
      '--text-main': '#f5f5f5', // Texto blanco puro para legibilidad
      '--text-muted': '#bdbdbd',
      '--card-bg': '#616161', // Tarjetas en gris oscuro (Dark mode real)
      '--font-main': '"Courier New", Courier, monospace'
    }
  }
};

interface ThemeContextProps {
  currentThemeKey: ThemeKey;
  changeTheme: (theme: ThemeKey) => void;
  availableThemes: { key: ThemeKey; name: string }[];
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Leemos el tema de localStorage, con 'rojoFuego' como default
  const [currentThemeKey, setCurrentThemeKey] = useState<ThemeKey>(() => {
    return (localStorage.getItem('theme') as ThemeKey) || 'rojoFuego';
  });

  useEffect(() => {
    const themeVars = themes[currentThemeKey].vars;
    const root = document.documentElement;
    
    // Inyectamos las variables CSS globalmente
    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Forzamos al body a heredar la fuente, color y fondo principal
    document.body.style.background = themeVars['--bg-app'];
    document.body.style.color = themeVars['--text-main'];
    document.body.style.fontFamily = themeVars['--font-main'];
    document.body.style.margin = '0';
    document.body.style.minHeight = '100vh';
    document.body.style.transition = 'background 0.4s ease, color 0.4s ease';

    // Guardamos la elección del usuario
    localStorage.setItem('theme', currentThemeKey);
  }, [currentThemeKey]);

  const availableThemes = Object.entries(themes).map(([key, theme]) => ({
    key: key as ThemeKey,
    name: theme.name
  }));

  return (
    <ThemeContext.Provider value={{ currentThemeKey, changeTheme: setCurrentThemeKey, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  return context;
};
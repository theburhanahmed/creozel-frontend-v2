import React, { useEffect, useState, createContext } from 'react';
type Theme = 'dark' | 'light' | 'system';
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}
interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}
export const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: 'system',
  setTheme: () => null,
  isDarkMode: false
});
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => localStorage.getItem(storageKey) as Theme || defaultTheme);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  useEffect(() => {
    const root = window.document.documentElement;
    // Remove previous theme classes
    root.classList.remove('light', 'dark');
    // Check for system preference
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      setIsDarkMode(systemTheme === 'dark');
      return;
    }
    // Add selected theme class
    root.classList.add(theme);
    setIsDarkMode(theme === 'dark');
  }, [theme]);
  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);
  // Listen for system preference changes
  useEffect(() => {
    if (theme !== 'system') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = window.document.documentElement;
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
      setIsDarkMode(systemTheme === 'dark');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);
  const value = {
    theme,
    setTheme,
    isDarkMode
  };
  return <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>;
}
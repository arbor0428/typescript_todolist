import React, { createContext, useContext, useEffect, useState } from 'react';

interface DarkModeContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);
    
    const toggleDarkMode = () => {
        setDarkMode(prevDarkMode => {
            const newDarkMode = !prevDarkMode;
            updateDarkMode(newDarkMode);
            return newDarkMode;
        });
    };

    useEffect(() => {
        const isDark =
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);
        setDarkMode(isDark);
        updateDarkMode(isDark);
    }, []);

    return (
        <DarkModeContext.Provider
            value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

function updateDarkMode(darkMode: boolean) {
    if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    }
}

export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
};

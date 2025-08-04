'use client';

import { ReactNode, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../presentation/pages/home/styles/themes.css";
import { ThemeContext } from "../presentation/contexts/theme-context";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const storedTheme = localStorage.getItem("isDark");
        if (storedTheme) {
            setIsDark(JSON.parse(storedTheme));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("isDark", JSON.stringify(isDark));
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark((prev) => !prev);
    };

    const themeClass = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            <div className={themeClass}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}
//a gnt cria esse theme provider pra envolver o projeto inteiro nele, chamando la no layout.tsx da base, fazendo com que envolva todo o body e que busque sempre no localStorage se isDark é t rue ou false, mudando as classes e assim mudando os estilos

//esse componente de dark mode eu ja tinh pronto em um projeto meu que estou fazendo de um dashboard de investimentos, só tive que adaptar um pouco as pastas e as importações
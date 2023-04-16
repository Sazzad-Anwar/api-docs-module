import { useEffect, useState } from 'react';

export default function useThemeToggler() {
    let [theme, setTheme] = useState<'dark' | 'light'>();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (
                localStorage.theme === 'dark' ||
                (!('theme' in localStorage) &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches)
            ) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                setTheme('dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                setTheme('light');
            }
        }
    }, []);

    let toggleTheme = () => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('theme') === 'dark') {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                setTheme('light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                setTheme('dark');
            }
        }
    };

    return { theme, toggleTheme };
}

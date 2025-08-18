import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document
            .querySelector('html')
            .setAttribute('data-theme', dark ? 'dark' : 'light');
    }, [dark]);

    return (
        <label className="cursor-pointer flex items-center gap-1 md:gap-2 md:ml-2">
            <span>☀️</span>
            <input
                type="checkbox"
                className="toggle text-[10px]  md:text-[15px] border border-primary"
                onChange={() => setDark(!dark)}
            />
            <span>🌙</span>
        </label>
    );
};

export default ThemeToggle;

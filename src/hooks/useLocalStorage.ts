import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T) {
    const [value, setValue] = useState<T>(() => {
        const storedValue = localStorage.getItem(key);

        if (storedValue === null) {
            return defaultValue;
        }

        try {
            return JSON.parse(storedValue) as T;
        } catch {
            return defaultValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}
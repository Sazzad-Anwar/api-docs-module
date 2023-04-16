import { useEffect, useState } from 'react';

export default function useDeviceWidth() {
    const [isMobileWidth, setIsMobileWidth] = useState<boolean>(false);
    const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        function handleResize() {
            setWindowSize(window.innerWidth);
            if (window.innerWidth <= 1200) {
                setIsMobileWidth(true);
            } else {
                setIsMobileWidth(false);
            }
        }
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { isMobileWidth, windowSize };
}

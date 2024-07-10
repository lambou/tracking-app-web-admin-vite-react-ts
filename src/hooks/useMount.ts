import { useEffect, useRef, useState } from "react";

export default function useMount() {
    const initiated = useRef<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        if (!initiated.current) {
            initiated.current = true;
            setMounted(true);
        }
    }, []);

    return { mounted }
}
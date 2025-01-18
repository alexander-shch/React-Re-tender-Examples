import { useEffect, useRef } from "react";

export const useRerenderHook = () => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (elementRef.current) {
            // Add the class
            elementRef.current.classList.add("highlight");

            // Remove the class after animation
            const timer = setTimeout(() => {
                if (elementRef.current) {
                    elementRef.current.classList.remove("highlight");
                }
            }, 300);

            return () => clearTimeout(timer);
        }
    });

    return { ref: elementRef };
};
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollReveal = () => {
    const location = useLocation();

    useEffect(() => {
        const elements = document.querySelectorAll(".animate");

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [location.pathname]); // 👈 KEY FIX
};

export default useScrollReveal;

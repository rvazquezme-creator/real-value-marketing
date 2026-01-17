import PageWrapper from "../components/layout/PageWrapper";

import Hero from "../components/marketing/Hero";
import ServicesGrid from "../components/marketing/ServicesGrid";
import ProcessSteps from "../components/marketing/ProcessSteps";
import Testimonials from "../components/marketing/Testimonials";
import CTASection from "../components/marketing/CTASection";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (!hash) return;

        const el = document.querySelector(hash);
        if (el) {
            // pequeño delay para asegurar que todo esté renderizado
            setTimeout(() => {
                el.scrollIntoView({ behavior: "smooth" });
            }, 50);
        }
    }, [hash]);

    return null;
};

const Home = () => {
    return (
        <>
            <ScrollToHash />

            <Hero />

            <PageWrapper>
                <div className="animate" style={{ animationDelay: "0ms" }}>
                    <ServicesGrid />
                </div>

                <div className="animate" style={{ animationDelay: "120ms" }}>
                    <ProcessSteps />
                </div>

                <div className="animate" style={{ animationDelay: "240ms" }}>
                    <Testimonials />
                </div>
            </PageWrapper>

            <CTASection />
        </>
    );
};

export default Home;

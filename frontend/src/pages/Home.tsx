import PageWrapper from "../components/layout/PageWrapper";

import Hero from "../components/marketing/Hero";
import ServicesGrid from "../components/marketing/ServicesGrid";
import ProcessSteps from "../components/marketing/ProcessSteps";
import Testimonials from "../components/marketing/Testimonials";
import CTASection from "../components/marketing/CTASection";

const Home = () => {
    return (
        <>
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

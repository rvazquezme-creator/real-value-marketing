import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-text animate">
                <h1>
                    Predictable Lead Generation
                    <br />
                    For Growing Businesses
                </h1>

                <p>
                    We help companies build scalable marketing systems that consistently
                    generate qualified leads — without wasting ad spend.
                </p>

                <Link className="button" to="/book-a-call">
                    Book a Call
                </Link>
            </div>

            <div className="hero-visual animate">
                <div className="hero-mockup">
                    <div className="mockup-card" />
                    <div className="mockup-card secondary" />
                </div>
            </div>
        </section>
    );
};

export default Hero;

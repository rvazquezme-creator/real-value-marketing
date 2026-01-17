import { Link } from "react-router-dom";
import logo from "../../assets/logos/RVM_Logo.png";


const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-text animate">
                <h1>
                    20% More PMU Customers in 90 days - Guaranteed
                </h1>

                <p>
                    We'll get your PMU business (US only) 20% more clients and Top 10 Google Maps results within 90 days for your service area—or we work for free until you do.
                </p>

                <Link className="button" to="/#cta">
                    Get The FREE Analysis
                </Link>
            </div>

            <div className="hero-visual animate">
                <div className="hero-mockup">
                    <div className="mockup-card" >
                        <img src={logo} alt="Real Value Marketing logo" className="hero-media" />
                    </div>
                    <div className="mockup-card secondary" >
                        {/* <img src={logo} alt="Real Value Marketing logo" /> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

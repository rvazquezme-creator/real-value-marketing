import { Link } from "react-router-dom";
import logo from "../../assets/logos/RVM_Logo.png";


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

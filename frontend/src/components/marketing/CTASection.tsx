import { Link } from "react-router-dom";

const CTASection = () => {
    return (
        <section id="cta" className="cta-section">
            <div className="cta-card">
                <div className="cta-badge">Free Analysis</div>

                <h2 className="cta-title">
                    Get a Free Growth Analysis for Your Business
                </h2>

                <p className="cta-description">
                    Share your business details and we’ll personally record a short
                    video explaining what needs to happen to increase your visibility
                    and generate more customers within 90 days.
                </p>

                <p className="cta-subtext">
                    No cost. No obligation.
                </p>

                <Link className="button cta-button" to="/book-a-call">
                    Get Your FREE Analysis
                </Link>
            </div>
        </section>
    );
};

export default CTASection;

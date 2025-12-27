import { Link } from "react-router-dom";

const CTASection = () => {
    return (
        <section
            style={{
                // backgroundColor: "#0f172a",
                color: "#ffffff",
                padding: "6rem 1.5rem",
                textAlign: "center",
            }}
        >
            <h2 style={{ color: "#ffffff" }}>
                Ready to Build a Predictable Growth System?
            </h2>

            <p style={{ color: "#cbd5f5", margin: "1.5rem auto 2.5rem" }}>
                Apply to work with us and see if we’re a good fit.
            </p>

            <Link className="button" to="/book-a-call">
                Book a Call
            </Link>
        </section>
    );
};

export default CTASection;

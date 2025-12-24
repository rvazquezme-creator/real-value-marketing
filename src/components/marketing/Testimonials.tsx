const testimonials = [
    {
        quote:
            "We tripled our qualified leads in less than 60 days.",
        author: "Marketing Director",
        company: "B2B SaaS Company",
    },
    {
        quote:
            "Finally a system that delivers predictable results.",
        author: "Founder",
        company: "Professional Services Firm",
    },
];

const Testimonials = () => {
    return (
        <section>
            <h2>Results & Testimonials</h2>

            <div className="cards-grid">
                {testimonials.map((t, index) => (
                    <div
                        key={index}
                        className="card animate"
                        style={{ animationDelay: `${index * 120}ms` }}
                    >
                        <p>“{t.quote}”</p>
                        <strong>{t.author}</strong>
                        <span>{t.company}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;

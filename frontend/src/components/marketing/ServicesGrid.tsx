const services = [
    {
        title: "Lead Generation Systems",
        description:
            "We design predictable systems that turn traffic into qualified leads.",
    },
    {
        title: "Paid Ads Optimization",
        description:
            "We scale what works and cut what doesn’t using data-driven decisions.",
    },
    {
        title: "Conversion Rate Optimization",
        description:
            "We increase conversion across funnels, landing pages, and offers.",
    },
];

const ServicesGrid = () => {
    return (
        <section>
            <h2>What We Do</h2>

            <div className="cards-grid">
                {services.map((service, index) => (
                    <div
                        key={service.title}
                        className="card animate"
                        style={{ animationDelay: `${index * 120}ms` }}
                    >
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicesGrid;

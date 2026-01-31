const services = [
    {
        title: "Targeted Marketing",
        description:
            "We run Facebook and Google campaings targeted only to get paid clients on your local area.",
    },
    {
        title: "We turn attention into $",
        description:
            "We'll show you a simple system to close high value clients and disregard time wasters.",
    },
    {
        title: "Google Business Profile ranked on top 10",
        description:
            "We'll get your GBP ranked higher, to build local authority and attract more high value customers.",
    },
];

const ServicesGrid = () => {
    return (
        <section>
            <h2>How do we get you more clients?</h2>

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

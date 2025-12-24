import { useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import type { NewsletterFormData } from "../types/forms";
import { Link } from "react-router-dom";

const Newsletter = () => {
    const [formData, setFormData] = useState<NewsletterFormData>({
        name: "",
        email: "",
    });

    const [errors, setErrors] = useState<Partial<NewsletterFormData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Partial<NewsletterFormData> = {};

        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) newErrors.email = "Email is required.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        console.log("Newsletter subscription:", formData);
    };

    return (
        <PageWrapper>
            <h1>Join Our Newsletter</h1>
            <p>
                Get practical growth insights, experiments, and strategies we use with
                real clients.
            </p>

            <form className="animate" onSubmit={handleSubmit}>
                <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <div className="error">{errors.name}</div>}

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}

                <Button type="submit">Subscribe</Button>
            </form>

            <section style={{ marginTop: "4rem", textAlign: "center" }}>
                <p>Want help implementing these strategies?</p>
                <Link to="/book-a-call">Book a Call</Link>
            </section>
        </PageWrapper>
    );
};

export default Newsletter;

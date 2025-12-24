import { useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";

import Input from "../components/ui/Input";
import TextArea from "../components/ui/TextArea";
import Button from "../components/ui/Button";

import type { BookCallFormData } from "../types/forms";

const faqs = [
    {
        q: "Is this really free?",
        a: "Yes. The initial call is completely free and without any obligation.",
    },
    {
        q: "How long does the call take?",
        a: "Usually between 30 and 45 minutes.",
    },
    {
        q: "Who is this for?",
        a: "This is for businesses already generating revenue that want predictable growth.",
    },
    {
        q: "Will you try to sell me something?",
        a: "No pressure. If we’re not a good fit, we’ll tell you.",
    },
];

const BookCall = () => {
    const [formData, setFormData] = useState<BookCallFormData>({
        name: "",
        businessEmail: "",
        phoneNumber: "",
        website: "",
        companyName: "",
        canAffordTrial: "yes",
        currentProblem: "",
        solveTimeline: "today",
    });

    const [errors, setErrors] = useState<Partial<BookCallFormData>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Partial<BookCallFormData> = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.businessEmail)
            newErrors.businessEmail = "Business email is required.";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        console.log("Book a Call submission:", formData);
    };

    return (
        <PageWrapper>
            <section className="book-call-grid">
                {/* LEFT */}
                <div className="book-call-copy">
                    <h1>Book a Call</h1>
                    <h2>Let’s Make Money</h2>
                    <p>
                        Fill out the form and we’ll contact you within 48 hours to find out
                        if we can help you.
                    </p>
                    <p>
                        No costs. No obligations. No annoying sales pitch.
                        <br />
                        <strong>Guaranteed.</strong>
                    </p>
                </div>

                {/* RIGHT */}
                <div className="book-call-form">
                    <form className="animate" onSubmit={handleSubmit}>
                        <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <div className="error">{errors.name}</div>}

                        <Input
                            label="Business Email"
                            name="businessEmail"
                            type="email"
                            value={formData.businessEmail}
                            onChange={handleChange}
                        />
                        {errors.businessEmail && (
                            <div className="error">{errors.businessEmail}</div>
                        )}

                        <Input
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />

                        <Input
                            label="Website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                        />

                        <Input
                            label="Company Name"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                        />

                        <fieldset>
                            <legend>Can you afford a $997 USD 30-day paid trial?</legend>
                            <label>
                                <input
                                    type="radio"
                                    name="canAffordTrial"
                                    value="yes"
                                    checked={formData.canAffordTrial === "yes"}
                                    onChange={handleChange}
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="canAffordTrial"
                                    value="no"
                                    checked={formData.canAffordTrial === "no"}
                                    onChange={handleChange}
                                />
                                No
                            </label>
                        </fieldset>

                        <TextArea
                            label="What problem are you experiencing?"
                            name="currentProblem"
                            value={formData.currentProblem}
                            onChange={handleChange}
                        />

                        <fieldset>
                            <legend>When do you want to solve this?</legend>
                            <label>
                                <input
                                    type="radio"
                                    name="solveTimeline"
                                    value="today"
                                    checked={formData.solveTimeline === "today"}
                                    onChange={handleChange}
                                />
                                Today
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="solveTimeline"
                                    value="tomorrow"
                                    checked={formData.solveTimeline === "tomorrow"}
                                    onChange={handleChange}
                                />
                                Tomorrow
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="solveTimeline"
                                    value="few_weeks"
                                    checked={formData.solveTimeline === "few_weeks"}
                                    onChange={handleChange}
                                />
                                In a few weeks
                            </label>
                        </fieldset>

                        <Button type="submit">Submit Application</Button>
                    </form>
                </div>
            </section>

            {/* FAQ */}
            <section className="book-call-faq">
                <h2>Frequently Asked Questions</h2>
                {faqs.map((f, i) => (
                    <div key={i} className="faq-item">
                        <strong>{f.q}</strong>
                        <p>{f.a}</p>
                    </div>
                ))}
            </section>
        </PageWrapper>
    );
};

export default BookCall;

import { useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";

import Input from "../components/ui/Input";
import TextArea from "../components/ui/TextArea";
import Button from "../components/ui/Button";

import type { BookCallFormData } from "../types/forms";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3001";

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

const initialFormState: BookCallFormData = {
    name: "",
    businessEmail: "",
    phoneNumber: "",
    website: "",
    companyName: "",
    canAffordTrial: "yes",
    currentProblem: "",
    solveTimeline: "today",
};

const BookCall = () => {
    const [formData, setFormData] =
        useState<BookCallFormData>(initialFormState);

    const [errors, setErrors] =
        useState<Partial<BookCallFormData>>({});

    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error as user types
        if (errors[name as keyof BookCallFormData]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const validate = () => {
        const newErrors: Partial<BookCallFormData> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        }

        if (!formData.businessEmail.trim()) {
            newErrors.businessEmail = "Business email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)
        ) {
            newErrors.businessEmail = "Enter a valid email address.";
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        try {
            setSubmitting(true);
            setSubmitError(null);

            const res = await fetch(`${API_URL}/api/book-call`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("API request failed");
            }

            setSubmitSuccess(true);
            setFormData(initialFormState);
        } catch (err) {
            console.error(err);
            setSubmitError(
                "Something went wrong. Please try again later."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <PageWrapper>
            <section className="book-call-grid">
                {/* LEFT */}
                <div className="book-call-copy">
                    <h1>Book a Call</h1>
                    <h2>Let’s Make Money</h2>
                    <p>
                        Fill out the form and we’ll contact you within 48 hours to find
                        out if we can help you.
                    </p>
                    <p>
                        No costs. No obligations. No annoying sales pitch.
                        <br />
                        <strong>Guaranteed.</strong>
                    </p>
                </div>

                {/* RIGHT */}
                <div className="book-call-form">
                    <form className="animate" onSubmit={handleSubmit} noValidate>
                        <Input
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
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

                        {submitError && <div className="error">{submitError}</div>}
                        {submitSuccess && (
                            <div className="success">
                                Thank you! We’ll be in touch shortly.
                            </div>
                        )}

                        <Button type="submit" disabled={submitting}>
                            {submitting ? "Submitting..." : "Submit Application"}
                        </Button>
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

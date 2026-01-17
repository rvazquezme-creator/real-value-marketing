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
    googleMapsLink: "",
    canAffordTrial: "yes",
    currentProblem: "",
    solveTimeline: "today",
};

type FormErrors = Partial<Record<keyof BookCallFormData, string>>;

const BookCall = () => {
    const [formData, setFormData] =
        useState<BookCallFormData>(initialFormState);

    const [errors, setErrors] = useState<FormErrors>({});

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

        if (errors[name as keyof BookCallFormData]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const validate = () => {
        const newErrors: FormErrors = {};

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

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required.";
        }

        if (!formData.website.trim()) {
            newErrors.website = "Website is required.";
        }

        if (!formData.googleMapsLink.trim()) {
            newErrors.googleMapsLink = "Google Maps link is required.";
        } else if (!formData.googleMapsLink.includes("google.com/maps")) {
            newErrors.googleMapsLink = "Enter a valid Google Maps URL.";
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = "Company name is required.";
        }

        if (!formData.solveTimeline) {
            newErrors.solveTimeline = "Please select a timeline.";
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
                    <div className="free-stuff">Free Stuff</div>
                    <h1 className="book-call-h1">Get Your Profile Analyzed</h1>
                    <h2>Let’s Make Money</h2>
                    <p>
                        Fill out the form to see if you area is still available. If it is,
                        we'll tell you the exact things that need to happen so you can get
                        20% more customers.
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
                            name="name"
                            placeholder="Your Name*"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className="error">{errors.name}</div>}

                        <Input
                            name="businessEmail"
                            type="email"
                            placeholder="Business Email*"
                            value={formData.businessEmail}
                            onChange={handleChange}
                        />
                        {errors.businessEmail && (
                            <div className="error">{errors.businessEmail}</div>
                        )}

                        <Input
                            name="phoneNumber"
                            placeholder="Phone Number*"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}

                        <Input
                            name="website"
                            placeholder="Website*"
                            value={formData.website}
                            onChange={handleChange}
                        />
                        {errors.website && <div className="error">{errors.website}</div>}

                        <Input
                            name="googleMapsLink"
                            type="url"
                            placeholder="Your Google Maps URL*"
                            value={formData.googleMapsLink}
                            onChange={handleChange}
                        />
                        {errors.googleMapsLink && (
                            <div className="error">{errors.googleMapsLink}</div>
                        )}

                        <Input
                            name="companyName"
                            placeholder="Company Name*"
                            value={formData.companyName}
                            onChange={handleChange}
                        />
                        {errors.companyName && (
                            <div className="error">{errors.companyName}</div>
                        )}

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
                        {errors.solveTimeline && (
                            <div className="error">{errors.solveTimeline}</div>
                        )}


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

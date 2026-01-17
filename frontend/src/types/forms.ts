export type TrialAffordability = "yes" | "no";
export type SolveTimeline = "today" | "tomorrow" | "few_weeks";

export interface BookCallFormData {
    name: string;
    businessEmail: string;
    phoneNumber: string;
    website: string;
    googleMapsLink: string;
    companyName: string;
    canAffordTrial: TrialAffordability;
    solveTimeline: SolveTimeline;
    currentProblem?: string;
}

export interface NewsletterFormData {
    name: string;
    email: string;
}

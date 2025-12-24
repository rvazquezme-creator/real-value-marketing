export type TrialAffordability = "yes" | "no";
export type SolveTimeline = "today" | "tomorrow" | "few_weeks";

export interface BookCallFormData {
    name: string;
    businessEmail: string;
    phoneNumber: string;
    website: string;
    companyName: string;
    canAffordTrial: TrialAffordability;
    currentProblem: string;
    solveTimeline: SolveTimeline;
}

export interface NewsletterFormData {
    name: string;
    email: string;
}

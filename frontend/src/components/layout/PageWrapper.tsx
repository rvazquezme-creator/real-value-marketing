import type { ReactNode } from "react";

interface PageWrapperProps {
    children: ReactNode;
    className?: string;
}

const PageWrapper = ({ children, className = "" }: PageWrapperProps) => {
    return (
        <main
            className={className}
            style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "4rem 1.5rem",
            }}
        >
            {children}
        </main>
    );
};

export default PageWrapper;

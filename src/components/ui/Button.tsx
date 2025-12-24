interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit";
}

const Button = ({ children, type = "button" }: ButtonProps) => {
    return (
        <button
            type={type}
            style={{
                padding: "0.75rem 1.5rem",
                marginTop: "1rem",
                cursor: "pointer",
            }}
        >
            {children}
        </button>
    );
};

export default Button;

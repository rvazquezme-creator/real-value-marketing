import React from "react";

export type ButtonProps =
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: "primary" | "secondary";
    };

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    ...props
}) => {
    return (
        <button
            className={`button ${variant}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

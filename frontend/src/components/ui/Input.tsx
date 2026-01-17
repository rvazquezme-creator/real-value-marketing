import React from "react";

interface InputProps {
    label?: string;
    name: string;
    type?: string;
    value: string;
    placeholder?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    required?: boolean;
    ariaInvalid?: boolean;
}

const Input = ({ label, ariaInvalid, ...props }: InputProps) => {
    return (
        <label style={{ display: "block", marginBottom: "1rem" }}>
            {label && <span>{label}</span>}
            <input
                {...props}
                aria-invalid={ariaInvalid}
                style={{
                    display: "block",
                    width: "100%",
                    padding: "0.5rem",
                }}
            />
        </label>
    );
};

export default Input;

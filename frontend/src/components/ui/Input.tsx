interface InputProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const Input = ({ label, ...props }: InputProps) => {
    return (
        <label style={{ display: "block", marginBottom: "1rem" }}>
            <span>{label}</span>
            <input
                {...props}
                style={{ display: "block", width: "100%", padding: "0.5rem" }}
            />
        </label>
    );
};

export default Input;

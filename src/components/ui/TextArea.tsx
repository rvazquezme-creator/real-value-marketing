interface TextAreaProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
}

const TextArea = ({ label, ...props }: TextAreaProps) => {
    return (
        <label style={{ display: "block", marginBottom: "1rem" }}>
            <span>{label}</span>
            <textarea
                {...props}
                rows={4}
                style={{ display: "block", width: "100%", padding: "0.5rem" }}
            />
        </label>
    );
};

export default TextArea;

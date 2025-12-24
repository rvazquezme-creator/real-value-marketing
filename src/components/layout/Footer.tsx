const Footer = () => {
    return (
        <footer
            style={{
                padding: "2rem",
                marginTop: "4rem",
                borderTop: "1px solid #e5e5e5",
                textAlign: "center",
            }}
        >
            <p>© {new Date().getFullYear()} Real Value Marketing</p>
        </footer>
    );
};

export default Footer;

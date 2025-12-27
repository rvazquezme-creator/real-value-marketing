const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <p>© {new Date().getFullYear()} Real Value Marketing</p>

                <div className="footer-socials">
                    <a
                        href="https://www.linkedin.com/company/110420032/admin/dashboard/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-.9 1.9-2.3 4-2.3 4.3 0 5.1 2.8 5.1 6.5V24h-4v-7.9c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.2V24h-4V8z" />
                        </svg>
                    </a>

                    <a
                        href="https://www.facebook.com/profile.php?id=100068876708377"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.337v21.326C0 23.4.6 24 1.325 24h11.49v-9.294H9.691V11.41h3.124V8.797c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.296h-3.12V24h6.116C23.4 24 24 23.4 24 22.663V1.337C24 .6 23.4 0 22.675 0z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`navbar ${open ? "open" : ""} ${scrolled ? "scrolled" : ""}`}>
            <div className="nav-inner">
                <Link to="/" className="logo">
                    Real Value Marketing
                </Link>

                <button
                    className="menu-toggle"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                </button>

                <ul className={`nav-links ${open ? "show" : ""}`}>
                    <li>
                        <Link to="/blog" onClick={() => setOpen(false)}>Blog</Link>
                    </li>
                    <li>
                        <Link to="/newsletter" onClick={() => setOpen(false)}>Newsletter</Link>
                    </li>
                    <li>
                        <Link to="/book-a-call" onClick={() => setOpen(false)}>Book a Call</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

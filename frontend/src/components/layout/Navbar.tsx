import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logos/RVM_Logo.png";

const HIDE_AFTER_Y = 120;

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

    const lastY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        lastY.current = window.scrollY;

        const update = () => {
            const y = window.scrollY;

            // Keep visible near the top
            if (y < HIDE_AFTER_Y) {
                setHidden(false);
                lastY.current = y;
                ticking.current = false;
                return;
            }

            // If menu open, never hide
            if (open) {
                setHidden(false);
                lastY.current = y;
                ticking.current = false;
                return;
            }

            // Hide only while scrolling down; show on any scroll up
            if (y > lastY.current) setHidden(true);
            if (y < lastY.current) setHidden(false);

            lastY.current = y;
            ticking.current = false;
        };

        const onScroll = () => {
            if (!ticking.current) {
                ticking.current = true;
                requestAnimationFrame(update);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [open]);

    return (
        <nav className={`navbar ${hidden ? "navbar-hidden" : ""} ${open ? "open" : ""}`}>
            <div className="nav-inner">
                <Link to="/" className="logo" onClick={() => setOpen(false)}>
                    <img src={logo} alt="Real Value Marketing logo" />
                </Link>

                <button
                    className="menu-toggle"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                </button>

                <ul className={`nav-links ${open ? "show" : ""}`}>
                    <li>
                        <Link to="/blog" onClick={() => setOpen(false)}>
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link to="/newsletter" onClick={() => setOpen(false)}>
                            Newsletter
                        </Link>
                    </li>
                    <li>
                        <Link to="/book-a-call" className="nav-cta" onClick={() => setOpen(false)}>
                            Get Your FREE Analysis
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

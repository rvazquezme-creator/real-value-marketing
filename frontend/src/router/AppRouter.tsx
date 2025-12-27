import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Newsletter from "../pages/Newsletter";
import BookCall from "../pages/BookCall";
import BlogList from "../pages/Blog/BlogList";
import BlogPost from "../pages/Blog/BlogPost";

const AppRouter = () => {
    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Newsletter */}
            <Route path="/newsletter" element={<Newsletter />} />

            {/* Blog */}
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* Book a Call */}
            <Route path="/book-a-call" element={<BookCall />} />

            {/* Fallback */}
            <Route path="*" element={<Home />} />
        </Routes>
    );
};

export default AppRouter;

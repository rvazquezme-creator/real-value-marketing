import PageWrapper from "../../components/layout/PageWrapper";
import { Link } from "react-router-dom";

import { blogPosts } from "../../data/blogPosts";

const BlogList = () => {
    return (
        <PageWrapper>
            <h1>Blog</h1>
            <p>Insights, strategies, and experiments on growth and lead generation.</p>

            <section>
                {blogPosts.map((post, index) => (
                    <article
                        key={post.slug}
                        className={`animate delay-${(index % 3) + 1}`}
                    >
                        <h2>{post.title}</h2>
                        <p>{post.excerpt}</p>
                        <Link to={`/blog/${post.slug}`}>Read more →</Link>
                    </article>
                ))}
            </section>
        </PageWrapper>
    );
};

export default BlogList;

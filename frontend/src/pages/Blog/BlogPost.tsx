import { useParams, Link } from "react-router-dom";
import PageWrapper from "../../components/layout/PageWrapper";

import { blogPosts } from "../../data/blogPosts";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();

    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <PageWrapper>
                <h1>Post not found</h1>
                <Link to="/blog">← Back to blog</Link>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <article>
                <h1>{post.title}</h1>
                <p>{post.date}</p>

                {post.content.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </article>

            {/* Bottom CTA */}
            <section className="animate" style={{ marginTop: "4rem" }}>
                <h2>Want help implementing this?</h2>
                <p>We help businesses build predictable lead generation systems.</p>
                <Link className="button" to="/book-a-call">
                    Get The FREE Analysis
                </Link>
            </section>

        </PageWrapper>
    );
};

export default BlogPost;

import { useMemo } from "react";
import PostCard from "../components/PostCard";
import PostCardFeatured from "../components/PostCardFeatured";
import Sidebar from "../components/Sidebar";
import { fetchPosts } from "../services";

export default function Home({ posts = [] }) {
  const featuredPosts = useMemo(() => {
    const filteredPost = posts.filter((post) => post.node?.featured);

    return filteredPost.slice(0, 4);
  }, [posts]);

  return (
    <>
      <section className="feed_wrapper">
        {featuredPosts && featuredPosts.length ? (
          <header className="feed_header feed_featured">
            {featuredPosts.map((post) => (
              <PostCardFeatured
                key={post.node?.id}
                categories={post.node?.categories}
                thumbnail={post.node?.thumbnail?.url}
                title={post.node?.title}
                slug={post.node?.slug}
              />
            ))}
          </header>
        ) : null}
        <main className="feed_main">
          {posts && posts.length
            ? posts.map((post) => (
                <PostCard
                  key={post.node?.id}
                  categories={post.node?.categories}
                  thumbnail={post.node?.thumbnail?.url}
                  title={post.node?.title}
                  text={post.node?.description}
                  createdAt={post.node?.createdAt}
                  slug={post.node?.slug}
                  id={post.node?.id}
                />
              ))
            : ""}
        </main>

        <aside className="feed_sidebar">
          <Sidebar />
        </aside>
      </section>
    </>
  );
}

export const getStaticProps = async () => {
  const posts = await fetchPosts();
  return {
    props: { posts },
    revalidate: 10,
  };
};

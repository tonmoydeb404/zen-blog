import Head from "next/head";
import { useMemo } from "react";
import { BiSad } from "react-icons/bi";
import PostCard from "../components/PostCard";
import PostCardFeatured from "../components/PostCard/PostCardFeatured";
import Sidebar from "../components/Sidebar";
import { siteInfo } from "../lib/constant";
import { getPosts } from "../services";

export default function Home({ posts = [] }) {
  const featuredPosts = useMemo(() => {
    const filteredPost = posts.filter((post) => post.featured);

    return filteredPost.slice(0, 4);
  }, [posts]);

  return (
    <>
      <Head>
        <title>{siteInfo.fullName}</title>
        <meta name="robots" content="index, follow" />
        <meta name="title" content={siteInfo.fullName} />
        <meta name="description" content={siteInfo.description} />
        <meta name="keywords" content={siteInfo.keywords} />

        {/* open graph */}
        <meta property="og:title" content={siteInfo.fullName} />
        <meta property="og:site_name" content={siteInfo.fullName} />
        <meta property="og:url" content={siteInfo.url} />
        <meta property="og:description" content={siteInfo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={siteInfo.ogImage} />
      </Head>
      <section className="feed_wrapper">
        {featuredPosts && featuredPosts.length ? (
          <header className="feed_header feed_featured">
            {featuredPosts.map((post) => (
              <PostCardFeatured
                key={post.id}
                category={post.category}
                thumbnail={post.thumbnail?.url}
                title={post.title}
                slug={post.slug}
              />
            ))}
          </header>
        ) : null}
        <main className="feed_main">
          {posts && posts.length ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                category={post.category}
                thumbnail={post.thumbnail?.url}
                title={post.title}
                text={post.description}
                createdAt={post.createdAt}
                slug={post.slug}
                id={post.id}
              />
            ))
          ) : (
            <p className="feed_none">
              <BiSad /> no posts sorry
            </p>
          )}
        </main>

        <aside className="feed_sidebar">
          <Sidebar />
        </aside>
      </section>
    </>
  );
}

export const getStaticProps = async () => {
  const data = await getPosts();

  return {
    props: { posts: data?.posts || [] },
    revalidate: 10,
  };
};

import Head from "next/head";
import PostDetails from "../../components/PostDetails";
import Sidebar from "../../components/Sidebar";
import { siteInfo } from "../../lib/constant";
import { fetchPost, fetchPosts } from "../../services";

const Post = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="robots" content="index, follow" />
        <meta name="title" content={post.title} />
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.tags?.join(",")} />
        <meta name="author" content={post.authorInfo?.authorName} />

        {/* open graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:site_name" content={siteInfo.fullName} />
        <meta
          property="og:url"
          content={`${siteInfo.url}/posts/${post.slug}`}
        />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={post.thumbnail?.url || siteInfo.ogImage}
        />
      </Head>
      <section className="feed_wrapper">
        <main className="feed_main">
          <PostDetails
            content={post.content?.html}
            thumbnail={post.thumbnail?.url}
            title={post.title}
            createdAt={post.createdAt}
            id={post.id}
            text={post.description}
            categories={post.categories}
            slug={post.slug}
            comments={post.comments}
            authorInfo={post.authorInfo}
          />
        </main>

        <aside className="feed_sidebar">
          <Sidebar />
        </aside>
      </section>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const post = await fetchPost(params.slug);
  return {
    props: { post },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const posts = await fetchPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.node?.slug, id: post.node?.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default Post;

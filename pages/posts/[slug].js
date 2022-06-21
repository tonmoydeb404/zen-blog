import Head from "next/head";
import PostDetails from "../../components/PostDetails";
import Sidebar from "../../components/Sidebar";
import { siteInfo } from "../../lib/constant";
import { getPost, getPosts } from "../../services";

const Post = ({ post, comments }) => {
  return (
    <>
      {post ? (
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
      ) : null}

      <section className="feed_wrapper">
        <main className="feed_main">
          <PostDetails
            content={post.content}
            thumbnail={post.thumbnail?.url}
            title={post.title}
            createdAt={post.createdAt}
            id={post.id}
            text={post.description}
            category={post.category}
            slug={post.slug}
            comments={comments}
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
  const data = await getPost(params.slug);

  if (!data || data.isError) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: data?.post,
      comments: data?.comments || [],
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const data = await getPosts();

  const paths = data?.posts?.map((post) => ({
    params: { slug: post?.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default Post;

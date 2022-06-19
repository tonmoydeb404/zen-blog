import PostDetails from "../../components/PostDetails";
import Sidebar from "../../components/Sidebar";
import { fetchPost, fetchPosts } from "../../services";

const Post = ({ post }) => {
  return (
    <>
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

import { useRouter } from "next/router";
import { MdSearch } from "react-icons/md";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import { fetchPostByQuery } from "../services";

const SearchPage = ({ posts = [] }) => {
  const router = useRouter();

  return (
    <div>
      <section className="feed_wrapper">
        <div className="feed_header">
          <p className="text-gray-500 mb-1">you searched for</p>
          <h1 className="font-bold text-2xl flex items-center gap-1">
            <MdSearch className="text-green-600" /> {router.query.q}
          </h1>
        </div>

        <main className="feed_main">
          {posts && posts.length
            ? posts.map((post) => (
                <PostCard
                  key={post.id}
                  categories={post.categories}
                  thumbnail={post.thumbnail?.url}
                  title={post.title}
                  text={post.description}
                  createdAt={post.createdAt}
                  slug={post.slug}
                  id={post.id}
                />
              ))
            : "not found"}
        </main>

        <aside className="feed_sidebar">
          <Sidebar />
        </aside>
      </section>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const posts = await fetchPostByQuery(context.query?.q);

  return {
    props: {
      posts,
    },
  };
};

export default SearchPage;

import Head from "next/head";
import { useRouter } from "next/router";
import { MdSearch } from "react-icons/md";
import PostsList from "../components/PostsList";
import Sidebar from "../components/Sidebar";
import { siteInfo } from "../lib/constant";
import { getSearchPosts } from "../services";

const SearchPage = ({ posts = [] }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`you searched for - ${router.query.q}`}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="title" content={`you searched for - ${router.query.q}`} />
        <meta name="description" content={siteInfo.description} />
        <meta name="keywords" content={siteInfo.keywords} />

        {/* open graph */}
        <meta
          property="og:title"
          content={`search results for - ${router.query.q}`}
        />
        <meta property="og:site_name" content={siteInfo.fullName} />
        <meta
          property="og:url"
          content={`${siteInfo.url}/search?q=${router.query.q}`}
        />
        <meta property="og:description" content={siteInfo.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={posts[0]?.thumbnail?.url || siteInfo.ogImage}
        />
      </Head>
      <section className="feed_wrapper">
        <div className="feed_header">
          <p className="text-gray-500 mb-1">you searched for</p>
          <h1 className="font-bold text-2xl flex items-center gap-1">
            <MdSearch className="text-green-600" /> {router.query.q}
          </h1>
        </div>

        <main className="feed_main">
          <PostsList posts={posts} />
        </main>

        <aside className="feed_sidebar">
          <Sidebar />
        </aside>
      </section>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const data = await getSearchPosts(context.query?.q);

  return {
    props: {
      posts: data?.posts || [],
    },
  };
};

export default SearchPage;

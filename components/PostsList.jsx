import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiSad } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { postPerPage } from "../lib/constant";
import PostCard from "./PostCard";

const PostsList = ({ posts = [] }) => {
  // initial storage for post list
  const [postListData, setPostListData] = useState([]);
  // storage for page index
  const [currentPage, setCurrentPage] = useState(0);

  const router = useRouter();
  const path = router.asPath;

  // update post list data on page change and post change
  useEffect(() => {
    const startPosition = currentPage * postPerPage;
    const sclicedData = posts.slice(startPosition, startPosition + postPerPage);

    setPostListData(sclicedData);

    return () => {
      setPostListData([]);
    };
  }, [currentPage, posts]);

  // reset page index
  useEffect(() => {
    setCurrentPage(0);
    return () => {
      setCurrentPage(0);
    };
  }, [path]);

  // handle pagination page change
  const handlePageChange = (e) => {
    setCurrentPage(e.selected);
  };

  return postListData && postListData.length ? (
    <div className="postlist">
      {postListData.map((post) => (
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
      ))}

      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageChange}
        pageRangeDisplayed={postPerPage}
        pageCount={Math.ceil(posts.length / postPerPage)}
        previousLabel="previous"
        className="postlist_paginate"
        pageLinkClassName="postlist_paginate_page"
        activeLinkClassName="active"
        previousLinkClassName="postlist_paginate_prev"
        nextLinkClassName="postlist_paginate_next"
        disabledLinkClassName="disabled"
        forcePage={currentPage}
      />
    </div>
  ) : (
    <p className="postlist_none">
      <BiSad /> no posts sorry
    </p>
  );
};

export default PostsList;

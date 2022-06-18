import { useBookmarks } from "../contexts/BookmarksContext";

const useToggleBookmark = (id) => {
  const { bookmarksData, addBookmarks, removeBookmarks } = useBookmarks();

  const isBookmarked =
    bookmarksData.find((bookmark) => bookmark.id === id) !== undefined;

  const toggleBookmark = (post = {}) =>
    isBookmarked
      ? removeBookmarks(post.id)
      : addBookmarks({
          id: post.id,
          title: post.title,
          text: post.text,
          slug: post.slug,
        });

  return { isBookmarked, toggleBookmark };
};

export default useToggleBookmark;

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const BookmarksContext = createContext([]);

export const useBookmarks = () => useContext(BookmarksContext);

export const BookmarksContextProvider = ({ children }) => {
  const [bookmarksData, setBookmarksData] = useState([]);
  const isMounted = useRef(false);

  // get data on first render
  useEffect(() => {
    const localeBookmarksData = localStorage.getItem("next-blog-bookmarks");
    if (localeBookmarksData !== null) {
      setBookmarksData(JSON.parse(localeBookmarksData));
    }
  }, []);

  // save data in local storage
  useEffect(() => {
    // prevent update on first render
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      const localeBookmarksData = localStorage.getItem("next-blog-bookmarks");

      if (JSON.parse(localeBookmarksData) !== bookmarksData) {
        localStorage.setItem(
          "next-blog-bookmarks",
          JSON.stringify(bookmarksData)
        );
      }
    }
  }, [bookmarksData]);

  // add bookmarks
  const addBookmarks = (data = {}) => {
    const isBookmarkAlreadyHave = bookmarksData.find(
      (bookmark) => bookmark.id === data.id
    );

    if (isBookmarkAlreadyHave === undefined)
      setBookmarksData((prevState) => [data, ...prevState]);
  };

  // remove bookmarks
  const removeBookmarks = (id) => {
    const filteredBookmarks = bookmarksData.filter(
      (bookmark) => bookmark.id !== id
    );
    setBookmarksData(filteredBookmarks);
  };

  // memorize the values
  const value = useMemo(
    () => ({ bookmarksData, addBookmarks, removeBookmarks }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bookmarksData]
  );

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
};

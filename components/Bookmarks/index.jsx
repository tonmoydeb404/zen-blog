import { BiSad } from "react-icons/bi";
import { useBookmarks } from "../../contexts/BookmarksContext";
import BookmarksItem from "./BookmarksItem";

const Bookmarks = () => {
  const { bookmarksData } = useBookmarks();

  return (
    <div className="bookmarks py-3 px-4 border border-gray-300 rounded-sm">
      <h3 className="bookmarks_header text-xl font-semibold mb-3">Bookmarks</h3>

      <div className="bookmarks_body flex-col gap-3 flex">
        {bookmarksData && bookmarksData.length ? (
          bookmarksData.map((bookmark) => (
            <BookmarksItem
              title={bookmark.title}
              text={bookmark.text}
              slug={bookmark.slug}
              key={bookmark.id}
            />
          ))
        ) : (
          <p className="bookmarks_none tect-sm text-gray-500 flex flex-col items-center gap-1 py-2">
            <span className="text-2xl">
              <BiSad />
            </span>
            no bookmarks available
          </p>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;

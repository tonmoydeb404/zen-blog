import { BiSad } from "react-icons/bi";
import { useBookmarks } from "../../contexts/BookmarksContext";
import BookmarksItem from "./BookmarksItem";

const Bookmarks = () => {
  const { bookmarksData, removeBookmark } = useBookmarks();

  return (
    <div className="widget bookmarks">
      <h3 className="widget_header">Bookmarks</h3>

      <div className="widget_body">
        {bookmarksData && bookmarksData.length ? (
          bookmarksData.map((bookmark) => (
            <BookmarksItem
              title={bookmark.title}
              text={bookmark.text}
              slug={bookmark.slug}
              key={bookmark.id}
              id={bookmark.id}
              removeBookmark={removeBookmark}
            />
          ))
        ) : (
          <p className="widget_alert none">
            <BiSad className="widget_alert_icon" />
            no bookmarks available
          </p>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;

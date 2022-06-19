import { BiSad } from "react-icons/bi";
import { useBookmarks } from "../../contexts/BookmarksContext";
import BookmarksItem from "./BookmarksItem";

const Bookmarks = () => {
  const { bookmarksData } = useBookmarks();

  return (
    <div className="sidebarbox bookmarks">
      <h3 className="sidebarbox_header">Bookmarks</h3>

      <div className="sidebarbox_body">
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
          <p className="sidebarbox_none">
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

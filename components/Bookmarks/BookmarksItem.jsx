import Link from "next/link";
import { MdClose } from "react-icons/md";

const BookmarksItem = ({
  slug,
  title,
  text,
  id,
  removeBookmark = () => {},
}) => {
  return (
    <article className="bookmarks_item group">
      <h1 className="bookmarks_item_title">
        <Link href={`/posts/${slug}`}>
          <a>{title}</a>
        </Link>
      </h1>
      <p className="bookmarks_item_text">{text}</p>

      <button
        className="bookmarks_item_remove"
        onClick={() => removeBookmark(id)}
      >
        <MdClose />
      </button>
    </article>
  );
};

export default BookmarksItem;

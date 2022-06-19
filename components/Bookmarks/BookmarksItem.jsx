import Link from "next/link";

const BookmarksItem = ({ slug, title, text }) => {
  return (
    <article className="bookmarks_item">
      <h1 className="bookmarks_item_title">
        <Link href={`/posts/${slug}`}>
          <a>{title}</a>
        </Link>
      </h1>
      <p className="bookmarks_item_text">{text}</p>
    </article>
  );
};

export default BookmarksItem;

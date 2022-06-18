import Link from "next/link";

const BookmarksItem = ({ slug, title, text }) => {
  return (
    <article className="bookmarks_item px-3 py-2 border border-gray-300">
      <h1 className="bookmarks_item_title text-body font-semibold mb-2">
        <Link href={`/posts/${slug}`}>
          <a>{title}</a>
        </Link>
      </h1>
      <p className="bookmarks_item_text text-xs truncate">{text}</p>
    </article>
  );
};

export default BookmarksItem;

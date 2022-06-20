import Link from "next/link";
import { MdBookmarkBorder, MdSchedule } from "react-icons/md";
import Moment from "react-moment";
import useToggleBookmark from "../../hooks/useToggleBookmark";

const PostCardBody = ({
  categories = [],
  title = "",
  text = "",
  createdAt = "",
  slug = "",
  id,
}) => {
  const { toggleBookmark, isBookmarked } = useToggleBookmark(id);

  return (
    <div className="postcard_body ">
      <div className="postcard_header">
        <div className="postcard_tags ">
          {categories && categories.length ? (
            categories.map((category) => (
              <Link href={`/categories/${category.slug}`} key={category.id}>
                <a className="postcard_tags_item"># {category.title}</a>
              </Link>
            ))
          ) : (
            <span className="postcard_tags_item uncategorized">
              # uncategorised
            </span>
          )}
        </div>

        <p className="postcard_time">
          <span className="postcard_time_icon">
            <MdSchedule />
          </span>

          <Moment date={createdAt} format={"DD/MM/YYYY"} />
        </p>
      </div>

      <Link href={`/posts/${slug}`}>
        <a>
          <h2 className="postcard_title ">{title}</h2>
        </a>
      </Link>
      <p className="postcard_text">{text}</p>

      <div className="postcard_actions">
        <Link href={`/${slug}`}>
          <a className="postcard_btn">Read More</a>
        </Link>

        <button
          className={`postcard_bookmark ${isBookmarked ? "bookmarked" : ""}`}
          onClick={() => toggleBookmark({ title, slug, text, id })}
        >
          <MdBookmarkBorder />
        </button>
      </div>
    </div>
  );
};

export default PostCardBody;

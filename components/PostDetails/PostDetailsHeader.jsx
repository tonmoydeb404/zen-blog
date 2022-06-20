import Image from "next/image";
import Link from "next/link";
import { MdBookmarkBorder, MdSchedule } from "react-icons/md";
import Moment from "react-moment";
import useToggleBookmark from "../../hooks/useToggleBookmark";

const PostDetailsHeader = ({
  thumbnail,
  title,
  createdAt,
  id,
  slug,
  text,
  category,
}) => {
  const { toggleBookmark, isBookmarked } = useToggleBookmark(id);

  return (
    <header className="postdetails_header">
      {thumbnail ? (
        <div className="postdetails_thumbnail relative w-full h-[300px] rounded overflow-hidden mb-4">
          <Image src={thumbnail} layout="fill" alt={title} />
        </div>
      ) : null}

      <div className="postcard_tags mb-5">
        <Link href={`/categories/${category.slug}`}>
          <a className="postcard_tags_item"># {category.title}</a>
        </Link>
      </div>

      <h2 className="postdetails_title font-bold text-3xl mb-2">{title}</h2>

      <div className="postdetails_info flex items-center mb-10">
        <p className="postdetails_time flex items-center gap-1">
          <MdSchedule />
          <Moment date={createdAt} format="DD-MM-YYYY" />
        </p>

        <button
          className={`postcard_bookmark ml-auto text-lg ${
            isBookmarked ? "bookmarked" : ""
          }`}
          onClick={() => toggleBookmark({ title, slug, text, id })}
        >
          <MdBookmarkBorder />
        </button>
      </div>
    </header>
  );
};

export default PostDetailsHeader;

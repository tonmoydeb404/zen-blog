import Image from "next/image";
import Link from "next/link";
import { MdStar } from "react-icons/md";

const PostCardFeatured = ({ thumbnail, title, categories, slug }) => {
  return (
    <article className="postcard_featured">
      <Image
        src={
          thumbnail || "https://via.placeholder.com/250?text=Image+not+found"
        }
        alt={title}
        layout="fill"
      />

      <div className="postcard_featured_body ">
        {categories && categories.length ? (
          <Link
            href={`/categories/${categories[0].slug}`}
            key={categories[0].id}
          >
            <a className="postcard_featured_tag ">
              <MdStar /> {categories[0].title}
            </a>
          </Link>
        ) : (
          <span className="postcard_featured_tag ">
            <MdStar /> uncategorised
          </span>
        )}

        <Link href={`/posts/${slug}`}>
          <a>
            <h2 className="postcard_featured_title">{title}</h2>
          </a>
        </Link>
      </div>
    </article>
  );
};

export default PostCardFeatured;

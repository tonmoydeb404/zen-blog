import Image from "next/image";
import Link from "next/link";
import { MdStar } from "react-icons/md";

const PostCardFeatured = ({ thumbnail, title, categories, slug }) => {
  return (
    <article className="postcard_featured relative w-full h-[300px] sm:h-[220px] lg:h-[250px] xl:h-[200px] border border-gray-400 shadow">
      <Image
        src={
          thumbnail || "https://via.placeholder.com/250?text=Image+not+found"
        }
        alt={title}
        layout="fill"
      />

      <div className="postcard_featured_body absolute bottom-0 left-0 w-full px-3 py-4 text-gray-50 bg-gray-900/60 ">
        {categories && categories.length ? (
          <Link
            href={`/categories/${categories[0].slug}`}
            key={categories[0].id}
          >
            <a className="postcard_featured_tag text-white py-1 px-1.5 rounded-sm font-semibold text-xs bg-green-600 inline-flex items-center gap-0.5">
              <MdStar /> {categories[0].title}
            </a>
          </Link>
        ) : (
          <span className="postcard_featured_tag text-white py-1 px-1.5 rounded-sm font-semibold text-xs bg-green-600 inline-flex items-center gap-0.5">
            <MdStar /> uncategorised
          </span>
        )}

        <Link href={`/posts/${slug}`}>
          <a>
            <h2 className="postcard_featured_title font-semibold text-lg mt-2 line-clamp-2 hover:text-green-500 hover:underline duration-200">
              {title}
            </h2>
          </a>
        </Link>
      </div>
    </article>
  );
};

export default PostCardFeatured;

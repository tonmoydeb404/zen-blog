import Image from "next/image";
import Link from "next/link";

const PostDetailsAuthor = ({
  authorBio,
  authorImage,
  authorName,
  authorUrl,
  className = "",
}) => {
  return (
    <section
      className={`postdetails_author flex items-center gap-4 bg-white px-4 py-5 border border-gray-200 rounded ${className}`}
    >
      <div className="postdetails_autor_media relative w-36 h-36 rounded-lg overflow-hidden">
        <Image src={authorImage} alt={authorName} layout="fill" />
      </div>
      <div className="postdetails_author_body flex-1">
        <h2 className="postdetails_author_name text-xl font-semibold text-gray-900">
          {authorName}
        </h2>

        <Link href={authorUrl} target="_blank">
          <a className="postdetails_author_name text-sm font-semibold text-green-600 hover:text-green-700">
            {authorUrl}
          </a>
        </Link>

        <p className="postdetails_author_bio text-base mt-2 text-gray-700">
          {authorBio}
        </p>
      </div>
    </section>
  );
};

export default PostDetailsAuthor;

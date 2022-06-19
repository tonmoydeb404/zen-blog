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
    <section className={`postdetails_author ${className}`}>
      <div className="postdetails_author_media">
        <Image src={authorImage} alt={authorName} layout="fill" />
      </div>
      <div className="postdetails_author_body">
        <h2 className="postdetails_author_name ">{authorName}</h2>

        <Link href={authorUrl} target="_blank">
          <a className="postdetails_author_url ">{authorUrl}</a>
        </Link>

        <p className="postdetails_author_bio ">{authorBio}</p>
      </div>
    </section>
  );
};

export default PostDetailsAuthor;

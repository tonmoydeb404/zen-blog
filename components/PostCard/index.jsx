import Image from "next/image";
import PostCardBody from "./PostCardBody";

const PostCard = ({
  category,
  thumbnail,
  title,
  text,
  createdAt,
  id,
  slug,
}) => {
  return (
    <article className="postcard">
      <div className="postcard_media ">
        <Image
          src={
            thumbnail || "https://via.placeholder.com/250?text=Image+not+found"
          }
          alt={title}
          layout="fill"
        />
      </div>

      <PostCardBody
        title={title}
        text={text}
        category={category}
        createdAt={createdAt}
        slug={slug}
        id={id}
      />
    </article>
  );
};

export default PostCard;

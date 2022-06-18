import PostDetailsHeader from "./PostDetailsHeader";

const PostDetails = ({
  content,
  thumbnail,
  title,
  createdAt,
  id,
  slug,
  text,
  categories = [],
}) => {
  return (
    <div>
      <PostDetailsHeader
        title={title}
        thumbnail={thumbnail}
        id={id}
        createdAt={createdAt}
        slug={slug}
        text={text}
        categories={categories}
      />
      <div
        className="postdetails_body"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default PostDetails;

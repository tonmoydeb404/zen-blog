import { MdComment, MdOutlineAddComment } from "react-icons/md";
import CommentCard from "../Comment/CommentCard";
import CommentForm from "../Comment/CommentForm";
import PostDetailsAuthor from "./PostDetailsAuthor";
import PostDetailsFooter from "./PostDetailsFooter";
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
  comments = [],
  authorInfo = {},
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

      <PostDetailsFooter categories={categories} />

      <PostDetailsAuthor
        authorBio={authorInfo.authorBio}
        authorImage={authorInfo.authorImage?.url}
        authorName={authorInfo.authorName}
        authorUrl={authorInfo.authorUrl}
        className="mt-10"
      />

      <div className="postdetails_commentform">
        <h3 className="postdetails_commentform_title">
          <MdOutlineAddComment className="text-green-600" /> Share Your Thoughts
        </h3>
        <CommentForm slug={slug} />
      </div>

      <div className="postdetails_comments ">
        {comments && comments.length ? (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              text={comment.text}
              title={comment.name}
              createdAt={comment.createdAt}
            />
          ))
        ) : (
          <p className="postdetails_comments_empty ">
            <MdComment /> no comments available
          </p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;

import { MdComment, MdOutlineAddComment } from "react-icons/md";
import CommentCard from "../Comment/CommentCard";
import CommentForm from "../Comment/CommentForm";
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

      <div className="postdetails_commentform mt-10">
        <h3 className="postdetails_commentform_title font-semibold text-lg mb-4 flex items-center gap-1">
          <MdOutlineAddComment className="text-green-600" /> Share Your Thoughts
        </h3>
        <CommentForm slug={slug} />
      </div>

      <div className="postdetails_comments mt-10 flex flex-col gap-3">
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
          <p className="postdetails_comments_empty py-10 text-center flex flex-col gap-2 items-center justify-center bg-yellow-100 text-yellow-600 text-lg rounded">
            <MdComment /> no comments available
          </p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;

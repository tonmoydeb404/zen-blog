import Image from "next/image";
import { MdSchedule } from "react-icons/md";
import Moment from "react-moment";

const CommentCard = ({ title, text, createdAt }) => {
  return (
    <div className="commentcard">
      <div className="commentcard_media">
        <Image
          src={`https://avatars.dicebear.com/api/identicon/${
            title || "anonymous"
          }.svg`}
          alt={title}
          layout="fill"
        />
      </div>
      <div className="commentcard_body">
        <div className="commentcard_info">
          <h2 className="commentcard_title">{title || "Anonymous"}</h2>
          <span className="commentcard_time">
            <MdSchedule />
            <Moment date={createdAt} format="DD-MM-YYYY" />
          </span>
        </div>
        <p className="commentcard_text">{text}</p>
      </div>
    </div>
  );
};

export default CommentCard;

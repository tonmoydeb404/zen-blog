import { useRouter } from "next/router";
import { MdShare } from "react-icons/md";
import { share } from "../../lib/constant";

const PostDetailsFooter = ({ categories = [] }) => {
  const router = useRouter();

  return (
    <div className="postdetails_footer">
      <div className="postdetails_share_list">
        <span className="postdetails_share_title ">
          <MdShare className="text-green-600" /> share this article
        </span>

        {share.map((item) => (
          <a
            key={item.title}
            href={item.url + router.asPath}
            target="_blank"
            rel="noreferrer"
            className="postdetails_share text-2xl"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default PostDetailsFooter;

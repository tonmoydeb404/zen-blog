import { useRouter } from "next/router";
import { MdShare } from "react-icons/md";
import { share } from "../../lib/constant";

const PostDetailsFooter = ({ categories = [] }) => {
  const router = useRouter();

  return (
    <div className="postdetails_footer mt-10">
      <div className="postdetails_share_list flex flex-wrap gap-4 items-center px-5 py-4 bg-white border border-gray-200 rounded">
        <span className="postdetails_share_title text-lg font-medium mr-auto flex items-center gap-2">
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

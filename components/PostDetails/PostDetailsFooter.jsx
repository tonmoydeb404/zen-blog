import { useRouter } from "next/router";
import { MdShare } from "react-icons/md";
import { share, siteInfo } from "../../lib/constant";

const PostDetailsFooter = () => {
  const router = useRouter();

  return (
    <div className="postdetails_footer">
      <div className="postdetails_share">
        <span className="postdetails_share_title ">
          <MdShare className="text-green-600" /> share this article
        </span>

        <div className="postdetails_share_list">
          {share.map((item) => (
            <a
              key={item.title}
              href={item.url + siteInfo.url + router.asPath}
              target="_blank"
              rel="noreferrer"
              className="postdetails_share_links text-2xl"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetailsFooter;

import Link from "next/link";
import { MdTag } from "react-icons/md";

const CategoriesItem = ({ title, slug, posts }) => {
  return (
    <div className="flex items-center">
      <Link href={`/categories/${slug}`}>
        <a className="font-medium flex items-center gap-x-1">
          <MdTag className="text-green-600" />
          {title}
        </a>
      </Link>

      {posts && posts.length && (
        <span className="ml-auto px-1 text-xs font-bold py-1 text-gray-100 inline-block bg-green-600 min-w-[25px] text-center">
          {posts.length < 10 ? `0${posts.length}` : posts.length}
        </span>
      )}
    </div>
  );
};

export default CategoriesItem;

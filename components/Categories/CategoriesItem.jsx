import Link from "next/link";
import { MdTag } from "react-icons/md";

const CategoriesItem = ({ title, slug, posts }) => {
  return (
    <div className="categories_item">
      <Link href={`/categories/${slug}`}>
        <a className="categories_item_title">
          <MdTag className="text-green-600" />
          {title}
        </a>
      </Link>

      <span
        className={`categories_item_counter ${posts.length < 1 ? "none" : ""}`}
      >
        {posts.length < 10 ? `0${posts.length}` : posts.length}
      </span>
    </div>
  );
};

export default CategoriesItem;

import Bookmarks from "./Bookmarks";
import Categories from "./Categories";

const Sidebar = () => {
  return (
    <div className="blog_sidebar ">
      <Bookmarks />
      <Categories />
    </div>
  );
};

export default Sidebar;

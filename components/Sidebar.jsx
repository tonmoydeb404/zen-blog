import Bookmarks from "./Bookmarks";
import Categories from "./Categories";

const Sidebar = () => {
  return (
    <div className="sidebar flex flex-col gap-5 md:sticky md:top-20">
      <Bookmarks />
      <Categories />
    </div>
  );
};

export default Sidebar;

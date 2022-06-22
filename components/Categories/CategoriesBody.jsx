import { BiError, BiSad } from "react-icons/bi";
import CategoriesItem from "./CategoriesItem";

const CategoriesBody = ({ data, loading = true, error }) => {
  if (loading) {
    return (
      <div className="widget_body loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="widget_alert error">
        <BiError className="widget_alert_icon" />
        something wents to wrong
      </div>
    );
  }

  return data && data.length ? (
    <div className="widget_body">
      {data.map((category) => (
        <CategoriesItem
          title={category.title}
          posts={category.posts}
          slug={category.slug}
          key={category.id}
        />
      ))}
    </div>
  ) : (
    <div className="widget_alert none">
      <BiSad className="widget_alert_icon" />
      there are no categories
    </div>
  );
};

export default CategoriesBody;

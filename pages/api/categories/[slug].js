import request, { gql } from "graphql-request";

const CMS_ENDPOINT = process.env.CMS_ENDPOINT;

const getCategory = async (slug) => {
  // query document for request
  const query = gql`
    query getCategory($slug: String!) {
      category(where: { slug: $slug }) {
        id
        title
        slug
        posts(orderBy: createdAt_DESC) {
          id
          slug
          title
          featured
          createdAt
          thumbnail {
            url
            width
            height
          }
          category {
            id
            slug
            title
          }
        }
      }
    }
  `;

  try {
    const data = await request({
      url: CMS_ENDPOINT,
      document: query,
      variables: {
        slug,
      },
    });

    if (data?.errors && data?.errors?.length)
      throw {
        code: 500,
        message: data?.errors[0]?.message || "internal server error",
      };

    if (data?.category === null)
      throw { code: 404, message: "category not found" };
    return data.category;
  } catch (error) {
    return { isError: true, error };
  }
};

const CategoryHandler = async (req, res) => {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string" || !slug.length)
    return res.status(400).json({ message: "category slug not provided" });

  // inital storage for category
  let category = null;

  switch (req.method) {
    case "GET": {
      category = await getCategory(slug);
      break;
    }
    default:
      res.status(405).json({ message: "method not allowed" });
      return;
  }

  if (category?.isError) {
    return res.status(category?.error?.code || 500).json({
      message: category?.error?.message || "internal server error sorry",
    });
  }

  return res.status(200).json(category);
};

export default CategoryHandler;

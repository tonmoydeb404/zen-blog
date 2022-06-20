import request, { gql } from "graphql-request";

const CMS_ENDPOINT = process.env.CMS_ENDPOINT;

// get categories from cms
const getCategories = async () => {
  // query document for request
  const query = gql`
    query getCategories {
      categories(orderBy: createdAt_DESC) {
        id
        slug
        title
        posts {
          slug
        }
      }
    }
  `;

  try {
    const data = await request({
      url: CMS_ENDPOINT,
      document: query,
    });

    if (data?.errors && data?.errors?.length)
      throw {
        code: 500,
        message: data?.errors[0]?.message,
      };

    return data.categories;
  } catch (error) {
    return { isError: true, error };
  }
};

// handle request response
const CategoriesHandler = async (req, res) => {
  // store all categories here
  let categories = null;

  switch (req.method) {
    // get all categories
    case "GET": {
      categories = await getCategories();
      break;
    }

    // error on method undefined
    default: {
      return res.status(405).json({ message: "method not allowed" });
    }
  }

  // handle the custom error
  if (categories?.isError) {
    return res.status(categories?.error?.code || 500).json({
      message: categories?.error?.message || "internal server error sorry",
    });
  }

  return res.status(200).json(categories);
};

export default CategoriesHandler;

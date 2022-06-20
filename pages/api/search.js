import request, { gql } from "graphql-request";

const CMS_ENDPOINT = process.env.CMS_ENDPOINT;

// get searchPosts from cms
const getSearchPosts = async (searchQuery) => {
  // query document for request
  const query = gql`
    query getSearchPosts($searchQuery: String!) {
      posts(orderBy: createdAt_DESC, where: { _search: $searchQuery }) {
        id
        slug
        title
        featured
        description
        createdAt
        tags
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
  `;

  try {
    const data = await request({
      url: CMS_ENDPOINT,
      document: query,
      variables: {
        searchQuery,
      },
    });

    if (data?.errors && data?.errors?.length)
      throw {
        code: 500,
        message: data?.errors[0]?.message,
      };

    return data.posts;
  } catch (error) {
    return { isError: true, error };
  }
};

// handle request response
const SearchHandler = async (req, res) => {
  const { q: searchQuery } = req.query;

  console.log(searchQuery);

  if (!searchQuery || typeof searchQuery !== "string" || !searchQuery.length)
    return res.status(400).json({ message: "search query not provided" });

  // initial storage for search posts
  let searchPosts = null;

  switch (req.method) {
    // handle get method
    case "GET": {
      searchPosts = await getSearchPosts(searchQuery);
      break;
    }
    // handle undefined methods
    default: {
      return res.status(405).json({ message: "method not allowed" });
    }
  }

  // handle the custom error
  if (searchPosts?.isError)
    return res.status(searchPosts?.error?.code || 500).json({
      message: searchPosts?.error?.message || "internal server error sorry",
    });

  return res.status(200).json(searchPosts);
};

export default SearchHandler;

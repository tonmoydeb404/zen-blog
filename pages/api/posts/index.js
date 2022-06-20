import request, { gql } from "graphql-request";

const CMS_ENDPOINT = process.env.CMS_ENDPOINT;

// get posts from cms
const getPosts = async () => {
  // query document for request
  const query = gql`
    query getPosts() {
      posts(
        orderBy: createdAt_DESC
      ){
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

// get similar posts from cms
const getSimilarPosts = async (tags, slug, limit) => {
  // query document for request
  const query = gql`
    query getSmiliarPosts($tags: [String!], $slug: String!, $last: Int! = 3) {
      posts(
        orderBy: createdAt_DESC
        last: $last
        where: { tags_contains_some: $tags, slug_not: $slug }
      ) {
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
        tags,
        slug,
        last: limit,
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
const PostsHandler = async (req, res) => {
  const type = req.query?.type?.toUpperCase() || "ALL";

  if (req.method !== "GET")
    return res.status(405).json({ message: "method not allowed" });

  // store all posts here
  let posts = null;

  switch (type) {
    // get similar posts only
    case "SIMILAR": {
      // get required data from body
      const { slug, limit, tags } = req.body;
      // verify those value
      if (!slug || !tags)
        return res.status(400).json({ message: "required data not provided" });

      posts = await getSimilarPosts(tags, slug, limit);

      break;
    }

    // get all posts
    default: {
      posts = await getPosts();
      break;
    }
  }

  // handle the custom error
  if (posts?.isError)
    return res.status(posts?.error?.code || 500).json({
      message: posts?.error?.message || "internal server error sorry",
    });

  console.log(posts);

  return res.status(200).json(posts);
};

export default PostsHandler;

import request, { gql } from "graphql-request";

const CMS_ENDPOINT = process.env.CMS_ENDPOINT;
const getPost = async (slug) => {
  // query document for request
  const query = gql`
    query getPost($slug: String!) {
      post(where: { slug: $slug }) {
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
        content {
          html
          raw
        }
        authorInfo {
          authorBio
          authorImage {
            url
            width
            height
          }
          authorName
          authorUrl
        }
        category {
          id
          slug
          title
        }
      }
      comments(orderBy: createdAt_ASC, where: { post: { slug: $slug } }) {
        id
        name
        text
        createdAt
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

    if (data?.post === null) throw { code: 404, message: "post not found" };
    return data;
  } catch (error) {
    return { isError: true, error };
  }
};

const PostHandler = async (req, res) => {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string" || !slug.length)
    return res.status(400).json({ message: "post slug not provided" });

  switch (req.method) {
    case "GET": {
      const post = await getPost(slug);

      if (post?.isError)
        return res.status(post?.error?.code || 500).json({
          message: post?.error?.message || "internal server error sorry",
        });

      return res.status(200).json(post);
    }
    default:
      res.status(405).json({ message: "method not allowed" });
      return;
  }
};

export default PostHandler;

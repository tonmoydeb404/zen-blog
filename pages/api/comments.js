import { gql, GraphQLClient } from "graphql-request";

const CMS_ENDPOINT = process.env.CMS_ENDPOINT;
const CMS_API_TOKEN = process.env.CMS_API_TOKEN;

// graphql client for data mutation
const graphQLClient = new GraphQLClient(CMS_ENDPOINT, {
  headers: {
    authorization: `Bearer ${CMS_API_TOKEN}`,
  },
});

const createComment = async (variables) => {
  const mutation = gql`
    mutation createComment($data: CommentCreateInput!) {
      createComment(data: $data) {
        id
      }
    }
  `;

  try {
    const data = await graphQLClient.request(mutation, variables);
    if (data?.errors && data?.errors?.length)
      throw {
        code: 500,
        message: data?.errors[0]?.message,
      };

    return data.createComment;
  } catch (error) {
    return { isError: true, error };
  }
};

const CommentsHandler = async (req, res) => {
  switch (req.method) {
    // handle post method
    case "POST": {
      // get data from request body
      const { commentDetails: comment, postSlug: slug } = req.body;
      // verify them
      if (!comment || !comment?.text || !slug) {
        return res
          .status(405)
          .json({ message: "can not get the required data" });
      }

      const requestVariables = {
        data: {
          name: comment.name || null,
          email: comment.email || null,
          text: comment.text,
          post: { connect: { slug } },
        },
      };

      const results = await createComment(requestVariables);

      // handle the custom error
      if (results?.isError)
        return res.status(results?.error?.code || 500).json({
          message: results?.error?.message || "internal server error sorry",
        });

      return res.status(200).json(results);
    }

    default: {
      return res.status(405).json({ message: "method not allowed" });
    }
  }
};

export default CommentsHandler;

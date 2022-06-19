import request, { gql, GraphQLClient } from "graphql-request";

const cmsEndpoint = process.env.NEXT_PUBLIC_CMS_ENDPOINT;
const cmsToken = process.env.CMS_API_TOKEN;

export const fetchPosts = async () => {
  const query = gql`
    query fetchPosts {
      postsConnection {
        edges {
          node {
            id
            title
            description
            slug
            thumbnail {
              url
              width
              height
            }
            updatedAt
            createdAt
            tags
            featured
            categories {
              ... on Category {
                id
                slug
                title
              }
            }
          }
        }
      }
    }
  `;

  const results = await request(cmsEndpoint, query);

  return results.postsConnection?.edges;
};

export const fetchCategories = async () => {
  const query = gql`
    query fetchCategories {
      categoriesConnection {
        edges {
          node {
            id
            title
            slug
            posts {
              id
            }
          }
        }
      }
    }
  `;

  const results = await request(cmsEndpoint, query);

  return results.categoriesConnection?.edges;
};

export const fetchPost = async (slug = false) => {
  if (!slug) return false;

  const query = gql`
    query fetchPost($slug: String!) {
      post(where: { slug: $slug }) {
        content {
          html
        }
        createdAt
        description
        title
        id
        slug
        thumbnail {
          url
          width
          height
        }
        tags
        categories {
          ... on Category {
            id
            slug
            title
          }
        }
        comments {
          ... on Comment {
            id
            name
            text
            createdAt
          }
        }
        authorInfo {
          authorBio {
            html
          }
          authorImage {
            url
          }
          authorUrl
          authorName
        }
      }
    }
  `;

  const results = await request(cmsEndpoint, query, { slug });

  return results.post;
};

export const fetchCategory = async (slug = false) => {
  if (!slug) return false;

  const query = gql`
    query fetchCategory($slug: String!) {
      category(where: { slug: $slug }) {
        slug
        title
        id
        posts {
          slug
          title
          thumbnail {
            url
            width
            height
          }
          id
          createdAt
          description
          categories {
            ... on Category {
              id
              slug
              title
            }
          }
        }
      }
    }
  `;

  const results = await request(cmsEndpoint, query, { slug });

  return results.category;
};

export const fetchPostByQuery = async (q = false) => {
  if (!q) return false;

  const query = gql`
    query fetchPostByQuery($q: String!) {
      posts(where: { title_contains: $q }) {
        id
        slug
        title
        description
        createdAt
        categories {
          ... on Category {
            id
            slug
            title
          }
        }
        thumbnail {
          url
          width
          height
        }
      }
    }
  `;

  const results = await request(cmsEndpoint, query, { q });

  return results.posts;
};

export const submitComment = async (comment = {}, slug = false) => {
  if (!comment.text || !slug) return false;

  const mutationVariables = {
    data: {
      name: comment.name || null,
      email: comment.email || null,
      text: comment.text,
      post: { connect: { slug } },
    },
  };

  const mutation = gql`
    mutation submitComment($data: CommentCreateInput!) {
      createComment(data: $data) {
        id
      }
    }
  `;
  const graphQLClient = new GraphQLClient(cmsEndpoint, {
    headers: {
      authorization: `Bearer ${cmsToken}`,
    },
  });

  const results = await graphQLClient.request(mutation, mutationVariables);

  return results.updatePost;
};

import request, { gql } from "graphql-request";

const cmsAPI = process.env.NEXT_PUBLIC_CMS_APIKEY;

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

  const results = await request(cmsAPI, query);

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

  const results = await request(cmsAPI, query);

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
      }
    }
  `;

  const results = await request(cmsAPI, query, { slug });

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

  const results = await request(cmsAPI, query, { slug });

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

  const results = await request(cmsAPI, query, { q });

  return results.posts;
};

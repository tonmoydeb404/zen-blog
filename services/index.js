import request, { gql } from "graphql-request";

const CMS_ENDPOINT = process.env.CMS_ENDPOINT;

// get posts from cms
export const getPosts = async () => {
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

    return data;
  } catch (error) {
    return { isError: true, error };
  }
};

// get similar posts from cms
export const getSimilarPosts = async (tags, slug, limit) => {
  if (!tags || !slug || !limit)
    return { isEror: true, error: { message: "arguments are invalid" } };

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

    return data;
  } catch (error) {
    return { isError: true, error };
  }
};

// get a specific post
export const getPost = async (slug) => {
  if (!slug)
    return { isEror: true, error: { message: "arguments are invalid" } };

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

export const getCategory = async (slug) => {
  if (!slug)
    return { isEror: true, error: { message: "arguments are invalid" } };

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
    return data;
  } catch (error) {
    return { isError: true, error };
  }
};

// get all categories
export const getCategories = async () => {
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

    return data;
  } catch (error) {
    return { isError: true, error };
  }
};

// get post by search query
export const getSearchPosts = async (searchQuery) => {
  if (!searchQuery)
    return { isEror: true, error: { message: "arguments are invalid" } };

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

    return data;
  } catch (error) {
    return { isError: true, error };
  }
};

// submit comment
export const submitComment = async (commentDetails, postSlug) => {
  if (!commentDetails || !postSlug)
    return { isEror: true, error: { message: "arguments are invalid" } };

  try {
    const result = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentDetails,
        postSlug,
      }),
    });

    return result.json();
  } catch (error) {
    return { isEror: true, error };
  }
};

import { gql } from "graphql-request";

export const getPostsQuery = gql`
    query getPosts() {
      posts(orderBy: createdAt_DESC,) {
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

// query document for getting all similar posts
export const getSimilarPostsQuery = gql`
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

// query document to get a specific post
export const getPostQuery = gql`
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

// query document to get a specific category
export const getCategoryQuery = gql`
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
        description
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

// query document for getting all categories
export const getCategoriesQuery = gql`
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

// query document for getting search result according to search query
export const getSearchPostsQuery = gql`
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

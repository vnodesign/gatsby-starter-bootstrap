import config from "../../config";
import moment from "moment";
import slug from "slug";

// slugify uses the - as a separator for the url
export const slugify = (text) => slug(text).toLowerCase();

// isInternal returns true if the url is internal
export const isInteralLink = (link) => link && link[0] === "/";

// formatDate formats the date to a human readable format
export const formatDate = (date) => moment(date).fromNow();

// getTagPath returns the path for a tag
export const getTagPath = (tag) => 
  `${config.pathPrefixTag}/${slugify(tag)}`;

// getCategoryPath returns the path for a category
export const getCategoryPath = (category) => 
  `${config.pathPrefixCategory}/${slugify(category)}`;

// getPostList returns the path for a post list
export const getPostList = (postEdges) =>
  postEdges.map((postEdge) => ({
    path: postEdge.node.fields.slug,
    tags: postEdge.node.frontmatter.tags,
    categories: postEdge.node.frontmatter.categories,
    cover: postEdge.node.frontmatter.cover,
    title: postEdge.node.frontmatter.title,
    author: postEdge.node.frontmatter.author,
    featured: postEdge.node.frontmatter.featured,
    priceCurrency: postEdge.node.frontmatter.priceCurrency,
    price: postEdge.node.frontmatter.price,
    ratingValue: postEdge.node.frontmatter.ratingValue,
    ratingCount: postEdge.node.frontmatter.ratingCount,
    reviewCount: postEdge.node.frontmatter.reviewCount,
    bestRating: postEdge.node.frontmatter.bestRating,
    date: postEdge.node.fields.date,
    slug: postEdge.node.fields.slug,
    excerpt: postEdge.node.excerpt,
    timeToRead: postEdge.node.timeToRead,
  }));

// getTagCategoryList returns the list of tags and categories
export const getTagCategoryList = (postList) => {
  const tagSet = new Set();
  const categorySet = new Set();

  postList.forEach(({ categories, tags }) => {
    if (categories) {
      categories.forEach((category) => {
        categorySet.add(category);
      });
    }

    if (tags) {
      tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }
  });

  return {
    tagList: Array.from(tagSet),
    categoryList: Array.from(categorySet),
  };
};

const path = require("path");
const slug = require("slug");
const config = require("./config");
const slugify = (text) => slug(text).toLowerCase();

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${node.frontmatter.slug}/`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${node.frontmatter.slug}/`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date"))
        createNodeField({ node, name: "date", value: node.frontmatter.date });
    }
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPageTemplate = path.resolve("src/templates/post-template.jsx");
  const pagePageTemplate = path.resolve("src/templates/page-template.jsx");
  const tagPageTemplate = path.resolve("src/templates/tag-template.jsx");
  const categoryPageTemplate = path.resolve("src/templates/category-template.jsx");
  const notfoundPageTemplate = path.resolve("src/templates/not-found-template.jsx");
  const indexPageTemplate = path.resolve("src/templates/index-template.jsx");
  const searchPageTemplate = path.resolve("src/templates/search-template.jsx");
  const categoryListPageTemplate = path.resolve("src/templates/category-list-template.jsx");
  const tagListPageTemplate = path.resolve("src/templates/tag-list-template.jsx");

  const markdownQueryResult = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                template
                title
                tags
                categories
                date
              }
            }
          }
        }
      }
    `
  );

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  // Filter data
  const tagSet = new Set();
  const categorySet = new Set();
  const postEdges = [];
  const pageEdges = [];

  markdownQueryResult.data.allMarkdownRemark.edges.forEach((edge) => {
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    if (edge.node.frontmatter.categories) {
      edge.node.frontmatter.categories.forEach((category) => {
        categorySet.add(category);
      });
    }

    if (edge.node.frontmatter.template === "post") {
      postEdges.push(edge);
    } else if (edge.node.frontmatter.template === "page") {
      pageEdges.push(edge);
    } else {
      console.warn(
        `WARNING: Unrecognized template: ${edge.node.frontmatter.template}`
      );
    }
  });

  // Create tagList, categoryList
  const tagList = Array.from(tagSet);
  const categoryList = Array.from(categorySet);

  // Get latest posts
  const latestPostEdges = [];
  postEdges.forEach((edge) => {
    if (latestPostEdges.length < config.numberLatestPost) {
      latestPostEdges.push(edge);
    }
  });

  // Create post page
  postEdges.forEach((edge, index) => {
    const nextID = index + 1 < postEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postEdges.length - 1;
    const nextEdge = postEdges[nextID];
    const prevEdge = postEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: postPageTemplate,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug,
      },
    });
  });

  // create page page
  pageEdges.forEach((edge) => {
    createPage({
      path: edge.node.fields.slug,
      component: pagePageTemplate,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });

  // common config for pagination
  const postsPerPage = config.postsPerPage;
  const pathPrefixPagination = config.pathPrefixPagination;

  // create tag page
  tagList.forEach((tag) => {
    const tagPosts = postEdges.filter((edge) => {
      const tags = edge.node.frontmatter.tags;
      return tags && tags.includes(tag);
    });

    const numTagPages = Math.ceil(tagPosts.length / postsPerPage);
    const basePath = `${config.pathPrefixTag}/${slugify(tag)}`;

    Array.from({ length: numTagPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? basePath : `${basePath}/${pathPrefixPagination}/${i}`,
        component: tagPageTemplate,
        context: {
          tag,
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i
        },
      });
    }
  );
  });

  // create category page
  categoryList.forEach((category) => {
    const categoryPosts = postEdges.filter((edge) => {
      const categories = edge.node.frontmatter.categories;
      return categories && categories.includes(category);
    });

    const numCategoryPages = Math.ceil(categoryPosts.length / postsPerPage);
    const basePath = `${config.pathPrefixCategory}/${slugify(category)}`;

    Array.from({ length: numCategoryPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? basePath : `${basePath}/${pathPrefixPagination}/${i}`,
        component: categoryPageTemplate,
        context: {
          category,
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i
        },
      });
    }
  );
  });

  // create 404 not found page
  createPage({
    path: "/404/",
    component: notfoundPageTemplate,
  });

  // create index page
  {
    const numIndexPages = Math.ceil(postEdges.length / postsPerPage);

    Array.from({ length: numIndexPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `${pathPrefixPagination}/${i}`,
        component: indexPageTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i
        },
      });
    }
  );
  }

  // create search page
  createPage({
    path: "/search/",
    component: searchPageTemplate,
  });

  // create category list page
  createPage({
    path: "/categories/",
    component: categoryListPageTemplate,
    context: {
      categoryList,
    },
  });

  // create tag list page
  createPage({
    path: "/tags/",
    component: tagListPageTemplate,
    context: {
      tagList,
    },
  });

  // replace date year/month/slug to /slug
  const dateRegExp = /^\/(\d{4}\/\d{2}\/[^/]+)/;
  
  const redirects = [];

  postEdges.forEach((edge) => {
    const match = edge.node.fields.slug.match(dateRegExp);
    if (match) {
      redirects.push({
        fromPath: match[0],
        toPath: edge.node.fields.slug,
        isPermanent: true,
      });
    }
  }
  );

};
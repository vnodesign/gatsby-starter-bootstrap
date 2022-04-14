import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import { Row } from "react-bootstrap";
import PostBox from "../components/PostBox/PostBox";
import { getPostList } from "../utils/helpers";
import config from "../../config";

const CategoryTemplate = ({ data, pageContext }) => {
  const { category } = pageContext;
  const postEdges = data.allMarkdownRemark.edges;
  const postList = getPostList(postEdges);
  const pageTitle = `${category} - ${config.siteTitle}`;
  const content = (
    <PostBox
      postList={postList}
      hasThumbnail={config.categoryHasThumbnail}
      hasLoadmore={config.lazyLoadArticles}
      postsPerPage={config.postsPerPage}
      numberLoadmore={config.numberLoadmore}
      btnLoadmore={config.btnLoadmore}
      forcePostsPerPage={config.lazyLoadArticles == false}
    />
  );

  return (
    <Layout>
      <Helmet title={pageTitle} />
      <section className="recent-posts">
      <div className="section-title">
        <h2>
          Category <span>{category}</span>
        </h2>
      </div>
      <Row className="listrecent">{content}</Row>
      </section>
    </Layout>
  );
};

export default CategoryTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          categories: { in: [$category] }
          template: { eq: "post" }
        }
      }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            author
            featured
            bestRating
            cover {
              childImageSharp {
                gatsbyImageData(
                  width: 414
                  height: 223
                  quality: 100
                  layout: CONSTRAINED
                )
              }
            }
            date
          }
        }
      }
    }
  }
`;

import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import { Row } from "react-bootstrap";
import PostBox from "../components/PostBox/PostBox";
import { getPostList } from "../utils/helpers";
import config from "../../config";

const TagTemplate = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const postEdges = data.allMarkdownRemark.edges;
  const postList = getPostList(postEdges);
  const pageTitle = `All Posts tagged as "${tag}" - ${config.siteTitle}`;
  const content = (
    <PostBox
      postList={postList}
      hasThumbnail={config.tagHasThumbnail}
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
      <Row>
        <section className="recent-posts">
        <div className="section-title">
          <h2>
            Tag <span>{tag}</span>
          </h2>
        </div>
        <Row className="listrecent">{content}</Row>
        </section>
      </Row>
    </Layout>
  );
};

export default TagTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] }, template: { eq: "post" } }
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
            categories
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

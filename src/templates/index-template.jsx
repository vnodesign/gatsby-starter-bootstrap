import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import { Row } from "react-bootstrap";
import PostBox from "../components/PostBox/PostBox";
import SEO from "../components/SEO/SEO";
import IndexSchema from "../components/SEO/Schema/IndexSchema";
import { getPostList } from "../utils/helpers";
import config from "../../config";

const IndexTemplate = ({ data }) => {
    const postEdges = data.allMarkdownRemark.edges;
    const postList = getPostList(postEdges);
    const pageTitle = `${config.siteTitle} - ${config.siteSubTitle}`;
    
    const content = (
        <PostBox
        postList={postList}
        hasThumbnail={config.homeHasThumbnail}
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
        <SEO />
        <IndexSchema />
        <section className="recent-posts">
            <div className="section-title">
            <h2>Recent Posts</h2>
            </div>
            <Row className="listrecent">{content}</Row>
        </section>
        </Layout>
    );
};

export default IndexTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexPage {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
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
            date
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
          }
        }
      }
    }
  }
`;

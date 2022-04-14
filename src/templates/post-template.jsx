import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import { Container, Row } from "react-bootstrap";
import Post from "../components/Post/Post";
import SEO from "../components/SEO/SEO";
import PostSchema from "../components/SEO/Schema/PostSchema";
import config from "../../config";

const PostTemplate = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const title = postNode.frontmatter.title;
  

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <PostSchema postNode={postNode} config={config} />
      <Container>
        <Row>
        <Post postNode={postNode} config={config} slug={slug} />
        </Row>
      </Container>
    </Layout>
  );
};

export default PostTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        date
        categories
        tags
        description
        author
        featured
        priceCurrency
        price
        ratingValue
        ratingCount
        reviewCount
        worstRating
        bestRating
        cover {
          childImageSharp {
            gatsbyImageData(
              width: 803
              height: 532
              quality: 100
              layout: FIXED
            )
          }
        }
      }
      fields {
        slug
        date
      }
    }
  }
`;

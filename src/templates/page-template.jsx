import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import { Container, Row } from "react-bootstrap";
import Page from "../components/Page/Page";
import SEO from "../components/SEO/SEO";
import PageSchema from "../components/SEO/Schema/PageSchema";
import config from "../../config";

const PageTemplate = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const title = postNode.frontmatter.title;

  return (
    <Layout hasFooter={false}>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <PageSchema postNode={postNode} slug={slug} />
      <Container>
        <Row>
          <Page postNode={postNode} slug={slug} />
        </Row>
      </Container>
    </Layout>
  );
};

export default PageTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        description
      }
      fields {
        slug
      }
    }
  }
`;

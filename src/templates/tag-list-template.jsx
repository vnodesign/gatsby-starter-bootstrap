import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/Layout/Layout";
import Tag from "../components/Tag/Tag";
import config from "../../config";

const TagListTemplate = ({ pageContext }) => {
  const { tagList } = pageContext;

  return (
    <Layout hasFooter={false}>
        <Helmet title={`Tag - ${config.siteTitle}`} />
        <Tag tagList={tagList} />
    </Layout>
  );
};

export default TagListTemplate;
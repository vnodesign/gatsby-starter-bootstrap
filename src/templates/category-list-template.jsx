import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/Layout/Layout";
import Categories from "../components/Categories/Categories";
import config from "../../config";

const CategoryListTemplate = ({ pageContext }) => {
  const { categoryList } = pageContext;

  return (
    <Layout hasFooter={false}>
        <Helmet title={`Category - ${config.siteTitle}`} />
        <Categories categoryList={categoryList} />
    </Layout>
  );
};

export default CategoryListTemplate;
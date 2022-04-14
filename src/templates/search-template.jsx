import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/SEO";
import config from "../../config";

// Google Custom Search Engine

const GoogleSearch = () => (
  <>
    <script
      async
      src={`https://cse.google.com/cse.js?cx=${config.searchEngineID}`}
    />
    <div className="gcse-searchresults-only" />
  </>
);

const SearchTemplate = () => (
  <Layout hasFooter={false}>
    <Helmet
      title="Google Custom Search"
      description="Search results from Google Custom Search"
    />
    <SEO />
    <div className="text-center mx-auto">
      <GoogleSearch />
    </div>
  </Layout>
);

export default SearchTemplate;

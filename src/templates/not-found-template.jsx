import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/SEO";
import Link from "../components/Link/Link";
import config from "../../config";

const NotFoundPage = () => (
    <Layout hasFooter={false}>
        <Helmet title={`${config.pageNotFoundTitle} - ${config.siteTitle}`} />
        <SEO />
        <div className="vno-error text-center">
        <h1 className="display-1 mt-5 mb-4">{config.pageNotFoundTitle}</h1>
        <p>{config.pageNotFoundContent}</p>
        <Link to="/" className="btn btn-vnodesign">
            {config.pageNotFoundBtn}
        </Link>
        </div>
    </Layout>
);

export default NotFoundPage;
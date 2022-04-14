import React, { Component } from "react";
import { getSrc } from "gatsby-plugin-image";
import Helmet from "react-helmet";
import urljoin from "url-join";
import config from "../../../config";

class SEO extends Component {
  render() {
    const { postNode, postPath, postSEO } = this.props;
    let title;
    let description;
    let image = "";
    let postURL;

    if (postSEO) {
      const postMeta = postNode.frontmatter;
      ({ title } = postMeta);
      description = postMeta.description
        ? postMeta.description
        : postNode.excerpt;

      image = postMeta.cover ? getSrc(postMeta.cover) : config.siteSEO;
      postURL = urljoin(config.siteUrl, config.pathPrefix, postPath);
    } else {
      title = config.siteTitle;
      description = config.siteDescription;
      image = config.siteSEO;
    }
    image = urljoin(config.siteUrl, config.pathPrefix, image);
    const blogURL = urljoin(config.siteUrl, config.pathPrefix);

    return (
      <Helmet>
        {/* General tags */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <meta name="url" content={postURL || config.siteUrl} />
        <link rel="canonical" href={postURL || config.siteUrl} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={postSEO ? postURL : blogURL} />
        {postSEO ? (
          <meta property="og:type" content="article" />
        ) : (
          <meta property="og:type" content="website" />
        )}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="fb:app_id" content={config.siteFBAppID ? config.siteFBAppID : ""} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={config.userTwitter ? config.userTwitter : ""} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    );
  }
}

export default SEO;

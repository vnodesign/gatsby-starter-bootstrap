import React, { Component } from "react";
import Helmet from "react-helmet";
import config, { socialLinks } from "../../../../config";
import urljoin from "url-join";

class PageSchema extends Component {
  render() {
    const { postNode } = this.props;
    const postFrontmatter = postNode.frontmatter;
    const postFields = postNode.fields;
    const postSlug = postFields.slug;
    const postUrl = urljoin(config.siteUrl, postSlug);
    const title = postFrontmatter.title;
    const schemaGraph = [
      {
        "@context": "https://schema.org",
        "@graph": [
          // Organization
          {
            "@type": "Organization",
            "@id": `${config.siteUrl}#organization`,
            name: `${config.siteTitle}`,
            url: `${config.siteUrl}`,
            // social links
            sameAs: [socialLinks.map((social) => social.url)],
            logo: `${config.siteUrl}${config.siteLogo}`,
            image: {
              "@id": `${config.siteUrl}#logo`,
            },
          },
          // WebSite
          {
            "@type": "WebSite",
            "@id": `${config.siteUrl}#website`,
            url: `${config.siteUrl}`,
            name: `${config.siteTitle}`,
            description: `${config.siteDescription}`,
            publisher: {
              "@id": `${config.siteUrl}#organization`,
            },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                type: "EntryPoint",
                urlTemplate: `${config.siteUrl}/search/?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
            inLanguage: `${config.siteLang}`,
          },
          // WebPage
          {
            "@type": "WebPage",
            "@id": `${postUrl}#webpage`,
            url: `${postUrl}`,
            name: `${title}`,
            isPartOf: {
              "@id": `${config.siteUrl}#website`,
            },
            breadcrumb: {
              "@id": `${postUrl}#breadcrumb`,
            },
            inLanguage: `${config.siteLang}`,
            potentialAction: {
              "@type": "ReadAction",
              target: [`${postUrl}`],
            },
          },
          // BreadcrumbList
          {
            "@type": "BreadcrumbList",
            "@id": `${config.siteUrl}#breadcrumb`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${config.siteUrl}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: title,
                item: postUrl,
              },
            ],
          },
        ],
      },
    ];
    return (
      <Helmet>
        {/* Json schema */}
        <script type="application/ld+json">
          {JSON.stringify(schemaGraph)}
        </script>
      </Helmet>
    );
  }
}

export default PageSchema;

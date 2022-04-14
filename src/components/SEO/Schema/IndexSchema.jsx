import React, { Component } from "react";
import Helmet from "react-helmet";
import config, { socialLinks } from "../../../../config";

class IndexSchema extends Component {
  render() {
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
          // CollectionPage
          {
            "@type": "CollectionPage",
            "@id": `${config.siteUrl}#collection`,
            url: `${config.siteUrl}`,
            name: `${config.siteTitle}`,
            isPartOf: {
              "@id": `${config.siteUrl}#website`,
            },
            about: {
              "@id": `${config.siteUrl}#organization`,
            },
            description: `${config.siteDescription}`,
            breadcrumb: {
              "@id": `${config.siteUrl}#breadcrumb`,
            },
            inLanguage: `${config.siteLang}`,
            potentialAction: {
              "@type": "ReadAction",
              target: [`${config.siteUrl}`],
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

export default IndexSchema;

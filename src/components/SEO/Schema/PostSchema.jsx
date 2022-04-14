import React, { Component } from "react";
import { getSrc } from "gatsby-plugin-image";
import Helmet from "react-helmet";
import config, { socialLinks } from "../../../../config";
import urljoin from "url-join";

class PostSchema extends Component {
  render() {
    const { postNode } = this.props;
    const postFrontmatter = postNode.frontmatter;
    const postFields = postNode.fields;
    const postSlug = postFields.slug;
    const postUrl = urljoin(config.siteUrl, postSlug);
    const title = postFrontmatter.title;
    const featured = postFrontmatter.featured ? postFrontmatter.featured : false;
    const schemaPriceCurrency = postFrontmatter.priceCurrency ? postFrontmatter.priceCurrency : "USD";
    const schemaPrice = postFrontmatter.price ? postFrontmatter.price : 0;
    const schemaValue = postFrontmatter.ratingValue ? postFrontmatter.ratingValue : 0;
    const schemaCount = postFrontmatter.ratingCount ? postFrontmatter.ratingCount : 0;
    const schemaReviewCount = postFrontmatter.reviewCount ? postFrontmatter.reviewCount : 0;
    const schemaWorstRating = postFrontmatter.worstRating ? postFrontmatter.worstRating : 0;
    const schemaBestRating = postFrontmatter.bestRating ? postFrontmatter.bestRating : 0;
    const image = postFrontmatter.cover ? getSrc(postFrontmatter.cover) : config.siteSEO;
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
            primaryImageOfPage: {
              "@id": `${image}`,
            },
            datePublished: `${postFrontmatter.date}`,
            description: `${postFrontmatter.description}`,
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
            "@id": `${postUrl}#breadcrumb`,
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
    if (featured) {
      schemaGraph[0]["@graph"].push({
        "@type": "Product",
        "@id": `${postUrl}#product`,
        name: `${title}`,
        image: {
          "@id": `${image}`,
        },
        description: `${postFrontmatter.description}`,
        offers: {
          "@type": "Offer",
          priceCurrency: `${schemaPriceCurrency}`,
          price: `${schemaPrice}`,
          url: `${postUrl}`,
          seller: {
            "@id": `${config.siteUrl}#organization`,
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: `${schemaValue}`,
          ratingCount: `${schemaCount}`,
          reviewCount: `${schemaReviewCount}`,
          bestRating: `${schemaBestRating}`,
          worstRating: `${schemaWorstRating}`,
        },
      });
    }
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

export default PostSchema;

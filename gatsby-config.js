const config = require("./config");
const postCssPlugins = require("./postcss-config.js");

module.exports = {
  pathPrefix: config.pathPrefix === "" ? "/" : config.pathPrefix,
  polyfill: false,
  siteMetadata: {
    siteUrl: config.siteUrl + config.pathPrefix,
    feedUrl: config.siteUrl + config.pathPrefix + config.siteRss,
    title: config.siteTitle,
    description: config.siteDescription,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-lodash",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/static/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/images/`,
        name: "images",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-relative-images",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1200,
              withWebp: true,
              quality: 80,
            },
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 660,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: { wrapperStyle: "margin: 0 1.0725rem" },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [config.googleAnalyticsID],
        pluginConfig: {
          head: false
        },
      },
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: config.themeColor,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-no-sourcemaps",
    "gatsby-plugin-catch-links",
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
        postCssPlugins: [...postCssPlugins],
        cssLoaderOptions: {
          camelCase: false,
        },

        sassOptions: {
          precision: 8,
        },
      },
    },
    "gatsby-plugin-advanced-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: `/`,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "minimal-ui",
        icon: "static/tuanducdesign.jpg",
        icons: [
          // 57x57
          {
            src: "apple-touch-icon-57x57.png",
            sizes: "57x57",
            type: "image/png",
          },
          // 72x72
          {
            src: "apple-touch-icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          // 76x76
          {
            src: "apple-touch-icon-76x76.png",
            sizes: "76x76",
            type: "image/png",
          },
          // 114x114
          {
            src: "apple-touch-icon-114x114.png",
            sizes: "114x114",
            type: "image/png",
          },
          // 120x120
          {
            src: "apple-touch-icon-120x120.png",
            sizes: "120x120",
            type: "image/png",
          },
          // 144x144
          {
            src: "apple-touch-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          // 152x152
          {
            src: "apple-touch-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          // 180x180
          {
            src: "apple-touch-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
        {
          site {
            siteMetadata {
                siteUrl
                feedUrl
                title
                description
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map((edge) => ({
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                date: edge.node.fields.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [
                  {
                    "content:encoded": `${edge.node.html}`,
                  },
                ],
              })),
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: { 
                  frontmatter: { 
                    template: { eq: "post" } 
                  } 
                }
              ) {
                edges {
                  node {
                    excerpt(pruneLength: 180)
                    html
                    timeToRead
                    fields {
                      slug
                      date
                    }
                    frontmatter {
                      title
                      date
                      categories
                      tags
                    }
                  }
                }
              }
            }
          `,
            output: config.siteRss,
            title: config.siteTitle,
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    "gatsby-plugin-optimize-svgs",
    "gatsby-plugin-offline",
    "gatsby-plugin-robots-txt",
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: config.googleAdsenseID,
      },
    },
  ],
};

const config = {
  // Site info
  siteTitle: "Gatsby Starter Bootstrap", // Site title.
  siteSubTitle: "GatsbyJS Blog Template for blogging purpose.",
  siteTitleShort: "GS Bootstrap", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Gatsby Starter Bootstrap", // Alternative site title for SEO.
  siteLogo: "/tuanducdesign.jpg", // Logo used for SEO and manifest.
  siteSEO: "/CA0E67E9-AAD0-4D36-82D8-674C7504DFD1.jpg", // Used when share to Twitter and Facebook
  siteUrl: "https://gatsby.com", // Domain of your website without pathPrefix.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription:
    "Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteLang: "en", // Language used for language tags on the site.
  siteFBAppID: "xxxxxxxxxxxxxxx", // FB Application ID for using app insights.
  googleAnalyticsID: "UA-xxxxxxxxx-x", // GA tracking ID.
  googleAdsenseID: "ca-pub-xxxxxxxxxxxxxxxx", // GA ID for ads.
  // Common for tag, category pages
  postsPerPage: 6, // Number of posts per page.
  // Use for post
  postOnDate: "Posted on", // Post on date text.
  numberLoadmore: 6,
  btnLoadmore: "Load articles",
  lazyLoadArticles: true, // Show lazy load articles, default is true.
  // Use for comment
  lazyLoadComments: true, // Lazy load comments, default is true.
  disqusShortname: "tuanducdesign", // Disqus shortname.
  btnLoadComments: "Load comments", // Button text for load comments.
  // Use for home page
  homeHasThumbnail: true, // Show thumbnail on home page.
  // Use for page
  pathPrefixPagination: "/page", // Prefix path for pagination
  // Use for 404 page
  pathPrefixNotFound: "/404", // Prefix path for 404 page
  pageNotFoundTitle: "Page Not Found", // Page not found title.
  pageNotFoundBtn: "Back to our site", // Button text for back to our site.
  pageNotFoundContent:
    "Looks like you've followed a broken link or entered a URL that doesn't exist on this site.", // Page not found content.
  // Use for tag
  pathPrefixTag: "/tag", // Prefix path for tags
  tagHasThumbnail: true, // Show thumbnail on tag page.
  // Use for category
  pathPrefixCategory: "/category", // Prefix path for category
  categoryHasThumbnail: true, // Show thumbnail on category page.
  // Use for Google custom search
  searchWidgetPlaceHolder: "Enter keyword", // Placeholder for search
  searchEngineID: "45ad36e4774f88fec", // Search engine ID.
  hasSearch: true, // Show search on navigation bar.
  // Use for navigation
  navLogo: "/tuanducdesign.jpg", // Logo used for navigation.
  navTitle: "Tuan Duc Design", // Title used for navigation.
  navLinks: [
    { label: "Blog", url: "/" },
    { label: "Contacts", url: "/contacts" },
    { label: "About", url: "/about" },
    { label: "Categories", url: "/categories" },
    { label: "Tags", url: "/tags" },
  ],
  // Use for footer
  copyright:
    "Copyright © 2022 VNO DESIGN. Unless otherwise noted, all code MIT license.",
  // Use for social
  socialLinks: [
    {
      icon: "twitter", // I used Bootstrap Icon
      url: "#", // url of the social site
      name: "Twitter", // name of the social site
    },
    {
      icon: "facebook", // I used Bootstrap Icon
      url: "#", // url of the social site
      name: "Facebook", // name of the social site
    },
    {
      icon: "instagram", // I used Bootstrap Icon
      url: "#", // url of the social site
      name: "Instagram", // name of the social site
    },
    {
      icon: "github", // I used Bootstrap Icon
      url: "#", // url of the social site
      name: "Github", // name of the social site
    },
  ],
  // Use for manifest
  themeColor: "#fe2c55", // Used for setting manifest and progress theme colors.
  backgroundColor: "#FFF", // Used for setting manifest background color.
  // Use for profile
  userTwitter: "@username", // Your Twitter username.
  userEmail: "admin@example.com", // Your email address.
  userAuthor: "Tuan Duc Tran", // Your name.
  userAuthorDescription: "Ask me about Optimize Website, Install VPS, Hosting Selection...", // Your author description.
  userAuthorUrl: "https://tuanducdesign.com", // Your author URL.
  userAuthorAvatar: "/tuanducdesign.jpg", // Your author avatar.
};

module.exports = config;

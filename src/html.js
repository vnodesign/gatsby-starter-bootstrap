import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head itemScope itemType="https://schema.org/WebSite">
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body
        {...props.bodyAttributes}
        className="d-flex flex-column min-vh-100"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
          itemProp="mainContentOfPage"
          itemScope
          itemType="https://schema.org/WebPageElement"
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};

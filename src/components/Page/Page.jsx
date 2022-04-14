import React from "react";
import { Col } from "react-bootstrap";
import "./Page.modules.scss";

const Page = ({ postNode }) => {
  const post = postNode.frontmatter;

  return (
    <Col md={12} className="vno-page">
      <article>
        <div className="mainheading">
          <h1 className="posttitle">{post.title}</h1>
        </div>
        <div className="article-post">
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: postNode.html }}
          />
        </div>
      </article>
    </Col>
  );
};

export default Page;

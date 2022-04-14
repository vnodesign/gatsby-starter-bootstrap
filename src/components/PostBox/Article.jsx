import React from "react";
import Thumbnail from "./Thumbnail";
import PostInfo from "./PostInfo";
import { Col } from "react-bootstrap";
import "./Article.modules.scss";

const Article = ({ post, hasThumbnail }) => (
  <Col
    lg={4}
    md={6}
    sm={12}
    key={post.title}
    className="mb-30px card-group"
    itemScope
    itemType="https://schema.org/Article"
  >
    <div className="card h-100">
      <div className="maxthumb">
        {hasThumbnail && <Thumbnail post={post} />}
      </div>
      <PostInfo post={post} />
    </div>
  </Col>
);

export default Article;

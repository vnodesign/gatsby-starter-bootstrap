import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Link from "../Link/Link";
import gtagTrack from "../../utils/gtag";

const Thumbnail = ({ post }) => {
  const thumbnail = post.cover ? (
    <Link
      to={post.slug}
      key={post.title}
      title={post.title}
      onClick={() =>
        gtagTrack("ThumbLink", "click", post.slug, { title: post.title })
      }
    >
      <GatsbyImage
        image={getImage(post.cover)}
        alt={post.title}
        className="img-fluid"
      />
    </Link>
  ) : null;

  return thumbnail;
};

export default Thumbnail;

import React from "react";
import Link from "../Link/Link";
import { getTagPath } from "../../utils/helpers";
import gtagTrack from "../../utils/gtag";

const PostTags = ({ tags }) => {
  const tagLink = (tag) => (
    <Link
      to={getTagPath(tag)}
      label={tag}
      title={tag}
      onClick={() =>
        gtagTrack("TagsLink", "click", getTagPath(tag), {
          type: "tags_item",
          value: getTagPath(tag),
          from: "tags_list",
        })
      }
    >
      {tag}
    </Link>
  );

  return (
    <>
      {tags && (
        <ul className="post-tags">
          {tags.map((tag) => (
            <li key={tag}>{tagLink(tag)}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PostTags;

import React from "react";
import Link from "../Link/Link";
import { getCategoryPath } from "../../utils/helpers";
import gtagTrack from "../../utils/gtag";

const PostCategories = ({ categories }) => {
  const categoryLink = (category) => (
    <Link
      to={getCategoryPath(category)}
      label={category}
      title={category}
      onClick={() =>
        gtagTrack("CategoriesLink", "click", getCategoryPath(category), {
          type: "categories_item",
          value: getCategoryPath(category),
          from: "categories_list",
        })
      }
    >
      {category}
    </Link>
  );

  return (
    <>
      {categories && (
        <ul className="post-categories">
          {categories.map((category) => (
            <li key={category}>{categoryLink(category)}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PostCategories;

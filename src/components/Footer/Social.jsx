import React from "react";
import config from "../../../config";
import Link from "../../components/Link/Link";
import gtagTrack from "../../utils/gtag";

const Social = () => (
  <div
    className="socials"
    itemProp="mainEntity"
    itemScope
    itemType="https://schema.org/Person"
  >
    {config.socialLinks.map((social) => {
      const { icon, name, url } = social;
      return (
        <Link
          key={name}
          to={url}
          title={name}
          onClick={() => gtagTrack("Social", "click", url)}
          itemProp="sameAs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={`bi bi-${icon}`} />
        </Link>
      );
    })}
  </div>
);

export default Social;

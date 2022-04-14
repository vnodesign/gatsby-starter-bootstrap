import React from "react";
import config from "../../../config";

const Copyright = () => (
  <div
    className="footer-copyright"
    itemProp="copyrightHolder"
    itemScope
    itemType="https://schema.org/Organization"
  >
    <p>{config.copyright}</p>
  </div>
);

export default Copyright;

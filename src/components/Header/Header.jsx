import React, { Component } from "react";
import config from "../../../config";
import Navigation from "../Navigation/Navigation";
import "./Header.modules.scss";

class Header extends Component {
  render() {
    return (
      <header
        id="header"
        className="vno-header"
        role="banner"
        itemScope
        itemType="https://schema.org/WPHeader"
      >
        <Navigation
          brand={config.navLogo}
          title={config.navTitle}
          links={config.navLinks}
        />
      </header>
    );
  }
}

export default Header;

import React, { Component } from "react";
import config from "../../../config";
import Link from "../Link/Link";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";
// import gtagTrack
import gtagTrack from "../../utils/gtag";
import "./Navigation.modules.scss";
class Navigation extends Component {
  render() {
    const { brand, title, links } = this.props;
    return (
      <Navbar
        className="vno-navbar"
        expand="lg"
        fixed="top"
        role="navigation"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <Container>
          <Link to="/" className="navbar-brand" itemProp="url" title={title}>
            <img src={brand} alt={title} />
          </Link>
          <Navbar.Toggle aria-controls="vno-navbar-responsive" />
          <Navbar.Collapse id="vno-navbar-responsive">
            <Nav className="ms-auto">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.url}
                  title={link.label}
                  className="nav-link"
                  activeClassName="active"
                  onClick={() => gtagTrack("Menu", "click", link.url)}
                  partiallyActive={false}
                  itemProp="url"
                >
                  <span itemProp="name">{link.label}</span>
                </Link>
              ))}
            </Nav>
            {config.hasSearch && (
              <Form action="/search/" method="get" className="my-auto my-lg-0">
                <FormControl
                  type="text"
                  name="q"
                  required
                  placeholder={config.searchWidgetPlaceHolder}
                  className="me-sm-2"
                />
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;

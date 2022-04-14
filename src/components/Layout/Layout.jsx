import React from "react";
import Helmet from "react-helmet";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import config from "../../../config";
import { Container } from "react-bootstrap";

const Layout = ({ children, hasFooter = true }) => (
  <div className="vno-roots">
    <Helmet htmlAttributes={{ lang: config.siteLang }}>
      <meta name="description" content={config.siteDescription} />
      <link rel="canonical" href={config.siteUrl} />
    </Helmet>
    <Header />
    <Container className="vno-layout">
      <div className="main-content">{children}</div>
    </Container>
    {hasFooter && <Footer copyright={config.copyright} />}
  </div>
);

export default Layout;

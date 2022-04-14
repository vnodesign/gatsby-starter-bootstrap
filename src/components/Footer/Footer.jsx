import React from "react";
import Copyright from "./Copyright";
import Social from "./Social";
import "./Footer.modules.scss";
import { Container, Row, Col } from "react-bootstrap";

const Footer = ({ copyright, social }) => (
  <footer
    className="footer"
    role="contentinfo"
    itemScope
    itemType="https://schema.org/WPFooter"
  >
    <Container>
      <Row>
        <Col sm={12}>
          <Social social={social} />
          <Copyright copyright={copyright} />
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;

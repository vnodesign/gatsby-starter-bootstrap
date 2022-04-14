import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import Link from "../Link/Link";
import "./Tag.modules.scss";
import { getTagPath } from "../../utils/helpers";
import gtagTrack from "../../utils/gtag";

const Tags = ({ tagList }) => (
        <section className="tagsList">
            <Container>
                <Row>
                    <Col xs={12}>
                        <h1>Tags</h1>
                        <p>In this tag, I will compile a list of the tags currently available on my blog, making it easier for you to find articles.</p>
                    </Col>
                    <div className="list">
                    {tagList.map((tag) => (
                        <li className="item" key={tag}>
                            <Link
                                key={tag}
                                to={getTagPath(tag)}
                                title={tag}
                                className="tag-list-item"
                                onClick={() => gtagTrack("Tag", tag)}
                            >
                                {tag}
                            </Link>
                        </li>
                    ))}
                    </div>
                </Row>
            </Container>
        </section>
);

export default Tags;

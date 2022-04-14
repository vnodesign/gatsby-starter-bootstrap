import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import Link from "../Link/Link";
import "./Categories.modules.scss";
import { getCategoryPath } from "../../utils/helpers";
import gtagTrack from "../../utils/gtag";

const Categories = ({ categoryList }) => (
        <section className="categoriesList">
            <Container>
                <Row>
                    <Col xs={12}>
                        <h1>Categories</h1>
                        <p>In this category, I will compile a list of the categories currently available on my blog, making it easier for you to find articles.</p>
                    </Col>
                    <div className="list">
                    {categoryList.map((category) => (
                        <li className="item" key={category}>
                            <Link
                                key={category}
                                to={getCategoryPath(category)}
                                title={category}
                                className="category-list-item"
                                onClick={() => gtagTrack("Category", category)}
                            >
                                {category}
                            </Link>
                        </li>
                    ))}
                    </div>
                </Row>
            </Container>
        </section>
);

export default Categories;

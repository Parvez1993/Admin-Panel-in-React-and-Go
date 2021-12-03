import axios from "axios";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import List from "./List";

function Category() {
  return (
    <>
      <Container>
        <Row class="py-5">
          <Col lg={3}>
            <List />
          </Col>
          <Col lg={6}></Col>
        </Row>
      </Container>
    </>
  );
}

export default Category;

import axios from "axios";
import { Alert } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserContext } from "../contextapi";
import List from "./List";

function Products() {
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    // const res = axios
    //   .get("http://localhost:4000/v1/products")
    //   .then((res) => console.log(res.data.products))
    //   .then((data) => setProducts(data))
    //   .catch((err) => setError("404 error"));

    fetch("http://localhost:4000/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  console.log(products);

  return (
    <>
      {user ? (
        <Container>
          <Row class="py-5">
            <Col lg={3}>
              <List />
            </Col>
            <Col lg={6}>
              {products
                ? products.map((i) => {
                    return (
                      <Link to={`/product/${i.id}`}>
                        <li>{i.title}</li>
                      </Link>
                    );
                  })
                : "no"}
            </Col>
          </Row>
        </Container>
      ) : (
        "Login first"
      )}
    </>
  );
}

export default Products;

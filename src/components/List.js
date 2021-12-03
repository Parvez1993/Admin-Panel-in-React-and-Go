import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function List() {
  return (
    <ListGroup>
      <ListGroup.Item>
        <Link to="/">Home</Link>
      </ListGroup.Item>
      <ListGroup.Item>
        <Link to="/products">Product</Link>
      </ListGroup.Item>
      <ListGroup.Item>
        <Link to="/addProducts/0">Add Products</Link>
      </ListGroup.Item>
      <ListGroup.Item>
        <Link to="/category">Category</Link>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default List;

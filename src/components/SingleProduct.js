import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  Container,
  Modal,
  Alert,
} from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";

function SingleProduct() {
  const [products, setProducts] = useState("");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [shouldRender, setShouldRender] = useState(false);
  const [disabled, setDisabled] = useState(true);

  //bootstrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios.get(`http://localhost:4000/v1/product/${id}`).then((res) => {
      if (res.status !== "200") {
        let err = Error;
        err.message = "Invalid response code" + Response.status;
        setError(err);
      }
      setProducts(res.data.product);
      setTitle(res.data.product.title);
      setPrice(res.data.product.price);
      setDescription(res.data.product.description);
    });
    // .then((res) => setProducts(res.data.product));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.append("id", id);
    const payload = Object.fromEntries(data.entries());
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
    };

    fetch("http://localhost:4000/v1/admin/editproduct", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error.message);
        } else {
          setMsg("Ediited ");
          setDisabled(true);
          setShouldRender(true);
        }
      });
  };

  useEffect(() => {
    if (shouldRender) {
      setShouldRender(false);
    }
  }, [setShouldRender]);

  useEffect(() => {
    setTimeout(() => {
      setMsg(false);
    }, 5000);
  }, [msg]);

  const handleDelete = (e) => {
    e.preventDefault();
    handleClose();
    axios
      .get(`http://localhost:4000/v1/admin/deleteproduct/${id}`)
      .then((data) => {
        if (data.error) {
          <Alert>{data.error}</Alert>;
        } else {
          navigate("/products");
        }
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are your sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        {msg ? <Alert>{msg}</Alert> : ""}

        {products ? (
          <Row>
            <Col lg={6}>
              <Form onSubmit={handleSubmit}>
                <img src={products.image} width="400px" alt={products.title} />
                <h1>
                  Product title :{" "}
                  <input
                    type="text"
                    value={title}
                    disabled={disabled}
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                </h1>
                <h1>
                  Price :{" "}
                  <input
                    type="number"
                    value={price}
                    disabled={disabled}
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                  ></input>
                </h1>
                <h1>
                  Description :{" "}
                  <input
                    type="text"
                    value={description}
                    disabled={disabled}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                  ></input>
                </h1>

                {disabled ? (
                  ""
                ) : (
                  <Button style={{ background: "green" }} type="submit">
                    Submit
                  </Button>
                )}
              </Form>
            </Col>
            <Col lg={6}>
              <Button
                style={{
                  background: "blue",
                  fontSize: "2rem",
                  margin: "200px 0",
                }}
                onClick={() => {
                  setDisabled(!disabled);
                }}
              >
                Edit
              </Button>

              <Button
                style={{
                  background: "red",
                  fontSize: "2rem",
                  margin: "200px 0",
                }}
                onClick={handleShow}
              >
                Delete
              </Button>
            </Col>
          </Row>
        ) : (
          "loading "
        )}

        <div>
          <Link to="/products">
            <Button>Go back to products</Button>
          </Link>
        </div>
      </Container>
    </>
  );
}

export default SingleProduct;

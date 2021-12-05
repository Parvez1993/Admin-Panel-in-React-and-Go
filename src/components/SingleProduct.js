import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUniqueValues } from "../utilz";
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
import { Radio } from "semantic-ui-react";

function SingleProduct() {
  const [products, setProducts] = useState("");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [shouldRender, setShouldRender] = useState(false);
  const [disabled, setDisabled] = useState(true);

  //new
  const [newImage, setNewImage] = useState({});
  const [image, setimage] = useState({});
  const [stock, setStock] = useState(0);
  const [shipping, setShipping] = useState(false);
  const [sizes, setSizes] = useState("");

  const [selected, setSelected] = useState([]);
  const [category, setCategory] = useState("");

  //render

  let categoryOptions = [
    { id: "0", value: "category", text: "Choose Category" },
    { id: "1", value: "Men", text: "Men" },
    { id: "2", value: "Women", text: "Women" },
  ];

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
      console.log(res.data.product);
      setProducts(res.data.product);
      setTitle(res.data.product.title);
      setPrice(res.data.product.price);
      setDescription(res.data.product.description);
      setSizes(res.data.product.size);
      setCategory(res.data.product.category);
      setStock(res.data.product.stock);
      setShipping(res.data.product.shipping);
      setimage(res.data.product.image);
    });
    // .then((res) => setProducts(res.data.product));
  }, [id]);

  console.log("image", newImage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    data.append("id", id);
    data.append("size", selected);
    data.append("category", category);
    const payload = Object.fromEntries(data.entries());
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
    };

    data.append("image", newImage);

    await axios.post("http://localhost:4000/image", data);

    await fetch("http://localhost:4000/v1/admin/editproduct", requestOptions)
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
  console.log(products);
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

  const onChangeCheckbox = (e) => {
    const name = e.target.value;
    let selectedSize = selected;
    let checked = e.target.checked;

    if (checked) {
      selectedSize.push(name);
    } else {
      var index = selectedSize.indexOf(name);
      selectedSize.splice(index, 1);
    }

    let filteredArray = selectedSize.filter(function (item, pos) {
      return selectedSize.indexOf(item) === pos;
    });

    setSelected(filteredArray);
    // setSelected(selectedSize);
    console.log(filteredArray);
    console.log(selectedSize);
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
                <h1>
                  Sizes: <span> {sizes ? sizes.map((i) => i) : "loading"}</span>
                </h1>
                <div>
                  <label>x</label>
                  <input
                    type="checkbox"
                    value="x"
                    name="x"
                    onChange={onChangeCheckbox}
                    disabled={disabled}
                  ></input>
                </div>
                <div>
                  <label>l</label>
                  <input
                    type="checkbox"
                    value="l"
                    name="l"
                    onChange={onChangeCheckbox}
                    disabled={disabled}
                  ></input>
                </div>
                <div>
                  <label>m</label>
                  <input
                    type="checkbox"
                    value="m"
                    name="m"
                    onChange={onChangeCheckbox}
                    disabled={disabled}
                  ></input>
                </div>
                {/* ======================================category========================================== */}
                {console.log("Category", category)}
                <div>
                  <h3 size="big">Choose Category : {category}</h3>
                  <select
                    disabled={disabled}
                    onChange={(e) => setCategory(e.target.value) || null}
                    className="browser-default custom-select"
                    value={category}
                  >
                    <option value="">Please Select</option>
                    {categoryOptions.map((i) => {
                      return (
                        <option key={i.id} value={i.id} name="category">
                          {i.text}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {/* ======================================stock========================================== */}
                <div>
                  <div>
                    <h3 size="big">Stock</h3>
                    <input
                      type="number"
                      disabled={disabled}
                      value={stock}
                      name="stock"
                      placeholder="stock"
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                </div>
                {/* ======================================shipping========================================== */}
                <div>
                  <h3 size="big">Free Shipping: {shipping}</h3>
                  <Radio
                    label="Free Shipping??"
                    onClick={(e) => setShipping(!shipping)}
                    name="shipping"
                    checked={shipping ? true : false}
                  />
                </div>
                {/* ===============================images============================ */}
                <h3>Edit Images</h3>

                <input
                  type="file"
                  onChange={(e) => setNewImage(e.target.files[0])}
                  multiple="multiple"
                  placeholder="select image"
                ></input>
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

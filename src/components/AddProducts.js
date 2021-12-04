import Dropdown from "@restart/ui/esm/Dropdown";
import axios from "axios";
import { useState } from "react";
import { Col, Container, DropdownButton, Row } from "react-bootstrap";
import {
  Button,
  Form,
  Input,
  Label,
  Radio,
  Select,
  TextArea,
} from "semantic-ui-react";
import List from "./List";

function AddProducts() {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  // const [category, setcategory] = useState("");
  const [image, setimage] = useState({});
  const [stock, setStock] = useState(0);
  const [shipping, setShipping] = useState(false);
  // const [rating, setrating] = useState("");
  const [sizes, setSizes] = useState([
    {
      id: 1,
      name: "x",
      value: "x",
    },
    {
      id: 2,
      name: "l",
      value: "l",
    },
    {
      id: 3,
      name: "m",
      value: "m",
    },
  ]);

  //const [size, setSize] = useState([]);
  const [selected, setSelected] = useState([]);
  const [category, setCategory] = useState("");

  let categoryOptions = [
    { id: "0", value: "category", text: "Choose Category" },
    { id: "1", value: "Men", text: "Men" },
    { id: "2", value: "Women", text: "Women" },
  ];

  console.log(category);
  const handleSubmit = async (e) => {
    if (
      title === "" &&
      price === "" &&
      description === "" &&
      image === "" &&
      stock === "" &&
      selected === "" &&
      shipping === ""
    ) {
      return window.alert("fill all the forms please");
    }
    e.preventDefault();
    const data = new FormData(e.target);
    // console.log("data", data);
    data.append("id", id);
    data.append("size", selected);
    data.append("category", category);
    const payload = Object.fromEntries(data.entries());
    console.log(payload);
    console.log(JSON.stringify(payload));
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
    };

    await fetch("http://localhost:4000/v1/admin/editproduct", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });

    data.append("image", image);
    console.log("data", data);

    const res2 = await axios.post("http://localhost:4000/image", data);
    console.log(res2);
  };

  const onChange = (e, id) => {
    const name = e.target.value;
    let selectedSize = selected;
    let find = selectedSize.indexOf(id);

    if (find > -1) {
      selectedSize.splice(find, 1);
    } else {
      selectedSize.push(name);
    }

    let filteredArray = selectedSize.filter(function (item, pos) {
      return selectedSize.indexOf(item) === pos;
    });

    setSelected(filteredArray);
    // setSelected(selectedSize);
    console.log(selectedSize);
  };

  //category
  return (
    <Container>
      <Row class="py-5">
        <Col lg={3}>
          <List />
        </Col>
        <Col lg={6}>
          {" "}
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <div>
                <Label size="big">Title</Label>
                <Input
                  type="text"
                  name="title"
                  placeholder="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </Form.Field>

            <Form.Field>
              {" "}
              <div>
                <Label size="big">Price</Label>
                <Input
                  type="number"
                  name="price"
                  placeholder="price"
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
            </Form.Field>
            <Form.Field>
              {" "}
              <div>
                <Label size="big">Description</Label>
                <TextArea
                  placeholder="product details"
                  name="description"
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>
            </Form.Field>
            <Form.Field>
              <Label size="big">Select Sizes</Label>
              {sizes.map((item) => {
                return (
                  <label key={item.id}>
                    <input
                      type="checkbox"
                      value={item.value}
                      onChange={(e) => onChange(e, item.id)}
                      selected={selected.includes(item.id)}
                    ></input>
                    <span>{item.name}</span>
                  </label>
                );
              })}
            </Form.Field>
            <Form.Field>
              <Label size="big">Choose Category</Label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="browser-default custom-select"
              >
                {categoryOptions.map((i) => {
                  return (
                    <option key={i.id} value={i.id} name="category">
                      {i.text}
                    </option>
                  );
                })}
              </select>
            </Form.Field>
            <Form.Field>
              <div>
                <Label size="big">Stock</Label>
                <Input
                  type="number"
                  name="stock"
                  placeholder="stock"
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </Form.Field>
            <Form.Field>
              <Label size="big">Free Shipping</Label>
              <Radio
                label="Free Shipping??"
                onClick={(e) => setShipping(!shipping)}
                value={shipping}
                name="shipping"
                checked={shipping ? true : false}
              />
            </Form.Field>
            <Form.Field>
              <Label size="big">Image</Label>
              <Input
                type="file"
                name="image"
                onChange={(e) => setimage(e.target.files[0])}
                multiple="multiple"
                placeholder="select image"
              ></Input>
            </Form.Field>
            <Button size="big">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddProducts;

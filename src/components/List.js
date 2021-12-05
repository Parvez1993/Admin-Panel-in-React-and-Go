import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserContext } from "../contextapi";
import { useNavigate } from "react-router-dom";

function List() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate;
  const logout = async () => {
    try {
      await setUser("");
      window.localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.log("error");
    }
  };
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
      <ListGroup.Item>
        {user.length > 1 ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">login</Link>
        )}
      </ListGroup.Item>
    </ListGroup>
  );
}

export default List;

import React from "react";
import myimage from "../bookshelve.jpg";
import { Link } from "react-router-dom";

function FrontPage() {
  return (
    <div className="App">
 
        <h2>Enter Into The Bookstore By Clicking Image Below!</h2>
        <Link to="/bookstore">
          <img src={myimage} alt="example" />
        </Link>

    </div>
  );
}

export default FrontPage;

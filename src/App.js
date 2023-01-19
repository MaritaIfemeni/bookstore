import React from "react";
import "./App.css";
import Bookstore from "./components/Bookstore";
import PageNotFound from "./components/PageNotFound";
import FrontPage from "./components/FrontPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App-header">
      <br></br>
      <BrowserRouter>
        <nav>
          <Link className="App-link" to="/">Home</Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<FrontPage />} />
          <Route path="/bookstore" element={<Bookstore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

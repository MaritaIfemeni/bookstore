import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { pink } from "@mui/material/colors";
import AddBook from "./AddBook";

function Bookstore() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchItems();
  });

  const fetchItems = () => {
    fetch("https://newbookstore-402d5-default-rtdb.europe-west1.firebasedatabase.app/")
      .then((response) => response.json())
      .then((data) => addKeys(data))
      .catch((err) => console.error(err));
  };

  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) =>
      Object.defineProperty(item, "id", { value: keys[index] })
    );
    setBooks(valueKeys);
  };

  const addBook = (newBook) => {
    //if inputs are empty, do not add book
    if (
      newBook.title === "" ||
      newBook.author === "" ||
      newBook.year === "" ||
      newBook.isbn === "" ||
      newBook.price === ""
    ) {
      return;
    }
    fetch("https://newbookstore-402d5-default-rtdb.europe-west1.firebasedatabase.app/books/.json", {
      method: "POST",
      body: JSON.stringify(newBook),
    })
      .then((response) => fetchItems())
      .catch((err) => console.error(err));
  };

  const deleteBook = (id) => {
    fetch(
      `https://newbookstore-402d5-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => fetchItems())
      .catch((err) => console.error(err));
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: pink[500],
      },
      secondary: {
        main: "#11cb5f",
      },
    },
  });

  return (
    <div className="App">
      <br />
      /* Todo: change alaingment and make Appbar responsive */
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" noWrap>
            BOOKSTORE
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      <AddBook addBook={addBook} />
      <br />
      <div
        className="ag-theme-material"
        style={{ height: 400, width: 1200, margin: "auto" }}
      >
        /* Todo: Make table resonsive */
        <AgGridReact rowData={books}>
          <AgGridColumn sortable={true} filter={true} field="author" />
          <AgGridColumn sortable={true} filter={true} field="isbn" />
          <AgGridColumn sortable={true} filter={true} field="price" />
          <AgGridColumn sortable={true} filter={true} field="title" />
          <AgGridColumn sortable={true} filter={true} field="year" />
          <AgGridColumn
            headerName=""
            field="id"
            width={90}
            cellRenderer={(params) => (
              <ThemeProvider theme={theme}>
                <IconButton
                  onClick={() => deleteBook(params.value)}
                  size="small"
                  color="primary"
                >
                  <DeleteIcon />
                </IconButton>
              </ThemeProvider>
            )}
          />
        </AgGridReact>
      </div>
    </div>
  );
}

export default Bookstore;

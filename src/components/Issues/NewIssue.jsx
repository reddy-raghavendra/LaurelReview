import "./newIssue.css";
import * as React from "react";
import { forwardRef } from 'react';
import MaterialTable from "material-table";
import { useState } from "react";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const contents = [];
export default function NewProduct() {
  const [tableRows, setRows] = useState(contents);
  const [index, setIndex] = useState(1)
  const [addFormData, setAddFormData] = useState({
    title: "",
    stock: "",
    status: true,
    imageFile: "",
    pdfFile: ""
  })

  const columns = [
    { title: "No", field: "id", editable: false },
    { title: "Author Name", field: "authorName" },
    { title: "Description", field: "description" },
    { title: "Page No", field: "pageNo" },
  ];

  const sendData = (event) => {
    event.preventDefault();
    debugger
    const formData = JSON.stringify(addFormData)
    const tableRows = JSON.stringify(tableRows)
    const data = { formData, tableRows }
    console.log(data)
  }

  const handleFormAddChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue
    setAddFormData(newFormData)
  }
  const handleCheckBoxChange = (event) => {
    const newFormData = { ...addFormData }
    const fieldName = "status"
    const fieldValue = event.target.checked;
    newFormData[fieldName] = fieldValue
    setAddFormData(newFormData)
  }
  const handleImageFiles = (event) => {
    const newFormData = { ...addFormData }
    debugger
    const fieldName = "imageFile"
    const fieldValue = event.target.files[0];
    newFormData[fieldName] = fieldValue
    setAddFormData(newFormData)
  }
  const handlePdfFiles = (event) => {
    const newFormData = { ...addFormData }
    const fieldName = "imageFile"
    const fieldValue = event.target.files[0];
    newFormData[fieldName] = fieldValue
    setAddFormData(newFormData)

  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Issue</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" name="title" placeholder="Issue" required="true" onChange={handleFormAddChange} />
        </div>
        <MaterialTable
          icons={tableIcons}
          title="Table of contents"
          data={tableRows}
          columns={columns}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                const updatedRows = [
                  ...tableRows,
                  { id: index, ...newRow },
                ];
                setIndex(index + 1)
                setTimeout(() => {
                  setRows(updatedRows);
                  resolve();
                }, 2000);
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const index = selectedRow.tableData.id;
                const updatedRows = [...tableRows];
                updatedRows.splice(index, 1);
                setTimeout(() => {
                  setRows(updatedRows);
                  resolve();
                }, 2000);
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                const index = oldRow.tableData.id;
                const updatedRows = [...tableRows];
                updatedRows[index] = updatedRow;
                setTimeout(() => {
                  setRows(updatedRows);
                  resolve();
                }, 2000);
              }),
          }}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
        />
        <div className="addProductItem">
          <label>Stock</label>
          <input name="stock" type="number" placeholder="123" required="true" onChange={handleFormAddChange} />
        </div>


        <div className="addProductItem">
          <label>Status</label>
          <input type="checkbox" name="status" checked={addFormData.status} onChange={handleCheckBoxChange} />
        </div>
        <div className="addProductItem">
          <label>Cover page image</label>
          <input name="imageFile" type="file" id="file" className="addProductItem"
            required="true" onChange={handleImageFiles} />
        </div>
        <div className="addProductItem">
          <label>PDF attachment</label>
          <input name="pdfFile" type="file" id="pdfFile" className="addProductItem"
            required="true" onChange={handlePdfFiles} />
        </div>
        <button className="addProductButton" onClick={sendData}>Create</button>
      </form>
    </div>
  );
}

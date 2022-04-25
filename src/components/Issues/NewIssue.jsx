import "./newIssue.css";
import storage from "../Firebase/Firebase";
import * as React from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import { useState } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getToken } from "../Token/Token";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const contents = [];
export default function NewProduct() {
  const [tableRows, setRows] = useState(contents);
  const [index, setIndex] = useState(1);
  const [addFormData, setAddFormData] = useState({
    title: "",
    stock: "",
    status: true,
    imageFile: "",
    pdfFile: "",
    tableRows:[]
  });
  const [imageUrl, setImageUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const history = useHistory()
   const {REACT_APP_API_URL} = process.env

  if(getToken() != "Login Success"){
    history.push("/login");
  }

  const handleImageFile = async (event) => {
    var image = event.target.files[0];
    if (image == null) return;

    storage
      .ref(`/images/${image.name}`)
      .put(image)
      .on("state_changed",() => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setImageUrl(url);
            console.log(imageUrl)
          });
      });
  };
  const handlePdfFile = async (event) => {
    var pdf = event.target.files[0];
    if (pdf == null) return;
    storage
      .ref(`/images/${pdf.name}`)
      .put(pdf)
      .on("state_changed", () => {
        storage
          .ref("images")
          .child(pdf.name)
          .getDownloadURL()
          .then((url) => {
            setPdfUrl(url);
            console.log(url);
          });
      });
  };

  const columns = [
    { title: "No", field: "issueInfoId", editable: false },
    { title: "Author Name", field: "authorName" },
    { title: "Description", field: "authorDescription" },
    { title: "Page No", field: "pageNo" }
  ];

  var issueData = {
    "issueId":"",
    "issueTitle": "",
    "issueStock": 0,
    "status": false,
    "issueAttachment":"",
    "issueImage": "",
    "issueDetails": []
  }

  const sendData = (event) => {
    event.preventDefault();
  //   alert("Issue Created Successfully") 

  const newFormData = {...addFormData}
  newFormData.tableRows = {...tableRows}
  newFormData.imageFile = {imageUrl}
  newFormData.pdfFile = {pdfUrl}
  setAddFormData(newFormData)
  issueData.issueTitle = newFormData.title
  issueData.issueImage = newFormData.imageFile.imageUrl
  issueData.issueStock = newFormData.stock
  issueData.status = newFormData.status
  issueData.issueAttachment = newFormData.pdfFile.pdfUrl
  debugger
  var dataRows = newFormData.tableRows
  console.log(dataRows.length)
  var i = 0
  var length = Object.keys(dataRows).length
  for (i = 0; i < length; i++) {
    let detail = {
      "issueInfoId": dataRows[i].id,
      "authorName": dataRows[i].authorName,
      "authorDescription": dataRows[i].authorDescription,
      "pageNo": dataRows[i].pageNo,
    };
    issueData.issueDetails.push(detail);
  }
    // const formData = JSON.stringify(issueData);
    (async () => {
      const element = document.querySelector(
        "#post-request-async-await .article-id"
      );
      const response = await axios.post(
        `${REACT_APP_API_URL}api/issues/save`,
        issueData
      );
      if(response.status == 200){
        alert("Issue saved successfully")
        history.push("/issuelist") 
      }
    })();
  };

  const addToForm = (name, value) => {
    debugger
    const newFormData = { ...addFormData };
    newFormData[name] = value;
  };

  const handleFormAddChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };
  const handleCheckBoxChange = (event) => {
    const newFormData = { ...addFormData };
    const fieldName = "status";
    const fieldValue = event.target.checked;
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };
  const handleImageFiles = (event) => {
    const newFormData = { ...addFormData };
    debugger;
    const fieldName = "imageFile";
    const fieldValue = event.target.files[0];
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };
  const handlePdfFiles = (event) => {
    const newFormData = { ...addFormData };
    const fieldName = "imageFile";
    const fieldValue = event.target.files[0];
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Issue</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label className="required-field">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Issue"
            required="true"
            onChange={handleFormAddChange}
          />
        </div>
        <MaterialTable
          icons={tableIcons}
          title="Table of contents"
          data={tableRows}
          columns={columns}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                const updatedRows = [...tableRows, { issueInfoId: index, ...newRow }];
                setIndex(index + 1);
                setTimeout(() => {
                  setRows(updatedRows);
                  resolve();
                }, 2000);
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const index = selectedRow.tableData.issueInfoId;
                const updatedRows = [...tableRows];
                updatedRows.splice(index, 1);
                setTimeout(() => {
                  setRows(updatedRows);
                  resolve();
                }, 2000);
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                const index = oldRow.tableData.issueInfoId;
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
          <input
            name="stock"
            type="number"
            placeholder="123"
            required="true"
            onChange={handleFormAddChange}
          />
        </div>

        <div className="addProductItem">
          <label>Status</label>
          <input
            type="checkbox"
            name="status"
            checked={addFormData.status}
            onChange={handleCheckBoxChange}
          />
        </div>
        <div className="addProductItem">
          <label className="required-field">Cover page image</label>
          <input
            name="imageFile"
            type="file"
            id="file"
            className="addProductItem"
            required="true"
            onChange={handleImageFile}
          />
        </div>
        <div className="addProductItem">
          <label className="required-field">PDF attachment</label>
          <input
            name="pdfFile"
            type="file"
            id="pdfFile"
            className="addProductItem"
            required="true"
            onChange={handlePdfFile}
          />
        </div>
        <button className="addProductButton" onClick={sendData}>
          Create
        </button>
      </form>
    </div>
  );
}

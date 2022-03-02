import React from 'react'
import "./IssueList.css";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { issueRows, productRows } from "./../dummyData"
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProductList() {
  var issueList = []
  const [data, setData] = useState(issueList);
  React.useEffect(()=>{
    getIssues()
  },[])

  var issueData = {
    "issueId":"",
    "issueTitle": "",
    "issueStock": 0,
    "status": false,
    "issueAttachment":"",
    "issueImage": ""
  }

  function getIssues() {
    const url = `http://localhost:8081/api/issues`;
    console.log(url)
    axios.get(url).then(
          (response) => {
              issueList = response.data
              console.log("Response",issueList)

              setData(issueList)
          });
    }

    console.log("Data",data)

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    axios.delete(`http://localhost:8081/api/issues/delete/${id}`).then(()=>setData(data.filter((item) => item.issueId !== id)));
    alert("Deleted Successfully")
  };

  const columns = [
    { field: "issueId", headerName: "ID", width: 90 },
    {
      field: "issueTitle",
      headerName: "Issue",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.issueImage} alt="" />
            {params.row.issueTitle}
          </div>
        );
      },
    },
    { field: "issueStock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname:`/editissue/" + ${params.row.issueId}`,state:params.row.issueId}}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.issueId)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">

      <Link to="/newissue">
        <button className="issueAddButton">Create Issue</button>
      </Link>
      <DataGrid
        rows={data}
        getRowId ={(row) => row.issueId} 
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />

    </div>


  );


}

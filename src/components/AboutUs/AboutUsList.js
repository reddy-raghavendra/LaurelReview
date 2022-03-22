import React from 'react'
import "./AboutUsList.css"
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AboutUsList() {
  var AboutUsList = []
  const [data, setData] = useState(AboutUsList);
  React.useEffect(()=>{
    getAboutUs()
  },[])

  function getAboutUs() {
    const url = `http://localhost:8081/api/AboutUs`;
    console.log(url)
    axios.get(url).then(
          (response) => {
            AboutUsList = response.data
              console.log("Response",AboutUsList)
              var list = AboutUsList
             list.forEach(About => {
               About.buttonText = "Play";
               About.audio = ""
             });
             setData(list)
          });
    }



    console.log("Data",data)

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/api/AboutUs/delete/${id}`).then(()=>setData(data.filter((item) => item.issueId !== id)));
    alert("Deleted Successfully")
  };

  const columns = [
    { field: "AboutUsId", headerName: "ID", width: 90 },
    {
      field: "AboutUsCoverImage",
      headerName: "AboutUs",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.AboutUsListCoverImage} alt="" />
            {params.row.AboutUsName}
          </div>
        );
      },
    },
    { field: "AboutUsName", headerName: "Name", width: 200 },
    { field: "AboutUsRole", headerName: "Role", width: 200 },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname:`/EditAboutUs/" + ${params.row.AboutUsId}`,state:params.row.AboutUsId}}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => { window.confirm("Are you sure you want to delete this issue?")&&handleDelete(params.row.AboutUsId)}}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
    <h1 className="newUserTitle">AboutUs</h1>
      <Link to="/NewAboutUs">
        <button className="issueAddButton">Create AboutUs</button>
      </Link>
      <DataGrid
        rows={data}
        getRowId ={(row) => row.AboutUsId} 
        // disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />

    </div>


  );


}

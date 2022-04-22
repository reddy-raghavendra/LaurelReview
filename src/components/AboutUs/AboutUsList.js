import React from 'react'
import "./AboutUsList.css"
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getToken } from "../Token/Token";
import { useHistory } from 'react-router-dom';

export default function AboutUsList() {
  const history = useHistory();
  const { REACT_APP_API_URL } = process.env;
  var AboutUsList = []
  const [data, setData] = useState(AboutUsList);
  React.useEffect(()=>{
    if(getToken() != "Login Success"){
      history.push("/login");
    }
    getAboutUs()
  },[])

  function getAboutUs() {
    const url = `${REACT_APP_API_URL}api/aboutus`;
    console.log(url)
    axios.get(url).then(
          (response) => {
            AboutUsList = response.data
            console.log("Response",AboutUsList)
            setData(AboutUsList)
          });
    }

    
  const handleDelete = (id) => {
    axios.delete(`${REACT_APP_API_URL}api/aboutus/delete/${id}`).then(()=>setData(data.filter((item) => item.aboutUsId !== id)));
    alert("Deleted Successfully")
  };

  const columns = [
    { field: "aboutUsId", headerName: "ID", width: 90 },
    {
      field: "aboutUsName",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.aboutUsCoverImage} alt="" />
            {params.row.aboutUsName}
          </div>
        );
      },
    },
    { field: "aboutUsRole", headerName: "Role", width: 200 },
    // { field: "aboutUsRole", headerName: "Role", width: 200 },
    
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
              onClick={() => { window.confirm("Are you sure you want to delete this Data?")&&handleDelete(params.row.aboutUsId)}}
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
        getRowId ={(row) => row.aboutUsId} 
        // disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />

    </div>


  );


}

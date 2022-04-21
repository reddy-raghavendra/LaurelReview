import "./userList.css";
import {
  Button,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuIcon,
} from "@mui/material";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons"
import { userRows } from "./../dummyData"
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from "react";
import { getToken } from "../Token/Token";
import { useHistory } from "react-router-dom";


export default function UserList() {
  const history = useHistory()
  if(getToken() != "Login Success"){
    history.push("/login");
  }
  const {REACT_APP_API_URL} = process.env
  var userList=[]
  function getUser() {
    const url = `${REACT_APP_API_URL}api/users`;
    console.log(url)
      axios.get(url).then(
          (response) => {
              userList = response.data;
              console.log(userList)
              setData(userList)
              console.log('Processing Request');
              // return result
          });
    }
  React.useEffect(()=>{
    getUser()
  },[])
 
  console.log(userList)
  const [data, setData] = useState(userList);
  const handleDelete = (id) => {
    axios.delete(`${REACT_APP_API_URL}api/delete/${id}`).then(()=>setData(data.filter((item) => item.id !== id)));
    alert("Deleted Successfully")
  };
  
  function deleteUser(id){

  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {`${params.row.firstName} ${params.row.lastName}`}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "active",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.active?"Active":"Inactive"}
          </div>
        );
      }
    },
    // {
    //   field: "transaction",
    //   headerName: "Transaction Volume",
    //   width: 160,
    // },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => { window.confirm("Are you sure you want to delete the user?")&&handleDelete(params.row.id)}}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">

<Link to="/newUser">
          <button className="issueAddButton">Create User</button>
        </Link>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
  }
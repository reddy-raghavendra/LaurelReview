import React from "react";
import "./IssueList.css";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { issueRows, productRows } from "./../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getToken } from "../Token/Token";
import { setToken } from "../Token/Token";
import { useHistory } from "react-router-dom";

export default function IssueList(props) {
  const { REACT_APP_API_URL } = process.env;
  const history = useHistory();
  const token = history.location;  
  if (token.state != undefined) {
    if (token.state.token != "Login Success") {
      history.push("/login");
    }else{
      setToken(token.state.token);
    }
  }
  else if(getToken() != "Login Success"){
    history.push("/login");
  }

  var issueList = [];
  const [data, setData] = useState(issueList);
  React.useEffect(() => {
    getIssues();
  }, []);

  var issueData = {
    issueId: "",
    issueTitle: "",
    issueStock: 0,
    status: false,
    issueAttachment: "",
    issueImage: "",
  };

  function getIssues() {
    const url = `${REACT_APP_API_URL}api/issues`;
    console.log(url);
    axios.get(url).then((response) => {
      issueList = response.data;
      console.log(getToken());
      console.log("Response", issueList);

      setData(issueList);
    });
  }

  console.log("Data", data);

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    axios
      .delete(`${REACT_APP_API_URL}api/issues/delete/${id}`)
      .then(() => setData(data.filter((item) => item.issueId !== id)));
    alert("Deleted Successfully");
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
            <img
              className="productListImg"
              src={params.row.issueImage}
              alt=""
            />
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
            <Link
              to={{
                pathname: `/editissue/" + ${params.row.issueId}`,
                state: params.row.issueId,
              }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => {
                window.confirm("Are you sure you want to delete this issue?") &&
                  handleDelete(params.row.issueId);
              }}
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
        getRowId={(row) => row.issueId}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}

import React from 'react'
import "./ChapbookList.css"
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getToken } from "../Token/Token";
import { useHistory } from "react-router-dom";


export default function ChapbookList() {
  const { REACT_APP_API_URL } = process.env;

  const history = useHistory()
  if (getToken() != "Login Success") {
    history.push("/login");
  }
  var chapbookList = []
  const [data, setData] = useState(chapbookList);
  React.useEffect(()=>{
    getchapbooks()
  },[])
  //setData(chapbookList);
  //assignText()
  function getchapbooks() {
    const url = `${REACT_APP_API_URL}api/chapbooks`;
    debugger;
    console.log(url)
    axios.get(url).then(
          (response) => {
              chapbookList = response.data
              console.log("Response",chapbookList)
              var list = chapbookList
             setData(list)
                 console.log("chapbook list"+chapbookList)
          });
    }

  // function assignText(){
  //     var newData = {...data};
  //     newData = JSON.parse(newData)
  //     newData.forEach(a => {
  //       a.buttonText = "Play";
  //     });
  //     setData(newData)
  //   }

    console.log("Data",data)

  const handleDelete = (id) => {
    debugger;
    axios.delete(`${REACT_APP_API_URL}api/chapbook/delete/${id}`).then(()=>setData(data.filter((item) => item.chapBookId !== id)));
    alert("Deleted Successfully")
  };
// function toggle(id){
// data.map((item) => {
//   debugger;
//   if(item.chapbookId === id){
//     if(item.buttonText === "Play"){
//       item.buttonText = "Pause"
//       item.audio = new Audio(item.chapbookAudioFile)
//       item.audio.play();
//     }else{
//       item.buttonText = "Play"
//       item.audio.pause();
//     }
//   }
// })
// }
  const columns = [
    { field: "chapBookId", headerName: "ChapBook Id", width: 150 },
    { field: "chapBookName", headerName: "Chap Book Name", width: 200 },
    // { field: "chapBookDesc", headerName: "chapBookDesc", width: 200 },
    {
      field: "chapBookCoverImage",
      headerName: "Cover Image",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="ChapbookListItem">
            <img className="ChapbookListImg" src={params.row.chapBookCoverImage} alt="" />
            {params.row.chapbookName}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname:`/editchapbook/" + ${params.row.chapbookId}`,state:params.row.chapbookId}}>
              <button className="ChapbookListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="ChapbookListDelete"
              onClick={() => { window.confirm("Are you sure you want to delete this issue?")&&handleDelete(params.row.chapbookId)}}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="ChapbookList">

     <div className="ChapbookTitleContainer">
         <h1 className="ChapbookTitle">Chapbook</h1>
        <Link to="/newChapbook">
         <button className="ChapbookAddButton">Create</button>
       </Link>
            </div>
      <DataGrid
        rows={data}
        getRowId ={(row) => row.chapBookId} 
        // disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />

    </div>


  );


}


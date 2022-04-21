import React from 'react'
import "./Podcastlist.css"
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link,useHistory } from "react-router-dom";
import { useState } from "react";
import { getToken } from "../Token/Token";


export default function PodCastList() {
  const {REACT_APP_API_URL} = process.env
  const history = useHistory()

  var podCastList = []
  const [data, setData] = useState(podCastList);
  React.useEffect(()=>{
      if(getToken() != "Login Success"){
    history.push("/login");
  }
    getPodcasts()
  },[])
  // setData(podCastList);
  // assignText()
  function getPodcasts() {
    const url = `${REACT_APP_API_URL}api/podcasts`;
    console.log(url)
    axios.get(url).then(
          (response) => {
              podCastList = response.data
              console.log("Response",podCastList)
              var list = podCastList
             list.forEach(pod => {
               pod.buttonText = "Play";
               pod.audio = ""
             });
             setData(list)
//             console.log(podCastList)
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
    axios.delete(`${REACT_APP_API_URL}api/podcast/delete/${id}`).then(()=>setData(data.filter((item) => item.issueId !== id)));
    alert("Deleted Successfully")
  };
function toggle(id){
data.map((item) => {
  debugger
  if(item.podcastId === id){
    if(item.buttonText === "Play"){
      item.buttonText = "Pause"
      item.audio = new Audio(item.podcastAudioFile)
      item.audio.play();
    }else{
      item.buttonText = "Play"
      item.audio.pause();
    }
  }
})
}
  const columns = [
    { field: "podcastId", headerName: "ID", width: 90 },
    {
      field: "podcastCoverImage",
      headerName: "Podcast",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.podcastCoverImage} alt="" />
            {params.row.podcastName}
          </div>
        );
      },
    },
    { field: "podcastDate", headerName: "Date", width: 200 },
    {
      field: "podcastAudioFile",
      headerName: "Audio File",
      width: 120,
      renderCell: (params) => {
        return (
          <>
           <button className="productListEdit" onClick={()=> toggle(params.row.podcastId)}>{params.row.buttonText}</button>
          </>
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
            <Link to={{pathname:`/editpodcast/" + ${params.row.podcastId}`,state:params.row.podcastId}}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => { window.confirm("Are you sure you want to delete this issue?")&&handleDelete(params.row.podcastId)}}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">

      <Link to="/newpodcast">
        <button className="issueAddButton">Create Podcast</button>
      </Link>
      <DataGrid
        rows={data}
        getRowId ={(row) => row.podcastId} 
        // disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />

    </div>


  );


}

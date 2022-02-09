import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextArea from "./TextArea";
import AdminBar from "./AdminBar"
function CreateUser() {
  return (
    <div>
      <AdminBar/>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 5, width: "40ch" },          
        }}
        noValidate
        autoComplete="off"
      >

          <div>
          <TextField required id="outlined-required" label="Name" />
          <TextField id="outlined-disabled" label="Facebook Link" />
          <TextField id="outlined-disabled" label="Twitter Link" />
          <TextField id="outlined-disabled" label="Wordpress Link" />
          <TextArea />
        </div>
      </Box>
      <div>

      </div>
    </div>
  );
}
export default CreateUser;

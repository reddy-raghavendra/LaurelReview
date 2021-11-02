import {
  Button,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuIcon,
} from "@mui/material";
import Navbar from "./Navbar";
import TexArea from "./TextArea";
import "../styles/HomeStyle.css";
// import im from "../images/home.png"
function Home() {
  return (
    <div className="bg" >
      <Navbar />     
    </div>
  );
}
export default Home;

import {
  Button,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuIcon,
} from "@mui/material";
import "./HomeStyle.css"

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar id="background">
          <div className="laurel-header-logo">
            

            <Button color="inherit" href="../"><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>The Laurel Review</Typography></Button>

          </div>
          <div className="laurel-header-nav">
            <Button color="inherit" href="https://thelaurelreview.submittable.com/submit">Submissions</Button>
            <Button color="inherit">Subscriptions</Button>
            <Button color="inherit" href="./Issues">Issues</Button>
            <Button color="inherit">Chapbooks</Button>
            <Button color="inherit">Podcast</Button>
            <Button color="inherit">About us</Button>
          </div>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar;

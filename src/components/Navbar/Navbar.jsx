import {
  Button,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuIcon,
} from "@mui/material";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar id="background">
          <div className="laurel-header-logo">
            <Button color="inherit" href="../">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                The Laurel Review
              </Typography>
            </Button>
          </div>
          <div className="MuiToolbar-root.MuiToolbar-gutters">
            <Link
              to={{
                pathname: "https://thelaurelreview.submittable.com/login?ReturnUrl=%2Fuser%2Fsubmissions",
              }}
              target="_blank"
            >
              <Button color="inherit">Submissions</Button>
            </Link>
            <Link
              to={{
                pathname: "https://thelaurelreview.submittable.com/login?returnUrl=%2Fsubmit%2F99890%2Fsubscriptions-orders",
              }}
              target="_blank"
            >
            <Button color="inherit">Subscriptions</Button>
            </Link>
            <Link to="/Issues">
              <Button color="inherit">Issues</Button>
            </Link>
            <Link to="/chapbooks">
              <Button color="inherit">Chapbooks</Button>
            </Link>
            <Link to="/podcasts">
              <Button color="inherit">Podcast</Button>
            </Link>
            <Link to="/aboutus">
              <Button color="inherit">About us</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar;

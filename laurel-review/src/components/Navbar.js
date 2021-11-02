import {
  Button,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuIcon,
} from "@mui/material";

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The Laurel Review
          </Typography>
          <Button color="inherit">Submissions</Button>
          <Button color="inherit">Subscriptions</Button>
          <Button color="inherit">Issues</Button>
          <Button color="inherit">Chapbooks</Button>
          <Button color="inherit">Podcast</Button>
          <Button color="inherit">About us</Button>
          <Button color="inherit" href="./Login">Admin Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar;

import {
  Button,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuIcon,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function AdminBar() {
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} href="http://localhost:3000/">
            The Laurel Review
          </Typography>
          <Button color="inherit" href="./home">Home</Button>
          <Button color="inherit">Account</Button>
          <Button color="inherit" href="./home">AccountCircleIcon</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default AdminBar;

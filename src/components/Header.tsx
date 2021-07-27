import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

const Header = () => {
  return (
    <AppBar variant="outlined" color="inherit">
      <Toolbar>
        <Typography variant="h3" component="h1">
          E-Schedule
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header

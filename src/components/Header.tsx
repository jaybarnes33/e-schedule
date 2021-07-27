import dynamic from "next/dynamic"
import Avatar from "@material-ui/core/Avatar"
import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { useUser } from "./UserContext"
import { useState } from "react"

const AccountMenu = dynamic(() => import("./AccountMenu"))

const Header = () => {
  const { user } = useUser()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <AppBar variant="outlined" elevation={0} position="static" color="inherit">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h3" component="h1">
          E-Schedule
        </Typography>
        {user && (
          <IconButton aria-label="open account menu" onClick={handleOpen}>
            <Avatar
              src={String(user.photoURL)}
              alt={String(user.displayName)}
            />
          </IconButton>
        )}
      </Toolbar>
      <AccountMenu anchorEl={anchorEl} handleClose={handleClose} />
    </AppBar>
  )
}

export default Header

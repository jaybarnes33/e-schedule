import Divider from "@material-ui/core/Divider"
import SettingsIcon from "@material-ui/icons/Settings"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import AccountIcon from "@material-ui/icons/AccountBox"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { useUser } from "./UserContext"
import { createStyles, makeStyles } from "@material-ui/styles"

const list = [
  {
    icon: <AccountIcon />,
    text: "Account Info"
  },
  {
    icon: <SettingsIcon />,
    text: "Account Settings"
  },
  {
    icon: <ExitToAppIcon />,
    text: "Logout"
  }
]

interface IAccountMenuProps {
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
}

const useStyles = makeStyles(
  createStyles({
    ripple: {
      color: "#f009"
    }
  })
)

const AccountMenu: React.FC<IAccountMenuProps> = ({
  anchorEl,
  handleClose
}) => {
  const classes = useStyles()
  const { logout } = useUser()

  const handleLogout = () => {
    logout()
    handleClose()
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      MenuListProps={{ sx: { py: 0 } }}
    >
      {list.map(({ icon, text }, index) => [
        <MenuItem
          sx={{
            m: [0, 1],
            borderRadius: 1,
            "&:hover": {
              bgcolor: "#f001"
            }
          }}
          key={index}
          onClick={index === 2 ? handleLogout : handleClose}
          TouchRippleProps={{ classes: { ripple: classes.ripple } }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>{text}</ListItemText>
        </MenuItem>,
        index === 1 && <Divider component="li" sx={{ my: [0, 1] }} />
      ])}
    </Menu>
  )
}

export default AccountMenu

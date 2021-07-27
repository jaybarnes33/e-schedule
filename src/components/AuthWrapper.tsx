import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { useUser } from "./UserContext"

interface IProps {
  id: string
  heading: string
  description: string
  buttonText?: string
}

const AuthWrapper: React.FC<IProps> = ({
  id,
  heading,
  description,
  buttonText = "Sign up with google"
}) => {
  const { login } = useUser()

  return (
    <Container maxWidth="sm" sx={{ p: { sm: 2, lg: 3 }, pt: 2 }}>
      <Paper component="main" id={id} variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h4" component="h2" align="center">
          {heading}
        </Typography>
        <Typography align="center" p={2} color="GrayText">
          {description}
        </Typography>
        <Box width="100%" display="flex" justifyContent="center">
          <Button variant="contained" onClick={login}>
            {buttonText}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default AuthWrapper

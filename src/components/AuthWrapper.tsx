import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

interface IProps {
  heading: string
  description: string
  buttonText?: string
}

const AuthWrapper: React.FC<IProps> = ({
  heading,
  description,
  buttonText = "Sign up with google"
}) => {
  return (
    <Container maxWidth="sm" sx={{ p: { sm: 2, lg: 3 }, pt: 2 }}>
      <Paper component="main" id="admin-auth" variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h3" component="h1" align="center">
          {heading}
        </Typography>
        <Typography align="center" p={2} color="GrayText">
          {description}
        </Typography>
        <Box width="100%" display="flex" justifyContent="center">
          <Button variant="contained">{buttonText}</Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default AuthWrapper

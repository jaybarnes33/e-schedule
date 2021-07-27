import { createTheme, responsiveFontSizes } from "@material-ui/core/styles"

let theme = createTheme({
  typography: {
    h1: {
      fontFamily: "'Montserrat', sans-serif"
    },
    h2: {
      fontFamily: "'Montserrat', sans-serif"
    },
    h3: {
      fontFamily: "'Montserrat', sans-serif"
    }
  }
})

theme = responsiveFontSizes(theme)

export default theme

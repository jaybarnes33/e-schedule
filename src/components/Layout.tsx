import Header from "./Header"
import UserContextProvider from "./UserContext"

const Layout: React.FC = ({ children }) => {
  return (
    <UserContextProvider>
      <Header />
      {children}
    </UserContextProvider>
  )
}

export default Layout

import { useState, useEffect, createContext, useContext } from "react"
import firebase from "@/lib/firebase/client"
import { useRouter } from "next/router"

export type TUser = Partial<firebase.User> | null

interface IContextProps {
  user: TUser
  token: string
  updateUser: (user: TUser) => void
  login: () => void
  logout: () => void
  fetchingUser: boolean
}

export const UserContext = createContext({} as IContextProps)

const UserContextProvider: React.FC = ({ children }) => {
  const { pathname } = useRouter()
  const [user, setUser] = useState<TUser>(null)
  const [token, setToken] = useState("")
  const [fetchingUser, setFetchingUser] = useState(true) // Helpful, to update the UI accordingly.

  useEffect(() => {
    // Listen authenticated user
    const unsubscribeAuthState = firebase
      .auth()
      .onAuthStateChanged(async user => {
        try {
          if (user) {
            // User is signed in.
            const { uid, displayName, email, photoURL } = user
            // You could also look for the user doc in your Firestore (if you have one):
            // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
            setUser({ uid, displayName, email, photoURL })
          } else setUser(null)
        } catch (error) {
          // Most probably a connection error. Handle appropriately.
        } finally {
          setFetchingUser(false)
        }
      })

    const unsubscribeToken = firebase.auth().onIdTokenChanged(token => {
      token
        ?.getIdToken()
        .then(token => setToken(token))
        .catch((error: Error) => console.log(error))
    })

    // Unsubscribe auth listener on unmount
    return () => {
      unsubscribeAuthState()
      unsubscribeToken()
    }
  }, [])

  const login = () => {
    const isAdmin = pathname.includes("admin")
    const provider = new firebase.auth.GoogleAuthProvider()

    provider.addScope(
      isAdmin
        ? "https://www.googleapis.com/auth/spreadsheets"
        : "https://www.googleapis.com/auth/spreadsheets.readonly"
    )

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const { credential } = result

        // This gives you a Google Access Token. You can use it to access the Google API.
        // @ts-ignore
        const token = credential?.accessToken
        setToken(token)
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential
        // ...
      })
  }

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setToken("")
      })
      .catch(error => {
        // An error happened.
        console.log(error)
      })
  }

  const updateUser = (user: TUser) => setUser(user)

  return (
    <UserContext.Provider
      value={{ user, token, login, logout, updateUser, fetchingUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext)

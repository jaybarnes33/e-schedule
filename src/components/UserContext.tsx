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
  const { pathname, replace } = useRouter()
  const [user, setUser] = useState<TUser>(null)
  const [token, setToken] = useState("")
  const [fetchingUser, setFetchingUser] = useState(true) // Helpful, to update the UI accordingly.
  const isAdmin = pathname.includes("admin")

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

            // Set Role
            firebase
              .firestore()
              .doc(`users/${user.uid}`)
              .get()
              .then(doc => {
                setUser(prevUser => ({
                  ...prevUser,
                  ...(doc?.data() || {})
                }))
              })
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

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    provider.addScope(
      isAdmin
        ? "https://www.googleapis.com/auth/spreadsheets"
        : "https://www.googleapis.com/auth/spreadsheets.readonly"
    )

    try {
      const { credential, user } = await firebase
        .auth()
        .signInWithPopup(provider)

      // @ts-ignore
      const token = credential?.accessToken
      setToken(token)

      const role = isAdmin ? "ADMIN" : "USER"

      replace(isAdmin ? "/admin/dashboard" : "/")

      firebase
        .firestore()
        .doc(`users/${user?.uid}`)
        .set({ role })
        .then(() => setUser(prevUser => ({ ...prevUser, role })))
        .catch(error => console.log(error))
    } catch (error) {
      // const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential
    }
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

import React, { useState } from 'react'
import { loadCurrentUserId, loadUsers, saveCurrentUserId, saveUsers } from "../utils/storage";

// Creating the context
const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {

    const [currentUserId, setCurrentUserId] = useState(() =>
        loadCurrentUserId()
    )

    React.useEffect(() => {
        saveCurrentUserId(currentUserId)
    }, [currentUserId])


    const isAuthenticated = Boolean(currentUserId)

    // actions
    // login function
    const login = (email, password) => {
        // get the list of all users present in our app
        const usersArray = loadUsers()

        // move through this array and check if the entered email is present in this array or not
        const userFound = usersArray.find(user => user.email === email)

        // check if the user was present inside the array
        /* if(userFound !== null){
            // check for the password verification
            userFound.password === password && saveCurrentUserId(userFound.id)
        } */

        // we currently don't need password verification, hence wont't be using it
        if(userFound){ 
            saveCurrentUserId(userFound.id) // saving the user user id to the local storage
            setCurrentUserId(userFound.id)    // saving the current user to local storage
        }
        else{
            const newUser = {
                id: Date.now().toString(),
                email,
                // name: null,
                // bio: null,
                // avatar: null,
                createdAt: Date.now()
            }
            // adding new user to the users array
            const newUsersArray = [newUser, ...usersArray] // making a new array containing the new user
            saveUsers(newUsersArray)  // saving the users to the user array in local storage
            setCurrentUserId(newUser.id)   // setting the current user as the new user object i made
            saveCurrentUserId(newUser.id) // saving the current user to local storage
        }
    }

    const logout = () => {
        setCurrentUserId(null)
    }


  return (
    <AuthContext.Provider value={{
        currentUserId,
        isAuthenticated,
        login,
        logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if(!context) 
        throw new Error("content must be wrapped inside context")
    return context
}


import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { userAuth: action.userAuth }
        case 'LOGOUT':
            return { userAuth: null }
        default:
            return state
    }
}

export const AuthContextProvider = ( {children} ) => {
    const userAuth = JSON.parse(localStorage.getItem('userAuth'))   // check if logged in already on first render
    const [state, dispatch] = useReducer(authReducer, {userAuth: userAuth})
        
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
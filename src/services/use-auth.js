import { useState, useContext, createContext } from 'react'
import { authorize, logout, fetchProfile } from '../utils/auth'

const AuthContext = createContext(undefined)

export function useAuth() {
    const [user, setUser] = useState(null)

    async function signIn(formData) {
        const { success, user: userData } = await authorize(formData)
        if (success) setUser(userData)
    }

    async function signOut() {
        const { success } = await logout();
        if (success) setUser(null)
    }

    async function getUser() {
        const { success, error, user: userData } = await fetchProfile()
        if (success) setUser(userData)
        if (error) setUser(null)
    }

    return {
        user,
        signIn,
        signOut,
        getUser
    }
}

export function ProvideAuth({ children }) {
    const auth = useAuth()
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext)
}

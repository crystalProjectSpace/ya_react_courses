import { useState, useContext, createContext, type ReactNode } from 'react'
import { authorize, logout, fetchProfile } from '../utils/auth'
import type { TAuthPayload, TAuthContext, TFetchUserResult, TUser } from '../types'

const AuthContext = createContext<TAuthContext | undefined>(undefined)

export function useAuth() {
    const [user, setUser] = useState<TUser>(null)
    const [signed, setSigned] = useState<boolean>(false)

    async function signIn(formData: TAuthPayload) {
        const { success, user: userData } = await authorize(formData)
        if (success) {
            setUser(userData)
            setSigned(true)
        }
    }

    async function signOut() {
        const { logout: success }: { logout?: boolean} = await logout();
        if (success) {
            setUser(null)
            setSigned(false)
        }
    }

    async function getUser() {
        const response = await fetchProfile()
        if (!response) {
            setUser(null)
            setSigned(false)
        }
        const { success, user: userData, error } = response as TFetchUserResult
        if (success) setUser(userData as TUser)
        if (error) setUser(null)
        setSigned(!!success)
    }

    return {
        user,
        signed,
        signIn,
        signOut,
        getUser
    }
}

export function ProvideAuth({ children }: { children: ReadonlyArray<ReactNode>}) {
    const auth = useAuth()
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext)
}

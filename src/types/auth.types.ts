export type TUser = {
    name: string
    email: string
} | null

export type TAuthPayload = {
    email: string
    password: string
}

export type TRegPayload = TAuthPayload & { name?: string }

export type TChangePassPayload = {
    token: string
    password: string
}

export type TFetchUserResult = {
    success?: boolean,
    user?: TUser
    error?: string
}

export type TAuthContext = {
    user: TUser
    signed: boolean
    signIn: (formData: TAuthPayload) => Promise<void>
    signOut: () => Promise<void>
    getUser: () => Promise<void>
}

import { type ReactElement, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useLocation } from "react-router";
import { useAuthContext } from "../../services/use-auth";

interface IRouteGuard {
    element: ReactElement | HTMLElement
    isAnonymous?: boolean
}

type TAuthContext = {
    user: TUser
    signed?: boolean
    getUser: () => Promise<unknown>  
}

type TUser = {
    name: string
    email: string
} | null

export function RouteGuard(props: IRouteGuard) {
    const { element, isAnonymous } = props;
    const [loadComplete, setLoadComplete] = useState(false)
    const { user, signed, getUser } = useAuthContext()  as unknown as TAuthContext
    const location = useLocation()

    const loadUser = async () => {
        await getUser();
        setLoadComplete(true)
    }

    useEffect(() => { loadUser() }, [])

    if (!loadComplete)  return null

    const fromLocation = location.state?.from || '/'

    if (isAnonymous && user && signed) return <Navigate to={fromLocation}/>
    if (!isAnonymous && (!user || !signed)) return <Navigate to='/login' replace />
    return element
}

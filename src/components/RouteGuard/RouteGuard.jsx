import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useLocation } from "react-router";
import { useAuthContext } from "../../services/use-auth";

export function RouteGuard(props) {
    const { element, isAnonymous } = props;
    const [loadComplete, setLoadComplete] = useState(false)
    const { user, signed, getUser } = useAuthContext()
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

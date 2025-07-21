import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAuthContext } from "../../services/use-auth";

export function RouteGuard(props) {
    const { element, allowAuthorized } = props;
    const [loadComplete, setLoadComplete] = useState(false)
    const { user, getUser } = useAuthContext()

    const loadUser = async () => {
        await getUser();
        setLoadComplete(true)
    }

    useEffect(() => { loadUser() }, [])

    if (!loadComplete)  return null

    if (allowAuthorized !== false) return user
        ? element
        : <Navigate to='/login' replace />

    return user
        ? <Navigate to='/' replace/>
        : element;
}

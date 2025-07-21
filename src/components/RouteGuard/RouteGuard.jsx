import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAuthContext } from "../../services/use-auth";

export function RouteGuard(props) {
    const { element } = props;
    const [loadComplete, setLoadComplete] = useState(false)
    const { user, getUser } = useAuthContext()

    const loadUser = async () => {
        await getUser();
        setLoadComplete(true)
    }

    useEffect(() => { loadUser() }, [])

    if (!loadComplete)  return null

    return user ? element : <Navigate to='/login' replace />
}

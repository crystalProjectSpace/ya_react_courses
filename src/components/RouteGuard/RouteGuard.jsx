import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { fetchProfile } from "../../utils/auth";

export function RouteGuard(props) {
    const { element, allowAuthorized } = props;
    const [loadComplete, setLoadcomplete] = useState(false)
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        const loadUser = async () => {
            const response = await fetchProfile();
            setLoadcomplete(true)
            if (response.user) setIsAuthorized(true)
        }
        loadUser()
    }, [])

    if (!loadComplete) return null

    if (allowAuthorized) {
        return isAuthorized
            ? element
            : <Navigate to='/login' replace/>
    }

    return isAuthorized
        ? <Navigate to='/' replace/>
        : element
}

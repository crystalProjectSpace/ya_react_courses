import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { fetchProfile } from "../../utils/auth";

export function RouteGuard(props) {
    const { element, allowAuthorized } = props;
    const [loadComplete, setLoadComplete] = useState(false)
    const [isAuthorized, setIsAuthorized] = useState(false)

    const loadUser = async () => {
        if (isAuthorized) return
        const response = await fetchProfile();
        setLoadComplete(true)

        if (response.success) setIsAuthorized(true)
    }

    loadUser()

    if (!loadComplete)  return null

    if (allowAuthorized !== false) return isAuthorized
        ? element
        : <Navigate to='/login' replace />

    return isAuthorized
        ? <Navigate to='/' replace/>
        : element;
}

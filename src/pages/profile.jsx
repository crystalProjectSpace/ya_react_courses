import { useEffect } from "react"
import { useDispatch, useSelector} from 'react-redux'
import { getUserProfile } from "../services/reducers/auth.reducer"

function ProfilePage () {
    const dispatch = useDispatch()

    const user = useSelector(state => state.authorization.user)

    useEffect(() => {
        dispatch(getUserProfile())
    }, []);
    return (<section class="page-wrap">{ JSON.stringify(user)}</section>)
}

export default ProfilePage;
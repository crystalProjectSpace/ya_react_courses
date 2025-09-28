import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../services/use-auth'
import styles from './profile-nav-menu.module.css'
import { TAuthContext } from '../../types';

export function ProfileNavMenu() {
    const { signOut } = useAuthContext() as TAuthContext
    const navigate = useNavigate();
    
    async function logoutUser() {
        await signOut()
        navigate('/login')
    }

    const profileActive = window.location.pathname === '/profile'

    const ordersActive = window.location.pathname.includes('/profile/orders')

    const profileLinkStyle = [
        'text text_type_main-medium',
        styles.profileLink,
        profileActive ? '' : 'text_color_inactive'
    ].filter(Boolean).join(' ')

    const orderListStyle = [
        'text text_type_main-medium',
        styles.profileLink,
        ordersActive ? '' : 'text_color_inactive'
    ].filter(Boolean).join(' ')
    
    return (<nav className={styles.navigation}>
        <li className={styles.navItem}>
            { profileActive ? <Link
                    to="/profile"
                    className={styles.profileItem}
                >
                    <span className={profileLinkStyle}>Профиль</span>
                </Link> :
                <span className={profileLinkStyle}>
                    Профиль
                </span>
            }
        </li>
        <li className={styles.navItem}>
            {
                ordersActive ? <Link
                    to="/profile/orders"
                    className={styles.profileItem}
                >
                    <span className={orderListStyle}>История заказов</span>
                </Link> :
                <span className={orderListStyle}>
                    История заказов
                </span>
            }
        </li>
        <li className={styles.navItem}>
            <span
                className={`${styles.profileItem} text text_type_main-medium`}
                role="button"
                onClick={logoutUser}
            >
                Выход
            </span>
        </li>
    </nav>)
}

import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../components/logoutButton";
import image from '../images/runer-silhouette-running-fast.png'


export default function Nav() {

    const { isAuthenticated } = useAuth0();

    return (
        <div className="shadow">
            <ul className="nav justify-content-between align-items-center p-2">
                <li>
                    <div className="container-fluid">
                        <a className="navbar-brand fs-1" href="/">
                            <img src={image} alt="Logo" width="50" height="50" className="d-inline-block align-text-top"/>
                                MiniFit
                        </a>
                    </div>
                </li>
                {
                    isAuthenticated && (<LogoutButton/>)
                }
            </ul>
        </div>
    )

}

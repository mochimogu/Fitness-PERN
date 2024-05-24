import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../components/logoutButton";


export default function Nav() {

    const { isAuthenticated } = useAuth0();

    return (
        <div>
            <ul className="nav justify-content-between">
                <li className="nav-item">
                    <a className="nav-link active fs-2" aria-current="page" href="/">MiniFit</a>
                </li>
                {
                    isAuthenticated && (<LogoutButton/>)
                }
            </ul>
        </div>
    )

}

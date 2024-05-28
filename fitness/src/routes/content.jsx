import { useEffect, useState } from "react";
import Nav from "./nav";
import { Outlet } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import images from '../images/16.jpg'

export default function Content() {

    const { user } = useAuth0();

    const [date, setCurrentDate] = useState(new Date())
    const [days, setDays] = useState(1);
    const [food, setFoodStatus]  = useState(false);
    const [data, setDataStatus]  = useState(false);
    const [workout, setWorkoutStatus]  = useState(false);


    const yesterday = () => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 1);
        setCurrentDate(newDate);
        setDays(days + 1);
    };

    const tomorrow = () => {
        if (days > 0) {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + 1);
            setCurrentDate(newDate);
            setDays(days - 1);
        }
    };

    useEffect(() => {
        console.log(window.location.pathname);
        let path = window.location.pathname;
        if(path === '/') {
            window.location.pathname = '/workout';
        }

        if(path === '/data') {
            setDataStatus(true);
        } else if (path === '/food') {
            setFoodStatus(true);
        } else {
            setWorkoutStatus(true);
        }
    }, [food,data,workout])

    
    return (
        <div>
            <Nav></Nav>
            <div className="nav flex-column">
                <div className="d-flex justified-content-center flex-row m-auto w-25 mt-3">
                    <button type="button" className="btn fs-1" onClick={yesterday}>&#8656;</button>
                    <h1 className="fs-2 pt-3 m-0 text-center">{date.toDateString()}</h1>
                    <button type="button" className="btn fs-1" onClick={tomorrow}>&#8658;</button>
                </div>
                <div className="d-flex justified-content-center m-auto m-100 mt-3 mb-4 p-2">
                    <ul className="nav nav-underline">
                        <li className="nav-item">
                            <a className={`nav-link ${workout ? "active" : ""}`} aria-current="page" href="/workout">Workout</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${food ? "active" : ""}`} aria-current="page" href="/food">Diet</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${data ? "active" : ""}`} aria-current="page" href="/data">Data</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <Outlet context={{date : date.toDateString(), username : user.name}}/>
            </div>
        </div>
    )
}

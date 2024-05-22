import { useState } from "react";



export default function Food() {

    const [visible, setVisible] = useState(false);
    const [food, setFood] = useState("");
    const [table, addToTable] = useState([]);
    const [tabelVisible, setTableVisible] = useState(false);

    const searching = (e) => {
        setFood(e); 
        setVisible(false);
        const element = document.getElementById("nutrition");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function displayInfo(data) {
        const list = document.getElementById('nutrition');
        
        const keys = Object.keys(data);
        const values = Object.values(data);

        for(let i = 0; i < keys.length; i++) {
            const li = document.createElement('li');
            li.className = "list-group-item fs-6";
            li.innerText = keys[i] + ": " + values[i];
            list.appendChild(li);
        }

    }

    async function searchFood() {
        const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${food}`, {
            method: "GET",
            headers: {
                "X-Api-Key": "OnohGsXooBakpFJQiAxPaQ==Q5JAwosLVG95NAah"
            }
        });

        if(response.ok) {
            const results = await response.json();
            // console.log(Object.keys(results.items[0]));
            displayInfo(results.items[0])
            setVisible(true);
            addToTable([results.items[0]]);
            setTableVisible(true);
        } else {
            console.log("Error : " + response.status);
        }

    }

    function add() {
        setFood("");
        const element = document.getElementById("nutrition");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        window.location.reload();
    }
    return (
        <div className="container">
            <div className="">
                <div className="w-75 m-auto">
                    <h3>Diet</h3>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Food</span>
                        <input type="text" class="form-control" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="searching food"
                            onChange={e => searching(e.target.value)}
                        />
                        <button class="btn btn-outline-primary" type="button" id="button-addon2" onClick={searchFood}>Search</button>
                    </div>
                    {
                        visible ? 
                            <div className="p-3 mb-3 mt-3 shadow bg-body-tertiary rounded">
                                <ul id="nutrition" className="list-group list-group-flush">

                                </ul>
                                <div className="d-flex flex-row-reverse mb-2">
                                    <button type="button" className="btn btn-primary fs-6" onClick={add}>Add</button>
                                </div>
                            </div>
                            :
                            <div id="nutrition">

                            </div>
                    }
                </div>
                <div className="w-75 m-auto p-3 mb-3 mt-3 shadow bg-body-tertiary rounded d-flex flex-column justify-content-between">
                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Food</th>
                                    <th scope="col">Calories</th>
                                    <th scope="col">Protein</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tabelVisible ?                                     
                                        table.map((datum) => (
                                            <tr>
                                                <td>{datum.name}</td>
                                                <td>{datum.calories}</td>
                                                <td>{datum.protein_g}</td>
                                            </tr>
                                        ))
                                        :
                                        <tr></tr>
                                }
                            </tbody>
                        </table>
                        <div className="d-flex flex-row-reverse mb-2">
                            <button type="button" className="btn btn-primary fs-6 ">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

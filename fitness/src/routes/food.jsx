import { useEffect, useState } from "react";



export default function Food() {

    const [visible, setVisible] = useState(false);
    const [food, setFood] = useState("");
    const [table, addToTable] = useState([]);
    const [tabelVisible, setTableVisible] = useState(false);
    const [totalPro, setProtein] = useState(0);
    const [totalCal, setCalories] = useState(0);


    const [foodList, addToFoodList] = useState({});

    function removeSearch() {
        const element = document.getElementById("nutrition");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    const searching = (e) => {
        setFood(e); 
        removeSearch();
        setVisible(false);
    }

    function displayInfo(data) {
        const list = document.getElementById('nutrition');
        
        const keys = Object.keys(data);
        const values = Object.values(data);

        for(let i = 0; i < keys.length; i++) {
            const li = document.createElement('li');
            li.className = "list-group-item fs-6 rounded";
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
            console.log(results.items[0]);
            displayInfo(results.items[0])
            setVisible(true);
            addToFoodList(results.items[0]);
        } else {
            console.log("Error : " + response.status);
        }

    }

    async function add() {
        setFood("");
        // let protein = 0;
        // let calories = 0;
        const response = await fetch('/api/addFood', {
            method : "POST",
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(
                {
                    'food' : foodList, 
                    'user' : 'JohnDoe', 
                    'date' : '12/12/2002'
                }
            )
        })

        if(response.ok) {
            const results = await response.json();
            console.log(results.food);
            addToTable(old => [...old , results.food]);
            // console.log(table);
            removeSearch();
            setVisible(false);

        } else {
            console.log(response.status + " STATUS CODE");
        }

    }

    async function deleteFood(e) {
        console.log(e);
        const response = await fetch('/api/deleteFood', {
            method : "DELETE",
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify({'id' : e, 'user' : 'JohnDoe', 'date' : '12/12/2002'})
        })

        if(response.ok) {
            const results = await response.json();
            console.log(results);
            const updatedTable = table.filter(items => items.name !== results.id);
            addToTable(updatedTable);
        } else {
            console.log(response.status + " STATUS CODE");
        }
    }

    useEffect(() => {
        async function getFood() {
            // let protein = 0;
            // let calories = 0;
            const response = await fetch('/api/getFood');
            if(response.ok) {
                const results = await response.json();
                // console.log(results);
                const userIndex = results.findIndex(item => item.users === 'JohnDoe');
                if(userIndex === -1) {
                    console.log('error');
                }
                const dateIndex = results[userIndex].dates.findIndex(item => item.date === "12/12/2002");
                if(dateIndex === -1) {
                    console.log('error');
                }
                addToTable(results[userIndex].dates[dateIndex].food);
                setTableVisible(true);
            } else {
                console.log(response.status + " STATUS CODE");
            }
        }
        getFood();
    },[]);

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
                            value={food}
                        />
                        <button class="btn btn-outline-primary" type="button" id="button-addon2" onClick={searchFood}>Search</button>
                    </div>
                    {
                        visible ? 
                            <div className="p-3 mb-3 mt-3 shadow bg-body-tertiary rounded">
                                <ul id="nutrition" className="list-group list-group-flush mb-2">

                                </ul>
                                <div className="d-flex flex-row-reverse mb-2">
                                    <button type="button" className="btn btn-primary fs-6" onClick={add}>Add</button>
                                </div>
                            </div>
                            :
                            <div>
                                <ul id="nutrition" className="list-group list-group-flush">

                                </ul>
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tabelVisible ?                                     
                                        table.map((datum, index) => (
                                            <tr key={index}>
                                                <td>{datum.name}</td>
                                                <td>{datum.calories}</td>
                                                <td>{datum.protein_g}</td>
                                                <td><button id={datum.name} type="button" className="btn btn-danger" onClick={e => deleteFood(e.target.id)}>&#10005;</button></td>
                                            </tr>
                                        ))
                                        :
                                        <tr></tr>
                                }
                                <tr>
                                    <td>Total</td>
                                    <td>{totalCal}</td>
                                    <td>{totalPro}</td>
                                    <td></td>
                                </tr>
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

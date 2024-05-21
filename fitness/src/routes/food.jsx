import { useState } from "react";



export default function Food() {

    const [food, setFood] = useState("");

    const [table, addToTable] = useState([]);


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
        } else {
            console.log("Error : " + response.status);
        }

    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h3>Diet</h3>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Food</span>
                        <input type="text" class="form-control" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="searching food"
                            onChange={e => setFood(e.target.value)}
                        />
                    </div>
                    <div id="nutrition">

                    </div>
                    <div className="d-flex flex-row-reverse mb-2">
                        <button type="button" className="btn btn-primary fs-6" onClick={searchFood}>Add</button>
                    </div>
                </div>
                <div className="col shadow p-3 mb-3 bg-body-tertiary rounded d-flex flex-column justify-content-between">
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
                                <tr>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <td colspan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex flex-row-reverse mb-2">
                        <button type="button" className="btn btn-primary fs-6 ">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

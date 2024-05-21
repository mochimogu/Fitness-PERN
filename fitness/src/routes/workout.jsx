import { useState } from "react";




export default function Workout() {

    const [exercise, setExercise] = useState("");
    const [reps, setReps] = useState(0);
    const [sets, setSets] = useState(0);
    
    function addExercise() {
        const exercises = document.getElementById('exercise')

        const list = document.createElement('li');
        const text = document.createElement('p');
        text.innerText = "" + exercise + " " + sets + "x" + reps;

        list.appendChild(text);
        exercises.appendChild(list);
    }
    
    return (
        <div className="container mb-3">
        <div className="row p-2">
            <div className="col d-flex flex-column">
                <h3>Enter the Exercise</h3>
                <div className="input-group mb-2">
                    <span className="input-group-text" id="inputGroup-sizing-default">Exercise</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={e => setExercise(e.target.value)}/>
                    <div className="input-group mt-2">
                        <span className="input-group-text" id="inputGroup-sizing-default">Sets</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={e => setSets(e.target.value)}/>
                        <span className="input-group-text" id="inputGroup-sizing-default">Reps</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={e => setReps(e.target.value)}/>
                    </div>
                </div>
                <div className="d-flex flex-row-reverse mb-2">
                    <button type="button" className="btn btn-primary fs-6 pr-3" onClick={addExercise}>Add</button>
                </div>
            </div>
            <div className="col shadow p-3 mb-3 bg-body-tertiary rounded d-flex flex-column justify-content-between">
                <ul id="exercise">

                </ul>
                <div className="d-flex flex-row-reverse">
                    <button type="button" className="btn btn-primary fs-6 ">Save</button>
                </div>
            </div>
        </div>
    </div>
    )

}

import { useEffect, useState } from "react";

export default function Workout() {

    const [exercise, setExercise] = useState("");
    const [visible, setVisible] = useState(false);
    const [reps, setReps] = useState(0);
    const [sets, setSets] = useState(0);
    
    const [exerciseList, addToList] = useState([]);

    async function addExercise() {

        if(exercise !== "" || sets !== 0 || reps !== 0) {
            const sending = {
                'exercise' : exercise,
                'sets' : sets,
                'reps' : reps,
            }
    
            const response = await fetch('/api/addExercise', {
                method : "POST",
                headers : {"Content-type" : "application/json"},
                body : JSON.stringify(sending)
            })
    
            if(response.ok) {
                // renderExercise();
                console.log(await response.status);
                addToList(old => [...old, sending])
            } else {
                console.log(response.status + " STATUS CODE");
            }
        } else {
            alert("Inputs are Empty");
        }
    }

    async function removeExercise(e) {
        console.log(e);
        const response = await fetch("/api/deleteExercise", {
            method : "DELETE",
            headers : {"Content-type" : "application/json"},
            body : JSON.stringify({id : e})
        });

        if(response.ok) {
            const results = await response.json();
            // console.log(results);
            const updatedExerciseList = exerciseList.filter(items => items.exercise !== results.id);
            addToList(updatedExerciseList);
        } else {
            console.log(response.status + " STATUS CODE");
        }

    }

    const clear = () => {
        setExercise("");
        setReps(0);
        setSets(0);
    }

    useEffect(() => {
        async function getData() {
            const response = await fetch('/api/getExercise');

            if(response.ok) {
                const results = await response.json();
                // console.log(results[1].dates[0].workout);
                setVisible(true);
                addToList(results[1].dates[0].workout);
            } else {
                console.log(response.status + " STATUS CODE");
                setVisible(false);
            }
        }
        getData();
    }, [])

    
    return (
        <div className="container mb-3">
        <div className="p-2">
            <div className="w-75 m-auto pd-3 d-flex flex-column">
                <h3>Enter the Exercise</h3>
                <div className="input-group mb-2 mt-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Exercise</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-default" 
                        onChange={e=>setExercise(e.target.value)}
                        value={exercise}
                    />
                    <div className="input-group mt-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Sets</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" 
                            aria-describedby="inputGroup-sizing-default" 
                            onChange={e=>setSets(e.target.value)}
                            value={sets}
                        />
                        <span className="input-group-text" id="inputGroup-sizing-default">Reps</span>
                        <input type="text" className="form-control" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" 
                            onChange={e=>setReps(e.target.value)}
                            value={reps}
                        />
                    </div>
                </div>
                <div className="btn-group justify-content-end">
                    <button type="button" className="btn btn-primary" onClick={addExercise}>Add</button>
                    <button type="button" className="btn btn-primary" onClick={clear}>Clear</button>                
                </div>
            </div>
                <div className="w-75 m-auto shadow p-3 mt-3 mb-3 bg-body-tertiary rounded d-flex flex-column justify-content-between">
                    <ul id="exercise" className="list-group fs-5">
                        {
                            visible ?
                                exerciseList.map((datum,index) => (
                                    <li key={index} id={datum.exercise} className="d-flex justify-content-between mb-2">
                                        <p className="m-0">{`${datum.exercise} ${datum.sets}x${datum.reps}`}</p>
                                        <button id={datum.exercise} type="button" className="btn btn-danger" onClick={e => {removeExercise(e.target.id)}}>&#10005;</button>
                                    </li>
                                ))
                                :
                                <li></li>
                        }
                    </ul>
                    <div className="d-flex flex-row-reverse mt-3">
                        <button type="button" className="btn btn-primary fs-6 ">Save</button>
                    </div>
                </div>
            </div>
    </div>
    )

}

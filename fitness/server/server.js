const express = require('express');
const cors = require('cors');
const app = express();
const { 
    getAllData, 
    insertExercise, 
    deleteExercise,
    insertFood,
    deleteFood
} = require('./db');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Start on ${PORT}`);
})
app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    response.status(200).send(`<h1>WELCOME TO THE BACKEND</h1><a href=${'https://github.com/mochimogu/fitness'}>Github Code for the Backend</a>`)
})

//EXERCISE API
app.post("/api/addExercise", async (request, response) => {

    // console.log(request.body);
    let exerciseData = {
        'date' : request.body.date,
        'workout' : {
            'exercise' : request.body.workout.exercise,
            'sets' : request.body.workout.sets,
            'reps' : request.body.workout.reps
        }
    }
    const results = await insertExercise(request.body.user, exerciseData);
    // console.log(results);
    if(results === 0) {
        response.status(201).json({'reply' : 'success', 'workout' : exerciseData.workout});
    } else {
        response.status(400).json({'reply' : "error"});
    }

})

app.get("/api/getExercise", async (request, response) => {
    const results = await getAllData();
    // console.log(results);
    response.status(201).send(results);
})

app.delete("/api/deleteExercise", async (request, response) => {

    const data = {
        date : request.body.date,
        id : request.body.id
    }

    const results = await deleteExercise(request.body.user, data);
    console.log("AFTER DELETION : ", results);
    response.status(201).json({id : results, exercise : request.body.id});
})

//FOOD API
app.get('/api/getFood', async (request, response) => {
    const results = await getAllData();
    // console.log(results);
    response.status(201).send(results);
})

app.post('/api/addFood', async (request, response) => {
    // console.log(request.body)
    const data = {
        food : request.body.food,
        date : request.body.date
    }
    const results = await insertFood(request.body.user, data)
    if(results === 0) {
        response.status(201).json({'sending' : "success", 'food' : request.body.food});
    } else {
        response.status(400).json({'sending' : "error"});
    }
})

app.delete('/api/deleteFood', async (request, response) => {

    const data = {
        id : request.body.id,
        date : request.body.date
    }
    const results = await deleteFood(request.body.user, data);
    console.log(results);
    if(results === 0) {
        response.status(201).json({reply : 'success', id : request.body.id});
    } else {
        response.status(201).json({reply : 'error'});
    }
})

//DATA API
app.get('/api/getFoodData', async (request, response) => {

    const results = await getAllData();
    // console.log(results[0].dates[0].food);
    response.status(200).json({reply : 'success', data : results});
})



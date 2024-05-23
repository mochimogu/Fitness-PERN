const { response } = require('express');
const express = require('express');
const app = express();
const { getAllData } = require('./db');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Start on ${PORT}`);
})
app.use(express.json());

const testData = {
    'name' : 'asdf',
    'age' : 12,
    'birth' : '12/12/2002'
}

let testExercise = [
    {
        'exercise' : 'pull-ups',
        'sets' : 2,
        'reps' : 15
    },
]

let testFood = [
    {
        'name': 'cheese',
        'calories': 393.9,
        'serving_size_g': 100,
        'fat_total_g': 33,
        'fat_saturated_g': 18.9,
        'protein_g': 22.7,
        'sodium_mg': 661,
        'potassium_mg': 459,
        'cholesterol_mg': 100,
        'carbohydrates_total_g': 3.2,
        'fiber_g': 0,
        'sugar_g': 0.5,
    },
]

//TEST
app.get("/api/getData", (request, response) => {
    response.send(testData);
})
//EXERCISE API
app.post("/api/addExercise", (request, response) => {

    console.log(request.body);
    testExercise.push(
        {
            'exercise' : request.body.exercise,
            'sets' : request.body.sets,
            'reps' : request.body.reps
        }
    )
    response.status(201).send("success");

})

app.get("/api/getExercise", async (request, response) => {
    const results = await getAllData();
    // console.log(results);
    response.status(201).send(results);
})

app.delete("/api/deleteExercise", (request, response) => {

    for(let i = 0; i < testExercise.length; i++) {
        if(testExercise[i].exercise === request.body.id) {
            console.log("matches!")
            testExercise.splice(i, 1);
            break;
        }
    }
    console.log("AFTER DELETION : ", testExercise);
    response.status(201).json({id : request.body.id});
})

//FOOD API
app.get('/api/getFood', async (request, response) => {
    const results = await getAllData();
    // console.log(results);
    response.status(201).send(results);
})

app.post('/api/addFood', (request, response) => {
    console.log(request.body.food)
    testFood.push(request.body.food);
    response.status(201).json({'sending' : "success", 'food' : testFood});
})

app.delete('/api/deleteFood', (request, response) => {
    console.log(request.body.id)
    for(let i = 0; i < testFood.length; i++) {
        if(testFood[i].name === request.body.id) {
            console.log("matches!")
            testFood.splice(i, 1);
            break;
        }
    }
    response.status(201).json({id : request.body.id});
})

//DATA API
app.get('/api/getFoodData', (request, response) => {
    response.status(200).send(testFood);
})



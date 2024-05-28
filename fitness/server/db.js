const Pool = require('pg').Pool;
require('dotenv').config()


const pool = new Pool({
    //THE CONNECTION STRING FROM THE EXTERNAL LINK IN RENDER.COM
    connectionString : process.env.HOST,
    //THIS IS REQUIRE IF RENDER.COM ENFORECES SSL CONNECTIONS
    ssl: {
        rejectUnauthorized: false
    }
})

async function getAllData() {
    try {
        const client = await pool.connect();
        const reply = await client.query("SELECT * FROM exercisedb");
        //RELEASE() => RETURN THE CONNECTION BACK TO THE POOL
        await client.release();
        return reply.rows;

    } catch (error) {
        console.log('inside db file');
        console.log(error);
    }
}

async function insertExercise(user, data) {
    try {
        const client = await pool.connect();
        // console.log(data);

        const reply = await client.query("SELECT * FROM exercisedb");
        const userIndex = reply.rows.findIndex(items => items.users === user);
        console.log(userIndex);
        //CHECK IF THE USER IS BRAND NEW
        if(userIndex !== -1) {

            const dateIndex = reply.rows[userIndex].dates.findIndex(items => items.date === data.date);
            //USER EXISTED BUT THE DATE IS NOT POPULATED
            if(dateIndex !== -1) {
                reply.rows[userIndex].dates[dateIndex].workout.push(data.workout);
                // console.log(reply.rows[userIndex].dates[dateIndex].workout);
                const insertCommand = {
                    text: "UPDATE exercisedb SET dates = $1 WHERE users = $2",
                    values : [JSON.stringify(reply.rows[userIndex].dates), user]
                }

                await client.query(insertCommand);
                await client.release();
                return 0;

            } else {
                const newDate = {
                    date : data.date,
                    food : [],
                    workout : [data.workout],
                };
                reply.rows[userIndex].dates.push(newDate);
                const insertCommand = {
                    text: "UPDATE exercisedb SET dates = $1 WHERE users = $2",
                    values : [JSON.stringify(reply.rows[userIndex].dates), user]
                }

                await client.query(insertCommand);
                await client.release();
                return 0;
            }
        } else {
            const newUserDates = [
                {
                    date: data.date,
                    food: [],
                    workout: [data.workout],
                },
            ];
            const insertCommand = {
                text : "INSERT INTO exercisedb (users, dates) VALUES($1, $2)",
                values : [user, JSON.stringify(newUserDates)]
            }
            await client.query(insertCommand);
            await client.release();

            return 0;
        }

    } catch (error) {
        console.log('inside db file');
        console.log(error);
    }
}

async function deleteExercise(user, data) {

    try {
        const client = await pool.connect();

        const reply = await client.query("SELECT * FROM exercisedb");
        //CHECK USER EXIST
        const userIndex = reply.rows.findIndex(items => items.users === user);
        if (userIndex === -1) {
            console.log('user cannot delete item - user not exist');
            return 1
        }
        //CHECK DATE EXIST
        const dateIndex = reply.rows[userIndex].dates.findIndex(items => items.date === data.date);
        if (dateIndex === -1) {
            console.log('date does not exist');
            return 1;
        }
        //CHECK WORKOUT EXIST
        const exerciseIndex = reply.rows[userIndex].dates[dateIndex].workout.findIndex(items => items.exercise === data.id);
        if (exerciseIndex === -1) {
            console.log('workout does not exist');
            return 1;
        }

        const newWorkout = reply.rows[userIndex].dates[dateIndex].workout.filter((item) => item.exercise !== data.id);
        // console.log(newWorkout);
        if (newWorkout) {
            reply.rows[userIndex].dates[dateIndex].workout = newWorkout;
            const insertCommand = {
                text: "UPDATE exercisedb SET dates = $1 WHERE users = $2",
                values: [JSON.stringify(reply.rows[userIndex].dates), user]
            }
            await client.query(insertCommand);
            await client.release();
            console.log('successful deletion');
            return 0;
        } else {
            console.log('unsuccessful deletion');
            return 1;
        }
    } catch (error) {
        console.log(error);
        return 1;
    }

}

async function insertFood(user, data) {
    // console.log(user, data);    
    try {
        const client = await pool.connect();
        // console.log(data);

        const reply = await client.query("SELECT * FROM exercisedb");
        const userIndex = reply.rows.findIndex(items => items.users === user);
        //CHECK IF THE USER IS BRAND NEW
        if(userIndex !== -1) {

            const dateIndex = reply.rows[userIndex].dates.findIndex(items => items.date === data.date);
            //USER EXISTED BUT THE DATE IS NOT POPULATED
            if(dateIndex !== -1) {
                reply.rows[userIndex].dates[dateIndex].food.push(data.food);
                // console.log(reply.rows[userIndex].dates[dateIndex].food);
                const insertCommand = {
                    text: "UPDATE exercisedb SET dates = $1 WHERE users = $2",
                    values : [JSON.stringify(reply.rows[userIndex].dates), user]
                }

                await client.query(insertCommand);
                await client.release();
                return 0;

            } else {
                const newDate = {
                    date : data.date,
                    food : [data.food],
                    workout : [],
                };
                reply.rows[userIndex].dates.push(newDate);
                const insertCommand = {
                    text: "UPDATE exercisedb SET dates = $1 WHERE users = $2",
                    values : [JSON.stringify(reply.rows[userIndex].dates), user]
                }

                await client.query(insertCommand);
                await client.release();
                return 0;
            }
        } else {
            const newUserDates = [
                {
                    date: data.date,
                    food: [data.food],
                    workout: [],
                },
            ]
            const insertCommand = {
                text : "INSERT INTO exercisedb (users, dates) VALUES($1, $2)",
                values : [user, newUserDates]
            }
            await client.query(insertCommand);
            await client.release();
            return 0;
        }
    } catch (error) {
        console.log(error);
        return 1;
    }   
}

async function deleteFood(user, data) {

    try {
        const client = await pool.connect();

        const reply = await client.query("SELECT * FROM exercisedb");
        //CHECK USER EXIST
        const userIndex = reply.rows.findIndex(items => items.users === user);
        if (userIndex === -1) {
            console.log('user cannot delete item - user not exist');
            return 1
        }
        //CHECK DATE EXIST
        const dateIndex = reply.rows[userIndex].dates.findIndex(items => items.date === data.date);
        if (dateIndex === -1) {
            console.log('date does not exist');
            return 1;
        }
        //CHECK FOOD EXIST
        const foodIndex = reply.rows[userIndex].dates[dateIndex].food.findIndex(items => items.name === data.id);
        if (foodIndex === -1) {
            console.log('workout does not exist');
            return 1;
        }

        const newFood = reply.rows[userIndex].dates[dateIndex].food.filter((item) => item.name !== data.id);
        // console.log(newFood);
        //CREATES A NEW ARRAY WITHOUT THE DELETED ONE
        if (newFood) {
            //ASSIGNS IT BACK INTO THE OLD FOOD ARRAY
            reply.rows[userIndex].dates[dateIndex].food = newFood;
            const insertCommand = {
                text: "UPDATE exercisedb SET dates = $1 WHERE users = $2",
                values: [JSON.stringify(reply.rows[userIndex].dates), user]
            }
            await client.query(insertCommand);
            await client.release();
            console.log('successful deletion');
            return 0;
        } else {
            console.log('unsuccessful deletion');
            return 1;
        }
    } catch (error) {
        console.log(error);
        return 1;
    }

}


module.exports = { getAllData, insertExercise, deleteExercise, insertFood, deleteFood};

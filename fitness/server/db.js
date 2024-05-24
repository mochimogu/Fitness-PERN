const { text } = require('express');

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
                    workout: data.workout,
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
        console.log('inside db file');
        console.log(error);
    }
}




module.exports = { getAllData, insertExercise};

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

        const insertCommand = {
            text : 'INSERT INTO exercisedb(users, dates)',
            values : []
        }

        const findCommand = ('SELECT * FROM exercisedb WHERE users = $1', [user]);

        const reply = await client.query(findCommand);
        console.log(reply.rows);

        await client.release();
        return 1;
    } catch (error) {
        console.log('inside db file');
        console.log(error);
    }
}




module.exports = { getAllData, insertExercise};

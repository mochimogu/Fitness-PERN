const Pool = require('pg').Pool;
require('dotenv').config()

const url = "postgres://exercisedb_user:TiLE0OIglY49EfCDSmDA4gQuxxlLE5su@dpg-cp7lvd63e1ms73an8dsg-a.oregon-postgres.render.com/exercisedb";

const pool = new Pool({
    //THE CONNECTION STRING FROM THE EXTERNAL LINK IN RENDER.COM
    connectionString : url,
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




module.exports = { getAllData };

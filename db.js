const Pool = require("pg").Pool;

const pool = new Pool({
    user: "hakim",
    password: "mora2703",
    database: "todo_databases",
    host: "localhost",
    port: 5432
});

module.exports = pool;
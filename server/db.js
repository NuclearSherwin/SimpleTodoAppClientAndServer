const Pool = require('pg').Pool

const pg_con = new Pool({
    user: 'phong',
    host: 'localhost',
    database: 'phong',
    password: '16032002',
    port: 5432,
});

module.exports = pg_con;

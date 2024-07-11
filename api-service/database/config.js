const client = "mysql2";
const connection = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_app'
};

const knexConfig = {
    client,
    connection
};

module.exports = knexConfig;

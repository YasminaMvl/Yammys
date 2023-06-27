module.exports = {
    secretKey: process.env.SECRET_KEY || 'yourSecretKey',
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'yourDatabase',
        username: process.env.DB_USERNAME || 'yourUsername',
        password: process.env.DB_PASSWORD || 'yourPassword',
    },
};

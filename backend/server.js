const express = require('express');
const { connectDatabase } = require('./utils/db');

const app = express();
const port = process.env.PORT || 3000;
const connection = connecDatabase();
if (!connection) { // If no connection quit
    process.exit(1);
}

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});

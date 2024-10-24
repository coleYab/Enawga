const express = require('express');
const { connectDatabase } = require('./utils/db');
const { router } = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;
const connection = connectDatabase();
if (!connection) { // If no connection quit
    process.exit(1);
}

app.use(express.json());
app.use('/api', router);
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});

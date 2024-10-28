import express from 'express';

const app = express();

app.get('/', () => {
    console.log("Hello express");
});

app.listen(3000, () => {
    console.log(`Server running at port: 3000`);
});

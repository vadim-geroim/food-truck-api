const express = require('express');
const app = express();
const port = 3000;

//Import mock data
const foodTrucks = require('./data/trucks-data.json');

//Parse JSON
app.use(express.json());

//Check if server is running
app.get('/', (req, res) => {
    res.send('Food Truck API is running');
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
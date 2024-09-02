const express = require("express");
const app = express();
const port = 3000;

//Import mock data
const foodTrucks = require("./data/trucks-data.json");

//Parse JSON
app.use(express.json());

//Check if server is running
app.get("/", (req, res) => {
  res.send("Food Truck API is running");
});

//Get all food trucks
app.get("/food-trucks", (req, res) => {
  res.json(foodTrucks.data);
});

app.get("/food-trucks/:locationid", (req, res) => {
  const locationid = parseInt(req.params.locationid);
  const truck = foodTrucks.data.find((t) => t.locationid === locationid);

  if (truck) {
    res.json(truck);
  } else {
    res.json(404).send("Food truck not found");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

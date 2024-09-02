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

//Get a food truck by locationid
app.get("/food-trucks/:locationid", (req, res) => {
  const locationid = parseInt(req.params.locationid);
  const truck = foodTrucks.data.find((t) => t.locationid === locationid);

  if (truck) {
    res.json(truck);
  } else {
    res.json(404).send("Food truck not found");
  }
});

//Update an existing food truck
app.put("/food-trucks/:locationid", (req, res) => {
    const locationid = parseInt(req.params.locationid);
    const index = foodTrucks.data.findIndex((t) => locationid === t.locationid);
  
    if (index !== -1) {
      const updatedTruck = { ...foodTrucks.data[index], ...req.body };
      foodTrucks.data[index] = updatedTruck; //The data is stored in-memory, just for the demonstration purpose
      res.json(updatedTruck);
    } else {
      res.status(404).send("Food truck not found");
    }
  });

//Add a new food truck
app.post("/food-trucks", (req, res) => {
    const newTruck = req.body;
    foodTrucks.data.push(newTruck); //The data is stored in memory, just for the demonstration purpose.
    res.status(201).json(newTruck);
  });

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

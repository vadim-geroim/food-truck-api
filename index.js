const express = require("express");
const { body, param, validationResult } = require("express-validator");
const errorHandler = require("./helpers/errorHandler");
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');

//Import mock data
const foodTrucks = require("./data/trucks-data.json");

//Parse JSON
app.use(express.json());

//Check if server is running
app.get("/", (req, res) => {
  res.send("Food Truck API is running");
});

/**
 * @swagger
 * /food-trucks:
 *   get:
 *     summary: Retrieve a list of food trucks
 *     responses:
 *       200:
 *         description: A list of food trucks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

//Get all food trucks
app.get("/food-trucks", (req, res) => {
  res.json(foodTrucks.data);
});

/**
 * @swagger
 * /food-trucks/{locationid}:
 *   get:
 *     summary: Retrieve a food truck by locationid
 *     parameters:
 *       - in: path
 *         name: locationid
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the food truck to get
 *     responses:
 *       200:
 *         description: A single food truck
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Food truck not found
 */

//Get a food truck by locationid
app.get(
  "/food-trucks/:locationid",
  [param("locationid").isInt().withMessage("Location ID must be an integer")],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const locationid = parseInt(req.params.locationid);
    const truck = foodTrucks.data.find((t) => t.locationid === locationid);

    if (truck) {
      res.json(truck);
    } else {
      res.status(404).json({ error: "Food truck not found" });
    }
  }
);

/**
 * @swagger
 * /food-trucks/{locationid}:
 *   put:
 *     summary: Update an existing food truck
 *     parameters:
 *       - in: path
 *         name: locationid
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the food truck to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: The food truck was successfully updated
 *       404:
 *         description: Food truck not found
 */

//Update an existing food truck
app.put(
  "/food-trucks/:locationid",
  [
    param("locationid").isInt().withMessage("Location ID must be an integer"),
    body("Applicant")
      .optional()
      .notEmpty()
      .withMessage("Applicant name is required"),
    body("FacilityType")
      .optional()
      .notEmpty()
      .withMessage("Facility type is required"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const locationid = parseInt(req.params.locationid);
    const index = foodTrucks.data.findIndex((t) => locationid === t.locationid);

    if (index !== -1) {
      const updatedTruck = { ...foodTrucks.data[index], ...req.body };
      foodTrucks.data[index] = updatedTruck; //The data is stored in-memory, just for the demonstration purpose
      res.json(updatedTruck);
    } else {
      res.status(404).json({ error: "Food truck not found" });
    }
  }
);

/**
 * @swagger
 * /food-trucks:
 *   post:
 *     summary: Add a new food truck
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: The food truck was successfully created
 *       400:
 *         description: Invalid input
 */

//Add a new food truck
app.post(
  "/food-trucks",
  [
    body("locationid").isInt().withMessage("Location ID must be an integer"),
    body("Applicant").notEmpty().withMessage("Applicant name is required"),
    body("FacilityType").notEmpty().withMessage("Facility type is required"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTruck = req.body;
    foodTrucks.data.push(newTruck); //The data is stored in memory, just for the demonstration purpose.
    res.status(201).json(newTruck);
  }
);

/**
 * @swagger
 * /food-trucks/{locationid}:
 *   delete:
 *     summary: Delete a food truck
 *     parameters:
 *       - in: path
 *         name: locationid
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the food truck to delete
 *     responses:
 *       200:
 *         description: The food truck was successfully deleted
 *       404:
 *         description: Food truck not found
 */

//Remove food truck
app.delete(
  "/food-trucks/:locationid",
  [param("locationid").isInt().withMessage("Location ID must be an integer")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const locationid = parseInt(req.params.locationid);
    const index = foodTrucks.data.findIndex((t) => locationid === t.locationid);
    if (index !== -1) {
      foodTrucks.data.splice(index, 1); //The data is deleted from memory, just for the demonstration purpose.
      res.send(`Food truck with locationid ${locationid} has been deleted`);
    } else {
      res.status(404).json({ error: "Food truck not found" });
    }
  }
);

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Food Truck API",
      version: "1.0.0",
      description: "API for managing food trucks",
    },
  },
  apis: ["./index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const swaggerFilePath = path.join(__dirname, 'openapi-spec.json');
fs.writeFileSync(swaggerFilePath, JSON.stringify(swaggerDocs, null, 2));

app.get('/openapi-spec.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'openapi-spec.json'));
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));


module.exports = {app, server}
# Food Truck API

Food Truck API is a Node.js and Express.js-based RESTful API that provides information about various food trucks. The API allows users to retrieve, add, update, and delete food truck data. The API also includes Swagger documentation for easy testing and exploration.

## Features

- Retrieve a list of all food trucks
- Get details of a specific food truck by `locationid`
- Add a new food truck
- Update an existing food truck
- Delete a food truck
- Swagger documentation available for easy API exploration

## Project Structure

- **data/**: Contains `trucks-data.json` with mock data for food trucks.
- **tests/**: Includes test cases for each API endpoint.
- **helpers/**: Contains `errorHandler.js` for custom error handling.
- **index.js**: The main application file that sets up and runs the server.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **package.json**: Lists Node.js dependencies and project scripts.
- **package-lock.json**: Lockfile to ensure consistent dependency installations.
- **Procfile**: Configuration file for deploying the app to Heroku.




## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/vadim-geroim/food-truck-api.git
    cd food_truck_api
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

## Usage

1. **Run the application**:
    ```bash
    npm start
    ```
   This command will start the server at `http://localhost:3000`.

2. **Access the API**:

   - Open your browser or use a tool like Postman to interact with the API.
   - Swagger documentation is available at `http://localhost:3000/api-docs` for easy API exploration and testing.

## API Endpoints

- **GET /food-trucks**: Retrieve a list of all food trucks
- **GET /food-trucks/:locationid**: Get details of a specific food truck by `locationid`
- **POST /food-trucks**: Add a new food truck
- **PUT /food-trucks/:locationid**: Update an existing food truck
- **DELETE /food-trucks/:locationid**: Delete a food truck

## Testing

To run tests for the API endpoints, navigate to the `tests` folder and use the following command:

```bash
cd tests
npm test
```

## Deployment

This API can be easily deployed to Heroku. Follow these steps to deploy:

1. **Login to Heroku**:
    ```bash
    heroku login
    ```

2. **Create a new Heroku app**:
    ```bash
    heroku create your-app-name
    ```

3. **Deploy your code to Heroku**:
    ```bash
    git push heroku main
    ```

4. **Access your deployed API**: Once deployed, your API and Swagger documentation will be available at `https://your-app-name.herokuapp.com/api-docs`.

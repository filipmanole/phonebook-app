# phonebook-app

The project was developed using:

- Typescript for the entire stack
- React
- NestJS
- GraphQL
- Docker

There are 4 docker containers:

- mongo: mongoDB docker image used to store the contacts
- mongo-express: web interface to explore the database
- backend: alpine docker image, where the NestJS application with graphQL is deployed
- frontend: apline docker image, where the React application is deployed

## Run the project locally

1. Make sure Docker and docker-compose is installed on your local machine.
2. Configure the `.env` file from the root directory of the repository.
3. To run the entire stack, run the following command from the root of the repository:
   ```sh
   docker-compose up
   ```
4. Go to [http://localhost:8080](http://localhost:8080) and test the app.

_Default configurations_:

- Mongo database is running on port `21017` with the username and password set as `root`
- Mongo express is available at [http://localhost:8081](http://localhost:8081) with the username and password set as `root`
- The frontend interface is available at [http://localhost:8080](http://localhost:8080)
- The backend api runs on port `3000` and the GraphQL port is accessible at [http://localhost:3000/graphQL](http://localhost:3000/graphQL)

## Improvements

- Phone number validation. At this moment you can enter any string as the phone number for a new contact.
- Generate types for frontend based on the GraphQL schemas.
- Write unit tests for frontend and backend to increase maintainability.

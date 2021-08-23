## Installing Dependencies

First, install the dependencies:

```bash
yarn
```

## Development Setup

You need a database connection specified in the `.env`. Please refer to `.env.example` for a example configuration file.

If you are developing on localhost, you can use a dockerized database:
`docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=authority -p 5432:5432 -d postgres`

To set up the database you create the docker image and you can run the command: `yarn typeorm migration:run` to create the tables.

## Running the Project

Then you can can run the development server:

```bash
yarn dev
```

## API Endpoints

POST http://localhost:3000/api/users - Create new users to use the app:

### Params
```
{
  "name": "Jhon Doe",
  "email": "jhondoe@email.com",
  "password": "12345678"
}
```

POST http://localhost:3000/api/users/authenticate - Authenticate the user with valid credentials:

### Params
```
{
  "email": "jhondoe@email.com",
  "password": "12345678"
}
```
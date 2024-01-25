# NadSoft-Backend-Task

## Prerequisites

Before getting started with the project, users should have the following prerequisites in place:

- Node.js and npm (Node Package Manager)
- PostgreSQL (for data storage)

## Getting Started

To start using and contributing to the project, follow these steps for setting up the development environment and initial configuration.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KarimAhmedAhmed/NadSoft-Backend-Task.git
   ```

2. Install project dependencies:

   ```bash
   cd NadSoft-Backend-Task
   npm install
   npx prisma generate
   npx prisma migrate dev
   ```



### Running the Application

Explain how to run your application locally for development or testing purposes. Provide any necessary commands and steps for running the application, such as:

```bash
npm start
```


### Built With

- JavaScript
- NodeJS
- Express.js
- Prisma ORM
- PostgreSQL
- Jest (for testing)


### Testing

#### Running Tests

To run the tests, execute the following command:

```bash
npm run test
```

This command will run the test suites and provide information about test results.

#### Generating Test Coverage

We also provide the ability to generate test coverage reports to gain insights into the code coverage by tests. To generate the coverage report, use the following command:

```bash
npm run test:cov
```




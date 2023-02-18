# RealWorld - Node.js

> Implementation of the RealWord back-end spec using Node.js

![build](https://img.shields.io/github/actions/workflow/status/willpinha/realworld-node/node.js.yml?logo=github)
![release](https://img.shields.io/github/v/release/willpinha/realworld-node?include_prereleases)
![license](https://img.shields.io/github/license/willpinha/realworld-node)

## About

This is an implementation of the RealWorld REST API specification using Node.js. This project is a good way for you to
learn more about building REST APIs with Express

## Contributing

You are welcome to contribute to this project!

## Tech stack

|Technology|Description|
|--|--|
|`Express`|One of the most relevant web frameworks for Node.js to handle HTTP requests|
|`TypeORM`|ORM that facilitates the acess and synchronization of schemas of databases|
|`Jest`|One of the most relevant testing frameworks for Node.js|
|`Supertest`|Library used together with Jest to test HTTP servers|

## Project structure

The structure of a project made with Node.js and Express is not fixed and varies according to who is programming. The only rule is that
the project must be scalable and have its functionalities well defined and separated into different modules

```
.
├── app             (REST API source code with entry point at index.ts)
│   ├── config      (Configuration for things like database connections and environment variables)
│   ├── global      (Types and objects that are globally accessed by other modules)
│   ├── middlewares (Express middlewares that can be used in routes.ts)
│   └── models      (TypeORM entities for the database)
├── tests           (Integration tests for REST API using Jest and Supertest)
```

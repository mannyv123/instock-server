
# InStock - Server

Welcome to the back-end repository of the InStock project. This repository contains the code for the Express-based server of the Inventory Management System. This project was developed as part of a web development bootcamp, where collaboration and Agile development methodologies were emphasized.

## Table of Contents
1) [Project Overview](#Project-Overview)
2) [Screenshots](#Screenshots)
3) [Tech Stack](#Tech-Stack)
5) [Database Setup](#Database-Setup)
6) [Run Locally](#Run-Locally)
7) [Environment Variables](#Environment-Variables)

## Project Overview

The InStock project was developed during a web development bootcamp as a collaborative group project. The goal was to deliver a modern and scalable Inventory Management System for a client. The back-end server is built using Express, and it communicates with the front-end React application to handle data retrieval and manipulation. The project required working as an Agile team, following Scrum methodologies and using tools like JIRA, Figma, and Git/GitHub for efficient collaboration and project management.

## Screenshots

For screenshots of the website, please see the front end repository readme:
[Instock-Client](https://github.com/mannyv123/instock-client)

## Tech Stack

**Client:** React, React Router, BEM/SASS, Figma (design)

**Server:** Node, Express, MySQL, Knex, Postman (for testing APIs)

Note that the project also involves using Agile development methodologies, including JIRA for project management and the Scrum methodology for collaborative workflow.

## Database Setup

To set up the database for the back-end server, follow these steps:

1) Install MySQL on your machine if you haven't already.
2) Create a new MySQL database for the project.
3) Update the database configuration in the knexfile.js file to match your MySQL database credentials.
4) Also make sure to update your .env file accordingly (see .env.sample file)

## Run Locally

To set up the back-end locally, follow these steps:

Clone this repository to your local machine using the following command:

```
  git clone git@github.com:mannyv123/instock-server.git
```

Navigate to the project directory:

```
  cd instock-server
```

Install the required dependencies using npm:

```
  npm install
```

To start the server, use the following command:

```
  npm run dev
```

This will launch the server.

Make sure to also clone and run the front-end as well:
[Instock-Client](https://github.com/mannyv123/instock-client)

## Environment Variables

To run this project, you will need to add the following environment variable to your .env file (see also .env.sample file):

`PORT=your_server_port`
`DB_LOCAL_DBNAME=your_database_name`
`DB_LOCAL_USER=your_database_user`
`DB_LOCAL_PASSWORD=your_database_password`

Make sure to replace your_server_port, your_database_user, your_database_password, and your_database_name with your actual database and server credentials.

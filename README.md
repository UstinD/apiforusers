# apiforusers

## Dependencies
 
* [node.js](https://nodejs.org/en/download/)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [express](https://expressjs.com/)
* [express-jwt](https://www.npmjs.com/package/express-jwt)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [jwt-decode](https://www.npmjs.com/package/jwt-decode)
* [pg](https://www.npmjs.com/package/pg)
* [socket.io](https://socket.io/)
* [uuid](https://www.npmjs.com/package/uuid)


## How To Use

* clone repository

* download dependencies

* npm run devStart (start the server)

## Features

* REST API for list of users and a list of orgs which can have users, connected to a [postgreSQL](https://www.postgresql.org/) database

* Websocket using [Socket.io](https://socket.io/docs/v4/), notifies when user or org is added, updated, or removed

* updating or getting information for a user requires accesstoken in the header. Token is provided by the login

* password is hashed in the database

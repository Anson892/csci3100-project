# CSCI3100 Project

This is the project of ecommerce web application created by group C7. 

## Stack
- Frontend: React
- Backend: Node.js (Express)
- Database: MySQL

## Project Structure
```
csci3100-project
├── client
│   ├── public
│   └── src
│       ├── Assets (Logos and Images)
│       ├── Components
│       ├── Context (Global State: User Authentication and Cart)
│       ├── Pages
|       ├── App.js 
|       ├── index.js
|       └── ...
└── server
    ├── src
    │   ├── config
    │   ├── controllers
    │   ├── data
    │   ├── models
    │   ├── routes
    │   ├── services
    │   ├── app.js
    │   └── server.js
    ├── .env
    ├── package.json
    └── ...
```


## How to Use?
### Database Setup
Install MySQL and create a database. Change the database configuration in `server/src/config/db.config.js` to your own database configuration.
```js
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "12345678",
    DATABASE: "test",
    ...
}
```

### Start the Application
At the root directory (csci3100-project)
- `npm install` to install dependencies
- `npm run start_client` to start the client
- `npm run start_server` to start the server

The client will be running at `http://localhost:3000` and the server will be running at `http://localhost:8080`.

If the client and server are running on different urls, you can change `REACT_APP_BACKEND_URL` in `client/.env` to the server url and `FRONTEND_URL` in `server/.env` to the client url.

### (Optional) Import Sample Data
With the server running, you can import sample data to the database by running the following command:
```bash
# Make sure you are in the root directory before running the following commands
cd server/src/data
node setup.js
```

## Packages Used
- react
- react-router-dom
- framer-motion
- react-infinite-scroll-component
- @studio-freight/react-lenis
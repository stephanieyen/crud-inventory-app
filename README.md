# Basic CRUD Inventory App
**Date**: January 2022

This project is a full-stack inventory tracking web application which may be used by a logistics company.

It currently supports basic CRUD functionality as well as the ability to filter based on item and minimum quantity.

The inventory tracks the following metadata: 
* Item
* Quantity
* Category
* Unit price

Link to the live demo: [CRUD Inventory App](https://crud-inventory-app.netlify.app/)

## How it was built

### Tools & Technologies

**Front-end (client)**: React\
**Back-end (server)**: Node, Express, MySQL\
**Deployment**: [Netlify](
https://crud-inventory-app.netlify.app/) (front-end), [Heroku](https://crud-express-mysql.herokuapp.com/) (back-end)

### Process

I created a `client` folder to store the front-end React code (sourced from [Create React App](https://create-react-app.dev/)) as well as a `server` folder to handle API requests made to the back-end server from the client. 

On my local computer, I tested the front-end on `localhost:3000` and the back-end on another arbitrary port, `localhost:3001`. I used MySQL Workbench to create a local SQL database connection as well as a necessary schema/table. I used [Postman](http://postman.com/) to test the various API requests.

When deploying, I first pushed the `server` folder to Heroku and updated the MySQL connection in `server/index.js` after moving the database to the cloud via [CloudDB](https://devcenter.heroku.com/articles/cleardb). Then, I re-routed the front-end API requests to the new server URL (on Heroku) in `client/src/App.js` and pushed the `client` folder to Netlify.


## Future steps
* Design
* New features (e.g., sort by category)

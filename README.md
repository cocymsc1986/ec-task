# ec-task

Node server to consume EC api

### To Run

Create a .env in the route directory and add `API_URL` with value of api address e.g. `API_URL = http://localhost:3001/api/1`

Run the following commands:

`yarn`

`yarn build`

`yarn start`

To run tests run:

`yarn test`

### Notes

Handles JSON body

By default runs at port 4000 so can test api (users for example) by firing at `http://localhost:4000/users`

### To do

Only had time to handle and test the users route, so naturally would extend to build the parcs and bookings routes.

Add tests for the routers

Handle retries for intermittent api failure
